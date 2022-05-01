import type { NextApiRequest, NextApiResponse } from "next";
// pages/api/revalidate.js

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  try {
    console.log(req.body.ref);

    await res.unstable_revalidate(`${req.body.ref}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
