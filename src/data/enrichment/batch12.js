/**
 * Enrichment batch 12 — Stage 6, part one: range queries and KMP.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "graphs-segment-tree": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A segment tree over eight elements, with the query range decomposed into a few covering nodes">
  <text x="0" y="14" class="dg-title">Query sum over [2, 6] &#8212; covered by three nodes, not five</text>

  <g transform="translate(20,32)">
    <rect x="250" y="0" width="160" height="24" rx="3" class="dg-cell-idle"/>
    <text x="330" y="17" text-anchor="middle" class="dg-index">[0..7] = 36</text>

    <rect x="130" y="36" width="150" height="24" rx="3" class="dg-cell-idle"/>
    <text x="205" y="53" text-anchor="middle" class="dg-index">[0..3] = 10</text>
    <rect x="380" y="36" width="150" height="24" rx="3" class="dg-cell-idle"/>
    <text x="455" y="53" text-anchor="middle" class="dg-index">[4..7] = 26</text>

    <rect x="70"  y="72" width="120" height="24" rx="3" class="dg-cell-idle"/>
    <text x="130" y="89" text-anchor="middle" class="dg-index">[0..1] = 3</text>
    <rect x="200" y="72" width="120" height="24" rx="3" class="dg-cell-hit"/>
    <text x="260" y="89" text-anchor="middle">[2..3] = 7</text>
    <rect x="340" y="72" width="120" height="24" rx="3" class="dg-cell-hit"/>
    <text x="400" y="89" text-anchor="middle">[4..5] = 11</text>
    <rect x="470" y="72" width="120" height="24" rx="3" class="dg-cell-idle"/>
    <text x="530" y="89" text-anchor="middle" class="dg-index">[6..7] = 15</text>

    <rect x="70"  y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="98"  y="125" text-anchor="middle" class="dg-index">1</text>
    <rect x="132" y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="160" y="125" text-anchor="middle" class="dg-index">2</text>
    <rect x="200" y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="228" y="125" text-anchor="middle" class="dg-index">3</text>
    <rect x="262" y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="290" y="125" text-anchor="middle" class="dg-index">4</text>
    <rect x="340" y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="368" y="125" text-anchor="middle" class="dg-index">5</text>
    <rect x="402" y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="430" y="125" text-anchor="middle" class="dg-index">6</text>
    <rect x="470" y="108" width="56" height="24" rx="3" class="dg-cell-mark"/><text x="498" y="125" text-anchor="middle">7</text>
    <rect x="532" y="108" width="56" height="24" rx="3" class="dg-cell-idle"/><text x="560" y="125" text-anchor="middle" class="dg-index">8</text>

    <text x="0" y="89"  class="dg-label">level 2</text>
    <text x="0" y="125" class="dg-label">leaves</text>
  </g>

  <line x1="0" y1="192" x2="700" y2="192" class="dg-guide"/>

  <g transform="translate(0,206)">
    <rect x="0" y="0" width="340" height="102" rx="4" class="dg-cell-hit"/>
    <text x="14" y="24" class="dg-note">[2..3] fully inside &#8594; return 7, stop</text>
    <text x="14" y="46" class="dg-note">[4..5] fully inside &#8594; return 11, stop</text>
    <text x="14" y="68" class="dg-note">index 6 alone&#160;&#160;&#160;&#160;&#8594; return 7</text>
    <text x="14" y="92" class="dg-good">7 + 11 + 7 = 25, in 3 reads</text>

    <rect x="360" y="0" width="330" height="102" rx="4" class="dg-cell-idle"/>
    <text x="374" y="24" class="dg-note">Any range decomposes into at most</text>
    <text x="374" y="46" class="dg-note">2 nodes per level &#8594; O(log n) reads.</text>
    <text x="374" y="76" class="dg-note">Recursion stops at "fully inside" and</text>
    <text x="374" y="96" class="dg-note">at "no overlap" &#8212; that is the whole trick.</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "The problem prefix sums cannot solve",
        body: [
          "A prefix sum array answers range sums in O(1), which is unbeatable — until an element changes. Then every prefix from that point onward is stale, and rebuilding costs O(n). A workload that mixes updates and queries degrades badly.",
          "A segment tree accepts O(log n) per query in exchange for O(log n) per update. On a mixed workload of n operations that is O(n log n) rather than O(n²), which is the difference between feasible and not.",
          "The structure is a binary tree where each node stores the aggregate over a contiguous range. The root covers everything, its children cover the two halves, and the leaves are individual elements. Any node's value is computed from its two children, so an update touches only the path from one leaf to the root.",
        ],
      },
      {
        heading: "Why a query touches only O(log n) nodes",
        body: [
          "The query walks down from the root with three cases at each node. If the node's range lies entirely outside the query, return the identity — zero for sums, infinity for minimums — and stop. If it lies entirely inside, return its stored value and stop, without descending further. Otherwise the ranges partly overlap, so recurse into both children and combine.",
          "The second case is where the efficiency comes from: a fully-covered node is one read regardless of how many elements it represents. A query over half the array might touch a single node.",
          "The bound comes from noticing that at most two nodes per level are ever partially overlapping — one at each end of the query range. Everything between them is fully covered and stops immediately, and everything outside stops immediately too. With log n levels and at most a constant number of nodes expanded per level, the total is O(log n).",
        ],
        aside:
          "Both stopping conditions matter. Forgetting the no-overlap case makes the query visit every leaf, silently turning O(log n) into O(n) — correct answers, hopeless performance.",
      },
      {
        heading: "Storing it in an array",
        body: [
          "As with a heap, the tree lives in a flat array with arithmetic instead of pointers. Node 1 is the root, and node i has children 2i and 2i+1. Index 0 is left unused so the arithmetic works.",
          "The array must be sized 4n, which surprises people. The reason: when n is not a power of two, the recursive halving produces a tree that can reach depth ceil(log₂ n) + 1, and the array indices used can exceed 2n. Four times n is the safe upper bound and the conventional choice. An alternative is to round n up to the next power of two and use exactly 2n, which wastes some leaves but makes the size exact.",
          "There is also a well-known iterative formulation that stores leaves at positions n through 2n-1 and internal nodes below, needing only 2n and no recursion. It is shorter and faster, but the recursive version generalises to lazy propagation far more naturally, which is why it is the one worth learning first.",
        ],
      },
      {
        heading: "What it can aggregate",
        body: [
          "Anything associative works, because the tree combines children in a fixed nesting order. Sum, minimum, maximum, greatest common divisor, bitwise AND and OR are all fine. Each needs its own identity value — 0 for sum, positive infinity for minimum, 0 for GCD and OR, all-ones for AND.",
          "This is the advantage over a Fenwick tree, which additionally requires an inverse so it can subtract one prefix from another. Minimum has no inverse — you cannot remove a value from a minimum — so range minimum queries need a segment tree.",
          "More elaborate node values are possible and are where segment trees become powerful. Storing the maximum subarray sum plus the best prefix, best suffix and total for each range lets you answer maximum-subarray over any range, because those four values are enough to combine two children correctly. The general recipe: decide what a node must store so that two nodes can be merged without looking inside them.",
        ],
        trace: `Merging for range maximum-subarray

  each node stores: total, bestPrefix,
                    bestSuffix, best

  merge(L, R):
    total  = L.total + R.total
    prefix = max(L.prefix, L.total + R.prefix)
    suffix = max(R.suffix, R.total + L.suffix)
    best   = max(L.best, R.best,
                 L.suffix + R.prefix)   ← crossing

  The crossing case is why suffix and prefix
  must be stored at all.`,
      },
      {
        heading: "Lazy propagation, for range updates",
        body: [
          "A plain segment tree updates one element at a time. Updating a whole range — add 5 to everything in [3, 900] — would take O(n log n) done element by element, which defeats the purpose.",
          "Lazy propagation fixes this by deferring work. When an update fully covers a node's range, apply the effect to that node's aggregate and record a pending marker on it, rather than descending to its children. The children stay stale, but nobody can observe that until someone descends through this node — at which point you push the marker down first.",
          "So every operation gains a push-down step at the top of the recursion: if this node has a pending marker, apply it to both children, give them their own markers, and clear it here. With that, range updates and range queries are both O(log n).",
          "The subtlety is that the marker must be composable, since several updates can pile up before anything descends. Range-add composes by summing the pending deltas. Range-assign composes by overwriting. Mixing add and assign in one tree requires deciding their interaction carefully, and is the usual source of bugs in lazy implementations.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Segment tree when you need range queries with updates and the operation has no inverse — range minimum, range maximum, range GCD — or when the node value is a composite structure. Also whenever you need range updates, since Fenwick trees handle those only awkwardly.",
          "Fenwick tree when the operation is a sum or another invertible aggregate and you only need point updates. Same complexity, a third of the code, and a noticeably smaller constant factor.",
          "Sparse table when the data never changes and the operation is idempotent — minimum, maximum, GCD. O(n log n) to build, then O(1) per query, which beats both. Idempotence matters because overlapping ranges are combined, which would double-count a sum.",
          "Plain prefix sums when the data never changes and the operation is a sum. O(1) queries and three lines of code. Do not build a segment tree for a static array.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Recursive segment tree. Node 1 is the root; node i has children 2i and
// 2i+1. Sized 4n: when n is not a power of two the recursion can reach
// indices above 2n, and 4n is the safe bound.
struct SegmentTree {
    int n;
    vector<long long> tree;

    explicit SegmentTree(const vector<int>& values) : n((int)values.size()),
                                                      tree(4 * n, 0) {
        build(1, 0, n - 1, values);
    }

    void build(int node, int lo, int hi, const vector<int>& values) {
        if (lo == hi) { tree[node] = values[lo]; return; }
        int mid = lo + (hi - lo) / 2;
        build(2 * node,     lo,      mid, values);
        build(2 * node + 1, mid + 1, hi,  values);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    // Three cases: no overlap, full cover, partial. The first two are
    // what keep this O(log n) - dropping either visits every leaf.
    long long query(int node, int lo, int hi, int left, int right) const {
        if (right < lo || hi < left) return 0;              // no overlap
        if (left <= lo && hi <= right) return tree[node];   // fully covered
        int mid = lo + (hi - lo) / 2;                       // partial
        return query(2 * node,     lo,      mid, left, right)
             + query(2 * node + 1, mid + 1, hi,  left, right);
    }
    long long query(int left, int right) const { return query(1, 0, n - 1, left, right); }

    void update(int node, int lo, int hi, int index, long long value) {
        if (lo == hi) { tree[node] = value; return; }
        int mid = lo + (hi - lo) / 2;
        if (index <= mid) update(2 * node,     lo,      mid, index, value);
        else              update(2 * node + 1, mid + 1, hi,  index, value);
        tree[node] = tree[2 * node] + tree[2 * node + 1];   // repair upward
    }
    void update(int index, long long value) { update(1, 0, n - 1, index, value); }
};

// LAZY PROPAGATION - range updates as well as range queries, both O(log n).
// The marker is applied to a node's aggregate immediately and pushed to
// its children only when someone needs to descend past it.
struct LazySegmentTree {
    int n;
    vector<long long> tree, lazy;

    explicit LazySegmentTree(int size) : n(size), tree(4 * size, 0),
                                         lazy(4 * size, 0) {}

    void push(int node, int lo, int hi) {
        if (lazy[node] == 0) return;
        tree[node] += lazy[node] * (hi - lo + 1);      // whole range shifts
        if (lo != hi) {                                 // hand it to children
            lazy[2 * node]     += lazy[node];
            lazy[2 * node + 1] += lazy[node];
        }
        lazy[node] = 0;
    }

    void addRange(int node, int lo, int hi, int left, int right, long long delta) {
        push(node, lo, hi);                             // settle before reading
        if (right < lo || hi < left) return;
        if (left <= lo && hi <= right) {                // fully covered:
            lazy[node] += delta;                        // defer, don't descend
            push(node, lo, hi);
            return;
        }
        int mid = lo + (hi - lo) / 2;
        addRange(2 * node,     lo,      mid, left, right, delta);
        addRange(2 * node + 1, mid + 1, hi,  left, right, delta);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    void addRange(int l, int r, long long d) { addRange(1, 0, n - 1, l, r, d); }

    long long query(int node, int lo, int hi, int left, int right) {
        push(node, lo, hi);                             // must settle first
        if (right < lo || hi < left) return 0;
        if (left <= lo && hi <= right) return tree[node];
        int mid = lo + (hi - lo) / 2;
        return query(2 * node,     lo,      mid, left, right)
             + query(2 * node + 1, mid + 1, hi,  left, right);
    }
    long long query(int l, int r) { return query(1, 0, n - 1, l, r); }
};

// A composite node value: range maximum-subarray. Storing prefix and
// suffix is what makes two children mergeable without looking inside.
struct MaxSubarrayNode {
    long long total = 0, prefix = LLONG_MIN, suffix = LLONG_MIN, best = LLONG_MIN;

    static MaxSubarrayNode leaf(long long v) { return {v, v, v, v}; }

    static MaxSubarrayNode merge(const MaxSubarrayNode& L,
                                 const MaxSubarrayNode& R) {
        return {
            L.total + R.total,
            max(L.prefix, L.total + R.prefix),
            max(R.suffix, R.total + L.suffix),
            max({L.best, R.best, L.suffix + R.prefix}),   // the crossing case
        };
    }
};

// RANGE MINIMUM needs a segment tree, not a Fenwick tree: you cannot
// subtract a minimum back out, so there is no inverse to exploit.
struct MinSegmentTree {
    int n;
    vector<int> tree;

    explicit MinSegmentTree(const vector<int>& v) : n((int)v.size()),
                                                    tree(4 * n, INT_MAX) {
        build(1, 0, n - 1, v);
    }
    void build(int node, int lo, int hi, const vector<int>& v) {
        if (lo == hi) { tree[node] = v[lo]; return; }
        int mid = lo + (hi - lo) / 2;
        build(2*node, lo, mid, v);
        build(2*node+1, mid+1, hi, v);
        tree[node] = min(tree[2*node], tree[2*node+1]);
    }
    int query(int node, int lo, int hi, int l, int r) const {
        if (r < lo || hi < l) return INT_MAX;          // identity for min
        if (l <= lo && hi <= r) return tree[node];
        int mid = lo + (hi - lo) / 2;
        return min(query(2*node, lo, mid, l, r), query(2*node+1, mid+1, hi, l, r));
    }
    int query(int l, int r) const { return query(1, 0, n - 1, l, r); }
};`,
  },

  "range-fenwick-tree": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Fenwick tree responsibility ranges, and the index walks for query and update">
  <text x="0" y="14" class="dg-title">Index i is responsible for (i &amp; &#8722;i) elements ending at i</text>

  <g transform="translate(30,32)">
    <rect x="0"   y="0" width="60" height="24" rx="3" class="dg-cell-live"/><text x="30"  y="17" text-anchor="middle">1</text>
    <rect x="0"   y="28" width="124" height="24" rx="3" class="dg-cell-live"/><text x="62"  y="45" text-anchor="middle">2</text>
    <rect x="128" y="0" width="60" height="24" rx="3" class="dg-cell-live"/><text x="158" y="17" text-anchor="middle">3</text>
    <rect x="0"   y="56" width="252" height="24" rx="3" class="dg-cell-mark"/><text x="126" y="73" text-anchor="middle">4</text>
    <rect x="256" y="0" width="60" height="24" rx="3" class="dg-cell-live"/><text x="286" y="17" text-anchor="middle">5</text>
    <rect x="256" y="28" width="124" height="24" rx="3" class="dg-cell-mark"/><text x="318" y="45" text-anchor="middle">6</text>
    <rect x="384" y="0" width="60" height="24" rx="3" class="dg-cell-mark"/><text x="414" y="17" text-anchor="middle">7</text>

    <text x="30"  y="102" text-anchor="middle" class="dg-index">[1]</text>
    <text x="62"  y="102" text-anchor="middle" class="dg-index">&#160;</text>
    <text x="158" y="102" text-anchor="middle" class="dg-index">[3]</text>
    <text x="286" y="102" text-anchor="middle" class="dg-index">[5]</text>
    <text x="414" y="102" text-anchor="middle" class="dg-index">[7]</text>

    <text x="480" y="17" class="dg-label">width 1 &#8212; odd indices</text>
    <text x="480" y="45" class="dg-label">width 2</text>
    <text x="480" y="73" class="dg-label">width 4</text>
  </g>

  <line x1="0" y1="152" x2="700" y2="152" class="dg-guide"/>

  <g transform="translate(0,168)">
    <rect x="0" y="0" width="330" height="112" rx="4" class="dg-cell-mark"/>
    <text x="14" y="24" class="dg-note">QUERY prefix(7) &#8212; strip the lowest bit</text>
    <text x="14" y="48" class="dg-note">7 (111) &#8594; 6 (110) &#8594; 4 (100) &#8594; 0</text>
    <text x="14" y="72" class="dg-good">tree[7] + tree[6] + tree[4]</text>
    <text x="14" y="98" class="dg-label">3 reads &#8212; one per set bit of 7</text>

    <rect x="360" y="0" width="330" height="112" rx="4" class="dg-cell-live"/>
    <text x="374" y="24" class="dg-note">UPDATE index 3 &#8212; add the lowest bit</text>
    <text x="374" y="48" class="dg-note">3 (011) &#8594; 4 (100) &#8594; 8 (1000) &#8594; past n</text>
    <text x="374" y="72" class="dg-good">tree[3], tree[4], tree[8] all shift</text>
    <text x="374" y="98" class="dg-label">every node whose range covers index 3</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "A segment tree's job in a third of the code",
        body: [
          "A Fenwick tree, or binary indexed tree, maintains prefix sums under point updates in O(log n) using about twenty lines. For the specific job of prefix and range sums it does everything a segment tree does, with a smaller constant factor and far less room for bugs.",
          "The trade is generality. It requires an operation with an inverse, because range queries are computed as the difference of two prefixes. Sums work; minimums do not, since you cannot subtract a minimum back out. If you need range minimum, you need a segment tree.",
          "Under interview pressure the code-length difference is worth something real. If the problem is prefix or range sums with updates, reaching for the Fenwick tree means fewer lines to get wrong.",
        ],
      },
      {
        heading: "What each index is responsible for",
        body: [
          "The whole structure rests on one bit operation: i AND minus-i isolates the lowest set bit of i. Index i in the tree stores the aggregate over exactly that many elements, ending at position i.",
          "So index 8, which is 1000 in binary, has a lowest set bit of 8 and covers the eight elements from 1 to 8. Index 6, which is 110, has a lowest set bit of 2 and covers positions 5 and 6. Index 7, which is 111, has a lowest set bit of 1 and covers only itself.",
          "That assignment is what makes the two walks work. Every prefix decomposes into a small number of these ranges, and every position belongs to a small number of them — in both cases, one per set bit, which is at most log n.",
        ],
      },
      {
        heading: "The two walks, and why they go opposite ways",
        body: [
          "Querying a prefix walks downward by stripping the lowest set bit: i becomes i minus (i AND minus-i). Starting at 7 gives 7, then 6, then 4, then 0, and summing those three nodes covers positions 1 through 7 exactly once. Each step clears one bit, so the walk is as long as the popcount.",
          "Updating a position walks upward by adding the lowest set bit: i becomes i plus (i AND minus-i). Starting at 3 gives 3, then 4, then 8, and those are precisely the nodes whose responsibility ranges include position 3. Each step carries, which also happens at most log n times.",
          "The pleasing part is that these are inverse traversals of the same implicit structure, and neither requires the structure to exist explicitly. There is no tree, only an array and two loops.",
        ],
        trace: `n = 8, update position 3 by +5

  i = 3 (011)   tree[3] += 5
      3 + 1 = 4
  i = 4 (100)   tree[4] += 5
      4 + 4 = 8
  i = 8 (1000)  tree[8] += 5
      8 + 8 = 16 > n, stop

  Then prefix(7):
  i = 7 (111)   read tree[7]
      7 − 1 = 6
  i = 6 (110)   read tree[6]
      6 − 2 = 4
  i = 4 (100)   read tree[4]   ← includes our +5
      4 − 4 = 0, stop`,
      },
      {
        heading: "The one-indexing requirement",
        body: [
          "The internal array must be 1-indexed, and this is not a stylistic choice. Index 0 has no set bits, so 0 AND minus-0 is 0, and the update loop would add zero forever — an infinite loop.",
          "So the convention is to expose a 0-indexed API and shift internally: the public update at position i writes to internal index i+1. Getting this shift half-right is the most common Fenwick bug, producing answers that are correct for some ranges and off by one element for others.",
          "The other index confusion worth naming: prefixSum(i) conventionally means the sum of the first i elements, which is the 0-indexed range [0, i-1] — an exclusive upper bound. A range sum over the inclusive [l, r] is therefore prefixSum(r+1) minus prefixSum(l). Write down which convention you are using before you write the range function.",
        ],
        aside:
          "If your Fenwick tree hangs, the internal array is 0-indexed. If it is off by one element on some queries, the exclusive/inclusive convention slipped. Those two account for nearly every bug in this structure.",
      },
      {
        heading: "Counting inversions, and coordinate compression",
        body: [
          "The most common competitive use is not summing at all — it is counting. Walk the array from right to left, and at each element ask how many already-seen values are smaller than it. That count is the number of inversions this element participates in, and a Fenwick tree over value-ranks answers it in O(log n).",
          "The catch is that values can be enormous while the array is short. A Fenwick tree indexed by value would need an array the size of the value range. Coordinate compression fixes this: sort the distinct values, and replace each value by its rank in that sorted list. The tree is then indexed by rank, so its size is the number of distinct values.",
          "This combination — compress, then Fenwick over ranks — is the standard answer to Count of Smaller Numbers After Self, Reverse Pairs, and Create Sorted Array Through Instructions. Recognising 'how many earlier elements are smaller' as a Fenwick problem is the transferable part.",
        ],
      },
      {
        heading: "Range updates, and the 2D version",
        body: [
          "A plain Fenwick tree does point updates and range queries. Swapping the roles gives range updates with point queries: store a difference array in the tree, so adding v to the range [l, r] means adding v at l and subtracting v at r+1, and the value at position i is the prefix sum up to i.",
          "Getting both range updates and range queries requires two Fenwick trees and a little algebra, which is the point at which a lazy segment tree becomes the more sensible choice. Know that it is possible; reach for the segment tree.",
          "The 2D extension is straightforward and worth knowing: nest the two loops, so each of the O(log n) rows walks O(log m) columns, giving O(log n · log m) per operation. Useful for rectangle-sum queries on a mutable grid, where a 2D prefix sum would need a full rebuild after every change.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Fenwick tree. The internal array MUST be 1-indexed: index 0 has no
// set bit, so 0 & -0 is 0 and the update loop would never advance.
// The public API stays 0-indexed and shifts internally.
struct Fenwick {
    int n;
    vector<long long> tree;

    explicit Fenwick(int size) : n(size), tree(size + 1, 0) {}

    // Add delta at 0-indexed position i. Walk UP, adding the lowest bit:
    // these are exactly the nodes whose range covers position i.
    void update(int i, long long delta) {
        for (int k = i + 1; k <= n; k += k & -k) tree[k] += delta;
    }

    // Sum of the first i elements - 0-indexed EXCLUSIVE upper bound.
    // Walk DOWN, stripping the lowest bit: one read per set bit.
    long long prefixSum(int i) const {
        long long total = 0;
        for (int k = i; k > 0; k -= k & -k) total += tree[k];
        return total;
    }

    // Inclusive [left, right]. Note the +1 - mixing the conventions here
    // is the other classic Fenwick bug.
    long long rangeSum(int left, int right) const {
        return prefixSum(right + 1) - prefixSum(left);
    }

    // O(n) construction, cheaper than n separate updates.
    static Fenwick build(const vector<int>& values) {
        Fenwick f((int)values.size());
        for (int i = 0; i < f.n; ++i) f.tree[i + 1] += values[i];
        for (int i = 1; i <= f.n; ++i) {
            int parent = i + (i & -i);
            if (parent <= f.n) f.tree[parent] += f.tree[i];
        }
        return f;
    }

    // Bonus: find the smallest index whose prefix sum reaches target,
    // in O(log n) by descending the implicit tree.
    int lowerBound(long long target) const {
        int pos = 0;
        for (int step = 1 << (31 - __builtin_clz(n)); step; step >>= 1)
            if (pos + step <= n && tree[pos + step] < target) {
                pos += step;
                target -= tree[pos];
            }
        return pos;                          // 0-indexed answer
    }
};

// COUNTING INVERSIONS. Coordinate-compress first: values can be huge
// while the array is short, and the tree is indexed by rank.
long long countInversions(const vector<int>& nums) {
    vector<int> sorted(nums);
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());

    Fenwick fen((int)sorted.size());
    long long inversions = 0;

    for (int i = (int)nums.size() - 1; i >= 0; --i) {
        int rank = (int)(lower_bound(sorted.begin(), sorted.end(), nums[i])
                         - sorted.begin());
        inversions += fen.prefixSum(rank);   // strictly smaller, seen already
        fen.update(rank, 1);
    }
    return inversions;
}

// RANGE UPDATE, POINT QUERY - store a difference array in the tree.
// Adding v to [l, r] is +v at l and -v at r+1; the value at i is the
// prefix sum up to i.
struct RangeUpdateFenwick {
    Fenwick fen;
    explicit RangeUpdateFenwick(int n) : fen(n + 1) {}

    void addRange(int left, int right, long long v) {
        fen.update(left, v);
        fen.update(right + 1, -v);
    }
    long long valueAt(int i) const { return fen.prefixSum(i + 1); }
};

// 2D - nest the walks. O(log n * log m) per operation, useful for
// rectangle sums on a grid that keeps changing.
struct Fenwick2D {
    int rows, cols;
    vector<vector<long long>> tree;

    Fenwick2D(int r, int c) : rows(r), cols(c),
                              tree(r + 1, vector<long long>(c + 1, 0)) {}

    void update(int r, int c, long long delta) {
        for (int i = r + 1; i <= rows; i += i & -i)
            for (int j = c + 1; j <= cols; j += j & -j)
                tree[i][j] += delta;
    }

    long long prefixSum(int r, int c) const {
        long long total = 0;
        for (int i = r; i > 0; i -= i & -i)
            for (int j = c; j > 0; j -= j & -j)
                total += tree[i][j];
        return total;
    }

    long long rectSum(int r1, int c1, int r2, int c2) const {
        return prefixSum(r2 + 1, c2 + 1) - prefixSum(r1, c2 + 1)
             - prefixSum(r2 + 1, c1) + prefixSum(r1, c1);
    }
};`,
  },

  "string-algorithms-kmp": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The LPS table for a pattern, and how a mismatch shifts the pattern without moving the text pointer">
  <text x="0" y="14" class="dg-title">Pattern "ABABC" &#8212; LPS[i] = longest proper prefix that is also a suffix of [0..i]</text>

  <g transform="translate(60,32)">
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="26"  y="18" text-anchor="middle">A</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="82"  y="18" text-anchor="middle">B</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="138" y="18" text-anchor="middle">A</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="194" y="18" text-anchor="middle">B</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="250" y="18" text-anchor="middle">C</text>

    <text x="-46" y="18" class="dg-label">pattern</text>
    <text x="-46" y="48" class="dg-label">LPS</text>
    <text x="26"  y="48" text-anchor="middle" class="dg-note">0</text>
    <text x="82"  y="48" text-anchor="middle" class="dg-note">0</text>
    <text x="138" y="48" text-anchor="middle" class="dg-good">1</text>
    <text x="194" y="48" text-anchor="middle" class="dg-good">2</text>
    <text x="250" y="48" text-anchor="middle" class="dg-note">0</text>

    <text x="310" y="18" class="dg-label">"AB" is both a prefix and</text>
    <text x="310" y="38" class="dg-label">a suffix of "ABAB" &#8594; LPS = 2</text>
  </g>

  <line x1="0" y1="108" x2="700" y2="108" class="dg-guide"/>
  <text x="0" y="132" class="dg-title">A mismatch shifts the pattern, never the text</text>

  <g transform="translate(60,146)">
    <text x="-46" y="18" class="dg-label">text</text>
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="26"  y="18" text-anchor="middle">A</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="82"  y="18" text-anchor="middle">B</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="138" y="18" text-anchor="middle">A</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="194" y="18" text-anchor="middle">B</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-out"/><text x="250" y="18" text-anchor="middle">A</text>
    <rect x="280" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="306" y="18" text-anchor="middle">B</text>
    <rect x="336" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="362" y="18" text-anchor="middle">C</text>
    <text x="250" y="46" text-anchor="middle" class="dg-bad">mismatch: wanted C</text>

    <text x="-46" y="86" class="dg-label">before</text>
    <text x="0"   y="86" class="dg-note">A&#160;&#160;&#160;&#160;&#160;&#160;B&#160;&#160;&#160;&#160;&#160;&#160;A&#160;&#160;&#160;&#160;&#160;&#160;B&#160;&#160;&#160;&#160;&#160;&#160;C</text>

    <text x="-46" y="118" class="dg-label">after</text>
    <text x="112" y="118" class="dg-good">A&#160;&#160;&#160;&#160;&#160;&#160;B&#160;&#160;&#160;&#160;&#160;&#160;A&#160;&#160;&#160;&#160;&#160;&#160;B&#160;&#160;&#160;&#160;&#160;&#160;C</text>
    <text x="400" y="118" class="dg-note">slide by 4 &#8722; LPS[3] = 2</text>
  </g>

  <text x="0" y="304" class="dg-note">The text pointer never moves backwards, so the scan is O(n) no matter how many partial matches occur.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What the naive approach wastes",
        body: [
          "Searching for a pattern by trying every starting position and comparing forward is O(n·m) in the worst case. On a text of a million characters with a pattern of a thousand, that is a billion comparisons.",
          "What makes it wasteful is that a failed comparison throws away everything it learned. If you matched 'ABAB' before failing, you know the last four text characters were A, B, A, B — and the naive approach restarts one position later and re-reads them.",
          "KMP keeps that knowledge. When a mismatch happens after matching k characters, it works out how far the pattern can slide without missing a possible match, and the text pointer never moves backwards. That is what makes the whole scan O(n + m).",
        ],
      },
      {
        heading: "The LPS table",
        body: [
          "The precomputation builds an array usually called LPS, for longest proper prefix which is also a suffix. LPS[i] is the length of the longest string that is both a proper prefix of the pattern and a suffix of the pattern's first i+1 characters. 'Proper' means it cannot be the whole thing, otherwise the answer would trivially always be the full length.",
          "For the pattern ABABC, LPS is [0, 0, 1, 2, 0]. At index 3 the prefix so far is ABAB, and AB is both a prefix and a suffix of it, so the value is 2. At index 4 the prefix is ABABC, and nothing matches, so it drops to 0.",
          "The meaning in operational terms: if you have matched i+1 characters and then fail, LPS[i] tells you how many characters you can keep. Those characters are already aligned correctly, because they are simultaneously a suffix of what you matched and a prefix of the pattern.",
        ],
        trace: `Building LPS for "ABABC"

  i=0  'A'  first char, always 0        LPS = [0]
  i=1  'B'  vs pattern[0]='A'  no       LPS = [0,0]
  i=2  'A'  vs pattern[0]='A'  yes      LPS = [0,0,1]
  i=3  'B'  vs pattern[1]='B'  yes      LPS = [0,0,1,2]
  i=4  'C'  vs pattern[2]='A'  no
           fall back: length = LPS[1] = 0
           'C' vs pattern[0]='A'  no    LPS = [0,0,1,2,0]

The fallback on mismatch is the same idea
applied to the pattern against itself.`,
      },
      {
        heading: "Why the table is built against itself",
        body: [
          "The construction is the algorithm applied to the pattern searching within its own prefix, which is why it looks confusing the first time. Two pointers walk the pattern: i scans forward, and length tracks how much of a prefix currently matches.",
          "When the characters at i and length agree, the matched prefix grows by one and both advance. When they disagree, you cannot simply reset length to zero — a shorter prefix might still match. So you fall back to LPS[length - 1], which is the next-best candidate, and try again without advancing i.",
          "That fallback loop is the part people get wrong. The key point is that i never decreases, and length never increases by more than one per step, so the total work is O(m) by the same amortised argument as sliding window: length can only fall as many times as it has risen.",
        ],
        aside:
          "In the fallback, do not advance i. The whole point is to retry the same character against a shorter candidate prefix. Advancing i there skips characters and silently misses matches.",
      },
      {
        heading: "The search loop",
        body: [
          "With the table built, the search is short. Walk the text with one pointer and track how many pattern characters currently match. On agreement, advance both. On disagreement, fall back the pattern pointer to LPS of one less — again without moving the text pointer — or, if already at zero, advance the text pointer.",
          "When the match count reaches the pattern length, you have found an occurrence. To continue searching for overlapping occurrences, fall back exactly as you would on a mismatch, using LPS of the last index. That is why KMP naturally finds overlapping matches, which naive searching for 'AAA' in 'AAAAA' also does but many implementations of other algorithms do not.",
          "Since the text pointer only ever moves forward, and the pattern pointer falls at most as often as it rises, the search is O(n). Combined with O(m) preprocessing, the whole thing is O(n + m) with O(m) extra space — and unlike Rabin-Karp there is no worst case to worry about.",
        ],
      },
      {
        heading: "The other uses of the LPS table",
        body: [
          "The table is more useful than the search it was built for, and several problems reduce to it directly.",
          "Shortest repeating unit: if m minus LPS[m-1] divides m evenly, the string is that unit repeated. For 'ABABAB', LPS[5] is 4, and 6 minus 4 is 2, which divides 6, so 'AB' repeated three times. That answers Repeated Substring Pattern in two lines.",
          "Shortest palindrome — prepend the fewest characters to make the whole string a palindrome. Build the LPS of the string, a separator, and the reversed string. The final LPS value is the length of the longest palindromic prefix, so everything after it must be mirrored in front.",
          "Longest common prefix-suffix between two strings, and counting occurrences of every prefix, both fall out of the same table. The general recipe when you see a string self-similarity question is to ask whether the LPS array already encodes it.",
        ],
      },
      {
        heading: "Where it sits among string algorithms",
        body: [
          "KMP is the deterministic choice for single-pattern search: guaranteed O(n + m), no hash collisions, no randomness. It is what you should name when asked to beat the naive search.",
          "Rabin-Karp handles multiple patterns more naturally, since you can hash all of them into a set and check each window once. Its risk is collisions, which make the worst case O(n·m), though with a good modulus that is vanishingly unlikely.",
          "The Z-algorithm computes, for each position, the length of the longest substring starting there that matches a prefix of the string. It solves the same problems as KMP and many people find it easier to reason about, since the array's meaning is more direct.",
          "Aho-Corasick generalises KMP to many patterns simultaneously by building the fallback links over a trie rather than a single string, and is the right answer when you have thousands of patterns to search for at once.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// LPS[i] = length of the longest PROPER prefix of the pattern that is
// also a suffix of pattern[0..i]. Built by running the algorithm on the
// pattern against itself.
vector<int> buildLps(const string& pattern) {
    int m = (int)pattern.size();
    vector<int> lps(m, 0);
    int length = 0;                          // current matched prefix length

    for (int i = 1; i < m; ) {
        if (pattern[i] == pattern[length]) {
            lps[i++] = ++length;             // extend the match
        } else if (length > 0) {
            length = lps[length - 1];        // fall back - do NOT advance i,
                                             // retry this char against a
                                             // shorter candidate prefix
        } else {
            lps[i++] = 0;                    // nothing matches at all
        }
    }
    return lps;
}

// Search. The TEXT pointer never moves backwards, which is what makes
// this O(n) regardless of how many partial matches occur.
vector<int> kmpSearch(const string& text, const string& pattern) {
    if (pattern.empty()) return {};
    vector<int> lps = buildLps(pattern);
    vector<int> matches;
    int matched = 0;                         // pattern chars matched so far

    for (int i = 0; i < (int)text.size(); ) {
        if (text[i] == pattern[matched]) {
            ++i; ++matched;
            if (matched == (int)pattern.size()) {
                matches.push_back(i - matched);
                matched = lps[matched - 1];  // keep going - finds OVERLAPPING
            }                                // occurrences for free
        } else if (matched > 0) {
            matched = lps[matched - 1];      // slide the pattern, not the text
        } else {
            ++i;                             // nothing matched, move on
        }
    }
    return matches;
}

// SHORTEST REPEATING UNIT. If m - lps[m-1] divides m, the string is that
// unit repeated. "ABABAB": lps[5] = 4, 6 - 4 = 2, and 2 divides 6.
int shortestRepeatingUnit(const string& s) {
    int m = (int)s.size();
    vector<int> lps = buildLps(s);
    int candidate = m - lps[m - 1];
    return (m % candidate == 0) ? candidate : m;   // m means "no repetition"
}

bool isRepeatedPattern(const string& s) {
    return shortestRepeatingUnit(s) != (int)s.size();
}

// SHORTEST PALINDROME - prepend as few characters as possible.
// LPS over s + separator + reverse(s) gives the longest palindromic
// PREFIX; everything past it must be mirrored in front.
string shortestPalindrome(const string& s) {
    if (s.empty()) return s;
    string reversed(s.rbegin(), s.rend());
    string combined = s + '\\x01' + reversed;      // separator prevents overlap
    vector<int> lps = buildLps(combined);

    int palindromicPrefix = lps.back();
    return reversed.substr(0, s.size() - palindromicPrefix) + s;
}

// Count occurrences of every prefix of the pattern within itself -
// another direct read of the LPS array.
vector<int> prefixOccurrences(const string& pattern) {
    int m = (int)pattern.size();
    vector<int> lps = buildLps(pattern), count(m + 1, 0);

    for (int i = 0; i < m; ++i) ++count[lps[i]];
    for (int i = m - 1; i > 0; --i) count[lps[i - 1]] += count[i];
    for (int i = 0; i <= m; ++i) ++count[i];       // each prefix matches itself
    return count;
}

// Z-ALGORITHM - z[i] is the length of the longest substring starting at
// i that matches a prefix of s. Solves the same problems as KMP, and
// many find the array's meaning more direct.
vector<int> buildZ(const string& s) {
    int n = (int)s.size();
    vector<int> z(n, 0);
    z[0] = n;
    int l = 0, r = 0;                        // the rightmost matched window

    for (int i = 1; i < n; ++i) {
        if (i < r) z[i] = min(r - i, z[i - l]);    // reuse what we know
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) ++z[i];
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}`,
  },
};
