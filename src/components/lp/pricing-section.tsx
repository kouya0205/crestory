"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PricingSection: React.FC = () => {
  const plans = [
    {
      title: "スタータープラン",
      price: "無料",
      features: [
        { text: "基本的な自分史作成機能", included: true },
        { text: "最大50エピソードの記録", included: true },
        { text: "写真アップロード（月100枚まで）", included: true },
        { text: "基本的なAIインタビュー機能", included: true },
        { text: "家族共有機能", included: false },
        { text: "高度なAI分析", included: false },
      ],
      buttonText: "無料で始める",
      popular: false,
    },
    {
      title: "ファミリープラン",
      price: "980",
      priceUnit: "円/月",
      features: [
        { text: "無制限のエピソード記録", included: true },
        { text: "写真アップロード無制限", included: true },
        { text: "最大5人までの家族共有", included: true },
        { text: "高度なAIインタビュー機能", included: true },
        { text: "音声入力機能", included: true },
        { text: "プロフェッショナル編集ツール", included: false },
      ],
      buttonText: "14日間無料トライアル",
      popular: true,
    },
    {
      title: "プレミアムプラン",
      price: "1,980",
      priceUnit: "円/月",
      features: [
        { text: "ファミリープランのすべての機能", included: true },
        { text: "最大15人までの家族共有", included: true },
        { text: "プロフェッショナル編集ツール", included: true },
        { text: "印刷用PDFエクスポート", included: true },
        { text: "優先サポート", included: true },
        { text: "高度なプライバシー設定", included: true },
      ],
      buttonText: "14日間無料トライアル",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            料金プラン
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            あなたに<span className="text-indigo-600">ぴったり</span>
            のプラン
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            個人利用から家族共有まで、ニーズに合わせた柔軟なプランをご用意しています。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-none bg-white shadow-lg transition-shadow hover:shadow-xl ${plan.popular ? "relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="bg-indigo-600 py-1 text-center text-sm font-medium text-white">
                    人気プラン
                  </div>
                </div>
              )}
              <CardHeader
                className={`pb-4 text-center ${plan.popular ? "pt-8" : ""}`}
              >
                <CardTitle className="text-xl">{plan.title}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.priceUnit && (
                    <span className="ml-1 text-gray-500">{plan.priceUnit}</span>
                  )}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <i className="fas fa-check mt-1 mr-2 text-green-500"></i>
                      ) : (
                        <i className="fas fa-times mt-1 mr-2 text-gray-400"></i>
                      )}
                      <span className={feature.included ? "" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="!rounded-button mt-8 w-full cursor-pointer bg-indigo-600 whitespace-nowrap text-white hover:bg-indigo-700">
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
