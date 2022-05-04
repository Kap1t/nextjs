import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { userApi } from "../../../Api/Api";

class GenerateCookie {
  generateToken(token: string) {
    return cookie.serialize("token", `${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 30,
      path: "/",
    });
  }
  removeToken() {
    return cookie.serialize("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
  }
  generateRolesStr(roles: string[]) {
    return cookie.serialize("rolesStr", `${roles.join(", ")}`, {
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 30,
      path: "/",
    });
  }
  removeRolesStr() {
    return cookie.serialize("rolesStr", "", {
      secure: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
  }
}
const generateCookie = new GenerateCookie();

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await userApi.signUp(
        req.body.data.email,
        req.body.data.password,
        req.body.data.name
      );
      console.log(response.data);

      res.setHeader("Set-Cookie", [
        generateCookie.generateToken(response.data.token),
        generateCookie.generateRolesStr(response.data.roles),
      ]);
      res.status(200).json({ message: "ok" });
    } catch (error: any) {
      res.setHeader("Set-Cookie", [generateCookie.removeToken(), generateCookie.removeRolesStr()]);
      res.status(error.response.status).json({ message: error.response.data.message });
    }
  }
}
