import type { NextApiRequest, NextApiResponse } from "next";
import { articlesApi } from "../../../Api/Api";
import generateCookie from "../../../Api/GenerateCookie";

export default async function updateArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await articlesApi.updateArticle(
        req.cookies.token,
        req.body.data.articleId,
        req.body.data.content
      );
      // console.log(`${req.body.data.revalidateRef}`);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("ok");
        }, 1700);
      });

      await res.unstable_revalidate(`${req.body.data.revalidateRef}`);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("ok");
        }, 1700);
      });

      res.status(200).json({ message: "Article updated successfully" });
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
