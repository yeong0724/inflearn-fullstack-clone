import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api";
import EditCurriculum from "@/components/course/curriculum/edit-curriculum";
import type { Props } from "@/types/app/course/edit/curriculum/type";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "강좌 커리큘럼 - 인프런",
  description: "인프런 강좌 편집 페이지입니다.",
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course.data || course.error) {
    notFound();
  }

  return (
    <div className="space-y-8 flex flex-col items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold">커리큘럼</h1>
          </CardTitle>
        </CardHeader>
      </Card>
      <EditCurriculum initialCourse={course.data} />
    </div>
  );
}
