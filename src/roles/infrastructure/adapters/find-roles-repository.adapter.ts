import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import {
  LoggerPort,
  PaginationDto,
  PaginationResponseDto,
  TOKEN_LOGGER_PORT,
} from '../../../utils';
import { FindRolesRepositoryPort, RolesReponseDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';
import { RolesMapper } from '../mappers';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from '../../../common';
import { Inject } from '@nestjs/common';
export class FindRolesRepositoryAdapter implements FindRolesRepositoryPort {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(EXCEPTION_HANDLER_PORT)
    private readonly exceptionHandler: ExceptionHandlerPort,
    @Inject(TOKEN_LOGGER_PORT)
    private readonly logger: LoggerPort,
  ) {}

  async findOne(id: number): Promise<RolesReponseDto | null> {
    try {
      const response = await this.roleRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });
      return RolesMapper.toDto(response);
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }

  async findMany({
    limit = 10,
    page = 1,
    search = '',
    sort = 'id',
  }: PaginationDto): Promise<PaginationResponseDto<RolesReponseDto>> {
    try {
      const options: FindManyOptions<Role> = {
        where: {
          ...(search && { name: ILike(`%${search}%`) }),
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          [sort]: 'ASC', // Puedes cambiar a 'DESC' si se desea orden descendente
        },
        relations: ['permissions'],
      };
      const [result, total] = await this.roleRepository.findAndCount(options);
      const resultDto = result.map(RolesMapper.toDto);
      const response: PaginationResponseDto<RolesReponseDto> = {
        data: resultDto,
        page,
        limit,
        total,
      };
      return response;
    } catch (e) {
      this.logger.error(e);
      return this.exceptionHandler.handle(e);
    }
  }
}
