import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserServiceService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): Promise<any[]> {
    console.log('User Service: call get users');
    return this.prisma.user.findMany();
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
