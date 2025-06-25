"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const FeatureDetailsSection: React.FC = () => {
  const features = [
    {
      badge: {
        text: "自分史作成",
        color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
      title: "思い出を自由に記録",
      description:
        "直感的なエディターで、あなたの人生の物語を自由に綴ることができます。テキスト、写真、音声など、様々な形式で思い出を残せます。",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20digital%20memoir%20writing%20interface%20with%20Japanese%20text%2C%20showing%20rich%20text%20editor%20and%20photo%20upload%20features%2C%20elegant%20minimalist%20design%2C%20professional%20UI%20screenshot%20with%20warm%20lighting%20and%20soft%20colors&width=600&height=400&seq=feature1&orientation=landscape",
      imageAlt: "自分史作成画面",
      details: [
        {
          icon: "fas fa-pen-fancy",
          title: "リッチテキストエディター",
          description:
            "文章の装飾や写真の配置を自由にレイアウト。美しい自分史を作成できます。",
        },
        {
          icon: "fas fa-tags",
          title: "ライフイベントタグ",
          description:
            "出来事を時系列やテーマごとに整理。後から振り返りやすい形で保存できます。",
        },
        {
          icon: "fas fa-microphone",
          title: "音声入力対応",
          description:
            "話すように記録できる音声入力で、より自然な語り口の自分史を作成できます。",
        },
      ],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      badge: {
        text: "AIアシスタント",
        color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      },
      title: "思い出を引き出す対話型AI",
      description:
        "AIが適切な質問を投げかけ、眠っていた記憶を呼び覚まします。より深い自己理解と豊かな物語作りをサポートします。",
      image:
        "https://readdy.ai/api/search-image?query=AI%20assistant%20interface%20with%20conversation%20bubbles%20showing%20interview%20questions%20in%20Japanese%2C%20elegant%20minimalist%20design%2C%20professional%20UI%20screenshot%20with%20warm%20lighting%20and%20soft%20colors&width=600&height=400&seq=feature2&orientation=landscape",
      imageAlt: "AIアシスタント画面",
      details: [
        {
          icon: "fas fa-comments",
          title: "インタビュー形式の質問",
          description:
            "時代背景や状況に応じた質問で、より具体的な思い出を引き出します。",
        },
        {
          icon: "fas fa-brain",
          title: "感情分析と提案",
          description:
            "記述内容から感情を分析し、より深い気づきにつながる質問を提案。",
        },
        {
          icon: "fas fa-history",
          title: "時代背景の提示",
          description:
            "その時代の出来事を提示し、より鮮明な記憶の想起をサポート。",
        },
      ],
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      reverse: true,
    },
    {
      badge: {
        text: "家族共有",
        color: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      title: "家族の絆を深める共有機能",
      description:
        "大切な思い出を家族と共有し、コメントやリアクションを通じて世代を超えたコミュニケーションを育みます。",
      image:
        "https://readdy.ai/api/search-image?query=Family%20sharing%20interface%20showing%20multiple%20family%20members%20interacting%20with%20shared%20memories%2C%20elegant%20minimalist%20design%2C%20professional%20UI%20screenshot%20with%20warm%20lighting%20and%20soft%20colors%2C%20Japanese%20interface&width=600&height=400&seq=feature3&orientation=landscape",
      imageAlt: "家族共有画面",
      details: [
        {
          icon: "fas fa-user-shield",
          title: "プライバシー設定",
          description:
            "エピソードごとに公開範囲を設定可能。安心して共有できます。",
        },
        {
          icon: "fas fa-comments-alt",
          title: "コメント・リアクション",
          description:
            "思い出に対する家族の反応や追加情報で、物語がより豊かに。",
        },
        {
          icon: "fas fa-tree",
          title: "家系図との連携",
          description:
            "家系図上で思い出を整理。家族の歴史を視覚的に把握できます。",
        },
      ],
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      badge: {
        text: "一般公開",
        color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      },
      title: "人生の経験を社会へ",
      description:
        "選択したエピソードを一般公開し、あなたの経験を必要とする誰かへ。新たな出会いと気づきが生まれます。",
      image:
        "https://readdy.ai/api/search-image?query=Public%20sharing%20interface%20showing%20curated%20life%20stories%20and%20community%20interactions%2C%20elegant%20minimalist%20design%2C%20professional%20UI%20screenshot%20with%20warm%20lighting%20and%20soft%20colors%2C%20Japanese%20interface&width=600&height=400&seq=feature4&orientation=landscape",
      imageAlt: "一般公開画面",
      details: [
        {
          icon: "fas fa-users",
          title: "コミュニティ機能",
          description:
            "同じ経験を持つ人々とつながり、経験と知恵を共有できます。",
        },
        {
          icon: "fas fa-lightbulb",
          title: "テーマ別整理",
          description:
            "人生の転機や成功体験など、テーマごとに整理して公開できます。",
        },
        {
          icon: "fas fa-hand-holding-heart",
          title: "メンタリング機能",
          description: "経験を活かして後進の相談に応じることができます。",
        },
      ],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      reverse: true,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            機能紹介
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            思い出を<span className="text-indigo-600">カタチ</span>にする
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            crestoryの4つの主要機能が、あなたの人生の物語作りをサポートします。
          </p>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${feature.reverse ? "lg:grid-cols-2" : ""}`}
          >
            <div className={feature.reverse ? "order-2 lg:order-1" : ""}>
              {feature.reverse && (
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="rounded-xl shadow-xl"
                />
              )}
              {!feature.reverse && (
                <div>
                  <div className="mb-6">
                    <Badge className={feature.badge.color}>
                      {feature.badge.text}
                    </Badge>
                    <h3 className="mt-4 mb-4 text-2xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-gray-600">{feature.description}</p>
                  </div>
                  <div className="space-y-4">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start">
                        <div
                          className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${feature.bgColor}`}
                        >
                          <i
                            className={`${detail.icon} ${feature.iconColor}`}
                          ></i>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold">{detail.title}</h4>
                          <p className="text-gray-600">{detail.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={feature.reverse ? "order-1 lg:order-2" : ""}>
              {!feature.reverse && (
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="rounded-xl shadow-xl"
                />
              )}
              {feature.reverse && (
                <div>
                  <div className="mb-6">
                    <Badge className={feature.badge.color}>
                      {feature.badge.text}
                    </Badge>
                    <h3 className="mt-4 mb-4 text-2xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-gray-600">{feature.description}</p>
                  </div>
                  <div className="space-y-4">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start">
                        <div
                          className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${feature.bgColor}`}
                        >
                          <i
                            className={`${detail.icon} ${feature.iconColor}`}
                          ></i>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold">{detail.title}</h4>
                          <p className="text-gray-600">{detail.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureDetailsSection;
