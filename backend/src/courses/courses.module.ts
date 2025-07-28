import { Module } from '@nestjs/common';
import { CoursesService } from '@/courses/courses.service';
import { CoursesController } from '@/courses/courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
