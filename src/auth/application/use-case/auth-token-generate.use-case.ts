import { FindUserUseCase } from '../../../users/application';
import { AuthResponseDto, RefreshTokenDto, TokenResponseDto } from '../dtos';
import { AuthMapper } from '../mappers';
import { AuthTokenGeneratePort } from '../ports';

export class AuthTokenGenerateUseCase {
  constructor(
    private authTokenGeneratePort: AuthTokenGeneratePort,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  async token(id: string, email: string): Promise<TokenResponseDto> {
    return await this.authTokenGeneratePort.token(id, email);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    const response = await this.findUserUseCase.findUserByid(dto.id);
    if (!response) {
    }

    const responseHash = await this.findUserUseCase.findUserRtHash(
      dto.id,
      dto.refresh_token,
    );
    if (!responseHash) {
    }

    const token = await this.token(response.id, response.email);
    return AuthMapper.toDto(response, token);
  }
}
