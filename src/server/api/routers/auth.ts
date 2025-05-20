import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createUser } from "@/server/auth/utils";
import { signUpSchema } from "@/lib/zod";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name, confirmPassword } =
        await signUpSchema.parseAsync(input);

      // メールアドレスの重複チェック
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "このメールアドレスは既に使用されています",
        });
      }

      // ユーザー作成
      const user = await createUser(email, password, name);

      return {
        message: "ユーザー登録が完了しました",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),
});
