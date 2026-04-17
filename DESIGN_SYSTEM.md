# Nehla — Design System

> **Tous supporters. Un seul connaisseur.**
>
> The single source of truth for Nehla's visual and interaction design. Update this file whenever a design decision is locked. Every screen, component, and animation should trace back to a rule here.

---

## 1. Brand foundation

### What Nehla is

Nehla is a hardcore football trivia game in French, built around a flagship "Ton Mondial" bracket mode and three signature multiplayer modes (Penalty Shootout, Derby, Tiki-Taka). The mascot, Nehla — a competitive commentator bee — is the heart of the identity.

### What Nehla is not

- Not a children's educational app (no round, soft, cute-first language)
- Not a generic quiz app (depth, not breadth)
- Not an English-first global product (French-first, Moroccan-rooted)
- Not politely friendly (Nehla has attitude and expects you to deliver)

### Visual direction in one line

**FIFA broadcast intensity, Moroccan warmth underneath.** Dark atmospheric stadium, Moroccan red and honey as signature accents, broadcast typography, hype energy. Never generic.

---

## 2. Color system

All colors are defined as HSL tokens in `src/index.css`. Never use raw hex values in components. Always reference via CSS variables or Tailwind classes.

### Core palette

| Token           | HSL              | Purpose                                         |
|-----------------|------------------|-------------------------------------------------|
| `--background`  | `222 25% 6%`     | Stadium base — deep, cold, late kickoff         |
| `--foreground`  | `40 30% 95%`     | Primary text — warm off-white                   |
| `--card`        | `222 22% 10%`    | Raised surfaces (buttons, cards, modals)        |
| `--muted`       | `222 18% 14%`    | Recessed surfaces (tracks, disabled states)     |
| `--border`      | `222 18% 18%`    | Default borders, dividers                       |

### Brand accents

| Token                | HSL              | Meaning                                       |
|----------------------|------------------|-----------------------------------------------|
| `--primary`          | `0 72% 47%`      | **Moroccan Red** — action, urgency, "play"    |
| `--accent`           | `38 90% 55%`     | **Honey Amber** — premium, rewards, score     |
| `--secondary`        | `152 70% 28%`    | **Moroccan Green** — correct, confirmation    |
| `--destructive`      | `0 84% 60%`      | Error states, wrong answers (brighter red)    |

### Usage rules

1. **Primary (red) is for action.** CTA buttons, the active state of the main gameplay element, "you are here" indicators. Never use red for success — that's always green.
2. **Accent (honey) is for value.** Trophies, scores, streaks, premium features, XP. Reserve this color — if we use it everywhere, it stops feeling special.
3. **Secondary (green) is ONLY for correct answers and success states.** Never decorative.
4. **Destructive is for wrong answers, errors, destructive actions.** Brighter than primary to differentiate.
5. **Never mix red and green at large sizes** (Moroccan flag association is lovely but only in small symbolic contexts, e.g. a footer badge).
6. **Backgrounds in gameplay use `--card` or `--muted`**, never pure black or pure primary.

### Glow tokens (effects, not colors)

```css
--shadow-glow-honey: 0 0 30px hsl(38 90% 55% / 0.35);
--shadow-glow-red:   0 0 30px hsl(0 72% 47% / 0.35);
--shadow-glow-green: 0 0 30px hsl(152 70% 28% / 0.35);
```

Apply glows to indicate *attention* (hover, focus, reward moments). Never as decoration on resting states — glows must earn their place.

---

## 3. Typography

Three fonts, clear hierarchy. All loaded via Google Fonts in `src/index.css`.

| Family  | Role                                                 | When to use                                      |
|---------|------------------------------------------------------|--------------------------------------------------|
| Anton   | **Display** — broadcast-style jersey-bold italic     | Wordmark, hero titles, big numbers, score slams  |
| Oswald  | **Heading** — condensed stadium-announcer feel       | Section headers, mode labels, stats labels       |
| Outfit  | **Soft display** — used in a few legacy screens      | Being phased out; avoid in new screens           |
| Inter   | **Body** — readable sans                             | Descriptions, paragraph text, UI helper text     |

### Tailwind classes

- `font-display` → Anton (e.g., wordmark, big numbers)
- `font-heading` → Oswald (e.g., section titles, `SOLO`, `MULTIJOUEUR`)
- `font-body` → Inter (default body text)
- `font-outfit` → Outfit (legacy, avoid)

### Type scale

