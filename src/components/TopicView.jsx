'use client';

import Link from 'next/link';
import ComplexityRuler from './ComplexityRuler';
import CodeBlock from './CodeBlock';
import Illustration from './Illustration';
import ProblemList from './ProblemList';
import Walkthrough from './Walkthrough';

function Section({ label, children }) {
  return (
    <section className="section">
      <div className="section__head">
        <h3 className="eyebrow">{label}</h3>
      </div>
      {children}
    </section>
  );
}

/** Full detail view for a single topic. */
export default function TopicView({
  topic,
  language,
  onLanguageChange,
  solved,
  onToggle,
  stage,
  neighbours,
}) {
  return (
    <article className="wrap">
      <nav className="topic__back">
        <Link className="backlink" href="/">
          <svg viewBox="0 0 12 12" width="11" height="11" fill="none" aria-hidden="true">
            <path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Roadmap
        </Link>
        {stage && <span className="topic__stage">Stage {stage.number} &middot; {stage.title}</span>}
      </nav>

      <header className="topic__head">
        <div className="topic__crumb">
          <span className="eyebrow">{topic.category}</span>
          <span>/</span>
          <span className="eyebrow">{topic.subtitle}</span>
        </div>
        <h2 className="topic__title">{topic.title}</h2>
        {topic.summary && <p className="topic__summary">{topic.summary}</p>}
      </header>

      {topic.complexity && (
        <Section label="Cost">
          <ComplexityRuler complexity={topic.complexity} />
        </Section>
      )}

      {topic.walkthrough?.length > 0 ? (
        <Section label="Walkthrough">
          <Walkthrough sections={topic.walkthrough} />
        </Section>
      ) : (
        <Section label="How it works">
          <div className="card">
            <p className="prose">{topic.description}</p>
          </div>
        </Section>
      )}

      {topic.useCases?.length > 0 && (
        <Section label="When to reach for it">
          <ul className="uses">
            {topic.useCases.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </Section>
      )}

      {topic.illustration && (
        <Section label="Illustration">
          <Illustration html={topic.illustration} />
        </Section>
      )}

      {topic.code && (
        <Section label="Implementation">
          <CodeBlock code={topic.code} language={language} onLanguageChange={onLanguageChange} />
        </Section>
      )}

      {topic.pitfalls?.length > 0 && (
        <Section label="Interview pitfalls">
          <ul className="uses">
            {topic.pitfalls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Section>
      )}

      {topic.problems && (
        <Section label="Practice">
          <ProblemList problems={topic.problems} solved={solved} onToggle={onToggle} />
        </Section>
      )}

      {(neighbours?.prev || neighbours?.next) && (
        <nav className="pager">
          {neighbours.prev ? (
            <Link className="pager__link" href={`/topic/${neighbours.prev.id}/`}>
              <span className="eyebrow">Previous</span>
              <b>{neighbours.prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {neighbours.next && (
            <Link className="pager__link pager__link--next" href={`/topic/${neighbours.next.id}/`}>
              <span className="eyebrow">Next on the path</span>
              <b>{neighbours.next.title}</b>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
