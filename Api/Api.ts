import axios from "axios";

class Api {
  private _baseApiUrl = "http://localhost:7000/api";
  // private _baseApiUrl = "https://learn-web-api.herokuapp.com/api";
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
      // withCredentials: true,
    });
  }
}
class ArticlesApi extends Api {
  updateArticleProxy(articleId: string, content: string) {
    return axios.put("/api/articles/updateArticle", { data: { articleId, content } });
  }
  updateArticle(token: string, articleId: string, content: string) {
    return this.axiosApiInstance.request({
      method: "PUT",
      url: `/technology/topics/${articleId}`,
      data: { content: content },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  addArticleProxy(topicID: string, data: any) {
    return axios.post("/api/articles/addArticle", { data: { topicID, data } });
  }
  addArticle(token: string, topicID: string, data: any) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/technology/${topicID}`,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
class UsersApi extends Api {
  loginProxy(email: string, password: string) {
    return axios.post("/api/auth/login", {
      data: { email, password },
    });
  }
  login(email: string, password: string) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/users/signin`,
      data: { email, password },
    });
  }
  signUpProxy(email: string, password: string, name: string) {
    return axios.post("/api/auth/signup", {
      data: { email, password, name },
    });
  }
  signUp(email: string, password: string, name: string) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/users/signup`,
      data: { email, password, name },
    });
  }
  logOut() {
    return axios.post("/api/auth/logout");
  }
  checkIsModaratorProxy() {
    return axios.post("/api/auth/checkIsmoderator");
  }
  checkIsModarator(token: string) {
    return this.axiosApiInstance.request({
      method: "GET",
      url: `/users/checkIsModarator`,
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
