"use client";

import { motion } from "framer-motion";
import { LpHeader } from "@/components/lp/header";
import {
  AlertCircle,
  Bug,
  HelpCircle,
  MessageSquare,
  Send,
} from "lucide-react";
import { useState } from "react";
import Footer from "@/components/lp/footer";

export default function ContactPage() {
  const [category, setCategory] = useState<string>("");

  const categories = [
    {
      id: "general",
      icon: MessageSquare,
      title: "一般的なお問い合わせ",
      description: "サービスに関する質問や提案など",
    },
    {
      id: "technical",
      icon: Bug,
      title: "技術的な問題",
      description: "エラーや動作の不具合について",
    },
    {
      id: "account",
      icon: AlertCircle,
      title: "アカウント関連",
      description: "ログインやアカウント設定について",
    },
    {
      id: "other",
      icon: HelpCircle,
      title: "その他",
      description: "上記以外のお問い合わせ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <LpHeader />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              お問い合わせ
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            ご質問やご要望がございましたら、お気軽にお問い合わせください
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <motion.div
            className="rounded-2xl bg-white p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8">
              <h2 className="mb-6 text-xl font-semibold">
                お問い合わせカテゴリ
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    className={`flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                      category === cat.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setCategory(cat.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`rounded-lg p-2 ${
                        category === cat.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          category === cat.id
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {cat.title}
                      </p>
                      <p className="text-sm text-gray-500">{cat.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  お名前
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="山田 太郎"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  メールアドレス
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  件名
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="お問い合わせ件名"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  お問い合わせ内容
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                  required
                />
              </div>

              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="h-5 w-5" />
                <span>送信する</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
