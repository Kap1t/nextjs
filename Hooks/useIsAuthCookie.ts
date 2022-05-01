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

export default function useIsAuthCookie() {
  const checkUserRoleInCookie = () => {
    if (typeof window !== "undefined") {
      const parsedCookies = parseCookies(document.cookie);
      const { rolesStr } = parsedCookies;
      let roles;
      if (rolesStr !== undefined) {
        roles = JSON.parse(rolesStr);
      } else {
        return { isAuth: false };
      }
      if (!roles.includes("user")) {
        return { isAuth: false };
      }
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  };

  const [isAuth] = useState(checkUserRoleInCookie);

  return isAuth;
}
