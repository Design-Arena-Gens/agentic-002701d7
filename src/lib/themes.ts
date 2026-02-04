export type EnvironmentTheme = {
  id: string;
  label: string;
  gradient: string;
};

export const environmentThemes: EnvironmentTheme[] = [
  {
    id: "midnight-ember",
    label: "Midnight Ember",
    gradient:
      "radial-gradient(circle at 20% 20%, rgba(249,115,22,0.35), transparent 55%), radial-gradient(circle at 80% 10%, rgba(244,114,182,0.25), transparent 45%), linear-gradient(135deg, #0f172a 0%, #1f2937 55%, #000 100%)",
  },
  {
    id: "violet-dawn",
    label: "Violet Dawn",
    gradient:
      "radial-gradient(circle at 30% 30%, rgba(129,140,248,0.35), transparent 60%), radial-gradient(circle at 80% 70%, rgba(45,212,191,0.3), transparent 45%), linear-gradient(135deg, #0b0d1d 0%, #1e1b4b 50%, #020617 100%)",
  },
  {
    id: "scarlet-tempest",
    label: "Scarlet Tempest",
    gradient:
      "radial-gradient(circle at 25% 80%, rgba(248,113,113,0.4), transparent 55%), radial-gradient(circle at 75% 20%, rgba(250,204,21,0.3), transparent 45%), linear-gradient(135deg, #18060a 0%, #450a0a 55%, #0b0f19 100%)",
  },
];
