import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserDetailDto {
  @IsOptional()
  userId?: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
