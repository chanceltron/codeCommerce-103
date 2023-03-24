import { useEffect, useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

export function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <div className='App h-screen font-raleway text-code-gray-700'>
      <Navbar navbarHeight={navbarHeight} setNavbarHeight={setNavbarHeight} />
      <Hero navbarHeight={navbarHeight} />
    </div>
  );
}
