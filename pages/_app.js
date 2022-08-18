import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-800 h-screen">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
