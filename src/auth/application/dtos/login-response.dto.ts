import { TokenResponseDto } from './token-response.dto';
export interface LoginResponseDto {
  id: number;
  LoginName: string;
  tokens: TokenResponseDto;
  loginDate: Date;
}
