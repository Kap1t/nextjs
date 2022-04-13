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
    const response2 = await fetch(`${process.env.HOST}/api/technology`);
    const technology = await response2.json();
    const response = await fetch(`${process.env.HOST}/api/articlesList`);
    const datas = await response.json();
    const paths: any = [];
    for (let index = 0; index < technology.length; index++) {
      const oneTechnology = technology[index];

      for (let index = 0; index < datas.length; index++) {
        const oneData = datas[index];
        paths.push({ params: { technology: oneTechnology.ref, id: oneData.ref } });
      }
    }

    // const paths = datas.map((data: any) => ({
    //   params: { technology: "javascript", id: data.ref },
    // }));

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
    const topics = await response.json();

    if (!topics) {
      return {
        notFound: true,
      };
    }
    return {
      props: { topics },
    };
  } catch (error) {
    return {
      props: { topics: null },
      // revalidate: 10,
    };
  }
};

interface Props {
  topics: Data[];
}

const Post: NextPage<Props> = ({ topics }) => {
  const router = useRouter();

  if (topics.length === 0) {
    return <div>Загрузка</div>;
  }
  return (
    <MainLayout title={router.query.id || "react"}>
      <section className="article">
        <h1>Методы массивов</h1>

        {topics.map((data, index) => {
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
//   const topics = await response.json();
//   console.log(context.query.id);
//   return {
//     props: { topics },
//   };
// };

export default Post;
