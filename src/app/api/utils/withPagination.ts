import { SQL } from 'drizzle-orm';
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../constants';

interface PaginationParams<T extends PgSelect> {
  qb: T;
  orderByColumn: PgColumn | SQL | SQL.Aliased;
  page?: number;
  limit?: number;
}

/**
 * Adds pagination to a query builder for PostgreSQL using drizzle-orm.
 * @param qb - The query builder to apply pagination to.
 * @param orderByColumn - The column to order the results by.
 * @param page - The current page number (default is 1).
 * @param limit - The number of records per page (default is 10).
 * @returns The modified query builder with pagination applied.
 */
const withPagination = <T extends PgSelect>({
  qb,
  orderByColumn,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
}: PaginationParams<T>) => {
  return qb
    .orderBy(orderByColumn)
    .limit(limit)
    .offset((page - 1) * limit);
};

export default withPagination;
