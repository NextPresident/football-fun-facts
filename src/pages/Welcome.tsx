import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import nehlaBee from "@/assets/nehla-bee.png";
import ButtonWithIconDemo from "@/components/ui/button-with-icon";

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
          width={140}
          height={140}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-2"
        />

        <h1 className="font-heading text-6xl font-black tracking-tight text-foreground">
          Ne<span className="text-accent">h</span>la
        </h1>

        <p className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Football Trivia
        </p>
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

      {/* Play button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <ButtonWithIconDemo label="Jouer ⚽" onClick={() => navigate("/modes")} />
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
