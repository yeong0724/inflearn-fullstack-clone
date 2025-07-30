import { Course } from "@/generated/openapi-client";

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CourseStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}

export interface FormValues {
  title: string;
  shortDescription: string;
  price: string;
  discountPrice: string;
  level: CourseLevel;
  status: CourseStatus;
}

export interface EditCourseHeaderProps {
  course: Course;
}
