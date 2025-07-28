"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createCourse } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { errorToast } from "@/lib/utils";

export default function CreateCoursesForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleGoBack = () => {
    router.back();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => createCourse(title),
    onSuccess: ({ data, error }) => {
      if (data && !error) {
        router.push(`/course/${data.id}/edit/course_info`);
      }

      if (error) {
        errorToast(error);
      }
    },
  });

  return (
    <>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요."
        className="bg-[#F6F6F6] py-6 rounded-xs"
      />
      <div className="space-x-2">
        <Button
          variant={"outline"}
          className="px-8 py-6 text-md font-bold"
          onClick={handleGoBack}
        >
          이전
        </Button>
        <Button
          onClick={() => mutate()}
          variant={"default"}
          className="px-8 py-6 text-md font-bold"
          disabled={isPending}
        >
          {isPending ? "생성중..." : "만들기"}
        </Button>
      </div>
    </>
  );
}
