import axiosInstance from "@/services/axios";
import { API_PUT } from "@/constants/apiEndpoints";
import { getAuthHeaderAuto } from "@/services/authHeader";
import { BaseResponse } from "@/types/BaseResponse";
import { AxiosError } from "axios";


export async function updateQuiz(
  quiz_id: string,
  data: any
): Promise<any> {
  try {
    const response = await axiosInstance.put(
      API_PUT.UPDATE_QUIZ(quiz_id),
      data,
      {
        ...getAuthHeaderAuto(),
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
