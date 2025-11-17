export interface Course {
  id: string;
  name: string;
  code: string;
  teacher_id: string;
  created_at: string;
  member_count: number;
  quiz_count: number;
}

export interface PaginationResponse<T> {
  page: number;
  page_size: number;
  total_page: number;
  total_items: number;
  next: number | null;
  data: T[];
}

export interface CreateCourseRequest {
  name: string;
  teacher_id: string;
}

export interface UpdateCourseRequest {
  name: string;
}