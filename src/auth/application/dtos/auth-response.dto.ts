import { TokenDto } from './token-reponse.dto';

export class AuthResponseDto {
  id: number;
  name: string;
  tokens: TokenDto;
}
