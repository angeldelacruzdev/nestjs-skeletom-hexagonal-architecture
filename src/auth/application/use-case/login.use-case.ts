import { ExceptionHandlerPort } from "@common/exceptions";
import { FindUserUseCase } from "../../../users/application";
import { LoginDto, LoginResponseDto } from "../dtos";
import { LoginRepositoryPort } from "../ports";

export class LoginUseCase {
    constructor(
        private readonly loginRepositoryPort: LoginRepositoryPort,
        private readonly findUserUseCase: FindUserUseCase,
        private readonly exceptionHandlerPort: ExceptionHandlerPort
    ) { }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        try {
            const responseFind = await this.findUserUseCase.findByEmail(dto.email);
            console.log(responseFind)
            if (!responseFind) {
                throw new Error("Ha olvidada la contraseña o no está disponible.");
            }

            return await this.loginRepositoryPort.login(dto);
        } catch (error) {
            return this.exceptionHandlerPort.handle(error)
        }
    }

}