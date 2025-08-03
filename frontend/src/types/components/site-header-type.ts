import { CourseCategory, User } from "@/generated/openapi-client";
import { Session } from "next-auth";

export type SiteHeaderProps = {
  session?: Session | null;
  profile?: User;
  categories: CourseCategory[];
};
