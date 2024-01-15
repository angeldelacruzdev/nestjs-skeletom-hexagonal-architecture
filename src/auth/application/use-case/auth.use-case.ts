import { FindUserUseCase } from '../../../users/application';
import { AuthResponseDto, LoginDto, RefreshTokenDto } from '../dtos';
import { AuthRepositoryPort, AuthTokenGeneratePort } from '../ports';
import { AuthMapper } from '../mappers';
import { ExceptionHandlerPort } from '../../../common';
import { LoggerPort } from '../../../utils';

export class AuthUseCase {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
    private readonly loggerPort: LoggerPort,
    private readonly authTokenGeneratePort: AuthTokenGeneratePort,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    try {
      const responseFind = await this.findUserUseCase.findByEmail(dto.email);
      if (!responseFind) {
        throw new Error('Ha olvidada la contraseña o no está disponible.');
      }

      const token = await this.authTokenGeneratePort.token(
        responseFind.id,
        responseFind.email,
      );

      const responseRefreshToken =
        await this.authTokenGeneratePort.setRefreshTokenToUser(
          token.refresh_token,
          responseFind.id,
        );

      if (!responseRefreshToken) {
        throw new Error(
          'Lo sentimos, no tiene permisos para realizar está acción.',
        );
      }

      return AuthMapper.toDto(responseFind, token);
    } catch (error) {
      if (error) {
        this.loggerPort.error(error);
        return this.exceptionHandlerPort.handle(error);
      }
    }
  }
}
