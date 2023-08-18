
import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from '../../common';
import { AuthUseCase } from '../../auth/application';
import { LoginHttpDto } from './dto/login-http.dto';
import { AuthResponseHttpDto } from './dto/auth-response.dto';

@Controller({
    path: 'v1/auth',
    version: VERSION_NEUTRAL,
})
export class AuthController {
    constructor(private readonly authUseCase: AuthUseCase) { }

    @Public()
    @Post()
    async login(@Body() dto: LoginHttpDto): Promise<AuthResponseHttpDto> {
        return await this.authUseCase.login(dto)
    }
}