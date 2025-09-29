"use client";

import { LoginForm } from "../../molecules/LoginForm";
import Logo from "../../molecules/Logo";
import { LoginBoxProps } from "./type";
// import { loginUser } from "@/services/apis/login/loginApi";
// import { useUserContext } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import { ToastMessages } from "@/constants/ToastMessages";
import { APP_KEY } from "@/constants/app";
// import { isAxiosError } from "axios";
import { DASHBOARD_ROUTER } from "@/constants/appRouter";

const LoginBox: React.FC<LoginBoxProps> = ({ theme, className }) => {
//   const { setUser } = useUserContext();
  const { showToast } = useToast();

  const handleLoginSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // try {
    //   const response = await loginUser(values);

    //   if (response && response.access_token?.token && response.info) {
    //     setUser(response.info);
    //     showToast(ToastMessages.LOGIN_SUCCESS);
    //     window.localStorage.setItem(
    //       APP_KEY.ACCESS_TOKEN,
    //       response.access_token.token
    //     );
    //     window.location.href = DASHBOARD_ROUTER;
    //   } else {
    //     showToast(ToastMessages.LOGIN_FAILED);
    //   }
    // } catch (err: unknown) {
    //   if (isAxiosError(err)) {
    //     console.error("Axios error:", err.message);
    //   } else {
    //     console.error("Unexpected error:", err);
    //   }
    //   showToast(ToastMessages.LOGIN_FAILED);
    // }
  };

  return (
    <div className="flex flex-col items-center ">
      <Logo theme={theme} size="LARGE" flex={1} className="mb-[-5]" />
      <div
        className={`flex flex-col items-center justify-center ${className} p-6 rounded-lg bg-white mb-[50px]`}
        style={{
          width: "400px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <LoginForm
          theme={theme}
          className="w-full max-w-sm"
          onSubmit={handleLoginSubmit}
        />
      </div>
    </div>
  );
};

export default LoginBox;
