"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      content:
        "「父が認知症になり、昔の記憶が薄れていく中、crestoryで若い頃の思い出を記録できました。今では家族で一緒に見返すことが、父との大切なコミュニケーションになっています。」",
      name: "佐藤 智子さん",
      role: "50代・会社員",
      avatar:
        "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20Japanese%20middle-aged%20woman%20with%20kind%20expression%2C%20warm%20lighting%2C%20soft%20background%2C%20professional%20photography%2C%20high%20quality&width=100&height=100&seq=testimonial1&orientation=squarish",
      fallback: "ST",
    },
    {
      content:
        "「祖父が戦後の苦労話をよく聞かせてくれましたが、詳細を忘れてしまっていました。AIの質問機能で思い出を引き出せ、家族の歴史として残せたことに感謝しています。」",
      name: "田中 裕介さん",
      role: "30代・エンジニア",
      avatar:
        "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20Japanese%20young%20man%20with%20thoughtful%20expression%2C%20warm%20lighting%2C%20soft%20background%2C%20professional%20photography%2C%20high%20quality&width=100&height=100&seq=testimonial2&orientation=squarish",
      fallback: "TY",
    },
    {
      content:
        "「小学校の総合学習で自分史プロジェクトを実施。子どもたちがcrestoryを使って家族にインタビューし、世代間の対話が生まれました。教育ツールとして最適です。」",
      name: "山田 美咲さん",
      role: "40代・小学校教師",
      avatar:
        "https://readdy.ai/api/search-image?query=Portrait%20of%20a%20Japanese%20female%20teacher%20with%20professional%20appearance%2C%20warm%20lighting%2C%20soft%20background%2C%20professional%20photography%2C%20high%20quality&width=100&height=100&seq=testimonial3&orientation=squarish",
      fallback: "MY",
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            ユーザーの声
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            crestoryが<span className="text-indigo-600">繋いだ</span>
            家族の絆
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            実際にcrestoryを利用されている方々の声をご紹介します。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none bg-white p-2 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="mb-6 text-gray-700">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
