import type { User, UserRole, Language } from '@sahay/shared';
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    demoRole: UserRole | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setDemoRole: (role: UserRole) => void;
    clearError: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthState, {
            user: User | null;
            isAuthenticated: boolean;
            demoRole: UserRole | null;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthState) => void) => () => void;
        onFinishHydration: (fn: (state: AuthState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthState, {
            user: User | null;
            isAuthenticated: boolean;
            demoRole: UserRole | null;
        }>>;
    };
}>;
export declare function useActiveRole(): UserRole;
interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
}
export declare const useLanguageStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<LanguageState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<LanguageState, LanguageState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: LanguageState) => void) => () => void;
        onFinishHydration: (fn: (state: LanguageState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<LanguageState, LanguageState>>;
    };
}>;
interface AccessibilityState {
    largeText: boolean;
    toggleLargeText: () => void;
}
export declare const useAccessibilityStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AccessibilityState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AccessibilityState, AccessibilityState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AccessibilityState) => void) => () => void;
        onFinishHydration: (fn: (state: AccessibilityState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AccessibilityState, AccessibilityState>>;
    };
}>;
export {};
//# sourceMappingURL=authStore.d.ts.map