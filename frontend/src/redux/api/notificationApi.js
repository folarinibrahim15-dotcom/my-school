import { apiSlice } from "./apiSlice";

export const notificationApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        // Get all notifications
        getNotifications: builder.query({

            query: (params = {}) => ({

                url: "/notifications",

                params

            }),

            providesTags: ["Notification"]

        }),

        // Get single notification
        getNotification: builder.query({

            query: (id) => `/notifications/${id}`,

            providesTags: ["Notification"]

        }),

        // Create notification
        addNotification: builder.mutation({

            query: (body) => ({

                url: "/notifications",

                method: "POST",

                body

            }),

            invalidatesTags: ["Notification"]

        }),

        // Update notification
        updateNotification: builder.mutation({

            query: ({ id, body }) => ({

                url: `/notifications/${id}`,

                method: "PUT",

                body

            }),

            invalidatesTags: ["Notification"]

        }),

        // Delete notification
        deleteNotification: builder.mutation({

            query: (id) => ({

                url: `/notifications/${id}`,

                method: "DELETE"

            }),

            invalidatesTags: ["Notification"]

        }),

        // Mark as read
        markNotificationAsRead: builder.mutation({

            query: (id) => ({

                url: `/notifications/${id}/read`,

                method: "PATCH"

            }),

            invalidatesTags: ["Notification"]

        }),

        // Mark all as read
        markAllNotificationsAsRead: builder.mutation({

            query: () => ({

                url: "/notifications/read-all",

                method: "PATCH"

            }),

            invalidatesTags: ["Notification"]

        }),

        // Unread count
        getUnreadNotificationCount: builder.query({

            query: () => "/notifications/unread-count",

            providesTags: ["Notification"]

        })

    })

});

export const {

    useGetNotificationsQuery,

    useGetNotificationQuery,

    useAddNotificationMutation,

    useUpdateNotificationMutation,

    useDeleteNotificationMutation,

    useMarkNotificationAsReadMutation,

    useMarkAllNotificationsAsReadMutation,

    useGetUnreadNotificationCountQuery

} = notificationApi;