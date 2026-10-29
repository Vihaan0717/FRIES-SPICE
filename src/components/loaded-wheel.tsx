import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Flame, Sparkles } from "lucide-react";

import paneerLoadedCutout from "@/assets/loaded-bowl-paneer.png";
import tendersLoadedCutout from "@/assets/loaded-bowl-tenders.png";
import popcornLoadedCutout from "@/assets/loaded-bowl-popcorn.png";
import jalapenoLoadedCutout from "@/assets/loaded-bowl-jalapeno.png";
import fullMandalaImg from "@/assets/full-mandala-vector.png";

export interface LoadedBowlItem {
  id: string;
  name: string;
  price: string;
  basePairing: string;
  description: string;
  badge: string;
  spiceLevel: string;
  image: string;
  bgGradient: string;
  accentHex: string;
  badgeBg: string;
  buttonBg: string;
  glowColor: string;
}

export const LOADED_BOWLS: LoadedBowlItem[] = [
  {
    id: "loaded-paneer",
    name: "CRISPY PANEER & JALAPEÑO LOADED BOWL",
    price: "₹249",
    basePairing: "Spiced Crinkle Fries & Molten Cheddar",
    description:
      "Crispy golden panko-crusted paneer cubes tossed over seasoned fries with pickled jalapeños, black olives, smoky chipotle drizzle, and fresh green scallions.",
    badge: "VEG SPECIAL",
    spiceLevel: "MILD JALAPEÑO",
    image: paneerLoadedCutout,
    bgGradient: "radial-gradient(ellipse at 25% 50%, #b24a2f 0%, #993b22 40%, #7d2c16 75%, #601e0d 100%)",
    accentHex: "#fed7aa",
    badgeBg: "rgba(180, 83, 9, 0.45)",
    buttonBg: "#b24a2f",
    glowColor: "rgba(254, 215, 170, 0.4)",
  },
  {
    id: "loaded-tenders",
    name: "BBQ CHICKEN TENDERS & CRUNCH BOWL",
    price: "₹279",
    basePairing: "Cajun Golden Fries & Garlic Herb Ranch",
    description:
      "Hand-breaded chicken tenders glazed in sweet smoky BBQ and melted cheese sauce, garnished with jalapeño peppers, black sesame, and garden herbs.",
    badge: "CHEF'S SIGNATURE",
    spiceLevel: "SMOKY BBQ HEAT",
    image: tendersLoadedCutout,
    bgGradient: "radial-gradient(ellipse at 25% 50%, #9e3223 0%, #872518 40%, #6e190e 75%, #541006 100%)",
    accentHex: "#fecdd3",
    badgeBg: "rgba(190, 24, 93, 0.45)",
    buttonBg: "#a12c1b",
    glowColor: "rgba(254, 205, 211, 0.4)",
  },
  {
    id: "loaded-popcorn",
    name: "FIERY POPCORN CHICKEN DYNAMITE BOWL",
    price: "₹269",
    basePairing: "Double-Fried Russet Fries & Sriracha Mayo",
    description:
      "Bite-sized crispy popcorn chicken dredged in spicy red chili glaze and creamy garlic mayo, finished with crushed chili flakes and chopped red onions.",
    badge: "BESTSELLER",
    spiceLevel: "FIERY CRUNCH",
    image: popcornLoadedCutout,
    bgGradient: "radial-gradient(ellipse at 25% 50%, #bf4a1e 0%, #a73c14 40%, #8d2e0b 75%, #722104 100%)",
    accentHex: "#ffedd5",
    badgeBg: "rgba(194, 65, 12, 0.45)",
    buttonBg: "#c24b1c",
    glowColor: "rgba(255, 237, 213, 0.45)",
  },
  {
    id: "loaded-jalapeno",
    name: "JALAPEÑO CHEDDAR SMASH LOADED BOWL",
    price: "₹259",
    basePairing: "House Seasoned Fries & Molten Cheddar",
    description:
      "Crunchy southern fried chicken bites layered over golden fries, smothered in warm molten cheddar cheese, pickled jalapeño rings, and toasted sesame.",
    badge: "STREET STYLE FAVORITE",
    spiceLevel: "BOLD CHEDDAR HEAT",
    image: jalapenoLoadedCutout,
    bgGradient: "radial-gradient(ellipse at 25% 50%, #943a28 0%, #7d2e1d 40%, #662214 75%, #4f170c 100%)",
    accentHex: "#fed7aa",
    badgeBg: "rgba(180, 83, 9, 0.45)",
    buttonBg: "#9c3c28",
    glowColor: "rgba(254, 215, 170, 0.4)",
  },
];

