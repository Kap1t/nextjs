import type { NextApiRequest, NextApiResponse } from "next";
import { userApi } from "../../../Api/Api";
import generateCookie from "../../../Api/GenerateCookie";

export default async function removeFromReadLater(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await userApi.removeFromReadLater(
        req.cookies.token,
        req.body.data.articleId
      );
      res.status(200).json({ ...response.data });
    } catch (error: any) {
      if (error.response.status === 401) {
        res.setHeader("Set-Cookie", [
          generateCookie.removeToken(),
          generateCookie.removeRolesStr(),
        ]);
        res.status(401).json({ message: "logOut" });
        return;
      }
      res.status(error.response.status).json({ message: error.response.data.message });
    }
  }
}
