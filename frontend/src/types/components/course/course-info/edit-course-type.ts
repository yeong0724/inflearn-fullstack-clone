export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CourseStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
}

export type FormValues = {
  title: string;
  shortDescription: string;
  price: string;
  discountPrice: string;
  level: CourseLevel;
  status: CourseStatus;
};
