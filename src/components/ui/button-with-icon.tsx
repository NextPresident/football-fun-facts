import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const ButtonWithIconDemo = ({ label = "Let's Collaborate", onClick }: { label?: string; onClick?: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-[var(--shadow-glow-honey)]"
    >
      <span>{label}</span>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-foreground/10 transition-transform group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </Button>
  );
};

export default ButtonWithIconDemo;
