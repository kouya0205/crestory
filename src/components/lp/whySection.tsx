import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, Users } from "lucide-react";

export const WhySection = () => {
  const reasons = [
    {
      icon: Heart,
      title: "家族の絆を深める",
      description:
        "個人の記憶を共有することで、世代を超えたコミュニケーションのきっかけを作ります",
    },
    {
      icon: Shield,
      title: "プライバシー重視",
      description:
        "あなたの大切な思い出は安全に保護され、共有範囲も自由に設定できます",
    },
    {
      icon: Sparkles,
      title: "AI による新たな発見",
      description:
        "AIとの対話を通じて、自分では気づかなかった新たな視点や価値観を発見",
    },
    {
      icon: Users,
      title: "世代を超えた価値",
      description:
        "あなたの経験が、同じような状況で悩む人々への指針となる可能性があります",
    },
  ];

  return (
    <section
      id="appeal"
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            なぜ{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              crestory
            </span>{" "}
            なのか
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            個人の歴史というかけがえのない資産を、デジタルの力で未来へ繋ぎたい。
            <br />
            そんな思いから生まれたプラットフォームです。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                <reason.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">{reason.title}</h3>
              <p className="leading-relaxed text-gray-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-12 shadow-xl">
            <blockquote className="mb-8 text-2xl leading-relaxed font-light text-gray-700 md:text-3xl">
              "祖父母や両親から聞く昔話は、自分の知らない時代の風景や価値観に触れられる貴重な体験でした。"
            </blockquote>
            <p className="text-lg text-gray-600">
              そうした個人の記憶を時と共に失われることなく、未来へ繋いでいくために
              <br />
              <strong className="text-blue-600">crestory</strong>{" "}
              は生まれました。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
