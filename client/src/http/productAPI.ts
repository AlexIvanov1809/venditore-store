import { IProductForEdit, IProductType } from '@/types/productTypes';
import { $authHost, $host } from './index';
import { IFetchPayload } from '@/types/httpTypes';

const TYPES_ENDPOINT = 'v1/productTypes';
const PRODUCT_ENDPOINT = 'v1/product';
const PIC_ENDPOINT = 'v1/pictures';
const PRICE_ENDPOINT = 'v1/price';

interface Entity {
  name: string;
}

const httpService = {
  async createEntityItem(type: string, payload: Entity) {
    const { data } = await $authHost.post(`${TYPES_ENDPOINT}/${type}`, payload);

    return data;
  },

  async editEntityItem(type: string, id: number | string, payload: Entity) {
    const { data } = await $authHost.patch(`${TYPES_ENDPOINT}/${type}/${id}`, payload);

    return data;
  },

  async removeEntityItem(type: string, id: number | string) {
    const { data } = await $authHost.delete(`${TYPES_ENDPOINT}/${type}/${id}`);

    return data;
  },

  async fetchEntityFilterItems(type: string, typeId: number | string) {
    const { data } = await $host.get(`${TYPES_ENDPOINT}/${type}/filter/${typeId}`);

    return data;
  },

  async fetchEntityItems(type: string) {
    const { data } = await $host.get<IProductType[]>(`${TYPES_ENDPOINT}/${type}`);

    return data;
  },

  async createProduct(payload: FormData) {
    const { data } = await $authHost.post(PRODUCT_ENDPOINT, payload);

    return data;
  },
  async editProduct(payload: IProductForEdit) {
    const { data } = await $authHost.patch(`${PRODUCT_ENDPOINT}/${payload.id}`, payload);

    return data;
  },

  async removeProduct(id: number | string) {
    const { data } = await $authHost.delete(`${PRODUCT_ENDPOINT}/${id}`);

    return data;
  },

  async fetchProducts(payload?: IFetchPayload) {
    const { data } = await $host.get(PRODUCT_ENDPOINT, {
      params: {
        ...payload
      }
    });

    return data;
  },
  async fetchOneProduct(id: number | string) {
    const { data } = await $host.get(`${PRODUCT_ENDPOINT}/${id}`);

    return data;
  },

  async createProductImage(productId: number | string, index: number, payload: File | FormData) {
    const { data } = await $authHost.post(`${PIC_ENDPOINT}/${productId}/${index}`, payload);

    return data;
  },
  async editProductImage(id: number | string, payload: File | FormData) {
    const { data } = await $authHost.patch(`${PIC_ENDPOINT}/${id}`, payload);

    return data;
  },
  async removeProductImage(id: number | string) {
    const { data } = await $authHost.delete(`${PIC_ENDPOINT}/${id}`);

    return data;
  },
  async removePriceProduct(id: number | string) {
    const { data } = await $authHost.delete(`${PRICE_ENDPOINT}/${id}`);

    return data;
  }
};

export default httpService;
