const models = require('../models/models');

const INCLUDES_MODELS = [
  { model: models.ProductImg, as: 'images' },
  { model: models.ProductPrice, as: 'prices' },
  {
    model: models.Type,
    as: 'type',
    attributes: ['name'],
  },
  { model: models.Brand, as: 'brand', attributes: ['name'] },
  {
    model: models.Country,
    as: 'country',
    attributes: ['name'],
  },
  {
    model: models.MakingMethod,
    as: 'making_method',
    attributes: ['name'],
  },
  {
    model: models.ManufacturingMethod,
    as: 'manufacturing_method',
    attributes: ['name'],
  },
  {
    model: models.TeaType,
    as: 'tea_type',
    attributes: ['name'],
  },
  {
    model: models.PackageType,
    as: 'package_type',
    attributes: ['name'],
  },
];

const TYPES_FOR_FILTER = [
  { model: models.TypeBrand, colName: 'brandId' },
  { model: models.TypeCountry, colName: 'countryId' },
  { model: models.TypeMakingMethod, colName: 'makingMethodId' },
  { model: models.TypeManufacturingMethod, colName: 'manufacturingMethodId' },
  { model: models.TypeTeaType, colName: 'teaTypeId' },
  { model: models.TypePackageType, colName: 'packageTypeId' },
];

module.exports = { INCLUDES_MODELS, TYPES_FOR_FILTER };
