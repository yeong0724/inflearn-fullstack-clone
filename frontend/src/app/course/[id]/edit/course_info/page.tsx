import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api";
import EditCourseInfo from "@/components/course/course_info/edit-course-info";
import { Props } from "@/types/app/course/edit/course_info/type";

export default async function EditCourseInfoPage({ params }: Props) {
  const { id } = await params;

  const course = await getCourseById(id);

  if (!course.data || course.error) {
    notFound();
  }

  return <EditCourseInfo course={course.data} />;
}
