import { ExceptionHandlerPort } from '../../../common';
import { FindUserUseCase } from '../../../users/application';
import { AuthResponseDto, RefreshTokenDto, TokenResponseDto } from '../dtos';
import { AuthMapper } from '../mappers';
import { AuthTokenGeneratePort } from '../ports';

export class AuthTokenGenerateUseCase {
  constructor(
    private authTokenGeneratePort: AuthTokenGeneratePort,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
  ) {}

  async token(id: string, email: string): Promise<TokenResponseDto> {
    return await this.authTokenGeneratePort.token(id, email);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    const response = await this.findUserUseCase.findUserByid(dto.id);
    if (!response) {
      return this.exceptionHandlerPort.handle(`
          Lo sentimos, no puede realizar está acción.
      `);
    }

    const responseHash = await this.findUserUseCase.findUserRtHash(
      dto.id,
      dto.refresh_token,
    );
    if (!responseHash) {
      return this.exceptionHandlerPort.handle(`
        No tiene permisos para realizar está acción.
      `);
    }

    const token = await this.token(response.id, response.email);
    return AuthMapper.toDto(response, token);
  }
}
