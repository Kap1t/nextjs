import { useEffect, useState } from "react";
import { userApi } from "../Api/Api";

import { useRouter } from "next/router";

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

export default function useIsAuthReq() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const parsedCookies = parseCookies(document.cookie);
    const { rolesStr } = parsedCookies;
    let roles: any[];

    if (rolesStr !== undefined) {
      roles = JSON.parse(rolesStr);
    } else {
      setIsAuth(false);
      return;
    }
    if (!roles.includes("user")) {
      setIsAuth(false);
      return;
    }

    const req = async () => {
      try {
        await userApi.checkIsAuth();
        setIsAuth(true);
      } catch (error: any) {
        console.log(error.response.data?.message);
        setIsAuth(false);
        router.reload();
      }
    };
    req();
  }, [router]);

  return isAuth;
}
