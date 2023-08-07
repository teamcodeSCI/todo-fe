import validator from 'validator';
export const validateEmail = (email) => {
  if (!validator.isEmail(email) || !email.endsWith('@scigroup.com.vn')) {
    return false;
  }
  return true;
};
