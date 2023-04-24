import { useEffect, useState } from 'react';

export default function useValidation(value, config) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (config) {
      for (const validation in config) {
        switch (validation) {
          case 'isRequired':
            value.toString().trim()
              ? null
              : setErrors((prev) => ({ ...prev, [validation]: config[validation].message }));
            break;
          case 'minLength':
            console.log(config[validation].value > value.length);
            value.length < config[validation].value
              ? setErrors((prev) => ({ ...prev, [validation]: config[validation].message }))
              : null;
            break;
          case 'isEmail': {
            if (typeof value !== 'string') {
              true;
              break;
            }
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            emailRegExp.test(value)
              ? null
              : setErrors((prev) => ({ ...prev, [validation]: config[validation].message }));
            break;
          }
          case 'isCapitalSymbol': {
            if (typeof value !== 'string') {
              true;
              break;
            }
            const capitalSymbol = /[A-ZА-Я]+/g;
            capitalSymbol.test(value)
              ? null
              : setErrors((prev) => ({ ...prev, [validation]: config[validation].message }));

            break;
          }
          case 'isContainDigit': {
            if (typeof value !== 'string') {
              true;
              break;
            }
            const containDigit = /\d+/g;
            containDigit.test(value)
              ? null
              : setErrors((prev) => ({ ...prev, [validation]: config[validation].message }));

            break;
          }
          default:
            break;
        }
      }
    }
  }, [value]);

  return errors;
}
