export default function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 320 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="50%" stopColor="#E8D48B" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#E8D48B" />
        </linearGradient>
        <linearGradient id="shieldFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g transform="translate(30, 0)">
        {/* Shield icon */}
        <path
          d="M40 4 L72 16 L72 44 C72 60 58 74 40 78 C22 74 8 60 8 44 L8 16 Z"
          fill="none"
          stroke="url(#iconGrad)"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <path
          d="M40 10 L66 20 L66 44 C66 56 54 68 40 72 C26 68 14 56 14 44 L14 20 Z"
          fill="url(#shieldFill)"
        />

        {/* KB monogram inside shield */}
        <text
          x="40"
          y="52"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="30"
          fontWeight="700"
          fill="url(#goldGrad)"
          letterSpacing="2"
        >
          KB
        </text>

        {/* KALIA text */}
        <text
          x="90"
          y="36"
          fontFamily="'Inter', sans-serif"
          fontSize="28"
          fontWeight="700"
          fill="url(#goldGrad)"
          letterSpacing="6"
        >
          KALIA
        </text>

        {/* BROTHER text */}
        <text
          x="90"
          y="60"
          fontFamily="'Inter', sans-serif"
          fontSize="16"
          fontWeight="400"
          fill="#9CA3AF"
          letterSpacing="10"
        >
          BROTHER
        </text>

        {/* Decorative line */}
        <line x1="90" y1="42" x2="260" y2="42" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
      </g>
    </svg>
  );
}
