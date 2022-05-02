import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { userApi } from "../../Api/Api";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body.data.email);
    console.log(req.body.data.password);

    try {
      const response = await userApi.login(req.body.data.email, req.body.data.password);
      console.log(response.data);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", `${response.data.token}`, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 20,
          path: "/",
          // domain: ".vercel.app",
        })
      );
      res.status(200).json({ message: "ok" });
    } catch (error) {}
  }
}
