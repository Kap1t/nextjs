import axios from "axios";

class Api {
  // private _baseApiUrl = "http://localhost:7000/api";
  private _baseApiUrl = "https://learnwebserver.onrender.com/api";
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
    });
  }
}

class ArticlesApi extends Api {
  updateArticleProxy(articleId: string, content: string, revalidateRef: string) {
    return axios.put("/api/articles/updateArticle", {
      data: { articleId, content, revalidateRef },
    });
  }
  updateArticle(token: string, articleId: string, content: string) {
    return this.axiosApiInstance.request({
      method: "PUT",
      url: `/technology/topics/${articleId}`,
      data: { content: content },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  addArticleProxy(topicID: string, data: any, revalidateRef: string) {
    return axios.post("/api/articles/addArticle", {
      data: { topicID, data, revalidateRef },
    });
  }
  addArticle(token: string, topicID: string, data: any) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/technology/topics/${topicID}`,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  addTopicProxy(data: { technology: string; header: string }, revalidateRef: string) {
    return axios.post("/api/articles/addTopic", {
      data: data,
      revalidateRef: revalidateRef,
    });
  }
  addTopic(token: string, data: { technology: string; header: string }) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/technology/createTopic`,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  deleteArticleProxy(data: any, revalidateRef: string) {
    return axios.post("/api/articles/deleteArticle", {
      data: { data, revalidateRef },
    });
  }
  deleteArticle(token: string, data: any) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: `/technology/topics/deleteArticle`,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  proxyApi() {
    return axios.post("/api/proxyApi", {
      data: "deleteArticle",
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
  checkIsModarator() {
    return axios.post("/api/universalGet", {
      url: `/users/checkIsModarator`,
    });
  }
  checkIsAuth() {
    return axios.post("/api/universalGet", {
      url: `/users/checkIsAuth`,
    });
  }
  getUserDataProxy() {
    return axios.post("/api/universalGet", {
      url: `/users/getUserWithFL`,
    });
  }
  // TODO вынести выше
  universalGet(url: string, token: string) {
    return this.axiosApiInstance.request({
      method: "GET",
      url: url,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  universalPost(url: string, token: string, data: any) {
    return this.axiosApiInstance.request({
      method: "POST",
      url: url,
      data: data,
    });
  }

  addToFavoritesProxy(articleId: string) {
    return axios.post("/api/universalGet", {
      url: `/users/addToFavorites/${articleId}`,
    });
  }
  removeFromFavoritesProxy(articleId: string) {
    return axios.post("/api/universalGet", {
      url: `/users/removeFromFavorites/${articleId}`,
    });
  }
  addToReadLaterProxy(articleId: string) {
    return axios.post("/api/universalGet", {
      url: `/users/addToReadLater/${articleId}`,
    });
  }
  removeFromReadLaterProxy(articleId: string) {
    return axios.post("/api/universalGet", {
      url: `/users/removeFromReadLater/${articleId}`,
    });
  }
}
export const revalidateApi = new RevalidateApi();
export const articlesApi = new ArticlesApi();
export const userApi = new UsersApi();
