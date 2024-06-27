import {
  UserBadRequestException,
  UserInternalErrorException,
} from '../../user-exception';
import { UserResponseDto } from '../dtos';
import { FindUserRepositoryPort, UpdateUserRepository } from '../ports';

export class DeleteUserUserCase {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly findUserRepositoryPort: FindUserRepositoryPort,
  ) {}

  async delete(id: string): Promise<UserResponseDto> {
    try {
      const responseFind = await this.findUserRepositoryPort.findUserByid(id);

      if (responseFind) {
        throw new UserBadRequestException(
          'El usuario es administrador, lo sentimos, no puede ser eliminado por esta via.',
        );
      }

      if (!responseFind.status) {
        throw new UserBadRequestException(
          'El usuario ya se encuentra eliminado.',
        );
      }

      const response = await this.updateUserRepository.updateStatus(id, false);
      return response;
    } catch (error) {
      throw new UserInternalErrorException();
    }
  }
}
