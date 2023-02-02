import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Learn with chat</title>
      </Head>
      <div className="bg-neutral h-full min-h-[100vh]">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
