import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Heart,
  Share2,
  ChevronRight,
  Check,
  Lock,
} from "lucide-react";

export default function ShareSection() {
  const shareFeatures = [
    {
      icon: Users,
      title: "家族ID招待",
      description:
        "専用の家族IDを使って、信頼できる家族メンバーだけを招待・承認できます。",
    },
    {
      icon: Lock,
      title: "柔軟な公開設定",
      description:
        "エピソードごとに公開範囲を設定可能。完全プライベート、家族のみ、一般公開から選択できます。",
    },
    {
      icon: Eye,
      title: "時系列閲覧",
      description:
        "共有された家族の自分史を時系列で閲覧。世代を超えた物語を楽しめます。",
    },
    {
      icon: Heart,
      title: "コミュニケーション",
      description:
        "家族の投稿にコメントやリアクションを付けて、新たな会話のきっかけを作れます。",
    },
  ];

  return (
    <section id="share" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-blue-100">
            <Share2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            家族との共有機能
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            プライバシーに配慮しながら、大切な家族と自分史を共有できます。
            世代を超えたコミュニケーションのきっかけを作りましょう。
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 p-8 shadow-xl">
              <div className="rounded-xl bg-white p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold">田中家の物語</h4>
                  <p className="text-sm text-gray-500">3世代 8人のメンバー</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "おじいちゃん", stories: 24, color: "bg-blue-100" },
                    {
                      name: "おばあちゃん",
                      stories: 18,
                      color: "bg-purple-100",
                    },
                    { name: "お父さん", stories: 12, color: "bg-green-100" },
                    { name: "お母さん", stories: 15, color: "bg-pink-100" },
                  ].map((member, index) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <div
                        className={`h-8 w-8 ${member.color} rounded-full`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.stories}のエピソード
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
            <h3 className="mb-6 text-3xl font-bold">安全な家族の輪</h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              家族だけの特別な空間で、プライベートな思い出を安心して共有できます。
              おじいちゃん、おばあちゃんの昔話から、お子さんの成長記録まで。
            </p>
            <div className="space-y-4">
              {["安全な招待システム", "細かな公開設定", "世代を超えた交流"].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {shareFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg transition-all hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-blue-100">
                <feature.icon className="h-6 w-6 text-green-600" />
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
