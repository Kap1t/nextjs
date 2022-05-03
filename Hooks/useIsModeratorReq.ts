import { useEffect, useState } from "react";
import { userApi } from "../Api/Api";

import { useRouter } from "next/router";
import axios from "axios";

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

export default function useIsModaratorReq() {
  const router = useRouter();
  const [isModarator, setIsModarator] = useState(false);

  useEffect(() => {
    const parsedCookies = parseCookies(document.cookie);
    const { rolesStr } = parsedCookies;
    let roles: any[];

    if (rolesStr !== undefined) {
      roles = rolesStr.split(", ");
    } else {
      setIsModarator(false);
      return;
    }
    if (!roles.includes("moderator")) {
      setIsModarator(false);
      return;
    }

    const req = async () => {
      try {
        // await userApi.checkIsModarator();
        await axios.post("/api/checkIsmoderator");
        setIsModarator(true);
      } catch (error: any) {
        console.log(error.response.data?.message);
        setIsModarator(false);
        // router.reload();
      }
    };
    req();
  }, [router]);

  return isModarator;
}
