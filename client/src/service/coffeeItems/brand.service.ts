import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "../../store/models/IFilters";
import httpService from "../http.service";

const brandEndpoint = "coffeeBrands/";

const brandService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(brandEndpoint);
    return data;
  },
  create: async (payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      brandEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      brandEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      brandEndpoint + id,
    );
    return data;
  },
};

export default brandService;
