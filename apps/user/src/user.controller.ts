import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { RegisterUserDto } from './dto/user.dto';
import { ResponseDTO } from './dto/response.dto';
import { validate } from 'class-validator';

interface UserPayload {
  user_email: string;
  user_password: string;
  user_first_name: string;
  user_last_name: string;
  user_phone: string;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get-users')
  async getUsers() {
    const users = await this.userService.getUsers();
    return new ResponseDTO(200, 'Get all users', users);
  }

  @MessagePattern('signup')
  async createUser(@Payload() data: UserPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const userData: UserPayload = plainToInstance(RegisterUserDto, data);

    const errors: any[] = await validate(userData);
    if (errors.length > 0) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        Object.values(errors[0].constraints).join(', '),
      );
    }

    try {
      const user = await this.userService.createUser(userData);
      if (user) {
        return new ResponseDTO(201, 'User created successfully', user);
      }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error && error.message);
    }
  }
}
