const a = 5;
const b = a * 10;

import axios from "axios";
import { IsAuth, IsModarator, Message } from "../types/differentTypes";
import { User, UserWithFL } from "../types/userTypes";

class Api {
  // private _baseApiUrl = "http://localhost:7000/api";
  private _baseApiUrl = "https://learnwebserver.onrender.com/api";
  private _axiosApiInstance = axios.create({ baseURL: this._baseApiUrl });

  private _baseNextJSUrl = "/api";
  private _axiosNextJSUrl = axios.create({ baseURL: this._baseNextJSUrl });

  get axiosApiInstance() {
    return this._axiosApiInstance;
  }
  get axiosNextJSInstance() {
    return this._axiosNextJSUrl;
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

class UsersApi extends Api {
  login(email: string, password: string) {
    return axios.post<Message>("/api/auth/login", {
      data: { email, password },
    });
  }
  signUp(email: string, password: string, name: string) {
    return axios.post<Message>("/api/auth/signup", {
      data: { email, password, name },
    });
  }
  logOut() {
    return axios.post<Message>("/api/auth/logout");
  }
  checkIsModarator() {
    return axios.post<IsModarator>("/api/universalGet", {
      url: `/users/checkIsModarator`,
    });
  }
  checkIsAuth() {
    return axios.post<IsAuth>("/api/universalGet", {
      url: `/users/checkIsAuth`,
    });
  }
  getUserData() {
    return axios.post<User>("/api/universalGet", {
      url: `/users/getUser`,
    });
  }
  getUserDataWithFL() {
    return axios.post<UserWithFL>("/api/universalGet", {
      url: `/users/getUserWithFL`,
    });
  }
  addToFavorites(articleId: string) {
    return axios.post<User>("/api/universalGet", {
      url: `/users/addToFavorites/${articleId}`,
    });
  }
  removeFromFavorites(articleId: string) {
    return axios.post<User>("/api/universalGet", {
      url: `/users/removeFromFavorites/${articleId}`,
    });
  }
  addToReadLater(articleId: string) {
    return axios.post<User>("/api/universalGet", {
      url: `/users/addToReadLater/${articleId}`,
    });
  }
  removeFromReadLater(articleId: string) {
    return axios.post<User>("/api/universalGet", {
      url: `/users/removeFromReadLater/${articleId}`,
    });
  }
}

class ArticlesApi extends Api {
  addArticle(
    topicID: string,
    data: { technology: string; name: string; ref: string },
    revalidateRef: string
  ) {
    return axios.post("/api/universalPost", {
      url: `/technology/topics/${topicID}`,
      data: data,
      revalidateRef: revalidateRef,
    });
  }
  updateArticle(articleId: string, content: string, revalidateRef: string) {
    return axios.post("/api/universalPut", {
      url: `/technology/topics/${articleId}`,
      data: { content: content },
      revalidateRef: revalidateRef,
    });
  }
  deleteArticle(data: { topicID: string; articleID: string }, revalidateRef: string) {
    return axios.post("/api/universalPost", {
      url: `/technology/topics/deleteArticle`,
      data: data,
      revalidateRef: revalidateRef,
    });
  }
  addTopic(data: { technology: string; header: string }, revalidateRef: string) {
    return axios.post("/api/universalPost", {
      url: `/technology/createTopic`,
      data: data,
      revalidateRef: revalidateRef,
    });
  }
}

class RevalidateApi extends Api {
  revalidate(ref: string) {
    return this.axiosNextJSInstance.request({
      method: "POST",
      url: `/revalidate`,
      data: { ref: ref },
    });
  }
}

export const revalidateApi = new RevalidateApi();
export const articlesApi = new ArticlesApi();
export const userApi = new UsersApi();
