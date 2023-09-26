import {
  Body,
  Controller,
  Post,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
  RtGuard,
} from '../../common';
import { AuthUseCase, RegisterDto } from '../../auth/application';
import { LoginHttpDto } from './dto/login-http.dto';
import { AuthResponseHttpDto } from './dto/auth-response.dto';
import { HttpMapper } from './mappers';
import { RegisterUseCase } from './../../auth/application/use-case/register.use-case';

@Controller({
  path: 'v1/auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginHttpDto): Promise<AuthResponseHttpDto> {
    return await this.authUseCase.login(dto);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AuthResponseHttpDto> {
    return await this.registerUseCase.register(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ): Promise<AuthResponseHttpDto> {
    return await this.authUseCase.refreshToken(
      HttpMapper.toDto(refreshToken, `${userId}`),
    );
  }
}
