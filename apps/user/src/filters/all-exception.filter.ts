import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToRpc(); // Switch to RPC context (for Kafka)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof RpcException
          ? 400 // Default for RPC errors
          : 500; // Internal Server Error for unexpected cases

    const response = {
      statusCode: status,
      message: exception.message || 'Internal server error',
    };

    return response;
  }
}
