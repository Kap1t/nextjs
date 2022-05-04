import type { NextApiRequest, NextApiResponse } from "next";
import generateCookie from "../../../Api/GenerateCookie";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [generateCookie.removeToken(), generateCookie.removeRolesStr()]);
    res.status(200).json({ message: "successlogout" });
  }
}
