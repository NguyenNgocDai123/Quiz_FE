import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { Course, PaginationResponse } from "@/types/course";

export const getCourses = async (
  page: number = 1,
  page_size: number = 10
): Promise<PaginationResponse<Course>> => {
  const config = getAuthHeaderAuto();
  const res = await axiosInstance.get<PaginationResponse<Course>>(
    `${API_GET.COURSES}?page=${page}&page_size=${page_size}`,
    config
  );
  return res.data;
};