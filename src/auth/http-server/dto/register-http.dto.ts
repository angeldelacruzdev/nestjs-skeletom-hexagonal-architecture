import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterHttpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  terms: boolean;

  @IsNotEmpty()
  status: boolean;

  @IsOptional()
  details: UserDetailDto;
}

export class UserDetailDto {
  @IsOptional()
  userId?: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
