import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";

import React, { useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "../components/MainLayout";
import styles from "../styles/Technology.module.scss";

import { Topic } from "./api/topic";
import Link from "next/link";

import axios from "axios";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // const response = await fetch(`${process.env.HOST}/api/technology`);
    const response = await fetch(`${process.env.HOST_API}/api/technology`);
    const technologies = await response.json();
    console.log(technologies);

    const paths = technologies.map((oneTechnology: any) => ({
      params: { topics: oneTechnology.ref },
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
    };
  } catch (error) {
    return {
      props: { topics: null },
      // revalidate: 10,
    };
  }
};

interface Props {
  topics: {
    _id: string;
    technology: string;
    header: string;
    list: {
      name: string;
      ref: string;
    }[];
  }[];
}

const Topics: NextPage<Props> = ({ topics }) => {
  const router = useRouter();
  const isAdmin = true;
  const [inputVal, setInputVal] = useState({});
  if (topics === null) {
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
                      {isAdmin && <span>{" " + link.ref}</span>}
                    </li>
                  ))}
                </ol>
                {isAdmin && (
                  <div>
                    <form
                      onSubmit={(e: any) => {
                        // TODO проверка на уникальность ref
                        // Данный способ подходит для редактирования порядка в массиве
                        // TODO добалять на сервере в Articles { ref: '', content: '# in progress'}
                        // const copyList = [...topic.list];
                        // copyList.push({ name: e.target[0].value, ref: e.target[1].value });
                        e.preventDefault();
                        const req = async () => {
                          try {
                            const response = await axios.post(
                              `https://learn-web-api.herokuapp.com/api/technology/${topic._id}`,
                              { name: e.target[0].value, ref: e.target[1].value }
                            );
                            console.log(response.data);
                            router.reload();
                          } catch (error) {
                            alert(error);
                          }
                        };
                        req();
                      }}
                    >
                      <input required type="text" placeholder="name" />
                      <input required type="text" placeholder="ref" />
                      <button type="submit">add one article</button>
                    </form>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </MainLayout>
  );
};

export default Topics;
