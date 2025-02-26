import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/user.dto';
import { ResponseDTO } from './dto/response.dto';
import { ValidationPipe } from './pipe/validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get-users')
  async getUsers() {
    const users = await this.userService.getUsers();
    return new ResponseDTO(200, 'Get all users', users);
  }

  @MessagePattern('signup')
  async createUser(@Payload(new ValidationPipe()) data: RegisterUserDto) {
    try {
      const user = await this.userService.createUser(data);
      if (user) {
        delete (user as { user_password?: string }).user_password;

        return new ResponseDTO(201, 'User created successfully', user);
      }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error && error.message);
    }
  }
}
