import { notFound } from 'next/navigation';
import { allTopics, findTopic } from '../../../data/index.js';
import { stageOf } from '../../../data/roadmap.js';
import TopicPage from '../../../components/TopicPage';

/**
 * One prerendered HTML page per topic. The topic list is known at build
 * time, so `output: export` emits all of them as static files.
 *
 * Note on `params`: from Next 15 it is a Promise and must be awaited.
 * Reading it synchronously still works in 15.x but logs a deprecation
 * warning on every render, and is removed in Next 16.
 * `generateStaticParams` is unaffected — it still returns a plain array.
 */
export function generateStaticParams() {
  return allTopics.map((t) => ({ id: t.id }));
}

// A few titles repeat across categories — "Traversal" belongs to both Linked
// Lists and Trees. Those pages qualify their <title> with the category so a
// shared link is not ambiguous; unique titles stay clean.
const AMBIGUOUS = (() => {
  const counts = new Map();
  for (const t of allTopics) counts.set(t.title, (counts.get(t.title) ?? 0) + 1);
  return new Set([...counts].filter(([, n]) => n > 1).map(([title]) => title));
})();

export async function generateMetadata({ params }) {
  const { id } = await params;
  const topic = findTopic(id);
  if (!topic) return { title: 'Not found' };

  const stage = stageOf(topic.id);
  const title = AMBIGUOUS.has(topic.title)
    ? `${topic.title} · ${topic.category}`
    : topic.title;

  return {
    title,
    description:
      topic.summary ??
      `${topic.title} — ${topic.category}${stage ? `, stage ${stage.number}` : ''}.`,
    openGraph: {
      title: `${title} · DSA Pattern Explorer`,
      description: topic.summary,
      type: 'article',
    },
  };
}

export default async function Topic({ params }) {
  const { id } = await params;
  if (!findTopic(id)) notFound();
  return <TopicPage id={id} />;
}