| Use case              | Class / Size                   | Weight | Style    |
|-----------------------|--------------------------------|--------|----------|
| Hero wordmark         | `text-7xl` (72px), font-display | 400    | italic   |
| Section title         | `text-xl` (20px), font-heading | 700    | normal   |
| Mode label            | `text-base` (16px), font-display | 400    | italic   |
| Big number / score    | `text-5xl` (48px), font-display | 400    | italic   |
| Body text             | `text-sm` (14px), font-body    | 400    | normal   |
| UI label / hint       | `text-xs` (12px), font-body    | 500    | normal   |
| Broadcast micro-label | `text-[11px]`, font-heading    | 500    | uppercase, `tracking-[2px]` |

### Typography rules

1. **Display italic = broadcast energy.** Any Anton text should be italic. Never use Anton upright.
2. **Uppercase with letter-spacing for authority.** Micro-labels ("LIVE", "RECORD", "QUART DE FINALE") get `uppercase tracking-[2px]`.
3. **Sentence case for prose.** Body text, descriptions, Nehla's dialogue — sentence case.
4. **Tabular numbers for scores and timers.** Use `font-variant-numeric: tabular-nums` so digits don't shift width during animation.

---

## 4. Motion

Motion = personality. Nehla should feel *responsive and confident*, not floaty.

### Easing curves

```ts
// Use these Framer Motion easings:
const EASE_SNAP = [0.16, 1, 0.3, 1];   // Default — confident, snappy
const EASE_PRESS = [0.4, 0, 0.2, 1];   // Button press — material-like
const EASE_STADIUM = [0.65, 0, 0.35, 1]; // Dramatic reveals (trophy lifts)
```

### Duration rules

| Interaction type                       | Duration  | Reason                                   |
|----------------------------------------|-----------|------------------------------------------|
| Button press / tap feedback            | 150ms     | Immediate = responsive                   |
| Card hover / small state change        | 200ms     | Felt, not seen                           |
| Page entry (elements staggering in)    | 400–600ms | Establishes hierarchy                    |
| Score slam / big reveal                | 500–800ms | Weight = importance                      |
| Trophy lift / victory sequence         | 1200ms+   | Cinematic, earned                        |

### Signature motions

- **Slam-in**: numbers/scores enter from above with a bounce, overshoot slightly, settle. Used for score updates.
- **Slide & stagger**: mode cards, lists, and stats slide up with 80–120ms stagger between children. Used for screen entries.
- **LED pulse**: slow (2s) sine-wave opacity pulse for "LIVE" indicators and standby states.
- **Shimmer sweep**: horizontal gradient sweep across premium elements every 3–4s. Reserved for hero CTAs and premium callouts.

### Motion anti-patterns (never do)

- Spinning, rotating, or bouncing loaders (feels childish)
- Elements that float/wave when resting (distracting)
- Transitions > 1s for regular UI (feels slow)
- Elastic/spring animations on buttons (feels toy-like)
- Parallax on mobile scroll (motion sickness)

---

## 5. Spacing & layout

Mobile-first. Designed for thumb reach zones.

### Tap target rules

- **Minimum tap target: 44×44 px** (Apple HIG / Android Material minimum).
- **Primary CTAs: 56 px+ height** so they feel substantial.
- **Tap targets ≥ 8 px apart** to prevent misses.
- **Thumb zone**: Primary actions in the bottom 2/3 of screen. Top 1/3 is for display only.

### Spacing scale (Tailwind defaults)

