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
      throw new Error('Has olvidada la contraseña.');
    }

    const responseHash = await this.findUserUseCase.findUserRtHash(
      dto.id,
      dto.refresh_token,
    );
    if (!responseHash) {
      throw new Error('No tiene permisos para realizar está acción.');
    }

    const token = await this.token(response.id, response.email);
    return AuthMapper.toDto(response, token);
  }
}
