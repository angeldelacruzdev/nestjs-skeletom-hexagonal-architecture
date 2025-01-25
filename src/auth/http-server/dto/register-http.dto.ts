import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserDetailDto } from './auth-user-detail.dto';

export class RegisterHttpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  terms: boolean;

  @IsOptional()
  status: boolean;

  @IsOptional()
  details: UserDetailDto;
}
