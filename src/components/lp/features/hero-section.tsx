import { motion } from "framer-motion";
import { BookOpen, Sparkles, Share2, Search } from "lucide-react";

export default function FeaturesHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              機能詳細
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 md:text-2xl">
            crestoryの豊富な機能で、あなたの人生の物語を
            <br className="hidden md:block" />
            より魅力的に記録・共有しましょう
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { icon: BookOpen, name: "自分史作成" },
            { icon: Sparkles, name: "AIアシスタント" },
            { icon: Share2, name: "家族共有" },
            { icon: Search, name: "一般公開" },
          ].map((feature, index) => (
            <motion.div
              key={feature.name}
              className="rounded-xl bg-white p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <feature.icon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <p className="text-sm font-medium text-gray-700">
                {feature.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
