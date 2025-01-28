import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class AuthRegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  terms: boolean;

  @IsOptional()
  status: boolean;


}
