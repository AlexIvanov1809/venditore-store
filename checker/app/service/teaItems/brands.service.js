import httpService from "../http.service";

const teaBrandsEndpoint = "teaBrands/";

const teaBrandsService = {
  get: async () => {
    const { data } = await httpService.get(teaBrandsEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(teaBrandsEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      teaBrandsEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(teaBrandsEndpoint + id);
    return data;
  }
};

export default teaBrandsService;
