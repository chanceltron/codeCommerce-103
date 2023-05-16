export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  quantity: number;
  assets: [
    {
      id: string;
      filename: string;
      url: string;
    }
  ];
  price: string;
};

export type ScreenName = 'home' | 'store' | 'cart';

export type ModalName = 'login' | 'signup';

export type CategoryName = '' | 'suits' | 'pants' | 'shirts' | 'ties' | 'blazers';

export type Summary = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

export enum FormSteps {
  CART,
  SHIPPING,
  PAYMENT,
  SUMMARY,
}

export type ShippingInfo = {
  addressTitle: string;
  fullName: string;
  address: string;
  postalCode: string;
  country: { label: string; value: string };
  state: { label: string; value: string };
  city: { label: string; value: string };
  cellPhone: string;
  telephone?: string;
  selectedShippingOption: string;
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

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  postalCode?: string;
};

export type SignUpSignInSwitch = 'signup' | 'login';
