import React, { Component } from 'react';
import Input from './Input';
import {
  emailValidation,
  passwordComplexityValidation,
  passwordMatchValidation,
  onlyTextValidation,
  postalCodeValidation,
} from '../utils/validations';

// SIGNUP/LOGIN Initial Values
const INIT_VALUES = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  postalCode: '',
  loginEmail: '',
  loginPassword: '',
};

const loginInputs = [
  {
    name: 'loginEmail',
    type: 'email',
    label: 'Email Address',
    error: 'loginEmailError',
  },
  {
    name: 'loginPassword',
    type: 'password',
    icon: true,
    label: 'Password',
    error: 'loginPasswordError',
  },
];

const signupInputs = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address *',
    error: 'emailError',
  },
  {
    name: 'password',
    type: 'password',
    icon: 'password',
    label: 'Create Password *',
    info: 'Password must be 8-20 characters, including at least once capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
    error: 'passwordComplexityError',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    icon: 'password',
    label: 'Confirm Password *',
    error: 'passwordMatchError',
  },
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name *',
    error: 'firstNameError',
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name *',
    error: 'lastNameError',
  },
  {
    name: 'postalCode',
    type: 'text',
    label: 'Postal Code',
    error: 'postalCodeError',
  },
];

export default class Login extends Component {
  state = {
    inputValues: INIT_VALUES,
    activeScreen: 'signup',
    error: {},
    signupHasError: true,
    formCompleted: false,
  };

  checkIfFormCompleted = () => {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      postalCode,
      loginEmail,
      loginPassword,
    } = this.state.inputValues;
    if (this.state.activeScreen === 'signup') {
      if (email && password && confirmPassword && firstName && lastName) {
        this.setState(() => ({ formCompleted: true }));
      } else {
        this.setState(() => ({ formCompleted: false }));
      }
    } else if (this.state.activeScreen === 'login') {
      if (loginEmail && loginPassword) {
        this.setState(() => ({ formCompleted: true }));
      } else {
        this.setState(() => ({ formCompleted: false }));
      }
    }
  };

  handleSwitchScreen = (e) => {
    e.preventDefault();
    this.setState(() => ({
      activeScreen: e.target.value,
    }));
    this.resetInputs();
  };

  handleInputs = (name, value) => {
    this.setState((prevState) => ({
      inputValues: {
        ...prevState.inputValues,
        [name]: value,
      },
    }));
    this.checkIfFormCompleted();
  };

  resetInputs = () => {
    Object.keys(this.state.inputValues).map((key) => {
      this.setState((prevState) => ({
        error: {},
        inputValues: {
          ...prevState.inputValues,
          [key]: '',
        },
      }));
    });
  };

  errorStateToggle = (errorText) => {
    errorText
      ? this.setState({ signupHasError: true })
      : this.setState({ signupHasError: false });
  };

  handleBlurValidation = ({ target: { name, value } }) => {
    let errorText;
    switch (name) {
      case 'email':
        errorText = emailValidation(this.props.users, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, emailError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'password':
        errorText = passwordComplexityValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, passwordComplexityError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'confirmPassword':
        errorText = passwordMatchValidation(
          this.state.inputValues.password,
          value
        );
        this.setState((prevState) => ({
          error: { ...prevState.error, passwordMatchError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'firstName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, firstNameError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'lastName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, lastNameError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'postalCode':
        errorText = postalCodeValidation(value, false);
        this.setState((prevState) => ({
          error: { ...prevState.error, postalCodeError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      default:
        break;
    }
  };

  submitErrorCheck = () => {
    const { signupHasError } = this.state;
    let isError = false;
    if (signupHasError) {
      isError = true;
    }
    return isError;
  };

  handleNewUser = (e) => {
    e.preventDefault();

    const { email, firstName, lastName, password, postalCode } =
      this.state.inputValues;
    const { createNewUser } = this.props;
    const errorCheck = this.submitErrorCheck();
    const newUser = {
      id: Date.now(),
      email,
      firstName,
      lastName,
      password,
      postalCode,
    };
    if (!errorCheck) {
      createNewUser(newUser);
      this.handleSwitchScreen(e);
    }
  };

  loginUser = (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.state.inputValues;
    const { users, loginUser, changeScreen } = this.props;
    let errorText;

    users.find((user) => {
      if (user.email === loginEmail && user.password === loginPassword) {
        loginUser(loginEmail, loginPassword);
        this.resetInputs();
        changeScreen('checkout');
      } else {
        errorText = 'Email or password is incorrect';
        this.setState((prevState) => ({
          error: { ...prevState.error, loginEmailError: errorText },
        }));
      }
    });
  };

  render() {
    const { activeScreen, inputValues, formCompleted, error } = this.state;

    return (
      <div className='m-auto rounded-md shadow-2xl max-w-lg py-8'>
        <div className='flex justify-around text-center mb-3'>
          <button
            className={`cursor-pointer w-full border-b-2 ${
              activeScreen === 'signup' && 'border-b-pink-600 '
            }`}
            value='signup'
            onClick={(e) => this.handleSwitchScreen(e)}>
            Create Account
          </button>
          <button
            className={`cursor-pointer w-full border-b-2 ${
              activeScreen === 'login' && 'border-b-pink-600 '
            }`}
            value='login'
            onClick={(e) => this.handleSwitchScreen(e)}>
            Sign in
          </button>
        </div>
        <form action='' className='flex flex-col p-4'>
          {activeScreen === 'signup'
            ? signupInputs.map((input) => (
                <Input
                  key={input.name}
                  input={input}
                  value={inputValues[input.name]}
                  handleInputs={this.handleInputs}
                  handleBlurValidation={this.handleBlurValidation}
                  errorMessage={error[input.error]}
                />
              ))
            : loginInputs.map((input) => (
                <Input
                  key={input.name}
                  input={input}
                  value={inputValues[input.name]}
                  handleInputs={this.handleInputs}
                  handleBlurValidation={this.handleBlurValidation}
                  errorMessage={error[input.error]}
                />
              ))}
          <button
            disabled={!formCompleted}
            className={`bg-pink-600 text-white text-xl py-2 my-2 disabled:pointer-events-none disabled:opacity-30`}
            onClick={
              activeScreen === 'signup' ? this.handleNewUser : this.loginUser
            }>
            Sign {activeScreen === 'signup' ? 'up' : 'in'}
          </button>
          <fieldset className='border-t'>
            <legend className='mx-auto px-4'>or</legend>
          </fieldset>
          <button
            className='bg-[#4267B2] text-white text-xl py-2 my-2'
            onClick={(e) => e.preventDefault()}>
            Sign {activeScreen === 'signup' ? 'up' : 'in'} with{' '}
            <span className='font-semibold'>Facebook</span>
          </button>
        </form>
      </div>
    );
  }
}
