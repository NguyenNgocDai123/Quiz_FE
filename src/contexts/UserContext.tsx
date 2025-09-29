// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { getMyInfo } from "@/services/apis/User/getMyInfo";
// import { APP_KEY } from "@/constants/app";
// import { UserInfo } from "@/services/apis/User/getMyInfo/type";
// import { isAxiosError } from "axios";

// interface UserContextType {
//   user: UserInfo | null;
//   setUser: (user: UserInfo) => void;
//   clearUser: () => void;
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUserState] = useState<UserInfo | null>(null);

//   const setUser = (userData: UserInfo) => {
//     setUserState(userData);
//   };

//   const clearUser = () => {
//     setUserState(null);
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const accessToken = localStorage.getItem(APP_KEY.ACCESS_TOKEN);

//       const fetchUser = async () => {
//         if (accessToken && !user) {
//           try {
//             const data = await getMyInfo();
//             setUserState(data);
//           } catch (error: unknown) {
//             if (isAxiosError(error)) {
//               console.error("Error fetching user info:", error.message);
//             } else {
//               console.error("Unexpected error:", error);
//             }
//             clearUser();
//           }
//         }
//       };

//       fetchUser();
//     }
//   });

//   return (
//     <UserContext.Provider value={{ user, setUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context)
//     throw new Error("useUserContext must be used within a UserProvider");
//   return context;
// };
