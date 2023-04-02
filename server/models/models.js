const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING },
});

const Item = sequelize.define("Item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sortName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  shortDescription: { type: DataTypes.STRING },
  acidity: { type: DataTypes.STRING },
  density: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Country = sequelize.define("country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const MakingMethod = sequelize.define("making_method", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ManufacturingMethod = sequelize.define("manufacturing_method", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const TeaType = sequelize.define("tea_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const PackageType = sequelize.define("package_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ItemImg = sequelize.define("item_img", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const ItemPrice = sequelize.define("item_price", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  weight: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TypeTeaType = sequelize.define("type_tea_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TypeManufacturingMethod = sequelize.define("type_manufacturing_method", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TypeMakingMethod = sequelize.define("type_making_method", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TypeCountry = sequelize.define("type_country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrandManufacturingMethod = sequelize.define(
  "brand_manufacturing_method",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
);

const BrandMakingMethod = sequelize.define("brand_making_method", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrandTeaType = sequelize.define("brand_tea-type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BrandCountry = sequelize.define("brand_country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TeaTypeManufacturingMethod = sequelize.define(
  "tea_type_manufacturing_method",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
);

const TeaTypeMakingMethod = sequelize.define("tea_type_making_method", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TeaTypeCountry = sequelize.define("tea_type_country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ManufacturingMethodMakingMethod = sequelize.define(
  "manufacturing_method_making_method",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
);

const ManufacturingMethodCountry = sequelize.define(
  "manufacturing_method_country",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
);

const MakingMethodCountry = sequelize.define("making_method_country", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const PackageTypeBrand = sequelize.define("package_type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TypePackageType = sequelize.define("package_type_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Country.hasMany(Item);
Item.belongsTo(Country);

Type.hasMany(Item);
Item.belongsTo(Type);

Brand.hasMany(Item);
Item.belongsTo(Brand);

MakingMethod.hasMany(Item);
Item.belongsTo(MakingMethod);

ManufacturingMethod.hasMany(Item);
Item.belongsTo(ManufacturingMethod);

TeaType.hasMany(Item);
Item.belongsTo(TeaType);

PackageType.hasMany(Item);
Item.belongsTo(PackageType);

Item.hasMany(ItemImg, { as: "image" });
ItemImg.belongsTo(Item);

Item.hasMany(ItemPrice, { as: "price" });
ItemPrice.belongsTo(Item);

User.hasOne(Token);
Token.belongsTo(User);

TypeBrand.belongsTo(Brand);
TypeBrand.belongsTo(Type);
TypeBrand.belongsTo(Item);

TypeTeaType.belongsTo(TeaType);
TypeTeaType.belongsTo(Type);
TypeTeaType.belongsTo(Item);

TypeManufacturingMethod.belongsTo(ManufacturingMethod);
TypeManufacturingMethod.belongsTo(Type);
TypeManufacturingMethod.belongsTo(Item);

TypeMakingMethod.belongsTo(MakingMethod);
TypeMakingMethod.belongsTo(Type);
TypeMakingMethod.belongsTo(Item);

TypeCountry.belongsTo(Country);
TypeCountry.belongsTo(Type);
TypeCountry.belongsTo(Item);

TypePackageType.belongsTo(PackageType);
TypePackageType.belongsTo(Type);
TypePackageType.belongsTo(Item);

Brand.belongsToMany(TeaType, { through: BrandTeaType });
TeaType.belongsToMany(Brand, { through: BrandTeaType });

Brand.belongsToMany(ManufacturingMethod, { through: BrandManufacturingMethod });
ManufacturingMethod.belongsToMany(Brand, { through: BrandManufacturingMethod });

Brand.belongsToMany(MakingMethod, { through: BrandMakingMethod });
MakingMethod.belongsToMany(Brand, { through: BrandMakingMethod });

Brand.belongsToMany(Country, { through: BrandCountry });
Country.belongsToMany(Brand, { through: BrandCountry });

TeaType.belongsToMany(ManufacturingMethod, {
  through: TeaTypeManufacturingMethod,
});
ManufacturingMethod.belongsToMany(TeaType, {
  through: TeaTypeManufacturingMethod,
});

TeaType.belongsToMany(MakingMethod, { through: TeaTypeMakingMethod });
MakingMethod.belongsToMany(TeaType, { through: TeaTypeMakingMethod });

TeaType.belongsToMany(Country, { through: TeaTypeCountry });
Country.belongsToMany(TeaType, { through: TeaTypeCountry });

ManufacturingMethod.belongsToMany(MakingMethod, {
  through: ManufacturingMethodMakingMethod,
});
MakingMethod.belongsToMany(ManufacturingMethod, {
  through: ManufacturingMethodMakingMethod,
});

ManufacturingMethod.belongsToMany(Country, {
  through: ManufacturingMethodCountry,
});
Country.belongsToMany(ManufacturingMethod, {
  through: ManufacturingMethodCountry,
});

MakingMethod.belongsToMany(Country, { through: MakingMethodCountry });
Country.belongsToMany(MakingMethod, { through: MakingMethodCountry });

PackageType.belongsToMany(Brand, { through: PackageTypeBrand });
Brand.belongsToMany(PackageType, { through: PackageTypeBrand });

module.exports = {
  User,
  Token,
  Item,
  ItemImg,
  ItemPrice,
  Type,
  Brand,
  Country,
  TeaType,
  PackageType,
  MakingMethod,
  ManufacturingMethod,
  TypeBrand,
  TypeTeaType,
  TypeManufacturingMethod,
  TypeMakingMethod,
  TypeCountry,
  BrandTeaType,
  BrandManufacturingMethod,
  BrandCountry,
  BrandMakingMethod,
  TeaTypeManufacturingMethod,
  TeaTypeCountry,
  TeaTypeMakingMethod,
  ManufacturingMethodCountry,
  ManufacturingMethodMakingMethod,
  MakingMethodCountry,
  PackageTypeBrand,
  TypePackageType,
};
