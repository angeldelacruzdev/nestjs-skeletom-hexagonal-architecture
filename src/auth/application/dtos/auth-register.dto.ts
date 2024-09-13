import { UserDetailDto } from '../../../users/application';

export interface AuthRegisterDto {
  email: string;
  password: string;
  terms: boolean;
  status?: boolean;
}
