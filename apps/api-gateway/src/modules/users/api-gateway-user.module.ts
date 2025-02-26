import { Module } from '@nestjs/common';
import { UserController } from './api-gateway-user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UserController],
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
})
export class ApiGatewayUserModule {}
