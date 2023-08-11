import { useEffect } from 'react';
import validator from 'validator';
export const validateEmail = (email) => {
  if (!validator.isEmail(email) || !email.endsWith('@scigroup.com.vn')) {
    return false;
  }
  return true;
};
export const useOutside = (ref, func) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
};
