import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    /*
    |--------------------------------------------------------------------------
    | Get All Users
    |--------------------------------------------------------------------------
    */

    getUsers: builder.query({

      query: () => "/users",

      providesTags: ["Users"],

    }),

    /*
    |--------------------------------------------------------------------------
    | Get Single User
    |--------------------------------------------------------------------------
    */

    getUser: builder.query({

      query: (id) => `/users/${id}`,

      providesTags: (result, error, id) => [
        { type: "Users", id },
      ],

    }),

    /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    */

    createUser: builder.mutation({

      query: (body) => ({

        url: "/users",

        method: "POST",

        body,

      }),

      invalidatesTags: ["Users"],

    }),

    /*
    |--------------------------------------------------------------------------
    | Update User
    |--------------------------------------------------------------------------
    */

    updateUser: builder.mutation({

      query: ({ id, ...body }) => ({

        url: `/users/${id}`,

        method: "PUT",

        body,

      }),

      invalidatesTags: ["Users"],

    }),

    /*
    |--------------------------------------------------------------------------
    | Update Role
    |--------------------------------------------------------------------------
    */

    updateUserRole: builder.mutation({

      query: ({ id, role }) => ({

        url: `/users/${id}/role`,

        method: "PATCH",

        body: { role },

      }),

      invalidatesTags: ["Users"],

    }),

    /*
    |--------------------------------------------------------------------------
    | Activate / Deactivate User
    |--------------------------------------------------------------------------
    */

    updateUserStatus: builder.mutation({

      query: ({ id, isActive }) => ({

        url: `/users/${id}/status`,

        method: "PATCH",

        body: { isActive },

      }),

      invalidatesTags: ["Users"],

    }),

    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    deleteUser: builder.mutation({

      query: (id) => ({

        url: `/users/${id}`,

        method: "DELETE",

      }),

      invalidatesTags: ["Users"],

    }),

  }),

});

export const {

  useGetUsersQuery,

  useGetUserQuery,

  useCreateUserMutation,

  useUpdateUserMutation,

  useUpdateUserRoleMutation,

  useUpdateUserStatusMutation,

  useDeleteUserMutation,

} = userApi;