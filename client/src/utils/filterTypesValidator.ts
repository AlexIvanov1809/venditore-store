import { FilterTypesForObject, FilterTypesPrimitive } from '@/types/productTypes';

function isKeyOfTypeForObj(type: string): type is keyof FilterTypesForObject {
  const keys = ['type', 'brand', 'country', 'making_method', 'manufacturing_method', 'tea_type'];
  let isTrue = false;
  keys.forEach((k) => {
    if (k === type) {
      isTrue = true;
    }
  });
  return isTrue;
}

function isKeyOfTypeForPrimitive(type: string): type is keyof FilterTypesPrimitive {
  const keys = ['sortName', 'active'];
  let isTrue = false;
  keys.forEach((k) => {
    if (k === type) {
      isTrue = true;
    }
  });
  return isTrue;
}

export { isKeyOfTypeForObj, isKeyOfTypeForPrimitive };
