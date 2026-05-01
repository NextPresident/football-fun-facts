import { motion } from "framer-motion";
import { Brain, Timer, ListChecks, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type ReactNode } from "react";
import nehlaBee from "@/assets/mascot/nehla-commentator.png";

interface GameModeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "red" | "green" | "honey";
  delay: number;
  onClick: () => void;
}

const colorMap = {
  red: {
    border: "border-primary/30 hover:border-primary/60",
    shadow: "hover:shadow-[var(--shadow-glow-red)]",
    iconBg: "bg-primary/10 text-primary",
  },
  green: {
    border: "border-secondary/30 hover:border-secondary/60",
    shadow: "hover:shadow-[var(--shadow-glow-green)]",
    iconBg: "bg-secondary/10 text-secondary",
  },
  honey: {
    border: "border-accent/30 hover:border-accent/60",
    shadow: "hover:shadow-[var(--shadow-glow-honey)]",
    iconBg: "bg-accent/10 text-accent",
  },
};

const GameModeCard = ({ icon, title, description, color, delay, onClick }: GameModeCardProps) => {
  const styles = colorMap[color];
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl border bg-card p-5 text-left transition-all duration-300 ${styles.border} ${styles.shadow}`}
    >
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${styles.iconBg} transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.button>
  );
};

const GameModes = () => {
  const navigate = useNavigate();

  const modes = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Quiz",
      description: "Questions à choix multiples sur le football",
      color: "red" as const,
    },
    {
      icon: <ListChecks className="h-6 w-6" />,
      title: "3 Vérités & 1 Mensonge",
      description: "Trouve le mensonge parmi 4 affirmations",
      color: "honey" as const,
    },
    {
      icon: <Timer className="h-6 w-6" />,
      title: "Contre la Montre",
      description: "Réponds vite avant la fin du temps !",
      color: "green" as const,
    },
  ];

  return (
    <div className="relative flex min-h-svh flex-col items-center bg-honeycomb px-5 pt-6 pb-8">
      {/* Back button */}
      <button onClick={() => navigate("/")} className="self-start mb-4 text-muted-foreground hover:text-foreground transition">
        <ArrowLeft className="h-5 w-5" />
      </button>

      {/* Decorative */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <motion.img
        src={nehlaBee}
        alt="Nehla"
        width={48}
        height={48}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      />

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-1 font-heading text-2xl font-black text-foreground"
      >
        Choose a mode
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10 text-sm text-muted-foreground"
      >
        Sélectionne ton défi ⚽
      </motion.p>

      <div className="flex w-full max-w-sm flex-col gap-4">
        {modes.map((mode, i) => (
          <GameModeCard
            key={mode.title}
            {...mode}
            delay={0.25 + i * 0.1}
            onClick={() => {
              if (mode.title === "Quiz") navigate("/quiz");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameModes;
