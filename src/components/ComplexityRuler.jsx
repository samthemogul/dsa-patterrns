'use client';

import { SCALE, position } from '../lib/complexity';

/**
 * Places the topic's time complexity on a calibrated growth scale.
 * Seeing O(log n) sit hard left and O(n!) sit hard right does more for
 * intuition than reading the same string in a table.
 */
export default function ComplexityRuler({ complexity }) {
  if (!complexity) return null;

  const { time, space, note } = complexity;
  const pos = position(time);

  return (
    <div className="ruler">
      <div className="ruler__top">
        <div className="ruler__stat">
          <span className="eyebrow">Time</span>
          <b>{time}</b>
        </div>
        {space && (
          <div className="ruler__stat">
            <span className="eyebrow">Space</span>
            <b>{space}</b>
          </div>
        )}
      </div>

      <div className="ruler__scale">
        <div className="ruler__axis" />

        {SCALE.map((stop) => (
          <div key={stop.key} className="ruler__tick" style={{ left: `${stop.pos * 100}%` }}>
            <i />
            <span>{stop.label}</span>
          </div>
        ))}

        {pos !== null && (
          <div
            className="ruler__marker"
            style={{ left: `${pos * 100}%` }}
            role="img"
            aria-label={`Time complexity ${time} sits at the ${SCALE.find((s) => s.pos === pos)?.label} mark`}
          >
            <span className="ruler__flag">{time}</span>
            <span className="ruler__stem" />
            <span className="ruler__pin" />
          </div>
        )}
      </div>

      {note && <p className="ruler__note">{note}</p>}
    </div>
  );
}
