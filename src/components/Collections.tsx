import { Dispatch, useEffect, useState } from 'react';
import { getCategories } from '../helpers/apiCalls';
import { Category, CategoryName, ScreenName } from '../helpers/types';
import { useCurrentPage } from '../hooks/hooks';

type IProps = {
  setCategory: (category: CategoryName) => void;
};

export function Collections({ setCategory }: IProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setCurrentPage } = useCurrentPage();

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <section id='collections'>
      <h2 className='text-4xl font-semibold font-playfair text-center my-12 md:text-left md:ml-24'>
        Explore Collections
      </h2>
      <div className='flex flex-wrap justify-center'>
        {categories.map(({ id, name, image }) => (
          <div
            key={id}
            className='relative group max-w-md shadow-md w-full sm:mb-4 sm:mt-6 sm:mx-4 sm:w-[45%]'>
            <div
              className='group bg-cover h-80 sm:rounded-md transition-all sm:group-hover:opacity-60'
              style={{ backgroundImage: `url(${image})` }}>
              <div className='flex items-end justify-center py-4 bg-black bg-opacity-50 sm:rounded-t-md'>
                <h2 className='text-4xl font-semibold text-white'>{name}</h2>
              </div>
            </div>
            <button
              onClick={() => {
                setCategory(name.toLowerCase() as CategoryName);
                setCurrentPage('store');
              }}
              className='absolute px-4 py-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white bg-code-gray-800 transition-all opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'>
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
