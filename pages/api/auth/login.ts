import type { NextApiRequest, NextApiResponse } from "next";
import generateCookie from "../../../Api/GenerateCookie";
import { userApi } from "../../../Api/Api";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await userApi.axiosApiInstance.request({
        method: "POST",
        url: `/users/signin`,
        data: req.body.data,
      });

      res.setHeader("Set-Cookie", [
        generateCookie.generateToken(response.data.token),
        generateCookie.generateRolesStr(response.data.roles),
      ]);
      res.status(200).json({ message: "success" });
    } catch (error: any) {
      res.setHeader("Set-Cookie", [generateCookie.removeToken(), generateCookie.removeRolesStr()]);
      res
        .status(error?.response?.status || 401)
        .json({ message: error?.response?.data?.message || "any" });
    }
  }
}
