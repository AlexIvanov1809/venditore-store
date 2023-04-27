import { ValidatorConfig } from '@/types/constsTypes';
import { ErrorMsg } from '@/types/uiTypes';
import { useEffect, useState } from 'react';

export default function useValidation(value: string | number, config: ValidatorConfig, secondValue = ''): ErrorMsg {
  if (typeof value === 'number') {
    value = value.toString();
  }
  const [errors, setErrors] = useState('');

  const setterErrors = (message: string) => {
    setErrors((prev) => {
      if (!prev.length) {
        return message;
      }
      return prev;
    });
  };

  useEffect(() => {
    setErrors('');
    if (config) {
      for (const validation in config) {
        switch (validation) {
          case 'isRequired':
            if (!value.toString().trim()) {
              setterErrors(config[validation].message);
            }

            break;
          case 'minLength':
            if (value.toString().length < (config[validation].value ?? 0)) {
              setterErrors(config[validation].message);
            }

            break;
          case 'isEmail': {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            if (!emailRegExp.test(value.toString())) {
              setterErrors(config[validation].message);
            }

            break;
          }
          case 'isCapitalSymbol': {
            const capitalSymbol = /[A-ZА-Я]+/g;
            if (!capitalSymbol.test(value.toString())) {
              setterErrors(config[validation].message);
            }

            break;
          }
          case 'isContainDigit': {
            const containDigit = /\d+/g;
            if (!containDigit.test(value.toString())) {
              setterErrors(config[validation].message);
            }

            break;
          }
          case 'isEqual': {
            if (value.toString() !== secondValue) {
              setterErrors(config[validation].message);
            }

            break;
          }
          default:
            break;
        }
      }
    }
  }, [value, secondValue]);

  return errors;
}
