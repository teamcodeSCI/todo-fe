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
export const pressEnter = (e, func) => {
  if (e.key === 'Enter') {
    func();
  }
};
export const formatDate = (d) => {
  const date = new Date(d);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
