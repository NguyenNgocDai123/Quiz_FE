"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAttemptById } from "@/services/apis/quiz_Attempt/get_attempt_by_id";

export default function QuizResultPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const router = useRouter();

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await getAttemptById(attemptId);
      setResult(res);
    };
    fetchResult();
  }, [attemptId]);

  if (!result) return <div className="p-10 text-center">Đang tải...</div>;

  // ✅ Tính số câu đúng từ answers
  const correctCount = result.answers.filter((ans: any) => ans.is_correct).length;
  const totalQuestions = result.answers.length;

  // ✅ Thời gian làm bài
  const start = new Date(result.started_at);
  const end = new Date(result.finished_at);
  const durationSec = Math.floor((end.getTime() - start.getTime()) / 1000);

  const formatDuration = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return `${mins} phút ${secs} giây`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 py-12">
      <div className="bg-white shadow-md rounded-xl p-8 text-center border border-gray-200">

        {/* ✅ Icon Success */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* ✅ Điểm */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Kết quả bài quiz
        </h1>

        <div className="text-6xl font-extrabold text-blue-600 mb-3">
          {result.score.toFixed(1)}/10
        </div>

        {/* ✅ Số câu đúng */}
        <p className="text-gray-600 text-lg">
          Bạn trả lời đúng{" "}
          <span className="font-bold text-green-600">{correctCount}</span>
          {" / "}
          <span className="font-bold">{totalQuestions}</span> câu hỏi
        </p>

        {/* ✅ Thời gian làm bài */}
        <p className="mt-2 text-gray-500">
          Thời gian làm bài:{" "}
          <span className="font-medium">{formatDuration(durationSec)}</span>
        </p>

        {/* ✅ Lượt attempt */}
        <p className="text-gray-500">
          Lượt làm: <span className="font-medium">{result.attempt_number + 1}</span>
        </p>

        {/* ✅ Nút điều hướng */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => router.push("/home")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>

    </div>
  );
}
