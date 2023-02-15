import type { NextPage } from "next";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { userApi } from "../Api/Api";
import { parseCookies } from "../utils";

type IsAuth = boolean | "loading";
interface User {
  isAuth: IsAuth;
  roles: string[];
  favorites: string[];
  readLater: string[];
}

interface MainContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
const initialUserState: User = { isAuth: "loading", roles: [], favorites: [], readLater: [] };
export const mainContext = createContext<MainContext>({
  user: { ...initialUserState },
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}

const checkIsAuthInCookie = async (): Promise<User> => {
  if (typeof window !== "undefined") {
    const parsedCookies = parseCookies(document.cookie);
    const { rolesStr } = parsedCookies;
    if (rolesStr === undefined) {
      return { ...initialUserState, isAuth: false };
    }
    try {
      const res = await userApi.getUserData();
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
