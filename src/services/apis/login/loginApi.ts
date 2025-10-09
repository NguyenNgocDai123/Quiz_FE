import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { LoginResponse } from "./type";
import { BaseResponse } from "@/types/BaseResponse";
import { isAxiosError } from "axios";

export const loginUser = async (payload: {
  full_name: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<BaseResponse<LoginResponse>>(
      API_POST.LOGIN,
      payload
    );
    console.log("Login response:", response.data);
    return response.data.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      throw new Error(message);
    }
    throw new Error("Có lỗi không xác định xảy ra khi đăng nhập.");
  }
};
