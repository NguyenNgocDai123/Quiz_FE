import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";

export const getAttemptById = async (attempt_id: string): Promise<any> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.get<BaseResponse<any>>(
      API_GET.QUIZ_ATTEMPT_BY_ID.replace("{attempt_id}", attempt_id),
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
      "Không thể tải quiz.";

    throw new Error(message);
  }
};
