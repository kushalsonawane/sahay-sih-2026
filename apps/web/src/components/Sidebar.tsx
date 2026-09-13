import React from 'react';
import { NavLink } from 'react-router-dom';
import { useActiveRole } from '../store/authStore';
import { useLanguage } from '../hooks/useLanguage';
import { useAlerts } from '../hooks/useAlerts';
import { useCases } from '../hooks/useCases';
import {
  LayoutDashboard,
  FolderGit2,
  AlertTriangle,
  HeartHandshake,
  BarChart3,
  FileText,
  ShieldCheck,
  Settings,
  Heart,
  CalendarCheck,
  Lock,
  PhoneCall,
  Compass,
} from 'lucide-react';
import { cn } from '../lib/cn';

export const Sidebar: React.FC = () => {
  const activeRole = useActiveRole();
  const { isHindi, isMarathi } = useLanguage();
  const { alerts } = useAlerts();
  const { cases } = useCases();

  const criticalAlertsCount = alerts.filter(
    (a) => (a.severity === 'critical' || a.severity === 'high') && a.status !== 'resolved'
  ).length;

  interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    badgeColor?: string;
    highlight?: boolean;
  }

  const staffNavItems: NavItem[] = [
    {
      to: '/dashboard',
      label: isMarathi ? 'डॅशबोर्ड आढावा' : isHindi ? 'डैशबोर्ड अवलोकन' : 'Dashboard Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      to: '/cases',
      label: isMarathi ? 'सक्रिय प्रकरणे' : isHindi ? 'सक्रिय मामले' : 'Monitored Cases',
      icon: <FolderGit2 className="w-4 h-4" />,
      badge: cases.length,
    },
    {
      to: '/alerts',
      label: isMarathi ? 'संकट अलर्ट' : isHindi ? 'संकट अलर्ट' : 'Distress Alerts',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: criticalAlertsCount > 0 ? criticalAlertsCount : undefined,
      badgeColor: 'bg-rose-600 text-white',
    },
    {
      to: '/interventions',
      label: isMarathi ? 'हस्तक्षेप व मदत' : isHindi ? 'हस्तक्षेप एवं राहत' : 'Interventions & Relief',
      icon: <HeartHandshake className="w-4 h-4" />,
    },
    {
      to: '/analytics',
      label: isMarathi ? 'जिल्हा आकडेवारी' : isHindi ? 'जिला सांख्यिकी' : 'District Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      to: '/reports',
      label: isMarathi ? 'वैधानिक अहवाल' : isHindi ? 'वैधानिक रिपोर्ट' : 'Statutory Reports',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      to: '/audit-log',
      label: isMarathi ? 'ऑडिट ट्रेल' : isHindi ? 'ऑडिट ट्रेल' : 'Data Access Audit',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      to: '/settings',
      label: isMarathi ? 'सेटिंग्ज व एसओपी' : isHindi ? 'सेटिंग्स एवं एसओपी' : 'Settings & Protocols',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <nav aria-label="Main Navigation" className="w-64 bg-stone-900 text-stone-200 min-h-[calc(100vh-6.5rem)] flex flex-col justify-between p-3 border-r border-stone-800 shrink-0 hidden md:flex">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-stone-400 tracking-wider uppercase flex items-center justify-between">
          <span>{isHindi ? 'प्रशासनिक कार्यक्षेत्र' : 'ADMINISTRATIVE WORKSPACE'}</span>
        </div>

        {staffNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                isActive
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white',
                item.highlight && !isActive && 'bg-teal-900/40 text-teal-200 border border-teal-700/50 hover:bg-teal-800/60'
              )
            }
          >
            <div className="flex items-center gap-2.5">
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.badge !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight',
                  item.badgeColor || 'bg-stone-800 text-stone-300 group-hover:bg-stone-700'
                )}
              >
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Return to Hub, Citizen Portal switch, and Footer Info Box */}
      <div className="mt-auto space-y-2 pt-3">
        <NavLink
          to="/victim"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-teal-300 bg-teal-900/30 border border-teal-700/50 hover:bg-teal-900/60 transition-all"
          title="Switch to Citizen Safe Portal (Victim Space)"
        >
          <Heart className="w-4 h-4 text-teal-400" />
          <span>{isMarathi ? 'नागरिक सुरक्षित जागा →' : isHindi ? 'नागरिक सुरक्षित पोर्टल →' : 'Citizen Safe Space →'}</span>
        </NavLink>

        <NavLink
          to="/welcome"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>{isMarathi ? 'सादरीकरण हब' : isHindi ? 'प्रस्तुति पोर्टल हब' : 'Presentation Hub'}</span>
        </NavLink>

        <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700/50 text-[11px] text-stone-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-stone-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMarathi ? 'सुरक्षित देखरेख प्रणाली' : isHindi ? 'सुरक्षित निगरानी प्रणाली' : 'SC/ST PoA Compliant'}</span>
          </div>
          <p className="text-[10px] text-stone-400 leading-relaxed">
            {isMarathi
              ? 'ओळख पूर्णपणे कूटबद्ध आणि संरक्षित आहे.'
              : isHindi
              ? 'पहचान पूरी तरह से एन्क्रिप्टेड एवं उपनामयुक्त है।'
              : 'Fictional demo data. Role-based access strictly audited.'}
          </p>
        </div>
      </div>
    </nav>
  );
};
