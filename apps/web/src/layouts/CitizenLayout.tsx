import React from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import {
  Heart,
  HeartHandshake,
  MessageCircleHeart,
  PhoneCall,
  CalendarCheck,
  Lock,
  LogOut,
  Shield,
  Phone,
} from 'lucide-react';
import { cn } from '../lib/cn';
import { useAccessibilityStore } from '../store/authStore';
import { AshokaEmblem } from '../components/NationalEmblem';

export const CitizenLayout: React.FC = () => {
  const { isHindi, isMarathi } = useLanguage();
  const { largeText } = useAccessibilityStore();
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  const navItems = [
    {
      to: '/victim',
      label: isMarathi ? 'होम' : isHindi ? 'होम' : 'Home',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      to: '/victim/check-in',
      label: isMarathi ? 'चेक-इन' : isHindi ? 'चेक-इन' : 'Check-In',
      icon: <HeartHandshake className="w-5 h-5" />,
    },
    {
      to: '/victim/chat',
      label: isMarathi ? 'मित्राशी बोला' : isHindi ? 'मित्र से बात' : 'Sahay Mitra',
      icon: <MessageCircleHeart className="w-5 h-5" />,
    },
    {
      to: '/victim/support',
      label: isMarathi ? 'मदत' : isHindi ? 'सहायता' : 'Support',
      icon: <PhoneCall className="w-5 h-5" />,
    },
    {
      to: '/victim/appointments',
      label: isMarathi ? 'सत्रे' : isHindi ? 'सत्र' : 'Sessions',
      icon: <CalendarCheck className="w-5 h-5" />,
    },
    {
      to: '/victim/privacy',
      label: isMarathi ? 'गोपनीयता' : isHindi ? 'गोपनीयता' : 'Privacy',
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col font-sans selection:bg-teal-200 selection:text-stone-900',
        'bg-gradient-to-br from-stone-50 via-teal-50/30 to-stone-100',
        largeText ? 'text-base' : 'text-sm'
      )}
    >
      {/* Citizen-only header — simple, calm, no admin clutter */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-40">
        {/* Gov banner */}
        <div className="bg-teal-950 text-teal-200 text-[11px] py-1 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex flex-col h-3 w-4.5 rounded-[1px] overflow-hidden border border-white/30">
              <div className="h-1/3 bg-[#F58220]" />
              <div className="h-1/3 bg-white flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-[#000080]" />
              </div>
              <div className="h-1/3 bg-[#138808]" />
            </div>
            <span className="font-serif font-bold text-teal-100">सत्यमेव जयते</span>
            <span className="text-teal-400 hidden sm:inline">
              | Ministry of Social Justice & Empowerment, Government of India
            </span>
          </div>
          <span className="text-teal-300">
            National Helpline:{' '}
            <a href="tel:14566" className="font-bold text-amber-300 hover:underline">
              14566 (Toll-Free 24x7)
            </a>
          </span>
        </div>

        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/victim" className="flex items-center gap-3">
            <div className="text-teal-900 shrink-0">
              <AshokaEmblem className="w-9 h-11" />
            </div>
            <div>
              <div className="font-bold text-base font-serif text-stone-900 tracking-tight leading-none flex items-center gap-2">
                <span>{isMarathi ? 'सहाय' : isHindi ? 'सहाय' : 'SAHAY'}</span>
                <span className="text-[10px] font-sans font-semibold text-teal-800 bg-teal-50 border border-teal-300 px-2 py-0.5 rounded-full">
                  {isMarathi ? 'नागरिक सुरक्षित जागा' : isHindi ? 'नागरिक सुरक्षित पोर्टल' : 'Citizen Safe Space'}
                </span>
              </div>
              <div className="text-[10px] text-stone-500 font-normal leading-tight mt-0.5">
                {isMarathi ? 'सामाजिक न्याय विभाग • तुमची सुरक्षित जागा' : isHindi ? 'सामाजिक न्याय विभाग • आपका सुरक्षित स्थान' : 'Department of Social Justice & Empowerment'}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="tel:14566"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs border border-teal-200 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>14566</span>
            </a>
            <button
              onClick={handleQuickExit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition"
              title="Immediately exit this page safely"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'त्वरित बाहेर पडा' : isHindi ? 'तुरंत बाहर निकलें' : 'Safe Exit'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 pb-28">
        <Outlet />
      </main>

      {/* Floating Sahay Mitra chat button (visible everywhere except /victim/chat) */}
      <FloatingChatButton isHindi={isHindi} isMarathi={isMarathi} />

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-teal-950/95 backdrop-blur-sm border-t border-teal-800 flex justify-around items-center px-1 py-1.5 shadow-xl">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/victim'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl text-[10px] font-medium transition-all w-full relative',
                isActive
                  ? 'text-amber-300 font-bold'
                  : 'text-teal-400 hover:text-teal-200',
                item.to === '/victim/chat' && !isActive && 'text-teal-200'
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.to === '/victim/chat' ? (
                  <div
                    className={cn(
                      'p-1 rounded-full transition-all',
                      isActive ? 'bg-amber-400 text-stone-950' : 'bg-teal-700 text-teal-100'
                    )}
                  >
                    {item.icon}
                  </div>
                ) : (
                  item.icon
                )}
                <span className="truncate max-w-[56px]">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const FloatingChatButton: React.FC<{ isHindi: boolean; isMarathi: boolean }> = ({ isHindi, isMarathi }) => {
  const location = useLocation();
  if (location.pathname === '/victim/chat') return null;

  return (
    <Link
      to="/victim/chat"
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-teal-800 hover:bg-teal-700 text-white shadow-xl transition-all hover:scale-105 border border-teal-600"
      title="Talk to Sahay Mitra"
    >
      <MessageCircleHeart className="w-5 h-5 text-amber-300" />
      <span className="text-xs font-bold">
        {isMarathi ? 'मित्राशी बोला' : isHindi ? 'मित्र से बात करें' : 'Talk to Sahay Mitra'}
      </span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
    </Link>
  );
};
