import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-200 h-full">
      <Head>
        <title>GSS Dashboad</title>
      </Head>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
