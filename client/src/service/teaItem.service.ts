import { ITeaItem } from "../models/ITeaItem";
import httpService from "./http.service";

interface GetResponse {
  content: ITeaItem[];
}
interface AllResponse {
  content: ITeaItem;
}
interface RemoveResponse {
  content: null | string;
}

const teaItemEndpoint = "teaItems/";

const teaItemService = {
  get: async () => {
    const { data } = await httpService.get<GetResponse>(teaItemEndpoint);
    return data;
  },
  create: async (payload: ITeaItem) => {
    const { data } = await httpService.post<AllResponse>(
      teaItemEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: ITeaItem) => {
    const { data } = await httpService.patch<AllResponse>(
      teaItemEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveResponse>(
      teaItemEndpoint + id,
    );
    return data;
  },
};

export default teaItemService;
