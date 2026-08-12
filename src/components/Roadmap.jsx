'use client';

import Link from 'next/link';
import { stages } from '../data/roadmap';

const LEVEL_CLASS = {
  Beginner: 'level--beginner',
  Intermediate: 'level--intermediate',
  Advanced: 'level--advanced',
};

/**
 * The landing view: the whole library laid out as an ordered path.
 *
 * Someone arriving with no plan should be able to start at stage 1, work
 * downward, and never have to decide what to study next.
 */
export default function Roadmap({ totals, topicProgress, findTopic, firstUnfinished }) {
  return (
    <div className="wrap">
      <header className="road__head">
        <span className="eyebrow">Data structures &amp; algorithms</span>
        <h2 className="road__title">A path from first principles to competitive.</h2>
        <p className="road__lede">
          Six stages, in order. Each one assumes the ones above it, so if a topic feels like it is
          missing a prerequisite, the prerequisite is further up the page. Tick problems off as you
          solve them — progress is saved in this browser.
        </p>

        <div className="road__actions">
          {firstUnfinished && (
            <Link className="btn btn--primary" href={`/topic/${firstUnfinished.id}/`}>
              {totals.solved > 0 ? 'Continue' : 'Start'} &middot; {firstUnfinished.title}
            </Link>
          )}
        </div>

        <div className="stats">
          <div className="stat">
            <span className="eyebrow">Stages</span>
            <b>{stages.length}</b>
          </div>
          <div className="stat">
            <span className="eyebrow">Topics</span>
            <b>{totals.topics}</b>
          </div>
          <div className="stat">
            <span className="eyebrow">Problems</span>
            <b>{totals.problems}</b>
          </div>
          <div className="stat">
            <span className="eyebrow">Solved</span>
            <b>{totals.solved}</b>
          </div>
        </div>
      </header>

      <ol className="road">
        {stages.map((stage) => {
          const topics = stage.topics.map(findTopic).filter(Boolean);
          const counts = topics.reduce(
            (acc, t) => {
              const p = topicProgress(t);
              acc.total += p.total;
              acc.done += p.done;
              return acc;
            },
            { total: 0, done: 0 }
          );
          const pct = counts.total ? Math.round((counts.done / counts.total) * 100) : 0;

          return (
            <li className="stage" key={stage.id}>
              <div className="stage__rail" aria-hidden="true">
                <span className="stage__num">{stage.number}</span>
                <span className="stage__line" />
              </div>

              <div className="stage__body">
                <div className="stage__head">
                  <h3 className="stage__title">{stage.title}</h3>
                  <span className={`level ${LEVEL_CLASS[stage.level]}`}>{stage.level}</span>
                  <span className="stage__tally mono">
                    {counts.done}/{counts.total}
                  </span>
                </div>

                <div className="stage__meter" role="presentation">
                  <span className="stage__meterfill" style={{ width: `${pct}%` }} />
                </div>

                <p className="stage__goal">{stage.goal}</p>
                <p className="prose stage__detail">{stage.detail}</p>

                <ol className="stage__topics">
                  {topics.map((t) => {
                    const p = topicProgress(t);
                    const complete = p.total > 0 && p.done === p.total;
                    const started = p.done > 0 && !complete;
                    return (
                      <li key={t.id}>
                        <Link
                          className={`tcard${complete ? ' tcard--done' : ''}`}
                          href={`/topic/${t.id}/`}
                        >
                          <span
                            className={`tcard__dot${complete ? ' tcard__dot--done' : ''}${
                              started ? ' tcard__dot--part' : ''
                            }`}
                          />
                          <span className="tcard__text">
                            <b>{t.title}</b>
                            <span>{t.summary}</span>
                          </span>
                          <span className="tcard__cost mono">{t.complexity?.time}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
