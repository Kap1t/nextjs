import { NextPage } from "next";
import { BsFillHeartFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { mainContext } from "../../Context/ContextWrapper";
import { userApi } from "../../Api/Api";
import { useRouter } from "next/router";
import styles from "./Favorite.module.scss";

interface Props {
  article: {
    _id: string;
    ref: string;
    name?: string;
    content: string;
    updatedAt: string;
  };
}

export const Favorite: NextPage<Props> = ({ article }) => {
  const context = useContext(mainContext);
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(context.user.favorites.includes(article._id));
    setDisabled(false);
  }, [article._id, context.user.favorites]);
  console.log(router);

  return (
    <button
      className={styles.button}
      title={favorite ? "Удалить из избранного" : "Добавить в избранное"}
      disabled={disabled}
      onClick={() => {
        if (context.user.isAuth !== true) {
          router.push("/auth/signup");
          return;
        }
        if (context.user.favorites.includes(article._id)) {
          setDisabled(true);
          const req = async () => {
            try {
              const response = await userApi.removeFromFavoritesProxy(article._id);
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
              const response = await userApi.addToFavoritesProxy(article._id);
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
      <BsFillHeartFill className={`${styles.svg} ${favorite && styles.svgActive}`} />
    </button>
  );
};
