import { useCart } from '../hooks/hooks';

export const CartButton = () => {
  const { totalQuantity } = useCart();
  return (
    <button onClick={() => console.log('Cart was clicked')}>
      <i className='relative fa-solid fa-cart-shopping p-1 text-xl bg-white rounded-lg px-2 py-1'>
        {totalQuantity > 0 && (
          <div className='absolute -top-2 -right-2 w-4 h-4 rounded-md bg-black flex justify-center items-center'>
            <p className='font-semibold text-[0.55rem] text-white'>{totalQuantity}</p>
          </div>
        )}
      </i>
    </button>
  );
};
