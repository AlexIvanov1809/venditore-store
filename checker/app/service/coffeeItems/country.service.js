import httpService from "../http.service";

const countryEndpoint = "coffeeCounties/";

const countryService = {
  get: async () => {
    const { data } = await httpService.get(countryEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(countryEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      countryEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(countryEndpoint + id);
    return data;
  }
};

export default countryService;
