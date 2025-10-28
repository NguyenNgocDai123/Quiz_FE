export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const API_GET = {

  USER_INFO: `${API_URL}/app/users/me/`, // Lấy thông tin người dùng hiện tại

  // Course
  COURSES: `${API_URL}/app/courses/`,
  LIST_COURSES_JONINED: `${API_URL}/app/courses/enrolled`,
};

export const API_POST = {
  // Auth
  LOGIN: `${API_URL}/app/login`,
  REFRESH: `${API_URL}/app/refresh`,
  LOGOUT: `${API_URL}/app/logout`,

  // Course
  CREATE_COURSE: `${API_URL}/app/courses/`,
  JOIN_COURSE: `${API_URL}/app/courses/join`,

}

export const API_PUT = {
  // Chatbot
  UPDATE_CHATBOT: (bot_id: string) => `${API_URL}/chat_bot/${bot_id}`
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
};
