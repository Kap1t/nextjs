import type { NextApiRequest, NextApiResponse } from "next";
export default function test(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // res.setHeader("Set-Cookieh", "dsadqw3d321dfassa2");
    res.setHeader("Set-Cookie", "one=dsadqw3d321dfassa5");
    res.setHeader("Set-Cookie", "two=dsadqw3d321dfassa4");
    res.status(200).json({ message: "ok" });
  }
}
