import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { PaginationDto, PaginationResponseDto } from '../../../utils';
import { FindRolesRepositoryPort, RolesReponseDto } from '../../application';
import { Role } from '../../domain/entities/roles.entity';
import { RolesMapper } from '../mappers';
export class FindRolesRepositoryAdapter implements FindRolesRepositoryPort {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findMany({
    limit,
    page,
    search,
    sort,
  }: PaginationDto): Promise<PaginationResponseDto<RolesReponseDto>> {
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
    console.log(result)
    const resultDto = result.map(RolesMapper.toDto);
    const response: PaginationResponseDto<RolesReponseDto> = {
      data: resultDto,
      page,
      limit,
      total,
    };
    return response;
  }
}
