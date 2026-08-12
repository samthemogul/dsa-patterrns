'use client';

const BUCKETS = [
  ['easy', 'Easy'],
  ['medium', 'Medium'],
  ['hard', 'Hard'],
];

/** Three difficulty columns with per-problem solved checkboxes. */
export default function ProblemList({ problems, solved, onToggle }) {
  if (!problems) return null;

  return (
    <div className="problems">
      {BUCKETS.map(([key, label]) => {
        const list = problems[key] ?? [];
        if (!list.length) return null;
        const done = list.filter((p) => solved.has(p.url)).length;

        return (
          <section key={key} className={`bucket bucket--${key}`}>
            <div className="bucket__head">
              <b>{label}</b>
              <span className="bucket__tally">
                {done}/{list.length}
              </span>
            </div>
            <ul>
              {list.map((p) => {
                const isDone = solved.has(p.url);
                return (
                  <li key={p.url} className={`problem${isDone ? ' problem--done' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => onToggle(p.url)}
                      aria-label={`Mark ${p.name} as solved`}
                    />
                    <a href={p.url} target="_blank" rel="noreferrer noopener">
                      {p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
