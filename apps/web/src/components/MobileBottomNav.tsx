import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import {
  LayoutDashboard,
  FolderGit2,
  AlertTriangle,
  HeartHandshake,
  BarChart3,
} from 'lucide-react';
import { cn } from '../lib/cn';

export const MobileBottomNav: React.FC = () => {
  const { isHindi } = useLanguage();

  const staffItems = [
    { to: '/dashboard', label: isHindi ? 'डैशबोर्ड' : 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/cases', label: isHindi ? 'मामले' : 'Cases', icon: <FolderGit2 className="w-5 h-5" /> },
    { to: '/alerts', label: isHindi ? 'अलर्ट' : 'Alerts', icon: <AlertTriangle className="w-5 h-5" /> },
    { to: '/interventions', label: isHindi ? 'हस्तक्षेप' : 'Actions', icon: <HeartHandshake className="w-5 h-5" /> },
    { to: '/analytics', label: isHindi ? 'आंकड़े' : 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-900 border-t border-stone-800 flex justify-around items-center px-1 py-1.5 shadow-lg">
      {staffItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/dashboard'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-medium transition-colors w-full',
              isActive
                ? 'text-amber-400 font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            )
          }
        >
          {item.icon}
          <span className="truncate max-w-[60px]">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
