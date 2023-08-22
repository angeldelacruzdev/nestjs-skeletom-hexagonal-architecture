import { UserDetailDto } from './user-detail.dto';

export class CreateUserDto {
  email: string;
  password: string;
  status: boolean;
  details: UserDetailDto;
}
