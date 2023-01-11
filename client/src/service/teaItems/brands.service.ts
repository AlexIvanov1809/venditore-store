import httpService from "../http.service";
import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
} from "../../store/models/IFilters";

const teaBrandsEndpoint = "teaBrands/";

const teaBrandsService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(
      teaBrandsEndpoint,
    );
    return data;
  },
  create: async (payload: IFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      teaBrandsEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      teaBrandsEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      teaBrandsEndpoint + id,
    );
    return data;
  },
};

export default teaBrandsService;
