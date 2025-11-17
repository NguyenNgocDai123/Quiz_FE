import axiosInstance from "@/services/axios";
import { API_GET } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import {PaginationResponse } from "@/types/course";
import { UserInfo } from "@/types/user/getMyInfo";

export const getUsersInCourses = async (
  course_id: string,
  page: number = 1,
  page_size: number = 10
): Promise<PaginationResponse<UserInfo>> => {
  const config = getAuthHeaderAuto();
  const res = await axiosInstance.get<PaginationResponse<UserInfo>>(
    `${API_GET.USERS_IN_COUSRE(course_id)}?page=${page}&page_size=${page_size}`,
    config
  );
  return res.data.data;
};