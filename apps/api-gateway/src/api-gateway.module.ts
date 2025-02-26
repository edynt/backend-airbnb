import { Module } from '@nestjs/common';
import { ApiGatewayUserModule } from './modules/users/api-gateway-user.module';

@Module({
  imports: [ApiGatewayUserModule],
})
export class AppModule {}
