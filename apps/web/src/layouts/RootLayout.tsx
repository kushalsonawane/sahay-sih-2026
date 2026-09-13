import React from 'react';
import { Outlet } from 'react-router-dom';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { useAccessibilityStore } from '../store/authStore';
import { cn } from '../lib/cn';

export const RootLayout: React.FC = () => {
  const { largeText } = useAccessibilityStore();

  return (
    <div
      className={cn(
        'min-h-screen bg-[#F7F5F2] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900',
        largeText ? 'text-base leading-relaxed' : 'text-sm'
      )}
    >
      {/* Top Demo Switcher for SIH Presentation */}
      <RoleSwitcher />

      {/* Official Government & Ministry Header */}
      <Header />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 md:pb-8">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