// An intricate, continuous moving traditional Temple Border Marquee
// (Fade mask placed on the RIGHT edge where the mandala flower rotates)
function KolamPatternBorderRightFade() {
  const segment = (
    <div className="flex shrink-0 items-center">
      <svg
        className="h-20 sm:h-24 md:h-28 w-auto text-cream"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {/* Top Ornate Temple Crests & Scallop Arches */}
        <path
          d="M 0,22 Q 25,6 50,22 Q 75,6 100,22 Q 125,6 150,22 Q 175,6 200,22 Q 225,6 250,22 Q 275,6 300,22 Q 325,6 350,22 Q 375,6 400,22 Q 425,6 450,22 Q 475,6 500,22 Q 525,6 550,22 Q 575,6 600,22 Q 625,6 650,22 Q 675,6 700,22 Q 725,6 750,22 Q 775,6 800,22"
          stroke="currentColor"
        />
        {/* Twin Filigree Guard Lines */}
        <line x1="0" y1="26" x2="800" y2="26" stroke="currentColor" strokeWidth="0.8" />
        <line x1="0" y1="30" x2="800" y2="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="0" y1="34" x2="800" y2="34" stroke="currentColor" strokeWidth="0.8" />

        {/* Central Interlocking Paisley / Lotus Petal Chain */}
        <path
          d="M 0,46 C 25,32 35,60 50,46 C 65,32 75,60 100,46 C 125,32 135,60 150,46 C 175,32 185,60 200,46 C 225,32 235,60 250,46 C 275,32 285,60 300,46 C 325,32 335,60 350,46 C 375,32 385,60 400,46 C 425,32 435,60 450,46 C 475,32 485,60 500,46 C 525,32 535,60 550,46 C 575,32 585,60 600,46 C 625,32 635,60 650,46 C 675,32 685,60 700,46 C 725,32 735,60 750,46 C 775,32 785,60 800,46"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        {/* Counter-woven Ribbon for Geometric Harmony */}
        <path
          d="M 0,46 C 25,60 35,32 50,46 C 65,60 75,32 100,46 C 125,60 135,32 150,46 C 175,60 185,32 200,46 C 225,60 235,32 250,46 C 275,60 285,32 300,46 C 325,60 335,32 350,46 C 375,60 385,32 400,46 C 425,60 435,32 450,46 C 475,60 485,32 500,46 C 525,60 535,32 550,46 C 575,60 585,32 600,46 C 625,60 635,32 650,46 C 675,60 685,32 700,46 C 725,60 735,32 750,46 C 775,60 785,32 800,46"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        {/* Traditional Floral Seed Dots (Bindus) inside each eyelet */}
        {[25, 75, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575, 625, 675, 725, 775].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="46" r="2.2" fill="currentColor" />
            <circle cx={cx} cy="14" r="1.6" fill="currentColor" />
          </g>
        ))}

        {/* Lower Double Trim Base */}
        <line x1="0" y1="58" x2="800" y2="58" stroke="currentColor" strokeWidth="0.8" />
        <line x1="0" y1="62" x2="800" y2="62" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 3" />
        <line x1="0" y1="66" x2="800" y2="66" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </div>
  );

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden opacity-50 select-none z-10"
      style={{
        // Smooth horizontal mask: fades out near the RIGHT where the mandala flower is, as if passing under/inside it
        maskImage:
          "linear-gradient(to left, transparent 0%, transparent 8%, rgba(0,0,0,0.4) 22%, rgba(0,0,0,1) 36%, rgba(0,0,0,1) 100%)",
        WebkitMaskImage:
          "linear-gradient(to left, transparent 0%, transparent 8%, rgba(0,0,0,0.4) 22%, rgba(0,0,0,1) 36%, rgba(0,0,0,1) 100%)",
      }}
    >
      <div className="flex w-max animate-marquee">
        {segment}
        {segment}
        {segment}
        {segment}
      </div>
    </div>
  );
}

