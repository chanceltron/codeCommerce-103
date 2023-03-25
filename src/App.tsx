import { useEffect, useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

export function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <div className='App font-raleway text-code-gray-700 m-0 p-0'>
      <div className='flex flex-col h-screen'>
        <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />
        <Hero navbarHeight={navbarHeight} />
      </div>
    </div>
  );
}
