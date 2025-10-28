"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "@/components/atomics/atoms/ui/Button"; // nếu bạn có sẵn
import  Input  from "@/components/atomics/atoms/Input";   // hoặc tự tạo Input

interface CourseNameModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name: string) => void;
  title?: string;
  defaultValue?: string;
}

export function CourseNameModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  defaultValue = "",
}: CourseNameModalProps) {
  const [courseName, setCourseName] = useState(defaultValue);
  const placeholder = title === "Tạo khóa học" ? "Nhập tên khóa học..." : "Nhập mã khóa học...";

  const handleConfirm = () => {
    if (!courseName.trim()) return;
    onConfirm(courseName.trim());
    setCourseName("");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {title}
          </Dialog.Title>

          <Input
            type="TEXT"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder={placeholder}
            className="w-full mb-4"
            size="DEFAULT"
            theme="DEFAULT"
            padding="DEFAULT"
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button onClick={handleConfirm} disabled={!courseName.trim()}>
              Xác nhận
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
