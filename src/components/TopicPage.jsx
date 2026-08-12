'use client';

import { useMemo } from 'react';
import { findTopic } from '../data';
import { pathOrder, stageOf } from '../data/roadmap';
import { useApp } from './Providers';
import TopicView from './TopicView';

export default function TopicPage({ id }) {
  const { solved, toggle, language, setLanguage } = useApp();
  const topic = findTopic(id);

  const neighbours = useMemo(() => {
    const i = pathOrder.indexOf(id);
    if (i === -1) return null;
    return {
      prev: i > 0 ? findTopic(pathOrder[i - 1]) : null,
      next: i < pathOrder.length - 1 ? findTopic(pathOrder[i + 1]) : null,
    };
  }, [id]);

  if (!topic) return null;

  return (
    <TopicView
      topic={topic}
      language={language}
      onLanguageChange={setLanguage}
      solved={solved}
      onToggle={toggle}
      stage={stageOf(topic.id)}
      neighbours={neighbours}
    />
  );
}
