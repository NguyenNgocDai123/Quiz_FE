"use client";

import * as React from "react";
import { Users, BookOpen, Calendar, Eye } from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";
import {UserRole} from "@/enums/Roles";
import { useRouter } from "next/navigation";


// ---------------- Utils ----------------
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ---------------- UI Components ----------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {


  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-colors shadow-sm",
        variant === "default" && "bg-indigo-600 text-white hover:bg-indigo-700",
        variant === "outline" &&
          "border border-gray-300 text-gray-700 hover:bg-gray-100",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    />
  );
}

function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border bg-white shadow-sm", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}

// ---------------- CourseCard Component ----------------
interface CourseCardProps {
  id: string;
  title: string;
  code: string;
  members: number;
  quizCount: number;
  createdAt: string; // dạng "15/1/2024"
}

export default function CourseCard({
  id,
  title,
  code,
  members,
  quizCount,
  createdAt,
}: CourseCardProps) {
    const { user } = useUserContext();
    const isTeacher = user?.role === UserRole.TEACHER;
    const router = useRouter();

    const handleNavigateToQuizzes = () => {
        // THAY ĐỔI QUAN TRỌNG: Truyền course_id vào URL
        router.push(`/quizzes?course_id=${id}`);
    };

  return (
    <Card className="w-full max-w-sm rounded-2xl border shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {isTeacher == true ? (
              <p className="text-gray-500 text-sm">Mã khóa học: {code}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-lg text-sm">
            <Users className="w-4 h-4" /> {members}
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-center text-gray-600 text-sm">
          {/* Bên trái: số quiz */}
          <div className="flex items-center gap-1 px-2">
            <BookOpen className="w-4 h-4" /> {quizCount} bài quiz
          </div>

          {/* Bên phải: ngày tạo */}
          <div className="flex items-center gap-1 px-2">
            <Calendar className="w-4 h-4" /> {new Date(createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            className="flex-1 flex items-center gap-2 justify-center"
            onClick={() => handleNavigateToQuizzes()}
          >
            <Eye className="w-4 h-4" /> Xem
          </Button>
          <Button className="flex-1" onClick={() => {
            handleNavigateToQuizzes()
            }}>Tạo Quiz</Button>
        </div>
      </CardContent>
    </Card>
  );
}
