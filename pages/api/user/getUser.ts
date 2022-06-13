import type { NextApiRequest, NextApiResponse } from "next";
import { userApi } from "../../../Api/Api";
import generateCookie from "../../../Api/GenerateCookie";

export default async function getUSer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await userApi.getUserData(req.cookies.token);
      const user = response.data;
      res.status(200).json(user);
    } catch (error: any) {
      if (error.response.status === 401) {
        res.setHeader("Set-Cookie", [
          generateCookie.removeToken(),
          generateCookie.removeRolesStr(),
        ]);
        res.status(401).json(error);
        return;
      }
      res.status(400).json(error);
    }
  }
}
