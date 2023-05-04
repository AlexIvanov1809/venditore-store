import { IResponseProduct } from '@/types/httpTypes';
import { IProduct } from '@/types/productTypes';

function checkNull(data: null | { name: string }): string | null {
  return data ? data.name : null;
}

export default function frontDataAdapter(response: IResponseProduct[]): IProduct[] {
  const normalizeData = response.map((product) => ({
    id: product.id,
    sortName: product.sortName,
    fullName: product.fullName,
    minPriceValue: product.minPriceValue,
    description: product.description,
    shortDescription: product.shortDescription,
    acidity: product.acidity,
    density: product.density,
    active: product.active,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    countryId: product.countryId,
    typeId: product.typeId ? product.typeId : '',
    brandId: product.brandId ? product.brandId : '',
    makingMethodId: product.makingMethodId,
    manufacturingMethodId: product.manufacturingMethodId,
    teaTypeId: product.teaTypeId,
    packageTypeId: product.packageTypeId,
    images: product.images,
    prices: product.prices,
    type: product.type ? product.type.name : '',
    brand: product.brand ? product.brand.name : '',
    country: checkNull(product.country),
    makingMethod: checkNull(product.making_method),
    manufacturingMethod: checkNull(product.manufacturing_method),
    teaType: checkNull(product.tea_type),
    packageType: checkNull(product.package_type)
  }));

  return normalizeData;
}
