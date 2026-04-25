export const palette = {
  accent: '#C97A36',
  accent2: '#E0A769',
  cream: '#EFD8B7',
} as const;

export const bg = {
  base: '#000000',
  surface: '#0E0E0E',
  surface2: '#161616',
  line: 'rgba(255,255,255,0.07)',
} as const;

export const text = {
  primary: '#FFFFFF',
  secondary: 'rgba(255,255,255,0.55)',
  tertiary: 'rgba(255,255,255,0.4)',
  hint: 'rgba(255,255,255,0.5)',
  divider: 'rgba(255,255,255,0.06)',
} as const;

export const radii = {
  pill: 999,
  card: 18,
  cardLg: 22,
  cardXl: 24,
  input: 14,
  phone: 44,
} as const;

export const space = {
  xs: 4,
  s: 8,
  m: 12,
  l: 18,
  xl: 22,
  xxl: 28,
} as const;

export const fonts = {
  sans: {
    thin: 'Inter_200ExtraLight',
    light: 'Inter_300Light',
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    extrabold: 'Inter_800ExtraBold',
  },
  serif: {
    italic: 'InstrumentSerif_400Regular_Italic',
  },
} as const;

export type Palette = typeof palette;
