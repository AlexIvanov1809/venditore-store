import httpService from "../http.service";
import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "../../store/models/IFilters";

const teaPackagesEndpoint = "teaPackages/";

const teaPackagesService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(
      teaPackagesEndpoint,
    );
    return data;
  },
  create: async (payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      teaPackagesEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      teaPackagesEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      teaPackagesEndpoint + id,
    );
    return data;
  },
};

export default teaPackagesService;
