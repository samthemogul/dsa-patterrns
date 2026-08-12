'use client';

import { Fragment } from 'react';

/**
 * Renders the small amount of inline markup that walkthrough prose uses.
 *
 * Only two forms are supported deliberately — `code` and **emphasis**. Prose
 * is authored by hand in this repo, never user-supplied, so a full markdown
 * parser would be a dependency for no benefit. Anything else passes through
 * as literal text.
 */
function inline(text) {
  const parts = String(text).split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Long-form explanation, rendered as titled sections.
 *
 * A section's `body` is an array of paragraphs. `aside` renders as a callout
 * for the "the thing everyone gets wrong here" note, and `trace` renders as a
 * monospace block for worked examples, which need to keep their alignment —
 * so trace content is deliberately NOT passed through the inline formatter.
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
                {inline(para)}
              </p>
            ))}
            {s.trace && <pre className="walk__trace">{s.trace}</pre>}
            {s.aside && (
              <div className="walk__aside">
                <span className="eyebrow">Watch out</span>
                <p>{inline(s.aside)}</p>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
