import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import type { Prisma } from "@prisma/client";

// エピソード作成用のスキーマ
const createStorySchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  body: z.string().min(1, "本文は必須です"),
  eventDate: z.date().optional(),
  lifeEventTag: z
    .enum([
      "BIRTH",
      "CHILDHOOD",
      "STUDENT_DAYS",
      "FIRST_JOB",
      "CAREER_CHANGE",
      "MARRIAGE",
      "CHILDBIRTH",
      "PARENTING",
      "HOBBY",
      "TRAVEL",
      "TURNING_POINT",
      "HEALTH",
      "OTHER",
    ])
    .optional(),
  visibility: z.enum(["PRIVATE", "FAMILY_ONLY"]).default("PRIVATE"),
});

// エピソード更新用のスキーマ
const updateStorySchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください")
    .optional(),
  body: z.string().min(1, "本文は必須です").optional(),
  eventDate: z.date().optional().nullable(),
  lifeEventTag: z
    .enum([
      "BIRTH",
      "CHILDHOOD",
      "STUDENT_DAYS",
      "FIRST_JOB",
      "CAREER_CHANGE",
      "MARRIAGE",
      "CHILDBIRTH",
      "PARENTING",
      "HOBBY",
      "TRAVEL",
      "TURNING_POINT",
      "HEALTH",
      "OTHER",
    ])
    .optional()
    .nullable(),
  visibility: z.enum(["PRIVATE", "FAMILY_ONLY"]).optional(),
});

// 本文から画像URLとサイズ情報を抽出するヘルパー関数
function extractImageData(
  html: string,
): Array<{ url: string; width?: string; height?: string }> {
  const imageData: Array<{ url: string; width?: string; height?: string }> = [];
  const imgRegex = /<img[^>]*>/g;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const imgTag = match[0]!;

    // src属性を抽出
    const srcMatch = imgTag.match(/src="([^"]+)"/);
    if (!srcMatch) continue;

    const url = srcMatch[1]!;

    // width属性を抽出
    const widthMatch = imgTag.match(/width="([^"]+)"/);
    const width = widthMatch ? widthMatch[1] : undefined;

    // height属性を抽出
    const heightMatch = imgTag.match(/height="([^"]+)"/);
    const height = heightMatch ? heightMatch[1] : undefined;

    imageData.push({ url, width, height });
  }

  return imageData;
}

