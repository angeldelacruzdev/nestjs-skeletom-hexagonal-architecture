import { TokenResponseDto } from '../dtos';

export interface AuthTokenGeneratePort {
  token(id: string, email: string): Promise<TokenResponseDto>;
  setRefreshTokenToUser(
    rtToken: string,
    userId: string,
  ): Promise<boolean | null>;
}
