import { useEffect, useLayoutEffect, useState } from 'react';
import { CategoryName, Product } from '../helpers/types';
import { getProducts } from '../helpers/apiCalls';
import { ProductCard } from './ProductCard';
import { useSearchParams } from 'react-router-dom';

type IProps = {
  category: CategoryName;
  setCategory: (category: CategoryName) => void;
};

export function Store({ category, setCategory }: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryButtons = [
    { name: 'suits', icon: 'src/assets/icons/suit.png' },
    { name: 'shirts', icon: 'src/assets/icons/shirt.png' },
    { name: 'pants', icon: 'src/assets/icons/trousers.png' },
    { name: 'blazers', icon: 'src/assets/icons/blazer.png' },
    { name: 'ties', icon: 'src/assets/icons/tie.png' },
  ];

  useEffect(() => {
    getProducts().then((res) => {
      if (category) {
        setProducts(res.filter((product: Product) => product.category === category));
        return;
      }
      // setSearchParams({});
      setProducts(res);
      return;
    });
  }, [category]);

  useLayoutEffect(() => {
    if (searchParams.has('category')) {
      const newUrlCategory = searchParams.get('category') as CategoryName;
      setCategory(newUrlCategory);
      return;
    } else {
      setCategory('');
    }
  }, []);

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === '' || newCategory === category) {
      setCategory('');
      setSearchParams({});
      return;
    }
    setCategory(newCategory as CategoryName);
    setSearchParams({ category: newCategory });
  };

  return (
    <div className=''>
      <div className='p-4 flex justify-center items-center gap-4 bg-white'>
        {categoryButtons.map(({ name, icon }) => (
          <div key={name} className='flex flex-col justify-center items-center'>
            <button
              onClick={() => handleCategoryChange(category === name ? '' : (name as CategoryName))}
              className={`text-xl transition-all flex flex-col justify-center items-center bg-gray-100 p-2 rounded-lg hover:bg-gray-200 ${
                category === name && 'bg-gray-200'
              }`}>
              <img className='h-7 w-7' src={icon} alt={name} />
            </button>
            <div className='w-auto h-auto bg-contain bg-no-repeat bg-center rounded-full transition-all'>
              {name}
            </div>
          </div>
        ))}
      </div>
      <div className=''>
        <div className='mt-2 px-2 '>
          <p className='uppercase text-xl font-semibold'>
            Viewing {category ? category : 'all products'}
          </p>
          <p>Showing {products.length} Results</p>
        </div>
        <div className='grid grid-flow-row grid-cols-2 gap-2 px-2'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
