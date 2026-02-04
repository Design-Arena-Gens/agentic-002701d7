"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { AgentPersona } from "@/lib/characters";

type PersonaShowcaseProps = {
  personas: AgentPersona[];
  activePersonaId: string;
  onSelect: (id: string) => void;
};

export function PersonaShowcase({
  personas,
  activePersonaId,
  onSelect,
}: PersonaShowcaseProps) {
  const activePersona = useMemo(
    () => personas.find((persona) => persona.id === activePersonaId),
    [activePersonaId, personas],
  );

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">
          Identity Archetypes
        </p>
        <h2 className="text-2xl font-semibold text-white">
          Choose Your Guardian
        </h2>
        <p className="text-sm text-white/70">
          Each anime-inspired persona blends loyalty, calm intelligence, and
          wildfire passion. They master English and Urdu, channel the same voice
          profile, and hold fast to the “soft protector with a dangerous edge”
          archetype.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {personas.map((persona) => {
          const active = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelect(persona.id)}
              className={`group relative flex flex-col gap-4 overflow-hidden rounded-3xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                active
                  ? "border-white/60 bg-white/15"
                  : "border-white/10 bg-white/5 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-60" />
              <div className="relative flex justify-center">
                <Image
                  src={persona.image}
                  alt={persona.name}
                  width={200}
                  height={280}
                  className="w-full rounded-2xl border border-white/20 shadow-[0_15px_35px_rgba(10,10,30,0.45)]"
                />
              </div>
              <div className="relative space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                    {persona.archetype}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {persona.name}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {persona.traits.map((trait) => (
                    <li key={trait.title}>
                      <span className="font-semibold text-white">
                        {trait.title}
                      </span>{" "}
                      — {trait.description}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        })}
      </div>

      {activePersona ? (
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-black/30 p-5 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-white/60">
              Voice Blueprint
            </p>
            <p className="text-sm text-white/80">{activePersona.voiceProfile}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-white/60">
              Emotional Style
            </p>
            <ul className="space-y-1 text-sm text-white/80">
              {activePersona.emotionalStyle.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-white/60">
              Behavioral Signals
            </p>
            <ul className="space-y-1 text-sm text-white/80">
              {activePersona.behaviors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
