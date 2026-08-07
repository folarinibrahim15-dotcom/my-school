import {

    createApi,

    fetchBaseQuery,

} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({

    reducerPath: "api",

    baseQuery: fetchBaseQuery({

        baseUrl: import.meta.env.VITE_API_URL,

        credentials: "include",

    }),

    tagTypes: [

        "User",

        "CurrentUser",

        "Student",

        "Teacher",

        "Parent",

        "Admission",

        "Finance",

        "Notification",

        "News",

        "Event",

        "Testimonial",

    ],

    endpoints: () => ({}),

});