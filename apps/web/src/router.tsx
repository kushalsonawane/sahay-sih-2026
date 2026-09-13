import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingLayout } from './layouts/LandingLayout';
import { RootLayout } from './layouts/RootLayout';
import { CitizenLayout } from './layouts/CitizenLayout';
import { LandingPage } from './pages/LandingPage';
import { WelcomePage } from './pages/WelcomePage';
import { VictimHome } from './pages/victim/VictimHome';
import { CheckInFlow } from './pages/victim/CheckInFlow';
import { SupportPage } from './pages/victim/SupportPage';
import { AppointmentsPage } from './pages/victim/AppointmentsPage';
import { PrivacyPage } from './pages/victim/PrivacyPage';
import { ChatPage } from './pages/victim/ChatPage';
import { DashboardPage } from './pages/staff/DashboardPage';
import { CasesPage } from './pages/staff/CasesPage';
import { CaseDetailPage } from './pages/staff/CaseDetailPage';
import { AlertsPage } from './pages/staff/AlertsPage';
import { InterventionsPage } from './pages/staff/InterventionsPage';
import { AnalyticsPage } from './pages/staff/AnalyticsPage';
import { ReportsPage } from './pages/staff/ReportsPage';
import { AuditLogPage } from './pages/staff/AuditLogPage';
import { SettingsPage } from './pages/staff/SettingsPage';

export const router = createBrowserRouter([
  // ──────────────────────────────────────────
  // PRESENTATION GATEWAY & ROLE HUB
  // ──────────────────────────────────────────
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'welcome', element: <WelcomePage /> },
    ],
  },

  // ──────────────────────────────────────────
  // CITIZEN / VICTIM SAFE PORTAL (CitizenLayout)
  // ──────────────────────────────────────────
  {
    path: '/victim',
    element: <CitizenLayout />,
    children: [
      { index: true, element: <VictimHome /> },
      { path: 'check-in', element: <CheckInFlow /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
    ],
  },

  // ──────────────────────────────────────────
  // OFFICIAL / STAFF WORKSPACE (RootLayout)
  // ──────────────────────────────────────────
  {
    element: <RootLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'cases/:id', element: <CaseDetailPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'interventions', element: <InterventionsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'audit-log', element: <AuditLogPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },

  // Catch-all fallback
  { path: '*', element: <Navigate to="/" replace /> },
]);
