import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Product, User } from '../helpers/types';

const devUser: User = {
  id: 1,
  email: 'test@test.com',
  firstName: 'Chance',
  lastName: 'Ludwick',
  password: 'password',
  postalCode: '55555',
};

// type Summary = {
//   totalQuantity?: number;
//   subtotal?: number;
//   discount?: number;
//   shipping?: number;
//   totalPrice?: number;
// };

type AppContextData = {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
  loggedInUser: any;
  setLoggedInUser: Dispatch<SetStateAction<User | null>>;
};

const defaultAppContextData = {
  currentPage: '',
  setCurrentPage: () => {},
  users: [],
  setUsers: () => {},
  cart: [],
  setCart: () => {},
  loggedInUser: null,
  setLoggedInUser: () => {},
};

const AppContext = createContext<AppContextData>(defaultAppContextData);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [users, setUsers] = useState<User[]>([devUser]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(
    import.meta.env.VITE_ENV === 'development' ? devUser : null
  );

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        users,
        setUsers,
        cart,
        setCart,
        loggedInUser,
        setLoggedInUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
