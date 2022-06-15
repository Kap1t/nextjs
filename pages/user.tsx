import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { userApi } from "../Api/Api";
import MainLayout from "../components/MainLayout";
import { mainContext } from "../Context/ContextWrapper";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/User.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { Bookmark } from "../components/Bookmark/Bookmark";

interface User {
  name: string;
  email: string;
  roles: string[];
  favorites: string[];
  readLater: string[];
  favoritesLinks: [
    {
      _id: string;
      technology: string;
      ref: string;
      name: string;
    }
  ];
  readLaterLinks: [
    {
      _id: string;
      technology: string;
      ref: string;
      name: string;
    }
  ];
}

const User: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const context = useContext(mainContext);

  if (context.user.isAuth === false) {
    router.push("/auth/login");
  }
  useEffect(() => {
    const req = async () => {
      try {
        const response = await userApi.getUserDataProxy();
        const userR = response.data;
        setUser(userR);
      } catch (error: any) {
        console.log(error.response?.status);
        if (error.response?.status === 401) {
          router.reload();
        }
      }
    };
    if (context.user.isAuth === true) {
      req();
    }
  }, [context.user.isAuth, router]);

  return (
    <MainLayout title="User">
      {context.user.isAuth === false && <div></div>}
      {context.user.isAuth === true && (
        <section className={styles.userSection}>
          {user && (
            <>
              <h2>Привет, {user?.name}</h2>
              <p>Email: {user?.email}</p>
              <Bookmark bookmarks={user.favoritesLinks} title="Избранное" category="favorites" />
              <Bookmark bookmarks={user.readLaterLinks} title="Читать позже" category="readLater" />
            </>
          )}
          <button
            onClick={() => {
              router.reload();
            }}
          >
            reload
          </button>
          <button
            onClick={() => {
              try {
                const req = async () => {
                  await userApi.logOut();
                  router.reload();
                };
                req();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Выйти
          </button>
        </section>
      )}
    </MainLayout>
  );
};

export default User;
