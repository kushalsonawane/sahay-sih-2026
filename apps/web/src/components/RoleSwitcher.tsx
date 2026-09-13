import React from 'react';
import { useAuthStore, useActiveRole, useAccessibilityStore } from '../store/authStore';
import { useLanguage } from '../hooks/useLanguage';
import type { UserRole } from '@sahay/shared';
import { Shield, User, Stethoscope, Scale, Building2, Globe, Type, Compass, Layout } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageSlider } from './LanguageSlider';

export const RoleSwitcher: React.FC = () => {
  const activeRole = useActiveRole();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const { language, toggleLanguage } = useLanguage();
  const { largeText, toggleLargeText } = useAccessibilityStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isCitizenPath = location.pathname.startsWith('/victim');
  const isLandingPath = location.pathname === '/' || location.pathname === '/welcome';

  const roles: { role: UserRole; label: string; icon: React.ReactNode; path: string }[] = [
    {
      role: 'victim',
      label: 'Citizen Safe Portal',
      icon: <User className="w-3.5 h-3.5" />,
      path: '/victim',
    },
    {
      role: 'district_officer',
      label: 'District Officer',
      icon: <Scale className="w-3.5 h-3.5" />,
      path: '/dashboard',
    },
    {
      role: 'counsellor',
      label: 'Clinical Counsellor',
      icon: <Stethoscope className="w-3.5 h-3.5" />,
      path: '/cases',
    },
    {
      role: 'state_admin',
      label: 'State Admin',
      icon: <Building2 className="w-3.5 h-3.5" />,
      path: '/analytics',
    },
    {
      role: 'national_officer',
      label: 'National Admin',
      icon: <Shield className="w-3.5 h-3.5" />,
      path: '/analytics',
    },
  ];

  const handleRoleChange = (role: UserRole, targetPath: string) => {
    setDemoRole(role);
    navigate(targetPath);
  };

  return (
    <aside
      aria-label="Demonstration Controls"
      className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-1.5 px-3 sm:px-6 relative z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Hackathon label & Portal Overview button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/welcome')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-semibold transition text-[11px] ${
              isLandingPath
                ? 'bg-amber-400 text-slate-950 ring-1 ring-amber-300 shadow-xs'
                : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
            }`}
            title="Return to Presentation Hub / Role Selection"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>SIH PROTOTYPE HUB</span>
          </button>
          <span className="hidden md:inline text-slate-400 font-medium">
            Ministry of Social Justice & Empowerment
          </span>
        </div>

        {/* Center: Role selector buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-slate-400 mr-1 hidden lg:inline font-medium">Test Role:</span>
          {roles.map((r) => {
            const isActive = !isLandingPath && (
              r.role === 'victim' ? isCitizenPath : activeRole === r.role && !isCitizenPath
            );
            return (
              <button
                key={r.role}
                onClick={() => handleRoleChange(r.role, r.path)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-all whitespace-nowrap font-medium text-[11px] ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow font-semibold ring-1 ring-amber-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={`Switch demo view to ${r.label}`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Language toggle & Accessibility */}
        <div className="flex items-center gap-2 ml-auto">
          <LanguageSlider />

          <button
            onClick={toggleLargeText}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded transition font-medium border text-[11px] ${
              largeText
                ? 'bg-teal-700 text-white border-teal-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle larger readable font mode"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{largeText ? 'Normal' : 'A+ Text'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
