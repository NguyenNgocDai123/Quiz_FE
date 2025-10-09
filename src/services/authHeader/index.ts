import { APP_KEY } from "@/constants/app";

export function getAuthHeaderAuto(extraHeaders = {}) {
  const accessToken = window.localStorage.getItem(APP_KEY.ACCESS_TOKEN);

  return {
    headers: {
      ...extraHeaders,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
}