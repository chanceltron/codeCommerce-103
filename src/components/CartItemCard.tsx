import { Product } from '../helpers/types';
import { useCart } from '../hooks/hooks';

type IProps = {
  cartItem: Product;
};

export const CartItemCard = ({ cartItem }: IProps) => {
  const { id, name, image, price, quantity } = cartItem;
  const { setQuantity, removeFromCart } = useCart();

  return (
    <div className='flex'>
      <div
        className='bg-cover bg-center bg-no-repeat w-32 h-28 rounded-lg shadow-md '
        style={{
          backgroundImage: `url(${image})`,
        }}></div>
      <div className='flex flex-col w-full pl-2 justify-between'>
        <div className='flex justify-between items-start'>
          <h2 className='text-md font-semibold'>{name}</h2>
          <button
            className='px-2 transition-all hover:text-red-500'
            onClick={() => removeFromCart(id)}>
            <i className='fa-solid fa-xmark'></i>
          </button>
        </div>
        <p>Rating</p>
        <div className='flex justify-between items-center pr-2'>
          <p className='text-xl font-bold text-black'>{price}</p>
          <div className='flex justify-center items-center gap-3'>
            <button
              className='flex justify-center items-center w-7 h-7 text-xs rounded-full border border-black ring-neutral-400 transition-all hover:ring-4'
              onClick={() => setQuantity(id, quantity - 1)}>
              <i className='fa-solid fa-minus'></i>
            </button>
            <p className='text-2xl'>{quantity}</p>
            <button
              className='flex justify-center items-center w-7 h-7 text-xs rounded-full bg-black text-white ring-neutral-400 transition-all hover:ring-4'
              onClick={() => setQuantity(id, quantity + 1)}>
              <i className='fa-solid fa-plus'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
