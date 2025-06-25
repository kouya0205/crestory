"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=A%20warm%20and%20emotional%20family%20scene%20with%20multiple%20generations%20sharing%20stories%2C%20soft%20lighting%20creating%20a%20cozy%20atmosphere%2C%20with%20subtle%20digital%20elements%20representing%20memories%20and%20storytelling%2C%20modern%20minimalist%20aesthetic%20with%20warm%20color%20palette%2C%20high%20quality%20professional%20photography&width=1440&height=800&seq=hero1&orientation=landscape"
          alt="家族の思い出を共有する様子"
          className="h-full w-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-indigo-50/90 to-transparent"></div>
      </div>
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <Badge className="bg-indigo-100 px-4 py-1.5 text-sm text-indigo-800 hover:bg-indigo-200">
              2025年6月 サービス開始
            </Badge>
            <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
              あなたの人生の物語を、
              <br />
              <span className="text-indigo-600">未来へつなぐ</span>
            </h1>
            <p className="max-w-lg text-lg text-gray-600 md:text-xl">
              個人の大切なエピソードを記録し、家族と共有できるデジタル自分史作成プラットフォーム。世代を超えたコミュニケーションを促進します。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="!rounded-button cursor-pointer bg-indigo-600 px-8 py-6 text-lg whitespace-nowrap text-white hover:bg-indigo-700">
                無料で始める <i className="fas fa-arrow-right ml-2"></i>
              </Button>
              <Button
                variant="outline"
                className="!rounded-button cursor-pointer border-indigo-200 px-8 py-6 text-lg whitespace-nowrap text-indigo-600 hover:bg-indigo-50"
              >
                <i className="fas fa-play-circle mr-2"></i> デモを見る
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                <Avatar className="h-8 w-8 cursor-pointer border-2 border-white">
                  <AvatarImage src="https://readdy.ai/api/search-image?query=Portrait%20of%20a%20Japanese%20elderly%20man%20with%20gentle%20smile%2C%20warm%20lighting%2C%20soft%20background%2C%20professional%20photography%2C%20high%20quality&width=100&height=100&seq=avatar1&orientation=squarish" />
                  <AvatarFallback>HS</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 cursor-pointer border-2 border-white">
                  <AvatarImage src="https://readdy.ai/api/search-image?query=Portrait%20of%20a%20Japanese%20middle-aged%20woman%20with%20kind%20expression%2C%20warm%20lighting%2C%20soft%20background%2C%20professional%20photography%2C%20high%20quality&width=100&height=100&seq=avatar2&orientation=squarish" />
                  <AvatarFallback>YT</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 cursor-pointer border-2 border-white">
                  <AvatarImage src="https://readdy.ai/api/search-image?query=Portrait%20of%20a%20Japanese%20young%20adult%20with%20friendly%20smile%2C%20warm%20lighting%2C%20soft%20background%2C%20professional%20photography%2C%20high%20quality&width=100&height=100&seq=avatar3&orientation=squarish" />
                  <AvatarFallback>KN</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">1,500+</span> 人が利用中
              </p>
            </div>
          </div>
          <div className="relative hidden md:block">
            <img
              src="https://readdy.ai/api/search-image?query=A%20digital%20memoir%20application%20interface%20showing%20family%20photos%20and%20stories%2C%20elegant%20minimalist%20design%20with%20soft%20colors%2C%20displayed%20on%20a%20modern%20device%2C%20professional%20UI%20design%20mockup%20with%20Japanese%20text%20elements%2C%20high%20quality&width=600&height=700&seq=hero2&orientation=portrait"
              alt="crestoryアプリケーションの画面"
              className="rounded-xl border border-gray-100 shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <i className="fas fa-users text-green-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium">家族との共有</p>
                  <p className="text-xs text-gray-500">3世代をつなぐ</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 rounded-lg bg-white p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <i className="fas fa-robot text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium">AIアシスタント</p>
                  <p className="text-xs text-gray-500">思い出を引き出す</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform animate-bounce md:block">
        <a
          href="#features"
          className="cursor-pointer text-gray-400 transition-colors hover:text-indigo-600"
        >
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
