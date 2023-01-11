import axios from "axios";
import localStorageSevice from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "/auth/"
});

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post(`signUp`, payload);
    return data;
  },
  login: async ({ name, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      name,
      password,
      returnSecureToken: true
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageSevice.getRefreshToken()
    });
    return data;
  }
};

export default authService;
