import axiosInstance from "@/services/axios";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { API_DELETE } from "@/constants/apiEndpoints";

/**
 * Xóa khóa học theo course_id
 * @param course_id ID của khóa học cần xóa
 */
export const deleteCourse = async (course_id: string): Promise<any> => {
  const config = getAuthHeaderAuto();
  let res;
  res = await axiosInstance.delete( API_DELETE.DELETE_COURSE(course_id), config);
  return res
};