import type { NextPage } from "next";
import { GetServerSideProps, GetStaticProps } from "next";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MainLayout from "../../components/MainLayout";

import { Data } from "../api/datas";

export const getStaticPaths = async () => {
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
    console.log(paths);

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
    const response = await fetch(
      `${process.env.HOST_API}/api/technology/${context.params?.topics}/${context.params?.article}`
    );
    const article = await response.json();
    // console.log(article);

    if (!article) {
      return {
        notFound: true,
      };
    }
    return {
      props: { article },
    };
  } catch (error) {
    return {
      props: { article: null },
      // revalidate: 10,
    };
  }
};

interface Props {
  article: {
    ref: string;
    content: string;
  };
}

const Post: NextPage<Props> = ({ article }) => {
  const router = useRouter();
  const markdownString2 = `Here is some JavaScript code:

  ~~~js
  export const getStaticProps: GetStaticProps = async (context) => {
    try {
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
  ~~~
  # HTML 
  **HTML**
  - Первый пункт.
  - Второй пункт.
  * Третий пункт.
    * nested item
  1. Первый **пункт**.
  2. Второй пункт.
  3. Третий пункт.
  4. nested

  ~~Зачёркнутый текст.~~
  - [ ] Невыполненная задача
- [ ] Невыполненная задача
- [X] Выполненная задача  

> blockquote

dasdsa

![img]()
  ~~~html
  <p><em>c</em></p>
  ~~~
  `;

  const [markdownString, setMarkdownString] = useState(article?.content);

  if (article === null) {
    return <div>Загрузка</div>;
  }
  return (
    <MainLayout title={router.query.topic || "react"}>
      <section className="article">
        <h1>
          Добавить к ref arrays сontent# arrays еще и technolgy для того, чтоыбы создавать
          typescript/objects и JavaScript/objects или не надо, чтобы не создать дважды
          JavaScript/objects
        </h1>
        <h1>
          поменять структуру топикс на technology : javascript, header : Основы JavaScrip, article :
          name : Методы массивов, ref: article это упростит перебор динамических роутов и
          редактирование
        </h1>
        {/* <div>{article.content}</div> */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula}
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
        <textarea
          name="textarea"
          value={markdownString}
          cols={130}
          rows={40}
          onChange={(e) => {
            setMarkdownString(e.target.value);
          }}
        ></textarea>
      </section>
    </MainLayout>
  );
};

export default Post;
