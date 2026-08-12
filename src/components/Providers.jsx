'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const SOLVED_KEY = 'dsa-explorer:solved';
const LANG_KEY = 'dsa-explorer:language';

const AppContext = createContext(null);

/**
 * Progress and language preference, shared across routes.
 *
 * With one page per topic, component state would reset on every navigation,
 * so both live here. Reads are deferred to an effect rather than done in the
 * initial state: the pages are prerendered as static HTML, so touching
 * localStorage during render would produce markup that disagrees with the
 * server output and trip React's hydration check.
 */
export default function Providers({ children }) {
  const [solved, setSolved] = useState(() => new Set());
  const [language, setLanguageState] = useState('python');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SOLVED_KEY);
      if (raw) setSolved(new Set(JSON.parse(raw)));
      const lang = localStorage.getItem(LANG_KEY);
      if (lang) setLanguageState(lang);
    } catch {
      /* storage blocked — everything still works, just not across sessions */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;              // don't clobber storage before reading
    try {
      localStorage.setItem(SOLVED_KEY, JSON.stringify([...solved]));
    } catch {
      /* ignore */
    }
  }, [solved, hydrated]);

  const toggle = useCallback((url) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }, []);

  const reset = useCallback(() => setSolved(new Set()), []);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ solved, toggle, reset, language, setLanguage, hydrated }),
    [solved, toggle, reset, language, setLanguage, hydrated]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <Providers>');
  return ctx;
}

/** Solved / total for one topic, counted across all difficulty buckets. */
export function useTopicProgress() {
  const { solved } = useApp();
  return useCallback(
    (topic) => {
      const list = topic.problems ? Object.values(topic.problems).flat() : [];
      return { total: list.length, done: list.filter((p) => solved.has(p.url)).length };
    },
    [solved]
  );
}
