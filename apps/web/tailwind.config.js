/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                // Design system — SAHAY public-service palette
                bg: '#F7F5F2',
                surface: '#FFFFFF',
                border: '#D1CBC0',
                'border-subtle': '#E8E4DE',
                primary: {
                    DEFAULT: '#1B3A6B',
                    hover: '#142E58',
                    light: '#2A5298',
                    muted: '#E8EDF5',
                    foreground: '#FFFFFF',
                },
                navy: {
                    50: '#f0f4f8',
                    100: '#d9e2ec',
                    200: '#bcccdc',
                    300: '#9fb3c8',
                    400: '#829ab1',
                    500: '#627d98',
                    600: '#486581',
                    700: '#334e68',
                    800: '#243b53',
                    900: '#102a43',
                    950: '#0a192f',
                },
                teal: {
                    DEFAULT: '#2A7E7E',
                    light: '#3A9999',
                    muted: '#E6F3F3',
                },
                amber: {
                    DEFAULT: '#B45309',
                    light: '#D97706',
                    muted: '#FEF3C7',
                },
                slate: {
                    DEFAULT: '#475569',
                    light: '#64748B',
                    dark: '#334155',
                    muted: '#F1F5F9',
                },
                // Risk level colors — always used WITH labels and icons, never alone
                risk: {
                    low: '#0D7A5B',
                    'low-muted': '#ECFDF5',
                    'low-border': '#A7F3D0',
                    moderate: '#B45309',
                    'moderate-muted': '#FFFBEB',
                    'moderate-border': '#FCD34D',
                    high: '#C2410C',
                    'high-muted': '#FFF7ED',
                    'high-border': '#FDBA74',
                    critical: '#991B1B',
                    'critical-muted': '#FEF2F2',
                    'critical-border': '#FCA5A5',
                },
                destructive: {
                    DEFAULT: '#B91C1C',
                    foreground: '#FFFFFF',
                },
                muted: {
                    DEFAULT: '#F1F0EE',
                    foreground: '#6B7280',
                },
                accent: {
                    DEFAULT: '#E8EDF5',
                    foreground: '#1B3A6B',
                },
                card: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#1C1917',
                },
                popover: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#1C1917',
                },
                input: '#D1CBC0',
                ring: '#1B3A6B',
                foreground: '#1C1917',
                background: '#F7F5F2',
            },
            fontFamily: {
                sans: ['"Noto Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.125rem' }],
                sm: ['0.875rem', { lineHeight: '1.375rem' }],
                base: ['1rem', { lineHeight: '1.625rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.875rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.375rem' }],
            },
            spacing: {
                sidebar: '15rem',
                'sidebar-collapsed': '4rem',
            },
            borderRadius: {
                sm: '0.25rem',
                DEFAULT: '0.375rem',
                md: '0.5rem',
                lg: '0.625rem',
                xl: '0.75rem',
            },
            boxShadow: {
                card: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
                sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(4px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-right': {
                    from: { opacity: '0', transform: 'translateX(8px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-out',
                'slide-in-right': 'slide-in-right 0.2s ease-out',
                shimmer: 'shimmer 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
//# sourceMappingURL=tailwind.config.js.map