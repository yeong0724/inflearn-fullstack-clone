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
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { SectionsService } from '@/sections/sections.service';
import { CreateSectionDto } from '@/sections/dto/create-section.dto';
import { UpdateSectionDto } from '@/sections/dto/update-section.dto';
import { Section as SectionEntity } from '@/_gen/prisma-class/section';

@ApiTags('섹션')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post('courses/:courseId/sections')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '새 섹션 생성' })
  @ApiParam({ name: 'courseId', description: '코스 ID' })
  @ApiBody({ type: CreateSectionDto })
  @ApiOkResponse({
    description: '섹션 생성 성공',
    type: SectionEntity,
  })
  create(
    @Param('courseId') courseId: string,
    @Body() createSectionDto: CreateSectionDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub ?? '';
    return this.sectionsService.create(courseId, createSectionDto, userId);
  }

  @Get(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 상세 정보' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiOkResponse({
    description: '섹션 상세 정보',
    type: SectionEntity,
  })
  findOne(@Param('sectionId') sectionId: string, @Req() req: Request) {
    const userId = req.user?.sub ?? '';
    return this.sectionsService.findOne(sectionId, userId);
  }

  @Patch(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 업데이트' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiBody({ type: UpdateSectionDto })
  @ApiOkResponse({
    description: '섹션 업데이트 성공',
    type: SectionEntity,
  })
  update(
    @Param('sectionId') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @Req() req: Request,
  ) {
    const userId = req.user?.sub ?? '';
    return this.sectionsService.update(sectionId, updateSectionDto, userId);
  }

  @Delete(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 삭제' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiOkResponse({
    description: '섹션 삭제 성공',
    type: SectionEntity,
  })
  delete(@Param('sectionId') sectionId: string, @Req() req: Request) {
    const userId = req.user?.sub ?? '';
    return this.sectionsService.delete(sectionId, userId);
  }
}
