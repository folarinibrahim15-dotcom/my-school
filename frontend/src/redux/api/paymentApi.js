import { apiSlice } from "./apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /*
    |--------------------------------------------------------------------------
    | Initialize Payment
    |--------------------------------------------------------------------------
    */

    initializePayment: builder.mutation({
      query: (body) => ({
        url: "/payments/initialize",
        method: "POST",
        body,
      }),
    }),

    /*
    |--------------------------------------------------------------------------
    | Verify Payment
    |--------------------------------------------------------------------------
    */

    initializeSchoolFeesPayment: builder.mutation({

        query:(body)=>({

            url:"/payments/school-fees",

            method:"POST",

            body,

        }),

    }),

    verifyPayment: builder.query({
      query: (reference) =>
        `/payments/verify/${reference}`,
    }),

    getPaymentReceipt: builder.query({

    query: (reference) =>

        `/payments/receipt/${reference}`,

}),

  }),
});

export const {
  useInitializePaymentMutation,
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
  useInitializeSchoolFeesPaymentMutation,
  useGetPaymentReceiptQuery,
} = paymentApi;