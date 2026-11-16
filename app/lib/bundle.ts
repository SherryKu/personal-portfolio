/**
 * The four strings as one bundle.
 *
 * All four follow a single curve. It leaves (x0, y0), bends, and arrives
 * perfectly level at (x1, yc), so it meets the straight part without a kink.
 * Each string is that same curve shifted sideways, never a separate curve of
 * its own, which is what keeps the four reading as one bundle.
 *
 * `spread` says how far apart the strings are where the curve begins:
 *
 *   0  all four start from the same point and open out smoothly, leaving that
 *      point in the same direction and reaching their full spacing where the
 *      curve levels. This is the landing page: the strings gather at the node.
 *   1  the strings keep their full spacing the whole way: parallel throughout.
 *      With y0 equal to yc as well, the result is four level lines, which is
 *      the engineer's page.
 *
 * Anything in between is a half-opened bundle, which is what the move between
 * the two pages passes through.
 *
 * Returns the curved part of each string as SVG path data, top string first.
 *
 * Written as plain, self-contained code on purpose: app/layout.tsx also copies
 * this function, as text, into the small script that carries the strings from
 * one page to the next. It must not use anything defined outside itself.
 */
export function bundlePaths(
  x0: number,
  y0: number,
  x1: number,
  yc: number,
  gap: number,
  spread: number,
  steps: number,
) {
  const paths: string[] = [];
  // The shape of the bend: it sets off at an angle and finishes level.
  const ax = x0 + (x1 - x0) * 0.2966;
  const ay = y0 + (yc - y0) * 0.324;
  const bx = x0 + (x1 - x0) * 0.6356;

  for (let string = 0; string < 4; string += 1) {
    const offset = (string - 1.5) * gap;
    let d = "";

    for (let step = 0; step <= steps; step += 1) {
      const t = step / steps;
      const m = 1 - t;

      // A point on the shared curve...
      const x = m * m * m * x0 + 3 * m * m * t * ax + 3 * m * t * t * bx + t * t * t * x1;
      const y = m * m * m * y0 + 3 * m * m * t * ay + (3 * m * t * t + t * t * t) * yc;

      // ...and the direction it is heading there.
      const dx = 3 * m * m * (ax - x0) + 6 * m * t * (bx - ax) + 3 * t * t * (x1 - bx);
      const dy = 3 * m * m * (ay - y0) + 6 * m * t * (yc - ay);
      const length = Math.sqrt(dx * dx + dy * dy) || 1;

      // How open the bundle is at this point: from `spread` at the start to fully open where it levels.
      const open = spread + (1 - spread) * (3 * t * t - 2 * t * t * t);
      const aside = offset * open;

      d += (step ? "L" : "M") + (x - (dy / length) * aside).toFixed(2) + " " + (y + (dx / length) * aside).toFixed(2);
    }

    paths.push(d);
  }

  return paths;
}
