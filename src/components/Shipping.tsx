import { useEffect, useState } from 'react';
import stateData from '../data/state&cities.json';
import { ShippingInfo } from '../helpers/types';
import {
  onlyTextValidation,
  phoneValidation,
  postalCodeValidation,
  requiredFieldValidation,
} from '../utils/validations';
import Input from './Input';

const stateList = Object.keys(stateData);

type IProps = {
  subtotal: number;
  formStep: number;
  submitShippingForm: (info: ShippingInfo) => void;
  changeFormStep: (step: number) => void;
  changeShippingPrice: (price: number) => void;
};

export function Shipping({
  subtotal,
  formStep,
  submitShippingForm,
  changeFormStep,
  changeShippingPrice,
}: IProps) {
  const [shippingInfo, setShippingInfo] = useState({} as ShippingInfo);
  const [error, setError] = useState({});
  const [hasError, setHasError] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [shippingFormCompleted, setShippingFormCompleted] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const getCities = (state: string) => {
    setCities(stateData[state]);
  };

  const submitShipping = (e) => {
    e.preventDefault();
    const {
      addressTitle,
      fullName,
      address,
      postalCode,
      country,
      state,
      city,
      cellPhone,
      telephone,
    } = shippingInfo;

    setShippingInfo({
      addressTitle,
      fullName,
      address,
      postalCode,
      country,
      state,
      city,
      cellPhone,
      telephone,
    });
    changeFormStep(3);
  };

  const checkIfShippingFormCompleted = () => {
    const {
      addressTitle,
      fullName,
      address,
      postalCode,
      country,
      state,
      city,
      cellPhone,
      telephone,
    } = shippingInfo;

    if (
      addressTitle &&
      fullName &&
      address &&
      postalCode &&
      state &&
      city &&
      cellPhone
    ) {
      setShippingFormCompleted(true);
    } else {
      setShippingFormCompleted(false);
    }
  };

  const errorStateToggle = (errorText: string) => {
    errorText ? setHasError(true) : setHasError(false);
  };

  const handleBlurValidation = ({ target: { name, value } }) => {
    let errorText: string;
    switch (name) {
      case 'fullName':
        errorText = onlyTextValidation(value);
        setError({ ...error, [`${name}Error`]: errorText }), setHasError(true);
        break;
      case 'cellPhone':
        errorText = phoneValidation(value, true);
        setError({ ...error, [`${name}Error`]: errorText }), setHasError(true);
        setHasError(true);
        break;
      case 'telephone':
        errorText = phoneValidation(value, false);
        setError({ ...error, [`${name}Error`]: errorText }), setHasError(true);
        setHasError(true);
        break;
      case 'addressTitle':
      case 'address':
      case 'state':
      case 'city':
        errorText = requiredFieldValidation(value);
        setError({ ...error, [`${name}Error`]: errorText }), setHasError(true);
        setHasError(true);
        break;
      case 'postalCode':
        errorText = postalCodeValidation(value, true);
        setError({ ...error, [`${name}Error`]: errorText }), setHasError(true);
        setHasError(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedShipping === 'express') {
      return changeShippingPrice(14.99);
    } else if (selectedShipping === 'standard' && subtotal > 40) {
      return changeShippingPrice(0);
    } else {
      return changeShippingPrice(5.99);
    }
  }, [selectedShipping]);

  const shippingInputs = [
    {
      name: 'addressTitle',
      type: 'text',
      label: 'Address Title *',
      error: 'addressTitleError',
      styles: `block`,
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name *',
      error: 'fullNameError',
      styles: `block`,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address *',
      error: 'addressError',
      styles: `block`,
    },
    {
      name: 'postalCode',
      type: 'text',
      label: 'Postal Code *',
      error: 'postalCodeError',
      styles: `inline`,
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country *',
      options: 'United States',
      error: 'countryError',
      styles: `inline`,
    },
    {
      name: 'state',
      type: 'select',
      label: 'State *',
      options: ['Select', ...stateList],
      error: 'stateError',
      styles: `inline`,
    },
    {
      name: 'city',
      type: 'select',
      label: 'City *',
      options: ['Select', ...cities],
      error: 'cityError',
      styles: `inline`,
    },
    {
      name: 'cellPhone',
      type: 'text',
      label: 'Cell Phone *',
      error: 'cellPhoneError',
      styles: `block`,
    },
    {
      name: 'telephone',
      type: 'text',
      label: 'Telephone',
      error: 'telephoneError',
      styles: `block`,
    },
  ];

  return (
    <div>
      <h2 className='text-2xl font-medium p-2 border-b-2'>
        SHIPPING INFORMATION
      </h2>
      <div className='flex gap-2 flex-wrap border-b-2 py-2'>
        {shippingInputs.map((input) => {
          return (
            <Input
              key={input.name}
              input={input}
              value={shippingInfo[input.name]}
              formStep={formStep}
              checkIfFormCompleted={checkIfShippingFormCompleted}
              handleInputs={(name, value) => {
                setShippingInfo({ ...shippingInfo, [name]: value });
                name === 'state' && getCities(value);
              }}
              handleBlurValidation={handleBlurValidation}
              errorMessage={error[input.error]}
            />
          );
        })}
      </div>
      <h3 className='text-xl font-medium p-2'>SHIPPING METHOD</h3>
      <div>
        <div>
          <label className='flex gap-4'>
            <input
              type='radio'
              value='standard'
              checked={selectedShipping === 'standard'}
              onChange={(e) => setSelectedShipping(e.target.value)}
            />
            <div>
              <h4 className='font-medium'>STANDARD</h4>
              <p>Delivery in 4-6 Business Days - Free ($40 min.)</p>
            </div>
          </label>
        </div>
        <div>
          <label className='flex gap-4'>
            <input
              type='radio'
              value='express'
              checked={selectedShipping === 'express'}
              onChange={(e) => setSelectedShipping(e.target.value)}
            />
            <div>
              <h4 className='font-medium'>EXPRESS</h4>
              <p>Delivery in 1-3 Business Days - $14.99</p>
            </div>
          </label>
        </div>
      </div>

      <div className='flex justify-between items-center mt-8 text-white text-xl font-medium md:mx-10'>
        <button
          disabled={formStep === 1}
          onClick={() => changeFormStep(1)}
          className='px-8 py-2 bg-stone-400 rounded hover:bg-stone-300 disabled:bg-stone-200'>
          Back
        </button>
        <button
          disabled={!shippingFormCompleted}
          onClick={submitShipping}
          className='relative group flex px-8 py-2 bg-pink-600 rounded hover:bg-pink-500 disabled:bg-pink-200'>
          Next
          {!shippingFormCompleted && (
            <span
              className='absolute w-36 -top-12 transition-all left-1/2 transform -translate-x-1/2 translate-y-1/2
scale-0 rounded-xl border border-pink-600 bg-white p-2 text-xs text-pink-600 font-medium group-hover:scale-100'>
              please fill out all fields
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
