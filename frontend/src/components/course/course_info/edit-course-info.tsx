"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Course } from "@/generated/openapi-client";
import { updateCourse } from "@/lib/api";
import { errorToast } from "@/lib/utils";
import {
  CourseLevel,
  CourseStatus,
  type FormValues,
} from "@/types/components/course/course-info/edit-course-type";

const LEVEL_OPTIONS = [
  { value: CourseLevel.BEGINNER, label: "입문", id: "level-beginner" },
  { value: CourseLevel.INTERMEDIATE, label: "초급", id: "level-intermediate" },
  { value: CourseLevel.ADVANCED, label: "중급", id: "level-advanced" },
];

export default function EditCourseInfo({ course }: { course: Course }) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    defaultValues: {
      title: course.title,
      shortDescription: course.shortDescription ?? "",
      price: course.price.toString() ?? "0",
      discountPrice: course.discountPrice?.toString() ?? "0",
      level: (course?.level as CourseLevel) ?? CourseLevel.BEGINNER,
      status: (course?.status as CourseStatus) ?? CourseStatus.DRAFT,
    },
  });

  const { handleSubmit, register, control, setValue, watch } = form;

  const updateCourseMutation = useMutation({
    mutationFn: (data: FormValues) =>
      updateCourse(course.id, {
        ...data,
        price: parseInt(data.price),
        discountPrice: parseInt(data.discountPrice),
      }),
    onSuccess: ({ error }) => {
      if (error) {
        errorToast(error);
      } else {
        toast.success("강의 정보가 성공적으로 업데이트 되었습니다!");

        queryClient.invalidateQueries({
          queryKey: ["instructor-courses"],
        });
      }
    },
  });

  const onSubmit = (data: FormValues) => {
    updateCourseMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 rounded-lg shadow"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                강의 제목 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="강의 제목을 입력하세요"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                강의 두줄 요약 <span className="text-red-500">*</span>
              </FormLabel>
              <div className="text-xs text-red-500 mb-1">
                강의소개 상단에 보여집니다. 잠재 수강생들이 매력을 느낄만한 글을
                짧게 남겨주세요.
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="ex) 이 강의를 통해 수강생은 컴퓨터 공학의 기초를 다질 수 있을 것으로 예상합니다."
                  required
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                강의 가격 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="0"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="discountPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>강의 할인 가격</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="할인 가격이 있다면 입력하세요"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                난이도 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-6"
                >
                  {LEVEL_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <RadioGroupItem value={option.value} id={option.id} />
                      <FormLabel htmlFor={option.id} className="ml-2">
                        {option.label}
                      </FormLabel>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                상태 <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-6"
                >
                  <RadioGroupItem value="PUBLISHED" id="status-published" />
                  <FormLabel htmlFor="status-published" className="mr-4">
                    공개
                  </FormLabel>
                  <RadioGroupItem value="DRAFT" id="status-draft" />
                  <FormLabel htmlFor="status-draft">임시저장</FormLabel>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4">
          저장하기
        </Button>
      </form>
    </Form>
  );
}
