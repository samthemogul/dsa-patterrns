'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, allTopics, countProblems, findTopic } from '../data';
import { useApp, useTopicProgress } from './Providers';
import SearchBar from './SearchBar';
import ProgressMeter from './ProgressMeter';

function Caret() {
  return (
    <svg className="nav__caret" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <path d="M2 1l4 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TOTAL_PROBLEMS = countProblems();

/** Two-level topic navigator, plus filter and progress readout. */
export default function Sidebar() {
  const pathname = usePathname();
  const { solved, reset } = useApp();
  const topicProgress = useTopicProgress();
  const [query, setQuery] = useState('');

  // "/topic/two-pointers/" -> "two-pointers"
  const activeId = useMemo(() => {
    const match = pathname?.match(/^\/topic\/([^/]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }, [pathname]);

  const activeCategory = activeId ? findTopic(activeId)?.category : null;
  const [open, setOpen] = useState(() => new Set());

  // Keep the category holding the current topic expanded.
  useEffect(() => {
    if (activeCategory) setOpen((prev) => new Set(prev).add(activeCategory));
  }, [activeCategory]);

  const filtering = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        topics: cat.topics.filter((t) =>
          [t.title, t.subtitle, t.summary, cat.name].join(' ').toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.topics.length > 0);
  }, [query]);

  const toggleCategory = (name) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <aside className="rail">
      <div className="rail__head">
        <Link className="rail__home" href="/">
          <h1 className="rail__title">
            DSA Pattern <span>Explorer</span>
          </h1>
        </Link>
        <div className="rail__meta">
          <span className="eyebrow">{categories.length} categories</span>
          <span className="eyebrow">{allTopics.length} topics</span>
        </div>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <nav className="rail__body" aria-label="Topics">
        {filtered.length === 0 && (
          <p className="nav__empty">Nothing matches &ldquo;{query}&rdquo;. Try a shorter term.</p>
        )}

        {filtered.map((cat) => {
          const expanded = filtering || open.has(cat.name);
          return (
            <div className="nav__group" key={cat.name}>
              <button
                className="nav__cat"
                aria-expanded={expanded}
                onClick={() => toggleCategory(cat.name)}
              >
                <Caret />
                {cat.name}
                <span className="nav__count">{cat.topics.length}</span>
              </button>

              {expanded && (
                <div className="nav__sublist">
                  {cat.topics.map((t) => {
                    const p = topicProgress(t);
                    const done = p.total > 0 && p.done === p.total;
                    return (
                      <Link
                        key={t.id}
                        className="nav__sub"
                        href={`/topic/${t.id}/`}
                        aria-current={t.id === activeId ? 'page' : undefined}
                      >
                        <span className={`nav__dot${done ? ' nav__dot--done' : ''}`} />
                        {t.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="rail__foot">
        <ProgressMeter done={solved.size} total={TOTAL_PROBLEMS} onReset={reset} />
      </div>
    </aside>
  );
}
