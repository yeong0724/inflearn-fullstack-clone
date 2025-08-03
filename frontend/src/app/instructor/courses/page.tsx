export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import CourseTable from "@/components/instructor/courses/course-table";

export const metadata: Metadata = {
  title: "강좌 관리 - 인프런",
  description: "인프런 강좌 관리 페이지입니다.",
};

export default async function InstructorCoursesPage() {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">강의 관리</h1>
      <CourseTable />
    </div>
  );
}
