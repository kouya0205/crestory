"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const services = [
    {
      name: "自分史作成",
      href: "https://readdy.ai/home/d0e037fa-d273-41a4-9999-875cb101e995/d1c70405-9a82-4987-ac98-824bd331f2db",
    },
    { name: "AIアシスタント", href: "#" },
    { name: "家族共有", href: "#" },
    { name: "プライバシー設定", href: "#" },
    { name: "データエクスポート", href: "#" },
  ];

  const company = [
    { name: "運営会社", href: "#" },
    { name: "プライバシーポリシー", href: "#" },
    { name: "利用規約", href: "#" },
    { name: "特定商取引法", href: "#" },
    { name: "お問い合わせ", href: "#" },
  ];

  const socialLinks = [
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-facebook", href: "#" },
    { icon: "fab fa-instagram", href: "#" },
    { icon: "fab fa-youtube", href: "#" },
  ];

  const paymentMethods = [
    { icon: "fab fa-cc-visa" },
    { icon: "fab fa-cc-mastercard" },
    { icon: "fab fa-cc-amex" },
    { icon: "fab fa-cc-paypal" },
  ];

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                <i className="fas fa-book-open text-white"></i>
              </div>
              <span className="text-xl font-bold text-white">crestory</span>
            </div>
            <p className="mb-6 text-gray-400">
              あなたの人生の物語を、未来へつなぐデジタル自分史プラットフォーム
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="cursor-pointer text-gray-400 transition-colors hover:text-white"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">サービス</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="cursor-pointer text-gray-400 transition-colors hover:text-white"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">会社情報</h3>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="cursor-pointer text-gray-400 transition-colors hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">ニュースレター</h3>
            <p className="mb-4 text-gray-400">
              最新情報やお役立ち情報をお届けします
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="メールアドレス"
                className="rounded-l-md border-none bg-gray-800 px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <Button className="!rounded-button cursor-pointer rounded-l-none rounded-r-md bg-indigo-600 whitespace-nowrap hover:bg-indigo-700">
                登録
              </Button>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-400">安全な決済方法</p>
              <div className="mt-2 flex space-x-3">
                {paymentMethods.map((method, index) => (
                  <i
                    key={index}
                    className={`${method.icon} text-2xl text-gray-400`}
                  ></i>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; 2025 crestory All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <a
              href="#"
              className="cursor-pointer text-sm text-gray-400 transition-colors hover:text-white"
            >
              プライバシーポリシー
            </a>
            <a
              href="#"
              className="cursor-pointer text-sm text-gray-400 transition-colors hover:text-white"
            >
              利用規約
            </a>
            <a
              href="#"
              className="cursor-pointer text-sm text-gray-400 transition-colors hover:text-white"
            >
              特定商取引法
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
