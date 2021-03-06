import type { NextApiRequest, NextApiResponse } from "next";
import { userApi } from "../../../Api/Api";
import generateCookie from "../../../Api/GenerateCookie";

export default async function checkIsModarator(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await userApi.checkIsModarator(req.cookies.token);
      res.status(200).json({ isModarator: true });
    } catch (error: any) {
      if (error.response.status === 401) {
        res.setHeader("Set-Cookie", [
          generateCookie.removeToken(),
          generateCookie.removeRolesStr(),
        ]);
        res.status(401).json({ message: "logOut" });
        return;
      }
      res.status(403).json({ message: "Forbidden" });
    }
  }
}
