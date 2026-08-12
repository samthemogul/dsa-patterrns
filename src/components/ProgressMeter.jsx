'use client';

/** Overall solved count across every problem in the library. */
export default function ProgressMeter({ done, total, onReset }) {
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="meter__row">
        <span className="eyebrow">Problems solved</span>
        <span className="meter__val">
          {done}/{total}
        </span>
      </div>
      <div
        className="meter__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Practice problems solved"
      >
        <div className="meter__fill" style={{ width: `${pct}%` }} />
      </div>
      {done > 0 && (
        <button className="meter__reset" onClick={onReset}>
          Clear progress
        </button>
      )}
    </div>
  );
}
