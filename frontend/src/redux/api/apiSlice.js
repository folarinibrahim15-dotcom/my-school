import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,

        credentials: "include",

        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;

            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }

            headers.set(
                "Content-Type",
                "application/json"
            );

            return headers;
        },
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
