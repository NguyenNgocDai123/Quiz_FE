import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { Question, PaginationResponse } from "@/types/question"; // Giả sử bạn có type Question và PaginationResponse

export const getQuestionsByQuiz = async (
  quiz_id: string,
  page: number = 1,
  page_size: number = 10
): Promise<PaginationResponse<Question>> => {
  const config = getAuthHeaderAuto();
  const res = await axiosInstance.get<PaginationResponse<Question>>(
    `${API_GET.QUESTIONS_BY_QUIZ.replace("{quiz_id}", quiz_id)}?page=${page}&page_size=${page_size}`,
    config
  );

  return res.data.data;
};