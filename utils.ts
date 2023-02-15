interface CookieObject {
  [key: string]: string;
}
export function parseCookies(cookieHeader: string): CookieObject {
  const list: CookieObject = {};
  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}
