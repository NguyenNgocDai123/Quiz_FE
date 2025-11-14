export interface Quiz {
  id: string;
  title: string;
  description: string;
  course_id: string;
  created_at: string;
}

export interface PaginationResponse<T> {
  page: number;
  page_size: number;
  total_page: number;
  total_items: number;
  next: number | null;
  data: T[];
}

export interface CreateQuizRequest {
  title: string;
  description: string;
  course_id: string;
  teacher_id: string;
  time_limit: number;
  max_attempts: number;
  total_points: number;
  is_published: boolean;
}

export interface QuizResponse  {
  title: string;
  description: string;
  course_id: string;
  created_at: string;
  time_limit: number;
  max_attempts: number;
  total_points: number;
  is_published: boolean;
  finished_at: string;
  teacher_id: string;
}
