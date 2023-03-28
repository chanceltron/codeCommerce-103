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
  quantity: number;
};

export type Screen = 'home' | 'store' | 'login' | 'signup' | 'cart';
export type CategoryName =
  | ''
  | 'suits'
  | 'pants'
  | 'shirts'
  | 'ties'
  | 'blazers';

export type Summary = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

export enum FormSteps {
  cart = 1,
  shipping,
  payment,
  summary,
}

export type ShippingInfo = {
  addressTitle: string;
  fullName: string;
  address: string;
  postalCode: string;
  country: string;
  state: string;
  city: string;
  cellPhone: string;
  telephone?: string;
};

export type PaymentInfo = {
  cardHolderName: string;
  cardNumber: string;
  cardType: string;
  expMonth: string;
  expYear: string;
  cvv: number;
  total: number;
};
