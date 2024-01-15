import { UserDetailDto } from '../../../users/application';

export class RegisterResponseDto {
  id: string;
  email: string;
  password: string;
  terms: boolean;
  status: boolean;
  details: UserDetailDto;
}
