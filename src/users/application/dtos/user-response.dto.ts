import { UserDetailDto } from './user-detail.dto';

export class UserResponseDto {
  id: string;
  email: string;
  status?: boolean;
  terms: boolean;
  detail: UserDetailDto;
}
