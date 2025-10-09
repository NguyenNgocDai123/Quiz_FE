import axiosInstance from "@/services/axios";
import { API_POST } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";
import { CreateCourseRequest, Course } from "@/types/course";

export const createCourse = async (
  payload: CreateCourseRequest
): Promise<Course> => {
  try {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.post<BaseResponse<Course>>(
      API_POST.CREATE_COURSE,
      payload,
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
      "Không thể tạo khóa học.";

    throw new Error(message);
  }
};