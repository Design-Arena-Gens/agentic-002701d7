"use client";

import { environmentThemes } from "@/lib/themes";

type EnvironmentControlsProps = {
  activeThemeId: string;
  onChangeTheme: (themeId: string) => void;
};

export function EnvironmentControls({
  activeThemeId,
  onChangeTheme,
}: EnvironmentControlsProps) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-white/70">
          Environment
        </p>
        <h2 className="text-xl font-semibold text-white">
          Mood Lighting & Atmosphere
        </h2>
        <p className="text-sm text-white/70">
          Shift the command center palette to match the agent&apos;s energy.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {environmentThemes.map((theme) => {
          const active = theme.id === activeThemeId;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChangeTheme(theme.id)}
              className={`flex flex-col gap-3 rounded-3xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                active
                  ? "border-white/60 bg-white/15"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <span
                className="h-24 w-full rounded-2xl border border-white/20 shadow-[0_10px_25px_rgba(8,8,20,0.55)]"
                style={{ backgroundImage: theme.gradient }}
              />
              <span className="text-sm font-semibold text-white">
                {theme.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
