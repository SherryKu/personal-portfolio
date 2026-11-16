type Direction = "up-right" | "right" | "down" | "up";

/**
 * One drawn arrow, turned with CSS. Up-right marks links that leave the site;
 * down and up mark links that move within the page.
 */
export function Arrow({ direction = "up-right" }: { direction?: Direction }) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
