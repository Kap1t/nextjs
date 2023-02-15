import { NextPage } from "next";
import { MdOutlineWatchLater } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { mainContext } from "../../Context/ContextWrapper";
import { userApi } from "../../Api/Api";
import { useRouter } from "next/router";
import styles from "./ReadLater.module.scss";

interface Props {
  article: {
    _id: string;
    ref: string;
    name?: string;
    content: string;
    updatedAt: string;
  };
}

export const ReadLater: NextPage<Props> = ({ article }) => {
  const context = useContext(mainContext);
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [readLater, setReadLater] = useState(false);

  useEffect(() => {
    setReadLater(context.user.readLater.includes(article._id));
    setDisabled(false);
  }, [article._id, context.user.readLater]);

  return (
    <button
      className={styles.button}
      title={readLater ? "Добавить в читать позже" : "Удалить из читать позже"}
      disabled={disabled}
      onClick={() => {
        if (context.user.isAuth !== true) {
          router.push("/auth/login");
          return;
        }
        if (context.user.readLater.includes(article._id)) {
          setDisabled(true);
          const req = async () => {
            try {
              const response = await userApi.removeFromReadLater(article._id);
              context.setUser({ ...response.data, isAuth: true });
              setDisabled(false);
            } catch (error) {
              alert("Ошибка");
              setDisabled(false);
            }
          };
          req();
        } else {
          setDisabled(true);
          const req = async () => {
            try {
              const response = await userApi.addToReadLater(article._id);
              context.setUser({ ...response.data, isAuth: true });
              setDisabled(false);
            } catch (error) {
              alert("Ошибка");
              setDisabled(false);
            }
          };
          req();
        }
      }}
    >
      <MdOutlineWatchLater className={`${styles.svg} ${readLater && styles.svgActive}`} />
    </button>
  );
};
