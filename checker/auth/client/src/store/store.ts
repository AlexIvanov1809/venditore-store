import { API_URL } from "./../http/index";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "./../models/response/IUser";
import { IAuthResponse } from "../models/response/AuthResponse";
import axios from "axios";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isAuth = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log((e as Error).message);
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log((e as Error).message);
    }
  }
  async logout() {
    try {
      console.log("logout");
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      console.log("checkFn");
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log("done");
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      this.setLoading(false);
    }
  }
}
