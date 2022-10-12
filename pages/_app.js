import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-neutral h-full min-h-[100vh]">
      <Head>
        <title>GSS Dashboad</title>
      </Head>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
