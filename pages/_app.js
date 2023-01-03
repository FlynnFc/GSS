import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GSS Dashboad</title>
      </Head>
      <div className="bg-neutral h-full min-h-[100vh]">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
