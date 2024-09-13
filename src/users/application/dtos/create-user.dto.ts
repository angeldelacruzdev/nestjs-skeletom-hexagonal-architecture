/* eslint-disable prettier/prettier */
import { UserDetailDto } from './user-detail.dto';

export class CreateUserDto {
  email: string;
  password: string;
  terms: boolean;
  status?: boolean;
}
