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

        {/* Soft luminous ribbon fill beneath the primary voice contour */}
        <path
          className="hero-ribbon-area"
          d="M-40 238 C 190 120, 380 315, 650 205 C 900 105, 1110 290, 1480 148 L 1480 410 L -40 410 Z"
          fill="url(#us-ribbon-fill)"
        />

        {/* Woven harmonic voice-wave calligraphic curves */}
        <g className="hero-wave-group hero-wave-slow">
          <path
            d="M-60 250 C 175 110, 365 330, 645 208 C 905 94, 1115 304, 1500 138"
            stroke="url(#us-wave-main)"
            strokeWidth="1.65"
          />
          <path
            d="M-60 272 C 185 144, 382 346, 660 226 C 920 116, 1125 316, 1500 162"
            stroke="url(#us-wave-soft)"
            strokeWidth="1.15"
          />
          <path
            d="M-60 228 C 170 90, 355 302, 635 186 C 895 76, 1100 282, 1500 116"
            stroke="url(#us-wave-soft)"
            strokeWidth="1.1"
          />
        </g>

        <g className="hero-wave-group hero-wave-drift">
          <path
            d="M-60 198 C 210 296, 445 96, 735 224 C 985 334, 1190 124, 1500 218"
            stroke="url(#us-wave-soft)"
            strokeWidth="1.1"
          />
          <path
            d="M-60 298 C 230 185, 460 364, 750 248 C 1010 145, 1210 330, 1500 194"
            stroke="url(#us-wave-soft)"
            strokeWidth="0.95"
          />
          <path
            d="M-60 164 C 245 248, 495 74, 795 190 C 1055 292, 1240 100, 1500 176"
            stroke="url(#us-wave-soft)"
            strokeWidth="0.85"
            strokeDasharray="2 7"
          />
        </g>

        {/* Minimalist voice equalizer ticks nestled along upper horizon */}
        <g
          className="hero-spectrum"
          stroke="var(--hero-wave-a)"
          strokeLinecap="round"
        >
          <line x1="628" y1="68" x2="628" y2="82" strokeWidth="2" />
          <line x1="638" y1="60" x2="638" y2="90" strokeWidth="2" />
          <line x1="648" y1="50" x2="648" y2="100" strokeWidth="2" />
          <line x1="658" y1="63" x2="658" y2="87" strokeWidth="2" />
          <line x1="668" y1="54" x2="668" y2="96" strokeWidth="2" />
          <line x1="678" y1="44" x2="678" y2="106" strokeWidth="2" />
          <line x1="688" y1="58" x2="688" y2="92" strokeWidth="2" />
          <line x1="698" y1="64" x2="698" y2="86" strokeWidth="2" />
          <line x1="708" y1="53" x2="708" y2="97" strokeWidth="2" />
          <line x1="718" y1="66" x2="718" y2="84" strokeWidth="2" />
          <line x1="728" y1="71" x2="728" y2="79" strokeWidth="2" />
        </g>

        {/* Caption-timing cue nodes pinned along the spoken voice curve */}
        <g className="hero-nodes">
          <circle cx="286" cy="215" r="11" className="hero-node-halo" />
          <circle cx="286" cy="215" r="3.2" className="hero-node-core" />

          <circle cx="645" cy="208" r="14" className="hero-node-halo" />
          <circle cx="645" cy="208" r="3.8" className="hero-node-core" />

          <circle cx="988" cy="186" r="11" className="hero-node-halo" />
          <circle cx="988" cy="186" r="3.2" className="hero-node-core" />

          <circle cx="1270" cy="198" r="9" className="hero-node-halo" />
          <circle cx="1270" cy="198" r="2.8" className="hero-node-core" />
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