Use `1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `12` (48px).
Avoid arbitrary values like `[17px]`. If you need one, it's probably a bug.

### Container widths

- **Mobile content**: `max-w-sm` (384px) for centered content blocks
- **Screen padding**: `px-5` (20px) on all screens. Never less.
- **Screen vertical padding**: `pt-6 pb-8` — more room at the bottom for thumb safe-area

### Safe areas (iOS/Android)

All screens use `min-h-svh` (small viewport height) rather than `min-h-screen` — handles mobile browser UI correctly. When we wrap with Capacitor, we'll add `safe-area-inset-*` utilities.

---

## 6. Component patterns

### Buttons

Three variants, strict rules:

1. **Primary CTA** — filled with `--primary` (red), white text, used for the main action on a screen (only one per screen).
2. **Mode/selection button** — `--card` background with a colored left-edge LED accent bar (3px), glow on hover. See `ModeButton` in `Welcome.tsx`.
3. **Ghost/secondary** — transparent with `--border`, hover fills with `--muted`.

All buttons: `rounded-2xl`, minimum 48px height, use `whileTap={{ scale: 0.985 }}` for tactile feedback.

### Cards

- Default card: `bg-card/70 border-border backdrop-blur-md rounded-2xl`
- Elevated card: add `shadow-[0_0_32px_-4px_hsl(var(--primary)/0.5)]` on hover
- Card padding: `p-4` for compact, `p-6` for standard, `p-8` for hero

### Badges / pills

- Use for metadata (edition, category, difficulty, "LIVE")
- Always: `rounded-full`, `px-4 py-1.5`, `font-heading text-[11px] uppercase tracking-[2.5px]`
- Border uses the accent color at 30-40% opacity, fill at 10-15% opacity

### Icons

- **Library**: `lucide-react` exclusively. Consistent stroke weight.
- **Stroke**: always 2px (Lucide default)
- **Sizes**: 16px (inline text), 20px (default UI), 24px (feature icons), 32px (hero icons)
- Never mix icon libraries.

---

## 7. Nehla — the mascot

### Who she is

Nehla is a competitive football commentator bee. Former expert, now in the booth. She's hype, she's invested, she holds you to pro standards, and she celebrates hard when you deliver. She never punches down — her attitude is energy, not cruelty.

### Voice rules

- Short, punchy sentences. Stadium-announcer cadence.
- Uses `!` for hype, not sarcasm.
- Never mocks intelligence, background, or identity — only football knowledge.
- Always gives the player a way back. "Allez, concentre-toi" > "t'es nul."

### Mascot states (to be illustrated)

The mascot is not a single static image — she's a cast of emotions used across gameplay:

1. **Idle/Commentator** — headset on, confident pose, in broadcast booth. Home screen default.
2. **Cheering** — arms up, goal-celebrating. Used for correct answers, streaks.
3. **Facepalm** — disappointed but not angry. Used for wrong answers.
4. **Thinking** — hand on chin, watching replay. Used for loading states.
5. **Trophy** — holding the World Cup aloft. Used ONLY when the player wins the bracket Solo mode.
6. **Whistle** — referee pose. Used for rules/tutorials.

**Design direction for the illustrator**: keep the existing bee silhouette but increase attitude — firmer pose, sharper eyes, confident stance. Away from "children's mascot," toward "pro athlete." Retain warm yellow body + black stripes.

### Usage rules

- **Nehla appears on every screen** in some form. She's the brand anchor.
- **Nehla speaks to the player** in short lines, not paragraphs. Max 12 words.
- **Nehla's speech bubble** is a square-cornered broadcast-caption shape, not a round cartoon bubble. Never round.
- **The trophy Nehla state is sacred**. Never shown outside a real victory. Never as decoration.

---

## 8. Background: the atmospheric stadium

The home and gameplay screens use a layered atmospheric stadium treatment. Never a photo.

### Layers (back to front)

1. **Base** — `--background` (`222 25% 6%`)
2. **Radial glows** — large, soft radial gradients of `--primary` (top) and `--accent` (bottom) at 8-15% opacity
3. **Stadium silhouette** — subtle outline of stands/floodlights at screen base, ~10% opacity (to be added in next iteration)
4. **Diagonal texture** — faint diagonal lines (`.bg-stadium` utility class)
5. **Scanlines** — horizontal broadcast grain at 3.5% opacity (`.bg-scanlines`)
6. **Occasional particle flashes** — rare, tiny white sparkles (photographer flashbulbs — to be added)

### Anti-patterns

- Never use a full-bleed stadium photograph
- Never use a trophy image as a background
- Never use animated GIFs or video backgrounds
- Never use pure black — always `--background`

---

## 9. Accessibility

- **Minimum contrast**: 4.5:1 for body text, 3:1 for large text. Check every color combination against `--background`.
- **Focus states**: always visible, use `ring-primary` with 2px offset.
- **Motion preferences**: respect `prefers-reduced-motion` — replace animations with opacity fades.
- **Hit targets**: minimum 44×44 px, always.
- **Language**: `lang="fr"` on the HTML root.

---

## 10. Anti-patterns (never ship these)

- Generic AI aesthetic (purple gradients, centered stock icons, "hero with three feature cards")
- Emoji as icons in production UI (only in content/text)
- Neon cyberpunk colors (cyan, magenta, electric purple) — off-brand
- Skeuomorphic details (leather textures, shiny chrome buttons)
- Motion for motion's sake (bouncing, floating, wobbling on rest)
- Instagram filter backgrounds (photo + dark overlay = amateur)
- Multiple fonts in the same block of text (max 2 font families per screen)
- "Tap anywhere to continue" — always provide a real button

---

## Changelog

- **2026-04-18** — Initial version. Locked brand foundation, color system, typography, motion principles, component patterns, mascot direction, and background treatment.
