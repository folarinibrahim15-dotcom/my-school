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
      invalidatesTags: ["Payments"],
    }),

    initializeSchoolFeesPayment: builder.mutation({
        query:(body)=>({
            url:"/payments/school-fees",
            method:"POST",
            body,
        }),
        invalidatesTags: ["Payments"],
    }),

    verifyPayment: builder.query({
      query: (reference) => `/payments/verify/${reference}`,
    }),

    getPaymentReceipt: builder.query({
        query: (reference) => `/payments/receipt/${reference}`,
    }),

    /*
    |--------------------------------------------------------------------------
    | GET ALL PAYMENTS - ADDED FOR FINANCE STATS
    |--------------------------------------------------------------------------
    */
    getPayments: builder.query({
      query: (params = {}) => ({
        url: "/payments",
        params,
      }),
      providesTags: ["Payments"],
    }),

  }),
});

export const {
  useInitializePaymentMutation,
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
  useInitializeSchoolFeesPaymentMutation,
  useGetPaymentReceiptQuery,
  useGetPaymentsQuery, // NOW EXPORTED
} = paymentApi;