import { UserDetailDto } from '../../../users/application';

export interface RegisterDto {
  email: string;
  password: string;
  terms: boolean;
  status: boolean;
  details: UserDetailDto;
}
