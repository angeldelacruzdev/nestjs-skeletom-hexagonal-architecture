import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { TOKEN_LOGGER_PORT, LoggerPort } from '../../../utils';
import { DeletePermissionsRepositoryPort } from '../../application';
import { Permission } from '../../domain/permission.entity';

export class DeletePermissionsRepositoryAdapter
  implements DeletePermissionsRepositoryPort
{
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async delete(id: string): Promise<boolean | null> {
    try {
      const response = await this.permissionsRepository.delete(id);
      if (response.affected === 1) {
        return true;
      }
      return false;
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
