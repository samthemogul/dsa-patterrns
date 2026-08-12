/**
 * Content checks, run before every build.
 *
 * These are the mistakes that actually recur when adding topics. Each one
 * either breaks the build with a confusing error or produces a silently
 * wrong page, so catching them here is worth the second it costs.
 *
 *   npm run check
 */

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const problems = [];
const fail = (msg) => problems.push(msg);

/* 1 ─ Syntax, file by file.
   Code and trace fields are template literals, so a stray `identifier`
   inside one closes the string early. Importing each data file on its own
   pinpoints which file is broken; the bundler's error does not. */
const dataDirs = ['src/data/topics', 'src/data/enrichment'];
let syntaxOk = true;

for (const dir of dataDirs) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.js'))) {
    const path = join(dir, file);
    try {
      await import(pathToFileURL(path).href);
    } catch (err) {
      syntaxOk = false;
      const hint =
        err instanceof SyntaxError
          ? '  (a stray `backtick` inside a template literal is the usual cause)'
          : '';
      fail(`${path}: ${err.message}${hint}`);
    }
  }
}

// Everything below needs the assembled library, which cannot load if any
// single file is broken.
if (!syntaxOk) {
  console.error(`\n${problems.length} problem${problems.length > 1 ? 's' : ''}:`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}

const { categories, allTopics, findTopic } = await import('../src/data/index.js');
const { stages, pathOrder } = await import('../src/data/roadmap.js');
const { classify } = await import('../src/lib/complexity.js');

/* 2 ─ Unique topic ids. Routes are keyed by id, so a duplicate means one
   page silently shadows the other. */
const seen = new Set();
for (const t of allTopics) {
  if (seen.has(t.id)) fail(`duplicate topic id "${t.id}"`);
  seen.add(t.id);
}

/* 3 ─ Required fields. A missing title or id breaks routing outright;
   a missing summary leaves an empty roadmap card. */
for (const t of allTopics) {
  for (const field of ['id', 'title', 'subtitle', 'summary']) {
    if (!t[field]) fail(`${t.id || '(no id)'}: missing ${field}`);
  }
  if (!t.code || !Object.keys(t.code).length) fail(`${t.id}: no implementations`);
  if (!t.walkthrough?.length && !t.description) {
    fail(`${t.id}: neither walkthrough nor description`);
  }
}

/* 4 ─ Roadmap coverage. A page is generated per topic, so an unplaced
   topic exists but is unreachable from the roadmap. */
const onPath = new Set(pathOrder);
for (const t of allTopics) {
  if (!onPath.has(t.id)) fail(`${t.id}: not placed on any roadmap stage`);
}
for (const id of pathOrder) {
  if (!findTopic(id)) fail(`roadmap references "${id}", which no topic defines`);
}
const twice = pathOrder.filter((id, i) => pathOrder.indexOf(id) !== i);
for (const id of new Set(twice)) fail(`${id}: placed on more than one stage`);

/* 5 ─ Duplicate problems inside one difficulty bucket. Deduped at load
   time so they cannot break rendering, but they signal a copy-paste slip. */
for (const t of allTopics) {
  for (const [bucket, list] of Object.entries(t.problems ?? {})) {
    const urls = list.map((p) => p.url);
    for (const url of new Set(urls.filter((u, i) => urls.indexOf(u) !== i))) {
      fail(`${t.id} / ${bucket}: "${url}" listed more than once`);
    }
  }
}

/* 6 ─ Complexity strings the ruler can place. An unparseable `time`
   renders the ruler with no marker, which looks broken rather than absent. */
for (const t of allTopics) {
  if (t.complexity?.time && !classify(t.complexity.time)) {
    fail(`${t.id}: complexity time "${t.complexity.time}" is not on the ruler scale`);
  }
}

/* 7 ─ SVG illustrations need a viewBox to scale and a label to be
   readable by anyone using a screen reader. */
for (const t of allTopics) {
  const svg = t.illustration?.trim();
  if (!svg?.startsWith('<svg')) continue;
  if (!/viewBox=/.test(svg)) fail(`${t.id}: SVG has no viewBox, so it will not scale`);
  if (!/aria-label=/.test(svg)) fail(`${t.id}: SVG has no aria-label`);
}

/* ─ Report ─────────────────────────────────────────────────────────────── */
const enriched = allTopics.filter((t) => t.walkthrough?.length).length;
const withCpp = allTopics.filter((t) => t.code?.cpp).length;
const totalProblems = allTopics.reduce(
  (n, t) => n + Object.values(t.problems ?? {}).flat().length,
  0
);

console.log(
  `${categories.length} categories · ${allTopics.length} topics · ` +
    `${stages.length} stages · ${totalProblems} problems`
);
console.log(`walkthroughs ${enriched}/${allTopics.length} · C++ ${withCpp}/${allTopics.length}`);

if (problems.length) {
  console.error(`\n${problems.length} problem${problems.length > 1 ? 's' : ''}:`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log('content OK');
