import axios from "axios";

class Api {
  // private _baseApiUrl = "http://localhost:7000/api";
  private _baseApiUrl = "https://learn-web-api.herokuapp.com/api";
  private _axiosApiInstance = axios.create({ baseURL: this._baseApiUrl });

  private _baseThisUrl = "/api";
  private _axiosThisInstance = axios.create({ baseURL: this._baseThisUrl });

  get axiosApiInstance() {
    return this._axiosApiInstance;
  }
  get axiosThisInstance() {
    return this._axiosThisInstance;
  }
}
class RevalidateApi extends Api {
  revalidate(ref: string) {
    return this.axiosThisInstance.request({
      method: "POST",
      url: `/revalidate`,
      data: { ref: ref },
      withCredentials: true,
    });
  }
}
class ArticlesApi extends Api {
  updateArticle(articleId: string, content: string) {
    return this.axiosApiInstance.request({
      method: "PUT",
      url: `/technology/topics/${articleId}`,
      data: { content: content },
      withCredentials: true,
    });
  }
  addArticle(topicID: string, data: any) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/technology/${topicID}`,
      data: data,
      withCredentials: true,
    });
  }
}
class UsersApi extends Api {
  login(email: string, password: string) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/users/signin`,
      data: { email, password },
      withCredentials: true,
      // headers: { Authorization: `Bearer ${token}` },
    });
  }
  signUp(email: string, password: string, name: string) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/users/signup`,
      data: { email, password, name },
      withCredentials: true,
    });
  }
  logOut() {
    return this.axiosApiInstance.request({
      method: "GET",
      url: `/users/logout`,
      withCredentials: true,
    });
  }
  checkIsModarator(token: string) {
    return this.axiosApiInstance.request({
      method: "GET",
      url: `/users/checkIsModarator`,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  checkIsAuth() {
    return this.axiosApiInstance.request({
      method: "GET",
      url: `/users/checkIsAuth`,
      withCredentials: true,
    });
  }
}
export const revalidateApi = new RevalidateApi();
export const articlesApi = new ArticlesApi();
export const userApi = new UsersApi();
