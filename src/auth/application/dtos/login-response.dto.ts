import { TokenDto } from './token-response.dto';
export interface LoginResponseDto {
  id: number;
  LoginName: string;
  tokens: TokenDto;
  loginDate: Date;
}
