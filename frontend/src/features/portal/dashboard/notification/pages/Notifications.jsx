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
    search: "", type: "", priority: "", status: "", page: 1, limit: 10,
  });

  const { data, isLoading, error, refetch } = useGetNotificationsQuery(filters);
  const notifications = data?.notifications || [];
  const pagination = data?.pagination || {};

  if (isLoading) {
    return (
      <div style={{ background:"#fff", borderRadius:"12px", padding:"20px", textAlign:"center", marginLeft:"12px", width:"310px", maxWidth:"92vw", boxSizing:"border-box" }}>
        Loading notifications...
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:"12px", padding:"20px", textAlign:"center", color:"#DC2626", marginLeft:"12px", width:"310px", maxWidth:"92vw", boxSizing:"border-box" }}>
        Failed to load notifications.
      </div>
    );
  }

  return (
    <>
      <style>{`
        .notif-page{width:100%; box-sizing:border-box; padding:0; display:flex; flex-direction:column; gap:10px;}
        .notif-header{display:flex; flex-direction:column; align-items:flex-start; gap:8px; padding:12px 0 4px 12px; box-sizing:border-box; width:310px; max-width:92vw;}
        .notif-title{margin:0; font-size:18px; font-weight:800; color:#0F172A; line-height:1.2;}
        .notif-sub{margin:2px 0 0 0; font-size:12px; color:#64748B;}
        .notif-btn{width:auto; background:#2563EB; color:#fff; border:none; padding:8px 14px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;}
        .notif-btn:active{transform:scale(.98);}
        .notif-section{width:100%; box-sizing:border-box;}
        @media(min-width:768px){
          .notif-page{padding:16px; gap:16px;}
          .notif-header{width:100%; max-width:100%; flex-direction:row; justify-content:space-between; align-items:center; padding:0;}
          .notif-title{font-size:28px;}
          .notif-sub{font-size:14px;}
          .notif-btn{padding:10px 20px; font-size:14px; border-radius:10px;}
          .notif-section{width:100%;}
        }
      `}</style>

      <div className="notif-page">
        {/* Header - LEFT EDGE MOBILE */}
        <div className="notif-header">
          <div>
            <h1 className="notif-title">Notifications</h1>
            <p className="notif-sub">Manage system notifications.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="notif-btn">
            + Create Notification
          </button>
        </div>

        {/* Toolbar */}
        <div className="notif-section">
          <NotificationToolbar filters={filters} setFilters={setFilters} notifications={notifications} />
        </div>

        {/* Statistics */}
        <div className="notif-section">
          <NotificationStatistics notifications={notifications} />
        </div>

        {/* Table */}
        <div className="notif-section">
          <NotificationTable
            notifications={notifications}
            onEdit={(n) => { setSelectedNotification(n); setShowEditModal(true); }}
            onDelete={(n) => { setSelectedNotification(n); setShowDeleteModal(true); }}
          />
        </div>

        {/* Pagination */}
        <div className="notif-section">
          <NotificationPagination page={pagination.page || 1} pages={pagination.pages || 1} total={pagination.total || 0} setFilters={setFilters} />
        </div>

        <AddNotificationModal isOpen={showAddModal} onClose={() => { setShowAddModal(false); refetch(); }} />
        <EditNotificationModal isOpen={showEditModal} notification={selectedNotification} onClose={() => { setShowEditModal(false); setSelectedNotification(null); refetch(); }} />
        <DeleteNotificationModal isOpen={showDeleteModal} notification={selectedNotification} onClose={() => { setShowDeleteModal(false); setSelectedNotification(null); refetch(); }} />
      </div>
    </>
  );
}