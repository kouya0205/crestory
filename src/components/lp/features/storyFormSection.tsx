import { motion } from "framer-motion";
import { Edit3, Tag, Camera, Download, BookOpen, Check } from "lucide-react";

export default function StoryFormSection() {
  const features = [
    {
      icon: Edit3,
      title: "リッチテキストエディタ",
      description:
        "太字、斜体、箇条書きなどを使って、表現力豊かな文章を作成できます。直感的な操作で、誰でも簡単に美しい文章を書けます。",
    },
    {
      icon: Tag,
      title: "ライフイベントタグ",
      description:
        "「誕生」「学生時代」「結婚」「仕事」などのタグで、エピソードを分類・整理。後から振り返りやすくなります。",
    },
    {
      icon: Camera,
      title: "写真アップロード",
      description:
        "思い出の写真を複数枚アップロード可能。写真と一緒に保存することで、より鮮明に記憶を残せます。",
    },
    {
      icon: Download,
      title: "下書き保存",
      description:
        "時間をかけてじっくりと執筆できる下書き機能。途中で保存して、後からゆっくり完成させることができます。",
    },
  ];

  return (
    <section id="story-form" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100">
            <BookOpen className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            自分史作成・編集機能
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            直感的な操作で、人生の１ページを彩るエピソードを作成できます。
            思い出を美しく、分かりやすく記録しましょう。
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-xl">
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-auto text-sm text-gray-500">
                    エピソード作成
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                      学生時代
                    </span>
                  </div>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                  <div className="flex gap-2">
                    <div className="h-12 w-16 rounded bg-gray-200"></div>
                    <div className="h-12 w-16 rounded bg-gray-200"></div>
                  </div>
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
            <h3 className="mb-6 text-3xl font-bold">思い出を美しく記録</h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              まるで日記を書くような感覚で、人生の大切な瞬間を記録できます。
              写真と文章を組み合わせて、あなただけの物語を作り上げましょう。
            </p>
            <div className="space-y-4">
              {["直感的な操作性", "美しいレイアウト", "柔軟な編集機能"].map(
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl bg-gray-50 p-8 transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="mb-3 text-xl font-bold">{feature.title}</h4>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
