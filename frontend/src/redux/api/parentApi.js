import { apiSlice } from "./apiSlice";

export const parentApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /*
        |--------------------------------------------------------------------------
        | Get All Parents
        |--------------------------------------------------------------------------
        */

       getParents: builder.query({

            query: ({

                page = 1,

                limit = 10,

                search = "",

                relationship = "",

                gender = "",

                occupation = "",


            } = {}) =>

            `/parents?page=${page}&limit=${limit}&search=${search}&relationship=${relationship}&gender=${gender}&occupation=${occupation}`,


            providesTags:["Parent"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Get Single Parent
        |--------------------------------------------------------------------------
        */

        getParent: builder.query({

            query: (id) => `/parents/${id}`,

            providesTags: (result, error, id) => [

                { type: "Parent", id },

            ],

        }),

        /*
        |--------------------------------------------------------------------------
        | Create Parent
        |--------------------------------------------------------------------------
        */

        createParent: builder.mutation({

            query: (body) => ({

                url: "/parents",

                method: "POST",

                body,

            }),

            invalidatesTags: ["Parent"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Update Parent
        |--------------------------------------------------------------------------
        */

    updateParent: builder.mutation({

            query: ({ id, ...data }) => ({

                url: `/parents/${id}`,

                method: "PUT",

                body: data,

            }),

            invalidatesTags: ["Parents"],

        }),
        /*
        |--------------------------------------------------------------------------
        | Delete Parent
        |--------------------------------------------------------------------------
        */

        deleteParent: builder.mutation({

            query: (id) => ({

                url: `/parents/${id}`,

                method: "DELETE",

            }),

            invalidatesTags: ["Parent"],

        }),

    }),

});

export const {

    useGetParentsQuery,

    useGetParentQuery,

    useCreateParentMutation,

    useUpdateParentMutation,

    useDeleteParentMutation,

} = parentApi;