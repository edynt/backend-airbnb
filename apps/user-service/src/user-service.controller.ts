import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserServiceService) {}

  private users = [{ id: 1, name: 'John Doe' }];

  @MessagePattern('get-users')
  async getUsers(): Promise<any> {
    return await this.userService.getUsers();
  }

  @MessagePattern('create-user')
  async createUser(@Payload() data: any) {
    return await this.userService.createUser(data);
  }
}
