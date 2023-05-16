import { useEffect, useState } from 'react';
import { Product } from '../helpers/types';
import { useCart } from '../hooks/hooks';
import { Drawer } from './Drawer';

export function ProductCard({ product }: { product: Product }) {
  const { id, name, description, category, image, price, assets } = product;
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(image);
  const { addItem } = useCart();

  useEffect(() => {
    if (drawerIsOpen) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [drawerIsOpen]);

  return (
    <>
      <div className='relative mb-2 cursor-pointer transform transition-all shadow-md bg-white rounded-lg'>
        <a onClick={() => setDrawerIsOpen(true)}>
          <div
            className='bg-cover bg-no-repeat h-40 transition-all duration-300 ease-out'
            style={{
              backgroundImage: `url(${image})`,
            }}></div>
          <div className='flex flex-col p-1.5 py-1 justify-between h-28'>
            <div>
              <p className='capitalize text-gray-400'>{category}</p>
              <h2 className='text-md font-semibold'>{name}</h2>
            </div>
            <div className='flex justify-between items-end'>
              <p className='text-xl font-bold text-black'>{price}</p>
            </div>
          </div>
        </a>
        <button
          className='absolute bottom-1 right-1 flex justify-center items-center p-1.5 rounded-full shadow-md border border-black text-md hover:bg-black hover:text-white transition-all'
          onClick={() => addItem(product)}>
          <i className='fa-solid fa-plus'></i>
        </button>
      </div>

      {drawerIsOpen && (
        <Drawer drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen}>
          <div className={`relative w-full h-full flex flex-col justify-between`}>
            <div className='overflow-y-scroll p-2 pb-12'>
              <div className=' relative flex flex-col justify-between items-start w-full'>
                <div
                  className='w-full bg-cover bg-no-repeat bg-center h-[45vh] shadow-md rounded-lg transition-all'
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                  }}></div>
                <div className='absolute top-1 left-1 flex flex-col flex-wrap gap-1 justify-between align-middle w-fit mt-1'>
                  {assets.map((asset) => (
                    <img
                      key={asset.id}
                      src={asset.url}
                      alt={asset.filename}
                      className={`h-14 w-14 rounded-lg object-cover cursor-pointer transition-all hover:opacity-100 ${
                        asset.url === selectedImage ? 'opacity-100' : 'opacity-50'
                      }`}
                      onClick={() => setSelectedImage(asset.url)}
                    />
                  ))}
                </div>
              </div>
              <div className={`p-2 text-lg`}>
                <h2 className='text-2xl font-bold my-4'>{name}</h2>
                <div>Rating</div>
              </div>
              <div className='px-2'>
                <h3 className='font-semibold'>Description</h3>
                <p className='leading-tight text-code-gray-600 font-normal'>{description}</p>
              </div>
            </div>
            <div className='fixed bottom-0 left-0 bg-white rounded-t-3xl px-3 pt-5 pb-8 w-full flex justify-between mt-4 shadow-top-xl'>
              <div className='flex flex-col justify-center items-start text-2xl'>
                <p className='text-code-gray-300 text-lg'>Price</p>
                <p className='font-bold text-black'>{price}</p>
              </div>
              <button
                className='bg-black px-8 font-normal text-md text-white rounded-full transition-all hover:bg-[#393C56]'
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}>
                Add to Cart
              </button>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
}
