export const zipCode = { value: /^[0-9]{5}$/, message: 'Invalid zip code' };
export const phoneNumber = {
  value: /^[0-9]{10}$/,
  message: 'Invalid phone number',
};
export const email = {
  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  message: 'Invalid email',
};
export const securityCode = {
  value: /^[0-9]{3,4}$/,
  message: 'Invalid security code',
};
export const password = {
  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*.[-!@#$%^&*()_+]).{8,40}/,
  message: 'Password does not meet requirements',
};
export const username = {
  value: /^[a-zA-Z0-9]{3,}$/,
  message: 'Username must be at least 3 characters',
};
export const name = {
  value: /^[a-zA-Z ]*$/i,
  message: 'Alphabetical letters only',
};
export const creditCardPattern = {
  VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
  MASTERCARD: /^5[1-5][0-9]{14}$/,
  AMEX: /^3[47][0-9]{13}$/,
  DISCOVER:
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
};
export const address = {
  value: /^[a-zA-Z0-9'.\s,'-]*$/i,
};
export const phone = {
  value: /^\(\d{3}\) \d{3}-\d{4}$/,
};

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : null;
};
