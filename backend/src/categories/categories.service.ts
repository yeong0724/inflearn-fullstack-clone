import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.courseCategory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
