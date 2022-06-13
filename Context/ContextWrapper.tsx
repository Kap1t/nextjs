import type { NextPage } from "next";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { userApi } from "../Api/Api";

export type IsAuth = boolean | "loading";
export interface User {
  isAuth: IsAuth;
  roles: string[];
  favorites: string[];
  readLater: string[];
}

interface MainContext {
  user: User;
  setUser: (themeState: User) => void;
}
const initialUserState: User = { isAuth: "loading", roles: [], favorites: [], readLater: [] };
export const mainContext = createContext<MainContext>({
  user: { ...initialUserState },
  setUser: () => {},
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

const checkIsAuthInCookie = async () => {
  if (typeof window !== "undefined") {
    const parsedCookies = parseCookies(document.cookie);
    const { rolesStr } = parsedCookies;
    if (rolesStr === undefined) {
      return { ...initialUserState, isAuth: false };
    }

    try {
      const res = await userApi.getUserDataProxy();
      const user = res.data;
      return {
        isAuth: true,
        roles: user?.roles,
        favorites: user?.favorites,
        readLater: user?.readLater,
      };
    } catch (error) {
      return { ...initialUserState, isAuth: false };
    }
  } else {
    return { ...initialUserState, isAuth: false };
  }
};

const ContextWrapper: NextPage<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({ ...initialUserState });

  useEffect(() => {
    const set = async () => {
      const res = await checkIsAuthInCookie();
      setUser(res);
    };
    set();
  }, []);

  return (
    <mainContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export default ContextWrapper;
