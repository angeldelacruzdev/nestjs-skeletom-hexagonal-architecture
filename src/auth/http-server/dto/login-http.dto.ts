import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginHttpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
