// services/quiz/getQuizById.ts
import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { QuizResponse } from "@/types/quiz";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";

export const getQuizById = async (quiz_id: string): Promise<QuizResponse> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.get<BaseResponse<QuizResponse>>(
      API_GET.QUIZ_BY_ID.replace("{quiz_id}", quiz_id),
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
