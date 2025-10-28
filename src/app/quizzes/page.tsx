// pages/quizzes/index.tsx
"use client";
import { useState } from 'react';
import Logo from "@/components/atomics/molecules/Logo";
import { useRouter } from "next/navigation";
import UserDropdown from "@/components/atomics/molecules/HomeSetting";

interface Quiz {
  id: string;
  name: string;
  duration: number; // in minutes
  description?: string;
  dueDate?: string;
  isCompleted: boolean; // Trạng thái hoàn thành
}

const QuizPage = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      name: 'Quiz Giữa Kỳ',
      duration: 60,
      description: 'Kiểm tra kiến thức giữa kỳ môn học',
      dueDate: '25/12/2024',
      isCompleted: false
    },
    {
      id: '2',
      name: 'Bài Tập Thực Hành',
      duration: 30,
      description: 'Bài tập thực hành tuần 5',
      dueDate: '30/11/2024',
      isCompleted: true
    },
    {
      id: '3',
      name: 'Ôn Tập Cuối Kỳ',
      duration: 90,
      description: 'Bài ôn tập chuẩn bị cho kỳ thi cuối khóa',
      dueDate: '15/1/2025',
      isCompleted: false
    },
    {
      id: '4',
      name: 'Kiểm Tra Chapter 1',
      duration: 45,
      description: 'Bài kiểm tra kiến thức chapter 1',
      dueDate: '20/11/2024',
      isCompleted: true
    },
    {
      id: '5',
      name: 'Bài Tập Nhóm',
      duration: 120,
      description: 'Bài tập nhóm cuối kỳ',
      dueDate: '10/12/2024',
      isCompleted: false
    }
  ]);

  const handleCreateQuiz = () => {
    // Logic to create new quiz
    alert('Chức năng tạo quiz mới sẽ được triển khai ở đây');
  };

  const handleTakeQuiz = (quiz: Quiz) => {
    if (quiz.isCompleted) {
      alert('Bạn đã hoàn thành bài quiz này. Mỗi quiz chỉ được làm 1 lần.');
      return;
    }
    
    // Logic to take quiz
    router.push(`/quizzes/${quiz.id}/take`);
    
    // Cập nhật trạng thái hoàn thành
    const updatedQuizzes = quizzes.map(q => 
      q.id === quiz.id ? { ...q, isCompleted: true } : q
    );
    setQuizzes(updatedQuizzes);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header đơn giản */}
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

          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </header>

      {/* Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header với nút Tạo Quiz */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Danh Sách Quiz</h1>
            <p className="text-gray-600 mt-2">
              {quizzes.length} bài quiz có sẵn
            </p>
          </div>
          <button
            onClick={handleCreateQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tạo Quiz Mới
          </button>
        </div>

        {/* Quiz List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                >
                  {/* Quiz Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 flex-1">
                      {quiz.name}
                    </h3>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`${quiz.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                        {quiz.isCompleted ? 'Đã hoàn thành' : 'Chưa làm'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Quiz Description */}
                  {quiz.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                  )}
                  
                  {/* Quiz Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Thời gian:</span>
                      </div>
                      <span className="font-medium text-gray-900">{quiz.duration} phút</span>
                    </div>
                    
                    {quiz.dueDate && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Hạn nộp:</span>
                        </div>
                        <span className="font-medium text-gray-900">{quiz.dueDate}</span>
                      </div>
                    )}

                    {/* Giới hạn số lần làm bài */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Giới hạn làm bài:</span>
                      </div>
                      <span className="font-medium text-red-600">1 lần</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => handleTakeQuiz(quiz)}
                    disabled={quiz.isCompleted}
                    className={`w-full mt-6 ${
                      quiz.isCompleted 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {quiz.isCompleted ? 'Đã hoàn thành' : 'Làm Bài Ngay'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có quiz nào</h3>
              <p className="text-gray-500 mb-6">Hãy tạo quiz đầu tiên để bắt đầu</p>
              <button
                onClick={handleCreateQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tạo Quiz Đầu Tiên
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;