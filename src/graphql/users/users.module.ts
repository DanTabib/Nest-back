import { Module } from '@nestjs/common';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  providers: [UsersResolvers, UsersService],
  imports: [PrismaModule],
})
export class PostsModule {}
