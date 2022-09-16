import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* favicons */}
          <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#388e3c" />

          <meta name="msapplication-TileColor" content="#eeeeee" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171a1c" />

          {/* noindex:   Webページをインデックスに登録しない */}
          {/* nofollow:  クロールの際にページからのリンクを追跡しない */}
          {/* noarchive: 検索結果にページへのキャッシュリンクを表示しない */}
          <meta name="robots" content="noindex, nofollow, noarchive" />

          {/* 自動翻訳を表示しない */}
          <meta httpEquiv="content-language" content="ja" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
