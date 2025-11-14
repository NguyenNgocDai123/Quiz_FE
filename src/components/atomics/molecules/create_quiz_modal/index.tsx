"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/atomics/atoms/ui/Button";

interface CreateQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (quiz: {
    title: string;
    description: string;
    time_limit: number;
    max_attempts: number;
    total_points: number;
    question_file?: File | null;
  }) => void;
}

export function CreateQuizModal({ open, onOpenChange, onConfirm }: CreateQuizModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [totalPoints, setTotalPoints] = useState(100);
  const [questionFile, setQuestionFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setTimeLimit(30);
      setMaxAttempts(3);
      setTotalPoints(100);
      setQuestionFile(null);
    }
  }, [open]);

  const handleConfirm = () => {
    if (!title.trim()) return;
    onConfirm({
      title,
      description,
      time_limit: timeLimit,
      max_attempts: maxAttempts,
      total_points: totalPoints,
      question_file: questionFile,
    });
    onOpenChange(false);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay với z-index lớn */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" />

        {/* Wrapper center + z-index */}
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <Dialog.Content className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-2xl border border-gray-200 relative z-[9999]">

            {/* Close button */}
            <Dialog.Close className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-3xl font-bold">
              &times;
            </Dialog.Close>

            <Dialog.Title className="text-2xl font-bold text-blue-600 mb-6 text-center">
              Tạo Quiz Mới
            </Dialog.Title>

            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="mb-1 font-medium text-gray-700">Tiêu đề</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Nhập tiêu đề quiz"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} h-24 resize-none`}
                  placeholder="Nhập mô tả quiz"
                />
              </div>

              {/* New: Upload câu hỏi */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Upload câu hỏi</label>

                {/* Hidden true file input */}
                <input
                  id="hiddenQuestionFile"
                  type="file"
                  accept=".csv,.xlsx,.json,.txt,.pdf"
                  onChange={(e) => setQuestionFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />

                {/* Fake text input (clickable) */}
                <div
                  onClick={() => document.getElementById("hiddenQuestionFile")?.click()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer 
                            hover:bg-gray-200 select-none text-gray-700"
                >
                  {questionFile ? questionFile.name : "Chọn file câu hỏi..."}
                </div>

                {questionFile && (
                  <p className="text-sm text-green-600 mt-1">
                    ✅ Đã chọn: {questionFile.name}
                  </p>
                )}
              </div>

              {/* Number Inputs */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 font-medium text-gray-700">Thời gian</label>
                  <input
                    type="number"
                    min={1}
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 font-medium text-gray-700">Số lần làm</label>
                  <input
                    type="number"
                    min={1}
                    value={maxAttempts}
                    onChange={(e) => setMaxAttempts(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 font-medium text-gray-700">Tổng điểm</label>
                  <input
                    type="number"
                    min={1}
                    value={totalPoints}
                    onChange={(e) => setTotalPoints(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6 py-2 hover:bg-red-500 hover:text-white">
                Hủy
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!title.trim()}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Tạo Quiz
              </Button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
