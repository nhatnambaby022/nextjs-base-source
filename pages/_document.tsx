import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {

  return (
    <Html lang="en">
      <Head>
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml"></link>  
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-M1T7ZB3W7Z"></script>
      <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-M1T7ZB3W7Z');
              `,
            }}>
      </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
