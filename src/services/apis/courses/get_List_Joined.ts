import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { Course, PaginationResponse } from "@/types/course";

export const getListJoinedCourses = async (
  page: number = 1,
  page_size: number = 10
): Promise<PaginationResponse<Course>> => {
  const config = getAuthHeaderAuto();
  const res = await axiosInstance.get<PaginationResponse<Course>>(
    `${API_GET.LIST_COURSES_JONINED}?page=${page}&page_size=${page_size}`,
    config
  );
  return res.data;
};