"use client";

import { useMemo } from "react";
import type { ToolOption } from "@/lib/tools";

type ToolConfig = Record<string, string>;

type AgentBlueprintProps = {
  availableTools: ToolOption[];
  selectedToolIds: Set<string>;
  toolConfigs: ToolConfig;
  onToggleTool: (toolId: string) => void;
  onConfigChange: (toolId: string, value: string) => void;
};

const beginnerStack = [
  "Python + FastAPI for lightweight orchestration endpoints.",
  "OpenAI Assistants / LangChain for reasoning + tool routing.",
  "Whisper API for speech-to-text and ElevenLabs for speech synthesis.",
  "SQLite + pgvector hybrid memory with LangChain retrievers.",
];

const advancedStack = [
  "Microservice mesh (Go, Rust, or Node) with event-driven message bus.",
  "Dedicated orchestration brain using Temporal or LangGraph multi-agent graphs.",
  "Hybrid local models (Llama 3, Whisper large-v3) with cloud LLM failover.",
  "Observability layer (Prometheus + OpenTelemetry) monitoring agent actions.",
];

const pipelineStages = [
  {
    title: "Search",
    description:
      "Gather intelligence with Retriever + Web Search + Knowledge Graph connectors.",
  },
  {
    title: "Book",
    description:
      "Negotiate bookings via calendar APIs, vendor integrations, or internal services.",
  },
  {
    title: "Email",
    description:
      "Draft empathetic summaries with LLM templates tuned for loyalty, then deliver.",
  },
  {
    title: "Confirm",
    description:
      "Push status updates to dashboards, Notion, or Slack, and capture new memories.",
  },
];

export function AgentBlueprint({
  availableTools,
  selectedToolIds,
  toolConfigs,
  onToggleTool,
  onConfigChange,
}: AgentBlueprintProps) {
  const selectedTools = useMemo(
    () => availableTools.filter((tool) => selectedToolIds.has(tool.id)),
    [availableTools, selectedToolIds],
  );

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
      <header className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.32em] text-white/70">
          Agent Blueprint
        </p>
        <h2 className="text-2xl font-semibold text-white">
          Long-Term Memory + Voice Orchestration Stack
        </h2>
        <p className="text-sm text-white/75">
          Select and configure the tools your Jarvis-grade agent needs. Mix
          beginner-friendly components or deploy the advanced microservice mesh.
        </p>
      </header>

      <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Beginner Stack (launch within hours)
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            {beginnerStack.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Advanced Stack (battle-ready scale)
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            {advancedStack.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/8 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm uppercase tracking-[0.26em] text-white/60">
            Tool / Action System
          </p>
          <p className="text-sm text-white/70">
            Toggle and configure. We auto-highlight defaults that complete the
            search → book → email → confirm loop.
          </p>
          <p className="text-xs text-white/50">
            {selectedTools.length} tools armed, {availableTools.length} total
            available.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {availableTools.map((tool) => {
            const active = selectedToolIds.has(tool.id);
            return (
              <div
                key={tool.id}
                className={`flex flex-col gap-3 rounded-2xl border p-4 transition ${
                  active
                    ? "border-white/60 bg-white/15 shadow-[0_10px_30px_rgba(249,115,22,0.25)]"
                    : "border-white/10 bg-black/30 hover:border-white/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                      {tool.category}
                    </p>
                    <h3 className="text-base font-semibold text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleTool(tool.id)}
                    className={`h-6 w-12 rounded-full border transition ${
                      active
                        ? "border-rose-300 bg-gradient-to-tr from-rose-500 via-amber-500 to-rose-400"
                        : "border-white/20 bg-white/10"
                    }`}
                    aria-pressed={active}
                    aria-label={`Toggle ${tool.name}`}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full bg-white transition ${
                        active ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-white/70">{tool.description}</p>
                {active ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      Configuration Notes
                    </p>
                    <textarea
                      value={toolConfigs[tool.id] ?? tool.configHints.join("\n")}
                      onChange={(event) =>
                        onConfigChange(tool.id, event.target.value)
                      }
                      className="h-28 w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white/80 placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    />
                  </div>
                ) : null}
                {!active ? (
                  <ul className="space-y-1 text-xs text-white/50">
                    {tool.configHints.map((hint) => (
                      <li key={hint}>• {hint}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 md:grid-cols-4">
        {pipelineStages.map((stage) => (
          <div
            key={stage.title}
            className="rounded-2xl border border-white/15 bg-black/30 p-4"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              {stage.title}
            </p>
            <p className="mt-2 text-sm text-white/75">{stage.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent p-5">
        <h3 className="text-base font-semibold uppercase tracking-[0.3em] text-white/70">
          Deployment Checklist
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-white/70">
          <li>
            1. Prototype locally with the beginner stack to validate memory +
            voice flows.
          </li>
          <li>
            2. Layer in advanced orchestration, microservices, and hybrid models
            as concurrency grows.
          </li>
          <li>
            3. Instrument search → book → email → confirm with tracing +
            guardrail tests before production.
          </li>
        </ol>
      </div>
    </section>
  );
}
