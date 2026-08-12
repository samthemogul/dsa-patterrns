/**
 * All enrichment entries, merged into one lookup.
 *
 * Each module exports an `enrichment` object keyed by topic id, holding
 * `walkthrough`, `cpp` and/or `illustration`. To add a batch: create a module here and add
 * it to SOURCES. Topics with no entry keep their short description and their
 * Python/TypeScript implementations.
 */

import { enrichment as foundations } from './foundations.js';
import { enrichment as batch1 } from './batch1.js';
import { enrichment as batch2 } from './batch2.js';
import { enrichment as batch3 } from './batch3.js';
import { enrichment as batch4 } from './batch4.js';
import { enrichment as batch5 } from './batch5.js';
import { enrichment as batch6 } from './batch6.js';
import { enrichment as batch7 } from './batch7.js';
import { enrichment as batch8 } from './batch8.js';
import { enrichment as batch9 } from './batch9.js';
import { enrichment as batch10 } from './batch10.js';
import { enrichment as batch11 } from './batch11.js';
import { enrichment as batch12 } from './batch12.js';
import { enrichment as batch13 } from './batch13.js';
import { enrichment as batch14 } from './batch14.js';
import { enrichment as batch15 } from './batch15.js';

const SOURCES = [
  foundations, batch1, batch2, batch3, batch4, batch5, batch6, batch7,
  batch8, batch9, batch10, batch11, batch12, batch13, batch14, batch15,
];

export const enrichment = Object.assign({}, ...SOURCES);

/** Applies walkthrough, C++ and a replacement illustration, where present. */
export function enrich(topic) {
  const extra = enrichment[topic.id];
  if (!extra) return topic;
  return {
    ...topic,
    walkthrough: extra.walkthrough ?? topic.walkthrough,
    illustration: extra.illustration ?? topic.illustration,
    code: extra.cpp ? { ...topic.code, cpp: extra.cpp } : topic.code,
  };
}
