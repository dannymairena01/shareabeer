# Handoff: Share a Beer — Mobile Prototype

## Overview
"Share a Beer" is a mobile-first social app for beer lovers — a mashup of social feed, drinking-session tracking, and beer logging. The core interaction is "I'm holding a beer right now and I want to capture it in under 15 seconds."

This bundle contains a high-fidelity, interactive prototype covering four primary views (Feed, Capture, Active Session, Profile) plus a bottom tab bar.

## About the Design Files
The files in this bundle are **design references created in HTML/React** — interactive prototypes showing the intended look, behavior, and motion. They are **not production code to copy directly.** Your job is to **recreate these designs in the target codebase's existing environment** — React Native, SwiftUI, Jetpack Compose, Flutter, or whatever stack the team chose — using its established component library, navigation, and patterns. If no codebase exists yet, pick the framework most appropriate to the team's needs (React Native or Expo is a strong default for a cross-platform consumer mobile app like this) and implement there.

The HTML prototype uses inline styles + plain `<svg>` icons + browser `getUserMedia` for the camera. None of those choices are prescriptive — replace them with the platform-idiomatic equivalents (StyleSheet, design tokens, a real icon set like Lucide or SF Symbols, the camera SDK).

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, shadow values, motion timings, and copy are final. Recreate pixel-perfectly using the codebase's libraries.

## Tech & Visual System

### Type
- **Inter** (400/500/600/700/800) — all UI, all numerals, all body
- **Instrument Serif** italic — used in *one place only*: the wordmark "Share a beer" in the feed header. Everywhere else (timer, stat numerals, profile name) is Inter.
- Body: 12–14px, weight 400–500
- Section labels: 10.5px, weight 600, `letter-spacing: 0.14em`, `text-transform: uppercase`
- Big numerals (timer, weekly recap counts, profile stats): Inter weight **200–300**, `letter-spacing: -0.03em`, `font-variant-numeric: tabular-nums`. **Important:** the minimalist thin-Inter treatment is the chosen direction — do NOT use a serif for numbers.

### Color (Default — "Copper" palette is current selection)
The prototype ships 4 palette variants (`hazy`, `amber`, `copper`, `electric`). User selected **copper**. Tokens:

| Token | Copper (chosen) | Hazy | Amber | Electric |
|---|---|---|---|---|
| `accent` | `#C97A36` | `#F4C24A` | `#E89A2A` | `#F4C24A` |
| `accent2` (lighter, gradient stop) | `#E0A769` | `#FFE7A3` | `#F2C064` | `#9DF26B` |
| `cream` (warm secondary) | `#EFD8B7` | `#F5EBD0` | `#F2E2C1` | `#EFE8D2` |

Background tones (default = OLED):
- OLED: bg `#000000`, surface `#0E0E0E`, surface2 `#161616`, line `rgba(255,255,255,0.07)`
- Charcoal: bg `#100E0B`, surface `#181613`, surface2 `#221F1A`
- Warm: bg `#0B0805`, surface `#15110B`, surface2 `#1F1A12`

Text colors:
- Primary: `#fff`
- Secondary: `rgba(255,255,255,0.55)`
- Tertiary / hints: `rgba(255,255,255,0.4–0.5)`
- Subtle dividers: `rgba(255,255,255,0.05–0.08)`

### Spacing & Radius
- Phone container: 400px wide × 860px tall (max-height clamps to viewport)
- Outer phone radius: 44px
- Card radius: 18–24px (cards 18, photo posts & big cards 22–24)
- Detail card radius: 18px
- Pill / tag radius: 999px
- Standard horizontal padding: 18–22px
- Section gap: 24–28px

### Shadow & Glass
- Glass card (overlays): `background: rgba(20,18,14,0.55)` + `backdrop-filter: blur(18px) saturate(160%)` + `border: 0.5px solid rgba(255,255,255,0.12)` + inset highlight `0 1px 0 rgba(255,255,255,0.06) inset` + drop shadow `0 12px 40px rgba(0,0,0,0.4)`
- Hero CTA: `box-shadow: 0 10px 28px <accent>40`
- Camera FAB: `box-shadow: 0 10px 30px <accent>55, 0 0 0 5px <bg>` (creates a "hole" in the tab bar)

