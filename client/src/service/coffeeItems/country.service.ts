import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "./../../store/models/IFilters";
import httpService from "../http.service";

const countryEndpoint = "coffeeCounties/";

const countryService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(countryEndpoint);
    return data;
  },
  create: async (payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      countryEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      countryEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      countryEndpoint + id,
    );
    return data;
  },
};

export default countryService;
