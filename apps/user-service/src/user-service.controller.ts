import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  private users = [{ id: 1, name: 'John Doe' }];

  @MessagePattern('get-users')
  getUsers() {
    console.log('User Service: Call get users');
    return this.users;
  }
}
