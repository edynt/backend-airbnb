import { NestFactory } from '@nestjs/core';
import { AppModule } from './api-gateway.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('API Gateway running on http://localhost:3000');
}

bootstrap();
