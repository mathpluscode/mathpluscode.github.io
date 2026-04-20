import styles from "./styles.module.css";

function buildSpring({ x, y, angle, loops, pitch, rx, ry, seed = 1 }) {
  const ax = Math.cos(angle),
    ay = Math.sin(angle);
  const nx = -Math.sin(angle),
    ny = Math.cos(angle);
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
  const pts = [];
  const stepsPerLoop = 40;
  const total = loops * stepsPerLoop;
  for (let i = 0; i <= total; i++) {
    const t = (i / stepsPerLoop) * 2 * Math.PI;
    // Advance along axis each full turn, plus a cosine that pushes the front of
    // the loop forward and the back backward — creating true 3D self-overlap.
    const along = (t / (2 * Math.PI)) * pitch - Math.cos(t) * rx * 0.55;
    const across = Math.sin(t) * ry;
    const jA = rand() * 0.6;
    const jC = rand() * 0.6;
    pts.push([x + ax * (along + jA) + nx * (across + jC), y + ay * (along + jA) + ny * (across + jC)]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1]} `;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += `Q ${pts[i][0]} ${pts[i][1]}, ${mx} ${my} `;
  }
  const last = pts[pts.length - 1];
  d += `T ${last[0]} ${last[1]}`;
  return d;
}

function buildKeys() {
  const TL = [270, 602],
    TR = [732, 604],
    BR = [832, 746],
    BL = [170, 746];
  const cols = 9;
  const inset = 0.08;
  const vTickStart = 0.16;
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const P = (u, v) => {
    const top = lerp(TL, TR, u);
    const bot = lerp(BL, BR, u);
    return lerp(top, bot, v);
  };
  let s = 5;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
  const j = (p, amt = 1.6) => [p[0] + rand() * amt, p[1] + rand() * amt];
  let d = "";

  const vH1 = 0.36,
    vH2 = 0.58,
    vH3 = 0.82;
  for (const v of [vH1, vH2, vH3]) {
    const samples = 10;
    const startTrim = rand() * 0.06;
    const endTrim = rand() * 0.06;
    const uStart = inset + startTrim;
    const uEnd = 1 - inset + endTrim;
    const pts = [];
    for (let k = 0; k <= samples; k++) {
      const u = uStart + (k / samples) * (uEnd - uStart);
      const amp = 2.0 + rand() * 1.4;
      const wave = Math.sin(k * 1.15 + v * 9) * amp + rand() * 1.2;
      pts.push(j([P(u, v)[0], P(u, v)[1] + wave], 1.6));
    }
    let line = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
    for (let k = 1; k < pts.length - 1; k++) {
      const mx = (pts[k][0] + pts[k + 1][0]) / 2;
      const my = (pts[k][1] + pts[k + 1][1]) / 2;
      line += `Q ${pts[k][0].toFixed(1)} ${pts[k][1].toFixed(1)}, ${mx.toFixed(1)} ${my.toFixed(1)} `;
    }
    const last = pts[pts.length - 1];
    line += `T ${last[0].toFixed(1)} ${last[1].toFixed(1)} `;
    d += line;
  }

  // Vertical dividers with random top/bottom trim so they don't all fully cross.
  const bottomSkip = new Set([4, 5]);
  for (let i = 1; i < cols; i++) {
    const u = inset + (i / cols) * (1 - 2 * inset);
    {
      const topTrim = rand() * 0.05;
      const botTrim = rand() * 0.06;
      const vA = vTickStart + Math.max(0, topTrim);
      const vB = vH2 + botTrim;
      const p1 = j(P(u, vA));
      const pM = j(P(u + rand() * 0.004, (vA + vB) / 2));
      const p2 = j(P(u, vB));
      d += `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q ${pM[0].toFixed(1)} ${pM[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
    }
    if (bottomSkip.has(i)) continue;
    {
      const topTrim = rand() * 0.06;
      const botTrim = rand() * 0.05;
      const vA = vH2 + Math.max(-0.03, topTrim);
      const vB = vH3 + botTrim;
      const p1 = j(P(u, vA));
      const pM = j(P(u + rand() * 0.004, (vA + vB) / 2));
      const p2 = j(P(u, vB));
      d += `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q ${pM[0].toFixed(1)} ${pM[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
    }
  }
  return d;
}

// Tightly packed loops (pitch < 2*rx) so the stroke clearly crosses itself.
const LEFT_SPRING = buildSpring({
  x: 360,
  y: 325,
  angle: (62 * Math.PI) / 180,
  loops: 4.5,
  pitch: 39,
  rx: 34,
  ry: 39,
  seed: 7,
});
const RIGHT_SPRING = buildSpring({
  x: 640,
  y: 325,
  angle: ((180 - 62) * Math.PI) / 180,
  loops: 3.5,
  pitch: 39,
  rx: 34,
  ry: 39,
  seed: 42,
});
const KEYS_D = buildKeys();

export default function LaptopHelix() {
  return (
    <svg
      className={styles.laptopHelix}
      viewBox="0 0 960 1000"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Hand-drawn laptop with a slinky spring bouncing off the screen"
    >
      <defs>
        <filter id="j1" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="1.6" />
        </filter>
        <filter id="j2" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="0.6" />
        </filter>
        <filter id="j3" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="1.0" />
        </filter>
      </defs>

      <g transform="translate(-40 0) rotate(3 500 500)">
        <path d="M 140 160 L 850 152 L 858 830 L 132 822 Z" fill="#f3ecdc" />
      </g>

      <g transform="rotate(-4 500 470)">
        <g stroke="#141414" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" filter="url(#j1)">
          <path d="M 240 198 Q 500 192 760 202" />
          <path d="M 760 202 Q 766 388 762 572" />
          <path d="M 762 572 Q 500 576 240 572" />
          <path d="M 240 572 Q 234 388 240 198" />
        </g>

        <g>
          <g filter="url(#j2)" className={styles.spring}>
            <path
              d={LEFT_SPRING}
              fill="none"
              stroke="#141414"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g filter="url(#j2)" className={styles.spring}>
            <path
              d={RIGHT_SPRING}
              fill="none"
              stroke="#141414"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        <g stroke="#141414" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" filter="url(#j1)">
          <path d="M 270 602 Q 500 596 732 604" />
          <path d="M 732 604 L 832 746" />
          <path d="M 832 746 Q 500 752 170 746" />
          <path d="M 170 746 L 270 602" />
        </g>
        <g stroke="#141414" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" filter="url(#j3)">
          <path d={KEYS_D} />
        </g>
      </g>
    </svg>
  );
}
