import axios from "axios";
// import localStorageSevice from "../../../checker/temp/localStorage.service";
import config from "../config.json";
import { IAuth } from "../models/IAuth";

const httpAuth = axios.create({
  baseURL: config.endpoint + "/auth/",
});

const authService = {
  register: async (payload: IAuth) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async ({ email, password }: IAuth) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
    });
    return data;
  },
  // refresh: async () => {
  //   const { data } = await httpAuth.post("token", {
  //     grant_type: "refresh_token",
  //     refresh_token: localStorageSevice.getRefreshToken()
  //   });
  //   return data;
  // }
};

export default authService;
