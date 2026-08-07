import { apiSlice } from "./apiSlice";

export const studentApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        getStudents: builder.query({

    query: ({
        page = 1,
        limit = 10,
        search = "",
        studentClass = "",
        gender = "",
        status = "",
    }) => ({

        url: "/students",

        params: {
            page,
            limit,
            search,
            class: studentClass,
            gender,
            status,
        },

    }),

    providesTags: ["Student"],

}),

       getStudent: builder.query({

                query: (id) => `/students/${id}`,

                providesTags: ["Students"],

            }),
        createStudent: builder.mutation({

            query: (studentData) => ({

                url: "/students",

                method: "POST",

                body: studentData,

            }),

            invalidatesTags: ["Students"],

        }),

        updateStudent: builder.mutation({

            query: ({ id, ...data }) => ({

                url: `/students/${id}`,

                method: "PUT",

                body: data,

            }),

            invalidatesTags: ["Students"],

        }),


        uploadStudentPassport: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/students/${id}/passport`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Students", "Student"],
        }),

        deleteStudent: builder.mutation({

            query: (id) => ({

                url: `/students/${id}`,

                method: "DELETE",

            }),

            invalidatesTags: ["Students"],

        }),

    }),

});

export const {
    useGetStudentsQuery,
    useGetStudentQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    useUploadStudentPassportMutation,
} = studentApi;