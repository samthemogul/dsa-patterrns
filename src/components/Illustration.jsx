'use client';

/**
 * Renders a topic's hand-authored diagram.
 * The markup is authored in this repo (never user input), and the utility
 * classes it uses are defined in styles/illustration.css.
 */
export default function Illustration({ html }) {
  if (!html) return null;
  return (
    <div className="card illustration" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
