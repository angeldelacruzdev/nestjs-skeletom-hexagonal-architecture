
import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from '../../common';
import { LoginUseCase } from '../../auth/application';
import { LoginHttpDto } from './dto/login-http.dto';

@Controller({
    path: 'v1/auth',
    version: VERSION_NEUTRAL,
})
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }


    @Public()
    @Post()
    async login(@Body() dto: LoginHttpDto) {
        return await this.loginUseCase.login(dto)
    }
}