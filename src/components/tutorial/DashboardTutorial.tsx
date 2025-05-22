"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface TutorialStep {
  title: string;
  description: string;
  target: string; // CSSセレクタ
  position: "top" | "right" | "bottom" | "left" | "center";
}

interface DashboardTutorialProps {
  userId: string;
  onComplete: () => Promise<boolean>;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "ダッシュボードへようこそ",
    description:
      "PickBuyのダッシュボードでは、商品管理、ライブ配信、注文管理など全ての機能にアクセスできます。まずは基本的な使い方をご紹介します。",
    target: "body",
    position: "center",
  },
  {
    title: "統計情報",
    description:
      "こちらでは商品数、ライブ配信数、売上、お客様数などの重要な統計情報を確認できます。",
    target: ".mb-6.grid",
    position: "bottom",
  },
  {
    title: "最近の注文",
    description:
      "こちらでは最近の注文履歴を確認できます。注文状況の管理もここから行えます。",
    target: "div.grid.grid-cols-1.gap-6.lg\\:grid-cols-2 > div:first-child",
    position: "left",
  },
  {
    title: "ライブ配信予定",
    description:
      "予定されているライブ配信を確認できます。新しい配信の作成も簡単に行えます。",
    target: "div.grid.grid-cols-1.gap-6.lg\\:grid-cols-2 > div:last-child",
    position: "right",
  },
  {
    title: "サイドメニュー",
    description:
      "左側のメニューから商品管理、ライブ配信、注文管理、分析などの各機能にアクセスできます。",
    target: "aside",
    position: "right",
  },
];

export default function DashboardTutorial({
  userId,
  onComplete,
}: DashboardTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // ウィンドウサイズの変更を監視
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ターゲット要素の位置を取得する関数
  const getTargetPosition = (selector: string) => {
    if (selector === "body" || !document.querySelector(selector)) {
      return {
        top: windowSize.height / 2 - 150,
        left: windowSize.width / 2 - 200,
        width: 400,
        height: 300,
        position: "center" as const,
      };
    }

    const element = document.querySelector(selector);
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    const step = tutorialSteps[currentStep];
    if (!step) return null;

    // スクロール位置を考慮した絶対位置を計算
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
      position: step.position,
    };
  };

  // 要素が画面内に表示されるようスクロール
  const scrollToTarget = () => {
    const step = tutorialSteps[currentStep];
    if (!step || step.target === "body") return;

    const element = document.querySelector(step.target);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isInView) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // ステップ変更時に要素にスクロール
  useEffect(() => {
    scrollToTarget();
  }, [currentStep]);

  // チュートリアルを完了する関数
  const completeTutorial = async () => {
    try {
      const result = await onComplete();
      setIsVisible(false);
      return result;
    } catch (error) {
      console.error("チュートリアル完了の更新に失敗しました:", error);
      return false;
    }
  };

  // 次のステップに進む
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  // 前のステップに戻る
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // チュートリアルをスキップ
  const skipTutorial = () => {
    completeTutorial();
  };

  // ツールチップの位置とスタイルを計算
  const getTooltipStyle = () => {
    const step = tutorialSteps[currentStep];
    if (!step) return {};

    const target = getTargetPosition(step.target);
    if (!target) return {};

    const padding = 16; // ターゲットとツールチップの間のパディング
    const tooltipWidth = 300; // ツールチップの幅
    const tooltipHeight = 200; // ツールチップの推定高さ

    let style: any = {};

    // 画面の端に近い場合の調整用
    const edgeOffset = 20;

    switch (step.position) {
      case "top":
        style = {
          top: Math.max(edgeOffset, target.top - tooltipHeight - padding),
          left: Math.max(
            edgeOffset,
            target.left + target.width / 2 - tooltipWidth / 2,
          ),
        };
        break;
      case "right":
        style = {
          top: Math.max(
            edgeOffset,
            target.top + target.height / 2 - tooltipHeight / 2,
          ),
          left: Math.min(
            windowSize.width - tooltipWidth - edgeOffset,
            target.left + target.width + padding,
          ),
        };
        break;
      case "bottom":
        style = {
          top: Math.min(
            windowSize.height - tooltipHeight - edgeOffset,
            target.top + target.height + padding,
          ),
          left: Math.max(
            edgeOffset,
            target.left + target.width / 2 - tooltipWidth / 2,
          ),
        };
        break;
      case "left":
        style = {
          top: Math.max(
            edgeOffset,
            target.top + target.height / 2 - tooltipHeight / 2,
          ),
          left: Math.max(edgeOffset, target.left - tooltipWidth - padding),
        };
        break;
      case "center":
        style = {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
        break;
    }

    // 画面の右端を超えないように調整
    if (style.left + tooltipWidth > windowSize.width - edgeOffset) {
      style.left = windowSize.width - tooltipWidth - edgeOffset;
    }

    return style;
  };

  // ハイライト用のオーバーレイスタイルを計算
  const getHighlightStyle = () => {
    const step = tutorialSteps[currentStep];
    if (!step) return {};

    const target = getTargetPosition(step.target);
    if (!target || step.position === "center") {
      return {};
    }

    // スクロール位置を考慮した絶対位置
    return {
      position: "absolute" as const,
      top: target.top - 8,
      left: target.left - 8,
      width: target.width + 16,
      height: target.height + 16,
      zIndex: 60,
    };
  };

  if (!isVisible) return null;

  // 全画面オーバーレイではなく、ポインター操作を許可する実装に変更
  return (
    <>
      {/* 薄い背景オーバーレイ - クリックは通過させる */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-black/20" />

      {/* ハイライト領域 */}
      {tutorialSteps[currentStep]?.position !== "center" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-opacity-0 pointer-events-none absolute z-50 rounded-lg border-2 border-indigo-500 bg-white shadow-lg"
          style={getHighlightStyle()}
        />
      )}

      {/* ツールチップ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 w-[300px] rounded-lg bg-white p-4 shadow-xl"
          style={getTooltipStyle()}
        >
          {/* 閉じるボタン */}
          <button
            onClick={skipTutorial}
            className="absolute top-2 right-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <FiX size={18} />
          </button>

          {/* コンテンツ */}
          <div className="mb-3">
            <h3 className="mb-1 text-base font-semibold text-indigo-600">
              {tutorialSteps[currentStep]?.title}
            </h3>
            <p className="text-sm text-gray-600">
              {tutorialSteps[currentStep]?.description}
            </p>
          </div>

          {/* プログレスインジケータ */}
          <div className="mb-3 flex space-x-1">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={cn("h-1 flex-1 rounded-full", {
                  "bg-indigo-600": index <= currentStep,
                  "bg-gray-200": index > currentStep,
                })}
              />
            ))}
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between">
            <div>
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="flex items-center rounded-md px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                >
                  <FiArrowLeft className="mr-1" /> 前へ
                </button>
              )}
            </div>
            <div>
              {currentStep < tutorialSteps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  次へ <FiArrowRight className="ml-1" />
                </button>
              ) : (
                <button
                  onClick={completeTutorial}
                  className="flex items-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                >
                  完了 <FiCheck className="ml-1" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
