import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { articlesApi } from "../Api/Api";
import styles from "../styles/Topics.module.scss";

interface Props {
  topic: {
    _id: string;
    technology: string;
    header: string;
    list: {
      name: string;
      ref: string;
    }[];
  };
}
export const AddArticle: NextPage<Props> = React.memo(({ topic }) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className={styles.showAddArticleForm}>
        {!showForm && (
          <button
            className={styles.submitBtn}
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Создать статью
          </button>
        )}
      </div>
      {showForm && (
        <form
          className={styles.addArticleForm}
          onSubmit={(e: any) => {
            e.preventDefault();
            const req = async () => {
              try {
                await articlesApi.addArticleProxy(
                  `${topic._id}`,
                  {
                    technology: topic.technology,
                    name: e.target[0].value,
                    ref: e.target[1].value,
                  },
                  `/${topic.technology}`
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
          <input required type="text" placeholder="name" />
          <input required type="text" placeholder="ref" />
          <button className={styles.submitBtn} type="submit">
            Создать статью
          </button>
        </form>
      )}
    </>
  );
});
