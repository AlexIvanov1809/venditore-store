import axios, { InternalAxiosRequestConfig } from "axios";
import config from "../config/config.json";

const $host = axios.create({
  baseURL: config.apiURL
});

const $authHost = axios.create({
  baseURL: config.apiURL
});

const authInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $authHost, $host };
