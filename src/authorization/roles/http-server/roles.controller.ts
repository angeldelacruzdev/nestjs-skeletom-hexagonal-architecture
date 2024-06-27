import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreateRolesDocDto, RolesReponseDocDto } from './dtos';

import {
  AssignPermissionsToRoleUseCase,
  CreateRolesUseCase,
  FindRolesUseCase,
  RolesResponseDto,
} from '../application';
import { PaginationDocDto } from '../../../utils/dto/pagination-doc.dto';
import { PaginationResponseDto } from '../../../utils';
import { Pagination } from '../../../common';

@Controller({
  path: 'v1/roles',
  version: VERSION_NEUTRAL,
})
export class RolesController {
  constructor(
    private readonly createRolesUseCase: CreateRolesUseCase,
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly assignPermissionsToRoleUseCase: AssignPermissionsToRoleUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateRolesDocDto): Promise<RolesReponseDocDto> {
    return await this.createRolesUseCase.create(body);
  }

  @Get()
  async findMany(
    @Pagination() pagination: PaginationDocDto,
  ): Promise<PaginationResponseDto<RolesResponseDto>> {
    return await this.findRolesUseCase.findMany(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RolesReponseDocDto> {
    return await this.findRolesUseCase.findOne(id);
  }
}