### Iconography
Custom inline SVGs at 22px / stroke 1.6 for all icons. In production use **Lucide** (or platform-native SF Symbols / Material Symbols) and match these icons: `home`, `camera`, `timer`, `user`, `heart`, `message-circle`, `share`, `more-horizontal`, `zap`, `search`, `bell`, `flip-horizontal`, `zap` (flash), `x`, `check`, `pause`, `plus`, `flag`, `chevron-right`, `settings`.

---

## Screens

### 1. Feed (`For You`)
**Purpose:** Scrollable social feed showing what friends are drinking.

**Layout (top → bottom):**
- Sticky header (60px) — wordmark left ("Share a beer" all in Instrument Serif italic; "Share" in white at 30px, "a beer" in accent at 18px), search + bell icon-buttons right
- Tab strip — three tabs ("For you", "Following", "Nearby"), 13.5px, 22px gap, active tab gets a 2px accent underline at `bottom: -14px`
- Mixed feed of three post types:

**Post type A — Photo post** (most common)
- Header row: 36px avatar (circular, radial-gradient by hue) with a 2px accent ring offset by 2px black, name (13.5px / 600), location · timestamp (11.5px / muted), `more` icon
- Photo: 410px tall, 22px radius, edge-to-edge with 14px horizontal margin. Uses CSS gradient stand-ins evoking beer color (hazy/pilsner/lambic palettes — replace with real photos in production). Film grain (3px radial dot pattern, opacity 0.18, mix-blend overlay) + vignette.
- **Beer detail card** floats over bottom 12px: glass effect, 18px radius, contains beer name (15.5px / 600), `brewery · style` (11.5px / 0.55 opacity), and a right-aligned ABV chip (4×8px padding, white-tinted bg, accent number, "ABV%" label). Bottom row: star rating (5 stars, 10px, accent fill clip) + numeric rating + total ratings count.
- Action row: heart (toggleable, scale 1.1 + accent fill when liked), comment with count, share (right-aligned). 18px gaps, 22px icons.

**Post type B — Check-in post** (text-led)
- Inset card: 14px outer margin, `rgba(255,255,255,0.025)` bg, 22px radius, 0.5px border `rgba(255,255,255,0.07)`
- Header: 32px avatar, name + "checked in · timestamp", and a **rating chip** (accent bg, black text, star + score, e.g. "★ 4.5") aligned right
- Body row: 44×56 mini beer-glass illustration left (gradient column with foam highlight), then beer name (15px / 600) + meta + italic note in cream color + venue
- Action row identical to photo post

**Post type C — Session recap card**
- Header: avatar + "ended a session · timestamp"
- Card: 24px radius, radial gradient with accent at 0%/0%, dark base, 0.5px white border
- Top: "SESSION" eyebrow (10.5px uppercase) + venue name (18px / 600) + accent flag icon
- 4-column grid: Time / Beers / Friends / Miles. Each value uses the **thin-Inter minimalist** treatment (18px, weight 200, tracking -0.03em, tabular).

**Bottom-of-feed marker:** `── you're caught up ──` centered, 11px uppercase, 30% opacity.

### 2. Capture (Camera)
**Purpose:** "I'm holding a beer right now" — log it in under 15 seconds.

**Live camera + overlay layout:**
- Full-bleed `<video>` element using `navigator.mediaDevices.getUserMedia({ facingMode: 'environment' })`. In React Native use `expo-camera` or `react-native-vision-camera`.
- On match, video gets `filter: blur(8px) brightness(0.5)` (transition 0.5s).

**Top bar (gradient fade from 50% black):**
- Close button (✕) left — returns to Feed
- Mode segmented pills center: "Beer" (active = accent fill, black text), "Tap list", "Menu" — 11.5px / 600
- Flash toggle right

**Reticle (visible while scanning):**
- 240×320 frame, centered slightly above middle (`translate(-50%, -52%)`)
- Four 28×28 corner brackets in accent, 2px border, 8px outer radius
- Animated scan line: 2px tall horizontal bar, gradient `transparent → accent → transparent`, glow `0 0 18px accent`, animates top 0 → 100% over 1.8s ease-in-out infinite, with opacity fade-in/out
- Hint text under reticle: "Scanning label…" → "Center the bottle or tap handle"

