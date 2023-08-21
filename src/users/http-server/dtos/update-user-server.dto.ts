import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
export class UpdateUserServerDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  is_admin: boolean;

  @IsOptional()
  status: boolean;
}
