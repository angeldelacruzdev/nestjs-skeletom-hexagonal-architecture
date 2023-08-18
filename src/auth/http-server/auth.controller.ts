
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public, RtGuard } from '../../common';
import { AuthUseCase } from '../../auth/application';
import { LoginHttpDto } from './dto/login-http.dto';
import { AuthResponseHttpDto } from './dto/auth-response.dto';
import { HttpMapper } from './mappers';

@Controller({
    path: 'v1/auth',
    version: VERSION_NEUTRAL,
})
export class AuthController {
    constructor(private readonly authUseCase: AuthUseCase) { }

    @Public()
    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginHttpDto): Promise<AuthResponseHttpDto> {
        return await this.authUseCase.login(dto)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
        @GetCurrentUser('refreshToken') refreshToken: string,
        @GetCurrentUserId() userId: number,
    ): Promise<AuthResponseHttpDto> {
        return await this.authUseCase.refreshToken(HttpMapper.toDto(refreshToken, userId))
    }

}