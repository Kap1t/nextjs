import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { userApi } from "../Api/Api";
import MainLayout from "../components/MainLayout";
import { mainContext } from "../Context/ContextWrapper";

const User: NextPage = () => {
  const router = useRouter();
  const context = useContext(mainContext);
  // TODO useAuthReq
  if (context.user.isAuth === false) {
    router.push("/auth/signup");
  }
  return (
    <MainLayout title="User">
      {context.user.isAuth === false && <div></div>}
      {context.user.isAuth === true && (
        <div>
          <h2>user</h2>
          <button
            onClick={() => {
              try {
                const req = async () => {
                  await axios.post("/api/auth/logout");
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
