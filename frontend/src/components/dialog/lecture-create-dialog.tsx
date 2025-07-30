import { Dispatch } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LectureCreateDialogProps {
  lectureDialogOpen: boolean;
  addLectureTitle: string;
  setLectureDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  setAddLectureTitle: Dispatch<React.SetStateAction<string>>;
  handleAddLecture: () => void;
}

const LectureCreateDialog = ({
  lectureDialogOpen,
  setLectureDialogOpen,
  setAddLectureTitle,
  addLectureTitle,
  handleAddLecture,
}: LectureCreateDialogProps) => {
  return (
    <Dialog open={lectureDialogOpen} onOpenChange={setLectureDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>수업 추가</DialogTitle>
        </DialogHeader>
        <Input
          value={addLectureTitle}
          onChange={(e) => setAddLectureTitle(e.target.value)}
          placeholder="제목을 입력해주세요. (최대 200자)"
          maxLength={200}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setLectureDialogOpen(false)}>
            취소
          </Button>
          <Button onClick={handleAddLecture} variant="default">
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LectureCreateDialog;
