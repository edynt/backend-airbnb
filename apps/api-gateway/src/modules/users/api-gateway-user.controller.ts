import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get-users');
    this.kafkaClient.subscribeToResponseOf('signup');
    await this.kafkaClient.connect();
  }

  @Get()
  getUsers() {
    return this.kafkaClient.send('get-users', {});
  }

  @Post('/signup')
  createUser(@Body() data) {
    return this.kafkaClient.send('signup', data);
  }

  @Post('/login')
  login(@Body() data) {
    return this.kafkaClient.send('login', data);
  }
}
