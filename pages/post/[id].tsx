import type { NextPage } from "next";
import { GetServerSideProps, GetStaticProps } from "next";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React, { useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../../components/MainLayout";

import { Data } from "../api/datas";

export const getStaticPaths = async () => {
  try {
    const response = await fetch(`${process.env.HOST}/api/articlesList`);
    const datas = await response.json();
    const paths = datas.map((data: any) => ({
      params: { id: data.ref },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {}
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await fetch(`${process.env.HOST}/api/datas`);
    const datas4 = await response.json();

    if (!datas4) {
      return {
        notFound: true,
      };
    }
    return {
      props: { datas4 },
    };
  } catch (error) {
    return {
      props: { datas4: null },
      // revalidate: 10,
    };
  }
};

interface Props {
  datas4: Data[];
}

const Post: NextPage<Props> = ({ datas4 }) => {
  const router = useRouter();

  if (datas4.length === 0) {
    return <div>Загрузка</div>;
  }
  return (
    <MainLayout title={router.query.id || "react"}>
      <section className="article">
        <h1>Методы массивов</h1>

        {datas4.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <h2>{data.header}</h2>
              {data.content.map((a, index) => {
                if (a.hasOwnProperty("text")) {
                  return <p key={index}>{a.text}</p>;
                  // return (
                  //   <div className="content" dangerouslySetInnerHTML={{ __html: a.text }}></div>
                  // );
                }
                if (a.hasOwnProperty("code")) {
                  return (
                    <SyntaxHighlighter
                      key={index}
                      language="tsx"
                      style={dracula}
                      showLineNumbers
                      customStyle={{ maxWidth: "800px" }}
                    >
                      {a.code}
                    </SyntaxHighlighter>
                  );
                } else {
                  return <></>;
                }
              })}
            </React.Fragment>
          );
        })}
      </section>
    </MainLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const response = await fetch(`${process.env.HOST}/api/datas`);
//   const datas4 = await response.json();
//   console.log(context.query.id);
//   return {
//     props: { datas4 },
//   };
// };

export default Post;
