export const dynamic = "force-dynamic";

import CourseTable from "@/components/instructor/courses/course-table";

export default async function InstructorCoursesPage() {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">강의 관리</h1>
      <CourseTable />
    </div>
  );
}
