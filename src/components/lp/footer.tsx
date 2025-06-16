"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              crestory
            </motion.div>
            <p className="mb-6 max-w-md text-gray-400">
              個人の人生の出来事や大切なエピソードを記録し、家族と共有できるデジタル自分史作成プラットフォーム
            </p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-blue-600"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Star className="h-5 w-5" />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">サービス</h4>
            <ul className="space-y-2 text-gray-400">
              {["機能紹介", "料金プラン", "サポート", "ヘルプ"].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="transition-colors hover:text-white"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">法的情報</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                "利用規約",
                "プライバシーポリシー",
                "特定商取引法",
                "お問い合わせ",
              ].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="transition-colors hover:text-white"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          © 2024 crestory. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
