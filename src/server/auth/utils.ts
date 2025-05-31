import { db } from "@/server/db";
import bcrypt from "bcrypt";
import type { User } from "@prisma/client";

/**
 * パスワードをソルト化してハッシュ化する
 * @param password ハッシュ化する平文パスワード
 * @returns ハッシュ化されたパスワード
 */
export const saltAndHashPassword = async (
  password: string,
): Promise<string> => {
  // ソルトを生成（コストファクター10）
  const salt = await bcrypt.genSalt(10);
  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * 入力されたパスワードが保存されているハッシュと一致するか検証
 * @param password ユーザーが入力した平文パスワード
 * @param hashedPassword データベースに保存されているハッシュ済みパスワード
 * @returns 検証結果（一致すればtrue）
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * メールアドレスとパスワードからユーザーを取得
 * @param email ユーザーのメールアドレス
 * @param password ユーザーが入力したパスワード
 * @returns 認証に成功したユーザーまたはnull
 */
export const getUserFromDb = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    // メールアドレスでユーザーを検索
    const user = await db.user.findUnique({
      where: { email },
    });

    // ユーザーが存在しない場合はnullを返す
    if (!user || !user.pwHash) {
      return null;
    }

    // パスワードを検証
    const isValid = await verifyPassword(password, user.pwHash);

    // 検証に成功した場合はユーザーを、失敗した場合はnullを返す
    return isValid ? user : null;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
};

/**
 * 新規ユーザー登録
 * @param email メールアドレス
 * @param password パスワード
 * @param name 名前（オプション）
 * @returns 作成されたユーザー
 */
export const createUser = async (
  email: string,
  password: string,
  name?: string,
): Promise<User> => {
  // パスワードをハッシュ化
  const hashedPassword = await saltAndHashPassword(password);

  // ユーザーを作成
  const user = await db.user.create({
    data: {
      email,
      pwHash: hashedPassword,
      name: name || email.split("@")[0],
    },
  });

  return user;
};
