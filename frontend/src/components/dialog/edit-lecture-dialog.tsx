"use client";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CKEditor from "@/components/editor/ckeditor";
import { FileVideo } from "lucide-react";
import { uploadMedia, updateLecture } from "@/lib/api";
import { toast } from "sonner";
import { Lecture } from "@/generated/openapi-client";
import _ from "lodash-es";
import { errorToast } from "@/lib/utils";

interface EditLectureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lecture: Lecture;
}

interface EditLectureForm {
  title: string;
  description: string;
  videoStorageInfo?: Lecture["videoStorageInfo"];
}

const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300MB
const ACCEPTED_VIDEO_TYPES = {
  "video/mp4": [".mp4"],
  "video/x-matroska": [".mkv"],
  "video/x-m4v": [".m4v"],
  "video/quicktime": [".mov"],
};

const EditLectureDialog = ({
  isOpen,
  onClose,
  lecture,
}: EditLectureDialogProps) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<EditLectureForm>({
    title: lecture.title,
    description: lecture.description ?? "<p>강의의 설명을 적어주세요.</p>",
    videoStorageInfo: lecture.videoStorageInfo,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const { data, error } = await uploadMedia(file);
      if (!data || error) {
        toast.error(error as string);
        return;
      }
      setForm((prev) => ({
        ...prev,
        videoStorageInfo: data as Lecture["videoStorageInfo"],
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_VIDEO_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const { mutate: editLectureMutation, isPending: isEditLecturePending } =
    useMutation({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mutationFn: async (data: EditLectureForm) => {
        return updateLecture(lecture.id, {
          ...form,
        });
      },
      onSuccess: ({ error }) => {
        if (error) {
          errorToast(error);
        } else {
          toast.success("강의가 수정되었습니다.");
          queryClient.invalidateQueries({
            queryKey: ["course", lecture.courseId],
          });
          onClose();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    editLectureMutation(form);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>강의 수정</DialogTitle>
        </DialogHeader>

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>강의 영상</Label>
              {/* 업로드 된 강의 미리보기 */}
              {form.videoStorageInfo && (
                <div className="w-full max-h-[300px] overflow-hidden rounded-lg">
                  <video
                    autoPlay={true}
                    controls={true}
                    className="w-full h-auto max-h-[300px] object-contain"
                    src={_.get(form, "videoStorageInfo.cloudFront.url", "")}
                  />
                </div>
              )}

              {/* 권장 영상 형식 안내 */}
              <p className="text-sm text-gray-500 mb-2">
                • 최대 파일 크기: 5GB
                <br />
                • 지원 형식: .mp4, .mkv, .m4v, .mov
                <br />• 최소 해상도: 1080p 이상 (권장)
              </p>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                  isDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                <div className="py-8">
                  <FileVideo className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {form.videoStorageInfo
                      ? `선택된 파일: ${form.videoStorageInfo.fileName}`
                      : isDragActive
                      ? "파일을 여기에 놓아주세요"
                      : "클릭하거나 파일을 드래그하여 업로드하세요"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">수업 노트</Label>
              <div className="min-h-[300px]">
                <CKEditor
                  value={form.description}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, description: value }))
                  }
                />
              </div>
            </div>
          </form>
        </div>

        {/* 고정된 버튼 영역 */}
        <div className="flex-shrink-0 flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" type="button" onClick={onClose}>
            취소
          </Button>
          <Button
            type="submit"
            disabled={isEditLecturePending}
            onClick={handleSubmit}
          >
            {isEditLecturePending ? "수정 중..." : "수정"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLectureDialog;
