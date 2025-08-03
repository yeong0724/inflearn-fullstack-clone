import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api";
import EditCourseInfo from "@/components/course/course_info/edit-course-info";
import { Props } from "@/types/app/course/edit/course_info/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "강좌 정보 편집 - 인프런",
  description: "인프런 강좌 정보 편집 페이지입니다.",
};

export default async function EditCourseInfoPage({ params }: Props) {
  const { id } = await params;

  const course = await getCourseById(id);

  if (!course.data || course.error) {
    notFound();
  }

  return <EditCourseInfo course={course.data} />;
}
