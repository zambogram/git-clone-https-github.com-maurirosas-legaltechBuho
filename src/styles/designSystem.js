// Sistema de diseño BÚHO - Estilo Claude.ai
// Versión: 2.0

export const colors = {
  // Grises (base Claude.ai)
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',

  // Backgrounds
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F9FAFB',
  bgTertiary: '#F4F4F5',

  // Text
  textPrimary: '#18181B',
  textSecondary: '#52525B',
  textTertiary: '#A1A1AA',
  textPlaceholder: '#D4D4D8',

  // Borders
  border: '#E4E4E7',
  borderHover: '#D4D4D8',
  borderFocus: '#A1A1AA',

  // Accent (verde legal profesional)
  accent: '#10B981',
  accentHover: '#059669',
  accentLight: '#D1FAE5',

  // Estados
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Específicos del chat
  userBubble: '#F4F4F5',
  assistantBubble: '#FFFFFF',
  citationBox: '#F0FDF4',
  citationBorder: '#10B981',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
};

export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace",
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '32px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const borderRadius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  focus: '0 0 0 3px rgba(161, 161, 170, 0.15)',
};

export const transitions = {
  fast: '0.15s ease',
  base: '0.2s ease',
  slow: '0.3s ease',
};

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
};
