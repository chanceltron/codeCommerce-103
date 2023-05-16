import { Product } from '../helpers/types';

type IProps = {
  item: Product;
  formStep: number;
  changeQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

export function ItemCard({
  item,
  formStep,
  removeFromCart,
  changeQuantity,
}: IProps) {
  const { id, name, price, image, category, quantity } = item;
  const hidden = formStep > 1 ? 'hidden' : '';
  const column = formStep > 1 ? 'flex-col' : 'flex-row';
  return (
    <div className='my-3 flex flex-col lg:flex-row'>
      <div className={`flex flex-col lg:${column} lg:flex-[4]`}>
        <img
          src={image}
          alt={name}
          className='rounded-md w-fit object-cover h-fit mr-3 lg:max-w-[200px]'
        />
        <div>
          <h3 className='font-medium'>{name}</h3>
        </div>
      </div>
      <div className='flex justify-between w-full pr-6 md:flex-[2] lg:items-start'>
        <p className={`text-xl ${hidden}`}>{price}</p>
        <div className='flex justify-center items-center'>
          <button
            className={`mx-4 text-lg transition-all w-fit h-fit hover:text-red-500 ${hidden}`}
            onClick={() => removeFromCart(id)}>
            <i className='fa-regular fa-trash-can'></i>
          </button>
          <select
            name='qty'
            id='qty'
            placeholder='Qty'
            value={quantity}
            className={`text-xl p-1 outline outline-1 outline-gray-300 rounded ${hidden}`}
            // readOnly={formStep > 1}
            onChange={({ target: { value } }) => {
              changeQuantity(id, +value);
            }}>
            {[...Array(5).keys()].map((i) => (
              <option value={i + 1}>i</option>
            ))}
          </select>
        </div>
        <p className='text-xl font-normal'>{+price * quantity}</p>
      </div>
    </div>
  );
}
