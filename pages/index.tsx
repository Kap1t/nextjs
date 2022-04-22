import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import React from "react";
import MainLayout from "../components/MainLayout";
import styles from "../styles/MainComponent.module.scss";

import { ITechnology } from "./api/technology";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    // const response = await fetch(`${process.env.HOST}/api/technology`);
    const response = await fetch(`${process.env.HOST_API}/api/technology`);
    const technology = await response.json();
    console.log(technology);

    if (!technology) {
      return {
        notFound: true,
      };
    }
    return {
      props: { technology },
    };
  } catch (error) {
    console.log("error");
    return {
      props: { technology: [] },
      // revalidate: 10,
    };
  }
};

interface Props {
  technology: ITechnology[];
}

const MainComponent: NextPage<Props> = ({ technology }) => {
  if (technology.length === 0) {
    return <div>Ошибка</div>;
  }
  return (
    <MainLayout title={"Learn web"}>
      <section className={styles.section}>
        <div className={styles.about}>
          <h1 className={styles.h1}>Learn web облегчает изучение React.js разработки.</h1>
          <h1>Изучите React.js и его экосистему — быстро и очень легко.</h1>
        </div>
        <div className={styles.technologyBlock}>
          {technology.map((oneTechnology) => {
            return (
              <Link href={"/" + oneTechnology.ref} key={oneTechnology._id}>
                <a>
                  <div className={styles.oneTechnology}>
                    <h3>{oneTechnology.title}</h3>
                    <Image
                      src={oneTechnology.imageRef}
                      width="250"
                      height="150"
                      alt={oneTechnology.title}
                      // placeholder="blur"
                    ></Image>
                    <p>{oneTechnology.description}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </section>
    </MainLayout>
  );
};

export default MainComponent;
