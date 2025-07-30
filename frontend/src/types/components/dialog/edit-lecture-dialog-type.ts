import { Lecture } from "@/generated/openapi-client";

export interface EditLectureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lecture: Lecture;
}

export interface EditLectureForm {
  title: string;
  description: string;
  videoStorageInfo?: Lecture["videoStorageInfo"];
}
