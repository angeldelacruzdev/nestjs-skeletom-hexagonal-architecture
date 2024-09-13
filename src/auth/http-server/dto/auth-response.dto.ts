import { TokenResponseDto } from '../../application';

export class AuthResponseHttpDto {
  id: string;
  email: string;
  tokens: TokenResponseDto;
}
