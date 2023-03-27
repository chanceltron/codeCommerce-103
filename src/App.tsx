import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { createContext, useContext, useState } from 'react';

type Screen = 'home' | 'store' | 'login' | 'cart';

export function App() {
  return (
    <div className='App font-raleway bg-code-olive-primary text-code-gray-700 m-0 p-0'>
      <div className='flex flex-col h-screen'>
        <Navbar />
        <Hero />
      </div>
      <Collections />
    </div>
  );
}
