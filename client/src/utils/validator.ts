import { ValidationMethods, ValidatorConfig } from '@/types/constsTypes';

type ErrorValidation<T> = {
  [key in keyof T]?: string;
};

export default function validator<T>(data: T, config: ValidatorConfig<T>): ErrorValidation<T> {
  const errors: ErrorValidation<T> = {};
  function validate(validateMethod: ValidationMethods, data: T[keyof T], config: { message: string }) {
    let statusValidation;
    switch (validateMethod) {
      case 'isRequired':
        statusValidation = data ? data.toString().trim() === '' : !data;
        break;
      // case 'isEmail': {
      //   const emailRegExp = /^\S+@\S+\.\S+$/g;
      //   statusValidation = !emailRegExp.test(data);
      //   break;
      // }
      // case 'isCapitalSymbol': {
      //   const capitalSymbol = /[A-Z]+/g;
      //   statusValidation = !capitalSymbol.test(data);
      //   break;
      // }
      // case 'isContainDigit': {
      //   const containDigit = /\d+/g;
      //   statusValidation = !containDigit.test(data);
      //   break;
      // }
      // case 'onlyDigit': {
      //   const containDigit = /^\d+/g;
      //   const arrData = data.split('');
      //   data[0] === '+' ? arrData.splice(0, 1) : arrData.join('');
      //   statusValidation = !containDigit.test(arrData.join(''));
      //   break;
      // }
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
      const error = validate(
        validateMethod as ValidationMethods,
        data[fieldName],
        config[fieldName][validateMethod] as { message: string }
      );

      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
