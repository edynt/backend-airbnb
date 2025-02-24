import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get-users');
    this.kafkaClient.subscribeToResponseOf('create-user');
    await this.kafkaClient.connect();
  }

  @Get()
  getUsers() {
    console.log('API Gateway: Call get users');
    return this.kafkaClient.send('get-users', {});
  }

  @Post()
  // eslint-disable-next-line @typescript-eslint/require-await
  async createUser(@Body() data) {
    console.log('API Gateway: Call create user');
    return this.kafkaClient.send('create-user', data);
  }
}
