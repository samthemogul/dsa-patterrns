'use client';

import { useMemo } from 'react';
import { allTopics, categories, countProblems, findTopic } from '../data';
import { pathOrder } from '../data/roadmap';
import { useApp, useTopicProgress } from './Providers';
import Roadmap from './Roadmap';

const TOTAL_PROBLEMS = countProblems();

export default function RoadmapPage() {
  const { solved } = useApp();
  const topicProgress = useTopicProgress();

  const totals = useMemo(
    () => ({
      categories: categories.length,
      topics: allTopics.length,
      problems: TOTAL_PROBLEMS,
      solved: solved.size,
    }),
    [solved]
  );

  // Where "Continue" goes: the first topic on the path with unsolved problems.
  const firstUnfinished = useMemo(() => {
    for (const id of pathOrder) {
      const t = findTopic(id);
      if (!t) continue;
      const p = topicProgress(t);
      if (p.total === 0 || p.done < p.total) return t;
    }
    return findTopic(pathOrder[0]);
  }, [topicProgress]);

  return (
    <Roadmap
      totals={totals}
      topicProgress={topicProgress}
      findTopic={findTopic}
      firstUnfinished={firstUnfinished}
    />
  );
}
