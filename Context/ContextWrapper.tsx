import { log } from "console";
import type { NextPage } from "next";
import React, { createContext, useCallback, useEffect, useState } from "react";

export type IsAuth = boolean | "loading";
export type User = { isAuth: IsAuth; roles: string[] };

interface MainContext {
  user: User;
  setUser: (themeState: User) => void;
  test: string;
  setTest: (str: string) => void;
  randNum: number;
}
export const mainContext = createContext<MainContext>({
  user: { isAuth: "loading", roles: [] },
  setUser: () => {},
  test: "in",
  setTest: () => {},
  randNum: 0,
});

function parseCookies(cookieHeader: string) {
  const list: any = {};
  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}

interface Props {
  children: React.ReactNode;
}

const checkIsAuthInCookie = () => {
  if (typeof window !== "undefined") {
    const parsedCookies = parseCookies(document.cookie);
    const { rolesStr } = parsedCookies;

    let roles;
    if (rolesStr !== undefined) {
      roles = JSON.parse(rolesStr);
    } else {
      return { isAuth: false, roles: [] };
    }
    if (!roles.includes("user")) {
      return { isAuth: false, roles: [] };
    }
    return { isAuth: true, roles: JSON.parse(rolesStr) };
  } else {
    return { isAuth: false, roles: [] };
  }
};

const setInitialState = () => {
  return "initial";
};
const num = () => {
  return Math.random();
};

const ContextWrapper: NextPage<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({ isAuth: "loading", roles: [] });
  const [test, setTest] = useState(setInitialState());
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setUser(checkIsAuthInCookie());
    setNumber(num());
  }, []);

  return (
    <mainContext.Provider
      value={{
        user: user,
        setUser: setUser,
        test: test,
        setTest: setTest,
        randNum: number,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export default ContextWrapper;
