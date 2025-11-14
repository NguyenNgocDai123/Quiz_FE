export interface StartAttemptRequest {
  user_id: string;
  quiz_id: string;
}

export interface Attempt {
  id: string;
  user_id: string;
  quiz_id: string;
  started_at: string;
  finished_at: string | null;
  score: number;
  is_finished: boolean;
  attempt_number: number;
}

export interface SubmitAttemptItem {
  question_id: string;
  option_id: string | null; // user có thể không chọn đáp án
}

export type SubmitAttemptRequest = SubmitAttemptItem[];
