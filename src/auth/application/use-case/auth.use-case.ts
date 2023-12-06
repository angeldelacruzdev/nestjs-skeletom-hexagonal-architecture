import { FindUserUseCase } from '../../../users/application';
import { AuthResponseDto, LoginDto, RefreshTokenDto } from '../dtos';
import { AuthRepositoryPort } from '../ports';
import { AuthMapper } from '../mappers';
import { ExceptionHandlerPort } from '../../../common';
import { LoggerPort } from '../../../utils';

export class AuthUseCase {
  constructor(
    private readonly repository: AuthRepositoryPort,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly exceptionHandlerPort: ExceptionHandlerPort,
    private readonly loggerPort: LoggerPort,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    try {
      const responseFind = await this.findUserUseCase.findByEmail(dto.email);
      console.log(responseFind)
      if (!responseFind) {
        throw new Error('Ha olvidada la contraseña o no está disponible.');
      }

      const token = await this.repository.login({
        id: responseFind.id,
        email: responseFind.email,
      });

      return AuthMapper.toDto(responseFind, token);
    } catch (error) {
      if (error) {
        this.loggerPort.error(error);
        return this.exceptionHandlerPort.handle(error);
      }
    }
  }

  async refreshToken(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    const response = await this.findUserUseCase.findUserByid(dto.id);
    if (!response) {
      throw new Error('Ha olvidada la contraseña o no está disponible.');
    }
    const token = await this.repository.refreshToken({
      id: response.id,
      email: response.email,
    });
    return AuthMapper.toDto(response, token);
  }
}
