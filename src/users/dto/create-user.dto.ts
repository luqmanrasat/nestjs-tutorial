import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
