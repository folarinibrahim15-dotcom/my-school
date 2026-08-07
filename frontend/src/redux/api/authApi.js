// import { apiSlice } from "./apiSlice";

// export const authApi = apiSlice.injectEndpoints({

//     endpoints: (builder) => ({

//         login: builder.mutation({

//             query: (credentials) => ({

//                 url: "/auth/login",

//                 method: "POST",

//                 body: credentials,

//                 credentials: "include",

//             }),

//         }),

//         logout: builder.mutation({

//             query: () => ({

//                 url: "/auth/logout",

//                 method: "POST",

//                 credentials: "include",

//             }),

//         }),

//         getCurrentUser: builder.query({

//             query: () => ({

//                 url: "/auth/me",

//                 credentials: "include",

//             }),

//         }),

//     }),

// });

// export const {

//     useLoginMutation,

//     useLogoutMutation,

//     useGetCurrentUserQuery,

// } = authApi;

import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /*
    |--------------------------------------------------------------------------
    | Register
    |--------------------------------------------------------------------------
    */

    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    
    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),


    /*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

forgotPassword: builder.mutation({
  query: (email) => ({
    url: "/auth/forgot-password",
    method: "POST",
    body: { email },
    credentials: "include",
  }),
}),

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

resetPassword: builder.mutation({
  query: ({ token, password }) => ({
    url: `/auth/reset-password/${token}`,
    method: "PUT",
    body: {
      password,
    },
    credentials: "include",
  }),
}),


    /*
    |--------------------------------------------------------------------------
    | Refresh Token
    |--------------------------------------------------------------------------
    */

    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      }),
    }),

    

    /*
    |--------------------------------------------------------------------------
    | Current Logged-in User
    |--------------------------------------------------------------------------
    */

    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        credentials: "include",
      }),
      providesTags: ["CurrentUser"],
    }),

  }),
});

export const {

  useRegisterMutation,

  useLoginMutation,

  useLogoutMutation,

  useForgotPasswordMutation,

  useResetPasswordMutation,

  useRefreshTokenMutation,

  useGetCurrentUserQuery,

} = authApi;