"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/atomics/molecules/Logo";
import UserDropdown from "@/components/atomics/molecules/HomeSetting";
import { getQuestionsByQuiz } from "@/services/apis/quiz/get_questions_by_quizz";
import { getQuizById } from "@/services/apis/quiz/get_quiz_by_id";
import { submitAttempt } from "@/services/apis/quiz_Attempt/submit_quiz";
import { getAttemptById } from "@/services/apis/quiz_Attempt/get_attempt_by_id";

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    content: string;
  }[];
  correctAnswer: number;
  userAnswer?: number;
}

export default function TakeQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizz_Id as string;
  const search = useSearchParams();
  const attemptId = search.get("attempt_id") ?? "";

  const [quizData, setQuizData] = useState({
    id: quizId,
    name: "",
    duration: 0,
    totalQuestions: 0,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Check attempt trước khi load quiz
  useEffect(() => {
    const checkAttempt = async () => {
      if (!attemptId) return;

      try {
        const attempt = await getAttemptById(attemptId);

        if (attempt.status === "FINISHED") {
          router.replace(`/quiz-result/${attemptId}`);
          return;
        }
      } catch (err) {
        console.error("Lỗi load attempt:", err);
      }
    };

    checkAttempt();
  }, [attemptId, router]);

  // ✅ Load quiz + questions
  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const quiz = await getQuizById(quizId);
        const res = await getQuestionsByQuiz(quizId);

        const mappedQuestions = res.data.map((q: any) => ({
          id: q.id,
          question: q.content,
          options: q.options.map((opt: any) => ({
            id: opt.id,
            content: opt.content,
          })),
          correctAnswer: q.options.findIndex((opt: any) => opt.is_correct === true),
        }));

        setQuizData({
          id: quizId,
          name: quiz.title,
          duration: quiz.time_limit,
          totalQuestions: mappedQuestions.length,
        });

        setQuestions(mappedQuestions);
        setTimeLeft(quiz.time_limit * 60);
      } catch (err) {
        console.error("Lỗi load quiz:", err);
      }
    };

    if (quizId) fetchQuizDetail();
  }, [quizId]);

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ Chặn reload / đóng tab nếu chưa nộp bài
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSubmitted]);

  // ✅ Chặn back nút trình duyệt nếu chưa nộp bài
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!isSubmitted) {
        alert("Bạn chưa nộp bài! Không thể quay lại.");
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Push state để popstate trigger
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isSubmitted]);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].userAnswer = optionIndex;
    setQuestions(updated);
  };

  const handleSubmitQuiz = useCallback(async () => {
    try {
      const payload = questions.map((q) => ({
        question_id: q.id,
        option_id: q.userAnswer !== undefined ? q.options[q.userAnswer].id : null,
      }));

      await submitAttempt(attemptId, payload);
      setIsSubmitted(true);

      router.replace(`/quiz-result/${attemptId}`);
    } catch (err) {
      console.error(err);
      alert("Nộp bài thất bại!");
    }
  }, [questions, attemptId, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              if (!isSubmitted) {
                alert("Bạn chưa nộp bài!");
                return;
              }
              router.push("/home");
            }}
          >
            <Logo theme="DEFAULT" size="SMALL" className="w-12 h-12" />
            <h1 className="text-2xl font-bold text-indigo-700">QuizMaster</h1>
          </div>

          <div className={`text-lg font-bold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
            {formatTime(timeLeft)}
          </div>

          <UserDropdown />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {questions.length > 0 && (
          <div className="flex gap-6">
            {/* Main Question Area */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">
                Câu {currentQuestion + 1}. {currentQuestionData.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentQuestionData.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                      currentQuestionData.userAnswer === idx
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      checked={currentQuestionData.userAnswer === idx}
                      onChange={() => handleAnswerSelect(currentQuestion, idx)}
                      className="mr-3"
                    />
                    <span>{opt.content}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
                  className={`px-6 py-2 rounded-lg text-white transition ${
                    currentQuestion === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Câu trước
                </button>

                <button
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => setCurrentQuestion((p) => Math.min(questions.length - 1, p + 1))}
                  className={`px-6 py-2 rounded-lg text-white transition ${
                    currentQuestion === questions.length - 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Câu tiếp
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 bg-white rounded-lg shadow-sm border p-6 h-fit sticky top-24">
              <h3 className="font-semibold mb-4 text-center">Danh sách câu hỏi</h3>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-10 h-10 rounded text-sm font-medium ${
                      currentQuestion === idx
                        ? "bg-blue-600 text-white scale-105"
                        : q.userAnswer !== undefined
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmitQuiz}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
              >
                Nộp bài
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
