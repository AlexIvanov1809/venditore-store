import httpService from "../http.service";

const teaTypeEndpoint = "teaTypes/";

const teaTypeService = {
  get: async () => {
    const { data } = await httpService.get(teaTypeEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(teaTypeEndpoint, payload);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      teaTypeEndpoint + payload._id,
      payload
    );
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(teaTypeEndpoint + id);
    return data;
  }
};

export default teaTypeService;
