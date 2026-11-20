export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-orb hero-orb-primary" />
      <div className="hero-orb hero-orb-secondary" />
      <span className="hero-watermark" lang="ur" dir="rtl">
        آواز
      </span>
      <svg
        className="hero-waves-svg"
        viewBox="0 0 1440 620"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="us-wave-main" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--hero-wave-a)" stopOpacity="0" />
            <stop
              offset="20%"
              stopColor="var(--hero-wave-a)"
              stopOpacity="0.65"
            />
            <stop
              offset="56%"
              stopColor="var(--hero-wave-b)"
              stopOpacity="0.9"
            />
            <stop
              offset="84%"
              stopColor="var(--hero-wave-a)"
              stopOpacity="0.55"
            />
            <stop
              offset="100%"
              stopColor="var(--hero-wave-a)"
              stopOpacity="0"
            />
          </linearGradient>

          <linearGradient id="us-wave-soft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--hero-wave-a)" stopOpacity="0" />
            <stop
              offset="28%"
              stopColor="var(--hero-wave-a)"
              stopOpacity="0.35"
            />
            <stop
              offset="72%"
              stopColor="var(--hero-wave-b)"
              stopOpacity="0.45"
            />
            <stop
              offset="100%"
              stopColor="var(--hero-wave-a)"
              stopOpacity="0"
            />
          </linearGradient>

          <linearGradient id="us-ribbon-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="var(--hero-ribbon)"
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor="var(--hero-ribbon)"
              stopOpacity="0"
            />
          </linearGradient>

          <radialGradient id="us-arc-fade" cx="88%" cy="8%" r="62%">
            <stop offset="0%" stopColor="var(--hero-arc)" stopOpacity="0.6" />
            <stop offset="55%" stopColor="var(--hero-arc)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--hero-arc)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric acoustic ripples radiating softly from upper-right */}
        <g className="hero-arcs" stroke="url(#us-arc-fade)">
          <circle cx="1270" cy="48" r="165" strokeWidth="1" />
          <circle
            cx="1270"
            cy="48"
            r="275"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
          <circle cx="1270" cy="48" r="405" strokeWidth="1" />
          <circle cx="1270" cy="48" r="555" strokeWidth="0.9" />
        </g>

        {/* Soft luminous ribbon fill along the upper acoustic horizon */}
        <path
          className="hero-ribbon-area"
          d="M-40 164 C 210 56, 440 185, 720 112 C 980 42, 1180 148, 1480 86 L 1480 340 L -40 340 Z"
          fill="url(#us-ribbon-fill)"
        />

        {/* Woven harmonic voice-wave calligraphic curves framing the open sky */}
        <g className="hero-wave-group hero-wave-slow">
          <path
            d="M-60 174 C 195 54, 420 195, 710 114 C 965 44, 1175 162, 1500 78"
            stroke="url(#us-wave-main)"
            strokeWidth="1.5"
          />
          <path
            d="M-60 198 C 205 84, 435 212, 725 134 C 980 68, 1190 180, 1500 104"
            stroke="url(#us-wave-soft)"
            strokeWidth="1.05"
          />
          <path
            d="M-60 150 C 185 36, 405 170, 695 92 C 950 24, 1160 140, 1500 58"
            stroke="url(#us-wave-soft)"
            strokeWidth="1"
          />
        </g>

        <g className="hero-wave-group hero-wave-drift">
          <path
            d="M-60 128 C 235 198, 490 54, 785 136 C 1035 206, 1230 68, 1500 132"
            stroke="url(#us-wave-soft)"
            strokeWidth="1"
          />
          <path
            d="M-60 326 C 245 256, 510 382, 810 318 C 1065 264, 1245 362, 1500 296"
            stroke="url(#us-wave-soft)"
            strokeWidth="0.95"
          />
          <path
            d="M-60 98 C 260 162, 515 36, 825 110 C 1085 172, 1265 44, 1500 102"
            stroke="url(#us-wave-soft)"
            strokeWidth="0.8"
            strokeDasharray="2 7"
          />
        </g>

        {/* Minimalist voice equalizer ticks nestled along upper horizon */}
        <g
          className="hero-spectrum"
          stroke="var(--hero-wave-a)"
          strokeLinecap="round"
        >
          <line x1="628" y1="62" x2="628" y2="76" strokeWidth="2" />
          <line x1="638" y1="54" x2="638" y2="84" strokeWidth="2" />
          <line x1="648" y1="44" x2="648" y2="94" strokeWidth="2" />
          <line x1="658" y1="57" x2="658" y2="81" strokeWidth="2" />
          <line x1="668" y1="48" x2="668" y2="90" strokeWidth="2" />
          <line x1="678" y1="38" x2="678" y2="100" strokeWidth="2" />
          <line x1="688" y1="52" x2="688" y2="86" strokeWidth="2" />
          <line x1="698" y1="58" x2="698" y2="80" strokeWidth="2" />
          <line x1="708" y1="47" x2="708" y2="91" strokeWidth="2" />
          <line x1="718" y1="60" x2="718" y2="78" strokeWidth="2" />
          <line x1="728" y1="65" x2="728" y2="73" strokeWidth="2" />
        </g>

        {/* Caption-timing cue nodes pinned along the upper voice curve */}
        <g className="hero-nodes">
          <circle cx="332" cy="126" r="10" className="hero-node-halo" />
          <circle cx="332" cy="126" r="3" className="hero-node-core" />

          <circle cx="710" cy="114" r="13" className="hero-node-halo" />
          <circle cx="710" cy="114" r="3.5" className="hero-node-core" />

          <circle cx="1040" cy="96" r="10" className="hero-node-halo" />
          <circle cx="1040" cy="96" r="3" className="hero-node-core" />

          <circle cx="1310" cy="116" r="9" className="hero-node-halo" />
          <circle cx="1310" cy="116" r="2.6" className="hero-node-core" />
        </g>

        {/* Whisper-soft starlight specks shown in after-sunset Dark Mode */}
        <g className="hero-stars" fill="var(--hero-wave-b)">
          <circle cx="148" cy="76" r="1.4" opacity="0.6" />
          <circle cx="412" cy="54" r="1.1" opacity="0.45" />
          <circle cx="842" cy="64" r="1.6" opacity="0.65" />
          <circle cx="1064" cy="92" r="1.2" opacity="0.5" />
          <circle cx="1194" cy="38" r="1.5" opacity="0.55" />
          <circle cx="1352" cy="126" r="1.2" opacity="0.45" />
          <path
            d="M 842 54 L 843.6 62.4 L 852 64 L 843.6 65.6 L 842 74 L 840.4 65.6 L 832 64 L 840.4 62.4 Z"
            opacity="0.38"
          />
          <path
            d="M 1194 31 L 1195.1 36.9 L 1201 38 L 1195.1 39.1 L 1194 45 L 1192.9 39.1 L 1187 38 L 1192.9 36.9 Z"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
}
