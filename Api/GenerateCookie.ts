import cookie from "cookie";
class GenerateCookie {
  generateToken(token: string) {
    return cookie.serialize("token", `${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
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
      maxAge: 60 * 60 * 24 * 7,
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
export default generateCookie;
