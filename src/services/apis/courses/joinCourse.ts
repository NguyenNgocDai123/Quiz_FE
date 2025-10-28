import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";

export interface JoinCourseResponse {
  id: string;
  course_id: string;
  user_id: string;
  joined_at: string;
}

export const joinCourse = async (
  course_code: string // Nhận trực course_code thay vì object
): Promise<JoinCourseResponse> => {
  try {
    const config = {
      ...getAuthHeaderAuto(),
      params: {
        course_code: course_code
      }
    };

    const response = await axiosInstance.post<BaseResponse<JoinCourseResponse>>(
      API_POST.JOIN_COURSE,
      {},
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
      "Không thể tham gia khóa học.";

    throw new Error(message);
  }
};