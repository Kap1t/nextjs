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
import { AddTopic } from "../components/AddTopic";

import { DeleteArticleBtn } from "../components/DeleteArticleBtn";
import { articlesApi } from "../Api/Api";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(`${process.env.HOST_API}/api/technology`);
    const technologies = await response.json();
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

    if (!topics.length) {
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
      notFound: true,
      // props: { topics: null },
      // revalidate: 60,
    };
  }
};

interface Topic {
  _id: string;
  technology: string;
  header: string;
  list: {
    _id: string;
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

  return (
    <MainLayout title={router.query.technology || "learnweb"}>
      <section className={styles.article}>
        <h1 className={styles.h1}>{router.query.technology}</h1>

        <div>{isModarator && <AddTopic />}</div>

        <ul className={styles.ul}>
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
                        <DeleteArticleBtn
                          topicID={topic._id}
                          articleID={link._id}
                          revalidateRef={`/${topic.technology}`}
                        />
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
