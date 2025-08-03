import CreateCoursesForm from "@/components/create_courses/create_courses_form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "강좌 만들기 - 인프런",
  description: "인프런 강좌 만들기 페이지입니다.",
};

export default function CreateCoursesPage() {
  return (
    <div className="w-full max-w-xl mx-auto h-[90vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl text-center font-boldd">
        제목을 입력해주세요!
        <br />
        {`너무 고민하지마세요. 제목은 언제든 수정 가능해요 :)`}
      </h2>
      <CreateCoursesForm />
    </div>
  );
}
