// app.jsx — Share a Beer (mobile prototype)

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Palettes ────────────────────────────────────────────────────────────────
const PALETTES = {
  hazy: { name: 'Hazy', accent: '#F4C24A', accent2: '#FFE7A3', cream: '#F5EBD0' },
  amber: { name: 'Amber', accent: '#E89A2A', accent2: '#F2C064', cream: '#F2E2C1' },
  copper: { name: 'Copper', accent: '#C97A36', accent2: '#E0A769', cream: '#EFD8B7' },
  electric: { name: 'Electric', accent: '#F4C24A', accent2: '#9DF26B', cream: '#EFE8D2' },
};
const BG_TONES = {
  oled: {
    name: 'OLED',
    bg: '#000000',
    surface: '#0E0E0E',
    surface2: '#161616',
    line: 'rgba(255,255,255,0.07)',
  },
  charcoal: {
    name: 'Charcoal',
    bg: '#100E0B',
    surface: '#181613',
    surface2: '#221F1A',
    line: 'rgba(255,255,255,0.06)',
  },
  warm: {
    name: 'Warm',
    bg: '#0B0805',
    surface: '#15110B',
    surface2: '#1F1A12',
    line: 'rgba(255,210,140,0.07)',
  },
};

// ─── Mock data ───────────────────────────────────────────────────────────────
// Photo stand-ins use layered CSS gradients in beer-evocative palettes.
const FEED = [
  {
    id: 'p1',
    kind: 'photo',
    user: { name: 'Lena Park', handle: '@lenapk', avatar: 'L', avatarTone: 220 },
    where: 'Other Half · Brooklyn',
    when: '12m',
    photo: 'hazy',
    beer: {
      name: 'Green Diamonds',
      brewery: 'Other Half',
      style: 'DIPA · Hazy',
      abv: 8.5,
      rating: 4.4,
      ratings: 1284,
    },
    likes: 248,
    comments: 31,
    liked: false,
  },
  {
    id: 'p2',
    kind: 'checkin',
    user: { name: 'Marcus Vale', handle: '@mvale', avatar: 'M', avatarTone: 30 },
    where: 'Trillium · Fenway',
    when: '1h',
    beer: {
      name: 'Fort Point Pale',
      brewery: 'Trillium',
      style: 'Pale Ale',
      abv: 6.6,
      rating: 4.1,
      ratings: 8420,
      score: 4.5,
    },
    note: 'Crisp. Best with the wood-fired pizza.',
    likes: 64,
    comments: 8,
    liked: true,
  },
  {
    id: 'p3',
    kind: 'photo',
    user: { name: 'Aiko Tanaka', handle: '@aiko', avatar: 'A', avatarTone: 340 },
    where: 'Sapporo Beer Garden',
    when: '3h',
    photo: 'pilsner',
    beer: {
      name: 'Yebisu Premium',
      brewery: 'Sapporo',
      style: 'Lager',
      abv: 5.0,
      rating: 3.9,
      ratings: 22014,
    },
    likes: 1820,
    comments: 142,
    liked: false,
  },
  {
    id: 'p4',
    kind: 'session',
    user: { name: 'Diego Reyes', handle: '@dreyes', avatar: 'D', avatarTone: 110 },
    where: 'Mission District Crawl',
    when: '5h',
    session: { duration: '3h 14m', beers: 4, friends: 5, miles: 2.1 },
    likes: 91,
    comments: 12,
    liked: false,
  },
  {
    id: 'p5',
    kind: 'photo',
    user: { name: 'Sasha Volkov', handle: '@svol', avatar: 'S', avatarTone: 280 },
    where: 'Cantillon · Brussels',
    when: '8h',
    photo: 'lambic',
    beer: {
      name: 'Gueuze 100% Lambic',
      brewery: 'Cantillon',
      style: 'Lambic',
      abv: 5.5,
      rating: 4.7,
      ratings: 9821,
    },
    likes: 612,
    comments: 88,
    liked: false,
  },
];

const PHOTO_GRADIENTS = {
  hazy: `radial-gradient(120% 80% at 30% 20%, #FFE7A3 0%, transparent 55%),
         radial-gradient(90% 70% at 80% 90%, #C97A36 0%, transparent 60%),
         linear-gradient(180deg, #E8B45A 0%, #8E5A1F 100%)`,
  pilsner: `radial-gradient(100% 70% at 50% 25%, #FFF1B8 0%, transparent 60%),
            linear-gradient(180deg, #F2C95A 0%, #B07A14 100%)`,
  lambic: `radial-gradient(120% 80% at 70% 30%, #F2E2C1 0%, transparent 55%),
           linear-gradient(180deg, #C9A567 0%, #6B4A1C 100%)`,
};

const FRIENDS = [
  { name: 'Mara', tone: 200 },
  { name: 'Theo', tone: 30 },
  { name: 'Yuki', tone: 320 },
  { name: 'Sam', tone: 90 },
  { name: 'Iris', tone: 260 },
  { name: 'Leo', tone: 15 },
];

