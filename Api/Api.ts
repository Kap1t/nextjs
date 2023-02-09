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
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  universalPut(url: string, token: string, data: any) {
    return this.axiosApiInstance.request({
      method: "PUT",
      url: url,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    });
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
  addArticleProxy(topicID: string, data: any, revalidateRef: string) {
    return axios.post("/api/universalPost", {
      url: `/technology/topics/${topicID}`,
      data: data,
      revalidateRef: revalidateRef,
    });
  }
  updateArticleProxy(articleId: string, content: string, revalidateRef: string) {
    return axios.post("/api/universalPut", {
      url: `/technology/topics/${articleId}`,
      data: { content: content },
      revalidateRef: revalidateRef,
    });
  }
  deleteArticleProxy(data: any, revalidateRef: string) {
    return axios.post("/api/universalPost", {
      url: `/technology/topics/deleteArticle`,
      data: data,
      revalidateRef: revalidateRef,
    });
  }
  addTopicProxy(data: { technology: string; header: string }, revalidateRef: string) {
    return axios.post("/api/universalPost", {
      url: `/technology/createTopic`,
      data: data,
      revalidateRef: revalidateRef,
    });
  }
}

class UsersApi extends Api {
  loginProxy(email: string, password: string) {
    return axios.post("/api/auth/login", {
      data: { email, password },
    });
  }
  loginProxy2(email: string, password: string) {
    return axios.post("/api/auth/login", {
      data: { email, password },
      url: `/users/signin`,
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
