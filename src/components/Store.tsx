import { useEffect, useState } from 'react';
import { FilterCategory, Product } from '../helpers/types';
import { getProducts } from '../helpers/apiCalls';

type IProps = {
  category: FilterCategory;
  setCategory: (category: FilterCategory) => void;
};

export function Store({ category, setCategory }: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('');

  const categoryButtons = [
    { name: 'suits', label: 'Suits' },
    { name: 'blazers', label: 'Blazers' },
    { name: 'shirts', label: 'Shirts' },
    { name: 'pants', label: 'Pants' },
    { name: 'ties', label: 'Ties' },
  ];

  useEffect(() => {
    getProducts().then((res) => {
      if (category) {
        return setProducts(
          res.filter((product: Product) => product.category === category)
        );
      }
      return setProducts(res);
    });
  }, [category]);

  return (
    <div className=''>
      <div className='pt-24 flex justify-evenly sm:pt-20 sm:pl-4 sm:justify-start sm:gap-4'>
        {categoryButtons.map(({ name, label }) => (
          <button
            key={name}
            onClick={() => setCategory(category === name ? '' : name)}
            className={`${
              category === name ? 'bg-code-gray-500' : 'bg-code-gray-200'
            } px-3 py-1 font-raleway font-normal text-lg text-white rounded-3xl transition-all hover:bg-code-gray-500`}>
            {label}
          </button>
        ))}
      </div>
      <div className=''>
        <div className='mt-8 flex flex-wrap justify-center gap-6'>
          {products.map(({ id, name, image, price }) => (
            <div key={id} className='mx-2 bg-white rounded-md w-full'>
              <div
                className='group bg-cover bg-no-repeat bg-center h-64 rounded-t-md transition-all sm:w-72 sm:group-hover:opacity-60'
                style={{ backgroundImage: `url(${image})` }}></div>
              <div className='flex justify-center'>
                <h2 className='text-lg font-semibold'>{name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
