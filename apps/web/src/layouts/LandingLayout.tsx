import React from 'react';
import { Outlet } from 'react-router-dom';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { GovernmentHeader } from '../components/GovernmentHeader';
import { GovernmentFooter } from '../components/GovernmentFooter';
import { MinistersSection } from '../components/MinistersSection';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F2] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Demo Switcher for SIH Hackathon Evaluators */}
      <RoleSwitcher />

      {/* Sovereign Government & Ministry Header matching socialjustice.gov.in */}
      <GovernmentHeader />

      {/* Main Full-Width Portal Content */}
      <main id="main-content" className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Official Government Leadership Banner */}
      <MinistersSection />

      {/* Sovereign GIGW Footer matching socialjustice.gov.in */}
      <GovernmentFooter />
    </div>
  );
};
