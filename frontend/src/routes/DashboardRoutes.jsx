import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* =========================================================
   AUTHENTICATION
   ========================================================= */

import Login from "../features/portal/auth/pages/Login";
import Register from "../features/portal/auth/pages/Register";
import ForgotPassword from "../features/portal/auth/pages/ForgotPassword";
import ResetPassword from "../features/portal/auth/pages/ResetPassword";

/* =========================================================
   ROUTE PROTECTION
   ========================================================= */

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

/* =========================================================
   ADMIN LAYOUT
   ========================================================= */

import DashboardLayout from "../features/portal/components/layout/DashboardLayout";

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

import Dashboard from "../features/portal/dashboard/pages/Dashboard";

/* =========================================================
   STUDENTS
   ========================================================= */

import Students from "../features/portal/student/pages/Students";
import StudentDetails from "../features/portal/student/pages/StudentDetails";

/* =========================================================
   PARENTS
   ========================================================= */

import Parents from "../features/portal/dashboard/parent/pages/Parents";
import ParentDetails from "../features/portal/dashboard/parent/pages/ParentDetails";

/* =========================================================
   TEACHERS
   ========================================================= */

import Teachers from "../features/portal/dashboard/teacher/pages/Teachers";
import TeacherDetails from "../features/portal/dashboard/teacher/pages/TeacherDetails";

/* =========================================================
   ADMISSIONS
   ========================================================= */

import Admissions from "../features/portal/dashboard/admission/pages/Admissions";
import AdmissionDetails from "../features/portal/dashboard/admission/pages/AdmissionDetails";

/* =========================================================
   FINANCE
   ========================================================= */

import Finance from "../features/portal/dashboard/finance/pages/Finance";
import FinanceDetails from "../features/portal/dashboard/finance/pages/FinanceDetails";

/* =========================================================
   REPORTS
   ========================================================= */

import Reports from "../features/portal/dashboard/reports/pages/Reports";
import ReportDetails from "../features/portal/dashboard/reports/pages/ReportDetails";

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

import Notifications from "../features/portal/dashboard/notification/pages/Notifications";
import NotificationDetails from "../features/portal/dashboard/notification/pages/NotificationDetails";

/* =========================================================
   SETTINGS
   ========================================================= */

import Settings from "../features/portal/dashboard/settings/pages/Settings";

/* =========================================================
   STUDENT
   ========================================================= */

import StudentLayout from "../features/portal/dashboard/student/StudentLayout";
import StudentDashboard from "../features/portal/dashboard/student/pages/StudentDashboard";

/* =========================================================
   TEACHER
   ========================================================= */

import TeacherDashboard from "../features/portal/dashboard/teacher/pages/TeacherDashboard";

/* =========================================================
   PARENT
   ========================================================= */

import ParentDashboard from "../features/portal/dashboard/parent/pages/ParentDashboard";
import ParentLayout from "../features/portal/dashboard/parent/layout/ParentLayout";


export default function DashboardRoutes() {
  return (
    <Routes>

      {/* =========================================================
          AUTHENTICATION
         ========================================================= */}

      <Route
        path="login"
        element={<Login />}
      />

      <Route
        path="register"
        element={<Register />}
      />

      <Route
        path="forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="reset-password/:token"
        element={<ResetPassword />}
      />


      {/* =========================================================
          PROTECTED ROUTES
         ========================================================= */}

      <Route element={<ProtectedRoute />}>


        {/* =======================================================
            ADMIN
           ======================================================= */}

        <Route
          element={
            <RoleRoute allowedRoles={["admin"]} />
          }
        >

          <Route element={<DashboardLayout />}>

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="students"
              element={<Students />}
            />

            <Route
              path="students/:id"
              element={<StudentDetails />}
            />

            <Route
              path="parents"
              element={<Parents />}
            />

            <Route
              path="parents/:id"
              element={<ParentDetails />}
            />

            <Route
              path="teachers"
              element={<Teachers />}
            />

            <Route
              path="teachers/:id"
              element={<TeacherDetails />}
            />

            <Route
              path="admissions"
              element={<Admissions />}
            />

            <Route
              path="admissions/:id"
              element={<AdmissionDetails />}
            />

            <Route
              path="finance"
              element={<Finance />}
            />

            <Route
              path="finance/:id"
              element={<FinanceDetails />}
            />

            <Route
              path="reports"
              element={<Reports />}
            />

            <Route
              path="reports/:id"
              element={<ReportDetails />}
            />

            <Route
              path="notifications"
              element={<Notifications />}
            />

            <Route
              path="notifications/:id"
              element={<NotificationDetails />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />

          </Route>

        </Route>


        {/* =======================================================
            TEACHER
           ======================================================= */}

        <Route
          element={
            <RoleRoute allowedRoles={["teacher"]} />
          }
        >

          <Route
            path="teacher"
            element={<TeacherDashboard />}
          />

        </Route>


        {/* =======================================================
            PARENT
           ======================================================= */}

        <Route
          element={
            <RoleRoute allowedRoles={["parent"]} />
          }
        >

          <Route
            path="parent"
            element={<ParentDashboard />}
          />

          <Route
            path="parent/dashboard"
            element={<ParentLayout />}
          />

        </Route>


        {/* =======================================================
            STUDENT
           ======================================================= */}

        <Route
          element={
            <RoleRoute allowedRoles={["student"]} />
          }
        >

          <Route
            path="student"
            element={<StudentDashboard />}
          />

          <Route
            path="student/dashboard"
            element={<StudentLayout />}
          />

        </Route>

      </Route>


      {/* =========================================================
          DEFAULT
         ========================================================= */}

      <Route
        path=""
        element={
        <Navigate
            to="/portal/login"
            replace
        />
        }
      />


      {/* =========================================================
          404
         ========================================================= */}

      <Route
        path="*"
        element={
          <Navigate
              to="/portal/login"
              replace
          />
        }
      />

    </Routes>
  );
}