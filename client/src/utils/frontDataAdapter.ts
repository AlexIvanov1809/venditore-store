import { IResponseProduct } from '@/types/httpTypes';
import { IProduct } from '@/types/productTypes';

export default function frontDataAdapter(response: IResponseProduct[]): IProduct[] {
  const normalizeData = response.reduce((acc, product) => {
    const data = {
      id: product.id,
      sortName: product.sortName,
      description: product.description,
      shortDescription: product.shortDescription,
      acidity: product.acidity,
      density: product.density,
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      countryId: product.countryId,
      typeId: product.typeId,
      brandId: product.brandId,
      makingMethodId: product.makingMethodId,
      manufacturingMethodId: product.manufacturingMethodId,
      teaTypeId: product.teaTypeId,
      packageTypeId: product.packageTypeId,
      image: product.image,
      price: product.price,
      type: product.type.name,
      brand: product.brand.name,
      country: product.country ? product.country.name : null,
      makingMethod: product.making_method ? product.making_method.name : null,
      manufacturingMethod: product.manufacturing_method ? product.manufacturing_method.name : null,
      teaType: product.tea_type ? product.tea_type.name : null,
      packageType: product.package_type ? product.package_type.name : null
    };

    return [...acc, data];
  }, [] as IProduct[]);

  return normalizeData;
}
