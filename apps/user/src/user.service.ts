import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findUniqueUser(user_email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        user_email,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const userExist = await this.findUniqueUser(data.user_email);
    if (userExist) {
      throw new BadRequestException('User already exist with this email!');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
    const passwordHash = await bcrypt.hash(data.user_password, saltRounds);

    data.user_password = passwordHash;

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
