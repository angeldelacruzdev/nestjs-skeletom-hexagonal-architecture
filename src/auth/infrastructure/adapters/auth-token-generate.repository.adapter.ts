import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthTokenGeneratePort, TokenResponseDto } from '../../application';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

export class AuthTokenGenerateRepositoryAdapter
  implements AuthTokenGeneratePort
{
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async setRefreshTokenToUser(
    rtToken: string,
    userId: string,
  ): Promise<boolean | null> {
    try {
      const saltOrRounds = 10;
      const rtTokenHash = rtToken;
      const hash = await bcrypt.hash(rtTokenHash, saltOrRounds);

      const updated = await this.userRepository
        .createQueryBuilder()
        .update()
        .set({
          rt_hash: hash,
        })
        .where('id = :id', { id: userId })
        .execute();

      if (!updated) {
        return null;
      }

      return true;
    } catch (error) {
      this.logger.error(error);
      return this.exceptionHandler.handle(error);
    }
  }

  async token(id: string, email: string): Promise<TokenResponseDto> {
    try {
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: id,
            email: email,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '24h',
          },
        ),
        this.jwtService.signAsync(
          {
            sub: id,
            email,
          },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d',
          },
        ),
      ]);

      return {
        access_token: at,
        refresh_token: rt,
      };
    } catch (error) {
      return this.exceptionHandler.handle(error);
    }
  }
}
