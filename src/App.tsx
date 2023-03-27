import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { useState } from 'react';
import { Category, FilterCategory, Screen } from './helpers/types';
import { Store } from './components/Store';

export function App() {
  const [screen, setScreen] = useState('store' as Screen);
  const [category, setCategory] = useState<FilterCategory>('');

  return (
    <div className='App font-raleway bg-code-olive-primary text-code-gray-700'>
      <Navbar />
      {screen === 'home' && (
        <>
          <div className='flex flex-col h-screen'>
            <Hero />
          </div>
          <Collections
            setScreen={() => setScreen('store')}
            setCategory={setCategory}
          />
        </>
      )}
      {screen === 'store' && (
        <>
          <Store category={category} setCategory={setCategory} />
        </>
      )}
    </div>
  );
}
