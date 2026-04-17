import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Users, ChevronRight } from "lucide-react";
import nehlaBee from "@/assets/nehla-bee.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-stadium px-5 pt-6 pb-8">
      {/* ------- Ambient stadium lighting ------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Top spotlight */}
        <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/25 blur-[120px]" />
        {/* Bottom warm glow */}
        <div className="absolute -bottom-32 left-1/2 h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-accent/12 blur-[100px]" />
        {/* Left red flare */}
        <div className="absolute left-[-10%] top-[35%] h-[260px] w-[260px] rounded-full bg-primary/15 blur-[90px]" />
        {/* Right amber flare */}
        <div className="absolute right-[-10%] top-[55%] h-[240px] w-[240px] rounded-full bg-accent/15 blur-[90px]" />
        {/* Broadcast scan-line grain */}
        <div className="absolute inset-0 bg-scanlines opacity-[0.035]" />
      </div>

      {/* ------- Top broadcast bar ------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="font-heading text-[11px] uppercase tracking-[2.5px] text-primary">
            Nehla — Live
          </span>
        </div>
      </motion.div>

      {/* ------- Hero block ------- */}
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {/* World Cup banner */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative mb-6 overflow-hidden rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 backdrop-blur-sm"
        >
          <div className="shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <span className="relative font-display text-[11px] uppercase tracking-[3px] text-accent">
            🏆 World Cup 2026 Edition
          </span>
        </motion.div>

        {/* Bee mascot with spotlight halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-4"
        >
          {/* Halo */}
          <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-accent/20 blur-3xl" />
          <motion.img
            src={nehlaBee}
            alt="Nehla"
            width={180}
            height={180}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mb-3 text-center"
        >
          <h1 className="font-display text-7xl uppercase italic tracking-tight text-white leading-none">
            NEH<span className="text-primary">L</span>A
          </h1>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mb-12 max-w-[260px] text-center font-body text-sm text-muted-foreground"
        >
          Tous supporters. Un seul connaisseur.
        </motion.p>

        {/* Mode buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex w-full max-w-sm flex-col gap-3"
        >
          <ModeButton
            accent="primary"
            icon={<User className="h-5 w-5" />}
            label="SOLO"
            description="Joue seul, bats ton record"
            onClick={() => navigate("/modes")}
          />
          <ModeButton
            accent="accent"
            icon={<Users className="h-5 w-5" />}
            label="MULTIJOUEUR"
            description="Défie tes amis en temps réel"
            onClick={() => navigate("/modes")}
          />
        </motion.div>
      </div>

      {/* ------- Footer stats strip ------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex items-center justify-between border-t border-border/40 pt-4"
      >
        <FooterStat label="Record" value="—" accent="text-accent" />
        <div className="h-6 w-px bg-border/40" />
        <FooterStat label="Niveau" value="01" accent="text-white" />
        <div className="h-6 w-px bg-border/40" />
        <FooterStat label="Série" value="0" accent="text-primary" />
      </motion.div>
    </div>
  );
};

/* ============================================================
   Subcomponents
   ============================================================ */

interface ModeButtonProps {
  accent: "primary" | "accent";
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

const ModeButton = ({ accent, icon, label, description, onClick }: ModeButtonProps) => {
  const isPrimary = accent === "primary";
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-card/70 p-4 text-left backdrop-blur-md transition-all ${
        isPrimary
          ? "border-primary/30 hover:border-primary/70 hover:shadow-[0_0_32px_-4px_hsl(var(--primary)/0.5)]"
          : "border-accent/30 hover:border-accent/70 hover:shadow-[0_0_32px_-4px_hsl(var(--accent)/0.5)]"
      }`}
    >
      {/* LED accent bar */}
      <div
        className={`absolute inset-y-0 left-0 w-[3px] ${
          isPrimary ? "bg-primary" : "bg-accent"
        }`}
      />
      {/* Icon */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
          isPrimary
            ? "bg-primary/15 text-primary"
            : "bg-accent/15 text-accent"
        }`}
      >
        {icon}
      </div>
      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="font-display text-base uppercase italic tracking-wider text-white">
          {label}
        </div>
        <div className="mt-0.5 font-body text-xs text-muted-foreground">
          {description}
        </div>
      </div>
      {/* Chevron */}
      <ChevronRight
        className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 ${
          isPrimary ? "text-primary" : "text-accent"
        }`}
      />
    </motion.button>
  );
};

interface FooterStatProps {
  label: string;
  value: string;
  accent: string;
}

const FooterStat = ({ label, value, accent }: FooterStatProps) => (
  <div className="flex-1 text-center">
    <div className="font-display text-[10px] uppercase tracking-[2px] text-muted-foreground">
      {label}
    </div>
    <div className={`mt-1 font-display text-lg italic tracking-tight ${accent}`}>
      {value}
    </div>
  </div>
);

export default Welcome;
