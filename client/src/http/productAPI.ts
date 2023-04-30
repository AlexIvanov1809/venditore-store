import { IProductForEdit, IProductType } from '@/types/productTypes';
import { IFetchPayload } from '@/types/httpTypes';
import { $host, $productHost } from './index';

const TYPES_ENDPOINT = 'product-types';
const PRODUCT_ENDPOINT = 'product';
const PIC_ENDPOINT = 'pictures';
const PRICE_ENDPOINT = 'price';

interface Entity {
  name: string;
}

const httpService = {
  async createEntityItem(type: string, payload: Entity) {
    const { data } = await $host.post(`${TYPES_ENDPOINT}/${type}`, payload);

    return data;
  },

  async editEntityItem(type: string, id: number | string, payload: Entity) {
    const { data } = await $host.patch(`${TYPES_ENDPOINT}/${type}/${id}`, payload);

    return data;
  },

  async removeEntityItem(type: string, id: number | string) {
    const { data } = await $host.delete(`${TYPES_ENDPOINT}/${type}/${id}`);

    return data;
  },

  async fetchEntityFilterItems(type: string, typeId: number | string, signal: AbortSignal) {
    const { data } = await $host.get(`${TYPES_ENDPOINT}/${type}/filter/${typeId}`, { signal });

    return data;
  },

  async fetchEntityItems(type: string, signal: AbortSignal) {
    const { data } = await $host.get<IProductType[]>(`${TYPES_ENDPOINT}/${type}`, { signal });

    return data;
  },

  async createProduct(payload: FormData) {
    const { data } = await $host.post(PRODUCT_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  },
  async editProduct(payload: IProductForEdit) {
    const { data } = await $host.patch(`${PRODUCT_ENDPOINT}/${payload.id}`, payload);

    return data;
  },

  async removeProduct(id: number | string) {
    const { data } = await $host.delete(`${PRODUCT_ENDPOINT}/${id}`);

    return data;
  },

  async searchingProducts(search: string) {
    const { data } = await $productHost.get(`${PRODUCT_ENDPOINT}/search`, {
      params: {
        search
      }
    });
    return data;
  },

  async fetchProducts(payload?: IFetchPayload, signal?: AbortSignal) {
    const { data } = await $productHost.get(PRODUCT_ENDPOINT, {
      params: {
        ...payload
      },
      signal
    });

    return data;
  },
  async fetchOneProduct(id: number | string) {
    const { data } = await $productHost.get(`${PRODUCT_ENDPOINT}/${id}`);

    return data;
  },

  async createProductImage(productId: number | string, index: number, payload: File | FormData) {
    const { data } = await $host.post(`${PIC_ENDPOINT}/${productId}/${index}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  },
  async editProductImage(id: number | string, payload: File | FormData) {
    const { data } = await $host.patch(`${PIC_ENDPOINT}/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  },
  async removeProductImage(id: number | string) {
    const { data } = await $host.delete(`${PIC_ENDPOINT}/${id}`);

    return data;
  },
  async removePriceProduct(id: number | string) {
    const { data } = await $host.delete(`${PRICE_ENDPOINT}/${id}`);

    return data;
  }
};

export default httpService;
