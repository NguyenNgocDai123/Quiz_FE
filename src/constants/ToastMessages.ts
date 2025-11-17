import { ToastType } from "@/enums/ToastType";


export const ToastMessages = {


  // ✅ SUCCESS
  CREATE_SUCCESS: {
    message: "toast.createSuccess",
    type: ToastType.SUCCESS,
  },
  SAVE_SUCCESS: {
    message: "toast.saveSuccess",
    type: ToastType.SUCCESS,
  },
  DELETE_SUCCESS: {
    message: "Xóa thành công",
    type: ToastType.SUCCESS,
  },
  CHATBOT_DELETE_SUCCESS: {
    message: "toast.chatbotDeleteSuccess",
    type: ToastType.SUCCESS,
  },
  UPLOAD_SUCCESS: {
    message: "Cập nhật thành công",
    type: ToastType.SUCCESS,
  },
  LOGIN_SUCCESS: {
    message: "toast.loginSuccess",
    type: ToastType.SUCCESS,
  },
  FEEDBACK_SUCCESS: {
    message: "toast.feedbackSuccess",
    type: ToastType.SUCCESS,
  },
  UPDATE_SUCCESS: {
    message: "toast.updateSuccess",
    type: ToastType.SUCCESS,
  },

  // ❌ ERROR
  SAVE_ERROR: {
    message: "toast.saveError",
    type: ToastType.ERROR,
  },
  DELETE_ERROR: {
    message: "Xóa thất bại",
    type: ToastType.ERROR,
  },
  CHATBOT_DELETE_ERROR: {
    message: "toast.chatbotDeleteError",
    type: ToastType.ERROR,
  },
  CHATBOT_NOT_FOUND: {
    message: "toast.chatbotNotFound",
    type: ToastType.ERROR,
  },
  UPLOAD_ERROR: {
    message: "Cập nhật thất bại",
    type: ToastType.ERROR,
  },
  UPLOAD_DOCUMENT_ERROR: {
    message: "toast.uploadDocumentError",
    type: ToastType.ERROR,
  },
  DOCUMENT_FETCH_ERROR: {
    message: "toast.documentFetchError",
    type: ToastType.ERROR,
  },
  FETCH_DOCUMENTS_ERROR: {
    message: "toast.fetchDocumentsError",
    type: ToastType.ERROR,
  },
  FETCH_CHATBOT_ERROR: {
    message: "toast.fetchChatbotError",
    type: ToastType.ERROR,
  },
  FETCH_MODELS_ERROR: {
    message: "toast.fetchModelsError",
    type: ToastType.ERROR,
  },
  LOAD_ERROR: {
    message: "toast.loadError",
    type: ToastType.ERROR,
  },
  CREATE_USER_FAILED: {
    message: "toast.createUserFailed",
    type: ToastType.ERROR,
  },
  CREATE_GROUP_FAILED: {
    message: "toast.createGroupFailed",
    type: ToastType.ERROR,
  },
  LOGIN_FAILED: {
    message: "toast.loginFailed",
    type: ToastType.ERROR,
  },
  TIME_EXPIRED_TOKEN: {
    message: "toast.timeExpiredToken",
    type: ToastType.ERROR,
  },
  DOWLOAD_ERROR: {
    message: "toast.downloadError",
    type: ToastType.ERROR,
  },
  CREATE_ERROR: {
    message: "toast.createError",
    type: ToastType.ERROR,
  },
  FEEDBACK_ERROR: {
    message: "toast.feedbackError",
    type: ToastType.ERROR,
  },
  UPDATE_ERROR: {
    message: "toast.updateError",
    type: ToastType.ERROR,
  },

  // ⚠️ WARNING
  VALIDATE_ERROR: {
    message: "toast.validateError",
    type: ToastType.WARNING,
  },
  UPLOAD_FILE_TYPE_ERROR: {
    message: "toast.uploadFileTypeError",
    type: ToastType.WARNING,
  },
  PASSWORD_MISMATCH: {
    message: "toast.passwordMismatch",
    type: ToastType.WARNING,
  },
  PASSWORD_SAME_AS_USERNAME: {
    message: "toast.passwordSameAsUsername",
    type: ToastType.WARNING,
  },
  USER_EDIT_ERROR: {
    message: "toast.userEditError",
    type: ToastType.WARNING,
  },
  USER_DELETE_ERROR: {
    message: "toast.userDeleteError",
    type: ToastType.WARNING,
  },
  GROUP_DELETE_ERROR: {
    message: "toast.groupDeleteError",
    type: ToastType.WARNING,
  },
  USERNAME_EMPTY: {
    message: "toast.usernameEmpty",
    type: ToastType.WARNING,
  },
  PASSWORD_EMPTY: {
    message: "toast.passwordEmpty",
    type: ToastType.WARNING,
  },
  GROUP_NAME_EMPTY: {
    message: "toast.groupNameEmpty",
    type: ToastType.WARNING,
  },
  USERNAME_SPECIAL_CHAR: {
    message: "toast.usernameSpecialChar",
    type: ToastType.WARNING,
  },
  NAME_EMPTY: {
    message: "toast.nameEmpty",
    type: ToastType.WARNING,
  },
  ACCESS_TYPE_EMPTY: {
    message: "toast.accessTypeEmpty",
    type: ToastType.WARNING,
  },
} as const;
