import { Course } from "@/generated/openapi-client";

export type Props = {
  params: Promise<{ id: string }>;
};

export type EditCurriculumProps = {
  initialCourse: Course;
};
