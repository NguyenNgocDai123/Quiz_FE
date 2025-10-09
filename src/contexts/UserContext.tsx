"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMyInfo } from "@/services/apis/user/getMyInfo";
import { APP_KEY } from "@/constants/app";
import { UserInfo } from "@/types/user/getMyInfo";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<UserInfo | null>(null);

  const setUser = (userData: UserInfo) => {
    setUserState(userData);
  };

  const clearUser = () => {
    setUserState(null);
  };
  console.log("UserContext rendered, current user:", user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = Cookies.get(APP_KEY.ACCESS_TOKEN);
      console.log("Access token from localStorage:", accessToken);

      const fetchUser = async () => {
        if (accessToken && !user) {
          try {
            const data = await getMyInfo();
            setUserState(data);
            console.log("User info fetched:", data);
          } catch (error: unknown) {
            if (isAxiosError(error)) {
              console.error("Error fetching user info:", error.message);
            } else {
              console.error("Unexpected error:", error);
            }
            clearUser();
          }
        }
      };

      fetchUser();
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
