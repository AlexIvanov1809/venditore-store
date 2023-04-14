import { ValidatorConfig } from '@/types/constsTypes';

type ErrorValidation<T> = {
  [key in keyof T]?: string;
};

export default function validator<T>(data: T, config: ValidatorConfig<T>): ErrorValidation<T> {
  const errors: ErrorValidation<T> = {};
  function validate(validateMethod: string, data: T[keyof T], config: { message: string }) {
    let statusValidation;
    switch (validateMethod) {
      case 'isRequired':
        statusValidation = data ? data.toString().trim() === '' : !data;
        break;
      case 'isEmail': {
        if (typeof data !== 'string') {
          break;
        }
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidation = !emailRegExp.test(data);
        break;
      }
      case 'isCapitalSymbol': {
        if (typeof data !== 'string') {
          break;
        }
        const capitalSymbol = /[A-Z]+/g;
        statusValidation = !capitalSymbol.test(data);
        break;
      }
      case 'isContainDigit': {
        if (typeof data !== 'string') {
          break;
        }
        const containDigit = /\d+/g;
        statusValidation = !containDigit.test(data);
        break;
      }
      // case 'minMax': {
      //   statusValidation = (data[0] === '+' ? data.length - 2 : data.length) !== config.value;
      //   break;
      // }
      default:
        break;
    }
    if (statusValidation) return config.message;
  }

  for (const fieldName in data) {
    if (!config[fieldName]) {
      break;
    }
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod] as { message: string });

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
