import { FindUserUseCase } from '../../../users/application';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto, LoginDto } from '../dtos';
import { AuthTokenGeneratePort } from '../ports';
import { AuthMapper } from '../mappers';
import { AuthNotFoundException } from '../../auth-exceptions';

export class AuthUseCase {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly authTokenGeneratePort: AuthTokenGeneratePort,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto | any> {
    try {
      const responseFind = await this.findUserUseCase.findByEmail(dto.email);
      if (!responseFind) {
        throw new AuthNotFoundException(
          'Ha olvidada la contraseña o no está disponible.',
        );
      }

      const responseRtHash = await this.findUserUseCase.findRtHashByUserId(
        responseFind.id,
      );

      const isMatch = await bcrypt.compare(dto.password, responseRtHash);

      if (!isMatch) {
        throw new AuthNotFoundException(
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
        throw new AuthNotFoundException(
          'Ha olvidada la contraseña o no está disponible.',
        );
      }

      return AuthMapper.toDto(responseFind, token);
    } catch (error) {
      if (error instanceof AuthNotFoundException) {
        throw new AuthNotFoundException(error.message);
      }
    }
  }
}
