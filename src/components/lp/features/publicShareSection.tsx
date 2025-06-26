import { publicFeatures } from "@/constants/lp/publicFeatures";
import { motion } from "framer-motion";
import { Globe, ChevronRight, Check } from "lucide-react";

export default function PublicShareSection() {
  return (
    <section id="public" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              一般公開機能
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            価値ある経験を共有し、世代を超えた学びと対話を生み出す場を提供します
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-8 shadow-xl">
              <div className="rounded-xl bg-white p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                    <Globe className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">公開エピソード</h4>
                  <p className="text-sm text-gray-500">
                    様々な人生の経験を共有
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "人生の転機", views: 245, color: "bg-blue-100" },
                    { title: "キャリア", views: 182, color: "bg-purple-100" },
                    { title: "家族", views: 156, color: "bg-green-100" },
                    { title: "趣味", views: 134, color: "bg-pink-100" },
                  ].map((category, index) => (
                    <div
                      key={category.title}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <div
                        className={`h-8 w-8 ${category.color} rounded-full`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{category.title}</p>
                        <p className="text-xs text-gray-500">
                          {category.views} エピソード
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-3xl font-bold">経験を共有し、繋がる</h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              あなたの経験は、誰かの人生の道標になるかもしれません。
              世代や立場を超えて、価値ある経験を共有し、新たな気づきを得られる場所です。
            </p>
            <div className="space-y-4">
              {[
                "プライバシーに配慮した公開設定",
                "カテゴリ別の整理",
                "コミュニティの形成",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                    <Check className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {publicFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg transition-all hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mb-3 text-lg font-bold">{feature.title}</h4>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
