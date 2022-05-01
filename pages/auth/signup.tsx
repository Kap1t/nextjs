import React, { useContext, useState } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

import { userApi } from "../../Api/Api";
import { useRouter } from "next/router";

import styles from "../../styles/Login.module.scss";
import MainLayout from "../../components/MainLayout";
import Link from "next/link";
import { mainContext } from "../../Context/ContextWrapper";

const Login: NextPage = () => {
  const router = useRouter();
  const context = useContext(mainContext);

  const [reqError, setReqError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: any) => {
    setReqError("");
    const req = async () => {
      try {
        const res = await userApi.signUp(formData.email, formData.password, formData.name);
        router.push("/user");
      } catch (error: any) {
        if (error.response?.status === 403) {
          setReqError("Пользователь с таким email уже зарегистрирован");
        } else {
          setReqError("Ошибка");
        }
      }
    };
    req();
  };

  if (context.user.isAuth === true) {
    router.push("/user");
  }

  return (
    <MainLayout title="Регистрация">
      <section className={styles.section}>
        {context.user.isAuth === true && <div style={{ textAlign: "center" }}>logged</div>}
        {context.user.isAuth === false && (
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => {
              setReqError("");
            }}
          >
            <label>
              Имя:
              <input
                {...register("name", { required: true, minLength: 1, maxLength: 25 })}
                autoFocus
                type="text"
              />
            </label>
            {errors.name && <p>Введите имя</p>}
            <label>
              Email:
              <input
                {...register("email", {
                  required: "Введите email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Некорректный email",
                  },
                })}
                type="text"
              />
            </label>
            {errors?.email && <p>{errors?.email.message}</p>}
            <label>
              Пароль:
              <input
                {...register("password", { required: true, minLength: 9, maxLength: 25 })}
                type="password"
              />
            </label>
            {errors.password && <p>Пароль должен быть 9 до 25 символов</p>}
            {reqError && <p className={styles.pError}>{reqError}</p>}
            <button type="submit">Отправить</button>
            <p className={styles.pLR}>
              {" Есть аккаунт? "}
              <Link href="/auth/login">
                <a>Вход</a>
              </Link>
            </p>
          </form>
        )}
      </section>
    </MainLayout>
  );
};

export default Login;
