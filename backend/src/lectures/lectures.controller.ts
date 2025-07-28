import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { Lecture as LectureEntity } from '@/_gen/prisma-class/lecture';
import { LecturesService } from '@/lectures/lectures.service';
import { CreateLectureDto } from '@/lectures/dto/create-lecture.dto';
import { UpdateLectureDto } from '@/lectures/dto/update-lecture.dto';

@ApiTags('개별 강의')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post('sections/:sectionId/lectures')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '새 강의 생성' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiBody({ type: CreateLectureDto })
  @ApiOkResponse({
    description: '강의 생성 성공',
    type: LectureEntity,
  })
  create(
    @Param('sectionId') sectionId: string,
    @Body() createLectureDto: CreateLectureDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub ?? '';
    return this.lecturesService.create(sectionId, createLectureDto, userId);
  }

  @Get(':lectureId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '개별 강의 상세 정보' })
  @ApiParam({ name: 'lectureId', description: '개별 강의 ID' })
  @ApiOkResponse({
    description: '개별 강의 상세 정보 조회',
    type: LectureEntity,
  })
  findOne(@Param('lectureId') lectureId: string, @Req() req: Request) {
    const userId = req.user?.sub ?? '';
    return this.lecturesService.findOne(lectureId, userId);
  }

  @Patch(':lectureId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '개별 강의 수정' })
  @ApiParam({ name: 'lectureId', description: '개별 강의 ID' })
  @ApiBody({ type: UpdateLectureDto })
  @ApiOkResponse({
    description: '개별 강의 수정 성공',
    type: LectureEntity,
  })
  update(
    @Param('lectureId') lectureId: string,
    @Body() updateLectureDto: UpdateLectureDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub ?? '';
    return this.lecturesService.update(lectureId, updateLectureDto, userId);
  }

  @Delete(':lectureId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '개별 강의 삭제' })
  @ApiParam({ name: 'lectureId', description: '개별 강의 ID' })
  @ApiOkResponse({
    description: '개별 강의 삭제 성공',
    type: LectureEntity,
  })
  delete(@Param('lectureId') lectureId: string, @Req() req: Request) {
    const userId = req.user?.sub ?? '';
    return this.lecturesService.remove(lectureId, userId);
  }
}
