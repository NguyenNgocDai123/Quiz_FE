"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, BarChart3, Sparkles } from "lucide-react";
import CourseCard from "@/components/atomics/molecules/CourseCard"; // import CourseCard
import { Button } from "@/components/atomics/atoms/ui/Button"; // import Button
import { cn } from "@/utils/cn"; // import cn utility
import Logo from "@/components/atomics/molecules/Logo";
import { useRouter } from "next/navigation";
import  UserDropdown  from "@/components/atomics/molecules/HomeSetting";
import { useUserContext } from "@/contexts/UserContext";
import { CourseNameModal } from "@/components/atomics/molecules/create_course_modal";
import { createCourse } from "@/services/apis/courses/create";
import { CreateCourseRequest, Course } from "@/types/course";
import { getCourses } from "@/services/apis/courses/getList";
import { CourseCarousel } from "@/components/atomics/organisms/CarouselSection";
import {UserRole} from "@/enums/Roles";
import { getListJoinedCourses } from "@/services/apis/courses/get_List_Joined";
import { joinCourse } from "@/services/apis/courses/joinCourse";


// ---------------- Home Page ----------------
export default function HomePage() {
    const [activeTab, setActiveTab] = useState("home");
    const router = useRouter();
    const { user } = useUserContext();
    const isStudent = user?.role === UserRole.USER;
    const [open, setOpen] = useState(false);

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const title = isStudent ? "Tham gia khóa học" : "Tạo khóa học";

    useEffect(() => {
      const fetchCourses = async () => {
        // Đảm bảo user đã được load và có role
        if (!user || !user.role) {
          setLoading(false);
          return;
        }
        
        try {
          let res;
          const isStudent = user.role === UserRole.USER;
          console.log('User role:', user.role, 'isStudent:', isStudent); // Debug
          
          if (isStudent) {
            console.log('Fetching joined courses...');
            res = await getListJoinedCourses(1, 20);
          } else {
            console.log('Fetching all courses...');
            res = await getCourses(1, 20);
          }
          setCourses(res.data.data);
        } catch (err) {
          console.error("Error fetching courses:", err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCourses();
    }, [user]);

    const tabs = [
        { id: "home", label: "Trang chủ" },
        { id: "features", label: "Tính năng" },
        { id: "quizhub", label: "Khóa học" },
        { id: "insights", label: "Kết quả" },
    ];

    const handleExploreClick = () => {
        setActiveTab("quizhub");        // Chọn tab "Khóa học"
        document.getElementById("quizhub")?.scrollIntoView({ behavior: "smooth" }); // scroll xuống section tương ứng
    };

    const handleConfirm = async (name: string) => {
      if (name.length == 0) return;

      if (isStudent) {
        // Xử lý tham gia khóa học
        await joinCourse(name);
        const res = await getListJoinedCourses(1, 20);
        setCourses(res.data.data);
        setOpen(false);
      } else {
        const payload: CreateCourseRequest = {
          name: name,
          teacher_id: user?.id || "",
        };
        createCourse(payload)
          .then((newCourse) => {
            setCourses([...courses, newCourse]);
          });
      }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
            
            {/* Logo + H1 */}
            <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => router.push("/home")}
                >
                <Logo theme="DEFAULT" size="SMALL" className="w-12 h-12" />
                <h1 className="text-2xl font-bold text-indigo-700">QuizMaster</h1>
            </div>

            {/* Navbar */}
            <nav className="hidden md:flex space-x-6">
            {tabs.map((tab) => (
                <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                    "pb-1 hover:text-indigo-600 transition",
                    activeTab === tab.id ? "border-b-2 border-indigo-600 text-indigo-600 transition" : ""
                )}
                >
                {tab.label}
                </a>
            ))}
            </nav>

            <UserDropdown></UserDropdown>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="scroll-mt-16 flex flex-col items-center justify-center text-center py-30 px-6 bg-gradient-to-b from-blue-500 to-indigo-700 text-white">
        <motion.h1
          className="text-5xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          QuizMaster – Học mà chơi, chơi mà học
        </motion.h1>
        <p className="max-w-2xl text-lg mb-8">
          Khám phá kho trắc nghiệm phong phú, luyện tập mỗi ngày và nâng cao kiến
          thức mọi lúc mọi nơi.
        </p>
        <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleExploreClick} >
          Khám phá ngay
        </Button>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-16 py-30 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-14 text-blue-600">Điểm nổi bật</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="shadow-lg rounded-2xl border bg-white">
            <div className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="font-semibold text-lg mb-3">Kho đề đa dạng</h3>
              <p>Hàng chục ngàn câu hỏi thuộc nhiều lĩnh vực khác nhau.</p>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl border bg-white">
            <div className="p-8 text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold text-lg mb-3">Phân tích chi tiết</h3>
              <p>Theo dõi tiến trình học và điểm số theo từng chủ đề.</p>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl border bg-white">
            <div className="p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="font-semibold text-lg mb-3">Trải nghiệm mượt mà</h3>
              <p>Giao diện thân thiện, tối ưu cho cả học sinh và giáo viên.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Hub */}
      <section id="quizhub" className="scroll-mt-16 py-30 px-6 bg-gradient-to-r from-[rgb(234,242,250)] to-[#9cc7fb]">
        {/* Container cho tiêu đề + nút */}
        <div className="flex justify-between items-center mb-14 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-600">Khám phá khóa học</h2>
          {isStudent ? (
            <Button
              size="md"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setOpen(true)}
            >
              Tham gia khóa học
            </Button>
          ) : (
            <Button
              size="md"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setOpen(true)}
            >
              Tạo khóa học
            </Button>
          )}
        </div>
        {loading ? (
            <p className="text-center text-gray-600">Đang tải khóa học...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-600">Chưa có khóa học nào. Hãy tạo hoặc tham gia một khóa học để bắt đầu!</p>
          ) :(
            <div className="overflow-x-hidden px-10">
              <CourseCarousel courses={courses} />
            </div>
          )}
      </section>

      {/* 3 Steps Section */}
    <section className="scroll-mt-16 py30 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-14 text-blue-600">
            Giao diện thân thiện
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4 text-blue-600">
                {/* Icon upload */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-4 4m4-4l4 4M12 4v8"
                />
                </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">1 Chọn/Tạo lớp học</h3>
            <p className="text-gray-600 text-sm">
                Khởi tạo hoặc tham gia lớp học để quản lý các bài quiz.
            </p>
            </div>

            {/* Step 2 */}
            <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4 text-blue-600">
                {/* Icon quiz */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5V4H2v16h5m10 0v-4H7v4m10 0V4"
                />
                </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">2 Tạo Quiz</h3>
            <p className="text-gray-600 text-sm">
                Thiết kế các bài quiz nhanh chóng, tùy chỉnh câu hỏi & đáp án.
            </p>
            </div>

            {/* Step 3 */}
            <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4 text-blue-600">
                {/* Icon report */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-4h6v4m-6 0h6m2 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-6l-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h2"
                />
                </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">3 Kết quả</h3>
            <p className="text-gray-600 text-sm">
                Xem kết quả chi tiết, thống kê và đánh giá ngay lập tức.
            </p>
            </div>
        </div>
        </section>

      {/* Insights */}
      <section id="insights" className="scroll-mt-16 py-40 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-14 text-blue-600">Kết quả & Thành tựu</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="shadow-md rounded-2xl border bg-white p-8 text-center">
            <h3 className="text-4xl font-bold text-indigo-600">50K+</h3>
            <p>Người dùng tích cực</p>
          </div>
          <div className="shadow-md rounded-2xl border bg-white p-8 text-center">
            <h3 className="text-4xl font-bold text-green-600">120K+</h3>
            <p>Bài quiz đã hoàn thành</p>
          </div>
          <div className="shadow-md rounded-2xl border bg-white p-8 text-center">
            <h3 className="text-4xl font-bold text-yellow-500">98%</h3>
            <p>Người dùng hài lòng</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-30 px-6 bg-indigo-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Sẵn sàng thử thách bản thân?</h2>
        <p className="max-w-2xl mx-auto mb-10">
          Hãy tham gia QuizMaster ngay hôm nay để bắt đầu hành trình học tập hiệu
          quả và thú vị hơn.
        </p>
        <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
          Đăng ký miễn phí
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p>© 2025 QuizMaster. All rights reserved.</p>
      </footer>

      <CourseNameModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
        title={title}
      />

    </div>
  );
}
