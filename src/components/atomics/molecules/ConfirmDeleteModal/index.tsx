"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import "@/utils/i18n";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-lg font-medium mb-6">
          {t("modal.deleteConfirmText")}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
          >
            {t("modal.cancel")}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
          >
            {t("modal.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
