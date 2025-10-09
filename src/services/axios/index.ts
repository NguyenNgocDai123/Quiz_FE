
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { API_URL } from "@/constants/apiEndpoints";
import { BaseResponse } from "@/types/BaseResponse";
import { APP_KEY } from "@/constants/app";
import { refreshAccessToken } from "../apis/refreshToken";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST interceptor → luôn lấy token từ cookie
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(APP_KEY.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<BaseResponse<T>>) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await refreshAccessToken();
        const newToken = refreshResponse.data?.access_token;

        if (newToken) {
          // set token vào cookie
          Cookies.set(APP_KEY.ACCESS_TOKEN, newToken, {
            secure: true,
            sameSite: "strict",
            expires: 1, // 1 ngày
          });

          // gắn lại header cho request lỗi
          error.config.headers.Authorization = `Bearer ${newToken}`;

          return axiosInstance(error.config);
        }
      } catch {
        // xoá token khi refresh fail
        Cookies.remove(APP_KEY.ACCESS_TOKEN);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

