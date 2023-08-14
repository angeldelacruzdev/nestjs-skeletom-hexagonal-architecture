import { LoginDto, LoginResponseDto } from "../dtos";
import { LoginRepositoryPort } from "../ports";

export class LoginUseCase {
    constructor(private readonly loginRepositoryPort: LoginRepositoryPort) { }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        console.log(dto)
        return await this.loginRepositoryPort.login(dto);
    }

}