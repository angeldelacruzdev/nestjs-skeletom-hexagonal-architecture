import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserDetailDto } from './../../../users/application';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  status: boolean;


  @IsOptional()
  details: UserDetailDto
}