**AI Match sheet (slides up after ~2.4s match delay):**
- Position: 12px L/R, 16px from bottom; transition `bottom 0.55s cubic-bezier(0.16, 1, 0.3, 1)` from -400px
- Glass card (28px blur, stronger), 24px radius
- Header row: pulsing accent dot + "AI MATCH" eyebrow left, "97% confidence" right
- Body row: 72×92 stylized bottle thumbnail (dark bg + accent gradient body + cream label panel with brewery initials in serif italic), beer name (18px / 600), brewery, three pill tags (style / sub-style / ABV)
- Action row: "Not this one" secondary button (flex 1, glass) + **"Confirm & Log"** primary button (flex 2, accent gradient, black text, check icon, drop shadow `0 8px 22px <accent>55`). Both 50px tall, 14px radius.

**Confirm flow:** Tap "Confirm & Log" → 700ms radial-burst flash overlay with "Logged ✓" pill in the center → navigate to Session screen.

**Tab bar is hidden on this screen** so it doesn't collide with the AI match sheet.

### 3. Active Session
**Purpose:** Strava-for-beer dashboard while a drinking session is in progress.

**Layout:**
- Top row: "● LIVE SESSION" eyebrow (accent dot pulses, 1.6s ease-in-out infinite, scale 1 → 1.3 + opacity 0.5 → 1), `Started 7:26 PM · Mission District` subtitle. Pause/play icon button right.
- **Hero timer:** centered, "DURATION" eyebrow above. Value is `H:MM:SS` at **76px Inter weight 200, tracking -0.04em, tabular-nums**. Seconds segment colored accent. Ticks every 1s when not paused. (The minimalist thin-Inter treatment is final — do NOT revert to serif.)
- 2-col stats grid (10px gap): "BEERS" with count + "≈ 24.4 ABV·oz" sub, "PACE" with `44'` + "per beer". Each card: 18px padding, 20px radius, 0.5px white border, `rgba(255,255,255,0.025)` bg. Numbers are 40px Inter weight 200.
- Friends row: "TAGGED" eyebrow + "+ Add" link in accent. Horizontal scroll of 48px avatars with names below (10.5px / 500).
- Recent pours list: "TONIGHT'S POURS" eyebrow + 3 rows. Each row: 32×40 mini bottle gradient + name (13.5/600) + `brewery · ABV% · timestamp` (11.5px / 0.45 opacity). 0.5px hairline divider between rows.
- Bottom CTA stack:
  - Primary: 60px / 18px radius / accent gradient / black text / `+ Log another beer` / shadow `0 10px 28px <accent>40`. Increments beer count.
  - Secondary: 52px / 18px radius / 0.5px white border / `End & publish session`

### 4. Profile
**Purpose:** Personal stats + gamified achievements.

**Layout:**
- Top row: `@yourhandle` (12px / 0.5 opacity) + settings gear icon right
- Identity row: 72px avatar with accent ring and a small `L 12` level badge (accent bg, black text, 10px / 800, 2px black border) anchored bottom-right of the avatar; **name "Jordan Avery" in Inter weight 500, 22px, tracking -0.02em** (NOT serif); bio "Pale ales over IPAs. Belgian sceptic." in 12.5px / pretty wrapped.
- 4-column stat strip: 14px margin, 18px radius outer container, `rgba(255,255,255,0.06)` background that shows through 1px gaps between cells. Each cell: dark bg + value (22px / Inter weight 300 / tabular / tracking -0.03em) + label below (10px / 600 / uppercase / 0.1em tracking). Values: `284 BEERS · 47 STYLES · 63 BREWERIES · 12 COUNTRIES`. (Numerals: thin-Inter, NOT serif.)
- **Weekly Recap** section: title (14.5px / 600) + "See all" accent link. Horizontal-scroll cards (220px wide, 20px radius, 16px padding, hue-tinted radial gradient + dark base). Each card: week range eyebrow, `7 beers` (34px Inter weight 200 with "beers" muted at 14px), 7-bar mini chart with one bar in accent, `Most: <style>` footer.
- **Trophy Case** section: title + `6 of 32` counter. 3-column grid, 10px gap. Each trophy: 16px padding card with hexagonal foil-gradient crest:
  - Outer hex (clip-path `polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)`) with conic-gradient in the trophy's hue (oklch 0.85 → 0.55 → 0.92 → 0.45 around the perimeter — gives the foil effect)
  - Inner hex (4px inset) with linear gradient `oklch(0.95 0.08 hue) → oklch(0.55 0.18 hue) → oklch(0.35 0.14 hue)` and a serif italic letter centered
  - Name (11.5/600) + sub (10px / 0.4)
  - Trophies: Hazy Master (45°), 5-Wk Streak (25°), Globe Sip (200°), Lambic Lover (320°), Cellar Master (90°), First Pour (0°)

