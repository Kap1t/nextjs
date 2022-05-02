import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function test(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // res.setHeader("Set-Cookieh", "dsadqw3d321dfassa2");
    // res.setHeader("Set-Cookie", "one=dsadqw3d321dfassa5");
    // res.setHeader("Set-Cookie", "two=dsadqw3d321dfassa4");
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("myToken", "dsadadawd2d24", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 20,
        path: "/",
        // domain: ".vercel.app",
      })
    );
    res.status(200).json({ message: "ok" });
  }
}
