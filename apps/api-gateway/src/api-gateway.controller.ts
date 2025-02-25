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
  // eslint-disable-next-line @typescript-eslint/require-await
  async createUser(@Body() data) {
    return this.kafkaClient.send('signup', data);
  }
}
