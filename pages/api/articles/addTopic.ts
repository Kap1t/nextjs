import type { NextApiRequest, NextApiResponse } from "next";
import { articlesApi, revalidateApi } from "../../../Api/Api";
import generateCookie from "../../../Api/GenerateCookie";

export default async function addTopic(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await articlesApi.addTopic(req.cookies.token, req.body.data);

      await res.unstable_revalidate(`${req.body.data.revalidateRef}`);
      console.log(`revalidated ${req.body.revalidateRef}`);
      res.status(200).json({ message: "Topic added successfully" });
    } catch (error: any) {
      console.log(error.response.data);
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
