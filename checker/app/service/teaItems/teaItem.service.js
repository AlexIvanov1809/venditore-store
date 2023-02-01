import httpService from "../http.service";

const teaItemEndpoint = "teaItems/";

const teaItemService = {
  get: async () => {
    const { data } = await httpService.get(teaItemEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(teaItemEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      teaItemEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(teaItemEndpoint + id);
    return data;
  }
};

export default teaItemService;
