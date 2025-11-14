import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";
import { SubmitAttemptRequest } from "@/types/attempt";

export const submitAttempt = async (
  attemptId: string,
  payload: SubmitAttemptRequest
): Promise<any> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.post<BaseResponse<any>>(
      API_POST.SUBMIT_ATTEMPT.replace("{attempt_id}", attemptId),
      payload,
      config
    );

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    const message =
      axiosError.response?.data?.detail ||
      axiosError.response?.data?.data?.message ||
      axiosError.response?.data?.message ||
      "Không thể nộp bài làm.";

    throw new Error(message);
  }
};
