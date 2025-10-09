import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import CourseCard from "@/components/atomics/molecules/CourseCard";

export function CourseCarousel({ courses }: { courses: any[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const visibleCourses = courses.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Nút điều hướng trái */}
      {currentPage > 0 && (
        <button
          onClick={prevPage}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 bg-white text-blue-600 rounded-full shadow p-2 hover:bg-gray-100 transition"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
      )}

      {/* Grid hiển thị các khóa học */}
      <div className="grid md:grid-cols-3 gap-10 transition-transform duration-300">
        {visibleCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.name}
            code={course.code}
            members={course.member_count}
            quizCount={course.quiz_count}
            createdAt={course.created_at}
          />
        ))}
      </div>

      {/* Nút điều hướng phải */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={nextPage}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-white text-blue-600 rounded-full shadow p-2 hover:bg-gray-100 transition"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
