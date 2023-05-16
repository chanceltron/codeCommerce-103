import { useCheckout } from '../hooks/hooks';

export const Summary = () => {
  const { totalQuantity, subtotal, discount, shipping, totalPrice } = useCheckout();
  return (
    <div className='px-3 py-2 text-lg'>
      <div className='py-3 flex justify-between border-b border-white'>
        <p className='font-semibold'>Subtotal</p>
        <p className='text-xl font-bold'>${subtotal.toFixed(2)}</p>
      </div>
      <div className='py-3 flex justify-between border-b border-white'>
        <p className='font-semibold'>Discount</p>
        <p className='text-xl font-bold text-green-500'>${discount.toFixed(2)}</p>
      </div>
      <div className='py-3 flex justify-between border-b border-white'>
        <p className='font-semibold'>Shipping</p>
        <p className='text-xl font-bold'>${shipping.toFixed(2)}</p>
      </div>
      <div className='py-3 flex justify-between border-b border-white'>
        <p className='font-semibold'>Cart Total</p>
        <div className='flex items-center gap-3'>
          <p className='text-base'>{`(${totalQuantity} item${totalQuantity > 1 ? 's' : ''})`}</p>
          <p className='text-xl font-bold'>${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};
