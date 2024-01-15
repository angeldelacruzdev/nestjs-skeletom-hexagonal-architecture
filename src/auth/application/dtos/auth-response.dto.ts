import { TokenResponseDto } from './token-response.dto';

export class AuthResponseDto {
  id: string;
  email: string;
  tokens: TokenResponseDto;
}
