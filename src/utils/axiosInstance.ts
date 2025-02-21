import axios from "axios";
import { store } from "@/store";
import { RootState } from "@/store";
import { logout, setTokens } from "@/store/auth/auth-slice";
import { LocalStorageKey, localStorageService } from "./packages/local-storage";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    const state = store.getState() as RootState;
    const refreshToken = state.auth.refreshToken || localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN);

    if (!refreshToken) throw new Error("No refresh token");

    const response = await axios.post(`${API_URL}/updateAccessToken`, { refresh_token: refreshToken });

    const { access_token, refresh_token } = response.data;

    store.dispatch(setTokens({ accessToken: access_token, refreshToken: refresh_token }));
    localStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
    localStorageService.setItem(LocalStorageKey.REFRESH_TOKEN, refresh_token);

    return access_token;
  } catch (error) {
    console.error("Error update access token:", error);
    store.dispatch(logout());
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState() as RootState;
    const accessToken = state.auth.userToken || localStorageService.getItem(LocalStorageKey.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
