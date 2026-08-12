'use client';

/**
 * Long-form explanation, rendered as titled sections.
 *
 * A section's `body` is an array of paragraphs. `aside` renders as a callout
 * for the "the thing everyone gets wrong here" note, and `trace` renders as a
 * monospace block for worked examples, which need to keep their alignment.
 */
export default function Walkthrough({ sections }) {
  return (
    <div className="walk">
      {sections.map((s, i) => (
        <section className="walk__step" key={i}>
          <div className="walk__marker" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="walk__body">
            <h4 className="walk__title">{s.heading}</h4>
            {s.body?.map((para, j) => (
              <p className="prose" key={j}>
                {para}
              </p>
            ))}
            {s.trace && <pre className="walk__trace">{s.trace}</pre>}
            {s.aside && (
              <div className="walk__aside">
                <span className="eyebrow">Watch out</span>
                <p>{s.aside}</p>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
