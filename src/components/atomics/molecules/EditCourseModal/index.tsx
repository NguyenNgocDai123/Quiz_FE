"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/utils/i18n";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
  currentName: string; // tên khóa học hiện tại
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentName,
}) => {
  const { t } = useTranslation();
  const [courseName, setCourseName] = useState("");

  // Khi mở modal thì fill dữ liệu
  useEffect(() => {
    if (isOpen) {
      setCourseName(currentName);
    }
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-lg font-medium mb-4">
          Chỉnh sửa khóa học
        </p>

        {/* Input */}
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder={"Nhập tên khóa học "}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-700 transition"
          >
            Hủy 
          </button>

          <button
            onClick={() => onConfirm(courseName)}
            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
