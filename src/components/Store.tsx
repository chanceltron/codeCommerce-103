import { useEffect, useState } from 'react';
import { FilterCategory, Product } from '../helpers/types';
import { getProducts } from '../helpers/apiCalls';

type IProps = {
  category: FilterCategory;
  setCategory: (category: FilterCategory) => void;
};

export function Store({ category, setCategory }: IProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const buttonBg = 'bg-code-gray-500';

  const categoryButtons = [
    { name: 'suits', label: 'Suits' },
    { name: 'blazers', label: 'Blazers' },
    { name: 'shirts', label: 'Shirts' },
    { name: 'pants', label: 'Pants' },
    { name: 'ties', label: 'Ties' },
  ];

  useEffect(() => {
    getProducts().then((res) =>
      setProducts(res.filter((p: any) => p.category === category))
    );
  }, [category]);

  return (
    <div className=''>
      <div className='pt-24 flex justify-evenly sm:pt-20 sm:pl-4 sm:justify-start sm:gap-4'>
        {categoryButtons.map(({ name, label }) => (
          <button
            key={name}
            onClick={() => setCategory(name)}
            className='px-3 py-1 font-raleway font-normal text-lg text-white bg-code-gray-200 rounded-3xl transition-all hover:bg-code-gray-500'>
            {label}
          </button>
        ))}
      </div>
      <div className=''></div>
    </div>
  );
}
