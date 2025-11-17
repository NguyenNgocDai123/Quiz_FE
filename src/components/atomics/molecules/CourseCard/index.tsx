"use client";

import * as React from "react";
import { Users, BookOpen, Calendar, Eye , Trash2Icon, SquarePenIcon} from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";
import {UserRole} from "@/enums/Roles";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/atomics/molecules/ConfirmDeleteModal";
import { deleteCourse } from "@/services/apis/courses/delete_course";
import { useToast } from "@/contexts/ToastContext";
import { ToastMessages } from "@/constants/ToastMessages";
import EditCourseModal  from "@/components/atomics/molecules/EditCourseModal"
import {updateCourse} from "@/services/apis/courses/update_course"
import { UpdateCourseRequest } from "@/types/course";
import { UserInfo } from "@/types/user/getMyInfo";
import CourseUsersModal from "@/components/atomics/molecules/CourseUsersModal"
import {getUsersInCourses} from "@/services/apis/user/getUserInCourse"
import {removeStudentFromCourse} from "@/services/apis/courses/deleteUserInCourse"

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
          "border border-gray-300 text-gray-700 hover:bg-gray-200",
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
  createdAt: string; 
  selectedCourseId?: (id: string) => void;
  selectedCourseIdEdit?: (id: string, newTitle : string) => void;
}

export default function CourseCard({
  id,
  title,
  code,
  members,
  quizCount,
  createdAt,
  selectedCourseId,
  selectedCourseIdEdit
}: CourseCardProps) {
    const { user } = useUserContext();
    const isTeacher = user?.role === UserRole.TEACHER;
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen ] = React.useState(false);
    const { showToast } = useToast();
    const [member_list,setMember_list] = React.useState<number>(members);
    const [users, setUsers] = React.useState<UserInfo[]>([]);
    const [isOpenUserInCourse, setIsOpenUserInCourse ] = React.useState(false);


    const handleNavigateToQuizzes = () => {
        // THAY ĐỔI QUAN TRỌNG: Truyền course_id vào URL
        router.push(`/quizzes?course_id=${id}`);
    };

    const handleConfirmDelete = () => {
      if (selectedCourseId) {
        selectedCourseId(id); // truyền id của khóa học lên parent
      }
      setIsModalOpen(false);

      deleteCourse(id)
        .then(() => {
          showToast(ToastMessages.DELETE_SUCCESS);
        })
        .catch(() => {
          showToast(ToastMessages.DELETE_ERROR);
        });
    };

    const handleConfirmEdit = (newTitle: string) => {
      if(selectedCourseIdEdit){
        selectedCourseIdEdit(id, newTitle);
      }
      setIsEditOpen(false);

      const payload : UpdateCourseRequest = {
          name : newTitle
      }

      updateCourse(id, payload)
        .then(() => {
          showToast(ToastMessages.UPLOAD_SUCCESS);
        })
        .catch(() => {
          showToast(ToastMessages.UPLOAD_ERROR);
        });
    }

    const handleGetUsersInCourse = async () => {
     try {
      const res = await getUsersInCourses(id ,1, 10);
      setUsers(res.data);
      setIsOpenUserInCourse(true);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
    }

    const handleDeleteUserInCourse = (user_id:string) => {
      setIsOpenUserInCourse(false)
      setMember_list(member_list-1)
      removeStudentFromCourse(id,user_id)
        .then(() => {
          showToast(ToastMessages.DELETE_SUCCESS);
        })
        .catch(() => {
          showToast(ToastMessages.DELETE_ERROR);
        });
    }

  return (
    <>
      <Card className="w-full max-w-sm rounded-2xl border shadow-sm hover:shadow-md transition">
        <CardContent className="p-3 flex flex-col gap-4">

          {/* Top-right section */}
          <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-2 py-1 rounded-lg text-sm self-end">
            
            {isTeacher && (
              <>
                <SquarePenIcon 
                  className="w-5 h-5 hover:text-blue-500 cursor-pointer"
                  onClick={() => setIsEditOpen(true)}
                  />

                {/* 👉 CLICK HIỆN MODAL XÓA */}
                <Trash2Icon
                  className="w-5 h-5 hover:text-red-500 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                />
              </>
            )}

            <Users 
              className="w-5 h-5 hover:text-orange-500 cursor-pointer"
              onClick={() => 
                handleGetUsersInCourse()
              }
            /> {member_list}
          </div>

          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {isTeacher && (
              <p className="text-gray-500 text-sm pt-2">Mã khóa học: {code}</p>
            )}
          </div>

          {/* Info */}
          <div className="flex justify-between items-center text-gray-600 text-sm">
            <div className="flex items-center gap-1 px-2">
              <BookOpen className="w-4 h-4" /> {quizCount} bài quiz
            </div>
            <div className="flex items-center gap-1 px-2">
              <Calendar className="w-4 h-4" /> {new Date(createdAt).toLocaleDateString("vi-VN")}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              className="flex-1 flex items-center gap-2 justify-center"
              onClick={handleNavigateToQuizzes}
            >
              <Eye className="w-4 h-4" /> Xem
            </Button>
            {isTeacher && (
              <Button
                className="flex-1"
                onClick={handleNavigateToQuizzes}
              >
                Tạo Quiz
              </Button>
            )}
            
          </div>

        </CardContent>
      </Card>

      {/* 👉 MODAL XÓA */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleConfirmDelete();
        }}
      />
      <EditCourseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentName={title}
        onConfirm={(newName) => {
          console.log("Tên mới:", newName);
          handleConfirmEdit(newName);
        }}
      />
      <CourseUsersModal
        isOpen={isOpenUserInCourse}
        onClose={() => setIsOpenUserInCourse(false)}
        users={users} // Truyền dữ liệu từ cha
        selectedUserCourseId ={(user_id) => {handleDeleteUserInCourse(user_id)}}
      />
      
    </>
  );
}
