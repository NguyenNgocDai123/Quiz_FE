export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const API_GET = {
  // Auth
  REFRESH: `${API_URL}/auth/refresh`,

  // Chatbot
  CHATBOTS: `${API_URL}/chat_bot/`,
  CHATBOT_DETAIL: (bot_id: string) => `${API_URL}/chat_bot/${bot_id}`,

  // Users
  USERS: `${API_URL}/users/`,
  USER_DETAIL: (username: string) => `${API_URL}/users/${username}`,
  USER_INFO: `${API_URL}/users/me/`, // Lấy thông tin người dùng hiện tại

  // Groups
  GROUPS: `${API_URL}/groups/`,
  GROUP_DETAIL: (group_id: string) => `${API_URL}/groups/${group_id}`,
  MY_GROUP: `${API_URL}/groups/my_group`,
  GROUP_BY_USER: (username: string) => `${API_URL}/users/${username}/groups`,

  // Documents
  DOCUMENTS: `${API_URL}/documents/`,
  DOCUMENTS_ROOT: `${API_URL}/documents/root/`,
  DOCUMENT_DETAIL: (id: string) => `${API_URL}/documents/${id}`,
  DOCUMENTS_BY_FOLDER: (folder_id: string) => `${API_URL}/documents/folder/${folder_id}`,
  SAS_URL: `${API_URL}/documents/sas_url/`,

  // Folders
  FOLDERS: `${API_URL}/folders/`,
  FOLDER_DETAIL: (folder_id: string) => `${API_URL}/folders/${folder_id}`,
  FOLDER_DETAILS: (folder_id: string) =>
    `${API_URL}/folders/details/${folder_id}`,
  ROOT_FOLDERS: "/folders/root/",
  MY_FOLDERS: "/folders/my_folders/",
  FOLDER_LIST_GROUP: "/folders/admin/list/groups/",

  // GenAI
  MODELS: `${API_URL}/genai/models/`,
  MODEL_DETAIL: (id: string) => `${API_URL}/genai/models/${id}`,

  GET_SAS_URL: `${API_URL}/sas_url`,
  GET_SAS_URL_DOWNLOAD: `${API_URL}/sas_url/download`,

  // Roles
  ROLES: `${API_URL}/configs/roles/`,
  ROLE_DETAIL: (role_id: string) => `${API_URL}/roles/${role_id}`,

  //Conversation
  HISTORIES_CONVERSATION: `${API_URL}/histories/conversation/`,
  CONVERATION_DETAIL: (conversation_id: string) => `${API_URL}/histories/conversation/${conversation_id}`,
  // CHAT_HISTORY_DETAIL: (conversation_id: string) => `${API_URL}/chat/history/${conversation_id}`,


  HISTORIES_MESSAGEE_BY_CONVERSATION_ID: (conversation_id: string) =>
    `${API_URL}/histories/message/conversation/${conversation_id}`,
  HISTORIES_CONVERSATION_TITLE: (conversation_id: string) =>
    `${API_URL}/histories/conversation/${conversation_id}/title/`,

    // Messages
  HISTORIES_MESSAGEE_BY_ID: (id: string) =>
    `${API_URL}/histories/message/${id}`,

  // Metadata
  METADATA: `${API_URL}/meta_data/columns`,
  META_DATA_TEMPLATE: `${API_URL}/meta_data/template`,
  META_DATA_DATA: `${API_URL}/meta_data/data`,
};

export const API_POST = {
  // Auth
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  LOGOUT: `${API_URL}/auth/logout`,

  // Chat
  CHAT: `${API_URL}/chat/`,
  CHAT_BOT: `${API_URL}/chat/bot`,
  CHAT_BOT_REVIEW: `${API_URL}/chat/bot/preview`,
  CHAT_DOCUMENT: `${API_URL}/chat/document`,
  CHAT_SEARCH_DOCUMENTS: `${API_URL}/chat/search/documents`,
  CHAT_FOLDER: `${API_URL}/chat/folder/documents`,

  // Chatbot
  CREATE_CHATBOT: `${API_URL}/chat_bot/`,

  // Users
  CHANGE_PASSWORD: (username: string) => `${API_URL}/users/${username}/change-password`,
  CREATE_ADMIN: `${API_URL}/users/admin/`,

  // Groups
  CREATE_GROUP: `${API_URL}/groups/`,
  JOIN_GROUPS: `${API_URL}/groups/join`,

  // Folders
  CREATE_FOLDER: `${API_URL}/folders/user/create/`,
  CREATE_CHILD_FOLDER: (parent_id: string) => `${API_URL}/folders/${parent_id}/children`,
  ADMIN_CREATE_FOLDER: `${API_URL}/folders/admin/create/`,

  // GenAI
  CREATE_MODEL: `${API_URL}/genai/models/`,

  // Get data chunk by index ids
  GET_CHUNK_BY_IDS: `${API_URL}/az_index/ids/`,

  // Metadata
  LLM_QUERY_NOSQL: `${API_URL}/meta_data/filter`,
  CREATE_METADATA_COLUMN: `${API_URL}/meta_data/column`,
};

