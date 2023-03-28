import { useEffect, useState } from 'react';
import { Stepper } from './Stepper';
import { Cart } from './Cart';
import Shipping from './Shipping';
import Payment from './Payment';
import Confirmation from './Confirmation';
import { CARDICON } from '../utils/constants';
import {
  FormSteps,
  PaymentInfo,
  Product,
  ShippingInfo,
  Summary,
} from '../helpers/types';

export function Checkout() {
  const [summary, setSummary] = useState({} as Summary);
  const [discountCodes] = useState<string[]>(['discount5', 'discount10']);
  const [shippingInfo, setShippingInfo] = useState({} as ShippingInfo);
  const [paymentInfo, setPaymentInfo] = useState({} as PaymentInfo);
  const [promoCode, setPromoCode] = useState<string>('');
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [formStep, setFormStep] = useState<FormSteps>(1);
  const [cartLength, setCartLength] = useState<number>(0);

  const updateSummaryPrices = () => {
    const subtotal = cart
      .reduce((total: number, item: Product) => {
        return total + +item.price * item.quantity;
      }, 0)
      .toFixed(2);
    const total = (+subtotal + shippingPrice - +discount).toFixed(2);
    setSummary({ subtotal, shipping: shippingPrice, discount, total: +total });
  };

  const updateTotalQuantity = () => {
    const totalQuantity = cart.reduce((total: number, item: Product) => {
      return total + item.quantity;
    }, 0);
    setCartLength(totalQuantity || 0);
  };

  const changeQuantity = async (id: string, value: number) => {
    await this.props.changeQuantity(id, value);
  };

  const removeFromCart = async (id: string) => {
    await this.props.removeFromCart(id);
  };

  const applyDiscount = (e) => {
    e.preventDefault();
    if (discountCodes.includes(promoCode)) {
      const discount = promoCode === 'discount5' ? 5 : 10;
      setDiscount(discount);
    }
  };

  useEffect(() => {
    updateSummaryPrices();
    updateTotalQuantity();
  }, [cart, discount, shippingPrice]);

  const { cardType, cardHolderName, cardNumber } = paymentInfo;
  const { fullName, address, city, state, postalCode } = shippingInfo;
  return (
    <div className='flex flex-col justify-between shadow-xl rounded bg-stone-100 md:flex-row md:m-5'>
      <div className='flex flex-col flex-[3]'>
        <div className='p-6 text-center m-2 rounded'>
          <Stepper
            formStep={formStep}
            changeFormStep={(step: FormSteps) =>
              step < formStep && setFormStep(step)
            }
          />
        </div>
        <div className='bg-white m-2 p-3 rounded'>
          {formStep === 1 && (
            <Cart
              changeQuantity={changeQuantity}
              removeFromCart={removeFromCart}
              formStep={formStep}
              changeFormStep={() => setFormStep(2)}
              cart={cart}
            />
          )}
          {formStep === 2 && (
            <Shipping
              subtotal={summary.subtotal}
              formStep={formStep}
              submitShippingForm={(info: ShippingInfo) => setShippingInfo(info)}
              changeFormStep={(step: FormSteps) =>
                step < formStep && setFormStep(step)
              }
              changeShippingPrice={(price: number) => setShippingPrice(price)}
            />
          )}
          {formStep === 3 && (
            <Payment
              total={summary.total}
              changeFormStep={(step: FormSteps) =>
                step < formStep && setFormStep(step)
              }
              submitPaymentForm={(info: PaymentInfo) => setPaymentInfo(info)}
            />
          )}
          {formStep === 4 && <Confirmation cardType={cardType} />}
        </div>
      </div>
      <div className='bg-white flex-1 m-2 px-4 rounded min-w-[300px]'>
        <h2 className='text-right text-2xl font-semibold uppercase py-4 border-b-2'>
          Summary
        </h2>
        {formStep === 1 && (
          <div>
            <div className='py-4 border-b-2 justify-end'>
              <h4>
                There are <span className='font-medium'>{cartLength}</span>{' '}
                items in your cart
              </h4>
            </div>
            <div className='py-4 border-b-2'>
              <h4 className=''>Do you have a promo code?</h4>
              <form
                onSubmit={applyDiscount}
                className='flex justify-between gap-3'>
                <input
                  value={promoCode}
                  type='text'
                  placeholder='Enter promo code'
                  className='font-code border-2 border-stone-500 p-2 w-full'
                  onChange={(e) => setPromoCode(e.target.value || '')}
                />
                <input
                  type='submit'
                  value='APPLY'
                  className='border-2 border-stone-500 text-stone-500 py-2 px-4 font-medium transition-all hover:text-white hover:bg-stone-500'></input>
              </form>
            </div>
          </div>
        )}
        {formStep > 1 && (
          <div className='py-4 border-b-2'>
            <Cart
              changeQuantity={changeQuantity}
              removeFromCart={removeFromCart}
              formStep={formStep}
              cart={cart}
            />
          </div>
        )}
        {formStep > 2 && (
          <div className='py-4 border-b-2'>
            <h4 className='font-medium'>Shipping Information</h4>
            <div className='flex flex-col'>
              <p>{fullName}</p>
              <p>{address}</p>
              <p>
                {city}, {state} {postalCode}
              </p>
            </div>
          </div>
        )}
        {formStep > 3 && (
          <div className='py-4 border-b-2'>
            <h4 className='font-medium'>Payment Information</h4>
            <div className='flex flex-col'>
              <p>{cardHolderName}</p>
              <div className='flex items-center justify-between flex-wrap'>
                <div className='flex items-center'>
                  <img src={CARDICON[cardType]} alt='' className='h-8 w-15' />
                  <p>...{cardNumber.slice(-4)}</p>
                </div>
                <p>
                  Amount Paid:{' '}
                  <span className='font-medium'>${summary.total}</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className='py-4 border-b-2'>
          <div className='flex justify-between px-2'>
            <h4 className=''>Subtotal:</h4>
            <h4 className='font-medium'>${summary.subtotal}</h4>
          </div>
          <div className='flex justify-between px-2'>
            <h4 className=''>Shipping & Handling:</h4>
            <h4 className='font-medium'>${summary.shipping.toFixed(2)}</h4>
          </div>
          <div className='flex justify-between px-2'>
            <h4 className=''>Discount:</h4>
            <h4 className='font-medium'>${summary.discount.toFixed(2)}</h4>
          </div>
          <div className='flex justify-between items-center px-2 font-medium'>
            <h4 className=''>Cart Total:</h4>
            <h4 className='text-pink-600 text-xl'>
              {summary.total ? `$${summary.total}` : '-'}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
