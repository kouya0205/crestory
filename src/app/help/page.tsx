"use client";

import { motion } from "framer-motion";
import {
  Book,
  Sparkles,
  Users,
  Globe,
  Shield,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  Mail,
  LogIn,
  PenTool,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { LpHeader } from "@/components/lp/header";
import Link from "next/link";
import Footer from "@/components/lp/footer";

export default function HelpPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const helpSections = [
    {
      id: "basic",
      icon: Book,
      title: "基本的な使い方",
      items: [
        {
          title: "アカウント登録・ログイン方法",
          content:
            "メールアドレスまたはSNSアカウントで簡単に登録できます。登録後は自動的にログインされ、すぐに利用を開始できます。",
        },
        {
          title: "初回セットアップの流れ",
          content:
            "プロフィール情報の入力、家族IDの設定、基本的な使い方のチュートリアルをご案内します。約5分程度で完了します。",
        },
        {
          title: "ダッシュボードの見方と基本操作",
          content:
            "ダッシュボードでは、最近のエピソード、家族の活動、AIからのおすすめなどが一目で確認できます。",
        },
      ],
    },
    {
      id: "story",
      icon: PenTool,
      title: "自分史作成関連",
      items: [
        {
          title: "エピソードの新規作成手順",
          content:
            "「新規作成」ボタンから、タイトル、本文、写真を追加できます。直感的なエディタで簡単に作成できます。",
        },
        {
          title: "リッチテキストエディタの使い方",
          content:
            "文字の装飾（太字、斜体）、箇条書き、引用など、豊富な編集機能を備えています。写真の配置も自由自在です。",
        },
        {
          title: "ライフイベントタグの設定方法",
          content:
            "エピソードに関連するライフイベント（学生時代、結婚、仕事など）をタグ付けできます。後から振り返りやすくなります。",
        },
        {
          title: "写真のアップロード方法",
          content:
            "1つのエピソードに最大10枚まで写真を追加できます。ドラッグ&ドロップでの追加も可能です。",
        },
        {
          title: "下書き保存と公開の違い",
          content:
            "下書き保存では自分だけが閲覧可能です。内容の確認や編集を重ねた後、準備が整ってから公開することができます。",
        },
      ],
    },
    {
      id: "ai",
      icon: Sparkles,
      title: "AIアシスタント機能",
      items: [
        {
          title: "AIインタビュアーの使い方",
          content:
            "AIが状況に応じた質問を投げかけ、より深い思い出の掘り起こしをサポートします。会話形式で進めていきます。",
        },
        {
          title: "AI簡易キャプション提案の活用方法",
          content:
            "アップロードした写真に対して、AIが適切なキャプションを提案します。そのまま使用するか、編集して使用できます。",
        },
        {
          title: "AIとの対話のコツ",
          content:
            "具体的なエピソードや感情を伝えることで、より的確な質問や提案を受けることができます。",
        },
      ],
    },
    {
      id: "family",
      icon: Users,
      title: "家族共有機能",
      items: [
        {
          title: "家族IDの発行方法",
          content:
            "設定画面から家族IDを発行できます。このIDを家族メンバーに共有することで、グループを作成できます。",
        },
        {
          title: "家族メンバーの招待・承認手順",
          content:
            "家族IDを使って招待されたメンバーは、承認後にグループに参加できます。プライバシーを守るため、相互承認が必要です。",
        },
        {
          title: "エピソードごとの公開設定方法",
          content:
            "各エピソードで「家族のみに公開」「特定の家族メンバーのみに公開」などを選択できます。",
        },
        {
          title: "家族の自分史を閲覧する方法",
          content:
            "家族ページから、共有されているエピソードを時系列で閲覧できます。コメントやリアクションも可能です。",
        },
      ],
    },
    {
      id: "public",
      icon: Globe,
      title: "一般公開機能",
      items: [
        {
          title: "選択エピソードの公開設定",
          content:
            "公開したいエピソードを選択し、公開範囲を「一般公開」に設定するだけで、誰でも閲覧できるようになります。",
        },
        {
          title: "ストーリー検索の使い方",
          content:
            "キーワードやタグを使って、公開されているエピソードを検索できます。カテゴリ別の閲覧も可能です。",
        },
        {
          title: "他の人のエピソードの閲覧方法",
          content:
            "公開エピソード一覧から、興味のある記事を見つけることができます。お気に入り登録して後から読むこともできます。",
        },
      ],
    },
    {
      id: "privacy",
      icon: Shield,
      title: "プライバシー・セキュリティ",
      items: [
        {
          title: "個人情報の取り扱いについて",
          content:
            "ご提供いただいた個人情報は、厳重に管理され、サービスの提供以外の目的では使用されません。",
        },
        {
          title: "公開範囲の設定と変更方法",
          content:
            "エピソードごとに「非公開」「家族のみ」「一般公開」から選択できます。設定は後からでも変更可能です。",
        },
        {
          title: "アカウント削除の手順",
          content:
            "設定画面からアカウントの削除が可能です。削除前に、保存したエピソードのバックアップをお勧めします。",
        },
      ],
    },
    {
      id: "trouble",
      icon: AlertCircle,
      title: "トラブルシューティング",
      items: [
        {
          title: "ログインできない場合の対処法",
          content:
            "メールアドレスとパスワードの確認、ブラウザのキャッシュクリアをお試しください。それでも解決しない場合はサポートへご連絡ください。",
        },
        {
          title: "写真がアップロードできない場合",
          content:
            "対応フォーマット（JPG、PNG）と容量制限（1枚あたり10MB以下）をご確認ください。",
        },
        {
          title: "家族招待がうまくいかない場合",
          content:
            "家族IDが正しいか、既に別の家族グループに所属していないかをご確認ください。",
        },
        {
          title: "エピソードが保存されない場合",
          content:
            "一時的な通信エラーの可能性があります。下書き保存を活用し、こまめな保存を心がけてください。",
        },
      ],
    },
    {
      id: "faq",
      icon: HelpCircle,
      title: "よくある質問（FAQ）",
      items: [
        {
          title: "料金について",
          content:
            "基本機能は無料でご利用いただけます。プレミアム機能（容量無制限、AIアシスタントの高度な機能など）は月額980円でご利用いただけます。",
        },
        {
          title: "データの保存期間",
          content:
            "データは永続的に保存されます。ただし、1年以上ログインがない場合は、事前に通知の上、アーカイブされる場合があります。",
        },
        {
          title: "対応ブラウザ・デバイス",
          content:
            "最新のChrome、Safari、Firefox、Edgeに対応しています。スマートフォン、タブレットからもご利用いただけます。",
        },
        {
          title: "バックアップについて",
          content:
            "サーバー上で自動的にバックアップされます。また、エピソードをPDF形式でエクスポートすることも可能です。",
        },
      ],
    },
  ];

  const toggleItem = (sectionId: string, itemTitle: string) => {
    const key = `${sectionId}-${itemTitle}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <LpHeader />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ヘルプセンター
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            crestoryの使い方について、詳しく解説します
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl space-y-12">
          {helpSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <section.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const isOpen = openItems[`${section.id}-${item.title}`];
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="overflow-hidden rounded-xl bg-white shadow-md"
                    >
                      <button
                        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
                        onClick={() => toggleItem(section.id, item.title)}
                      >
                        <h3 className="font-medium">{item.title}</h3>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100 p-4"
                        >
                          <p className="text-gray-600">{item.content}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-12 max-w-4xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="mb-4 text-2xl font-bold">お問い合わせ</h2>
          <p className="mb-6">
            解決できない問題がございましたら、お気軽にお問い合わせください
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>メールでのお問い合わせ</span>
              </Link>
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>チャットサポート</span>
            </motion.button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
