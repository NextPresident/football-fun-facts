import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, Home } from "lucide-react";
import { quizQuestions } from "@/data/quizQuestions";
import nehlaBee from "@/assets/mascot/nehla-commentator.png";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentIndex];
  const total = quizQuestions.length;
  const progress = ((currentIndex + (showResult ? 1 : 0)) / total) * 100;

  const handleSelect = useCallback(
    (idx: number) => {
      if (showResult) return;
      setSelectedIndex(idx);
      if (idx === question.correctIndex) setScore((s) => s + 1);
      setShowResult(true);

      setTimeout(() => {
        if (currentIndex + 1 < total) {
          setCurrentIndex((i) => i + 1);
          setSelectedIndex(null);
          setShowResult(false);
        } else {
          setFinished(true);
        }
      }, 1200);
    },
    [showResult, question, currentIndex, total]
  );

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setShowResult(false);
    setFinished(false);
  };

  const getOptionStyle = (idx: number) => {
    if (!showResult) {
      return "border-border bg-card hover:border-accent/50 active:scale-[0.97]";
    }
    if (idx === question.correctIndex) {
      return "border-secondary bg-secondary/10 text-secondary";
    }
    if (idx === selectedIndex && idx !== question.correctIndex) {
      return "border-primary bg-primary/10 text-primary";
    }
    return "border-border/50 bg-card/50 opacity-50";
  };

  const getScoreMessage = () => {
    const pct = score / total;
    if (pct === 1) return "Parfait ! Tu es un vrai expert ⚽🏆";
    if (pct >= 0.8) return "Excellent ! Tu connais ton football 🔥";
    if (pct >= 0.6) return "Bien joué ! Pas mal du tout 👏";
    if (pct >= 0.4) return "Pas mal, mais tu peux faire mieux 💪";
    return "Continue à t'entraîner ! 📚";
  };

  if (finished) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-honeycomb px-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-border bg-card p-8 text-center"
        >
          <motion.img
            src={nehlaBee}
            alt="Nehla"
            width={64}
            height={64}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-4"
          />
          <Trophy className="mb-2 h-10 w-10 text-accent" />
          <h2 className="font-heading text-2xl font-black text-foreground">Résultats</h2>

          <div className="my-6 flex items-baseline gap-1">
            <span className="font-heading text-5xl font-black text-accent">{score}</span>
            <span className="text-lg text-muted-foreground">/ {total}</span>
          </div>

          <p className="mb-8 text-sm text-muted-foreground">{getScoreMessage()}</p>

          <div className="flex w-full gap-3">
            <button
              onClick={() => navigate("/modes")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-foreground transition hover:border-accent/40"
            >
              <Home className="h-4 w-4" /> Modes
            </button>
            <button
              onClick={restart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
            >
              <RotateCcw className="h-4 w-4" /> Rejouer
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-honeycomb px-5 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => navigate("/modes")} className="text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-heading text-sm font-bold text-muted-foreground">
          Question {currentIndex + 1}/{total}
        </span>
        <span className="ml-auto font-heading text-sm font-bold text-accent">{score} pts</span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="flex flex-1 flex-col"
        >
          <h2 className="mb-8 font-heading text-xl font-black leading-tight text-foreground">
            {question.question}
          </h2>

          <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileTap={!showResult ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition-all duration-200 ${getOptionStyle(idx)}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
                {showResult && idx === question.correctIndex && (
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                )}
                {showResult && idx === selectedIndex && idx !== question.correctIndex && (
                  <XCircle className="h-5 w-5 text-primary shrink-0" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
