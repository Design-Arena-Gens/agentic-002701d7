type PersonasIconProps = {
  className?: string;
};

export function PersonasIcon({ className }: PersonasIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="personaGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="10"
        width="56"
        height="44"
        rx="18"
        ry="18"
        stroke="url(#personaGradient)"
        strokeWidth="4"
        opacity="0.8"
      />
      <path
        d="M20 34c4 0 7-3 7-7s-3-7-7-7-7 3-7 7 3 7 7 7Zm0 4c-6.63 0-12 3.58-12 8v2h24v-2c0-4.42-5.37-8-12-8Z"
        fill="url(#personaGradient)"
        fillOpacity="0.75"
      />
      <path
        d="M44 36c3.31 0 6-2.91 6-6.5S47.31 23 44 23s-6 2.91-6 6.5 2.69 6.5 6 6.5Zm0 4c-5.52 0-10 3.13-10 7v2h20v-2c0-3.87-4.48-7-10-7Z"
        fill="url(#personaGradient)"
        fillOpacity="0.55"
      />
      <circle cx="32" cy="20" r="4" fill="url(#personaGradient)" opacity="0.65" />
      <path
        d="M32 26c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z"
        fill="url(#personaGradient)"
        opacity="0.65"
      />
    </svg>
  );
}
