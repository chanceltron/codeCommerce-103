// TODO - See if hamburger menu can be cleaned up
// TODO - Add modal links for each of the navbar items
// TODO - Add logic for showing user's name when signed in
// TODO - Add badge to cart to show the number of items

import { useEffect, useRef, useState } from 'react';

export function Navbar({ setNavbarHeight }: any) {
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const hamburgerLines = [
    {
      class: hamburgerOpen
        ? 'rotate-45 translate-y-3 group-hover:opacity-100'
        : 'group-hover:opacity-100',
    },
    {
      class: hamburgerOpen ? 'opacity-0' : 'group-hover:opacity-100',
    },
    {
      class: hamburgerOpen
        ? '-rotate-45 -translate-y-3 group-hover:opacity-100'
        : 'group-hover:opacity-100',
    },
  ];

  const menuList = [
    { name: 'signup', label: 'sign up' },
    { name: 'signin', label: 'sign in' },
    { name: 'cart', label: 'cart' },
  ];

  return (
    <nav
      ref={navbarRef}
      className='relative bg-code-olive-primary px-2 py-3  flex justify-between items-center'>
      <a href='/' className='text-3xl font-playfair font-semibold'>
        CODE COMMERCE
      </a>
      <button
        onClick={() => setHamburgerOpen(!hamburgerOpen)}
        className='pr-3 h-12 w-12 flex flex-col justify-center items-center group sm:hidden'>
        {hamburgerLines.map((line, i) => (
          <div
            key={i}
            className={`h-1 w-8 my-1 rounded-full bg-code-gray-700 transition ease transform duration-300 ${line.class}`}
          />
        ))}
      </button>
      <ul
        className={`absolute -z-10 top-full left-0 w-full bg-white transition-all ${
          !hamburgerOpen && '-translate-y-full'
        } sm:flex sm:w-fit sm:justify-center sm:items-center sm:-translate-y-0 sm:static sm:bg-transparent sm:z-0`}>
        {menuList.map((li) => (
          <a
            key={li.name}
            onClick={() => alert('link clicked!')}
            className='cursor-pointer'>
            <li className='p-3 w-full text-right border-t border-t-code-olive-primary transition-all hover:bg-code-olive-primary sm:border-0 sm:w-fit sm:hover:bg-transparent sm:hover:text-code-olive-400'>
              {li.label}
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
}
