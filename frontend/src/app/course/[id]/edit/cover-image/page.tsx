import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/api";
import EditCoverImage from "@/components/course/cover-image/edit-cover-image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: course, error } = await getCourseById(id);

  if (!course || error) {
    notFound();
  }

  return (
    <div className="space-y-4 prose bg-white p-8 rounded-lg">
      <h2>커버 이미지 업로드</h2>
      <EditCoverImage course={course} />
    </div>
  );
}
