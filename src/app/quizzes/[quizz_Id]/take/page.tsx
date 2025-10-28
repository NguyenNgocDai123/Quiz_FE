// app/quizzes/[quizId]/take/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Logo from "@/components/atomics/molecules/Logo";
import UserDropdown from "@/components/atomics/molecules/HomeSetting";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

export default function TakeQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [quizData, setQuizData] = useState({
    id: quizId,
    name: `Quiz ${quizId}`,
    duration: 60,
    totalQuestions: 10,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: `Câu hỏi 1 cho quiz ${quizId} - React là gì?`,
      options: ['Một framework', 'Một thư viện JavaScript', 'Một ngôn ngữ lập trình', 'Một database'],
      correctAnswer: 1
    },
    {
      id: '2',
      question: `Câu hỏi 2 cho quiz ${quizId} - Hook nào dùng cho state?`,
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctAnswer: 1
    },
    {
      id: '3',
      question: `Câu hỏi 3 cho quiz ${quizId} - Next.js dùng gì?`,
      options: ['Angular', 'Vue.js', 'React', 'Svelte'],
      correctAnswer: 2
    },
    {
      id: '4',
      question: `Câu hỏi 4 cho quiz ${quizId} - Tailwind CSS là?`,
      options: ['JavaScript framework', 'CSS framework', 'Database system', 'Build tool'],
      correctAnswer: 1
    },
    {
      id: '5',
      question: `Câu hỏi 5 cho quiz ${quizId} - API route trong Next.js?`,
      options: ['components/', 'styles/', 'pages/api/', 'public/'],
      correctAnswer: 2
    },
    {
      id: '6',
      question: `Câu hỏi 6 cho quiz ${quizId} - TypeScript là?`,
      options: ['CSS framework', 'JavaScript superset', 'Database', 'Build tool'],
      correctAnswer: 1
    },
    {
      id: '7',
      question: `Câu hỏi 7 cho quiz ${quizId} - Git dùng để?`,
      options: ['Viết code', 'Quản lý phiên bản', 'Chạy server', 'Test ứng dụng'],
      correctAnswer: 1
    },
    {
      id: '8',
      question: `Câu hỏi 8 cho quiz ${quizId} - Node.js là?`,
      options: ['Frontend framework', 'Backend runtime', 'Database', 'CSS framework'],
      correctAnswer: 1
    },
    {
      id: '9',
      question: `Câu hỏi 9 cho quiz ${quizId} - REST API là?`,
      options: ['Giao thức mạng', 'Kiến trúc API', 'Database', 'Framework'],
      correctAnswer: 1
    },
    {
      id: '10',
      question: `Câu hỏi 10 cho quiz ${quizId} - HTTP status 200 là?`,
      options: ['Lỗi server', 'Thành công', 'Không tìm thấy', 'Từ chối'],
      correctAnswer: 1
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        console.log(`Loading quiz data for: ${quizId}`);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  useEffect(() => {
    if (!quizStarted || quizFinished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, timeLeft]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].userAnswer = optionIndex;
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = questions.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    const calculatedScore = (correctAnswers / questions.length) * 10;
    
    setScore(calculatedScore);
    setQuizFinished(true);
    setQuizStarted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <Logo theme="DEFAULT" size="SMALL" className="w-12 h-12" />
            <h1 className="text-2xl font-bold text-indigo-700">QuizMaster</h1>
          </div>

          {quizStarted && !quizFinished && (
            <div className="flex items-center gap-6">
              <div className={`text-lg font-bold ${
                timeLeft < 300 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          )}

          <UserDropdown />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!quizStarted && !quizFinished && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sẵn sàng bắt đầu?</h2>
            <p className="text-gray-600 mb-6">
              Bài quiz <strong>{quizData.name}</strong> gồm {questions.length} câu hỏi 
              với thời gian {quizData.duration} phút.
              <br />
              <span className="text-red-600 font-medium">Lưu ý: Mỗi quiz chỉ được làm 1 lần duy nhất!</span>
            </p>
            <button
              onClick={handleStartQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg"
            >
              Bắt Đầu Làm Bài
            </button>
          </div>
        )}

        {quizStarted && !quizFinished && (
          <div className="flex gap-6">
            {/* Main Content - Câu hỏi */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Câu {currentQuestion + 1}. {currentQuestionData.question}
                  </h3>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestionData.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      currentQuestionData.userAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      checked={currentQuestionData.userAnswer === index}
                      onChange={() => handleAnswerSelect(currentQuestion, index)}
                      className="mr-3"
                    />
                    <span className="flex-1">{option}</span>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium"
                >
                  Câu trước
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={isLastQuestion}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium"
                >
                  Câu tiếp
                </button>
              </div>
            </div>

            {/* Sidebar - Navigation Panel */}
            <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">
                Danh sách câu hỏi
              </h3>
              
              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`w-10 h-10 rounded text-sm font-medium transition-all ${
                      currentQuestion === index
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-105'
                        : question.userAnswer !== undefined
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                    title={`Câu ${index + 1}${question.userAnswer !== undefined ? ' - Đã trả lời' : ' - Chưa trả lời'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Câu hiện tại</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span className="text-gray-600">Chưa trả lời</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Đã trả lời:</span>
                  <span className="font-medium text-green-600">
                    {questions.filter(q => q.userAnswer !== undefined).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Chưa trả lời:</span>
                  <span className="font-medium text-red-600">
                    {questions.filter(q => q.userAnswer === undefined).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1 font-semibold">
                  <span className="text-gray-700">Tổng câu:</span>
                  <span className="text-blue-600">{questions.length}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitQuiz}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Nộp bài
              </button>
            </div>
          </div>
        )}

        {quizFinished && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hoàn thành bài quiz!</h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">{score.toFixed(1)}/10</div>
            <p className="text-gray-600 mb-6">
              Bạn đã trả lời đúng {questions.filter(q => q.userAnswer === q.correctAnswer).length} 
              / {questions.length} câu hỏi
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/quizzes')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Quay lại danh sách quiz
              </button>
              <button
                onClick={() => router.push('/home')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}