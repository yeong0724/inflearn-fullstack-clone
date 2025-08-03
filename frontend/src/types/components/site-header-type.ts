import { CourseCategory, User } from "@/generated/openapi-client";

export type SiteHeaderProps = {
  profile?: User;
  categories: CourseCategory[];
};
