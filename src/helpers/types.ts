export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  assets: string[];
  price: string;
};

export type Screen = 'home' | 'store' | 'login' | 'cart';
export type FilterCategory =
  | ''
  | 'suits'
  | 'pants'
  | 'shirts'
  | 'ties'
  | 'blazers';
