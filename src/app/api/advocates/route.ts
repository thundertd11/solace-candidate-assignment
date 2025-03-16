import { asc, count, ilike, or, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';
import { advocates } from '../../../db/schema';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../constants';
import { parseIntParam, sanitizeParam, withPagination } from '../utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const pageParam = searchParams.get('page') || String(DEFAULT_PAGE);
    const limitParam = searchParams.get('limit') || String(DEFAULT_LIMIT);
    const searchParam = searchParams.get('search') || '';
    /*  Sanitize all params input to prevent SQL injection.  In a real-world application, 
          you may also want to validate the each more thoroughly, but this is all for times sake.
      */
    const sanitizedPageParam = sanitizeParam(pageParam);
    const sanitizedLimitParam = sanitizeParam(limitParam);
    const sanitizedSearchParam = sanitizeParam(searchParam);
    const isFilteredResult = sanitizedSearchParam !== '';

    const page = parseIntParam(sanitizedPageParam);
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'Invalid page parameter. Must be a positive integer.' },
        { status: 400 },
      );
    }

    const limit = parseIntParam(sanitizedLimitParam);
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        {
          error: 'Invalid limit parameter. Must be a positive integer',
        },
        { status: 400 },
      );
    }
    let query = db.select().from(advocates);
    if (isFilteredResult) {
      const searchTermWithWildcards = `%${sanitizedSearchParam}%`;
      //@ts-ignore - where doesn't like query possibly being typed as never[]
      query = query.where(
        or(
          ilike(advocates.firstName, searchTermWithWildcards),
          ilike(advocates.lastName, searchTermWithWildcards),
          ilike(advocates.city, searchTermWithWildcards),
          ilike(advocates.degree, searchTermWithWildcards),
          sql`CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${searchTermWithWildcards}`,
          sql`${advocates.specialties}::text ILIKE ${searchTermWithWildcards}`,
        ),
      );
    }

    let data;
    try {
      data = await withPagination({
        //@ts-expect-error - TS isn't happy with .$dynamic() but it works.
        qb: query.$dynamic(),
        orderByColumn: asc(advocates.id),
        page,
        limit,
      });
    } catch (error: unknown) {
      //postgres errors will always have a 5 digit code.
      //https://www.postgresql.org/docs/12/errcodes-appendix.html
      if (error instanceof Error && 'code' in error) {
        throw new Error(`Advocate query failed: Error Code - ${error.code}`);
      } else {
        throw new Error(
          `Unknown error occurred while querying advocates: ${error}`,
        );
      }
    }
    let totalAdvocates;
    try {
      totalAdvocates = await db
        //@ts-expect-error - doesn't like count having arguments.
        .select({ count: count(advocates.id) })
        .from(advocates);
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error) {
        throw new Error(
          `Advocate total count query failed: Error Code - ${error.code}`,
        );
      } else {
        throw new Error(
          `Unknown error occurred while querying advocates: ${error}`,
        );
      }
    }

    return NextResponse.json(
      // @ts-ignore - TS isn't seeing count, and expecting advocates return type
      { data, rows: isFilteredResult ? data.length : totalAdvocates[0].count },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Log to observability or monitoring service, such as DataDog, Sentry, etc.
      console.error('Error message:', error.message);
      return NextResponse.json(
        {
          error: `An error occurred while fetching advocates: ${error.message}`,
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred while fetching advocates.' },
        { status: 500 },
      );
    }
  }
}
