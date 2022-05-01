import Head from "next/head";

import { NextPage } from "next/types";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
  title: string | string[];
}

const MainLayout: NextPage<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
