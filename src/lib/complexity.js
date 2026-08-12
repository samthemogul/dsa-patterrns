/**
 * Maps a complexity string onto a position on the growth scale.
 *
 * The ruler is calibrated by *growth class*, not by evaluating the function.
 * `time` should be a single clean expression — "O(n log n)", "O(V + E)".
 * Put caveats ("O(n^2) in the worst case") in `note` instead, so the marker
 * reflects the complexity you'd actually quote in an interview.
 */

export const SCALE = [
  { key: 'constant', label: 'O(1)', pos: 0 },
  { key: 'log', label: 'O(log n)', pos: 0.125 },
  { key: 'sqrt', label: 'O(\u221An)', pos: 0.25 },
  { key: 'linear', label: 'O(n)', pos: 0.375 },
  { key: 'linearithmic', label: 'O(n log n)', pos: 0.5 },
  { key: 'quadratic', label: 'O(n\u00B2)', pos: 0.625 },
  { key: 'cubic', label: 'O(n\u00B3)', pos: 0.75 },
  { key: 'exponential', label: 'O(2\u207F)', pos: 0.875 },
  { key: 'factorial', label: 'O(n!)', pos: 1 },
];

const byKey = (key) => SCALE.find((c) => c.key === key);

/** Any single-letter size variable, or the amortised inverse-Ackermann alpha. */
const VARIABLE = /[a-z]|\u03B1/i;

/** Removes `log x`, `log(x)`, `log^2 x` so what remains is the non-log factor. */
const stripLogs = (s) => s.replace(/log\s*[\u00B2\u00B3]?\s*\(?\s*[a-z]?\s*\)?/gi, ' ');

/** Returns the SCALE entry a complexity string belongs to, or null. */
export function classify(raw) {
  if (!raw) return null;

  // Work on the inside of O( ... ) and drop multiplication signs.
  const body = String(raw)
    .replace(/^\s*[O\u0398\u03A9]\s*\(/i, '')
    .replace(/\)\s*$/, '')
    .replace(/[\u00B7*]/g, ' ');

  if (/!/.test(body)) return byKey('factorial');
  if (/\d\s*\^|\^\s*[a-z]|2\u207F|k\u207F/i.test(body)) return byKey('exponential');
  if (/\^\s*3|\u00B3/.test(body)) return byKey('cubic');
  if (/\^\s*2|\u00B2/.test(body)) return byKey('quadratic');

  // Two distinct size variables multiplied together - "n m", "V E" - is quadratic.
  if (/\b([a-z])\s+([a-z])\b/i.test(body) && !/log/i.test(body)) {
    return byKey('quadratic');
  }

  if (/log/i.test(body)) {
    const rest = stripLogs(body);
    return VARIABLE.test(rest) ? byKey('linearithmic') : byKey('log');
  }

  if (/\u221A|sqrt/i.test(body)) return byKey('sqrt');
  if (VARIABLE.test(body)) return byKey('linear');
  return byKey('constant');
}

/** Position of a complexity string on the 0-1 ruler, or null if unknown. */
export function position(raw) {
  const hit = classify(raw);
  return hit ? hit.pos : null;
}
