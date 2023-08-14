import { UserResponseDto } from "../dtos";
import { FindUserRepositoryPort, UpdateUserRepository } from "../ports";
import { ExceptionHandlerPort } from "@common/exceptions";

export class DeleteUserUserCase {
    constructor(
        private readonly updateUserRepository: UpdateUserRepository,
        private readonly findUserRepositoryPort: FindUserRepositoryPort,
        private exceptionHandlerPort: ExceptionHandlerPort
    ) { }

    async delete(id: number): Promise<UserResponseDto> {
        try {
            const responseFind = await this.findUserRepositoryPort.findUserByid(id)

            if (responseFind.is_admin) {
                throw new Error("El usuario es administrador, lo sentimos, no puede ser eliminado por esta via.");
            }

            if (!responseFind.status) {
                throw new Error("El usuario ya se encuentra eliminado.");
            }
            
            const response = await this.updateUserRepository.updateStatus(id, false)
            return response;

        } catch (error) {
            return this.exceptionHandlerPort.handle(error)
        }
    }
}