import { Body, Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { CreateRolesDocDto } from './dtos';
import { CreateRolesUseCase, FindRolesUseCase } from '../application/use-case';
import { Pagination } from '../../common';
import { PaginationDocDto } from '../../utils/dto/pagination-doc.dto';

@Controller({
  path: 'v1/roles',
  version: VERSION_NEUTRAL,
})
export class RolesController {
  constructor(
    private readonly createRolesUseCase: CreateRolesUseCase,
    private readonly findRolesUseCase: FindRolesUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateRolesDocDto): Promise<any> {
    return await this.createRolesUseCase.create(body);
  }

  @Get()
  async findMany(@Pagination() pagination: PaginationDocDto) {
    return await this.findRolesUseCase.findMany(pagination);
  }
}
