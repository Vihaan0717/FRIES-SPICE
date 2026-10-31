import { useEffect, useState } from "react";
import { Flame, Sparkles } from "lucide-react";

const SPICE_STEPS = [
  { text: "Dropping fresh russet fries into bubbling hot oil…", percent: 22 },
  { text: "Grilling crisp chicken bites & golden paneer chunks…", percent: 52 },
  { text: "Smothering in molten cheddar & roasted bhuna gravy…", percent: 84 },
  { text: "Garnishing with crushed chili flakes & toasted seeds… ¡LISTO!", percent: 100 },
];

const PANEL_COLORS = [
  "#7a1e0b", // Deep rustic roasted chili
  "#9f2c14", // Bold paprika crimson
  "#c44319", // Sally flame terracotta
  "#dd6522", // Warm spiced amber
  "#ea8a26", // Golden saffron turmeric
];

export function Preloader() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsRemoved(true);
      return;
    }

    // Lock body scroll while loader runs
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress simulation matching high-energy restaurant kitchen prep
    const startTime = Date.now();
    const duration = 2100; // 2.1s total intro duration

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawP = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(rawP);

      if (rawP < 28) {
        setStepIndex(0);
      } else if (rawP < 58) {
        setStepIndex(1);
      } else if (rawP < 88) {
        setStepIndex(2);
      } else {
        setStepIndex(3);
      }

      if (rawP >= 100) {
        clearInterval(interval);
        // Trigger curtain exit
        setTimeout(() => {
          setIsExiting(true);
          window.dispatchEvent(new CustomEvent("preloader:exit"));
        }, 150);

        // Remove from DOM after curtain panels complete their staggered slide
        setTimeout(() => {
          setIsRemoved(true);
          document.body.style.overflow = originalOverflow;
        }, 1100);
      }
    }, 24);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isRemoved) return null;

  return (
    <aside
      aria-label="Loading Spice Sally"
      aria-hidden={isExiting}
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none transition-colors duration-500 ${
        isExiting ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* ── 5-Panel Staggered Curtain Grid ── */}
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
        {PANEL_COLORS.map((color, index) => {
          // Staggered delay: left to right cascade
          const delayMs = index * 75;
          return (
            <div
              key={index}
              className="h-full w-full will-change-transform"
              style={{
                backgroundColor: color,
                transform: isExiting ? "translateY(-101%)" : "translateY(0%)",
                transition: `transform 0.85s cubic-bezier(0.76, 0, 0.24, 1) ${delayMs}ms`,
              }}
            />
          );
        })}
      </div>

      {/* ── Center Brand & Cooking Progress (Fades and lifts away when exiting) ── */}
      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center max-w-lg transition-all duration-400 ease-out ${
          isExiting ? "opacity-0 -translate-y-10 scale-95" : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {/* Pulsing Flame Icon */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute size-14 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
          <Flame className="size-10 text-amber-300 drop-shadow-[0_4px_12px_rgba(245,158,11,0.6)] animate-bounce" />
        </div>

        {/* Big Bold Brand Name */}
        <div className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-cream drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          SPICE<span className="text-amber-300">SALLY</span>
        </div>

        {/* Sub-tagline */}
        <p className="mt-1 font-label text-sm sm:text-base tracking-[0.3em] uppercase text-cream/80 flex items-center gap-2">
          <Sparkles className="size-3 text-amber-300" />
          WICKEDLY SPICY SNACKS
          <Sparkles className="size-3 text-amber-300" />
        </p>

        {/* Dynamic Kitchen Status Message */}
        <div className="mt-8 h-12 flex items-center justify-center">
          <p
            key={stepIndex}
            className="font-label text-lg sm:text-xl md:text-2xl uppercase tracking-wider text-cream/95 drop-shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {SPICE_STEPS[stepIndex].text}
          </p>
        </div>

        {/* Sleek Spice Progress Bar */}
        <div className="mt-6 w-64 sm:w-80 flex flex-col items-center gap-2">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-black/35 border border-cream/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(251,191,36,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex w-full justify-between items-center font-label text-xs uppercase tracking-widest text-cream/70 px-1">
            <span>PREPARING BOWL</span>
            <span className="font-bold text-amber-300">{progress}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

