import { motion } from "framer-motion";

/**
 * StadiumBackdrop
 * -------------------------------------------------------------
 * Atmospheric stadium environment used as the background on
 * Welcome, Modes, Quiz, Bracket, and Result screens.
 *
 * Rendered behind all content (z-index: -10). Pointer-events
 * disabled so it never blocks user input.
 *
 * Composed of four layers (back → front):
 *   1. Base color (handled by parent's `bg-stadium` utility)
 *   2. Floodlight beams from top-left and top-right
 *   3. Stadium silhouette at the bottom (stands + floodlight towers)
 *   4. Camera-flash particles (subtle sparkles)
 *
 * Set `intensity="quiet"` on screens that need calmer atmosphere
 * (e.g. quiz gameplay) to dim everything by 30%.
 */

interface StadiumBackdropProps {
  intensity?: "default" | "quiet";
}

export const StadiumBackdrop = ({ intensity = "default" }: StadiumBackdropProps) => {
  const dim = intensity === "quiet" ? 0.65 : 1;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* ---------- Layer 1: Floodlight beams ---------- */}
      <Floodlights opacity={dim} />

      {/* ---------- Layer 2: Stadium silhouette ---------- */}
      <StadiumSilhouette opacity={dim} />

      {/* ---------- Layer 3: Camera flashes ---------- */}
      <CameraFlashes opacity={dim} />
    </div>
  );
};

/* ============================================================
   Floodlights — broad cone beams from top corners
   ============================================================ */

const Floodlights = ({ opacity }: { opacity: number }) => (
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{ opacity: opacity * 0.55 }}
  >
    <defs>
      {/* Left beam — warm amber */}
      <radialGradient id="floodlight-left" cx="0%" cy="0%" r="80%">
        <stop offset="0%" stopColor="hsl(38, 90%, 65%)" stopOpacity="0.18" />
        <stop offset="40%" stopColor="hsl(38, 90%, 55%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(38, 90%, 55%)" stopOpacity="0" />
      </radialGradient>
      {/* Right beam — Moroccan red */}
      <radialGradient id="floodlight-right" cx="100%" cy="0%" r="80%">
        <stop offset="0%" stopColor="hsl(0, 72%, 60%)" stopOpacity="0.16" />
        <stop offset="40%" stopColor="hsl(0, 72%, 47%)" stopOpacity="0.07" />
        <stop offset="100%" stopColor="hsl(0, 72%, 47%)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#floodlight-left)" />
    <rect width="100" height="100" fill="url(#floodlight-right)" />
  </svg>
);

/* ============================================================
   Stadium silhouette — abstract stands rising at bottom
   ============================================================ */

const StadiumSilhouette = ({ opacity }: { opacity: number }) => (
  <svg
    className="absolute bottom-0 left-0 h-[40%] w-full"
    viewBox="0 0 1000 400"
    preserveAspectRatio="none"
    style={{ opacity: opacity * 0.35 }}
  >
    <defs>
      {/* Soft fade so the silhouette dissolves into the dark background */}
      <linearGradient id="silhouette-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(222, 25%, 6%)" stopOpacity="0" />
        <stop offset="55%" stopColor="hsl(222, 25%, 6%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(222, 25%, 6%)" stopOpacity="1" />
      </linearGradient>
    </defs>

    {/* Far stands — softer, smaller */}
    <path
      d="M0,400 L0,260 L80,250 L80,230 L160,225 L160,250 L240,255 L240,235 L320,230 L320,255 L400,260 L400,240 L500,235 L500,260 L600,265 L600,245 L680,240 L680,260 L760,265 L760,245 L840,240 L840,265 L920,270 L920,250 L1000,245 L1000,400 Z"
      fill="hsl(222, 22%, 14%)"
    />

    {/* Floodlight towers — vertical pylons */}
    <g fill="hsl(222, 22%, 12%)">
      <rect x="195" y="160" width="3" height="120" />
      <rect x="495" y="155" width="3" height="120" />
      <rect x="795" y="160" width="3" height="120" />
      {/* Lamp clusters at the top of each tower */}
      <ellipse cx="196.5" cy="158" rx="14" ry="5" />
      <ellipse cx="496.5" cy="153" rx="14" ry="5" />
      <ellipse cx="796.5" cy="158" rx="14" ry="5" />
    </g>

    {/* Subtle warm glow at the lamp tops */}
    <g opacity="0.4">
      <circle cx="196.5" cy="158" r="6" fill="hsl(38, 90%, 65%)" />
      <circle cx="496.5" cy="153" r="6" fill="hsl(38, 90%, 65%)" />
      <circle cx="796.5" cy="158" r="6" fill="hsl(38, 90%, 65%)" />
    </g>

    {/* Near stands — taller, sharper, in front */}
    <path
      d="M0,400 L0,310 L60,305 L60,285 L130,280 L130,310 L200,315 L200,290 L270,285 L270,315 L340,320 L340,295 L420,290 L420,320 L500,325 L500,300 L580,295 L580,325 L660,330 L660,305 L740,300 L740,330 L820,335 L820,310 L900,305 L900,335 L1000,340 L1000,400 Z"
      fill="hsl(222, 22%, 10%)"
    />

    {/* Fade overlay — blends silhouette into background */}
    <rect width="1000" height="400" fill="url(#silhouette-fade)" />
  </svg>
);

/* ============================================================
   Camera flashes — subtle sparkles fading in/out
   ============================================================ */

const FLASH_POSITIONS = [
  { x: "15%", y: "62%", delay: 0, duration: 4 },
  { x: "32%", y: "70%", delay: 1.8, duration: 3.5 },
  { x: "48%", y: "65%", delay: 3.2, duration: 4.2 },
  { x: "67%", y: "72%", delay: 0.9, duration: 3.8 },
  { x: "82%", y: "63%", delay: 2.4, duration: 4 },
  { x: "25%", y: "78%", delay: 4.1, duration: 3.6 },
  { x: "75%", y: "80%", delay: 5.2, duration: 4 },
  { x: "55%", y: "85%", delay: 6.0, duration: 3.5 },
];

const CameraFlashes = ({ opacity }: { opacity: number }) => (
  <div
    className="absolute inset-0 motion-reduce:hidden"
    style={{ opacity: opacity * 0.85 }}
  >
    {FLASH_POSITIONS.map((flash, i) => (
      <motion.div
        key={i}
        className="absolute h-[3px] w-[3px] rounded-full bg-white"
        style={{
          left: flash.x,
          top: flash.y,
          boxShadow:
            "0 0 6px 2px rgba(255,255,255,0.7), 0 0 14px 4px rgba(255,255,255,0.25)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.4, 0.5],
        }}
        transition={{
          duration: 0.6,
          delay: flash.delay,
          repeat: Infinity,
          repeatDelay: flash.duration,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

export default StadiumBackdrop;
