import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
// import { NewUser, UpdateUser } from './user.schema';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(): Promise<User | null> {
    return null;
  }
}
