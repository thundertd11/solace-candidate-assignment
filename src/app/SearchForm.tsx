'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

const SearchForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const currentSearch = params.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const updatedParams = new URLSearchParams(params.toString());

      if (searchTerm !== '') {
        updatedParams.set('search', searchTerm);
      } else {
        updatedParams.delete('search');
      }

      if (!updatedParams.has('page') || updatedParams.get('page') !== '1') {
        updatedParams.set('page', '1');
      }

      router.push(`?${updatedParams.toString()}`);
    },
    [searchTerm, params, router],
  );

  const handleReset = useCallback(() => {
    setSearchTerm('');

    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.delete('search');

    router.push(`?${updatedParams.toString()}`);
  }, [params, router]);

  return (
    <section aria-label='Search Advocates' className='p-4 bg-gray-100'>
      <form onSubmit={handleSearch}>
        <div className='mb-2'>
          <label htmlFor='search' className='block text-sm font-medium mb-1'>
            Search Advocates
          </label>
          <div className='flex'>
            <input
              id='search'
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search by name, city, specialty...'
              className='flex-grow mr-2 pl-2 border rounded-md'
            />
            <button
              type='submit'
              className='bg-primary hover:bg-buttonHover text-white px-4 py-2 rounded-md'
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {currentSearch && (
        <div className='flex items-center mt-2'>
          <p className='text-sm'>
            Searching for: <span className='font-medium'>{currentSearch}</span>
          </p>
          <button
            onClick={handleReset}
            className='ml-4 text-sm text-blue-500 hover:underline'
          >
            Reset search
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchForm;
