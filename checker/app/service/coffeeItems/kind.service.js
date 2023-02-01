import httpService from "../http.service";

const kindEndpoint = "coffeeKinds/";

const kindService = {
  get: async () => {
    const { data } = await httpService.get(kindEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(kindEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      kindEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(kindEndpoint + id);
    return data;
  }
};

export default kindService;
