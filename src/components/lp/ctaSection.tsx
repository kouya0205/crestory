import { motion } from "framer-motion";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            あなたの物語を
            <br />
            今日から始めませんか？
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-blue-100">
            大切な思い出を記録し、家族と共有する。
            <br />
            新たなコミュニケーションの扉を開きましょう。
          </p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/register">
                <span className="text-blue-600">無料で始める</span>
              </Link>
            </motion.button>
            <motion.button
              className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/pricing">
                <span className="text-white">料金について</span>
              </Link>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            {
              number: "1",
              title: "アカウント作成",
              desc: "簡単な登録で今すぐ開始",
            },
            {
              number: "2",
              title: "エピソード記録",
              desc: "写真と共に思い出を記録",
            },
            { number: "3", title: "家族と共有", desc: "大切な人と物語を共有" },
          ].map((step, index) => (
            <motion.div
              key={step.number}
              className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-600">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-blue-100">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
