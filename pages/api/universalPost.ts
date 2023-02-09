import type { NextApiRequest, NextApiResponse } from "next";
import { userApi } from "../../Api/Api";
import generateCookie from "../../Api/GenerateCookie";

export const logOut = (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", [generateCookie.removeToken(), generateCookie.removeRolesStr()]);
  res.status(401).json({ message: "logOut" });
};
export const defaultError = (res: NextApiResponse, error: any) => {
  const defaultStatus = error.response.status || 404;
  const defaultMessage = error.response.data.message || "any";
  res.status(defaultStatus).json({ message: defaultMessage });
};

export default async function universalGet(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === "POST") {
  try {
    const response = await userApi.universalPost(req.body.url, req.cookies.token, req.body.data);
    if (req.body?.revalidateRef) {
      console.log(req.body?.revalidateRef);
      await res.unstable_revalidate(`${req.body.revalidateRef}`);
    }

    res.status(200).json(response.data || { message: "success" });
  } catch (error: any) {
    // Todo проверка error ?
    if (error?.response?.status === 401) {
      console.log(401);
      logOut(res);
      return;
    }
    defaultError(res, error);
  }
  // }
}
