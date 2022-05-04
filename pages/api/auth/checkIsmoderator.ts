import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { userApi } from "../../../Api/Api";

export default async function checkIsModarator(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await userApi.checkIsModarator(req.cookies.token);
      res.status(200).json({ isModarator: true });
    } catch (error) {
      res.status(401).json({ message: "invalid email or password" });
    }
  }
}
