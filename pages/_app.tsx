import "../styles/globals.scss";
import type { AppProps } from "next/app";
import ContextWrapper from "../Context/ContextWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextWrapper>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ContextWrapper>
  );
}

export default MyApp;
