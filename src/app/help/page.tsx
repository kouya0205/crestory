"use client";

import { motion } from "framer-motion";
import { MessageCircle, ChevronDown, Mail } from "lucide-react";
import { useState } from "react";
import { LpHeader } from "@/components/lp/header";
import Link from "next/link";
import Footer from "@/components/lp/footer";
import { helpSections } from "@/constants/lp/help";

export default function HelpPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (sectionId: string, itemTitle: string) => {
    const key = `${sectionId}-${itemTitle}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
              ヘルプセンター
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            crestoryの使い方について、詳しく解説します
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-12">
          {helpSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <section.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const isOpen = openItems[`${section.id}-${item.title}`];
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="overflow-hidden rounded-xl bg-white shadow-md"
                    >
                      <button
                        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
                        onClick={() => toggleItem(section.id, item.title)}
                      >
                        <h3 className="font-medium">{item.title}</h3>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100 p-4"
                        >
                          <p className="text-gray-600">{item.content}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-4xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="mb-4 text-2xl font-bold">お問い合わせ</h2>
          <p className="mb-6">
            解決できない問題がございましたら、お気軽にお問い合わせください
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>メールでのお問い合わせ</span>
              </Link>
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>チャットサポート</span>
            </motion.button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
