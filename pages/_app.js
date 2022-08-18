import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-100 h-screen">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
