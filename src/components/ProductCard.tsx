import { Product } from '../helpers/types';

export function ProductCard({
  product: { id, name, category, image, price, assets },
}: {
  product: Product;
}) {
  return (
    <div className='mx-2 bg-white rounded-md w-full transition-all hover:scale-110 sm:max-w-sm'>
      <div
        className='group bg-cover bg-no-repeat bg-center h-64 rounded-t-md transition-all sm:group-hover:opacity-60'
        style={{
          backgroundImage: `url(${image})`,
        }}></div>
      <div className='flex flex-col pl-2 py-2'>
        <h2 className='text-lg'>{name}</h2>
        <p className='text-2xl font-bold'>{price}</p>
      </div>
    </div>
  );
}
