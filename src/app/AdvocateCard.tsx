import { Advocate } from './types/advocate';

interface IAdvocateCardProps {
  advocate: Advocate;
}

export const AdvocateCard = ({ advocate }: IAdvocateCardProps) => (
  <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow'>
    <h2 className='text-xl font-bold text-primary mb-2'>
      {advocate.firstName} {advocate.lastName}
    </h2>
    <div className='text-gray-600 mb-4'>
      <p className='mb-1'>
        <span className='font-semibold'>Location:</span> {advocate.city}
      </p>
      <p className='mb-1'>
        <span className='font-semibold'>Degree:</span> {advocate.degree}
      </p>
      <p className='mb-1'>
        <span className='font-semibold'>Experience:</span>{' '}
        {advocate.yearsOfExperience} years
      </p>
      <p className='mb-1'>
        <span className='font-semibold'>Phone:</span> {advocate.phoneNumber}
      </p>
    </div>
    <div>
      <h3 className='font-semibold mb-1'>Specialties:</h3>
      <div className='flex flex-wrap gap-1'>
        {advocate.specialties.map((specialty, index) => (
          <span
            key={index}
            className='bg-secondary text-primary text-xs px-2 py-1 rounded-full text-center'
          >
            {specialty}
          </span>
        ))}
      </div>
    </div>
  </div>
);
