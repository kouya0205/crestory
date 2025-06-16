import { motion } from "framer-motion";
import { Camera, Users, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section
      id="#"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              あなたの物語を
            </motion.span>
            <br />
            <motion.span
              className="text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              未来へ繋ぐ
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            crestoryは、あなたの人生の大切なエピソードを記録し、家族と共有できる
            <br className="hidden md:block" />
            デジタル自分史作成プラットフォームです
          </motion.p>

          <motion.div
            className="mb-16 flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/register">
                <span className="text-white">無料で始める</span>
              </Link>
            </motion.button>
            <motion.button
              className="rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              デモを見る
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: Camera,
                  title: "写真と共に記録",
                  desc: "思い出の写真と一緒にエピソードを保存",
                },
                {
                  icon: Users,
                  title: "家族と共有",
                  desc: "大切な家族とあなたの物語を共有",
                },
                {
                  icon: Sparkles,
                  title: "AI サポート",
                  desc: "AIがあなたの自分史作りをお手伝い",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="mx-auto h-8 w-8 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
