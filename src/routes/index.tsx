import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { FoodHero } from "@/components/food-hero";
import { FlavorWheelSection } from "@/components/flavor-wheel";
import { LoadedFriesWheelSection } from "@/components/loaded-wheel";
import { Preloader } from "@/components/preloader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spice Sally — Wickedly Spicy Snacks" },
      { name: "description", content: "Loaded chicken-and-fries bowls with bold spice and big attitude." },
      { property: "og:title", content: "Spice Sally — Wickedly Spicy Snacks" },
      { property: "og:description", content: "Loaded chicken-and-fries bowls with bold spice and big attitude." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = ["Home", "Hot Gossip", "Our Story", "Press", "Contact"];
const facts = ["6 grams fiber", "8 grams plant protein", "No artificial flavors", "Gluten free", "Zero grams sugar"];
const flavors = [
  { name: "Lemon Kick", note: "Zesty citrus heat" },
  { name: "Fire Chili", note: "Smoky red pepper" },
  { name: "Tango Paprika", note: "Sweet orange spice" },
  { name: "Wasabi Rush", note: "Green & sharp" },
];

function Marquee() {
  const row = [...facts, ...facts, ...facts, ...facts];
  return (
    <div className="relative z-20 overflow-hidden border-y-2 border-ink bg-cream py-3">
      <div className="flex w-max animate-marquee gap-10 font-label text-xl uppercase text-ink">
        {row.map((f, i) => (
          <span key={i} className="flex items-center gap-10">
            {f} <span className="size-2 rounded-full bg-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-salmon text-cream">
      <Preloader />
      <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between rounded-sm bg-cream pl-8 text-ink shadow-sm">
        <nav className="hidden gap-0 font-label text-lg uppercase md:flex">
          {nav.map((n, i) => (
            <a key={n} href="#" className={`px-4 hover:opacity-60 ${i ? "border-l border-ink" : ""}`}>{n}</a>
          ))}
        </nav>
        <a href="#" className="font-display text-2xl leading-none md:absolute md:left-1/2 md:-translate-x-1/2">
          SPICE<span className="block text-center text-xs tracking-[0.3em]">SALLY</span>
        </a>
        <div className="flex gap-1 p-1">
          <a href="#flavors" className="rounded-sm bg-ink px-6 py-4 font-label text-lg uppercase text-cream">Our Products</a>
          <button aria-label="Search" className="grid w-14 place-items-center rounded-sm border border-ink/20"><Search className="size-5" /></button>
        </div>
      </header>

      <FoodHero><Marquee /></FoodHero>

      <FlavorWheelSection />

      <LoadedFriesWheelSection />

      <section className="px-6 py-28 text-center">
        <p className="font-label text-2xl uppercase">Our story</p>
        <h2 className="mx-auto mt-4 max-w-5xl font-display text-5xl uppercase leading-none md:text-7xl">
          Snack good. Stay spicy. Spill the tea.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg">
          Sally roasts every bite slow and seasons it loud — real spices, plant protein and zero sugar. Snacking was never meant to be boring.
        </p>
      </section>

      <footer className="bg-ink px-6 py-12 text-center font-label text-lg uppercase text-cream">
        © 2026 Spice Sally · Snack good, stay spicy
      </footer>
    </main>
  );
}
