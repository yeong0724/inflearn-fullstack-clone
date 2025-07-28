"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function InstructorPageName() {
  const pathname = usePathname();

  const title = useMemo(() => {
    switch (pathname) {
      case "/instructor":
        return "대시보드";
      case "/instructor/courses":
        return "강의 관리";
      default:
        return "대시보드";
    }
  }, [pathname]);

  return (
    <div className="w-full bg-gray-700">
      <div className="w-6xl mx-auto text-white text-2xl font-bold py-4">
        {title}
      </div>
    </div>
  );
}
