import { apiSlice } from "./apiSlice";

export const activityApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /*
        |--------------------------------------------------------------------------
        | Dashboard Activity Timeline
        |--------------------------------------------------------------------------
        */

        getActivityTimeline: builder.query({

            query: () => ({

                url: "/activity",

            }),

            providesTags: ["Activity"],

            keepUnusedDataFor: 60,

        }),

    }),

});

export const {

    useGetActivityTimelineQuery,

} = activityApi;