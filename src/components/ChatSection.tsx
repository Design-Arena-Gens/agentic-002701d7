"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowPathIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import type { AgentPersona } from "@/lib/characters";
import type { ToolOption } from "@/lib/tools";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "I am your loyal protector—calm voice, steady cadence. Tell me what mission we take on next, and I will orchestrate search → book → email → confirm without breaking stride.",
  },
];

type ChatSectionProps = {
  activePersona: AgentPersona;
  activeTools: ToolOption[];
  onClear?: () => void;
};

export function ChatSection({
  activePersona,
  activeTools,
  onClear,
}: ChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState<"en-US" | "ur-PK">("en-US");
  const [recognitionSupported] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const scopedWindow = window as typeof window & {
      webkitSpeechRecognition?: typeof window.SpeechRecognition;
    };
    return Boolean(
      scopedWindow.SpeechRecognition ?? scopedWindow.webkitSpeechRecognition,
    );
  });
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);

  const activeVoice = useMemo<SpeechSynthesisVoice | null>(() => {
    if (voices.length === 0) return null;
    const preferred = voices.find((voice) => {
      const name = voice.name.toLowerCase();
      return (
        name.includes("female") ||
        name.includes("zira") ||
        name.includes("alma") ||
        name.includes("anya")
      );
    });
    return preferred ?? voices[0];
  }, [voices]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", handleVoices);
    handleVoices();
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoices);
    };
  }, []);

  useEffect(() => {
    if (!recognitionSupported || typeof window === "undefined") {
      return;
    }
    const SpeechRecognition =
      (window as typeof window & {
        webkitSpeechRecognition?: typeof window.SpeechRecognition;
      }).SpeechRecognition ||
      (window as typeof window & {
        webkitSpeechRecognition?: typeof window.SpeechRecognition;
      }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setInput((prev) =>
          prev.length > 0 ? `${prev.trim()} ${transcript}` : transcript,
        );
      }
    };
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onerror = null;
      try {
        recognition.stop();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    };
  }, [language, recognitionSupported]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };
    const personaSummary = [
      activePersona.archetype,
      activePersona.traits[0]?.title,
      activePersona.traits[1]?.title,
    ]
      .filter(Boolean)
      .join(" · ");

    const toolSummary = activeTools
      .map((tool) => `• ${tool.name}: ${tool.description}`)
      .join("\n");

    const assistantReply: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: [
        `Persona online → ${personaSummary}.`,
        `Key tools armed:\n${toolSummary}`,
        `Action plan: I will listen in ${
          language === "en-US" ? "English" : "Urdu"
        }, maintain calm authority, and run the search → book → email → confirm loop once you declare the target.`,
      ].join("\n\n"),
    };

    setMessages((prev) => [...prev, userMessage, assistantReply]);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleListenToggle = () => {
    if (!recognitionRef.current) {
      window.alert(
        "Voice capture is not supported in this browser. Try Chrome or Edge.",
      );
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
      return;
    }
    try {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpeakLast = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "assistant");
    if (!lastAssistantMessage) return;
    const utterance = new SpeechSynthesisUtterance(lastAssistantMessage.content);
    if (activeVoice) {
      utterance.voice = activeVoice;
    }
    utterance.pitch = 1;
    utterance.rate = 0.95;
    utterance.volume = 1;
    utterance.lang = language;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setMessages(initialMessages);
    setInput("");
    onClear?.();
  };

  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg shadow-[0_0_40px_rgba(14,14,30,0.35)]">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24rem] text-white/80">
            Tactical Chat Link
          </p>
          <h2 className="text-xl font-semibold text-white">
            Speak with {activePersona.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSpeakLast}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Read latest assistant message aloud"
          >
            <SpeakerWaveIcon
              className={`h-5 w-5 ${speaking ? "animate-pulse text-rose-200" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Clear conversation"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </header>
      <div className="flex items-center gap-3">
        <label
          htmlFor="language"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
        >
          Voice channel
        </label>
        <select
          id="language"
          value={language}
          onChange={(event) =>
            setLanguage(event.target.value as "en-US" | "ur-PK")
          }
          className="h-9 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <option value="en-US">English (Guardian cadence)</option>
          <option value="ur-PK">Urdu (نرم محافظ آہنگ)</option>
        </select>
      </div>
      <div className="flex h-64 flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-lg shadow-black/40 ${
                  message.role === "assistant"
                    ? "border-white/10 bg-white/10 text-white"
                    : "border-rose-200/40 bg-rose-500/30 text-rose-50"
                }`}
              >
                {message.content.split("\n").map((line) => (
                  <p key={line} className="whitespace-pre-wrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Compose Message
          </p>
          <button
            type="button"
            onClick={handleListenToggle}
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              listening ? "bg-rose-500 text-white" : "bg-white/10 text-white/80"
            } ${recognitionSupported ? "" : "cursor-not-allowed opacity-50"}`}
            disabled={!recognitionSupported}
          >
            <MicrophoneIcon className="h-4 w-4" />
            {listening ? "Listening…" : "Voice Capture"}
          </button>
        </div>
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Speak or type your command. Loyalty, calm intelligence, and wild passion are on standby."
            className="h-28 flex-1 resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          />
          <button
            type="button"
            onClick={handleSend}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-amber-500 to-rose-400 text-white shadow-[0_10px_30px_rgba(249,115,22,0.45)] transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="h-5 w-5 -translate-x-[1px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
