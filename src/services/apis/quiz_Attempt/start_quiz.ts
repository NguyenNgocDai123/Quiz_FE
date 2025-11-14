import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";
import { StartAttemptRequest, Attempt } from "@/types/attempt";

export const startAttempt = async (
  payload: StartAttemptRequest
): Promise<Attempt> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.post<BaseResponse<Attempt>>(
      API_POST.START_ATTEMPT,
      payload,
      config
    );

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      detail?: string;
      message?: string;
      data?: { message?: string };
    }>;

    const message =
      axiosError?.response?.data?.detail ||
      axiosError?.response?.data?.data?.message ||
      axiosError?.response?.data?.message ||
      "Không thể bắt đầu bài làm.";

    throw new Error(message);
  }
};
