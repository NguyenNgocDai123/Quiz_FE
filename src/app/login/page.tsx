"use client";

import LoginBox from "@/components/atomics/organisms/LoginBox";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[rgb(234,242,250)] to-[#9cc7fb]">
      <LoginBox
        theme="DEFAULT"
        className="w-full max-w-sm"
      />
    </div>
  );
}
