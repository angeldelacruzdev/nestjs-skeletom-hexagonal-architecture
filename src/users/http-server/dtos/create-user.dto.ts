import { IsString, IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  is_admin: boolean;

  @IsBoolean()
  status: boolean;
}
