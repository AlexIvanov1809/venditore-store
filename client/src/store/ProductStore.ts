import { IProduct, IProductType, SortTypes } from '@/types/productTypes';
import orderBy from 'lodash.orderby';
import { makeAutoObservable, runInAction } from 'mobx';

export default class ProductStore {
  private _types: IProductType[];

  private _brands: IProductType[];

  private _countries: IProductType[];

  private _makingMethods: IProductType[];

  private _manufacturingMethods: IProductType[];

  private _teaTypes: IProductType[];

  private _packageTypes: IProductType[];

  private _products: IProduct[] | IProduct;

  private _selectedType: string | number;

  private _selectedBrand: string | undefined;

  private _selectedCountry: string | undefined;

  private _selectedMakingMethod: string | undefined;

  private _selectedManufacturingMethod: string | undefined;

  private _selectedTeaType: string | undefined;

  private _selectedPackageType: string | undefined;

  private _page: number;

  private _totalCount: number;

  private _limit: number;

  constructor() {
    this._types = [];
    this._brands = [];
    this._countries = [];
    this._makingMethods = [];
    this._manufacturingMethods = [];
    this._teaTypes = [];
    this._packageTypes = [];

    this._products = [];
    this._selectedType = '';
    this._selectedBrand = '';
    this._selectedCountry = '';
    this._selectedMakingMethod = '';
    this._selectedManufacturingMethod = '';
    this._selectedTeaType = '';
    this._selectedPackageType = '';
    this._page = 1;
    this._totalCount = 0;
    this._limit = 9;
    makeAutoObservable(this);
  }

  setTypes(types: IProductType[]) {
    this._types = types;
  }

  setBrands(brands: IProductType[]) {
    this._brands = brands;
  }

  setCountries(countries: IProductType[]) {
    this._countries = countries;
  }

  setMakingMethods(makingMethods: IProductType[]) {
    this._makingMethods = makingMethods;
  }

  setManufacturingMethods(manufacturingMethods: IProductType[]) {
    this._manufacturingMethods = manufacturingMethods;
  }

  setTeaTypes(teaTypes: IProductType[]) {
    this._teaTypes = teaTypes;
  }

  setPackageTypes(packageTypes: IProductType[]) {
    this._packageTypes = packageTypes;
  }

  setProducts(products: IProduct[]) {
    this._products = products;
  }

  setPage(page: number) {
    runInAction(() => {
      this._page = page;
    });
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
  }

  setSelectedType(type: number | string) {
    this._selectedType = type;
  }

  setSelectedBrand(brand: string) {
    this._selectedBrand = brand;
  }

  setSelectedCountry(country: string) {
    this._selectedCountry = country;
  }

  setSelectedMakingMethod(makingMethod: string) {
    this._selectedMakingMethod = makingMethod;
  }

  setSelectedManufacturingMethod(manufacturingMethod: string) {
    this._selectedManufacturingMethod = manufacturingMethod;
  }

  setSelectedTeaType(teaType: string) {
    this._selectedTeaType = teaType;
  }

  setSelectedPackageType(packageType: string) {
    this._selectedPackageType = packageType;
  }

  productSorting(type: keyof SortTypes, sort: 'asc' | 'desc') {
    if (this._products) {
      this._products = orderBy(this._products, type, sort);
    }
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get countries() {
    return this._countries;
  }

  get makingMethods() {
    return this._makingMethods;
  }

  get manufacturingMethods() {
    return this._manufacturingMethods;
  }

  get teaTypes() {
    return this._teaTypes;
  }

  get packageTypes() {
    return this._packageTypes;
  }

  get products() {
    return this._products;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get totalCount() {
    return this._totalCount;
  }

  get selectedType() {
    this.setPage(1);
    return this._selectedType;
  }

  get selectedBrand() {
    this.setPage(1);
    return this._selectedBrand;
  }

  get selectedCountry() {
    this.setPage(1);
    return this._selectedCountry;
  }

  get selectedMakingMethod() {
    this.setPage(1);
    return this._selectedMakingMethod;
  }

  get selectedManufacturingMethod() {
    this.setPage(1);
    return this._selectedManufacturingMethod;
  }

  get selectedTeaType() {
    this.setPage(1);
    return this._selectedTeaType;
  }

  get selectedPackageType() {
    this.setPage(1);
    return this._selectedPackageType;
  }
}
