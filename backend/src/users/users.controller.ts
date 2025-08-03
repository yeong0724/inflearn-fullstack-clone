import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from '@/auth/guards/access-token.guard';
import { User as UserEntity } from '@/_gen/prisma-class/user';
import { UsersService } from '@/users/users.service';
import { UpdateUserDto } from '@/users/dto/update-user.dto';

@ApiTags('프로필')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '프로필 조회',
    type: UserEntity,
  })
  getProfile(@Req() req: Request) {
    const userId = req.user?.sub ?? '';
    return this.usersService.getProfile(userId);
  }

  @Patch('profile')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '프로필 수정',
    type: UserEntity,
  })
  updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user?.sub ?? '';
    return this.usersService.updateProfile(userId, updateUserDto);
  }
}
