import { motion } from "framer-motion";
import { Brain, Timer, ListChecks } from "lucide-react";
import { type ReactNode } from "react";

interface GameModeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentType: "primary" | "accent" | "secondary";
  delay: number;
}

const accentStyles = {
  primary: "border-primary/30 hover:border-primary/60 hover:shadow-[var(--shadow-glow-primary)]",
  accent: "border-accent/30 hover:border-accent/60 hover:shadow-[var(--shadow-glow-accent)]",
  secondary: "border-muted-foreground/20 hover:border-muted-foreground/40",
};

const iconBgStyles = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  secondary: "bg-muted text-muted-foreground",
};

const GameModeCard = ({ icon, title, description, accentType, delay }: GameModeCardProps) => (
  <motion.button
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.03, y: -4 }}
    whileTap={{ scale: 0.98 }}
    className={`group relative flex flex-col items-center gap-5 rounded-2xl border bg-card p-8 text-center transition-all duration-300 cursor-pointer ${accentStyles[accentType]}`}
  >
    <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${iconBgStyles[accentType]} transition-transform duration-300 group-hover:scale-110`}>
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-heading font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.button>
);

const gameModes = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Quiz",
    description: "Teste tes connaissances football avec des questions à choix multiples.",
    accentType: "primary" as const,
  },
  {
    icon: <ListChecks className="h-8 w-8" />,
    title: "3 Vérités & 1 Mensonge",
    description: "Trouve le mensonge caché parmi 4 affirmations sur le football.",
    accentType: "accent" as const,
  },
  {
    icon: <Timer className="h-8 w-8" />,
    title: "Contre la Montre",
    description: "Réponds au maximum de questions avant que le temps ne s'écoule !",
    accentType: "primary" as const,
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
          ⚽ Football Trivia
        </div>
        <h1 className="text-5xl font-heading font-black tracking-tight text-foreground sm:text-6xl">
          Foot<span className="text-primary">Quiz</span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          Choisis ton mode de jeu et prouve que tu es le vrai connaisseur du football.
        </p>
      </motion.div>

      {/* Mode cards */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {gameModes.map((mode, i) => (
          <GameModeCard key={mode.title} {...mode} delay={0.2 + i * 0.15} />
        ))}
      </div>
    </div>
  );
};

export default Index;
