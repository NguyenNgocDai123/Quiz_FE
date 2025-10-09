"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserContext } from "@/contexts/UserContext";
import { logoutApi } from "@/services/apis/logout";
import { APP_KEY } from "@/constants/app";
import { UserRole } from "@/enums/Roles";
import { useTranslation } from "react-i18next";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const UserDropdown: FC = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const isAdmin = user?.role === UserRole.ADMIN;

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {}
    Cookies.remove(APP_KEY.ACCESS_TOKEN);
    Cookies.remove(APP_KEY.REFRESH_TOKEN);
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Avatar ngoài */}
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="focus:outline-none flex items-center gap-2 bg-white rounded-full p-1 hover:shadow"
      >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center">
            {user?.email?.charAt(0)?.toUpperCase() || "U"}
          </div>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 transition-all ${
          isDropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center px-4 py-3 border-b border-gray-200">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2 text-2xl">
                {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
          <span className="truncate text-center font-bold">{user?.full_name}</span>
          <span className="truncate text-center text-sm text-gray-600">
            {user?.email}
          </span>
        </div>

        <div className="p-2">
          {isAdmin && (
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 text-sm flex items-center gap-2"
              onClick={() => router.push("/settings")}
            >
              <Cog6ToothIcon className="w-4 h-4 text-gray-600" />
              <span>Cài đặt</span>
            </button>
          )}

          <button
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 text-sm mt-1 flex items-center gap-2"
            onClick={handleLogout}
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4 text-gray-600" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
