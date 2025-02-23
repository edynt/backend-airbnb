import { Module } from '@nestjs/common';
import { UserController } from './user-service.controller';

@Module({
  controllers: [UserController],
})
export class AppModule {}
