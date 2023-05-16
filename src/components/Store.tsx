import { useEffect, useState } from 'react';
import { CategoryName, Product } from '../helpers/types';
import { getProducts } from '../helpers/apiCalls';
import { ProductCard } from './ProductCard';

type IProps = {
  category: CategoryName;
  setCategory: (category: CategoryName) => void;
};

export function Store({ category, setCategory }: IProps) {
  const [products, setProducts] = useState<Product[]>([]);

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
        return setProducts(res.filter((product: Product) => product.category === category));
      }
      return setProducts(res);
    });
  }, [category]);

  return (
    <div className=''>
      <div className='p-4 flex justify-center items-center gap-4 bg-white'>
        {categoryButtons.map(({ name, icon }) => (
          <div key={name} className='flex flex-col justify-center items-center'>
            <button
              onClick={() => setCategory(category === name ? '' : (name as CategoryName))}
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
        <p className='mt-2 px-2 uppercase text-xl font-semibold'>
          Viewing {category ? category : 'all products'}
        </p>
        <div className='grid grid-flow-row grid-cols-2 gap-2 px-2'>
          {/* <div className=''>Showing {products.length} Results</div> */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
