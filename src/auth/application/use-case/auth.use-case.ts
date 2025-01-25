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

  async signin(dto: LoginDto): Promise<AuthResponseDto> {
    try {
      const findUserByEmail = await this.findUserUseCase.findByEmail(dto.email);

      if (!findUserByEmail) {
        throw new AuthNotFoundException('Has olvidada la contraseña.');
      }

      const findUserById = await this.findUserUseCase.findRtHashByUserId(
        findUserByEmail.id,
      );

      const passwordIsMatch = await bcrypt.compare(dto.password, findUserById);

      if (!passwordIsMatch) {
        throw new AuthNotFoundException('Has olvidada la contraseña.');
      }

      const getToken = await this.authTokenGeneratePort.token(
        findUserByEmail.id,
        findUserByEmail.email,
      );

      const responseRefreshToken =
        await this.authTokenGeneratePort.setRefreshTokenToUser(
          getToken.refresh_token,
          findUserByEmail.id,
        );

      if (!responseRefreshToken) {
        throw new AuthNotFoundException('Has olvidada la contraseña.');
      }

      return AuthMapper.toDto(findUserByEmail, getToken);
    } catch (error) {
      if (error instanceof AuthNotFoundException) {
        throw new AuthNotFoundException(error.message);
      }
    }
  }
}
