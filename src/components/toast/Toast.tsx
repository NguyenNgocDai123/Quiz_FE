"use client";

import React, { useEffect, useState } from "react";
import { ToastType } from "@/enums/ToastType";
import { useTranslation } from "react-i18next";

interface ToastProps {
  type: ToastType;
  message: string; // i18n key hoặc raw string
  onClose: () => void;
}

const toastStyles = {
  [ToastType.SUCCESS]: {
    iconColor: "text-green-500",
    bgIcon: "bg-green-100 dark:bg-green-800 dark:text-green-200",
    svg: (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    ),
  },
  [ToastType.ERROR]: {
    iconColor: "text-red-500",
    bgIcon: "bg-red-100 dark:bg-red-800 dark:text-red-200",
    svg: (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    ),
  },
  [ToastType.WARNING]: {
    iconColor: "text-orange-500",
    bgIcon: "bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
    svg: (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    ),
  },
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const { iconColor, bgIcon, svg } = toastStyles[type];
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();

  // dịch message (nếu tồn tại key thì lấy bản dịch, nếu không thì giữ nguyên)
  const translatedMessage = t(message);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
        <div
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${iconColor} ${bgIcon}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            {svg}
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">{translatedMessage}</div>
        <button
          onClick={onClose}
          className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white p-1.5 rounded-lg focus:ring-2 focus:ring-gray-300"
        >
          <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
