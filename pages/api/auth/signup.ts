import type { NextApiRequest, NextApiResponse } from "next";
import generateCookie from "../../../Api/GenerateCookie";
import { userApi } from "../../../Api/Api";

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await userApi.signUp(
        req.body.data.email,
        req.body.data.password,
        req.body.data.name
      );

      res.setHeader("Set-Cookie", [
        generateCookie.generateToken(response.data.token),
        generateCookie.generateRolesStr(response.data.roles),
      ]);
      res.status(200).json({ message: "success" });
    } catch (error: any) {
      res.setHeader("Set-Cookie", [generateCookie.removeToken(), generateCookie.removeRolesStr()]);
      res.status(error.response.status).json({ message: error.response.data.message });
    }
  }
}
