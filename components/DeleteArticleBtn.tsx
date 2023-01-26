import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { articlesApi } from "../Api/Api";
import styles from "../styles/Topics.module.scss";

interface Props {
  topicID: string;
  articleID: string;
  revalidateRef: string;
}
export const DeleteArticleBtn: NextPage<Props> = React.memo(
  ({ topicID, revalidateRef, articleID }) => {
    const router = useRouter();

    return (
      <button
        className={styles.delBtn}
        onClick={() => {
          const req = async () => {
            try {
              await articlesApi.deleteArticleProxy(
                {
                  topicID: topicID,
                  articleID: articleID,
                },
                revalidateRef
              );
              router.reload();
            } catch (error) {
              alert("Ошибка, обновите страницу и попробуйте заново.");
            }
          };
          req();
        }}
      >
        <AiOutlineDelete size="20px" />
      </button>
    );
  }
);
