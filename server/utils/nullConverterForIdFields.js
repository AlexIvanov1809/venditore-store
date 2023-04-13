function nullConverterForIdFields(product) {
  Object.keys(product).forEach((field) => {
    if (field.indexOf('Id') !== -1) {
      if (product[field] === '') {
        product[field] = null;
      }
    }
  });
  return product;
}

module.exports = nullConverterForIdFields;
