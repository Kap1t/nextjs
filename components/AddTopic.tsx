import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { articlesApi } from "../Api/Api";
import styles from "../styles/Topics.module.scss";

export const AddTopic: NextPage = React.memo(() => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className={styles.showAddTopicForm}>
        {!showForm && (
          <button
            className={styles.submitBtn}
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Создать тему
          </button>
        )}
      </div>
      {showForm && (
        <form
          className={styles.addTopicForm}
          onSubmit={(e: any) => {
            e.preventDefault();
            const req = async () => {
              try {
                await articlesApi.addTopic(
                  {
                    technology: router.query.topics as string,
                    header: e.target[0].value,
                  },
                  `/${router.query.topics}`
                );
                router.reload();
              } catch (error: any) {
                console.log(error.response.data.message);
                alert(error);
              }
            };
            req();
          }}
        >
          <input required type="text" placeholder="header" />
          <button className={styles.submitBtn} type="submit">
            Создать тему
          </button>
        </form>
      )}
    </>
  );
});
