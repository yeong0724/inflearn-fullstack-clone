"use client";

import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { Pencil, X } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Course as CourseType } from "@/generated/openapi-client";
import { useQuery } from "@tanstack/react-query";
import { getAllInstructorCourses } from "@/lib/api";

export default function CourseTable() {
  const router = useRouter();

  const { data: courses, isLoading } = useQuery<CourseType[]>({
    queryKey: ["instructor-courses"],
    queryFn: async () => {
      const { data, error } = await getAllInstructorCourses();
      if (!data || error) {
        notFound();
      }

      return data;
    },
    staleTime: 0, // 즉시 stale로 처리
    refetchOnWindowFocus: true, // 페이지 포커스시 재요청
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이미지</TableHead>
          <TableHead>강의명</TableHead>
          <TableHead>평점</TableHead>
          <TableHead>총 수강생</TableHead>
          <TableHead>질문</TableHead>
          <TableHead>가격 (할인가)</TableHead>
          <TableHead>총 수입</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses && courses.length > 0 ? (
          courses.map((course: CourseType) => {
            const avgRating = 0;
            const totalStudents = 0;
            const totalQuestions = 0;
            const price = course.price;
            const discountPrice = course.discountPrice;
            const totalRevenue = 0;
            const status =
              course.status === "PUBLISHED" ? "게시중" : "임시저장";
            return (
              <TableRow key={course.id}>
                <TableCell>
                  <Image
                    src={"/images/inflearn_public_logo.png"}
                    alt={course.title}
                    width={80}
                    height={80}
                    className="rounded bg-white border object-contain"
                  />
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{avgRating}</TableCell>
                <TableCell>{totalStudents}</TableCell>
                <TableCell>{totalQuestions}</TableCell>
                <TableCell>
                  {discountPrice ? (
                    <>
                      <span className="line-through text-gray-400 mr-1">
                        ₩{price.toLocaleString()}
                      </span>
                      <span className="text-green-700 font-bold">
                        ₩{discountPrice.toLocaleString()}
                      </span>
                    </>
                  ) : price ? (
                    `₩${price.toLocaleString()}`
                  ) : (
                    "미설정"
                  )}
                </TableCell>
                <TableCell>₩{totalRevenue.toLocaleString()}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell className="flex flex-col gap-2 justify-center h-full">
                  <Button
                    onClick={() => {
                      const confirmed =
                        window.confirm("정말 삭제하시겠습니까?");
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-1" /> 강의 삭제
                  </Button>
                  <Button
                    onClick={() =>
                      router.push(`/course/${course.id}/edit/course_info`)
                    }
                    variant="outline"
                    size="sm"
                  >
                    <Pencil className="w-4 h-4 mr-1" /> 강의 수정
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center text-gray-400">
              강의가 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
