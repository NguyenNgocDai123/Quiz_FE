import axiosInstance from "@/services/axios";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { API_DELETE } from "@/constants/apiEndpoints"; // Giả sử bạn sẽ thêm endpoint mới vào đây

/**
 * Xóa sinh viên khỏi khóa học
 * @param course_id ID của khóa học
 * @param student_id ID của sinh viên cần xóa
 */
export const removeStudentFromCourse = async (course_id: string, student_id: string): Promise<any> => {
  const config = getAuthHeaderAuto();
  let res;
  res = await axiosInstance.delete(API_DELETE.REMOVE_STUDENT_FROM_COURSE(course_id, student_id), config);
  return res;
};