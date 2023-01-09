import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config.json";
import { ICoffeeBrand } from "../../store/models/ICoffeeBrand";

export const coffeeBrandAPI = createApi({
  reducerPath: "coffeeBrandAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: config.endpoint,
  }),
  tagTypes: ["CoffeeBrand"],
  endpoints: (build) => ({
    fetchAllCoffeeBrands: build.query<ICoffeeBrand[], number>({
      query: () => ({
        url: "/coffeeBrands",
      }),
      providesTags: (result) => ["CoffeeBrand"],
    }),
  }),
});
