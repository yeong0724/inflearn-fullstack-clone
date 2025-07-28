"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditCourseHeader({ title }: { title: string }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white sticky top-0 z-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center gap-2">
        <Button size={"lg"}>제출</Button>
        <Button size="lg" variant={"outline"} onClick={handleGoBack}>
          <X size={20} />
        </Button>
      </div>
    </header>
  );
}
