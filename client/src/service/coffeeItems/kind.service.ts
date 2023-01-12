import httpService from "../http.service";
import {
  AllFiltersResponse,
  GetFiltersResponse,
  RemoveFiltersResponse,
  IFilters,
  ICreateFilters,
} from "../../store/models/IFilters";

const kindEndpoint = "coffeeKinds/";

const kindService = {
  get: async () => {
    const { data } = await httpService.get<GetFiltersResponse>(kindEndpoint);
    return data;
  },
  create: async (payload: ICreateFilters) => {
    const { data } = await httpService.post<AllFiltersResponse>(
      kindEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: IFilters) => {
    const { data } = await httpService.patch<AllFiltersResponse>(
      kindEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveFiltersResponse>(
      kindEndpoint + id,
    );
    return data;
  },
};

export default kindService;
