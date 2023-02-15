import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "../styles/Article.module.scss";
import { articlesApi } from "../Api/Api";

interface Props {
  article: {
    _id: string;
    ref: string;
    content: string;
  };
  markdownString: string;
  setMarkdownString: (str: string) => void;
}

const ArticleModerator: NextPage<Props> = ({ article, markdownString, setMarkdownString }) => {
  const router = useRouter();
  return (
    <>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          if (!confirm("Подтвердите")) return;

          const req = async () => {
            try {
              const textarea = e.target[0].value;
              await articlesApi.updateArticle(article._id, textarea, `${router.asPath}`);
              router.reload();
            } catch (error) {
              alert(error);
            }
          };
          req();
        }}
      >
        <textarea
          className={styles.textarea}
          name="textarea"
          value={markdownString}
          onChange={(e) => {
            setMarkdownString(e.target.value);
          }}
        />
        <div style={{ textAlign: "center" }}>
          <button className={styles.submitBtn} type="submit">
            Обновить
          </button>
        </div>
      </form>
    </>
  );
};

export default ArticleModerator;
