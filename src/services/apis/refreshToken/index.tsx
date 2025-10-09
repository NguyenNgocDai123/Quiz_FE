import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { BaseResponse } from "@/types/BaseResponse";

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string | null;
};

export async function refreshAccessToken(): Promise<
  BaseResponse<RefreshTokenResponse>
> {
  try {
    const response = await axiosInstance.get<
      BaseResponse<RefreshTokenResponse>
    >(API_POST.REFRESH);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      "Không thể làm mới access token. Vui lòng thử lại.";
    throw new Error(message);
  }
}