export const API_PUT = {
  // Chatbot
  UPDATE_CHATBOT: (bot_id: string) => `${API_URL}/chat_bot/${bot_id}`,

  // Users
  UPDATE_USER: () => `${API_URL}/users/`,
  ADMIN_UPDATE_USER: (username: string) => `${API_URL}/users/admin/${username}`,

  // Groups
  UPDATE_GROUP: (group_id: string) => `${API_URL}/groups/${group_id}`,
  ASSIGN_USER: `${API_URL}/groups/assign/users/`,
  REMOVE_USER: `${API_URL}/groups/remove/users/`,

  // Documents
  UPDATE_DOCUMENT: (id: string) => `${API_URL}/documents/${id}`,
  MOVE_DOCUMENT: `${API_URL}/documents/move/document`,

  // Folders
  UPDATE_FOLDER: (folder_id: string) => `${API_URL}/folders/${folder_id}`,
  ADMIN_UPDATE_FOLDER: (folder_id: string) => `${API_URL}/folders/admin/${folder_id}`,
  FOLDER_REMOVE_GROUP: `${API_URL}/folders/admin/remove/groups/`,
  FOLDER_ASSIGN_GROUP: `${API_URL}/folders/admin/assign/groups/`,
  MOVE_TO_PARENT: `${API_URL}/folders/move/to-parent/`,

  // GenAI
  UPDATE_MODEL: (id: string) => `${API_URL}/genai/models/${id}`,

  //Conversation
  UPDATE_CONVERSATION: (conversation_id : string) =>`${API_URL}/histories/conversation/${conversation_id}`,

  UPDATE_MESSAGE_HISTORY: (id : string) =>`${API_URL}/histories/message/${id}`

};

export const API_PATCH = {
  // Chatbot
  PARTIAL_UPDATE_CHATBOT: (bot_id: string) => `${API_URL}/chat_bot/${bot_id}`,

  // Users
  PARTIAL_UPDATE_USER: (username: string) => `${API_URL}/users/${username}`,

  // Groups
  PARTIAL_UPDATE_GROUP: (group_id: string) => `${API_URL}/groups/${group_id}`,

  // Documents
  PATCH_DOCUMENT: (id: string) => `${API_URL}/documents/${id}`,

  // Folders
  PATCH_FOLDER: (folder_id: string) => `${API_URL}/folders/${folder_id}`,
  MOVE_TO_PARENT: `${API_URL}/folders/move/to-parent`,

  // GenAI
  PATCH_MODEL: (id: string) => `${API_URL}/genai/models/${id}`,

  // User
  USERS: `${API_URL}/users/`,
};

export const API_DELETE = {
  // Chatbot
  DELETE_CHATBOT: (bot_id: string) => `${API_URL}/chat_bot/${bot_id}`,

  // Users
  DELETE_USER: (username: string) => `${API_URL}/users/${username}`,

  // Groups
  DELETE_GROUP: (group_id: string) => `${API_URL}/groups/${group_id}`,
  LEAVE_GROUPS: `${API_URL}/groups/leave_groups`,

  // Documents
  DELETE_DOCUMENT: (id: string) => `${API_URL}/documents/${id}`,

  // Folders
  DELETE_FOLDER: (folder_id: string) => `${API_URL}/folders/${folder_id}`,
  DELETE_MULTIPLE_FOLDERS: `${API_URL}/folders/delete-multiple/folders`,

  // GenAI
  DELETE_MODEL: (id: string) => `${API_URL}/genai/models/${id}`,

  // CONVERSATION
  DELETE_CONVERSATION: (Conversation_id:string) => `${API_URL}/histories/conversation/${Conversation_id}`,

  //metadata
  DELETE_METADATA_COLUMN: (column_name: string) => `${API_URL}/meta_data/columns/${column_name}`,
};
