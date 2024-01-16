import { FindUserUseCase } from '../../../users/application';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto, LoginDto } from '../dtos';
import { AuthTokenGeneratePort } from '../ports';
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
        return this.exceptionHandlerPort.handle(
          'Ha olvidada la contraseña o no está disponible.',
        );
      }

      const responseRtHash = await this.findUserUseCase.findRtHashByUserId(
        responseFind.id,
      );

      const isMatch = await bcrypt.compare(dto.password, responseRtHash);

      if (!isMatch) {
        return this.exceptionHandlerPort.handle(
          'Ha olvidada la contraseña o no está disponible.',
        );
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
        return this.exceptionHandlerPort.handle(
          'Ha olvidada la contraseña o no está disponible.',
        );
      }

      return AuthMapper.toDto(responseFind, token);
    } catch (error) {
      console.log(error);
      if (error) {
        this.loggerPort.error(error);
        return this.exceptionHandlerPort.handle(error);
      }
    }
  }
}
