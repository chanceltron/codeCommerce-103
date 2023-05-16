import { useEffect } from 'react';
import { CartButton } from './CartButton';

export const Drawer = ({ drawerIsOpen, setDrawerIsOpen, title, children }: any) => {
  useEffect(() => {
    // Prevent scrolling when drawer is open
    if (drawerIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerIsOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full shadow-lg transform transition-transform duration-300 ${
        drawerIsOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <div
        className='absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50'
        onClick={() => setDrawerIsOpen(false)}></div>
      <div className='relative z-10 h-full overflow-y-auto bg-[#ebeaef]'>
        <div className='fixed top-0 left-0 right-0 flex justify-between items-center font-bold text-xl px-7 py-4 z-50'>
          <button onClick={() => setDrawerIsOpen(false)}>
            <i className='fa-solid fa-chevron-left'></i>
          </button>
          <h1>{title}</h1>
          <CartButton />
        </div>
        <div className='pt-16 pb-20 h-full'>{children}</div>
      </div>
    </div>
  );
};
