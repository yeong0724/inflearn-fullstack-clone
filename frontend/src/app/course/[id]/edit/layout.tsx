import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api";
import EditCourseHeader from "@/components/course/course_info/edit-course-header";
import EditCourseSidebar from "@/components/course/course_info/edit-course-sidebar";

export default async function EditCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (course.error || !course.data) {
    notFound();
  }

  return (
    <div className="w-full h-full bg-[#F1F3F5]">
      <EditCourseHeader title={course.data?.title} />
      <div className="p-12 flex gap-12 min-h-screen max-w-5xl">
        <EditCourseSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
