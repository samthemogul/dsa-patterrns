'use client';

import { useEffect, useRef } from 'react';

/** Filters the rail. Focus with "/" from anywhere. */
export default function SearchBar({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== ref.current) {
        e.preventDefault();
        ref.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === ref.current) {
        onChange('');
        ref.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onChange]);

  return (
    <div className="search">
      <div className="search__field">
        <input
          ref={ref}
          className="search__input"
          type="search"
          value={value}
          placeholder="Filter topics"
          onChange={(e) => onChange(e.target.value)}
          aria-label="Filter topics"
        />
        {value ? (
          <button className="search__clear" onClick={() => onChange('')} aria-label="Clear filter">
            &times;
          </button>
        ) : (
          <kbd className="search__key">/</kbd>
        )}
      </div>
    </div>
  );
}
