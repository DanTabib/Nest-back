import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, WorkerProfile } from '@prisma/client';
import { IWorkerProfile } from '@/xmodels';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async find(
    input: Prisma.WorkerProfileWhereUniqueInput,
  ): Promise<WorkerProfile | null> {
    return this.prisma.workerProfile.findUnique({
      where: input,
    });
  }

  async create(input: IWorkerProfile): Promise<WorkerProfile> {
    const skills = input.skills || [];
    return this.prisma.workerProfile.create({
      data: {
        ...input,
        skills: {
          create: skills,
        },
      },
    });
  }

  async upsert(input: IWorkerProfile): Promise<WorkerProfile> {
    const _input = { ...input };
    const userId = input.userId;
    delete _input.userId;

    const skills = input.skills || [];

    return this.prisma.workerProfile.upsert({
      where: {
        userId: userId,
      },
      create: {
        ...input,
        skills: {
          create: skills,
        },
      },
      update: {
        ...input,
        skills: {
          create: skills,
        },
      },
    });
  }
}
