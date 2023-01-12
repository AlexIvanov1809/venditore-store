import httpService from "../http.service";
import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "../../store/models/IFilters";

const methodEndpoint = "coffeeMethods/";

const methodService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(methodEndpoint);
    return data;
  },
  create: async (payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      methodEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      methodEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      methodEndpoint + id,
    );
    return data;
  },
};

export default methodService;
