/**
 * The engineer's half of the landing page: the same strings, measured.
 *
 * It is a real diagram rather than decoration. A string of length L runs from
 * the nut (the first heavy line) towards a bridge off the right edge.
 *
 *   - The short ticks are frets, each a twelfth root of two closer to the
 *     bridge than the last: fret n sits at L × (1 − 2^(−n/12)).
 *   - The three tall lines mark where the string is stopped at exactly a
 *     quarter, a third and a half of its length, which sound a fourth (4 : 3),
 *     a fifth (3 : 2) and an octave (2 : 1) above the open string.
 *
 * Units match the landing page's design grid, with the central node at (0, 530).
 */

const NUT = 240;
const LENGTH = 900;
const STRING_TOP = 440;
const STRING_BOTTOM = 459.5;
const HATCH_TOP = STRING_BOTTOM + 8;
const HATCH_HEIGHT = 40;

const fretAt = (n: number) => NUT + LENGTH * (1 - 2 ** (-n / 12));

/** Stopping the string here gives a pure interval. Frets 5, 7 and 12 land on these. */
const INTERVALS = [
  { fraction: 1 / 4, ratio: "4 : 3", top: 300, bottom: 506 },
  { fraction: 1 / 3, ratio: "3 : 2", top: 226, bottom: 512 },
  { fraction: 1 / 2, ratio: "2 : 1", top: 292, bottom: 506 },
];

const FRETS = Array.from({ length: 12 }, (_, index) => index + 1).filter((n) => ![5, 7, 12].includes(n));

export function FretDiagram() {
  const fifth = NUT + LENGTH / 3;
  const octave = NUT + LENGTH / 2;
  const centreY = (STRING_TOP + STRING_BOTTOM) / 2;

  return (
    <svg className="landing__geometry" viewBox="0 0 720 900" focusable="false">
      <defs>
        <filter id="wash" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.013" numOctaves="5" seed="12" result="cloud" />
          <feColorMatrix
            in="cloud"
            type="matrix"
            values="0 0 0 0 0.15  0 0 0 0 0.27  0 0 0 0 0.58  0 0 0 1.05 0.1"
            result="pigment"
          />
          <feComposite in="pigment" in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="hatch-area">
          <rect x={fifth} y={HATCH_TOP} width={720 - fifth} height={HATCH_HEIGHT} />
        </clipPath>
      </defs>

      {/* A plane of the other side's ink, as the musician's half carries a touch of red. */}
      <rect className="wash" x={fifth} y="262" width={760 - fifth} height={STRING_TOP - 8 - 262} filter="url(#wash)" />
      <g className="hatch" clipPath="url(#hatch-area)">
        {Array.from({ length: Math.ceil((720 - fifth + HATCH_HEIGHT) / 7) }, (_, index) => (
          <path
            key={index}
            className="hair"
            d={`M${fifth - HATCH_HEIGHT + index * 7} ${HATCH_TOP}l${HATCH_HEIGHT} ${HATCH_HEIGHT}`}
          />
        ))}
      </g>

      {/* Compass work around the fifth. */}
      <circle className="hair" cx={fifth} cy={centreY} r="140" />
      <circle className="hair dashed" cx={fifth} cy={centreY} r="96" />
      <path className="hair faint" d={`M${fifth - 190} ${centreY - 140}H760`} />
      <path className="hair faint" d={`M${fifth - 52} ${centreY + 140}H${fifth + 96}`} />

      {/* The nut, then the frets. */}
      <path className="hair nut" d={`M${NUT} ${STRING_TOP - 9}V${STRING_BOTTOM + 9}`} />
      {FRETS.map((n) => (
        <path key={n} className="hair" d={`M${fretAt(n).toFixed(2)} ${STRING_TOP - 6}V${STRING_BOTTOM + 6}`} />
      ))}

      {/* Pure intervals. */}
      {INTERVALS.map(({ fraction, ratio, top, bottom }) => {
        const x = NUT + LENGTH * fraction;
        return (
          <g key={ratio}>
            <path className="hair" d={`M${x} ${top}V${bottom}`} />
            <circle className="dot" cx={x} cy={top} r="2.2" />
            <circle className="dot" cx={x} cy={bottom} r="2.2" />
            <text className="ratio" x={x - 9} y={top + 4} textAnchor="end">
              {ratio}
            </text>
          </g>
        );
      })}

      {/* Half the string, dimensioned. */}
      <path className="hair" d={`M${NUT} 506H${octave}M${NUT} 500V512`} />
      <text className="ratio" x={NUT + 92} y="525" textAnchor="middle">
        L / 2
      </text>

      <circle className="dot" cx={NUT} cy={STRING_TOP - 9} r="2.2" />
      <circle className="dot" cx={fifth} cy={centreY - 140} r="2.2" />
      <rect className="node" x={fifth - 3.5} y={STRING_TOP - 3.5} width="7" height="7" />
    </svg>
  );
}
