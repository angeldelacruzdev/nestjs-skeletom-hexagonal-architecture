import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../../utils';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const paginationStructure: PaginationDto = {
      page: +request.query?.page,
      limit: +request.query?.limit,
      search: request.query?.search ? request.query?.search : '',
      sort: request.query?.sort ? request.query?.sort : 'id',
    };
    return paginationStructure;
  },
);
