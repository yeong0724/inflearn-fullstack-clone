"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { EditCourseHeaderProps } from "@/types/components/course/course-info/edit-course-type";

export default function EditCourseHeader({ title }: EditCourseHeaderProps) {
  const router = useRouter();

  const handleGoToInstructorPage = () => {
    router.push("/instructor");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white sticky top-0 z-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center gap-2">
        <Button size={"lg"}>제출</Button>
        <Button
          size="lg"
          variant={"outline"}
          onClick={handleGoToInstructorPage}
        >
          <X size={20} />
        </Button>
      </div>
    </header>
  );
}
