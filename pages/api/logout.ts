import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { userApi } from "../../Api/Api";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const c = req.cookies;
      // console.log(c);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("rolesStr", "", {
          secure: true,
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        })
      );
      res.setHeader("Set-Cookie", [
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        }),
        cookie.serialize("rolesStr", "", {
          secure: true,
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        }),
      ]);
      res.status(200).json({ message: c });
    } catch (error) {
      res.status(401).json({ message: "invalid email or password" });
    }
  }
}
