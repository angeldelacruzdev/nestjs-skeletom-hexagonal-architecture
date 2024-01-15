import { AuthDto, TokenResponseDto } from '../dtos';

export interface AuthRepositoryPort {
  login(dto: AuthDto): Promise<TokenResponseDto>;
  refreshToken(user: AuthDto): Promise<TokenResponseDto>;
}
