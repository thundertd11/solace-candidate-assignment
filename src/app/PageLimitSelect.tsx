'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const SELECT_OPTIONS = [5, 10, 25];

const PageLimitSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLimit = searchParams.get('limit') || '10';

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    // Update limit parameter
    params.set('limit', newLimit);

    // Reset to page 1 when changing limit
    params.set('page', '1');

    // Navigate to new URL with updated parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='flex items-center space-x-2'>
      <label
        htmlFor='limit-select'
        className='text-sm font-medium text-gray-700'
      >
        Items per page:
      </label>
      <select
        id='limit-select'
        value={currentLimit}
        onChange={handleLimitChange}
        className='form-select rounded-md border-gray-300 shadow-sm text-sm'
      >
        {SELECT_OPTIONS.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageLimitSelect;
