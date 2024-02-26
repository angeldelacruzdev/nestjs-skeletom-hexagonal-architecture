import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogOutPort } from '../../application';
import { User } from '../../../users/domain/entities/user.entity';

import { LoggerPort, TOKEN_LOGGER_PORT } from '../../../utils';
import { InternalErrorException } from '../../auth-exceptions';

export class LogOutRepositoryAdapter implements LogOutPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      throw new InternalErrorException();
    }
  }
}
