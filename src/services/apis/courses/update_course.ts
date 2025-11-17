import axiosInstance from "@/services/axios";
import { API_PUT } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { UpdateCourseRequest, Course } from "@/types/course";

export const updateCourse = async (
  course_id: string,
  payload: UpdateCourseRequest
): Promise<any> => {
    const config = getAuthHeaderAuto();

    const response = await axiosInstance.put<BaseResponse<Course>>(
      API_PUT.UPDATE_COURSE(course_id),
      payload,
      config
    );

    return response.data.data;
};