import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { UserInfo } from "@/types/user/getMyInfo";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { AxiosError } from "axios";
import { BaseResponse } from "@/types/BaseResponse";

export const getMyInfo = async (): Promise<UserInfo> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.get<BaseResponse<UserInfo>>(
      API_GET.USER_INFO,
      config
    );

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      detail?: string;
      message?: string;
    }>;

    const message =
      axiosError?.response?.data?.detail ||
      axiosError?.response?.data?.message ||
      "Không thể lấy thông tin người dùng.";

    throw new Error(message);
  }
};
