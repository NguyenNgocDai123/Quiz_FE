// pages/quizzes/index.tsx
"use client";
import { useState, useEffect } from 'react';
import Logo from "@/components/atomics/molecules/Logo";
import { useRouter } from "next/navigation";
import UserDropdown from "@/components/atomics/molecules/HomeSetting";
import {getQuizzesByCourse} from '@/services/apis/quiz/get_quizzes_by_course_id';
import { useSearchParams } from 'next/navigation';
import {updateQuiz} from '@/services/apis/quiz/update_quiz';
import {CreateQuizModal} from '@/components/atomics/molecules/create_quiz_modal';
import {createQuiz} from '@/services/apis/quiz/create_quiz';
import { useUserContext } from "@/contexts/UserContext";
import { parsePdfToQuestions, addQuestionsToQuiz } from '@/services/apis/quiz/add_question_to_quiz';
import {startAttempt} from '@/services/apis/quiz_Attempt/start_quiz';
import {UserRole} from "@/enums/Roles";

interface Quiz {
  id: string;
  title: string;
  time_limit: number; // in minutes
  description?: string;
  created_at?: string; // Thời gian tạo
  finished_at?: string; // Thời gian hoàn thành
  max_attempts?: number;
}

const QuizPage = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen]=useState(false);

  const course_id = searchParams.get('course_id');
  const { user } = useUserContext();
  const isTeacher = user?.role === UserRole.TEACHER;

  useEffect(() => {
    // Chỉ fetch quiz nếu course_id tồn tại
    if (!course_id) {
      // Có thể hiển thị thông báo "Vui lòng chọn một khóa học" ở đây
      console.log("Không tìm thấy course_id trong URL.");
      return;
    }

    const fetchQuizzes = async () => {
      try {
        const res = await getQuizzesByCourse(course_id);
        // Giả sử API trả về một object có key `data` chứa danh sách quiz
        console.log("Quizzes fetched:", res.data);
        setQuizzes(res.data); 
      } catch (error) {
        console.error("Lỗi khi fetch quizzes:", error);
        setQuizzes([]); // Reset lại danh sách nếu có lỗi
      }
    };

    fetchQuizzes();
  }, [course_id]);

  const handleCreateQuiz = async (quizData: {
    title: string;
    description: string;
    time_limit: number;
    max_attempts: number;
    total_points: number;
    question_file?: File | null;
  }) => { 
    if (!course_id) {
      console.error("Không tìm thấy course_id trong URL.");
      return;
    }
    try {
      // Gọi API để tạo quiz mới
      const newQuiz = await createQuiz({

        ...quizData,


        course_id: course_id,        
        teacher_id: user?.id || "", // Giả sử bạn có userId từ context hoặc state
        is_published: true,
      });
      if(quizData.question_file){
        // Parse PDF to questions
        const questions = await parsePdfToQuestions(quizData.question_file);

        console.log("Parsed questions:", questions);
        // Add questions to the created quiz
        await addQuestionsToQuiz(newQuiz.id, questions);
      }

      // Cập nhật danh sách quiz sau khi tạo thành công
      setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
    } catch (error) {
      console.error("Lỗi khi tạo quiz:", error);
    }   
  };

  const handleTakeQuiz = (quiz: Quiz) => {
    
    // Cập nhật trạng thái hoàn thành
    const updatedQuizzes = quizzes.map(q => 
      q.id === quiz.id 
        ? { ...q, max_attempts: Math.max((q.max_attempts ?? 0) - 1, 0) } 
        : q
    );
    setQuizzes(updatedQuizzes);
    // Gọi API để cập nhật quiz
    updateQuiz(quiz.id, { max_attempts: Math.max((quiz.max_attempts ?? 0) - 1, 0) }).catch(err => {
      console.error("Lỗi khi cập nhật quiz:", err);
    });
    // // Logic to take quiz
    startAttempt({
      user_id: user?.id || "",
      quiz_id: quiz.id,
    }).then((attempt) => {
      router.push(`/quizzes/${quiz.id}/take?attempt_id=${attempt.id}`);
    }).catch(err => {
      console.error("Lỗi khi bắt đầu bài làm:", err);
    });
    // router.push(`/quizzes/${quiz.id}/take`);

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
          {isTeacher && (
            <>  
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tạo Quiz Mới
            </button>
          </>
          )}
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
                      {quiz.title}
                    </h3>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`${quiz.finished_at ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                        {quiz.finished_at ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
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
                      <span className="font-medium text-gray-900">{quiz.time_limit} phút</span>
                    </div>

                    {quiz.created_at && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Ngày tạo:</span>
                        </div>
                        <span className="font-medium text-gray-900">{new Date(quiz.created_at).toLocaleDateString()}</span>
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
                      <span className="font-medium text-red-600">{quiz.max_attempts} lần</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => handleTakeQuiz(quiz)}
                    disabled={quiz.max_attempts === 0}
                    className={`w-full mt-6 ${
                      quiz.max_attempts === 0
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {quiz.max_attempts === 0 ? 'Đã hoàn thành' : 'Làm Bài Ngay'}
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
              {isTeacher && (
              <>
              <p className="text-gray-500 mb-6">Hãy tạo quiz đầu tiên để bắt đầu</p>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tạo Quiz Đầu Tiên
              </button>
              </>
              )
              }
            </div>
          )}
        </div>
      </div>

      {isOpen && <CreateQuizModal open={isOpen} onOpenChange={setIsOpen} onConfirm={handleCreateQuiz} />}
    </div>
    
  );
};

export default QuizPage;