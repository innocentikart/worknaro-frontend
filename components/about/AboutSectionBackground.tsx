function isometricNetwork() {
  const down: string[] = [];
  const up: string[] = [];

  for (let i = 0; i < 9; i += 1) {
    const o = i * 96;
    down.push(`M${620 + o} -80 L${1420 + o} 560`);
    up.push(`M${1680 - o} -90 L${720 - o} 540`);
  }

  return { down, up };
}

const { down: NETWORK_DOWN, up: NETWORK_UP } = isometricNetwork();

export function AboutSectionBackground() {
  return (
    <div className="about-section-bg" aria-hidden="true">
      <svg
        className="about-section-bg-network"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMaxYMin slice"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          {NETWORK_DOWN.map((d) => (
            <path key={`d-${d}`} d={d} />
          ))}
          {NETWORK_UP.map((d) => (
            <path key={`u-${d}`} d={d} />
          ))}
        </g>
      </svg>

      <svg
        className="about-section-bg-sweep"
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aboutSweepFill" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="about-section-bg-sweep-fill"
          d="M-80 168 C 90 92, 220 64, 380 118 C 540 172, 700 236, 1080 320 L 1080 360 L -80 360 Z"
        />
      </svg>

      <span className="about-section-bg-chip about-section-bg-chip-tl" />
      <span className="about-section-bg-chip about-section-bg-chip-tr" />
    </div>
  );
}
