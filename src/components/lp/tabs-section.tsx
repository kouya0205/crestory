"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsSection: React.FC = () => {
  const tabs = [
    {
      value: "personal",
      label: "個人の記録",
      title: "あなた自身の人生を記録",
      description:
        "日々の出来事から人生の転機まで、あなたの経験や感情を記録。将来の自分や家族への贈り物になります。",
      image:
        "https://readdy.ai/api/search-image?query=Japanese%20person%20writing%20personal%20memoir%20on%20digital%20device%2C%20thoughtful%20expression%2C%20surrounded%20by%20personal%20mementos%20and%20photos%2C%20warm%20lighting%2C%20cozy%20home%20setting%2C%20professional%20photography&width=600&height=400&seq=tab1&orientation=landscape",
      imageAlt: "個人の記録",
      features: [
        "日記のように日々の出来事を記録",
        "人生の転機や重要な決断の記録",
        "写真や音声でリッチな記録を作成",
        "AIによる自己発見の促進",
      ],
    },
    {
      value: "family",
      label: "家族の歴史",
      title: "家族の歴史を紡ぐ",
      description:
        "複数の家族メンバーの記録を一つにまとめ、家族の歴史書を作成。世代を超えた絆を深めます。",
      image:
        "https://readdy.ai/api/search-image?query=Japanese%20multi-generational%20family%20looking%20at%20family%20history%20together%20on%20digital%20device%2C%20sharing%20stories%2C%20emotional%20connection%2C%20warm%20lighting%2C%20cozy%20home%20setting%2C%20professional%20photography&width=600&height=400&seq=tab2&orientation=landscape",
      imageAlt: "家族の歴史",
      features: [
        "家系図と連携した記録",
        "家族の伝統や行事の記録",
        "複数メンバーによる共同編集",
        "家族限定の共有設定",
      ],
    },
    {
      value: "elderly",
      label: "高齢者の思い出",
      title: "高齢者の思い出を残す",
      description:
        "お年寄りの貴重な経験や知恵を記録し、次世代に伝えるためのデジタル遺産を作成します。",
      image:
        "https://readdy.ai/api/search-image?query=Japanese%20elderly%20person%20sharing%20memories%20with%20younger%20family%20member%20using%20digital%20device%2C%20emotional%20connection%2C%20nostalgic%20photos%20visible%20on%20screen%2C%20warm%20lighting%2C%20cozy%20home%20setting%2C%20professional%20photography&width=600&height=400&seq=tab3&orientation=landscape",
      imageAlt: "高齢者の思い出",
      features: [
        "音声入力による簡単記録",
        "AIによるインタビューサポート",
        "古い写真のデジタル化と整理",
        "若い世代との思い出の共有",
      ],
    },
    {
      value: "education",
      label: "教育活動",
      title: "教育活動での活用",
      description:
        "学校教育や生涯学習の場で、自分史作成を通じた自己理解や歴史学習に活用できます。",
      image:
        "https://readdy.ai/api/search-image?query=Japanese%20classroom%20setting%20with%20students%20creating%20digital%20memoirs%2C%20teacher%20guiding%2C%20educational%20atmosphere%2C%20digital%20devices%20visible%2C%20bright%20classroom%20environment%2C%20professional%20photography&width=600&height=400&seq=tab4&orientation=landscape",
      imageAlt: "教育活動",
      features: [
        "総合学習での自分史プロジェクト",
        "地域の歴史や文化の記録",
        "世代間交流プログラム",
        "生涯学習講座での活用",
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            活用シーン
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            様々なシーンで
            <span className="text-indigo-600">活用できる</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            crestoryは個人の記録から家族の歴史まで、様々な用途に対応します。
          </p>
        </div>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-1 md:grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="cursor-pointer whitespace-nowrap data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">{tab.title}</h3>
                  <p className="mb-6 text-gray-600">{tab.description}</p>
                  <ul className="space-y-3">
                    {tab.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-check-circle mr-2 text-green-500"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <img
                    src={tab.image}
                    alt={tab.imageAlt}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TabsSection;
