import { z } from "zod";
import { deleteStoryImage } from "@/lib/blob";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  // 画像メタデータをDBに保存
  create: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
        filename: z.string(),
        fileSize: z.number(),
        mimeType: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const image = await ctx.db.image.create({
        data: {
          url: input.url,
          filename: input.filename,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          width: input.width,
          height: input.height,
          uploaderId: ctx.session.user.id,
        },
      });
      return image;
    }),

  // 画像メタデータを更新
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        filename: z.string().optional(),
        caption: z.string().optional(),
        alt: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 画像の所有者確認
      const existingImage = await ctx.db.image.findFirst({
        where: {
          id: input.id,
          uploaderId: ctx.session.user.id,
        },
      });

      if (!existingImage) {
        throw new Error("画像が見つからないか、編集権限がありません");
      }

      const updatedImage = await ctx.db.image.update({
        where: { id: input.id },
        data: {
          filename: input.filename,
          caption: input.caption,
          alt: input.alt,
        },
      });

      return updatedImage;
    }),

  // 画像を削除（DBとVercel Blobの両方から）
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // 画像の所有者確認
      const existingImage = await ctx.db.image.findFirst({
        where: {
          id: input.id,
          uploaderId: ctx.session.user.id,
        },
      });

      if (!existingImage) {
        throw new Error("画像が見つからないか、削除権限がありません");
      }

      try {
        // Vercel Blobから削除
        await deleteStoryImage(existingImage.url);
      } catch (error) {
        console.error("Failed to delete from Vercel Blob:", error);
        // Blobからの削除に失敗してもDBからは削除する
      }

      // 関連するStoryImageレコードも削除
      await ctx.db.storyImage.deleteMany({
        where: { imageId: input.id },
      });

      // DBから削除
      await ctx.db.image.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  // ユーザーの画像一覧取得
  getByUser: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const images = await ctx.db.image.findMany({
        where: {
          uploaderId: ctx.session.user.id,
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (images.length > input.limit) {
        const nextItem = images.pop();
        nextCursor = nextItem!.id;
      }

      return {
        images,
        nextCursor,
      };
    }),

  // 特定の画像取得
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const image = await ctx.db.image.findFirst({
        where: {
          id: input.id,
          uploaderId: ctx.session.user.id,
        },
      });

      if (!image) {
        throw new Error("画像が見つかりません");
      }

      return image;
    }),

  // ストーリーに関連する画像一覧取得
  getByStory: protectedProcedure
    .input(z.object({ storyId: z.string() }))
    .query(async ({ ctx, input }) => {
      // ストーリーの所有者確認
      const story = await ctx.db.story.findFirst({
        where: {
          id: input.storyId,
          authorId: ctx.session.user.id,
        },
      });

      if (!story) {
        throw new Error("ストーリーが見つからないか、アクセス権限がありません");
      }

      const storyImages = await ctx.db.storyImage.findMany({
        where: {
          storyId: input.storyId,
        },
        include: {
          image: true,
        },
        orderBy: {
          order: "asc",
        },
      });

      return storyImages.map((si) => si.image);
    }),

  // ストーリーに画像を関連付け
  attachToStory: protectedProcedure
    .input(
      z.object({
        imageId: z.string(),
        storyId: z.string(),
        order: z.number().default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 画像とストーリーの所有者確認
      const [image, story] = await Promise.all([
        ctx.db.image.findFirst({
          where: {
            id: input.imageId,
            uploaderId: ctx.session.user.id,
          },
        }),
        ctx.db.story.findFirst({
          where: {
            id: input.storyId,
            authorId: ctx.session.user.id,
          },
        }),
      ]);

      if (!image || !story) {
        throw new Error(
          "画像またはストーリーが見つからないか、権限がありません",
        );
      }

      const storyImage = await ctx.db.storyImage.create({
        data: {
          imageId: input.imageId,
          storyId: input.storyId,
          order: input.order,
        },
      });

      return storyImage;
    }),
});
