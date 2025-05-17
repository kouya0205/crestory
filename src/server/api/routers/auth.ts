import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createUser } from "@/server/auth/utils";
import { signInSchema } from "@/lib/zod";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(signInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = await signInSchema.parseAsync(input);

      // メールアドレスの重複チェック
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("このメールアドレスは既に使用されています");
      }

      // ユーザー作成
      const user = await createUser(email, password, name);

      return {
        message: "ユーザー登録が完了しました",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      };
    }),
}); 