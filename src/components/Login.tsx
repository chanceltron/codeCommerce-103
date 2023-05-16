import { FieldValues, useForm } from 'react-hook-form';
import { Input } from './Input';
import { name, password, email, zipCode } from '../utils/regex';
import { ModalName, User } from '../helpers/types';
import { useUsers } from '../hooks/hooks';

export const Login = ({ setModalIsOpen, currentModal, setCurrentModal }: any) => {
  const { users, addUser, login } = useUsers();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const loginInputs = [
    {
      name: 'loginEmail',
      type: 'email',
      label: 'Email Address',
      info: '',
      validations: {
        required: 'This field is required.',
      },
    },
    {
      name: 'loginPassword',
      type: 'password',
      icon: 'password',
      label: 'Password',
      info: '',
      validations: {
        required: 'This field is required.',
      },
    },
  ];

  const signupInputs = [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address *',
      info: '',
      validations: {
        required: 'This field is required.',
        pattern: email,
      },
    },
    {
      name: 'password',
      type: 'password',
      icon: 'password',
      label: 'Create Password *',
      info: 'Password must be at least 8 characters, including at least one capital letter, at least one small letter, one number and one special character.',
      validations: {
        required: 'This field is required.',
        pattern: password,
      },
    },
    {
      name: 'confirmPassword',
      type: 'password',
      icon: 'password',
      info: '',
      label: 'Confirm Password *',
      validations: {
        required: 'This field is required.',
        validate: (value: string) => {
          if (watch('password') !== value) {
            return 'Passwords do not match.';
          }
        },
      },
    },
    {
      name: 'firstName',
      type: 'text',
      info: '',
      label: 'First Name *',
      validations: {
        required: 'This field is required.',
        pattern: name,
      },
    },
    {
      name: 'lastName',
      type: 'text',
      info: '',
      label: 'Last Name *',
      validations: {
        required: 'This field is required.',
        pattern: name,
      },
    },
    {
      name: 'postalCode',
      type: 'text',
      label: 'Postal Code',
      info: '',
      maxLength: 5,
      validations: {
        pattern: zipCode,
      },
    },
  ];

  const createNewUser = (data: FieldValues) => {
    const { email, firstName, lastName, password, postalCode } = data;
    const newUser = {
      id: +Date.now(),
      email,
      firstName,
      lastName,
      password,
      postalCode,
    };
    if (users.find((user: User) => user.email === email)) {
      setError('email', { type: 'custom', message: 'User already exists.' });
    } else {
      addUser(newUser);
      reset();
      setCurrentModal('login');
    }
  };

  const loginUser = (data: FieldValues) => {
    const { loginEmail, loginPassword } = data;
    users.find((user: User) => {
      if (user.email === loginEmail && user.password === loginPassword) {
        login(loginEmail, loginPassword);
        setModalIsOpen(false);
        reset();
      } else {
        console.log('Invalid email or password.');
        setError('loginEmail', { type: 'custom', message: 'Invalid email or password.' });
      }
    });
  };

  const switchBtns = [
    { name: 'signup', label: 'Create Account' },
    { name: 'login', label: 'Sign in' },
  ];
  const inputsArr = currentModal === 'signup' ? signupInputs : loginInputs;
  return (
    <>
      <div className='rounded-md max-w-lg'>
        <div className='flex justify-around text-center mb-3'>
          {switchBtns.map((btn) => (
            <button
              key={btn.name}
              className={`cursor-pointer w-full border-b-2 ${
                currentModal === btn.name && 'border-b-code-peach-300'
              }`}
              onClick={() => setCurrentModal(btn.name as ModalName)}>
              {btn.label}
            </button>
          ))}
        </div>
        <form
          className='flex flex-col p-4'
          onSubmit={handleSubmit((data) => {
            if (currentModal === 'signup') {
              createNewUser(data);
            } else {
              loginUser(data);
            }
          })}>
          {inputsArr.map((input) => (
            <Input key={input.name} input={input} register={register} errors={errors} />
          ))}
          <button
            className={`bg-code-peach-300 text-white text-xl py-2 my-2 disabled:pointer-events-none disabled:opacity-30`}>
            Sign {currentModal === 'signup' ? 'up' : 'in'}
          </button>
          <fieldset className='border-t'>
            <legend className='mx-auto px-4'>or</legend>
          </fieldset>
          <button
            disabled={true}
            className='bg-[#4267B2] text-white text-xl py-2 my-2'
            onClick={(e) => e.preventDefault()}>
            Sign {currentModal === 'signup' ? 'up' : 'in'} with{' '}
            <span className='font-semibold'>Facebook</span>
          </button>
        </form>
      </div>
    </>
  );
};
