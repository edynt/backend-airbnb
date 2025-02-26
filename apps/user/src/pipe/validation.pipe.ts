/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // 1. Check if `metatype` exists and is a valid class (not a primitive type)
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    // 2. Convert the incoming plain object to an instance of the expected DTO class
    const object = plainToInstance(metadata.metatype, value);

    // 3. Validate the object using `class-validator`
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(
        Object.values(errors[0].constraints ?? {})[0],
      );
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype); // Exclude primitive types from validation
  }
}
