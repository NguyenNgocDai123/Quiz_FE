import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { BaseResponse } from "@/types/BaseResponse";

export type LogoutTokenResponse = {
  access_token: string;
};

export async function logoutApi(): Promise<
  BaseResponse<LogoutTokenResponse>
> {
  try {
    const response = await axiosInstance.get<
      BaseResponse<LogoutTokenResponse>
    >(API_POST.LOGOUT);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      "Không thể làm mới access token. Vui lòng thử lại.";
    throw new Error(message);
  }
}