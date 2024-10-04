import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IBaseUser } from '@/xmodels';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async find(input: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: input,
    });
  }

  async create(input: IBaseUser): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }
}
