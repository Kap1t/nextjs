import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import React from "react";
import MainLayout from "../components/MainLayout";

import { ITechnology, technology } from "./api/technology";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await fetch(`${process.env.HOST}/api/technology`);
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
    console.log("error");
    return {
      props: { topics: undefined },
      // revalidate: 10,
    };
  }
};

interface Props {
  topics: ITechnology[];
}

const MainComponent: NextPage<Props> = ({ topics }) => {
  if (topics === undefined) {
    return <div>Загрузка 0</div>;
  }
  return (
    <MainLayout title={"Learn web"}>
      <section className="article">
        <h1>Методы массивов</h1>

        {topics.map((data) => {
          return (
            <div key={data._id}>
              <Link href={"/" + data.ref}>
                <a>
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                </a>
              </Link>
            </div>
          );
        })}
      </section>
    </MainLayout>
  );
};

export default MainComponent;
