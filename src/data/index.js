/**
 * Assembles every category module into the ordered library the app reads.
 *
 * To add a topic: open the relevant file in ./topics and append an object to
 * its `topics` array. To add a category: create the module, then import it
 * below and slot it into ORDER where it belongs in the learning path.
 */

import * as foundations from './topics/foundations.js';
import * as structures from './topics/structures.js';
import * as arrays from './topics/arrays.js';
import * as strings from './topics/strings.js';
import * as bitManipulation from './topics/bit-manipulation.js';
import * as linkedLists from './topics/linked-lists.js';
import * as stacks from './topics/stacks.js';
import * as queues from './topics/queues.js';
import * as hashTables from './topics/hash-tables.js';
import * as trees from './topics/trees.js';
import * as heaps from './topics/heaps.js';
import * as tries from './topics/tries.js';
import * as unionFind from './topics/union-find.js';
import * as graphs from './topics/graphs.js';
import * as rangeQueries from './topics/range-queries.js';
import * as dynamicProgramming from './topics/dynamic-programming.js';
import * as greedy from './topics/greedy.js';
import * as backtracking from './topics/backtracking.js';
import * as math from './topics/math.js';
import * as design from './topics/design.js';
import { enrich } from './enrichment/index.js';

// Ordered as a study path: fundamentals, then linear structures, then
// hierarchical, then the algorithm families that build on all of them.
const ORDER = [
  foundations,
  structures,
  arrays,
  strings,
  bitManipulation,
  linkedLists,
  stacks,
  queues,
  hashTables,
  trees,
  heaps,
  tries,
  unionFind,
  graphs,
  rangeQueries,
  dynamicProgramming,
  greedy,
  backtracking,
  math,
  design,
];

/**
 * Drops repeated problems within a difficulty bucket.
 *
 * The same problem legitimately appears under several topics — "Reorder List"
 * is both a linked-list and a two-pointer exercise — and sharing the URL means
 * ticking it off in one place ticks it off everywhere, which is what you want.
 * Repeats within a *single* bucket are just data slips, and they would collide
 * as React keys, so they get removed here rather than policed by hand.
 */
function dedupeProblems(problems) {
  if (!problems) return problems;
  const out = {};
  for (const [bucket, list] of Object.entries(problems)) {
    const seen = new Set();
    out[bucket] = list.filter((p) => {
      if (seen.has(p.url)) return false;
      seen.add(p.url);
      return true;
    });
  }
  return out;
}

export const categories = ORDER.map((mod) => ({
  name: mod.name,
  topics: mod.topics.map((t) => enrich({ ...t, problems: dedupeProblems(t.problems) })),
}));

/** Every topic, flattened, each tagged with the category it came from. */
export const allTopics = categories.flatMap((cat) =>
  cat.topics.map((t) => ({ ...t, category: cat.name }))
);

const index = new Map(allTopics.map((t) => [t.id, t]));

export const findTopic = (id) => (id ? index.get(id) ?? null : null);

export function countProblems() {
  return allTopics.reduce(
    (sum, t) => sum + (t.problems ? Object.values(t.problems).flat().length : 0),
    0
  );
}
