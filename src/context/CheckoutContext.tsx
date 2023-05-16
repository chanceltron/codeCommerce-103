import { createContext, useState } from 'react';
import { Product, ShippingInfo } from '../helpers/types';

type CheckoutContextData = {
  subtotal: number;
  setSubtotal: React.Dispatch<React.SetStateAction<number>>;
  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  shipping: number;
  setShipping: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalQuantity: number;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  shippingInfo: ShippingInfo | undefined;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo | undefined>>;
};

const defaultCheckoutContextData = {
  subtotal: 0,
  setSubtotal: () => {},
  discount: 0,
  setDiscount: () => {},
  shipping: 0,
  setShipping: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  totalQuantity: 0,
  setTotalQuantity: () => {},
  formStep: 0,
  setFormStep: () => {},
  shippingInfo: undefined,
  setShippingInfo: () => {},
};

const CheckoutContext = createContext<CheckoutContextData>(defaultCheckoutContextData);

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [formStep, setFormStep] = useState<number>(0);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();

  return (
    <CheckoutContext.Provider
      value={{
        subtotal,
        setSubtotal,
        discount,
        setDiscount,
        shipping,
        setShipping,
        totalPrice,
        setTotalPrice,
        totalQuantity,
        setTotalQuantity,
        formStep,
        setFormStep,
        shippingInfo,
        setShippingInfo,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutProvider };
