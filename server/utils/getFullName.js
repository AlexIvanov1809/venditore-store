const { Country } = require('../models/models');

async function getFullName(data) {
  if (data.countryId) {
    const country = await Country.findOne({ where: { id: data.countryId } });
    return `${country.name} ${data.sortName}`;
  }
  return data.sortName;
}

function getMinPriceValue(price) {
  const parsePrice = JSON.parse(price);
  const values = parsePrice.map((price) => {
    return parseInt(price.value);
  });
  return Math.min.apply(null, values);
}

module.exports = { getFullName, getMinPriceValue };
