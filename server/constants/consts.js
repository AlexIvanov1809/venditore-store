const models = require("../models/models");

const INCLUDES_MODELS = [
  { model: models.ItemImg, as: "image" },
  { model: models.ItemPrice, as: "price" },
  { model: models.Type, as: "type", attributes: ["name"] },
  { model: models.Brand, as: "brand", attributes: ["name"] },
  { model: models.Country, as: "country", attributes: ["name"] },
  {
    model: models.MakingMethod,
    as: "making_method",
    attributes: ["name"],
  },
  {
    model: models.ManufacturingMethod,
    as: "manufacturing_method",
    attributes: ["name"],
  },
  { model: models.TeaType, as: "tea_type", attributes: ["name"] },
  {
    model: models.PackageType,
    as: "package_type",
    attributes: ["name"],
  },
];

const TYPES_FOR_FILTER = [
  { model: models.TypeBrand, id: "brandId" },
  { model: models.TypeCountry, id: "countryId" },
  { model: models.TypeMakingMethod, id: "makingMethodId" },
  { model: models.TypeManufacturingMethod, id: "manufacturingMethodId" },
  { model: models.TypeTeaType, id: "teaTypeId" },
  { model: models.TypePackageType, id: "packageTypeId" },
];

module.exports = { INCLUDES_MODELS, TYPES_FOR_FILTER };
