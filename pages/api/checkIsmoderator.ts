import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { userApi } from "../../Api/Api";

export default async function checkIsModarator(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const c = req.cookies;
      // console.log(c);
      const response = await userApi.checkIsModarator(req.cookies.token);
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401).json({ message: "invalid email or password" });
    }
  }
}
