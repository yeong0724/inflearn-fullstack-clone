import InstructorPageName from "@/components/instructor/instructor-page-name";
import InstructorSidebar from "@/components/instructor/instructor-sidebar";
import { Props } from "@/types/app/instructor/type";

export default function InstructorLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      {/* 제목 */}
      <InstructorPageName />
      <div className="flex w-6xl mx-auto">
        <InstructorSidebar />
        {children}
      </div>
    </div>
  );
}
