"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  const features = [
    {
      icon: "fas fa-lock",
      title: "安全なデータ保管",
      description: "暗号化技術で保護",
    },
    {
      icon: "fas fa-headset",
      title: "充実サポート",
      description: "いつでもお問い合わせ可能",
    },
    {
      icon: "fas fa-undo",
      title: "30日間返金保証",
      description: "安心してお試しください",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-indigo-600 py-20">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20pattern%20of%20connecting%20lines%20and%20dots%20representing%20family%20connections%20and%20memories%2C%20elegant%20minimalist%20design%20with%20soft%20indigo%20and%20white%20colors%2C%20professional%20background%20design&width=1440&height=400&seq=cta1&orientation=landscape"
          alt="背景パターン"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            あなたの大切な思い出を、未来へつなぎませんか？
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-indigo-100">
            今日から始める自分史作り。家族との新たな絆が生まれます。
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="!rounded-button cursor-pointer bg-white px-8 py-6 text-lg whitespace-nowrap text-indigo-600 hover:bg-gray-100">
              無料で始める <i className="fas fa-arrow-right ml-2"></i>
            </Button>
            <Button
              variant="outline"
              className="!rounded-button cursor-pointer border-indigo-200 px-8 py-6 text-lg whitespace-nowrap text-white hover:bg-indigo-700"
            >
              <i className="fas fa-calendar-alt mr-2"></i> デモ予約
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500">
                  <i className={`${feature.icon} text-white`}></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">{feature.title}</p>
                  <p className="text-sm text-indigo-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
