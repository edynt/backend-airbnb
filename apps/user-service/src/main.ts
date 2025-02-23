import { NestFactory } from '@nestjs/core';
import { AppModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-service-consumer',
        },
      },
    },
  );

  await app.listen();
  console.log('User Service is listening for Kafka events...');
}

bootstrap();
