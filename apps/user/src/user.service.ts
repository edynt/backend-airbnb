import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        user_email: data.user_email,
        user_password: data.user_password,
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        user_phone: data.user_phone,
      },
    });
  }
}
