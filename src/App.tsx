import { useState } from 'react';
import { Store } from './components/Store';
import { CategoryName } from './helpers/types';
import { Nav } from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

export function App() {
  const [category, setCategory] = useState<CategoryName>('');

  return (
    <div className='App font-fira bg-[#EBEAEF] text-code-gray-700'>
      <div className='relative z-50'>
        <Nav />
      </div>
      <Routes>
        <Route path='/' element={<Home setCategory={setCategory} />} />
        <Route path='/store' element={<Store category={category} setCategory={setCategory} />} />
      </Routes>
    </div>
  );
}