const TROPHIES = [
  { id: 't1', label: 'Hazy Master', sub: '50 IPAs', hue: 45 },
  { id: 't2', label: '5-Wk Streak', sub: 'Weekly', hue: 25 },
  { id: 't3', label: 'Globe Sip', sub: '12 countries', hue: 200 },
  { id: 't4', label: 'Lambic Lover', sub: '10 sours', hue: 320 },
  { id: 't5', label: 'Cellar Master', sub: '20 cellared', hue: 90 },
  { id: 't6', label: 'First Pour', sub: 'Welcome', hue: 0 },
];

// ─── Tiny inline icons (no external lib; consistent stroke) ─────────────────
const Icon = ({ d, size = 22, strokeWidth = 1.6, fill = 'none', style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);
const Icons = {
  home: <Icon d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  camera: (
    <Icon
      d={
        <>
          <circle cx="12" cy="13" r="4" />
          <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
        </>
      }
    />
  ),
  timer: (
    <Icon
      d={
        <>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5M9 3h6" />
        </>
      }
    />
  ),
  user: (
    <Icon
      d={
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </>
      }
    />
  ),
  heart: <Icon d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  comment: <Icon d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />,
  share: (
    <Icon
      d={
        <>
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <path d="M16 6l-4-4-4 4" />
          <path d="M12 2v14" />
        </>
      }
    />
  ),
  more: (
    <Icon
      d={
        <>
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
        </>
      }
      fill="currentColor"
    />
  ),
  bolt: <Icon d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  search: (
    <Icon
      d={
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </>
      }
    />
  ),
  bell: <Icon d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0" />,
  flip: (
    <Icon
      d={
        <>
          <path d="M3 7h13l-2-2" />
          <path d="M21 17H8l2 2" />
        </>
      }
    />
  ),
  flash: <Icon d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  close: <Icon d="M6 6l12 12M18 6 6 18" />,
  check: <Icon d="M5 12.5 10 17.5 19 7.5" strokeWidth={2} />,
  pause: <Icon d="M9 5v14M15 5v14" strokeWidth={2} />,
  plus: <Icon d="M12 5v14M5 12h14" strokeWidth={2} />,
  flag: <Icon d="M5 21V4h11l-2 4 2 4H5" />,
  chev: <Icon d="m9 6 6 6-6 6" />,
  gear: (
    <Icon
      d={
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </>
      }
    />
  ),
};

// ─── Status bar ──────────────────────────────────────────────────────────────
function StatusBar({ show, accent }) {
  if (!show) return null;
  return (
    <div
      style={{
        height: 44,
        padding: '0 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.02em',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 8,
          transform: 'translateX(-50%)',
          width: 110,
          height: 28,
          background: '#000',
          borderRadius: 999,
        }}
      />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="11" viewBox="0 0 18 11">
          <g fill="#fff">
            <rect x="0" y="6" width="3" height="5" rx="0.5" />
            <rect x="5" y="4" width="3" height="7" rx="0.5" />
            <rect x="10" y="2" width="3" height="9" rx="0.5" />
            <rect x="15" y="0" width="3" height="11" rx="0.5" />
          </g>
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path
            d="M8 2.5C5.5 2.5 3.3 3.4 1.6 5L0 3.4C2 1.4 4.9 0 8 0s6 1.4 8 3.4L14.4 5C12.7 3.4 10.5 2.5 8 2.5z"
            fill="#fff"
          />
          <path
            d="M8 5.5c-1.5 0-2.9.5-4 1.4L2.4 5.3C3.9 4 5.9 3.2 8 3.2s4.1.8 5.6 2L12 6.9c-1.1-.9-2.5-1.4-4-1.4z"
            fill="#fff"
          />
          <circle cx="8" cy="9" r="1.5" fill="#fff" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="3"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.5"
          />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#fff" />
          <rect x="23" y="4" width="2" height="4" rx="1" fill="#fff" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ user, size = 36, ring }) {
  const tone = user.avatarTone ?? 40;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(120% 120% at 30% 25%, oklch(0.78 0.12 ${tone}) 0%, oklch(0.45 0.10 ${tone}) 100%)`,
        color: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.42,
        fontFamily: 'Inter, sans-serif',
        boxShadow: ring ? `0 0 0 2px #000, 0 0 0 3.5px ${ring}` : 'none',
        flexShrink: 0,
      }}
    >
      {user.avatar}
    </div>
  );
}

// ─── Photo stand-in (gradient) ───────────────────────────────────────────────
function BeerPhoto({ kind, height = 380, children, rounded = 0 }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: rounded,
        background: PHOTO_GRADIENTS[kind] || PHOTO_GRADIENTS.hazy,
        overflow: 'hidden',
      }}
    >
      {/* film grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          mixBlendMode: 'overlay',
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '3px 3px',
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      {children}
    </div>
  );
}

window.SAB = { PALETTES, BG_TONES, FEED, FRIENDS, TROPHIES, Icons, StatusBar, Avatar, BeerPhoto };
