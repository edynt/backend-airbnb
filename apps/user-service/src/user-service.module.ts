import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserServiceService, PrismaService],
})
export class AppModule {}
