'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

/**
 * The two-column frame. The rail persists across route changes.
 *
 * On phones the rail becomes an off-canvas drawer: hidden by default, slid in
 * over the content by the header's menu button, and dismissed by tapping the
 * backdrop, choosing a topic, or navigating. This keeps the reading column
 * full-width on small screens instead of burying it under a stacked sidebar.
 */
export default function Shell({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes (a topic was chosen).
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open, and allow Escape to close it.
  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [navOpen]);

  return (
    <div className={`shell${navOpen ? ' shell--nav-open' : ''}`}>
      <header className="topbar">
        <button
          type="button"
          className="topbar__menu"
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            {navOpen ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            )}
          </svg>
          <span>Topics</span>
        </button>
      </header>

      <div className="shell__scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />

      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}