### Bottom Tab Bar (visible on Feed / Session / Profile)
- 4 tabs: Feed (home icon), Session (timer icon), **Capture** (hero center), Profile (user icon)
- Side tabs: column layout, 9.5px uppercase label, accent color when active else `rgba(255,255,255,0.42)`
- Center Capture button: 60×60 circular FAB, accent radial gradient, black camera icon, lifted with `translateY(-12px)`, drop shadow + 5px ring matching bg color so it punches a hole in the bar
- Background: `linear-gradient(180deg, transparent, <bg>)` — the bar fades into the screen rather than having a hard edge
- iOS home indicator: 134×5 pill, white 60% opacity, 8px from bottom, z 40

---

## Interactions & Behavior

| Action | Behavior |
|---|---|
| Tap heart on post | Toggle liked, ±1 to count, heart fills accent + 1.1× scale (cubic-bezier 0.34, 1.56, 0.64, 1) |
| Tap Capture FAB | Navigate to camera, request permission, start scanning |
| AI match found (~2.4s) | Video blurs, sheet slides up from -400px over 0.55s |
| Tap "Not this one" | Reset matched=false, restart 2s scan |
| Tap "Confirm & Log" | 700ms radial flash + "Logged ✓" pill, then navigate to Session |
| Tap pause on Session | Stop the 1s setInterval that increments seconds |
| Tap "Log another beer" | Increment beer counter |
| Tap ✕ on camera | Return to Feed |

## State Management
Per-screen local state is sufficient:
- **Feed:** posts array (id, kind, user, beer, likes, liked, etc.) + active tab
- **Camera:** `cameraOk` (null/true/false), `scanning`, `matched`
- **Session:** `seconds` (ticked by setInterval when not paused), `beers`, `paused`
- **App:** `active` tab id

For real implementation move feed/session data to a server (REST or GraphQL); persist active session locally so it survives app restarts.

## Animations & Motion
- Heart pop: `transform: scale(1.1)`, `transition: 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)`
- AI sheet slide-up: `bottom -400 → 16`, `0.55s cubic-bezier(0.16, 1, 0.3, 1)`
- Scan line: keyframes `top: 0 → 100%`, 1.8s ease-in-out infinite, with opacity in/out
- Live-session dot pulse: 1.6s ease-in-out infinite, `opacity 0.5 ↔ 1`, `scale 1 ↔ 1.3`
- Confirm flash: 0.7s ease-out, opacity 0 → 1 → 0
- Active tab indicator: 0.2s color transition

## Assets
- All "photos" are CSS gradient stand-ins. **In production, swap for real beer/venue photography.** Three palettes are defined as gradient recipes (`hazy`, `pilsner`, `lambic`).
- All icons are custom inline SVGs — replace with **Lucide** in React/RN.
- All avatars are radial-gradient initials keyed by hue — replace with real user photos.
- Fonts: Inter and Instrument Serif via Google Fonts (`<link>` import).

## Files in this Bundle
- `Share a Beer.html` — entry point (loads React + Babel + the JSX modules, mounts the app)
- `app.jsx` — palette / bg-tone tokens, mock data (FEED, FRIENDS, TROPHIES), shared primitives (Icon set, StatusBar, Avatar, BeerPhoto)
- `screens.jsx` — Feed: header, tabs, photo post, check-in post, session recap post
- `screens2.jsx` — Camera, Session, Profile
- `tweaks-panel.jsx` — runtime palette/density toggles (dev tool only — drop in production)

## Implementation Checklist
1. Pick framework (React Native / Expo recommended for cross-platform).
2. Install Inter + Instrument Serif (only used for the wordmark).
3. Set up tokens: copper accent `#C97A36`, accent2 `#E0A769`, cream `#EFD8B7`, OLED bg `#000`.
4. Build the four screens in this order — Feed → Session → Profile → Camera (camera last because it depends on platform camera SDK).
5. Wire bottom tab nav (React Navigation `BottomTabs` or platform equivalent). Hide tab bar on Camera route.
6. Replace gradient stand-ins with real imagery.
7. Wire camera + a real label-recognition service for the AI match (Google Vision, OpenAI vision, or Untappd-style image hash lookup).
8. Persist active session locally (AsyncStorage / Core Data / Room).
