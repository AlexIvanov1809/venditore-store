import httpService from "../http.service";

const methodEndpoint = "coffeeMethods/";

const methodService = {
  get: async () => {
    const { data } = await httpService.get(methodEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(methodEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      methodEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(methodEndpoint + id);
    return data;
  }
};

export default methodService;
