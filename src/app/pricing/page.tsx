"use client";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { LpHeader } from "@/components/lp/header";
import { Check, Crown } from "lucide-react";
import Footer from "@/components/lp/footer";
import { plans } from "@/constants/lp/pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AnimatePresence mode="wait">
        <div key="pricing-content">
          <LpHeader />
          <main className="container mx-auto px-4 pt-24 pb-16">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  料金プラン
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                あなたのニーズに合わせて最適なプランをお選びください
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`relative rounded-2xl bg-white p-8 shadow-xl ${
                    plan.popular ? "border-2 border-blue-500" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform">
                      <div className="flex items-center gap-1 rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                        <Crown className="h-4 w-4" />
                        おすすめ
                      </div>
                    </div>
                  )}

                  <div
                    className={`mb-6 inline-flex rounded-lg bg-gradient-to-r ${plan.gradient} p-3 text-white`}
                  >
                    <plan.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className="mb-6 text-gray-600">{plan.description}</p>

                  <div className="mb-6">
                    <div className="mb-1 text-3xl font-bold">{plan.price}</div>
                    <div className="text-gray-500">{plan.period}</div>
                  </div>

                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div
                          className={`rounded-full bg-gradient-to-r ${plan.gradient} p-1 text-white`}
                        >
                          <Check className="h-4 w-4" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full rounded-full bg-gradient-to-r ${plan.gradient} px-8 py-4 font-semibold text-white transition-all hover:shadow-lg`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.buttonText}
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 rounded-2xl bg-white p-8 text-center shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="mb-4 text-2xl font-bold">
                カスタムプランをお考えですか？
              </h2>
              <p className="mb-6 text-gray-600">
                法人利用や特別なご要望がございましたら、お気軽にお問い合わせください
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                お問い合わせ
              </motion.a>
            </motion.div>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </div>
  );
}
