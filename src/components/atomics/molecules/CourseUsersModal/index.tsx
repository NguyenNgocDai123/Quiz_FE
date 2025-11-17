"use client";

import React from "react";
import { UserInfo } from "@/types/user/getMyInfo";
import { XIcon, CircleUserRoundIcon, DoorOpenIcon} from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";
import {UserRole} from "@/enums/Roles";
import ConfirmDeleteModal from "@/components/atomics/molecules/ConfirmDeleteModal";


interface CourseUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserInfo[];
  selectedUserCourseId:(user_id:string) => void;
}

const CourseUsersModal: React.FC<CourseUsersModalProps> = ({
  isOpen,
  onClose,
  users,
  selectedUserCourseId,
}) => {
    if (!isOpen) return null;
    const { user } = useUserContext();
    const isTeacher = user?.role === UserRole.TEACHER;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [UserIdSelected,setUserIdSelected ] = React.useState("")

    const handleConfirmDeleteUserInCourse = () =>{
        setIsModalOpen(false)
        if (selectedUserCourseId) {
        selectedUserCourseId(UserIdSelected);
      }

    }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-sm h-106 relative flex flex-col p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <h2 className="text-center text-lg font-medium mb-4">
          Danh sách học sinh tham gia khóa học
        </h2>

        {/* Danh sách scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
            {users.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có học sinh nào tham gia</p>
            ) : (
                <ul className="space-y-2">
                {users.map((user) => (
                    <li
                    key={user.id}
                    className="flex items-center justify-between px-3 py-2 rounded hover:bg-blue-100"
                    >
                    {/* Icon + Username */}
                    <div className="flex items-center gap-2">
                        <CircleUserRoundIcon className="w-5 h-5 text-blue-700 " />
                        <span>{user.full_name}</span>
                    </div>

                    {isTeacher &&(
                        <DoorOpenIcon 
                            className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
                            onClick={()=> ( 
                                setIsModalOpen(true),
                                setUserIdSelected(user.id)
                            )}
                        />
                    )}
                    </li>
                ))}
                </ul>
            )}
            </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleConfirmDeleteUserInCourse();
        }}
      />

    </div>
    
  );
};

export default CourseUsersModal;
