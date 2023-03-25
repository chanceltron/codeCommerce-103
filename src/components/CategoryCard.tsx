import { Category } from '../helpers/types';

type IProps = { category: Category };

export function CategoryCard({ category: { id, name, image } }: IProps) {
  return (
    <div className='relative group max-w-md shadow-md w-full sm:mb-4 sm:mt-6 sm:mx-4 sm:w-[45%]'>
      <div
        className='group bg-cover bg-center h-80 sm:rounded-md transition-all sm:group-hover:opacity-60'
        style={{ backgroundImage: `url(${image})` }}>
        <div className='flex items-end justify-center py-4 bg-black bg-opacity-50 sm:rounded-t-md'>
          <h2 className='text-4xl font-semibold text-white'>{name}</h2>
        </div>
      </div>
      <button
        onClick={() => alert(name + ' button clicked')}
        className='absolute px-4 py-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white bg-code-gray-800 transition-all opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'>
        Shop Now
      </button>
    </div>
  );
}
