const Country = require("../models/coffeeItems/Country");
const Brand = require("../models/coffeeItems/Brand");
const countryMock = require("../mock/counties.json");
const brandMock = require("../mock/brands.json");

module.exports = async () => {
  const countries = await Country.find();
  if (countries.length !== countryMock.length) {
    await createInitialEntity(Country, countryMock);
  }
  const brands = await Brand.find();
  if (brands.length !== brandMock.length) {
    await createInitialEntity(Brand, brandMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
