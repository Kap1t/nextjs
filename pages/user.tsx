import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { userApi } from "../Api/Api";
import MainLayout from "../components/MainLayout";
import { mainContext } from "../Context/ContextWrapper";

interface User {
  name: string;
  email: string;
  favorites: string[];
  readLater: string[];
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
        <div>
          {user && (
            <div>
              <h2>Привет, {user?.name}</h2>
              <p>Email: {user?.email}</p>
              <div>
                <h3>Избранное</h3>
                {user.favorites.map((favorite, index) => (
                  <p key={index}>{favorite}</p>
                ))}
              </div>
              <div>
                <h3>Читать позже</h3>
                {user.readLater.map((bookmark, index) => (
                  <p key={index}>{bookmark}</p>
                ))}
              </div>
            </div>
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
        </div>
      )}
    </MainLayout>
  );
};

export default User;
