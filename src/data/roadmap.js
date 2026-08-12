/**
 * The learning path.
 *
 * Stages are ordered: each assumes the ones before it. Within a stage, the
 * order is the recommended reading order, not a strict dependency chain.
 *
 * Every topic id in the library should appear in exactly one stage — the
 * roadmap component checks this and reports anything orphaned, so adding a
 * topic without placing it on the path is a visible mistake rather than a
 * silent one.
 */

export const stages = [
  {
    id: "stage-foundations",
    number: 1,
    title: "Foundations",
    level: "Beginner",
    goal: "Read the cost of code, and know the four structures everything else is built from.",
    detail:
      "Start here even if you have written code for years. Almost every wrong answer in an interview comes from misreading complexity or reaching for the wrong container, not from failing to know an exotic algorithm. Finish this stage able to say what a loop costs and why, and to pick between an array, a hash map, a stack and a queue without hesitating.",
    topics: [
      "foundations-complexity",
      "foundations-recursion",
      "array-searching-binary-search",
      "hash-map-basics",
      "hash-set-basics",
      "stacks-basics",
      "queues-basics",
      "ll-traversal",
      "ll-insertion-deletion",
    ],
  },
  {
    id: "stage-patterns",
    number: 2,
    title: "Core Patterns",
    level: "Beginner",
    goal: "The handful of array and list techniques that solve most easy and medium problems.",
    detail:
      "This is the highest-yield stage in the whole roadmap. Two pointers, sliding window and prefix sums between them cover an enormous share of real interview questions, and each one turns an obvious quadratic solution into a linear one. Work through these until you recognise which applies from the problem statement alone.",
    topics: [
      "array-twopointers",
      "array-sliding-window",
      "array-prefix-sum",
      "array-sorting-mergesort",
      "array-sorting-quicksort",
      "array-intervals",
      "ll-reversal",
      "ll-cycle-detection",
      "stacks-monotonic",
    ],
  },
  {
    id: "stage-structures",
    number: 3,
    title: "Trees, Heaps & Graphs",
    level: "Intermediate",
    goal: "Non-linear structures, and the two traversals that unlock all of them.",
    detail:
      "Everything here is a variation on visiting nodes in a sensible order. Learn BFS and DFS properly — as templates you can write without thinking — and trees, grids, and graph connectivity all become the same problem wearing different clothes. Heaps join here because 'repeatedly take the smallest' is the other primitive you will reach for constantly.",
    topics: [
      "trees-traversal",
      "trees-bst",
      "ordered-map-set",
      "heaps-basics",
      "heaps-top-k",
      "graphs-traversal-bfs",
      "graphs-traversal-dfs",
      "graphs-cycle-detection",
      "graphs-topological-sort",
      "union-find-basics",
      "tries-implementation",
    ],
  },
  {
    id: "stage-design",
    number: 4,
    title: "Algorithm Design",
    level: "Intermediate",
    goal: "The three strategies — divide and conquer, greedy, and dynamic programming.",
    detail:
      "Up to now you have been learning structures. This stage is about strategy: given a problem you have never seen, which shape of solution applies? Dynamic programming is the biggest block and the one interviews lean on hardest, so it gets ten topics. Do not skip the fundamentals topic at its start — the rest only makes sense once state and transition are second nature.",
    topics: [
      "foundations-divide-conquer",
      "array-binary-search-answer",
      "greedy-activity-selection",
      "backtracking-permutations",
      "dp-fundamentals",
      "dp-kadane",
      "dp-knapsack-01",
      "dp-unbounded-knapsack",
      "dp-lcs",
      "dp-edit-distance",
      "dp-lis",
      "dp-grid-paths",
      "dp-trees",
    ],
  },
  {
    id: "stage-weighted",
    number: 5,
    title: "Weighted Graphs & Maths",
    level: "Intermediate",
    goal: "Shortest paths with costs, and the number theory competitive problems assume.",
    detail:
      "Graphs get weights, which breaks the assumptions plain BFS relies on and brings in Dijkstra, Bellman-Ford and Floyd-Warshall. The maths topics look like a detour but are not — modular arithmetic in particular shows up the moment a counting problem asks for its answer mod 10^9+7, which is most of them.",
    topics: [
      "graphs-shortest-path-dijkstra",
      "graphs-bellman-ford-floyd",
      "graphs-mst",
      "bit-manipulation-basics",
      "math-gcd",
      "math-sieve",
      "math-modular",
      "math-combinatorics",
    ],
  },
  {
    id: "stage-advanced",
    number: 6,
    title: "Advanced",
    level: "Advanced",
    goal: "Range query structures, string algorithms, and the design questions that combine everything.",
    detail:
      "Past the interview bar and into competitive territory. Segment trees and Fenwick trees answer range queries under updates; KMP and Rabin-Karp do string matching in linear time; bitmask DP handles problems whose state is a subset. The design topics belong here because they are compositions — an LRU cache is a hash map welded to a linked list.",
    topics: [
      "graphs-segment-tree",
      "range-fenwick-tree",
      "string-algorithms-kmp",
      "string-algorithms-rabinkarp",
      "dp-bitmask",
      "design-lru-cache",
      "design-iterators-streams",
    ],
  },
];

/** Flat list of every topic id on the path, in order. */
export const pathOrder = stages.flatMap((s) => s.topics);

/** The stage a topic belongs to, or null if it has not been placed. */
export function stageOf(topicId) {
  return stages.find((s) => s.topics.includes(topicId)) ?? null;
}
