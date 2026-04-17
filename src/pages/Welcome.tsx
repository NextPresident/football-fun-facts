import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import nehlaBee from "@/assets/nehla-bee.png";
import { User, Users } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-honeycomb px-6">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

      {/* Logo area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6 flex flex-col items-center"
      >
        <motion.img
          src={nehlaBee}
          alt="Nehla bee mascot"
          width={200}
          height={200}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-2"
        />

        <h1 className="font-heading text-6xl font-black tracking-tight text-white mb-2">
          Ne<span className="relative text-accent">h<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-2xl">⚽</span></span>la
        </h1>
      </motion.div>

      {/* World Cup 2026 badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-12 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
      >
        <span className="text-xs font-semibold text-primary">🏆 World Cup 2026 Edition</span>
      </motion.div>

      {/* Mode buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex w-full max-w-sm flex-col gap-3"
      >
        <button
          onClick={() => navigate("/modes")}
          className="group flex items-center gap-4 rounded-2xl border border-accent/30 bg-card/80 backdrop-blur p-4 text-left transition-all hover:border-accent/60 hover:shadow-[var(--shadow-glow-honey)] hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
            <User className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-base font-bold text-foreground">Solo Play</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Joue seul et bats ton record</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/modes")}
          className="group flex items-center gap-4 rounded-2xl border border-primary/30 bg-card/80 backdrop-blur p-4 text-left transition-all hover:border-primary/60 hover:shadow-[var(--shadow-glow-red)] hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Users className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-base font-bold text-foreground">Compete with Friends</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Défie tes amis en multijoueur</p>
          </div>
        </button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-xs text-muted-foreground"
      >
        🇲🇦 Made with ❤️ for the beautiful game
      </motion.p>
    </div>
  );
};

export default Welcome;
