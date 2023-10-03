import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDocDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
