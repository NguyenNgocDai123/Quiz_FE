export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const API_GET = {

  USER_INFO: `${API_URL}/app/users/me/`, // Lấy thông tin người dùng hiện tại
  USERS_IN_COUSRE:(course_id : string) => `${API_URL}/app/users/courses/${course_id}/users`,

  // Course
  COURSES: `${API_URL}/app/courses/`,
  LIST_COURSES_JONINED: `${API_URL}/app/courses/enrolled`,

  // Quiz
  QUIZZES_BY_COURSE: `${API_URL}/app/quizzes/course`,
  QUESTIONS_BY_QUIZ: `${API_URL}/app/quizzes/{quiz_id}/questions`,
  QUIZ_BY_ID: `${API_URL}/app/quizzes/{quiz_id}`,

  // Quiz Attempt
  QUIZ_ATTEMPT_BY_ID: `${API_URL}/app/attempts/{attempt_id}`,
};

export const API_POST = {
  // Auth
  LOGIN: `${API_URL}/app/login`,
  REFRESH: `${API_URL}/app/refresh`,
  LOGOUT: `${API_URL}/app/logout`,

  // Course
  CREATE_COURSE: `${API_URL}/app/courses/`,
  JOIN_COURSE: `${API_URL}/app/courses/join`,

  // Quiz
  CREATE_QUIZ: `${API_URL}/app/quizzes/`,
  ADD_QUESTIONS_TO_QUIZ: (quiz_id: string) => `${API_URL}/app/quizzes/${quiz_id}/questions`,
  PARSE_PDF_TO_QUESTIONS: `${API_URL}/app/pdf/parse`,

  // Quiz Attempt
  START_ATTEMPT: `${API_URL}/app/attempts`,
  SUBMIT_ATTEMPT: `${API_URL}/app/attempts/{attempt_id}/submit`,

}

export const API_PUT = {
  // Quiz
  UPDATE_QUIZ: (quiz_id: string) => `${API_URL}/app/quizzes/${quiz_id}`,

  // Course
  UPDATE_COURSE: (course_id: string) => `${API_URL}/app/courses/${course_id}`,
  
};

export const API_PATCH = {

  // User
  USERS: `${API_URL}/users/`,
};

export const API_DELETE = {
  // Chatbot
  DELETE_CHATBOT: (bot_id: string) => `${API_URL}/chat_bot/${bot_id}`,

  // Users
  DELETE_USER: (username: string) => `${API_URL}/users/${username}`,

  //Course
  DELETE_COURSE: (course_id: string) => `${API_URL}/app/courses/${course_id}`,
  REMOVE_STUDENT_FROM_COURSE: (course_id: string, student_id: string) => `${API_URL}/app/courses/${course_id}/kick/${student_id}`
};
