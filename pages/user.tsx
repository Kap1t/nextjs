import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { userApi } from "../Api/Api";
import MainLayout from "../components/MainLayout";
import { mainContext } from "../Context/ContextWrapper";
import styles from "../styles/User.module.scss";
import { Bookmark } from "../components/Bookmark/Bookmark";
import { UserWithFL } from "../types/userTypes";

const User: NextPage = () => {
  const [user, setUser] = useState<UserWithFL | null>(null);
  const router = useRouter();
  const context = useContext(mainContext);

  if (context.user.isAuth === false) {
    router.push("/auth/login");
  }
  useEffect(() => {
    const req = async () => {
      try {
        const response = await userApi.getUserDataWithFL();
        setUser(response.data);
      } catch (error: any) {
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
              <button
                className={styles.logOutBtn}
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
                Выйти из аккаунта
              </button>
            </>
          )}

          {user && (
            <>
              <Bookmark bookmarks={user.favoritesLinks} title="Избранное" category="favorites" />
              <Bookmark bookmarks={user.readLaterLinks} title="Читать позже" category="readLater" />
            </>
          )}
        </section>
      )}
    </MainLayout>
  );
};

export default User;
