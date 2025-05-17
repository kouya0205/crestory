import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  // プロジェクトの作成
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        projectType: z.string().optional(),
        visibility: z.string().default("private"),
        tags: z.array(z.string()).optional(),
        coverImage: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),

  // プロジェクトの取得
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.project.findUnique({
        where: { id: input.id },
        include: {
          projectAssets: true,
          posts: true,
          aiSessions: true,
          sharedWorks: true,
        },
      });
    }),

  // ユーザーのプロジェクト一覧を取得
  getUserProjects: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const items = await ctx.db.project.findMany({
        take: limit + 1,
        where: { userId: ctx.session.user.id },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          projectAssets: true,
          posts: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  // プロジェクトの更新
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        projectType: z.string().optional(),
        visibility: z.string().optional(),
        tags: z.array(z.string()).optional(),
        coverImage: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.project.update({
        where: { id },
        data,
      });
    }),

  // プロジェクトの削除
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.delete({
        where: { id: input.id },
      });
    }),
}); 