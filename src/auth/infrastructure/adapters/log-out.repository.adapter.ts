import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogOutPort } from '../../application';
import { User } from '../../../users/domain/entities/user.entity';

import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';

export class LogOutRepositoryAdapter implements LogOutPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async logOut(userId: string): Promise<boolean> {
    try {
      const updated = await this.userRepository
        .createQueryBuilder()
        .update()
        .set({ rt_hash: '' })
        .where('id =:id', { id: userId })
        .execute();

      if (!updated) {
        return false;
      }

      return true;
    } catch (error) {
      this.logger.log(error);
      return this.exceptionHandler.handle(error);
    }
  }
}
