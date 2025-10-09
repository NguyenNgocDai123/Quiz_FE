export interface BaseResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
