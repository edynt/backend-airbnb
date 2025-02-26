import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  user_email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 8 characters' })
  user_password: string;

  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  user_first_name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  user_last_name: string;

  @MaxLength(15, { message: 'Phone number must be at most 15 characters' })
  @MinLength(10, { message: 'Phone number must be at least 10 characters' })
  @IsNotEmpty({ message: 'Phone number is required' })
  user_phone: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  user_email: string;

  @IsNotEmpty({ message: 'Password is required' })
  user_password: string;
}
