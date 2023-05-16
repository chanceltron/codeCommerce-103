import { ChangeEvent, EventHandler, useState } from 'react';
import { CARDICON } from '../utils/constants';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { formatPhoneNumber } from '../utils/validations';

type IProps = {
  input: {
    name: string;
    type: string;
    label: string;
    icon?: string;
    info?: string;
    styles?: string;
    maxLength?: number;
    validations?: {};
  };
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const Input = ({ input, register, errors }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(input.type);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (input.name === 'telephone' || input.name === 'cellPhone') {
      const formattedValue = formatPhoneNumber(e.target.value);
      return setInputValue(formattedValue);
    }
    return setInputValue(e.target.value);
  };

  return (
    <div className={`text-left mt-1 w-full`}>
      <label htmlFor={input.name}>{input.label}</label>
      <div
        className={`relative bg-white flex justify-between w-full items-center border-2 px-2 outline-gray-300 rounded-lg focus:outline-pink-600`}>
        <input
          {...register(input.name, { ...input.validations })}
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          maxLength={input.maxLength || 100}
          className='w-full py-1 outline-none bg-transparent'
        />

        {input.icon === 'password' && (
          <a
            className='absolute right-2 flex items-center justify-center'
            onClick={() => {
              setShowPassword(!showPassword);
              setInputType(showPassword ? 'password' : 'text');
            }}>
            <i className={`text-lg fa-solid fa-eye${showPassword ? '-slash' : ''}`} />
          </a>
        )}
      </div>
      {/* // * This is an issue with react-hook-form's typing */}
      <p className='text-red-500 my-1'>{errors[input.name]?.message}</p>
      <p className='text-xs font-medium'>{input?.info}</p>
    </div>
  );
};
