import { Advocate } from '../types/advocate';

type GetAdvocatesOptions = {
  page: number;
  limit: number;
  search?: string;
};
/**
 * Service for fetching advocate data from the API.  In a real-world
 * application, this would likely be a more complex service with
 * additional methods for creating, updating, and deleting advocates.
 */
export const advocateService = {
  /**
   * Fetches all advocates from the API
   * @returns Promise resolving to an array of Advocate objects
   */
  async getAdvocates({
    page,
    limit,
    search,
  }: GetAdvocatesOptions): Promise<{ data: Advocate[]; rows: number }> {
    try {
      const response = await fetch(
        `http://localhost:3000/api/advocates?page=${page}&limit=${limit}${
          search ? `&search=${search}` : ''
        }`,
        {
          next: { revalidate: 60 },
        },
      );

      if (!response.ok) {
        throw new Error(`${response.status} - ${await response.text()}`);
      }

      return await response.json();
    } catch (error) {
      //log to observability or monitoring service, such as DataDog, Sentry, etc.
      throw new Error(
        `Failed to fetch advocates` +
          (error instanceof Error ? `: ${error.message}` : ''),
      );
    }
  },
};
