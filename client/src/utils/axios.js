import axios from "axios";
import { createBrowserHistory } from "history";
const BASE_URL = "http://localhost:5002";

export default axios.create({});
const myhistory = createBrowserHistory();

export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    config.headers = {
      Authorization: `Bearer ${user?.accesstoken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const response = await axiosPrivate.get("/refresh");
      console.log("response", response);
      if (response?.data?.token) {
        config.headers["Authorization"] = "Bearer " + response?.data?.token;
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log("config", config);

      return axiosPrivate(config);
    }
    return Promise.reject(error);
  }
);
