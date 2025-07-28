import { Module } from '@nestjs/common';
import { LecturesService } from '@/lectures/lectures.service';
import { LecturesController } from '@/lectures/lectures.controller';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}