// エピソードに画像を関連付けるヘルパー関数（サイズ情報も含む）
async function associateImagesWithStory(
  db: Prisma.TransactionClient,
  storyId: string,
  imageData: Array<{ url: string; width?: string; height?: string }>,
  userId: string,
) {
  if (imageData.length === 0) return;

  const imageUrls = imageData.map((img) => img.url);

  // 既存の画像を取得
  const existingImages = await db.image.findMany({
    where: {
      url: {
        in: imageUrls,
      },
    },
    select: {
      id: true,
      url: true,
    },
  });

  // 存在しない画像URLのリストを作成
  const existingImageUrls = existingImages.map((img) => img.url);
  const missingImageUrls = imageUrls.filter(
    (url) => !existingImageUrls.includes(url),
  );

  // 存在しない画像をImageテーブルに作成
  const createdImages = [];
  for (const url of missingImageUrls) {
    // URLから画像ファイル名を推測（ファイル名が不明な場合のフォールバック）
    const filename = url.split("/").pop() || "unknown-image";

    try {
      const newImage = await db.image.create({
        data: {
          url: url,
          filename: filename,
          fileSize: 0, // ファイルサイズが不明な場合は0
          mimeType: "image/jpeg", // デフォルトのMIMEタイプ
          uploaderId: userId,
        },
      });
      createdImages.push(newImage);
    } catch (error) {
      console.error(`Failed to create image record for URL: ${url}`, error);
      // エラーが発生しても処理を続行
    }
  }

  // 全ての画像を統合
  const allImages = [...existingImages, ...createdImages];

  // 既存の関連付けを削除
  await db.storyImage.deleteMany({
    where: {
      storyId: storyId,
    },
  });

  // 新しい関連付けを作成（サイズ情報も含む）
  const storyImageData = imageData
    .map((imgData, index) => {
      const image = allImages.find((img) => img.url === imgData.url);
      if (!image) return null;

      return {
        storyId: storyId,
        imageId: image.id,
        order: index,
        displayWidth: imgData.width,
        displayHeight: imgData.height,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (storyImageData.length > 0) {
    await db.storyImage.createMany({
      data: storyImageData,
    });
  }
}

export const storyRouter = createTRPCRouter({
  // エピソード作成
  create: protectedProcedure
    .input(createStorySchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.$transaction(async (tx) => {
        // エピソードを作成
        const story = await tx.story.create({
          data: {
            title: input.title,
            body: input.body,
            eventDate: input.eventDate,
            lifeEventTag: input.lifeEventTag,
            visibility: input.visibility,
            authorId: ctx.session.user.id,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            images: {
              include: {
                image: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
        });

        // 本文から画像URLとサイズ情報を抽出して関連付け
        const imageData = extractImageData(input.body);
        await associateImagesWithStory(
          tx,
          story.id,
          imageData,
          ctx.session.user.id,
        );

        // 関連付け後のエピソードを再取得
        const updatedStory = await tx.story.findUnique({
          where: { id: story.id },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            images: {
              include: {
                image: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
        });

        return updatedStory!;
      });
    }),

  // エピソード更新
  update: protectedProcedure
    .input(updateStorySchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.$transaction(async (tx) => {
        // エピソードの存在と権限を確認
        const existingStory = await tx.story.findFirst({
          where: {
            id: input.id,
            authorId: ctx.session.user.id,
          },
        });

        if (!existingStory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "エピソードが見つからないか、編集権限がありません",
          });
        }

        // エピソードを更新
        const story = await tx.story.update({
          where: { id: input.id },
          data: {
            ...(input.title && { title: input.title }),
            ...(input.body && { body: input.body }),
            ...(input.eventDate !== undefined && {
              eventDate: input.eventDate,
            }),
            ...(input.lifeEventTag !== undefined && {
              lifeEventTag: input.lifeEventTag,
            }),
            ...(input.visibility && { visibility: input.visibility }),
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            images: {
              include: {
                image: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
        });

        // 本文が更新された場合、画像の関連付けを更新
        if (input.body) {
          const imageData = extractImageData(input.body);
          await associateImagesWithStory(
            tx,
            story.id,
            imageData,
            ctx.session.user.id,
          );

          // 関連付け後のエピソードを再取得
          const updatedStory = await tx.story.findUnique({
            where: { id: story.id },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              images: {
                include: {
                  image: true,
                },
                orderBy: {
                  order: "asc",
                },
              },
            },
          });

          return updatedStory!;
        }

        return story;
      });
    }),

  // エピソード削除
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // エピソードの存在と権限を確認
      const existingStory = await ctx.db.story.findFirst({
        where: {
          id: input.id,
          authorId: ctx.session.user.id,
        },
      });

      if (!existingStory) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "エピソードが見つからないか、削除権限がありません",
        });
      }

      // エピソードを削除（関連する画像の関連付けも自動削除される）
      await ctx.db.story.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  // 特定のエピソードを取得
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const story = await ctx.db.story.findFirst({
        where: {
          id: input.id,
          // 自分のエピソードか、家族共有でアクセス権があるもの
          OR: [
            { authorId: ctx.session.user.id },
            {
              visibility: "FAMILY_ONLY",
              author: {
                familyMemberships: {
                  some: {
                    memberUserId: ctx.session.user.id,
                    status: "APPROVED",
                  },
                },
              },
            },
          ],
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          images: {
            include: {
              image: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      if (!story) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "エピソードが見つかりません",
        });
      }

      return story;
    }),

  // ユーザーのエピソード一覧を取得
  getByUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
        orderBy: z.enum(["newest", "oldest", "eventDate"]).default("newest"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const targetUserId = input.userId || ctx.session.user.id;

      // 他のユーザーのエピソードを見る場合は家族関係を確認
      if (targetUserId !== ctx.session.user.id) {
        const hasAccess = await ctx.db.familyMembership.findFirst({
          where: {
            memberUserId: ctx.session.user.id,
            status: "APPROVED",
            family: {
              ownerId: targetUserId,
            },
          },
        });

        if (!hasAccess) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "このユーザーのエピソードにアクセスする権限がありません",
          });
        }
      }

      const orderBy =
        input.orderBy === "newest"
          ? { createdAt: "desc" as const }
          : input.orderBy === "oldest"
            ? { createdAt: "asc" as const }
            : { eventDate: "desc" as const };

      const stories = await ctx.db.story.findMany({
        where: {
          authorId: targetUserId,
          // 他のユーザーのエピソードの場合は家族共有のもののみ
          ...(targetUserId !== ctx.session.user.id && {
            visibility: "FAMILY_ONLY",
          }),
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          images: {
            include: {
              image: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy,
        take: input.limit + 1,
        ...(input.cursor && {
          cursor: { id: input.cursor },
          skip: 1,
        }),
      });

      let nextCursor: string | undefined = undefined;
      if (stories.length > input.limit) {
        const nextItem = stories.pop();
        nextCursor = nextItem!.id;
      }

      return {
        stories,
        nextCursor,
      };
    }),

  // 家族共有のエピソード一覧を取得
  getFamilyStories: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
        orderBy: z.enum(["newest", "oldest", "eventDate"]).default("newest"),
      }),
    )
    .query(async ({ ctx, input }) => {
      // 自分が所属する家族グループのメンバーを取得
      const familyMemberships = await ctx.db.familyMembership.findMany({
        where: {
          memberUserId: ctx.session.user.id,
          status: "APPROVED",
        },
        include: {
          family: {
            include: {
              owner: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      const familyOwnerIds = familyMemberships
        .map((m) => m.family?.ownerId)
        .filter(Boolean) as string[];

      const orderBy =
        input.orderBy === "newest"
          ? { createdAt: "desc" as const }
          : input.orderBy === "oldest"
            ? { createdAt: "asc" as const }
            : { eventDate: "desc" as const };

      const stories = await ctx.db.story.findMany({
        where: {
          visibility: "FAMILY_ONLY",
          authorId: {
            in: familyOwnerIds,
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          images: {
            include: {
              image: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy,
        take: input.limit + 1,
        ...(input.cursor && {
          cursor: { id: input.cursor },
          skip: 1,
        }),
      });

      let nextCursor: string | undefined = undefined;
      if (stories.length > input.limit) {
        const nextItem = stories.pop();
        nextCursor = nextItem!.id;
      }

      return {
        stories,
        nextCursor,
      };
    }),
});
