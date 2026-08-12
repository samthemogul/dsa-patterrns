'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';

hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('java', java);

const LABELS = { python: 'Python', cpp: 'C++', typescript: 'TypeScript', java: 'Java' };
// Fixed tab order, so the switcher doesn't reshuffle between topics.
const ORDER = ['python', 'cpp', 'typescript', 'java'];

/** Code panel with a language switch and copy button. */
export default function CodeBlock({ code, language, onLanguageChange }) {
  const languages = useMemo(
    () => ORDER.filter((k) => code?.[k]),
    [code]
  );
  const active = languages.includes(language) ? language : languages[0];
  const source = code?.[active] ?? '';
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && source) {
      ref.current.textContent = source;
      delete ref.current.dataset.highlighted;
      hljs.highlightElement(ref.current);
    }
  }, [source, active]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  if (!languages.length) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code">
      <div className="code__bar">
        <div className="code__tabs" role="tablist" aria-label="Code language">
          {languages.map((lang) => (
            <button
              key={lang}
              role="tab"
              aria-selected={lang === active}
              className="code__tab"
              onClick={() => onLanguageChange(lang)}
            >
              {LABELS[lang] ?? lang}
            </button>
          ))}
        </div>
        <button className="code__copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code ref={ref} className={`language-${active}`} />
      </pre>
    </div>
  );
}
