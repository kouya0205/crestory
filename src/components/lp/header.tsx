"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                <i className="fas fa-book-open text-white"></i>
              </div>
              <span className="text-xl font-bold text-indigo-600">
                crestory
              </span>
            </a>
          </div>
          {/* デスクトップナビゲーション */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="whitespace-nowrap text-gray-700 transition-colors hover:text-indigo-600"
            >
              機能
            </a>
            <a
              href="#demo"
              className="whitespace-nowrap text-gray-700 transition-colors hover:text-indigo-600"
            >
              使用例
            </a>
            <a
              href="#testimonials"
              className="whitespace-nowrap text-gray-700 transition-colors hover:text-indigo-600"
            >
              ユーザーの声
            </a>
            <a
              href="#pricing"
              className="whitespace-nowrap text-gray-700 transition-colors hover:text-indigo-600"
            >
              料金プラン
            </a>
            <Button className="!rounded-button cursor-pointer bg-indigo-600 whitespace-nowrap text-white hover:bg-indigo-700">
              無料で始める
            </Button>
          </nav>
          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="!rounded-button cursor-pointer"
            >
              <i className="fas fa-bars text-gray-700"></i>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
