import { IsNotEmpty } from 'class-validator';

export class CreateRolesDocDto {
  @IsNotEmpty()
  name: string;
}
