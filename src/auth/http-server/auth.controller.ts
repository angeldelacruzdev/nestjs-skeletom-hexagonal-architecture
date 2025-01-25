import {
  Body,
  Controller,
  Get,
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
import {
  AuthTokenGenerateUseCase,
  AuthUseCase,
  LogOutUseCase,
} from '../../auth/application';
import { LoginHttpDto } from './dto/login-http.dto';
import { AuthResponseHttpDto } from './dto/auth-response.dto';
import { HttpMapper } from './mappers';
import { RegisterUseCase } from './../../auth/application/use-case/register.use-case';
import { RegisterHttpDto } from './dto/register-http.dto';

@Controller({
  path: 'v1/auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly logOutUseCase: LogOutUseCase,
    private readonly authTokenGenerateUseCase: AuthTokenGenerateUseCase,
  ) {}

  @Public()
  @Post('signin')
  async login(@Body() dto: LoginHttpDto): Promise<AuthResponseHttpDto> {
    return await this.authUseCase.signin(dto);
  }

  @Public()
  @Post('signup')
  async register(@Body() dto: RegisterHttpDto): Promise<AuthResponseHttpDto> {
    dto.status =  true;
    return await this.registerUseCase.register(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: string,
  ): Promise<AuthResponseHttpDto> {
    return await this.authTokenGenerateUseCase.refreshToken(
      HttpMapper.toDto(refreshToken, userId),
    );
  }

  @Get('/logout')
  async logout(@GetCurrentUserId() userId: string) {
    return await this.logOutUseCase.logOut(userId);
  }
}
