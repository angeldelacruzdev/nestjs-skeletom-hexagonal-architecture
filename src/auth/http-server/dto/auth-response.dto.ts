import { TokenDto } from '../../application';
export class AuthResponseHttpDto {
  id: string;
  email: string;
  tokens: TokenDto;
}
