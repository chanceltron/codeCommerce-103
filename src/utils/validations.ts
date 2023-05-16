import moment from 'moment';
import { creditCardPattern } from './regex';

export const cardNumberValidation = (cardNumber: string) => {
  for (const card in creditCardPattern) {
    if (cardNumber.replace(/[^\d]/g, '').match(creditCardPattern[card])) {
      if (cardNumber) {
        return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
          ? ''
          : 'Enter a Valid Card Number';
      }
    }
  }
  return 'Enter a Valid Card Number';
};

export const expiryValidation = (value: string) => {
  if (value) {
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
      let today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate()}`;
      let currentDate = moment(new Date(date));
      let visaValue = value.split('/');
      let visaDate = new Date(+`20${visaValue[1]}`, +visaValue[0], 0);
      return currentDate < moment(visaDate) ? undefined : 'Please Enter a Valid Date';
    } else {
      return 'Invalid Date Format';
    }
  }
};

export const securityCodeValidation = (value: string) => {
  if (value) {
    if (/^[0-9]{3,4}$/.test(value)) {
      return undefined;
    } else {
      return 'Invalid Security Code';
    }
  } else {
    return 'This field is required';
  }
};

export const onlyTextValidation = (value: string) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical Letters Only';
    }
  } else {
    return 'This field is required';
  }
};

export const postalCodeValidation = (value: string, required: boolean) => {
  if (value) {
    if (/^\d{5}$/i.test(value)) {
      undefined;
    } else {
      return 'Invalid Postal Code';
    }
  } else if (required) {
    return 'This field is required';
  }
  return undefined;
};

export const phoneValidation = (value: string, required: boolean) => {
  const strippedNumber = value.replace(/\D+/g, '');
  if (strippedNumber) {
    if (/^\d{10}$/i.test(strippedNumber)) {
      return undefined;
    } else {
      return 'Invalid phone number';
    }
  } else if (required) {
    return 'This field is required';
  }
  return undefined;
};

export const emailValidation = (users: [{ email: string }], value: string) => {
  let errorMessage;
  users.map((user) => {
    if (user.email === value) {
      errorMessage = 'Email already in use';
    } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      errorMessage = undefined;
    } else if (value === '') {
      errorMessage = 'This field is required';
    } else {
      errorMessage = 'Please enter a valid email';
    }
  });
  return errorMessage;
};

export const emailDuplicateValidation = (users: [{ email: string }], value: string) => {
  users.find((user) => {
    if (user.email === value) {
      return 'This email is associated with an account';
    } else {
      undefined;
    }
  });
};

export const passwordComplexityValidation = (value: string) => {
  if (/(?=^.{8,20}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i.test(value)) {
    undefined;
  } else {
    return 'Does not meet requirements';
  }
};

export const passwordMatchValidation = (initPassword: string, confirmPassword: string) => {
  if (initPassword === confirmPassword) {
    undefined;
  } else {
    return 'Passwords Do Not Match';
  }
};

export const requiredFieldValidation = (value: string) => {
  if (value === '' || value === 'Select') {
    return 'This field is required';
  }
  return undefined;
};

export const formatPhoneNumber = (number: string) => {
  if (!number) return number;
  const phoneNumber = number.replace(/[^\d]/g, '');
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const formatZipCode = (zip: string) => {
  if (zip === '') return zip;
  return zip.replace(/^[0-9]{5}$/i, '');
};

export const formatName = (name: string) => {
  if (!name) return name;
  return name.replace(/[^a-z ]+/i, '');
};
