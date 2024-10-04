import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileService],
  imports: [PrismaModule],
})
export class UserModule {}
