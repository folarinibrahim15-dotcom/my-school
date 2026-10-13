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
            const reduxToken = getState().auth?.token;

            const savedToken = localStorage.getItem("accessToken");

            const token = reduxToken || savedToken;

            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }

            // Do not force Content-Type here.
            // RTK Query handles JSON bodies automatically.
            // FormData requests need the browser to set
            // the appropriate multipart boundary.

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
        "Admissions",
        "Finance",
        "Notification",
        "News",
        "Event",
        "Testimonial",
    ],

    endpoints: () => ({}),
});