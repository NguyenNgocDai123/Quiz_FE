import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { Quiz, PaginationResponse } from "@/types/quiz";

export const getQuizzesByCourse = async (
  course_id: string,
  page: number = 1,
  page_size: number = 10
): Promise<PaginationResponse<Quiz>> => {
  const config = getAuthHeaderAuto();
  const res = await axiosInstance.get<PaginationResponse<Quiz>>(
    `${API_GET.QUIZZES_BY_COURSE}/${course_id}?page=${page}&page_size=${page_size}`,
    config
  );

  return res.data.data;
  
};