import { AuthDto, TokenResponseDto } from '../dtos';

export interface AuthRepositoryPort {
  refreshToken(user: AuthDto): Promise<TokenResponseDto>;
}
