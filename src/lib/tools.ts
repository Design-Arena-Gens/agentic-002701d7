export type ToolCategory =
  | "Core Intelligence"
  | "Memory"
  | "Voice"
  | "Orchestration"
  | "Productivity"
  | "System Integration";

export type ToolOption = {
  id: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
  category: ToolCategory;
  configHints: string[];
};

export const toolOptions: ToolOption[] = [
  {
    id: "openai-gpt-4o",
    name: "OpenAI GPT-4o",
    description: "Primary reasoning + conversational core with multi-lingual depth.",
    defaultEnabled: true,
    category: "Core Intelligence",
    configHints: [
      "Set `response_style` presets for loyal protector persona.",
      "Leverage function calling for booking + email flows.",
    ],
  },
  {
    id: "anthropic-claude",
    name: "Anthropic Claude Sonnet",
    description: "Backup plan for safety sweeps and long-form synthesis.",
    defaultEnabled: false,
    category: "Core Intelligence",
    configHints: [
      "Use as safety critic with event triggers.",
      "Route high-empathy responses when deep care is required.",
    ],
  },
  {
    id: "vector-memory",
    name: "Vector Memory",
    description: "Hybrid SQLite + pgvector snapshot for long-term relationships.",
    defaultEnabled: true,
    category: "Memory",
    configHints: [
      "Store emotional cues tagged with sentiment + trust score.",
      "Partition memory by context: `mission`, `preferences`, `boundaries`.",
    ],
  },
  {
    id: "scratchpad",
    name: "Temporal Scratchpad",
    description: "Short-lived working memory for orchestration loops.",
    defaultEnabled: true,
    category: "Memory",
    configHints: [
      "Reset between tool runs to prevent hallucinations.",
      "Persist decisions that affect upcoming actions.",
    ],
  },
  {
    id: "whisper",
    name: "Whisper Speech-to-Text",
    description: "Streaming voice capture with diarization support.",
    defaultEnabled: true,
    category: "Voice",
    configHints: [
      "Force `temperature=0` for command precision.",
      "Enable `prompt` seeding with persona catchphrases.",
    ],
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs TTS",
    description: "Custom neural voice with soft protector timbre.",
    defaultEnabled: true,
    category: "Voice",
    configHints: [
      "Upload training clips matching archetype directives.",
      "Keep speaking rate < 0.95 for calm cadence.",
    ],
  },
  {
    id: "event-bus",
    name: "Event Bridge",
    description: "Publish/subscribe backbone for microservice agents.",
    defaultEnabled: false,
    category: "Orchestration",
    configHints: [
      "Emit `search.intent`, `booking.intent`, `email.intent` events.",
      "Use priority queue to resolve conflicts gracefully.",
    ],
  },
  {
    id: "workflow-engine",
    name: "Temporal / LangGraph",
    description: "Deterministic multi-agent workflow runner.",
    defaultEnabled: true,
    category: "Orchestration",
    configHints: [
      "Model search → book → email → confirm as resilient workflow.",
      "Attach guard states for failure retries.",
    ],
  },
  {
    id: "calendar-api",
    name: "Google Calendar",
    description: "Book + confirm meetings with loyalty-first etiquette.",
    defaultEnabled: false,
    category: "Productivity",
    configHints: [
      "Translate prompts to user’s preferred language before send.",
      "Add contextual summaries from memory embeddings.",
    ],
  },
  {
    id: "notion-sync",
    name: "Notion Memory Sync",
    description: "Surface long-term reflections + battle reports.",
    defaultEnabled: false,
    category: "System Integration",
    configHints: [
      "Sync highlights after each orchestration cycle.",
      "Encrypt personal notes before external storage.",
    ],
  },
];
