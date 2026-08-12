'use client';

import Sidebar from './Sidebar';

/** The two-column frame. The rail persists across route changes. */
export default function Shell({ children }) {
  return (
    <div className="shell">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}
