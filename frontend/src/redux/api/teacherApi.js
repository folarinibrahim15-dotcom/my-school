import { apiSlice } from "./apiSlice";

export const teacherApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /*
        |--------------------------------------------------------------------------
        | Get All Teachers
        |--------------------------------------------------------------------------
        */

        getTeachers: builder.query({

            query: ({
                page = 1,
                limit = 10,
                search = "",
                department = "",
                status = "",
            } = {}) =>

                `/teachers?page=${page}&limit=${limit}&search=${search}&department=${department}&status=${status}`,

            providesTags: ["Teacher"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Get Single Teacher
        |--------------------------------------------------------------------------
        */

        getTeacher: builder.query({

            query: (id) => `/teachers/${id}`,

            providesTags: (result, error, id) => [

                { type: "Teacher", id },

            ],

        }),

        /*
        |--------------------------------------------------------------------------
        | Create Teacher
        |--------------------------------------------------------------------------
        */

        createTeacher: builder.mutation({

            query: (body) => ({

                url: "/teachers",

                method: "POST",

                body,

            }),

            invalidatesTags: ["Teacher"],

        }),

        /*
        |--------------------------------------------------------------------------
        | Update Teacher
        |--------------------------------------------------------------------------
        */

        updateTeacher: builder.mutation({

            query: ({ id, data }) => ({

                url: `/teachers/${id}`,

                method: "PUT",

                body: data,

            }),

            invalidatesTags: ["Teacher"],

        }),

        getTeacherDashboardStats: builder.query({
            query: () => ({
                url: "/teachers/dashboard",
            }),
            providesTags: ["Teacher"],
        }),

        /*
        |--------------------------------------------------------------------------
        | Delete Teacher
        |--------------------------------------------------------------------------
        */

        deleteTeacher: builder.mutation({

            query: (id) => ({

                url: `/teachers/${id}`,

                method: "DELETE",

            }),

            invalidatesTags: ["Teacher"],

        }),

    }),

});

export const {

    useGetTeachersQuery,

    useGetTeacherQuery,

    useCreateTeacherMutation,

    useUpdateTeacherMutation,

    useGetTeacherDashboardStatsQuery,

    useDeleteTeacherMutation,

} = teacherApi;