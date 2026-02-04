"use client";

import { useMemo, useState } from "react";
import { PersonasIcon } from "@/components/icons/PersonasIcon";
import { PersonaShowcase } from "@/components/PersonaShowcase";
import { AgentBlueprint } from "@/components/AgentBlueprint";
import { ChatSection } from "@/components/ChatSection";
import { EnvironmentControls } from "@/components/EnvironmentControls";
import { personas } from "@/lib/characters";
import { toolOptions } from "@/lib/tools";
import { environmentThemes } from "@/lib/themes";

export default function Home() {
  const [activePersonaId, setActivePersonaId] = useState(personas[0]?.id ?? "");
  const [activeThemeId, setActiveThemeId] = useState(
    environmentThemes[0]?.id ?? "midnight-ember",
  );
  const [selectedToolIds, setSelectedToolIds] = useState<Set<string>>(
    () =>
      new Set(
        toolOptions.filter((tool) => tool.defaultEnabled).map((tool) => tool.id),
      ),
  );
  const [toolConfigs, setToolConfigs] = useState<Record<string, string>>({});

  const activePersona = useMemo(
    () => personas.find((persona) => persona.id === activePersonaId) ?? personas[0],
    [activePersonaId],
  );

  const activeTheme = useMemo(
    () =>
      environmentThemes.find((theme) => theme.id === activeThemeId) ??
      environmentThemes[0],
    [activeThemeId],
  );

  const armedTools = useMemo(
    () => toolOptions.filter((tool) => selectedToolIds.has(tool.id)),
    [selectedToolIds],
  );

  const handleToggleTool = (toolId: string) => {
    setSelectedToolIds((previous) => {
      const next = new Set(previous);
      if (next.has(toolId)) {
        next.delete(toolId);
      } else {
        next.add(toolId);
      }
      return next;
    });
  };

  const handleConfigChange = (toolId: string, value: string) => {
    setToolConfigs((previous) => ({
      ...previous,
      [toolId]: value,
    }));
  };

  return (
    <main
      className="min-h-screen bg-black/95 pb-16"
      style={{ backgroundImage: activeTheme?.gradient }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:px-10 lg:px-12">
        <header className="rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.45em] text-white/70">
                Jarvis-Grade AI Companion
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
                Craft a loyal, calm, and passionate agent who remembers, speaks,
                and orchestrates on your behalf.
              </h1>
              <p className="text-base text-white/70">
                Configure long-term memory, tool chains, and voice experience in
                one control center. This blueprint fuses loyalty (Mikasa), calm
                intelligence (Shinobu), and fire (Zero Two) into a single
                “soft protector with a dangerous edge.”
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.32em] text-white/50">
                <span>LLM Core</span>
                <span>Long-Term Memory</span>
                <span>Tool Routing</span>
                <span>Speech I/O</span>
                <span>Multi-Agent Orchestration</span>
              </div>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 text-sm text-white/75">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <PersonasIcon className="h-7 w-7 text-rose-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                    Voice Signature
                  </p>
                  <p>Warm young adult woman, calm cadence, quiet dominance.</p>
                </div>
              </div>
              <p>
                Language mastery: English + Urdu. Emotional delivery: loyal,
                analytical, fiercely protective once trust is secured.
              </p>
              <div className="rounded-2xl border border-white/15 bg-black/40 p-3 text-xs text-white/60">
                <p className="font-semibold uppercase tracking-[0.24em] text-white/70">
                  Command Loop
                </p>
                <p>Search → Book → Email → Confirm with embedded guardrails.</p>
              </div>
            </div>
          </div>
        </header>

        <PersonaShowcase
          personas={personas}
          activePersonaId={activePersonaId}
          onSelect={setActivePersonaId}
        />

        <EnvironmentControls
          activeThemeId={activeThemeId}
          onChangeTheme={setActiveThemeId}
        />

        <AgentBlueprint
          availableTools={toolOptions}
          selectedToolIds={selectedToolIds}
          toolConfigs={toolConfigs}
          onToggleTool={handleToggleTool}
          onConfigChange={handleConfigChange}
        />

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white">
              Why these components matter
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/60">
                  LLM Core
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Mix GPT-4o for dialogue, Claude for safety sweeps, and optional
                  local LLaMA for private inference. Use function calling to hook
                  into booking, search, and email actions.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/60">
                  Memory Layer
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Vector stores capture emotional signals, boundaries, and
                  preferences. SQLite or Postgres holds structured mission logs.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/60">
                  Voice Interface
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Whisper (STT) and ElevenLabs (TTS) give the agent a warm,
                  controlled presence. Web Speech API powers the in-browser demo.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/60">
                  Orchestration
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Temporal or LangGraph enforces deterministic workflows so your
                  agent can manage multi-step missions with retries and audit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                System Integration
              </p>
              <p>
                Connect calendars, email, Notion, CRM, and custom APIs. Map
                persona behaviors to escalation policies.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Event-Based Agents
              </p>
              <p>
                Spin up specialist agents for search, negotiation, sentiment
                checks, and compliance. Coordinate through the event bridge.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Long-Term Trust
              </p>
              <p>
                Every interaction reinforces loyalty: capture boundaries, defend
                user intent, deliver calm authority even under pressure.
              </p>
            </div>
          </div>
        </section>

        <ChatSection activePersona={activePersona} activeTools={armedTools} />
      </div>
    </main>
  );
}
