import { FindUserUseCase } from '../../../users/application';
import { AuthBadRequestException } from '../../auth-exceptions';
import { AuthRegisterDto, AuthResponseDto, RegisterResponseDto } from '../dtos';
import { AuthMapper } from '../mappers';
import { RegisterRepositoryPort } from '../ports';

export class RegisterUseCase {
  constructor(
    private readonly registerRepositoryPort: RegisterRepositoryPort,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  async register(dto: AuthRegisterDto): Promise<RegisterResponseDto> {
    dto.status = true;
    try {
      const user = await this.findUserUseCase.findByEmail(dto.email);

      if (user) {
        throw new AuthBadRequestException(
          'El correo electrónico que has ingresado ya está registrado. Por favor, utiliza uno diferente o intenta iniciar sesión.',
          400,
        );
      }
      const response = await this.registerRepositoryPort.register(dto);
      return response;
    } catch (error) {
      throw new AuthBadRequestException(error.message, 400);
    }
  }
}
