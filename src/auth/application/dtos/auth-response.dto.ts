import { TokenDto } from './token-reponse.dto';

export class AuthResponseDto {
  id: string;
  email: string;
  tokens: TokenDto;
}
