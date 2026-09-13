import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole, Language } from '@sahay/shared';
import api from '../lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // Demo role switcher — for hackathon judges only
  demoRole: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setDemoRole: (role: UserRole) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      demoRole: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post('/auth/login', { email, password });
          const { user, tokens } = res.data.data;
          localStorage.setItem('sahay_access_token', tokens.accessToken);
          localStorage.setItem('sahay_refresh_token', tokens.refreshToken);
          set({ user, isAuthenticated: true, isLoading: false, demoRole: user.role as UserRole });
        } catch (err: unknown) {
          const message =
            (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
            'Login failed. Please check your credentials.';
          set({ error: message, isLoading: false });
        }
      },

      logout: async () => {
        const refreshToken = localStorage.getItem('sahay_refresh_token');
        try {
          await api.post('/auth/logout', { refreshToken });
        } catch {
          // Continue logout even if API call fails
        }
        localStorage.removeItem('sahay_access_token');
        localStorage.removeItem('sahay_refresh_token');
        set({ user: null, isAuthenticated: false, demoRole: null });
      },

      setDemoRole: (role) => {
        set({ demoRole: role });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'sahay-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        demoRole: state.demoRole,
      }),
    }
  )
);

// Active role — either the demo switcher role or the real user role, with route-aware fallback
export function useActiveRole(): UserRole {
  const { demoRole, user } = useAuthStore();
  if (demoRole) return demoRole;
  if (user?.role) return user.role as UserRole;
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/victim')) {
    return 'victim';
  }
  return 'district_officer';
}

// Language store
interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'sahay-language' }
  )
);

// Large text mode
interface AccessibilityState {
  largeText: boolean;
  toggleLargeText: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      largeText: false,
      toggleLargeText: () => set({ largeText: !get().largeText }),
    }),
    { name: 'sahay-accessibility' }
  )
);
