import { motion } from "framer-motion";
import { BookOpen, ChevronDown, Search, Share2, Sparkles } from "lucide-react";
import Link from "next/link";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "自分史作成・編集",
      description:
        "直感的なエディタで、人生の１ページを彩るエピソードを作成できます。リッチテキストやライフイベントタグで整理も簡単。",
      image: "/api/placeholder/400/300",
      detailLink: "/features/#story-form",
    },
    {
      icon: Sparkles,
      title: "AI アシスタント",
      description:
        "AIがあなたの自分史作りをサポート。インタビュー形式で質問を投げかけ、より深い自己発見へと導きます。",
      image: "/api/placeholder/400/300",
      detailLink: "/features/#ai-assistant",
    },
    {
      icon: Share2,
      title: "家族との共有",
      description:
        "プライバシーに配慮しながら、大切な家族と自分史を共有。世代を超えたコミュニケーションのきっかけを作ります。",
      image: "/api/placeholder/400/300",
      detailLink: "/features/#share",
    },
    {
      icon: Search,
      title: "一般公開機能",
      description:
        "人生の岐路に立つ人々と経験を共有。多様な人生経験との出会いを通じて、新たな可能性への気づきを得られます。",
      image: "/api/placeholder/400/300",
      detailLink: "/features/#public",
    },
  ];

  return (
    <section id="features" className="bg-white py-20">
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
              主な機能
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            あなたの人生の物語を豊かに表現し、大切な人と共有するための機能をご用意しました
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </motion.div>
                <h3 className="mb-4 text-3xl font-bold">{feature.title}</h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {feature.description}
                </p>
                <motion.button
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-purple-600"
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={feature.detailLink}
                    className="flex items-center gap-2"
                  >
                    <span>詳しく見る</span>
                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                  </Link>
                </motion.button>
              </div>
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-lg">
                  <div className="flex aspect-video items-center justify-center rounded-xl bg-white shadow-inner">
                    <feature.icon className="h-16 w-16 text-gray-300" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
