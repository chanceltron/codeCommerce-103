import { useState } from 'react';
import { Stepper } from './Stepper';
import { Cart } from './Cart';
import { Shipping } from './Shipping';
// import Payment from './Payment';
// import Confirmation from './Confirmation';
import { CARDICON } from '../utils/constants';
import { useCart, useCheckout, useFormStep } from '../hooks/hooks';
import { FormSteps, PaymentInfo, Product, ShippingInfo } from '../helpers/types';
import { Summary } from './Summary';

export function Checkout({ setDrawerIsOpen }: { setDrawerIsOpen: (isOpen: boolean) => void }) {
  const { cart } = useCart();
  const { formStep } = useFormStep();

  // const { cardType, cardHolderName, cardNumber } = paymentInfo;
  // const { fullName, address, city, state, postalCode } = shippingInfo;
  return (
    <div className='h-full overflow-y-scroll'>
      <div className='px-4 h-full bg-[#EBEAEF]'>
        {formStep === FormSteps.CART && <Cart setDrawerIsOpen={setDrawerIsOpen} />}
        {formStep === FormSteps.SHIPPING && <Shipping />}
        <Summary />
      </div>
    </div>
  );
}
