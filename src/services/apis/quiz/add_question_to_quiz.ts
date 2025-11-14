import axiosInstance from "@/services/axios";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";
import { API_POST } from "@/constants/apiEndpoints";


export const addQuestionsToQuiz = async (
  quizId: string,
  questions: any[]
): Promise<any> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.post<BaseResponse<any>>(
      API_POST.ADD_QUESTIONS_TO_QUIZ(quizId),
      questions,
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
      "Không thể thêm câu hỏi vào quiz.";

    throw new Error(message);
  }
};



export const parsePdfToQuestions = async (
  file: File
): Promise<any[]> => {
  try {
    const config = {
      ...getAuthHeaderAuto(),
      headers: {
        ...getAuthHeaderAuto().headers,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<BaseResponse<any[]>>(
      API_POST.PARSE_PDF_TO_QUESTIONS,
      formData,
      config
    );

    return response.data.data.questions;
  } catch (error) {
    const axiosError = error as AxiosError<{
      detail?: string;
      message?: string;
    }>;

    const message =
      axiosError?.response?.data?.detail ||
      axiosError?.response?.data?.message ||
      "Không thể parse file PDF.";

    throw new Error(message);
  }
};