export function LoadedFriesWheelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          ticking = false;
          return;
        }

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = container.offsetHeight - windowHeight;

        if (totalScrollable <= 0) {
          ticking = false;
          return;
        }

        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        setScrollProgress(progress);

        const rawIndex = Math.round(progress * (LOADED_BOWLS.length - 1));
        const index = Math.max(0, Math.min(LOADED_BOWLS.length - 1, rawIndex));
        setActiveIndex(index);

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = LOADED_BOWLS[activeIndex] || LOADED_BOWLS[0];

  // Circle radius and sweep
  const radius = 620;
  const circleDiameter = radius * 2;
  const itemSeparationDeg = 52;

  // On the LEFT side, bowls arch into the screen with focus at angle 0°
  // Clockwise rotation brings upcoming items down into center
  const wheelRotationDeg = scrollProgress * (LOADED_BOWLS.length - 1) * itemSeparationDeg;

  // Mandala rotation: rotates smoothly on the right edge as you scroll
  const mandalaRotationDeg = scrollProgress * 120;

  return (
    <section
      ref={containerRef}
      id="loaded-bowls"
      className="relative h-[340vh] transition-all duration-700 text-cream"
      style={{ background: active.bgGradient }}
    >
      {/* ── SINGLE STICKY VIEWPORT CONTAINER ── */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-between overflow-hidden px-6 sm:px-12 md:px-20">

        {/* 1. RIGHT-anchored Rotating Mandala (Center pinned at right edge so exactly half is visible) */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 select-none z-0"
          style={{
            width: "min(130vh, 980px)",
            height: "min(130vh, 980px)",
            opacity: 0.28,
          }}
        >
          <img
            src={fullMandalaImg}
            alt=""
            className="size-full object-contain pointer-events-none select-none will-change-transform"
            style={{
              transform: `rotate(${-mandalaRotationDeg}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        </div>

        {/* 2. Bottom Kolam Vector Pattern Element (Fades out into the right mandala) */}
        <KolamPatternBorderRightFade />

        {/* ── 3. LEFT: Interactive Wheel Arc (~40% of circle visible entering from left edge) ── */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 flex items-center justify-center z-10"
          style={{
            width: `${circleDiameter}px`,
            height: `${circleDiameter}px`,
            transform: "translate(-60%, -50%)",
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute rounded-full blur-3xl opacity-40 transition-colors duration-700"
            style={{
              width: circleDiameter - 200,
              height: circleDiameter - 200,
              backgroundColor: active.glowColor,
            }}
          />

          {/* Rotating Container */}
          <div
            className="relative rounded-full will-change-transform"
            style={{
              width: circleDiameter,
              height: circleDiameter,
              transform: `rotate(${wheelRotationDeg}deg)`,
            }}
          >
            {LOADED_BOWLS.map((bowl, index) => {
              // Base angle: 0 deg points East into the screen
              // Upcoming bowls spaced above (negative angles)
              const baseAngleDeg = 0 - index * itemSeparationDeg;
              const angleRad = (baseAngleDeg * Math.PI) / 180;
              const x = radius + Math.cos(angleRad) * radius;
              const y = radius + Math.sin(angleRad) * radius;
              const isCurrent = index === activeIndex;

              return (
                <div
                  key={bowl.id}
                  className="pointer-events-auto absolute"
                  style={{
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%) rotate(${-wheelRotationDeg}deg)`,
                  }}
                >
                  <div
                    onClick={() => {
                      const container = containerRef.current;
                      if (!container) return;
                      const scrollable = container.offsetHeight - window.innerHeight;
                      window.scrollTo({
                        top: container.offsetTop + (index / (LOADED_BOWLS.length - 1)) * scrollable,
                        behavior: "smooth",
                      });
                    }}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-500 ease-out ${
                      isCurrent ? "scale-115 z-30" : "scale-85 opacity-60 hover:opacity-95 hover:scale-95 z-10"
                    }`}
                  >
                    {/* Soft Ground Contact Shadow */}
                    <div
                      className="absolute bottom-2 left-1/2 pointer-events-none rounded-[100%] transition-all duration-700 -z-10"
                      style={{
                        width: isCurrent ? "72%" : "60%",
                        height: isCurrent ? "24px" : "18px",
                        background:
                          "radial-gradient(ellipse at center, rgba(15, 6, 3, 0.45) 0%, rgba(15, 6, 3, 0.18) 45%, transparent 75%)",
                        filter: "blur(8px)",
                        transform: `translate(-50%, 65%) ${isCurrent ? "scale(1.1)" : "scale(0.9)"}`,
                      }}
                    />

                    {/* Elevated Pure Bowl with clean natural shadows */}
                    <div
                      className="relative w-[280px] sm:w-[340px] md:w-[390px] lg:w-[440px] xl:w-[480px] transition-all duration-500 ease-out group-hover:scale-105"
                      style={{
                        filter: isCurrent
                          ? "drop-shadow(0 20px 24px rgba(0, 0, 0, 0.35)) drop-shadow(0 6px 10px rgba(0, 0, 0, 0.18))"
                          : "drop-shadow(0 12px 16px rgba(0, 0, 0, 0.22))",
                      }}
                    >
                      <img
                        src={bowl.image}
                        alt={bowl.name}
                        className="w-full h-auto object-contain select-none pointer-events-none transition-transform duration-700 group-hover:-translate-y-1"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 4. RIGHT: Product Details & CTA ── */}
        <div className="relative z-20 max-w-xl pl-4 ml-auto text-left">

          {/* Badges row with Indian classical styling */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-label text-xs tracking-widest uppercase text-cream shadow-sm border border-cream/20 backdrop-blur-md"
              style={{ backgroundColor: active.badgeBg }}
            >
              <Sparkles className="size-3 text-amber-300" />
              {active.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-black/30 px-4 py-1.5 font-label text-xs tracking-widest uppercase text-cream/90 backdrop-blur-md">
              <Flame className="size-3 text-orange-400" />
              {active.spiceLevel}
            </span>
          </div>

          {/* Classical Headline */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.85rem] font-bold uppercase leading-[1.05] tracking-tight text-cream drop-shadow-sm"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
          >
            {active.name}
          </h2>

          {/* Base Pairing */}
          <div className="mt-4 flex items-center gap-2.5 text-sm md:text-base font-medium text-cream/90">
            <span className="rounded-md border border-cream/30 bg-cream/15 px-2.5 py-0.5 font-label uppercase tracking-widest text-xs text-cream">
              LOADED ON
            </span>
            <span className="tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              {active.basePairing}
            </span>
          </div>

          {/* Detailed Description */}
          <p
            className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-cream/85 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {active.description}
          </p>

          {/* Price & Buy Now Action */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex flex-col">
              <span className="font-label text-xs uppercase tracking-widest text-cream/70">
                SPECIAL PRICE
              </span>
              <span
                className="text-5xl sm:text-6xl font-bold tracking-tight text-cream drop-shadow-sm"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {active.price}
              </span>
            </div>

            <button
              onClick={() => alert(`Added ${active.name} (${active.price}) to cart!`)}
              className="group flex items-center gap-3 rounded-full border border-cream/40 px-8 py-4 font-label text-lg uppercase tracking-widest text-cream shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cream"
              style={{ backgroundColor: active.buttonBg }}
            >
              <ShoppingBag className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>BUY NOW</span>
            </button>
          </div>

          {/* Clean Navigation Selector Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {LOADED_BOWLS.map((bowl, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={bowl.id}
                  onClick={() => {
                    const container = containerRef.current;
                    if (!container) return;
                    const scrollable = container.offsetHeight - window.innerHeight;
                    window.scrollTo({
                      top: container.offsetTop + (index / (LOADED_BOWLS.length - 1)) * scrollable,
                      behavior: "smooth",
                    });
                  }}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-label text-xs tracking-wider uppercase transition-all duration-300 ${
                    isSelected
                      ? "bg-cream text-ink font-bold shadow-md scale-105"
                      : "bg-black/25 text-cream/75 border border-cream/20 hover:bg-black/40 hover:text-cream"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isSelected ? "bg-amber-600" : "bg-cream/50"
                    }`}
                  />
                  <span>
                    {bowl.name.split(" ")[1] || bowl.name.split(" ")[0]} · {bowl.price}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

