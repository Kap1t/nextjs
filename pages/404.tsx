import { NextPage } from "next/types";
import Router from "next/router";
import { useEffect } from "react";
import styles from "../styles/404.module.scss";

const Error: NextPage = () => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      Router.push("/");
    }, 2500);

    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return (
    <section className={styles.errorSection}>
      <div className={styles.errorTextBlock}>
        <p>Ошибка 404, такой страницы не существует.</p>
        <p>Вы будите перенапралены на главную страницу.</p>
      </div>
    </section>
  );
};

export default Error;
