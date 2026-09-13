/** @type {import('tailwindcss').Config} */
declare const _default: {
    darkMode: string[];
    content: string[];
    theme: {
        extend: {
            colors: {
                bg: string;
                surface: string;
                border: string;
                'border-subtle': string;
                primary: {
                    DEFAULT: string;
                    hover: string;
                    light: string;
                    muted: string;
                    foreground: string;
                };
                teal: {
                    DEFAULT: string;
                    light: string;
                    muted: string;
                };
                amber: {
                    DEFAULT: string;
                    light: string;
                    muted: string;
                };
                slate: {
                    DEFAULT: string;
                    light: string;
                    dark: string;
                    muted: string;
                };
                risk: {
                    low: string;
                    'low-muted': string;
                    'low-border': string;
                    moderate: string;
                    'moderate-muted': string;
                    'moderate-border': string;
                    high: string;
                    'high-muted': string;
                    'high-border': string;
                    critical: string;
                    'critical-muted': string;
                    'critical-border': string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
                popover: {
                    DEFAULT: string;
                    foreground: string;
                };
                input: string;
                ring: string;
                foreground: string;
                background: string;
            };
            fontFamily: {
                sans: string[];
                mono: string[];
            };
            fontSize: {
                xs: (string | {
                    lineHeight: string;
                })[];
                sm: (string | {
                    lineHeight: string;
                })[];
                base: (string | {
                    lineHeight: string;
                })[];
                lg: (string | {
                    lineHeight: string;
                })[];
                xl: (string | {
                    lineHeight: string;
                })[];
                '2xl': (string | {
                    lineHeight: string;
                })[];
                '3xl': (string | {
                    lineHeight: string;
                })[];
            };
            spacing: {
                sidebar: string;
                'sidebar-collapsed': string;
            };
            borderRadius: {
                sm: string;
                DEFAULT: string;
                md: string;
                lg: string;
                xl: string;
            };
            boxShadow: {
                card: string;
                'card-hover': string;
                sm: string;
                DEFAULT: string;
            };
            keyframes: {
                'fade-in': {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
                'slide-in-right': {
                    from: {
                        opacity: string;
                        transform: string;
                    };
                    to: {
                        opacity: string;
                        transform: string;
                    };
                };
                shimmer: {
                    '0%': {
                        backgroundPosition: string;
                    };
                    '100%': {
                        backgroundPosition: string;
                    };
                };
            };
            animation: {
                'fade-in': string;
                'slide-in-right': string;
                shimmer: string;
            };
        };
    };
    plugins: never[];
};
export default _default;
//# sourceMappingURL=tailwind.config.d.ts.map