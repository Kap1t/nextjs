import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";

import React from "react";
import { useRouter } from "next/router";

import MainLayout from "../components/MainLayout";
import styles from "../styles/Topics.module.scss";

import Link from "next/link";

import axios from "axios";
import useIsModaratorReq from "../Hooks/useIsModeratorReq";
import { AddArticle } from "../components/AddArticle";
import { articlesApi, revalidateApi } from "../Api/Api";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(`${process.env.HOST_API}/api/technology`);
    const technologies = await response.json();
    // console.log(technologies);
    const paths = technologies.map((oneTechnology: any) => ({
      params: { topics: oneTechnology.ref },
    }));

    return {
      paths,
      // fallback: false,
      fallback: "blocking",
    };
  } catch (error) {}
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await axios.get(
      `${process.env.HOST_API}/api/technology/${context.params?.topics}`
    );
    const topics: Topic[] = response.data;

    if (!topics) {
      return {
        notFound: true,
      };
    }
    return {
      props: { topics },
      revalidate: 40,
    };
  } catch (error) {
    return {
      props: { topics: null },
      // revalidate: 60,
    };
  }
};

interface Topic {
  _id: string;
  technology: string;
  header: string;
  list: {
    name: string;
    ref: string;
  }[];
}

interface Props {
  topics: Topic[];
}

const Topics: NextPage<Props> = ({ topics }) => {
  const router = useRouter();
  const isModarator = useIsModaratorReq();

  if (topics === null) {
    return <div>Загрузка</div>;
  }
  return (
    <MainLayout title={router.query.technology || "learnweb"}>
      <section className={styles.article}>
        <h1 className={styles.h1}>{router.query.technology}</h1>
        <ul className={styles.ol1}>
          {topics.map((topic, index) => {
            return (
              <li key={index} className={styles.li1}>
                <h3 className={styles.h3}>{topic.header}</h3>
                <ol>
                  {topic.list.map((link) => (
                    <li key={link.ref}>
                      <Link href={`${router.asPath}/${link.ref}`}>
                        <a className={styles.a}>{link.name}</a>
                      </Link>
                      {isModarator && (
                        <>
                          <span>{" " + link.ref}</span>
                          <button
                            onClick={() => {
                              const req = async () => {
                                try {
                                  const response = await articlesApi.deleteArticleProxy({
                                    topicId: `${topic._id}`,
                                    articleRef: `${link.ref}`,
                                  });
                                  const res2 = await revalidateApi.revalidate(
                                    `/${topic.technology}`
                                  );
                                  console.log(res2.data);

                                  router.reload();
                                  console.log(response.data);
                                } catch (error) {}
                              };
                              req();
                            }}
                          >
                            Del
                          </button>{" "}
                        </>
                      )}
                    </li>
                  ))}
                </ol>
                {isModarator && <AddArticle topic={topic} />}
              </li>
            );
          })}
        </ul>
      </section>
    </MainLayout>
  );
};

export default Topics;
