export type Page<T> = {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: false;
  hasNextPage: true;
  prevPage?: number;
  nextPage?: number;
}
