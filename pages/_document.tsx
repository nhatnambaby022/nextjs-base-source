import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-M1T7ZB3W7Z"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M1T7ZB3W7Z');
          `}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
