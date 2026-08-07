import React, { useState } from "react";

import { useGetNotificationsQuery } from "../../../../../redux/api/notificationApi";

import NotificationToolbar from "../components/NotificationToolbar";
import NotificationStatistics from "../components/NotificationStatistics";
import NotificationTable from "../components/NotificationTable";
import NotificationPagination from "../components/NotificationPagination";

import AddNotificationModal from "../components/AddNotificationModal";
import EditNotificationModal from "../components/EditNotificationModal";
import DeleteNotificationModal from "../components/DeleteNotificationModal";

export default function Notifications() {

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedNotification, setSelectedNotification] = useState(null);

    const [filters, setFilters] = useState({

        search: "",
        type: "",
        priority: "",
        status: "",
        page: 1,
        limit: 10,

    });

    const {

        data,

        isLoading,

        error,

        refetch,

    } = useGetNotificationsQuery(filters);
    // console.log("Notifications Response:", data);

    const notifications = data?.notifications || [];

    const pagination = data?.pagination || {};

    if (isLoading) {

        return (

            <div className="bg-white rounded-xl shadow p-10 text-center">

                Loading notifications...

            </div>

        );

    }

    if (error) {

        return (

            <div className="bg-red-50 border border-red-200 rounded-xl p-10 text-center text-red-600">

                Failed to load notifications.

            </div>

        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Notifications

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Manage system notifications.

                    </p>

                </div>

                <button

                    onClick={() => setShowAddModal(true)}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"

                >

                    + Create Notification

                </button>

            </div>

            {/* Toolbar */}

            <NotificationToolbar

                filters={filters}

                setFilters={setFilters}

                notifications={notifications}

            />

            {/* Statistics */}

            <NotificationStatistics

                notifications={notifications}

            />

            {/* Table */}

            <NotificationTable

                notifications={notifications}

                onEdit={(notification) => {

                    setSelectedNotification(notification);

                    setShowEditModal(true);

                }}

                onDelete={(notification) => {

                    setSelectedNotification(notification);

                    setShowDeleteModal(true);

                }}

            />

            {/* Pagination */}

            <NotificationPagination

                page={pagination.page || 1}

                pages={pagination.pages || 1}

                total={pagination.total || 0}

                setFilters={setFilters}

            />

            {/* Add Modal */}

            <AddNotificationModal

                isOpen={showAddModal}

                onClose={() => {

                    setShowAddModal(false);

                    refetch();

                }}

            />

            {/* Edit Modal */}

            <EditNotificationModal

                isOpen={showEditModal}

                notification={selectedNotification}

                onClose={() => {

                    setShowEditModal(false);

                    setSelectedNotification(null);

                    refetch();

                }}

            />

            {/* Delete Modal */}

            <DeleteNotificationModal

                isOpen={showDeleteModal}

                notification={selectedNotification}

                onClose={() => {

                    setShowDeleteModal(false);

                    setSelectedNotification(null);

                    refetch();

                }}

            />

        </div>

    );

}