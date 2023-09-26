export class PaginationDto {
  page: number;
  limit: number;
  search: string;
  sort: string;

  constructor(page = 1, limit = 10, search = '', sort = 'ASC') {
    this.page = page;
    this.limit = limit;
    this.search = search;
    this.sort = sort;
  }
}
