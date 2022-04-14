import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";

import React, { useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../components/MainLayout";
import styles from "../styles/Technology.module.scss";

import { ITechnology } from "./api/technology";
import { Topic } from "./api/topic";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(`${process.env.HOST}/api/technology`);
    const topics = await response.json();
    const paths = topics.map((topic: any) => ({
      params: { technology: topic.ref },
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
    const response = await fetch(`${process.env.HOST}/api/topic`);
    const topics: Topic[] = await response.json();
    console.log(context.params?.technology);

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
  topics: Topic[];
}

const Technology: NextPage<Props> = ({ topics }) => {
  const router = useRouter();
  if (topics.length === 0) {
    return <div>Загрузка</div>;
  }
  return (
    <MainLayout title={router.query.technology || "react"}>
      <section className={styles.article}>
        <h1 className={styles.h1}>{router.query.technology}</h1>
        <ol className={styles.ol1}>
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
                    </li>
                  ))}
                </ol>
              </li>
            );
          })}
        </ol>
      </section>
    </MainLayout>
  );
};

export default Technology;
