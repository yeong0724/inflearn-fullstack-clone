import { Module } from '@nestjs/common';
import { MediaService } from '@/media/media.service';
import { MediaController } from '@/media/media.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        // 300MB 이하
        fileSize: 300 * 1024 * 1024,
      },
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
