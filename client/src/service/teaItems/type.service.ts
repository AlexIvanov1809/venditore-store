import httpService from "../http.service";
import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "../../store/models/IFilters";

const teaTypeEndpoint = "teaTypes/";

const teaTypeService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(teaTypeEndpoint);
    return data;
  },
  create: async (payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      teaTypeEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      teaTypeEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      teaTypeEndpoint + id,
    );
    return data;
  },
};

export default teaTypeService;
