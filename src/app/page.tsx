import Link from 'next/link';
import { AdvocateCard } from './AdvocateCard';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants';
import PageLimitSelect from './PageLimitSelect';
import SearchForm from './SearchForm';
import { advocateService } from './services/advocateService';
import { Advocate } from './types/advocate';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt(searchParams.page as string) || DEFAULT_PAGE;
  const limit = parseInt(searchParams.limit as string) || DEFAULT_LIMIT;
  const search = (searchParams.search as string) || '';

  const { data, rows } = await advocateService.getAdvocates({
    page,
    limit,
    search,
  });

  return (
    <main className='w-full'>
      <header>
        <h2 className='h-12 bg-primary font-extrabold text-white flex justify-center items-center'>
          Solace Advocate Finder
        </h2>
      </header>
      <SearchForm />
      <section aria-label='Advocates List'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-slate-50'>
          {data.map((advocate: Advocate) => (
            <AdvocateCard key={advocate.id} advocate={advocate} />
          ))}
        </div>
      </section>
      <footer className='py-6 px-4'>
        <div className='flex flex-col items-center'>
          <div className='flex space-x-2 items-center mb-6 w-[15.25rem]'>
            {page > 1 && (
              <Link
                href={`?page=${page - 1}&limit=${limit}${
                  search ? `&search=${search}` : ''
                }`}
                className='px-4 py-2 bg-primary text-white rounded-md hover:bg-buttonHover'
              >
                Prev
              </Link>
            )}

            <span className='px-6 py-2 text-gray-700 text-center flex-grow whitespace-nowrap'>
              Page {page}
            </span>

            {page * limit < rows && (
              <Link
                href={`?page=${page + 1}&limit=${limit}${
                  search ? `&search=${search}` : ''
                }`}
                className='px-4 py-2 bg-primary text-white rounded-md hover:bg-buttonHover'
              >
                Next
              </Link>
            )}
          </div>
          <PageLimitSelect />
        </div>
      </footer>
    </main>
  );
}
