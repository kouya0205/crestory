"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DemoSection: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "エピソードを記録",
      description:
        "テキストや写真、音声でエピソードを記録。AIがインタビュー形式で質問し、思い出を引き出します。",
    },
    {
      number: "2",
      title: "タイムラインで整理",
      description:
        "記録したエピソードを時系列で整理。ライフイベントごとにタグ付けして、後から振り返りやすく。",
    },
    {
      number: "3",
      title: "家族と共有",
      description:
        "完成した自分史を家族メンバーと共有。コメントやリアクションで交流を深めることができます。",
    },
  ];

  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
              使用例
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              簡単3ステップで
              <br />
              <span className="text-indigo-600">自分史</span>を作成
            </h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    <span className="font-bold text-indigo-600">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="!rounded-button mt-8 cursor-pointer bg-indigo-600 px-6 py-3 whitespace-nowrap text-white hover:bg-indigo-700">
              今すぐ試してみる
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=Japanese%20family%20members%20of%20different%20generations%20using%20digital%20memoir%20app%20together%20on%20tablet%2C%20showing%20interface%20with%20timeline%20of%20memories%20and%20photos%2C%20warm%20lighting%2C%20cozy%20home%20setting%2C%20professional%20photography&width=600&height=700&seq=demo1&orientation=portrait"
              alt="crestoryの使用イメージ"
              className="rounded-xl shadow-xl"
            />
            <div className="absolute -right-6 -bottom-6 max-w-xs rounded-lg bg-white p-4 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                  <i className="fas fa-lightbulb text-yellow-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium">AIが質問を提案</p>
                  <p className="text-xs text-gray-500">
                    「学生時代の思い出は？」「初めての仕事は？」など、AIが適切な質問を提案し、記憶を引き出します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
