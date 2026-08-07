import { apiSlice } from "./apiSlice";

export const financeApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /*
        |--------------------------------------------------------------------------
        | Get All Payments
        |--------------------------------------------------------------------------
        */

        getFinances: builder.query({

            query: ({
                page = 1,
                limit = 10,
                search = "",
                status = "",
                category = "",
            } = {}) =>

                `/finance?page=${page}&limit=${limit}&search=${search}&status=${status}&category=${category}`,

            providesTags: ["Finance"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Get Single Payment
        |--------------------------------------------------------------------------
        */

        getFinance: builder.query({

            query: (id) => `/finance/${id}`,

            providesTags: (result, error, id) => [

                { type: "Finance", id },

            ],

        }),

        /*
        |--------------------------------------------------------------------------
        | Create Payment
        |--------------------------------------------------------------------------
        */

        createFinance: builder.mutation({

            query: (body) => ({

                url: "/finance",

                method: "POST",

                body,

            }),

            invalidatesTags: ["Finance"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Update Payment
        |--------------------------------------------------------------------------
        */

        updateFinance: builder.mutation({

            query: ({ id, data }) => ({

                url: `/finance/${id}`,

                method: "PUT",

                body: data,

            }),

            invalidatesTags: ["Finance"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Delete Payment
        |--------------------------------------------------------------------------
        */

        deleteFinance: builder.mutation({

            query: (id) => ({

                url: `/finance/${id}`,

                method: "DELETE",

            }),

            invalidatesTags: ["Finance"],

        }),

    }),

});

export const {
    useGetFinancesQuery,
    useGetFinanceQuery,
    useCreateFinanceMutation,
    useUpdateFinanceMutation,
    useDeleteFinanceMutation,
} = financeApi;