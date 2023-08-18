import { ExceptionHandlerPort } from "@common/exceptions";
import { FindUserUseCase } from "../../../users/application";
import { AuthResponseDto, LoginDto, LoginResponseDto } from "../dtos";
import { AuthRepositoryPort } from "../ports";
import { AuthMapper } from "../mappers";

export class AuthUseCase {
    constructor(
        private readonly repository: AuthRepositoryPort,
        private readonly findUserUseCase: FindUserUseCase,
        private readonly exceptionHandlerPort: ExceptionHandlerPort
    ) { }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        try {
            const responseFind = await this.findUserUseCase.findByEmail(dto.email);
            if (!responseFind) {
                throw new Error("Ha olvidada la contraseña o no está disponible.");
            }
            const token = await this.repository.login({ id: responseFind.id, email: responseFind.email });
            return AuthMapper.toDto(responseFind, token)
        } catch (error) {
            return this.exceptionHandlerPort.handle(error)
        }
    }

}