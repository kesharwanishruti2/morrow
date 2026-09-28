

import axios from "axios";
import { store } from "../Storee/store";

const Api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => {
    const accessToken =
      store.getState().auth.accessToken ||
      localStorage.getItem("accessToken");

    console.log("ACCESS TOKEN:", accessToken);
    console.log("REQUEST URL:", config.url);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log("AUTH HEADER:", config.headers.Authorization);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await Api.post("/auth/refresh");

        const newAccessToken =
          response.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        store.dispatch(setAccessToken(newAccessToken));

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return Api(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("accessToken");

        store.dispatch(logout());

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;