"use client";
import React, { useState } from "react";
import Input from "../../atoms/Input";
import { LoginFormProps } from "./type";
import { Button } from "../../atoms/Button";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useToast } from "@/contexts/ToastContext";
import { ToastMessages } from "@/constants/ToastMessages";
// import { useTranslation } from "react-i18next";
// import "@/utils/i18n";

export const LoginForm: React.FC<LoginFormProps> = ({
  theme,
  className,
  onSubmit,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors] = useState<{ username?: string; password?: string }>({});
  const [showPassword] = useState(false);
  const { showToast } = useToast();
  // const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      showToast(ToastMessages.USERNAME_EMPTY);
      return;
    }

    if (!password) {
      showToast(ToastMessages.PASSWORD_EMPTY);
      return;
    }
    // Nếu hợp lệ thì gọi callback
    onSubmit({ username, password });
  };

  return (
    <form
      className={`flex flex-col items-center justify-center ${className}`}
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4 text-blue-500">
        Đăng Nhập
      </h1>

      <div className="relative w-full mb-4">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
        <Input
          type="TEXT"
          size="SMALL"
          theme={theme}
          padding="SMALL"
          placeholder="Tài Khoản"
          className={`border rounded !pl-10 ${theme} w-full ${errors.username ? "border-red-500" : ""}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div className="relative w-full mb-4">
        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
        <Input
          type={showPassword ? "TEXT" : "PASSWORD"}
          size="SMALL"
          theme={theme}
          padding="SMALL"
          placeholder="Mật Khẩu"
          className={`border rounded !pl-10 ${theme} w-full ${errors.password ? "border-red-500" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <Button
        type="SUBMIT"
        size="SMALL"
        theme={theme}
        padding="SMALL"
        rounded="DEFAULT"
        hover="DEFAULT"
        className="mb-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        pointer={true}
      >
        Đăng Nhập
      </Button>
    </form>
  );
};
