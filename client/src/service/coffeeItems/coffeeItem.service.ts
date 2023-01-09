import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoffeeItem } from "../../store/models/ICoffeeItem";
import config from "../../config.json";

export const coffeeItemAPI = createApi({
  reducerPath: "coffeeItemAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: config.endpoint,
  }),
  tagTypes: ["CoffeeItem"],
  endpoints: (build) => ({
    fetchAllCoffeeItems: build.query<ICoffeeItem[], void>({
      query: () => ({
        url: "/coffeeItems",
      }),
      providesTags: (result) => ["CoffeeItem"],
    }),
  }),
});
