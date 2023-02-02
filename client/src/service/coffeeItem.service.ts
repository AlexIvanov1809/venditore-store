import { ICoffeeItem, ICreateCoffeeItem } from "../models/ICoffeeItem";
import httpService from "./http.service";

interface GetResponse {
  content: ICoffeeItem[];
}
interface AllResponse {
  content: ICoffeeItem;
}
interface RemoveResponse {
  content: null | string;
}

const coffeeItemEndpoint = "coffeeItems/";

const coffeeItemService = {
  get: async () => {
    const { data } = await httpService.get<GetResponse>(coffeeItemEndpoint);
    return data;
  },
  create: async (payload: ICreateCoffeeItem) => {
    const { data } = await httpService.post<AllResponse>(
      coffeeItemEndpoint,
      payload,
    );
    return data;
  },
  edit: async (payload: ICoffeeItem) => {
    const { data } = await httpService.patch<AllResponse>(
      coffeeItemEndpoint + payload._id,
      payload,
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await httpService.delete<RemoveResponse>(
      coffeeItemEndpoint + id,
    );
    return data;
  },
};

export default coffeeItemService;
