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

const Product = sequelize.define("product", {
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

const ProductImg = sequelize.define("product_img", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  row: { type: DataTypes.INTEGER, allowNull: false },
});

const ProductPrice = sequelize.define("product_price", {
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

const TypePackageType = sequelize.define("package_type_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Country.hasMany(Product);
Product.belongsTo(Country);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

MakingMethod.hasMany(Product);
Product.belongsTo(MakingMethod);

ManufacturingMethod.hasMany(Product);
Product.belongsTo(ManufacturingMethod);

TeaType.hasMany(Product);
Product.belongsTo(TeaType);

PackageType.hasMany(Product);
Product.belongsTo(PackageType);

Product.hasMany(ProductImg, { as: "image" });
ProductImg.belongsTo(Product);

Product.hasMany(ProductPrice, { as: "price" });
ProductPrice.belongsTo(Product);

User.hasOne(Token);
Token.belongsTo(User);

TypeBrand.belongsTo(Brand);
TypeBrand.belongsTo(Type);
TypeBrand.belongsTo(Product);

TypeTeaType.belongsTo(TeaType);
TypeTeaType.belongsTo(Type);
TypeTeaType.belongsTo(Product);

TypeManufacturingMethod.belongsTo(ManufacturingMethod);
TypeManufacturingMethod.belongsTo(Type);
TypeManufacturingMethod.belongsTo(Product);

TypeMakingMethod.belongsTo(MakingMethod);
TypeMakingMethod.belongsTo(Type);
TypeMakingMethod.belongsTo(Product);

TypeCountry.belongsTo(Country);
TypeCountry.belongsTo(Type);
TypeCountry.belongsTo(Product);

TypePackageType.belongsTo(PackageType);
TypePackageType.belongsTo(Type);
TypePackageType.belongsTo(Product);

module.exports = {
  User,
  Token,
  Product,
  ProductImg,
  ProductPrice,
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
  TypePackageType,
};
