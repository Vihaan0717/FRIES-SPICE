import { useEffect, useRef, type CSSProperties } from "react";
import bowl from "@/assets/chicken-fries-bowl.png";
import chickenRound from "@/assets/chicken-cutout-1.png";
import chickenLong from "@/assets/chicken-cutout-2.png";
import chickenAngular from "@/assets/chicken-cutout-3.png";
import chickenOblong from "@/assets/chicken-cutout-4.png";
import friesCurved from "@/assets/fries-cutout-1.png";
import friesShort from "@/assets/fries-cutout-2.png";
import friesTapered from "@/assets/fries-cutout-3.png";
import friesBent from "@/assets/fries-cutout-4.png";
import friesNarrow from "@/assets/fries-cutout-5.png";
import friesGolden from "@/assets/fries-cutout-6.png";

const floatingFood = [
  { src: chickenRound, position: "food-piece-1", rotation: "-28deg", delay: "-2.1s", duration: "6.7s", lift: "-14px", sway: "6px", speed: 0.12, ease: 0.09, drift: -0.025, spin: -0.016 },
  { src: friesCurved, position: "food-piece-2", rotation: "24deg", delay: "-4.4s", duration: "8.2s", lift: "-25px", sway: "-9px", speed: 0.26, ease: 0.055, drift: 0.04, spin: 0.023 },
  { src: friesTapered, position: "food-piece-3", rotation: "-38deg", delay: "-1.3s", duration: "5.9s", lift: "-11px", sway: "11px", speed: 0.17, ease: 0.12, drift: -0.04, spin: -0.032 },
  { src: chickenAngular, position: "food-piece-4", rotation: "18deg", delay: "-5.7s", duration: "9.4s", lift: "-19px", sway: "-5px", speed: 0.22, ease: 0.07, drift: 0.022, spin: 0.015 },
  { src: friesShort, position: "food-piece-5", rotation: "68deg", delay: "-3.2s", duration: "7.5s", lift: "-16px", sway: "8px", speed: 0.08, ease: 0.045, drift: 0.035, spin: -0.022 },
  { src: chickenLong, position: "food-piece-6", rotation: "-16deg", delay: "-1.8s", duration: "6.1s", lift: "-22px", sway: "-8px", speed: 0.19, ease: 0.1, drift: -0.03, spin: 0.027 },
  { src: friesBent, position: "food-piece-7", rotation: "14deg", delay: "-6.2s", duration: "10.3s", lift: "-28px", sway: "5px", speed: 0.28, ease: 0.065, drift: 0.025, spin: -0.018 },
  { src: chickenOblong, position: "food-piece-8", rotation: "-45deg", delay: "-3.9s", duration: "8.8s", lift: "-13px", sway: "-12px", speed: 0.14, ease: 0.085, drift: -0.02, spin: 0.034 },
  { src: friesNarrow, position: "food-piece-9", rotation: "30deg", delay: "-2.6s", duration: "7.1s", lift: "-20px", sway: "7px", speed: 0.24, ease: 0.05, drift: 0.03, spin: -0.025 },
  { src: friesGolden, position: "food-foreground food-foreground-1", rotation: "-32deg", delay: "-4.8s", duration: "9.1s", lift: "-16px", sway: "7px", speed: 0.2, ease: 0.07, drift: -0.02, spin: 0.014 },
  { src: chickenRound, position: "food-foreground food-foreground-2", rotation: "22deg", delay: "-2.4s", duration: "8.4s", lift: "-12px", sway: "-6px", speed: 0.16, ease: 0.08, drift: 0.02, spin: -0.018 },
  { src: friesTapered, position: "food-foreground food-foreground-3", rotation: "-12deg", delay: "-5.1s", duration: "10.1s", lift: "-18px", sway: "5px", speed: 0.25, ease: 0.06, drift: 0.015, spin: 0.02 },
];

export function FoodHero({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bowlRef = useRef<HTMLDivElement>(null);
  const foodRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      section.style.setProperty("--cursor-x", `${x}px`);
      section.style.setProperty("--cursor-y", `${y}px`);
    };

    const animate = () => {
      x += (targetX - x) * 0.085;
      y += (targetY - y) * 0.085;
      if (Math.abs(targetX - x) < 0.05) x = targetX;
      if (Math.abs(targetY - y) < 0.05) y = targetY;
      paint();
      frame = x === targetX && y === targetY ? 0 : window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const bounds = section.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      targetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)) * 32;
      targetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)) * 22;
      schedule();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        x = 0;
        y = 0;
        paint();
      } else {
        schedule();
      }
    };

    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    reducedMotion.addEventListener("change", reset);
    return () => {
      window.cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      reducedMotion.removeEventListener("change", reset);
      section.style.removeProperty("--cursor-x");
      section.style.removeProperty("--cursor-y");
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const bowlElement = bowlRef.current;
    if (!section || !bowlElement) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = 0;
    let target = 0;
    const pieceProgress = floatingFood.map(() => 0);
    let sectionTop = section.getBoundingClientRect().top + window.scrollY;
    let limit = section.offsetHeight * 0.8;

    const paint = () => {
      bowlElement.style.setProperty("--scroll-y", `${current * 0.64}px`);
      bowlElement.style.setProperty("--scroll-rotation", `${current * 0.004}deg`);
      foodRefs.current.forEach((element, index) => {
        const food = floatingFood[index];
        if (!food || !element) return;
        const progress = pieceProgress[index] ?? 0;
        element.style.setProperty("--scroll-y", `${progress * food.speed}px`);
        element.style.setProperty("--scroll-x", `${progress * food.drift}px`);
        element.style.setProperty("--scroll-rotation", `${progress * food.spin}deg`);
      });
    };

    const animate = () => {
      current += (target - current) * 0.045;
      if (Math.abs(target - current) < 0.1) current = target;
      let settled = current === target;
      floatingFood.forEach((food, index) => {
        const previous = pieceProgress[index] ?? 0;
        const next = previous + (target - previous) * food.ease;
        pieceProgress[index] = Math.abs(target - next) < 0.1 ? target : next;
        if (pieceProgress[index] !== target) settled = false;
      });
      paint();
      frame = settled ? 0 : window.requestAnimationFrame(animate);
    };

    const update = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        current = 0;
        target = 0;
        pieceProgress.fill(0);
        paint();
        return;
      }
      target = Math.min(limit, Math.max(0, window.scrollY - sectionTop));
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      limit = section.offsetHeight * 0.8;
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize);
    reducedMotion.addEventListener("change", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="food-hero relative overflow-hidden">
      <h1 className="food-headline relative z-10 text-center font-display uppercase">
        Wickedly<br />Spicy Snacks
      </h1>
      <div ref={bowlRef} className="food-bowl pointer-events-none absolute z-20">
        <img
          src={bowl}
          alt="Loaded chicken and French fries bowl with cheese sauce and herbs"
          width={1024}
          height={1024}
          fetchPriority="high"
          className="block h-auto w-full select-none"
        />
      </div>
      {floatingFood.map((food, index) => (
        <div
          key={food.position}
          ref={(element) => { foodRefs.current[index] = element; }}
          className={`food-piece pointer-events-none absolute z-30 select-none ${food.position}`}
        >
          <img
            src={food.src}
            alt=""
            width={512}
            height={512}
            className="food-piece-image block h-auto w-full select-none"
            style={{
              "--r": food.rotation,
              "--float-duration": food.duration,
              "--float-lift": food.lift,
              "--float-sway": food.sway,
              animationDelay: food.delay,
            } as CSSProperties}
          />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 z-40">{children}</div>
    </section>
  );
}
