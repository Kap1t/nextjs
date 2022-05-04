import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React, { useState } from "react";
import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MainLayout from "../../components/MainLayout";
import styles from "../../styles/Article.module.scss";

import useIsModaratorReq from "../../Hooks/useIsModeratorReq";
import ArticleModerator from "../../components/ArticleModerator";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response2 = await fetch(`${process.env.HOST_API}/api/technology`);
    const technology = await response2.json();
    const response = await fetch(`${process.env.HOST}/api/articlesList`);
    const datas = await response.json();
    const response3 = await fetch(`${process.env.HOST_API}/api/technology/alltopics`);
    const alltopics = await response3.json();

    const paths: any = [];
    // for (let index = 0; index < technology.length; index++) {
    //   const oneTechnology = technology[index];

    //   for (let index = 0; index < datas.length; index++) {
    //     const oneData = datas[index];
    //     paths.push({ params: { topics: oneTechnology.ref, article: oneData.ref } });
    //   }
    // }
    for (let index = 0; index < technology.length; index++) {
      const oneTechnology = technology[index];
      // console.log(oneTechnology.ref);

      for (let index = 0; index < alltopics.length; index++) {
        const oneTopic = alltopics[index];
        if (oneTopic.technology === oneTechnology.ref) {
          for (let index = 0; index < oneTopic.list.length; index++) {
            const element = oneTopic.list[index];
            paths.push({ params: { topics: oneTechnology.ref, article: element.ref } });
          }
        }
      }
    }
    // console.log(paths);

    return {
      paths,
      fallback: false,
    };
  } catch (error) {}
  return {
    paths: [],
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await fetch(
      `${process.env.HOST_API}/api/technology/${context.params?.topics}/${context.params?.article}`
    );
    const article = await response.json();
    if (!article) {
      return {
        notFound: true,
      };
    }
    return {
      props: { article },
      revalidate: 120,
    };
  } catch (error) {
    return {
      props: { article: null },
      // revalidate: 10,
    };
  }
};

const date = (dateFromApi: string) => {
  return new Date(dateFromApi).toLocaleString();
};
interface Props {
  article: {
    _id: string;
    ref: string;
    content: string;
    updatedAt: string;
  };
}

const Article: NextPage<Props> = ({ article }) => {
  const router = useRouter();
  const isModarator = useIsModaratorReq();

  const [markdownString, setMarkdownString] = useState(article?.content);

  if (article === null) {
    return <div>Загрузка</div>;
  }
  return (
    //! Добавить в article header название страницы в бд
    <MainLayout title={"react"}>
      <section className={styles.articleSection}>
        <div className={styles.ReactMarkdownBlock}>
          {/* <div className={styles.createdAt}>
            {"Обновлено: " + new Date(article.updatedAt).toLocaleDateString()}
          </div> */}
          <ReactMarkdown
            skipHtml={false}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    customStyle={{ padding: "15px 0" }}
                    className={styles.pre}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                    showLineNumbers
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdownString}
          </ReactMarkdown>
        </div>

        {isModarator && (
          <ArticleModerator
            article={article}
            markdownString={markdownString}
            setMarkdownString={setMarkdownString}
          />
        )}
      </section>
    </MainLayout>
  );
};

export default Article;
