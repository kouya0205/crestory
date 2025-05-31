export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">利用規約</h1>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第1条（適用）
              </h2>
              <p className="leading-relaxed text-gray-700">
                本利用規約（以下「本規約」といいます。）は、自分史サービス（以下「本サービス」といいます。）の利用条件を定めるものです。
                登録ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第2条（利用登録）
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                当社がこれを承認することによって、利用登録が完了するものとします。
              </p>
              <p className="leading-relaxed text-gray-700">
                当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、
                その理由については一切の開示義務を負わないものとします。
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当社が利用登録を相当でないと判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第3条（ユーザーIDおよびパスワードの管理）
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
              </p>
              <p className="leading-relaxed text-gray-700">
                ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、
                もしくは第三者と共用することはできません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第4条（コンテンツの投稿）
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                ユーザーは、本サービスに自分史エピソードや画像等のコンテンツを投稿することができます。
                投稿されたコンテンツの著作権は、投稿したユーザーに帰属します。
              </p>
              <p className="leading-relaxed text-gray-700">
                ユーザーは、投稿するコンテンツについて、以下の事項を保証するものとします。
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                <li>
                  第三者の著作権、肖像権、プライバシー権等の権利を侵害しないこと
                </li>
                <li>法令に違反する内容を含まないこと</li>
                <li>公序良俗に反する内容を含まないこと</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第5条（プライバシーと家族共有）
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                本サービスでは、ユーザーが投稿したエピソードの公開範囲を「自分のみ」または「家族のみ」から選択できます。
              </p>
              <p className="leading-relaxed text-gray-700">
                「家族のみ」に設定されたエピソードは、ユーザーが承認した家族メンバーのみが閲覧できます。
                当社は、ユーザーの設定した公開範囲を適切に管理し、プライバシーの保護に努めます。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第6条（禁止事項）
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>第三者の著作権、商標権ほか知的財産権を侵害する行為</li>
                <li>第三者の名誉、信用、プライバシーを侵害する行為</li>
                <li>
                  本サービスのネットワークまたはシステム等に過度な負荷をかける行為
                </li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第7条（本サービスの提供の停止等）
              </h2>
              <p className="leading-relaxed text-gray-700">
                当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                <li>
                  本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                </li>
                <li>
                  地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                </li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当社が本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第8条（保証の否認および免責事項）
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、
                セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </p>
              <p className="leading-relaxed text-gray-700">
                当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第9条（サービス内容の変更等）
              </h2>
              <p className="leading-relaxed text-gray-700">
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
                これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第10条（利用規約の変更）
              </h2>
              <p className="leading-relaxed text-gray-700">
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                第11条（準拠法・裁判管轄）
              </h2>
              <p className="leading-relaxed text-gray-700">
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
              </p>
            </section>
          </div>

          <div className="mt-8 border-t pt-6 text-sm text-gray-500">
            <p>制定日：2024年1月1日</p>
            <p>最終更新日：2024年1月1日</p>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              トップページに戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
