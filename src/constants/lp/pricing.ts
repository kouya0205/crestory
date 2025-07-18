import { Check, Sparkles, Mic } from "lucide-react";

export const plans = [
  {
    name: "Free",
    description: "デジタル自分史作成の基本機能を無料で利用できます",
    price: "¥0",
    period: "永久無料",
    icon: Check,
    features: [
      "基本的なテンプレート利用可能",
      "写真のアップロード",
      "基本的な文章編集機能",
      "家族との共有機能（最大3人）",
      "作成した自分史の保存",
    ],
    buttonText: "無料で始める",
    popular: false,
    gradient: "from-green-400 to-cyan-500",
  },
  {
    name: "AI Assistant",
    description: "AIがあなたの自分史作成をサポートします",
    price: "Coming Soon",
    period: "月額",
    icon: Sparkles,
    features: [
      "Freeプランの全機能",
      "AIによる文章校正・提案",
      "AIによる質問生成",
      "AIによる文章生成支援",
      "家族との共有機能（無制限）",
      "高度な編集機能",
      "プレミアムテンプレート",
    ],
    buttonText: "事前登録する",
    popular: true,
    gradient: "from-purple-600 to-blue-500",
  },
  {
    name: "Voice Assistant",
    description: "音声認識で簡単に自分史を作成できます",
    price: "Coming Soon",
    period: "月額",
    icon: Mic,
    features: [
      "AIアシスタントの全機能",
      "音声認識による文章入力",
      "音声コマンド対応",
      "音声による編集機能",
      "自動文字起こし",
      "音声メモ機能",
    ],
    buttonText: "事前登録する",
    popular: false,
    gradient: "from-orange-500 to-pink-500",
  },
];
