import { apiSlice } from "./apiSlice";

export const admissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    /*
    |--------------------------------------------------------------------------
    | Create Admission (Public)
    |--------------------------------------------------------------------------
    */
    createAdmission: builder.mutation({
      query: (body) => ({
        url: "/admissions",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Admissions"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Get All Admissions
    |--------------------------------------------------------------------------
    */
    getAdmissions: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        classApplyingFor = "",
      } = {}) => ({
        url: "/admissions",
        params: {
          page,
          limit,
          search,
          status,
          classApplyingFor,
        },
      }),

      providesTags: ["Admissions"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Get Single Admission
    |--------------------------------------------------------------------------
    */
    getAdmission: builder.query({
      query: (id) => `/admissions/${id}`,

      providesTags: (result, error, id) => [
        { type: "Admissions", id },
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Update Admission
    |--------------------------------------------------------------------------
    */
    updateAdmission: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admissions/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (result, error, { id }) => [
        "Admissions",
        { type: "Admissions", id },
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Update Admission Status
    |--------------------------------------------------------------------------
    */
    updateAdmissionStatus: builder.mutation({
      query: ({ id, status, remarks }) => ({
        url: `/admissions/${id}/status`,
        method: "PATCH",
        body: {
          status,
          remarks,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        "Admissions",
        { type: "Admissions", id },
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Upload Admission Document
    |--------------------------------------------------------------------------
    */
    uploadAdmissionDocument: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admissions/${id}/document`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: (result, error, { id }) => [
        "Admissions",
        { type: "Admissions", id },
      ],
    }),

    /*
    |--------------------------------------------------------------------------
    | Delete Admission
    |--------------------------------------------------------------------------
    */
    deleteAdmission: builder.mutation({
      query: (id) => ({
        url: `/admissions/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Admissions"],
    }),

  }),
});

export const {
  useCreateAdmissionMutation,
  useGetAdmissionsQuery,
  useGetAdmissionQuery,
  useUpdateAdmissionMutation,
  useUpdateAdmissionStatusMutation,
  useUploadAdmissionDocumentMutation,
  useDeleteAdmissionMutation,
} = admissionApi;