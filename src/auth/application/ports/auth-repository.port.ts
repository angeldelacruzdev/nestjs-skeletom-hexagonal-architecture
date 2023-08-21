import { AuthDto, TokenDto } from '../dtos';

export interface AuthRepositoryPort {
  login(dto: AuthDto): Promise<TokenDto>;
  refreshToken(user: AuthDto): Promise<TokenDto>;
}
