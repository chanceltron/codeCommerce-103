import { useState } from 'react';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { Store } from './components/Store';
import { CategoryName } from './helpers/types';
import { Nav } from './components/Nav';
import { useCurrentPage } from './hooks/hooks';
import { Drawer } from './components/Drawer';
import { Checkout } from './components/Checkout';
import { CheckoutProvider } from './context/CheckoutContext';

export function App() {
  const [category, setCategory] = useState<CategoryName>('');
  const { currentPage } = useCurrentPage();
  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState<boolean>(false);

  return (
    <div className='App font-fira bg-[#EBEAEF] text-code-gray-700'>
      <div className='relative z-50'>
        <Nav setCartDrawerIsOpen={setCartDrawerIsOpen} />
      </div>
      <div className='pb-24'>
        {currentPage === 'home' && (
          <>
            <div className='flex flex-col'>
              <Hero />
            </div>
            <Collections setCategory={setCategory} />
          </>
        )}
        {currentPage === 'store' && <Store category={category} setCategory={setCategory} />}
      </div>
      {cartDrawerIsOpen && (
        <Drawer
          drawerIsOpen={cartDrawerIsOpen}
          setDrawerIsOpen={setCartDrawerIsOpen}
          title={'Shopping Cart'}>
          <CheckoutProvider>
            <Checkout setDrawerIsOpen={setCartDrawerIsOpen} />
          </CheckoutProvider>
        </Drawer>
      )}
    </div>
  );
}
