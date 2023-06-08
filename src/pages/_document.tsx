import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;700&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        style={{
          margin: 0,
          height: "100vh",
          width: "100vw",
          backgroundColor: "black",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
