"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      image:
        "https://readdy.ai/api/search-image?query=A%20digital%20editor%20interface%20for%20creating%20personal%20memoirs%2C%20showing%20text%20editing%20and%20photo%20upload%20features%2C%20elegant%20minimalist%20design%20with%20soft%20indigo%20accents%2C%20Japanese%20interface%20elements%2C%20professional%20UI%20design&width=400&height=300&seq=feature1&orientation=landscape",
      title: "自分史作成・編集",
      description:
        "直感的なエディタで、人生の１ページを彩るエピソードを作成できます。リッチテキストやライフイベントタグで整理も簡単。",
      icon: "fas fa-edit",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=AI%20assistant%20interface%20helping%20with%20memoir%20creation%2C%20showing%20conversation%20with%20AI%20and%20suggested%20questions%2C%20elegant%20minimalist%20design%20with%20soft%20blue%20accents%2C%20Japanese%20interface%20elements%2C%20professional%20UI%20design&width=400&height=300&seq=feature2&orientation=landscape",
      title: "AI アシスタント",
      description:
        "AIがあなたの自分史作りをサポート。インタビュー形式で質問を投げかけ、より深い自己発見へと導きます。",
      icon: "fas fa-robot",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=Family%20sharing%20interface%20showing%20multiple%20family%20members%20accessing%20shared%20memories%2C%20elegant%20minimalist%20design%20with%20soft%20green%20accents%2C%20Japanese%20interface%20elements%2C%20professional%20UI%20design%20with%20privacy%20controls&width=400&height=300&seq=feature3&orientation=landscape",
      title: "家族との共有",
      description:
        "プライバシーに配慮しながら、大切な家族と自分史を共有。世代を超えたコミュニケーションのきっかけを作ります。",
      icon: "fas fa-users",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=Public%20sharing%20interface%20showing%20curated%20life%20stories%20being%20shared%20with%20community%2C%20elegant%20minimalist%20design%20with%20soft%20purple%20accents%2C%20Japanese%20interface%20elements%2C%20professional%20UI%20design%20with%20privacy%20controls&width=400&height=300&seq=feature4&orientation=landscape",
      title: "一般公開機能",
      description:
        "人生の岐路に立つ人々と経験を共有。多様な人生経験との出会いを通じて、新たな可能性への気づきを得られます。",
      icon: "fas fa-globe",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            主要機能
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            あなたの人生を彩る
            <span className="text-indigo-600">ストーリー</span>を作成
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            crestoryは、あなたの大切な思い出を記録し、整理し、共有するための
            すべてのツールを提供します。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="cursor-pointer overflow-hidden border-none bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-indigo-50">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div
                    className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${feature.bgColor}`}
                  >
                    <i className={`${feature.icon} ${feature.iconColor}`}></i>
                  </div>
                  {feature.title}
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
