import { Dispatch, useEffect, useState } from 'react';
import { ModalName, ScreenName, User } from '../helpers/types';
import { useCart, useUsers } from '../hooks/hooks';
import { Modal } from './Modal';
import { Login } from './Login';

type IProps = {
  setPage: Dispatch<ScreenName>;
  setModal: Dispatch<boolean>;
  setModalScreen: Dispatch<ModalName>;
};

export function Navbar({ setPage, setModal, setModalScreen }: IProps) {
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { cart, addItem, increaseQuantity } = useCart();
  const { loggedInUser, logout } = useUsers();

  const hamburgerLines = [
    { class: hamburgerOpen && 'rotate-45 translate-y-3 ' },
    { class: hamburgerOpen && 'opacity-0' },
    { class: hamburgerOpen && '-rotate-45 -translate-y-3' },
  ];

  const menuList = [
    { name: 'welcomeUser', label: `Welcome, ${loggedInUser?.firstName ?? ''}` },
    { name: 'store', label: 'store' },
    { name: 'signup', label: 'sign up' },
    { name: 'login', label: 'sign in' },
    { name: 'cart', label: 'cart', badge: cart && cart.length },
    { name: 'logout', label: 'sign out' },
  ];

  const filteredMenuList = menuList.filter((item) => {
    if (item.name === 'signup' || item.name === 'login') {
      return !isLoggedIn;
    }
    if (item.name === 'welcomeUser' || item.name === 'logout') {
      return isLoggedIn;
    }
    return true;
  });

  useEffect(() => {
    setIsLoggedIn(loggedInUser !== null);
  }, [loggedInUser]);

  return (
    <>
      <nav
        id='navbar'
        className='fixed z-50 justify-between items-center bg-code-olive-primary w-full sm:flex'>
        <div className='relative bg-code-olive-primary z-50 flex justify-between items-center px-2 py-3'>
          <a
            onClick={() => {
              setHamburgerOpen(false);
              setPage('home');
            }}
            className='text-3xl font-playfair font-semibold cursor-pointer'>
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
        </div>
        <ul
          className={`absolute z-10 top-full left-0 w-full bg-white transition-all ${
            !hamburgerOpen ? '-translate-y-full' : 'shadow-md'
          } sm:flex sm:w-fit sm:justify-center sm:items-center sm:-translate-y-0 sm:static sm:bg-code-olive-primary sm:z-0`}>
          {filteredMenuList.map((li) => (
            <a
              key={li.name}
              onClick={() => {
                setHamburgerOpen(false);
                if (li.name === 'signup' || li.name === 'login') {
                  // setModalScreen(li.name as ModalName);
                  return setModalIsOpen(true);
                  return setModal(true);
                }
                if (li.name === 'logout') {
                  if (loggedInUser) {
                    logout();
                  }
                  return setIsLoggedIn(false);
                }
                setPage(li.name as ScreenName);
              }}
              className={`cursor-pointer ${li.name === 'welcomeUser' && 'pointer-events-none'}`}>
              <li className='p-3 w-full text-right border-t border-t-code-olive-primary transition-all hover:bg-code-olive-primary sm:border-0 sm:w-fit sm:hover:bg-transparent sm:hover:text-code-olive-400'>
                {li.label}{' '}
                {li.badge && cart.length > 0 ? (
                  <span className='bg-code-gray-600 text-white rounded-full px-2 py-0.5 font-semibold'>
                    {li.badge}
                  </span>
                ) : null}
              </li>
            </a>
          ))}
        </ul>
      </nav>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        {/* <Login setModalIsOpen={setModalIsOpen}></Login> */}
      </Modal>
    </>
  );
}
