import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get-users');
    await this.kafkaClient.connect();
  }

  @Get()
  getUsers() {
    console.log('API Gateway: Call get users');
    return this.kafkaClient.send('get-users', {});
  }
}
