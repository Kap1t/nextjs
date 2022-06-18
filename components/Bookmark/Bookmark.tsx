import React, { FC, useContext, useState } from "react";
import styles from "./Bookmark.module.scss";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { userApi } from "../../Api/Api";
import { mainContext } from "../../Context/ContextWrapper";

interface Props {
  bookmarks: {
    _id: string;
    technology: string;
    ref: string;
    name: string;
  }[];
  title: string;
  category: "favorites" | "readLater";
}

export const Bookmark: FC<Props> = ({ bookmarks, title, category }) => {
  const context = useContext(mainContext);
  const [bookmarksState, setBookmarksState] = useState(bookmarks);
  return (
    <div className={styles.bookmark}>
      <h3 className={styles.h3}>{title}</h3>
      <ol>
        {bookmarksState.map((bookmark, index) => (
          <li key={bookmark._id}>
            <div className={styles.link}>
              {index + 1 + ". "}
              <div style={{ margin: "0 10px", width: "60px", height: "30px" }}>
                <Link href={"/" + bookmark.technology}>
                  <a>
                    <img
                      src={`/technologyImg/${bookmark.technology}.png`}
                      width="60"
                      height="30"
                      alt={bookmark.name}
                    ></img>
                  </a>
                </Link>
              </div>
              <Link href={"/" + bookmark.technology + "/" + bookmark.ref}>
                <a className={styles.a}>{bookmark.name}</a>
              </Link>

              <button
                className={styles.delBtn}
                onClick={() => {
                  switch (category) {
                    case "favorites":
                      try {
                        const req = async () => {
                          const res = await userApi.removeFromFavoritesProxy(bookmark._id);
                          const updBookmarks = bookmarksState.filter(
                            (item) => item._id !== bookmark._id
                          );
                          setBookmarksState(updBookmarks);
                          context.setUser({ ...res.data, isAuth: true });
                        };
                        req();
                      } catch (error) {}

                      break;
                    case "readLater":
                      try {
                        const req = async () => {
                          const res = await userApi.removeFromReadLaterProxy(bookmark._id);
                          const updBookmarks = bookmarksState.filter(
                            (item) => item._id !== bookmark._id
                          );
                          setBookmarksState(updBookmarks);
                          context.setUser({ ...res.data, isAuth: true });
                        };
                        req();
                      } catch (error) {}

                      break;
                    default:
                      break;
                  }
                }}
              >
                <AiOutlineDelete size="20px" />
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
