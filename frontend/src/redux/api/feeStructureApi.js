// redux/api/feeStructureApi.js
import { apiSlice } from "./apiSlice";
export const feeStructureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveFeeStructures: builder.query({
      query: () => "/fee-structures/active",
    }),
  }),
});
export const { useGetActiveFeeStructuresQuery } = feeStructureApi;