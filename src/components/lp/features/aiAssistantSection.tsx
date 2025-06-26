"use client";

import { aiFeatures } from "@/constants/lp/aiFeatures";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Camera, Zap, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function AIAssistantSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const conversationSteps = [
    { ai: "こんにちは！今日はどんな思い出について話しましょうか？", user: "" },
    {
      ai: "学生時代の思い出ですね。特に印象に残っているエピソードはありますか？",
      user: "学生時代のことを書きたいです",
    },
    {
      ai: "文化祭での出来事、素敵ですね！その時のあなたの気持ちはどうでしたか？",
      user: "文化祭で友達と劇をやったことです",
    },
    {
      ai: "その経験が今のあなたにどんな影響を与えていますか？",
      user: "とても緊張したけど、みんなで頑張って成功した時は嬉しかったです",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % conversationSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="ai-assistant"
      className="bg-gradient-to-br from-purple-50 to-blue-50 py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-100 to-blue-100">
            <Sparkles className="h-10 w-10 text-purple-600" />
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            AIアシスタント機能
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            AIがあなたの自分史作りをサポートし、より深い自己発見へと導きます。
            対話を通じて、忘れていた思い出を蘇らせましょう。
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-3xl font-bold">AIとの対話で新たな発見</h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              AIアシスタントが適切な質問を投げかけることで、
              自分では気づかなかった感情や価値観を発見できます。
            </p>
            <div className="space-y-6">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="font-semibold">AIアシスタント</h4>
                <div className="ml-auto">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="h-64 space-y-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="max-w-xs rounded-2xl bg-purple-50 p-3">
                        <p className="text-sm">
                          {conversationSteps[currentStep]?.ai}
                        </p>
                      </div>
                    </div>

                    {conversationSteps[currentStep]?.user && (
                      <div className="flex justify-end gap-3">
                        <div className="max-w-xs rounded-2xl bg-blue-500 p-3 text-white">
                          <p className="text-sm">
                            {conversationSteps[currentStep].user}
                          </p>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
