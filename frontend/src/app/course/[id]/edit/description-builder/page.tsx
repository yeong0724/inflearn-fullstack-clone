import { getCourseById } from "@/lib/api";
import EditDescriptionBuilder from "@/components/course/description-builder/edit-description-builder";
import { notFound } from "next/navigation";
import type { PageProps } from "@/types/app/course/edit/description-builder/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "강좌 상세소개 - 인프런",
  description: "인프런 강좌 편집 페이지입니다.",
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { data, error } = await getCourseById(id);
  if (!data || error) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col items-end gap-2">
      <EditDescriptionBuilder course={data} />
    </div>
  );
}
