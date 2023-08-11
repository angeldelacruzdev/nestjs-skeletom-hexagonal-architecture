export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  rt_hash: string;
  is_admin: boolean;
  status: boolean;
}
