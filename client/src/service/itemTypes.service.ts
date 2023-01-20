import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "../store/models/IFilters";
import httpService from "./http.service";

const endpoint = "itemTypes/coffeeBrand/";

const itemTypesService = {
  get: async (endpoint: string) => {
    const { data } = await httpService.get<GetFiltersResponse>(endpoint);
    return data;
  },
  create: async (endpoint: string, payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      endpoint,
      payload,
    );
    return data;
  },
  edit: async (endpoint: string, payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      endpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (endpoint: string, id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      endpoint + id,
    );
    return data;
  },
};

export default itemTypesService;
