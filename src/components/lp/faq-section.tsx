"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "crestoryは初心者でも使いやすいですか？",
      answer:
        "はい、直感的なインターフェースを採用しており、パソコンやスマートフォンの基本操作ができれば簡単にご利用いただけます。また、AIアシスタントが質問を通じてサポートするので、何を書けばいいか迷うこともありません。",
    },
    {
      question: "家族と共有する際のプライバシーは守られますか？",
      answer:
        "はい、プライバシー保護は最優先事項です。共有設定は細かく調整でき、特定のエピソードごとに公開範囲を設定できます。また、すべてのデータは暗号化されており、許可なく第三者がアクセスすることはできません。",
    },
    {
      question: "データのバックアップはどうなっていますか？",
      answer:
        "すべてのデータは自動的にクラウドにバックアップされます。また、プレミアムプランではPDFやデジタルアーカイブとしてエクスポートすることも可能です。大切な思い出が失われることはありません。",
    },
    {
      question: "AIアシスタントはどのように役立ちますか？",
      answer:
        "AIアシスタントは、あなたの入力内容に基づいて関連質問を提案し、より深い思い出を引き出します。例えば「学生時代の思い出」について書き始めると、「部活動は何をしていましたか？」「印象に残っている先生はいますか？」といった質問で記憶を掘り下げるサポートをします。",
    },
    {
      question: "無料プランでもずっと使えますか？",
      answer:
        "はい、無料プランには一部機能制限がありますが、基本的な自分史作成機能は無期限でご利用いただけます。容量制限や共有人数に制限がありますが、個人での利用には十分な内容となっています。",
    },
    {
      question: "スマートフォンでも利用できますか？",
      answer:
        "もちろんです。レスポンシブデザインを採用しており、スマートフォンやタブレットなど、さまざまなデバイスで快適にご利用いただけます。外出先でふと思い出したエピソードも、すぐに記録することができます。",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            よくある質問
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            ご不明な点は<span className="text-indigo-600">こちら</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            crestoryに関するよくある質問をまとめました。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8">
              <h3 className="mb-3 text-xl font-bold">
                <i className="fas fa-question-circle mr-2 text-indigo-600"></i>
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
