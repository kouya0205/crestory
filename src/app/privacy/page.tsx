export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            プライバシーポリシー
          </h1>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                1. 個人情報の取得
              </h2>
              <p className="leading-relaxed text-gray-700">
                当社は、自分史サービス（以下「本サービス」といいます。）の提供にあたり、
                以下の個人情報を取得いたします。
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                <li>氏名</li>
                <li>メールアドレス</li>
                <li>ユーザーが投稿したエピソード内容</li>
                <li>アップロードされた画像</li>
                <li>サービス利用履歴</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                2. 個人情報の利用目的
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                当社は、取得した個人情報を以下の目的で利用いたします。
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>本サービスの提供・運営</li>
                <li>ユーザーサポート・お問い合わせ対応</li>
                <li>サービス改善・新機能開発</li>
                <li>利用規約違反の調査・対応</li>
                <li>重要なお知らせの配信</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                3. 家族共有機能について
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                本サービスでは、ユーザーが「家族のみ」に設定したエピソードを、
                承認された家族メンバー間で共有する機能を提供しています。
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  家族メンバーとして登録されたユーザーのみが、共有エピソードを閲覧できます
                </li>
                <li>ユーザーは、いつでも家族メンバーの登録を解除できます</li>
                <li>エピソードの公開範囲は、いつでも変更可能です</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                4. 個人情報の第三者提供
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                当社は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                5. 個人情報の管理
              </h2>
              <p className="leading-relaxed text-gray-700">
                当社は、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
                また、個人情報を取り扱う従業者や委託先に対して、必要かつ適切な監督を行います。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                6. Cookieの使用
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                本サービスでは、サービスの利便性向上のためにCookieを使用しています。
                Cookieの使用により、以下の情報を取得する場合があります。
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>ログイン状態の維持</li>
                <li>ユーザー設定の保存</li>
                <li>サービス利用状況の分析</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                7. 個人情報の開示・訂正・削除
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                ユーザーは、当社が保有する自己の個人情報について、以下の権利を有します。
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>個人情報の開示を求める権利</li>
                <li>個人情報の訂正・追加・削除を求める権利</li>
                <li>個人情報の利用停止・消去を求める権利</li>
                <li>個人情報の第三者提供の停止を求める権利</li>
              </ul>
              <p className="mt-4 leading-relaxed text-gray-700">
                これらの権利を行使される場合は、お問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                8. アカウント削除について
              </h2>
              <p className="leading-relaxed text-gray-700">
                ユーザーがアカウントを削除した場合、投稿されたエピソードや画像等の個人情報は、
                システムから完全に削除されます。ただし、法令により保存が義務付けられている情報については、
                法定期間中は保存される場合があります。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                9. プライバシーポリシーの変更
              </h2>
              <p className="leading-relaxed text-gray-700">
                当社は、法令の変更やサービス内容の変更等に伴い、本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、本サイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                10. お問い合わせ
              </h2>
              <p className="leading-relaxed text-gray-700">
                個人情報の取扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。
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
