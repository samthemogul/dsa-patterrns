/**
 * Enrichment batch 9 — Stage 4, part four: LIS, grid DP, tree DP.
 * Completes stage 4.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "dp-lis": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The tails array evolving as patience sorting processes each element, with the caution that tails is not itself the subsequence">
  <text x="0" y="14" class="dg-title">[10, 9, 2, 5, 3, 7, 101, 18] &#8212; tails after each element</text>

  <g transform="translate(0,32)">
    <text x="0" y="18" class="dg-label">10</text>
    <rect x="60" y="0" width="50" height="24" rx="3" class="dg-cell-live"/><text x="85" y="17" text-anchor="middle">10</text>
    <text x="330" y="17" class="dg-note">append &#8212; longest run is now 1</text>

    <text x="0" y="48" class="dg-label">9</text>
    <rect x="60" y="30" width="50" height="24" rx="3" class="dg-cell-mark"/><text x="85" y="47" text-anchor="middle">9</text>
    <text x="330" y="47" class="dg-note">replace 10 &#8212; a smaller ending is strictly better</text>

    <text x="0" y="78" class="dg-label">2</text>
    <rect x="60" y="60" width="50" height="24" rx="3" class="dg-cell-mark"/><text x="85" y="77" text-anchor="middle">2</text>
    <text x="330" y="77" class="dg-note">replace 9</text>

    <text x="0" y="108" class="dg-label">5</text>
    <rect x="60"  y="90" width="50" height="24" rx="3" class="dg-cell-live"/><text x="85"  y="107" text-anchor="middle">2</text>
    <rect x="116" y="90" width="50" height="24" rx="3" class="dg-cell-live"/><text x="141" y="107" text-anchor="middle">5</text>
    <text x="330" y="107" class="dg-note">append &#8212; length 2</text>

    <text x="0" y="138" class="dg-label">3</text>
    <rect x="60"  y="120" width="50" height="24" rx="3" class="dg-cell-live"/><text x="85"  y="137" text-anchor="middle">2</text>
    <rect x="116" y="120" width="50" height="24" rx="3" class="dg-cell-mark"/><text x="141" y="137" text-anchor="middle">3</text>
    <text x="330" y="137" class="dg-note">replace 5 &#8212; same length, better ending</text>

    <text x="0" y="168" class="dg-label">7</text>
    <rect x="60"  y="150" width="50" height="24" rx="3" class="dg-cell-live"/><text x="85"  y="167" text-anchor="middle">2</text>
    <rect x="116" y="150" width="50" height="24" rx="3" class="dg-cell-live"/><text x="141" y="167" text-anchor="middle">3</text>
    <rect x="172" y="150" width="50" height="24" rx="3" class="dg-cell-live"/><text x="197" y="167" text-anchor="middle">7</text>
    <text x="330" y="167" class="dg-note">append &#8212; length 3</text>

    <text x="0" y="198" class="dg-label">101</text>
    <rect x="60"  y="180" width="50" height="24" rx="3" class="dg-cell-live"/><text x="85"  y="197" text-anchor="middle">2</text>
    <rect x="116" y="180" width="50" height="24" rx="3" class="dg-cell-live"/><text x="141" y="197" text-anchor="middle">3</text>
    <rect x="172" y="180" width="50" height="24" rx="3" class="dg-cell-live"/><text x="197" y="197" text-anchor="middle">7</text>
    <rect x="228" y="180" width="50" height="24" rx="3" class="dg-cell-live"/><text x="253" y="197" text-anchor="middle">101</text>
    <text x="330" y="197" class="dg-note">append &#8212; length 4</text>

    <text x="0" y="228" class="dg-label">18</text>
    <rect x="60"  y="210" width="50" height="24" rx="3" class="dg-cell-hit"/><text x="85"  y="227" text-anchor="middle">2</text>
    <rect x="116" y="210" width="50" height="24" rx="3" class="dg-cell-hit"/><text x="141" y="227" text-anchor="middle">3</text>
    <rect x="172" y="210" width="50" height="24" rx="3" class="dg-cell-hit"/><text x="197" y="227" text-anchor="middle">7</text>
    <rect x="228" y="210" width="50" height="24" rx="3" class="dg-cell-mark"/><text x="253" y="227" text-anchor="middle">18</text>
    <text x="330" y="227" class="dg-good">replace 101 &#8212; final length 4</text>
  </g>

  <line x1="0" y1="282" x2="700" y2="282" class="dg-guide"/>
  <text x="0" y="304" class="dg-note">tails[k] = the smallest value that can END an increasing run of length k+1.</text>
  <text x="0" y="322" class="dg-note">Its LENGTH is the answer &#8212; but [2, 3, 7, 18] is not necessarily a real subsequence of the input.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Start with the obvious quadratic version",
        body: [
          "Find the longest strictly increasing subsequence of an array. The direct DP defines dp[i] as the length of the best increasing subsequence ending at index i. To compute it, scan every earlier index j and, wherever nums[j] is smaller than nums[i], consider extending: dp[i] is one plus the best such dp[j], or 1 if nothing smaller precedes it.",
          "That is O(n²), and it is worth writing first because it is obviously correct and easy to explain. It also generalises to variants that the fast version cannot handle — weighted versions, or where the comparison is something more elaborate than less-than.",
          "One detail: the answer is the maximum over the whole dp array, not dp[n-1]. The best subsequence need not end at the last element, and returning dp[n-1] is a common slip.",
        ],
      },
      {
        heading: "The tails array",
        body: [
          "The O(n log n) method maintains an array called tails, where tails[k] holds the smallest value that can end an increasing subsequence of length k+1. Its length at any moment is the length of the longest increasing subsequence found so far.",
          "Why the smallest ending value? Because a smaller ending is never worse. If two increasing subsequences both have length 4, but one ends in 7 and the other in 101, the one ending in 7 can be extended by anything the other can, and more besides. There is no reason to remember the larger option.",
          "Processing an element x: binary search tails for the first entry at or above x. If there is none, x is larger than everything, so it extends the longest run — append it. If there is one, x is a better ending for a run of that length — overwrite it. Each element costs one binary search, giving O(n log n).",
        ],
      },
      {
        heading: "The thing tails is not",
        body: [
          "The array's length is the correct answer, but its contents are not necessarily a subsequence of the input. This trips people up because the final tails array usually looks plausible.",
          "In the worked example the final tails is [2, 3, 7, 18], and that does happen to be a valid increasing subsequence — but only by luck. Consider [1, 5, 2]: tails ends as [1, 2], and while 1 and 2 are both present in that order, the value 2 replaced 5 at a position representing a length-2 run that actually ended at 5. Entries can come from different eras of the scan and never coexisted in one real subsequence.",
          "So if the problem asks for the subsequence itself rather than its length, you need parent pointers: alongside tails, record the input index that each tails slot currently corresponds to, and for each element remember which index preceded it. Walk those parents back from the last appended index.",
        ],
        aside:
          "If you only need the length, return len(tails). If you need the actual elements, you must keep a parent array — reading tails directly gives a sequence that may never have existed.",
      },
      {
        heading: "Strict versus non-decreasing",
        body: [
          "The difference between 'strictly increasing' and 'non-decreasing' is one character in the binary search, and problems care.",
          "A lower bound — the first entry greater than or equal to x — makes the run strictly increasing, because an equal value replaces rather than extends. An upper bound — the first entry strictly greater than x — allows equal values to extend, giving non-decreasing.",
          "Read the problem statement for which it wants and set the bound deliberately. This is one of those bugs that passes most test cases, because arrays with no repeated values behave identically under both.",
        ],
        trace: `[3, 3, 3]

  LOWER bound (strictly increasing)
    3: append          tails = [3]
    3: found at 0 → replace   tails = [3]
    3: found at 0 → replace   tails = [3]
    answer 1  ✓

  UPPER bound (non-decreasing)
    3: append          tails = [3]
    3: none ≥⁺ 3 → append     tails = [3, 3]
    3: append                 tails = [3, 3, 3]
    answer 3  ✓

Same code, one comparison flipped.`,
      },
      {
        heading: "The disguises",
        body: [
          "Russian Doll Envelopes. Envelopes nest if both width and height are strictly larger. Sort by width, then run LIS on the heights — but sort heights descending within equal widths. Without that, two envelopes of the same width would chain into each other, which they cannot, since nesting requires both dimensions to grow.",
          "Longest String Chain. A word is a predecessor of another if inserting one character makes it. Sort by length and run a DP where the transition tests predecessorship rather than a numeric comparison. The quadratic form is the natural fit here.",
          "Minimum operations to make an array sorted, where the only operation is removing an element: n minus the LIS length, since the LIS is the largest set you can keep.",
          "Maximum Length of Pair Chain and Best Team With No Conflicts are both sort-then-LIS with a problem-specific ordering key. The transferable insight is that LIS is what you get after sorting on one dimension when the other still needs to increase.",
        ],
      },
      {
        heading: "Cost, and what the two versions are for",
        body: [
          "The quadratic version is O(n²) time and O(n) space. The patience version is O(n log n) and O(n). For n up to a few thousand the quadratic one is fine and easier to modify; past about 10⁵ the fast one is required.",
          "In an interview, saying 'the straightforward DP is O(n²), and there is an O(n log n) version using binary search over an array of best endings' is usually what is being fished for. Being able to explain why a smaller ending value is always preferable is what shows you understand it rather than having memorised the loop.",
          "There is also a Fenwick-tree formulation: coordinate-compress the values, then dp[i] is one plus the maximum dp over all smaller values, which a Fenwick tree answers in O(log n). Same complexity as patience sorting, but it generalises to weighted LIS where you maximise a sum rather than a count — which patience sorting cannot do.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// O(n^2) - obviously correct, easy to adapt. Write this one first.
// The answer is the MAX over dp, not dp.back().
int lisQuadratic(const vector<int>& nums) {
    if (nums.empty()) return 0;
    vector<int> dp(nums.size(), 1);
    for (size_t i = 0; i < nums.size(); ++i)
        for (size_t j = 0; j < i; ++j)
            if (nums[j] < nums[i]) dp[i] = max(dp[i], dp[j] + 1);
    return *max_element(dp.begin(), dp.end());
}

// O(n log n) - patience sorting.
// tails[k] = the SMALLEST value that can end a run of length k+1.
// A smaller ending is never worse: it can be extended by everything a
// larger one can, and more.
int lis(const vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);  // first >= x
        if (it == tails.end()) tails.push_back(x);   // x extends the longest
        else *it = x;                                // x is a better ending
    }
    return (int)tails.size();
}

// Non-decreasing: upper_bound instead, so equal values EXTEND rather
// than replace. One character apart, and problems care which.
int longestNonDecreasing(const vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = upper_bound(tails.begin(), tails.end(), x);  // first > x
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return (int)tails.size();
}

// The actual subsequence. tails alone is NOT a valid subsequence - its
// entries can come from different points in the scan and may never have
// coexisted. Parent pointers are required.
vector<int> lisSequence(const vector<int>& nums) {
    if (nums.empty()) return {};
    vector<int> tails, tailIndex, parent(nums.size(), -1);

    for (int i = 0; i < (int)nums.size(); ++i) {
        auto it = lower_bound(tails.begin(), tails.end(), nums[i]);
        int k = (int)(it - tails.begin());
        if (k > 0) parent[i] = tailIndex[k - 1];     // who precedes me
        if (it == tails.end()) { tails.push_back(nums[i]); tailIndex.push_back(i); }
        else { *it = nums[i]; tailIndex[k] = i; }
    }

    vector<int> out;
    for (int at = tailIndex.back(); at != -1; at = parent[at])
        out.push_back(nums[at]);
    reverse(out.begin(), out.end());
    return out;
}

// RUSSIAN DOLL ENVELOPES. Sort by width ascending, but height DESCENDING
// within equal widths - otherwise two same-width envelopes would chain
// into each other, which nesting forbids.
int maxEnvelopes(vector<pair<int,int>> envelopes) {
    sort(envelopes.begin(), envelopes.end(), [](auto& a, auto& b) {
        return a.first == b.first ? a.second > b.second   // <-- descending
                                  : a.first < b.first;
    });
    vector<int> heights;
    for (auto [w, h] : envelopes) heights.push_back(h);
    return lis(heights);
}

// Fenwick formulation - same O(n log n), but it generalises to WEIGHTED
// LIS (maximise a sum, not a count), which patience sorting cannot do.
struct MaxFenwick {
    vector<int> tree;
    explicit MaxFenwick(int n) : tree(n + 1, 0) {}

    void update(int i, int value) {                  // 1-indexed
        for (; i < (int)tree.size(); i += i & -i) tree[i] = max(tree[i], value);
    }
    int queryPrefix(int i) const {                   // max over [1, i]
        int best = 0;
        for (; i > 0; i -= i & -i) best = max(best, tree[i]);
        return best;
    }
};

int lisFenwick(const vector<int>& nums) {
    vector<int> sorted(nums);
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());

    MaxFenwick fen((int)sorted.size());
    int best = 0;
    for (int x : nums) {
        int rank = (int)(lower_bound(sorted.begin(), sorted.end(), x)
                         - sorted.begin()) + 1;
        int length = fen.queryPrefix(rank - 1) + 1;  // best among smaller
        fen.update(rank, length);
        best = max(best, length);
    }
    return best;
}`,
  },

  "dp-grid-paths": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A grid where each cell is the sum of the cell above and the cell to the left, with an obstacle zeroing one cell">
  <text x="0" y="14" class="dg-title">Unique paths &#8212; each cell = above + left</text>

  <g transform="translate(30,34)">
    <rect x="0"   y="0" width="52" height="34" rx="3" class="dg-cell-mark"/><text x="26"  y="22" text-anchor="middle">1</text>
    <rect x="58"  y="0" width="52" height="34" rx="3" class="dg-cell"/><text x="84"  y="22" text-anchor="middle">1</text>
    <rect x="116" y="0" width="52" height="34" rx="3" class="dg-cell"/><text x="142" y="22" text-anchor="middle">1</text>
    <rect x="174" y="0" width="52" height="34" rx="3" class="dg-cell"/><text x="200" y="22" text-anchor="middle">1</text>

    <rect x="0"   y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="26"  y="62" text-anchor="middle">1</text>
    <rect x="58"  y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="84"  y="62" text-anchor="middle">2</text>
    <rect x="116" y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="142" y="62" text-anchor="middle">3</text>
    <rect x="174" y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="200" y="62" text-anchor="middle">4</text>

    <rect x="0"   y="80" width="52" height="34" rx="3" class="dg-cell"/><text x="26"  y="102" text-anchor="middle">1</text>
    <rect x="58"  y="80" width="52" height="34" rx="3" class="dg-cell"/><text x="84"  y="102" text-anchor="middle">3</text>
    <rect x="116" y="80" width="52" height="34" rx="3" class="dg-cell"/><text x="142" y="102" text-anchor="middle">6</text>
    <rect x="174" y="80" width="52" height="34" rx="3" class="dg-cell-hit"/><text x="200" y="102" text-anchor="middle">10</text>

    <text x="0" y="140" class="dg-label">no obstacles &#8594; 10 routes</text>
  </g>

  <g transform="translate(330,34)">
    <rect x="0"   y="0" width="52" height="34" rx="3" class="dg-cell-mark"/><text x="26"  y="22" text-anchor="middle">1</text>
    <rect x="58"  y="0" width="52" height="34" rx="3" class="dg-cell"/><text x="84"  y="22" text-anchor="middle">1</text>
    <rect x="116" y="0" width="52" height="34" rx="3" class="dg-cell"/><text x="142" y="22" text-anchor="middle">1</text>
    <rect x="174" y="0" width="52" height="34" rx="3" class="dg-cell"/><text x="200" y="22" text-anchor="middle">1</text>

    <rect x="0"   y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="26"  y="62" text-anchor="middle">1</text>
    <rect x="58"  y="40" width="52" height="34" rx="3" class="dg-cell-out"/><text x="84"  y="62" text-anchor="middle">0</text>
    <rect x="116" y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="142" y="62" text-anchor="middle">1</text>
    <rect x="174" y="40" width="52" height="34" rx="3" class="dg-cell"/><text x="200" y="62" text-anchor="middle">2</text>

    <rect x="0"   y="80" width="52" height="34" rx="3" class="dg-cell"/><text x="26"  y="102" text-anchor="middle">1</text>
    <rect x="58"  y="80" width="52" height="34" rx="3" class="dg-cell"/><text x="84"  y="102" text-anchor="middle">1</text>
    <rect x="116" y="80" width="52" height="34" rx="3" class="dg-cell"/><text x="142" y="102" text-anchor="middle">2</text>
    <rect x="174" y="80" width="52" height="34" rx="3" class="dg-cell-hit"/><text x="200" y="102" text-anchor="middle">4</text>

    <text x="0" y="140" class="dg-label">one blocked cell &#8594; 4 routes</text>
    <text x="0" y="158" class="dg-bad">a blocked cell contributes zero paths</text>
  </g>

  <line x1="0" y1="212" x2="700" y2="212" class="dg-guide"/>
  <text x="0" y="234" class="dg-note">Right-and-down movement means every dependency is already computed when you sweep row by row &#8212;</text>
  <text x="0" y="252" class="dg-note">which is exactly what lets a single rolling row replace the whole grid.</text>
  <text x="0" y="278" class="dg-note">Allow movement in all four directions and this stops being a fill: it becomes BFS or Dijkstra.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Why right-and-down is the easy case",
        body: [
          "Grid DP covers any problem where you move through a 2D board and a cell's answer depends on the cells you could have arrived from. When movement is restricted to right and down, the structure is especially clean: dp[i][j] depends only on dp[i-1][j] and dp[i][j-1], both of which lie above or to the left.",
          "That means a straightforward row-by-row sweep computes every dependency before it is needed. No topological reasoning required, no visited set, no queue. The whole algorithm is two nested loops.",
          "It also means a single rolling row suffices. As you sweep left to right, the array position you are about to write holds the value from the row above, and the position to its left holds the value you just computed for this row — exactly the two predecessors. One array of width m replaces the entire grid.",
        ],
      },
      {
        heading: "One shape, three operations",
        body: [
          "The transition changes with the question but the structure does not. Counting routes sums the two predecessors. Finding the cheapest path takes their minimum and adds the current cell's cost. Finding the most valuable takes their maximum.",
          "Obstacles slot in by forcing a value: for counting, a blocked cell contributes zero paths, so set it to 0 and it propagates correctly with no special case elsewhere. For minimisation, set it to infinity so nothing routes through it.",
          "This is worth internalising because it makes a whole family of problems feel like one problem. If you can identify the predecessors and the combining operation, the code writes itself.",
        ],
        trace: `Same grid, three questions

  count routes:   dp[i][j] = dp[i-1][j] + dp[i][j-1]
  cheapest path:  dp[i][j] = cost[i][j]
                           + min(dp[i-1][j], dp[i][j-1])
  best path:      dp[i][j] = value[i][j]
                           + max(dp[i-1][j], dp[i][j-1])

  obstacle:  counting     → 0
             minimisation → ∞`,
      },
      {
        heading: "The edges",
        body: [
          "The first row and first column each have only one predecessor, and treating them like interior cells reads out of bounds. Two ways to handle it, and both are fine as long as you pick one deliberately.",
          "Seed them explicitly before the main loops: in the counting case every cell in the first row has exactly one route, so fill it with ones. In the minimisation case each is the running total along that edge.",
          "Or pad the grid with an extra row and column, as with prefix sums and LCS, so the boundary cells read from padding rather than falling off. For counting you seed a single 1 in the padding to represent the empty path; for minimisation you fill the padding with infinity except one entry.",
          "The obstacle case has one extra trap: if the starting cell itself is blocked, the answer is zero immediately, and the loop must not proceed to seed it as 1.",
        ],
        aside:
          "Counting problems on large grids overflow 32-bit integers quickly — a 20 by 20 grid has over 68 billion routes. Use 64-bit, or the modulus the problem specifies.",
      },
      {
        heading: "Maximal square — the min over three",
        body: [
          "Largest square of ones inside a binary matrix looks like a different problem and is the same grid with a different combine. Define dp[i][j] as the side length of the largest square whose bottom-right corner is this cell.",
          "If the cell is a zero, no square ends here, so dp is 0. If it is a one, the square can extend only as far as all three of its supporting neighbours allow: the cell above, the cell to the left, and the diagonal. So dp[i][j] is one plus the minimum of those three.",
          "The minimum is the point, and it is worth pausing on. Taking a maximum or a sum would let the square claim area that is not actually filled — the smallest neighbour is the binding constraint, because a square of side k needs all three neighbouring squares of side k-1 to be present. The answer is the largest dp value anywhere, squared, not the corner cell.",
        ],
        trace: `matrix           dp (side lengths)

  1 1 0            1 1 0
  1 1 1     →      1 2 1
  1 1 1            1 2 2

  dp[2][2] = 1 + min(dp[1][2]=1,
                     dp[2][1]=2,
                     dp[1][1]=2)  =  2

  The 1 above caps it. Largest square
  has side 2, area 4.`,
      },
      {
        heading: "When it stops being a fill",
        body: [
          "The rolling-row trick and the simple sweep both rely on every dependency being already computed. Loosen the movement rule and that guarantee disappears.",
          "If movement is allowed in all four directions and cells may be revisited, there is no order in which to fill the grid — the dependencies are cyclic. That is a shortest-path problem: BFS if every step costs the same, Dijkstra if steps have different costs. Recognising this boundary saves you from trying to force a DP onto a problem that is not one.",
          "Some problems sit between. Minimum Falling Path allows three downward neighbours instead of two, which is still a clean top-to-bottom fill. Dungeon Game requires filling from the bottom-right backwards, because the constraint is about surviving the rest of the journey rather than what you have accumulated so far — a good reminder that the sweep direction follows the dependency direction, not the direction of travel.",
        ],
      },
      {
        heading: "Adding dimensions",
        body: [
          "Some grid problems need more state than a position. Cherry Pickup II moves two robots across the grid simultaneously, so the state is the row plus both column positions — a 3D table, filled row by row.",
          "The general rule holds: the state must capture everything that affects the future. If two agents move together, both positions are needed. If you may remove one obstacle along the way, the state gains a boolean for whether that removal has been used.",
          "Complexity follows directly from the state space times the transitions per state. Cherry Pickup II has rows × cols × cols states with nine transitions each — three column moves for each robot — giving O(rows × cols² × 9). Writing the state down before coding is what keeps these tractable, exactly as in the DP fundamentals topic.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Count routes with right/down movement. One rolling row is enough:
// dp[c] still holds the row above, dp[c-1] holds this row's left neighbour.
long long uniquePaths(int rows, int cols) {
    vector<long long> dp(cols, 1);                 // first row: one way each
    for (int r = 1; r < rows; ++r)
        for (int c = 1; c < cols; ++c)
            dp[c] += dp[c - 1];                    // above + left
    return dp[cols - 1];
}

// With obstacles: a blocked cell contributes zero paths, which then
// propagates correctly with no other special case.
long long uniquePathsWithObstacles(const vector<vector<int>>& grid) {
    if (grid.empty() || grid[0][0] == 1) return 0; // blocked start
    int cols = (int)grid[0].size();
    vector<long long> dp(cols, 0);
    dp[0] = 1;

    for (const auto& row : grid)
        for (int c = 0; c < cols; ++c) {
            if (row[c] == 1) dp[c] = 0;            // no route through here
            else if (c > 0) dp[c] += dp[c - 1];
        }
    return dp[cols - 1];
}

// Minimum path sum - same shape, min instead of sum. The first column
// has a single predecessor, so it is advanced separately.
int minPathSum(const vector<vector<int>>& grid) {
    int rows = (int)grid.size(), cols = (int)grid[0].size();
    vector<int> dp(cols, INT_MAX);
    dp[0] = 0;

    for (int r = 0; r < rows; ++r) {
        dp[0] += grid[r][0];                       // one predecessor only
        for (int c = 1; c < cols; ++c)
            dp[c] = grid[r][c] + min(dp[c], dp[c - 1]);
    }
    return dp[cols - 1];
}

// MAXIMAL SQUARE - min over THREE neighbours. A square of side k needs
// all three supporting squares of side k-1, so the smallest binds.
// The answer is the largest value anywhere, not the corner.
int maximalSquare(const vector<vector<char>>& matrix) {
    if (matrix.empty()) return 0;
    int rows = (int)matrix.size(), cols = (int)matrix[0].size(), best = 0;
    vector<vector<int>> dp(rows + 1, vector<int>(cols + 1, 0));

    for (int r = 1; r <= rows; ++r)
        for (int c = 1; c <= cols; ++c)
            if (matrix[r - 1][c - 1] == '1') {
                dp[r][c] = 1 + min({dp[r-1][c], dp[r][c-1], dp[r-1][c-1]});
                best = max(best, dp[r][c]);
            }
    return best * best;
}

// TRIANGLE - three-neighbour variant, filled bottom-up so every cell
// reads two already-final values below it.
int minimumTotal(vector<vector<int>> triangle) {
    for (int r = (int)triangle.size() - 2; r >= 0; --r)
        for (size_t c = 0; c < triangle[r].size(); ++c)
            triangle[r][c] += min(triangle[r + 1][c], triangle[r + 1][c + 1]);
    return triangle[0][0];
}

// DUNGEON GAME - fill BACKWARDS from the exit. The constraint is about
// surviving what remains, not what has accumulated, so the dependency
// direction is the reverse of the direction of travel.
int calculateMinimumHP(const vector<vector<int>>& dungeon) {
    int rows = (int)dungeon.size(), cols = (int)dungeon[0].size();
    vector<vector<int>> need(rows + 1, vector<int>(cols + 1, INT_MAX));
    need[rows][cols - 1] = need[rows - 1][cols] = 1;   // 1 HP past the exit

    for (int r = rows - 1; r >= 0; --r)
        for (int c = cols - 1; c >= 0; --c) {
            int required = min(need[r + 1][c], need[r][c + 1]) - dungeon[r][c];
            need[r][c] = max(1, required);         // never drop below 1 HP
        }
    return need[0][0];
}`,
  },

  "dp-trees": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Tree DP where each node returns one value to its parent but records a different value as the global answer">
  <text x="0" y="14" class="dg-title">Diameter &#8212; the value RETURNED differs from the value RECORDED</text>

  <g transform="translate(40,34)">
    <line x1="150" y1="42" x2="80"  y2="82"  class="dg-link-hi"/>
    <line x1="150" y1="42" x2="220" y2="82"  class="dg-link-hi"/>
    <line x1="220" y1="122" x2="180" y2="162" class="dg-link"/>
    <line x1="220" y1="122" x2="270" y2="162" class="dg-link"/>
    <line x1="270" y1="202" x2="270" y2="242" class="dg-link"/>

    <circle cx="150" cy="22"  r="20" class="dg-cell-mark"/><text x="150" y="27" text-anchor="middle">A</text>
    <circle cx="80"  cy="102" r="20" class="dg-cell"/><text x="80"  y="107" text-anchor="middle">B</text>
    <circle cx="220" cy="102" r="20" class="dg-cell"/><text x="220" y="107" text-anchor="middle">C</text>
    <circle cx="180" cy="182" r="20" class="dg-cell"/><text x="180" y="187" text-anchor="middle">D</text>
    <circle cx="270" cy="182" r="20" class="dg-cell"/><text x="270" y="187" text-anchor="middle">E</text>
    <circle cx="270" cy="262" r="20" class="dg-cell"/><text x="270" y="267" text-anchor="middle">F</text>

    <text x="46"  y="140" class="dg-label">h = 1</text>
    <text x="248" y="140" class="dg-label">h = 3</text>
    <text x="300" y="262" class="dg-label">h = 1</text>
  </g>

  <g transform="translate(370,54)">
    <rect x="0" y="0" width="320" height="180" rx="4" class="dg-cell-idle"/>
    <text x="14" y="28" class="dg-note">At node A:</text>
    <text x="14" y="56" class="dg-good">RECORD  height(B) + height(C)</text>
    <text x="14" y="76" class="dg-label">&#160;&#160;&#160;&#160;= 1 + 3 = 4&#160;&#160;&#8212; a path bending here</text>
    <text x="14" y="106" class="dg-ptr">RETURN  1 + max(height(B), height(C))</text>
    <text x="14" y="126" class="dg-label">&#160;&#160;&#160;&#160;= 1 + 3 = 4&#160;&#160;&#8212; what a parent can extend</text>
    <text x="14" y="160" class="dg-note">A bent path cannot continue upward, so it</text>
    <text x="14" y="176" class="dg-note">must never be the returned value.</text>
  </g>

  <line x1="0" y1="282" x2="700" y2="282" class="dg-guide"/>
  <text x="0" y="306" class="dg-note">Post-order: solve both children first, then combine. No memo table &#8212; a tree never revisits a node.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Why trees need no memo table",
        body: [
          "Tree DP is dynamic programming where the subproblems are subtrees. Because a tree has no cycles, every node has exactly one path from the root, so a single post-order traversal visits each node once and computes its answer once.",
          "That is the difference from array or grid DP, where the same subproblem is reached from several directions and caching is what saves you. Here there is nothing to cache — the recursion itself already visits each node exactly once. If you find yourself adding a memo to a tree DP, either the structure is not actually a tree, or the state includes something beyond the node itself.",
          "The shape is always the same: recurse into the children, then combine their returned values into this node's answer. Post-order, because a node cannot be computed until its children are done.",
        ],
      },
      {
        heading: "Return one thing, record another",
        body: [
          "This is the idea that makes tree DP click, and it is where most attempts go wrong. Many problems need two different quantities: what you hand up to your parent, and what you contribute to the global answer. They are usually not the same value.",
          "Tree diameter is the clearest case. The longest path through a node uses both of its branches — left height plus right height. But a path that bends at this node cannot continue upward past it, because it has already used both directions. So a parent cannot extend it, and it must never be the returned value.",
          "What the parent can use is a single downward branch: one plus the taller of the two children. So the node returns that, while separately recording left plus right as a candidate for the global maximum. Two lines, two different expressions, and confusing them gives an answer that looks nearly right on symmetric trees and wrong on skewed ones.",
        ],
        aside:
          "If your diameter or max-path-sum solution is wrong, check whether you are returning the same expression you recorded. Returning the bent path is the bug in the large majority of cases.",
      },
      {
        heading: "Maximum path sum, and clamping negatives",
        body: [
          "Binary Tree Maximum Path Sum is the same split with one addition. The path may start and end anywhere, and values may be negative.",
          "The record is the node's value plus both children's contributions. The return is the node's value plus the better single child. So far, identical in shape to diameter.",
          "The addition is that a child's contribution should be clamped at zero. If a subtree's best downward sum is negative, including it makes things worse, so you take zero instead — meaning you simply do not extend into that branch. Forgetting the clamp means a large positive node gets dragged down by a negative subtree it was never obliged to use.",
          "The result must still be seeded to negative infinity rather than zero, because a tree of entirely negative values has a genuine answer: its least-negative single node. Seeding at zero returns 0, which corresponds to an empty path and is not allowed.",
        ],
        trace: `node value 10, children returning −4 and 6

  WITHOUT clamping
    record = 10 + (−4) + 6 = 12
    return = 10 + max(−4, 6) = 16

  WITH clamping to 0
    left  = max(−4, 0) = 0     ← skip that branch
    right = max( 6, 0) = 6
    record = 10 + 0 + 6 = 16   ← better
    return = 10 + max(0, 6) = 16

  The negative branch was optional all along.`,
      },
      {
        heading: "Returning a pair — the include/exclude pattern",
        body: [
          "Some problems need two answers per node rather than one, and returning a pair is the clean way to express it.",
          "House Robber III is the archetype: you may not rob a node and its child. So each node returns two numbers — the best total if this node is robbed, and the best if it is not. Robbing this node forces both children to be skipped, so it is the node's value plus each child's skipped value. Skipping this node leaves the children free, so it is the better of each child's two options, summed.",
          "The overall answer is the maximum of the root's pair. This include/exclude shape recurs widely — Binary Tree Cameras returns three states per node rather than two, and minimum vertex cover on a tree returns two. When a node's choice constrains its children, a tuple return is almost always the right structure.",
        ],
      },
      {
        heading: "Rerooting, when every node needs to be the root",
        body: [
          "A harder class asks for an answer computed as if each node in turn were the root — 'for every node, what is the sum of distances to all others'. Running the whole DP from each node is O(n²), which is too slow for large trees.",
          "The rerooting technique does it in two passes. First a normal post-order pass computing, for each node, the answer restricted to its own subtree. Then a pre-order pass pushing information downward: a child's full answer combines what it already knows about its subtree with what the parent knows about everything else.",
          "For sum-of-distances, moving the root from a parent to a child brings every node in the child's subtree one step closer and every other node one step further, so the child's answer is the parent's answer plus the count outside minus the count inside. One subtraction per edge, O(n) overall.",
          "It is worth recognising the signal — 'for each node' rather than 'for the tree' — even if you do not implement it from memory. Naming the technique in an interview is often enough.",
        ],
      },
      {
        heading: "Practical cautions",
        body: [
          "Recursion depth. A skewed tree of 10⁵ nodes is a 10⁵-deep recursion, which overflows in Python and in most JavaScript engines. Convert to an explicit post-order stack, or raise the limit if the environment allows.",
          "General graphs disguised as trees. When the input is an undirected edge list rather than a node structure, DFS will walk straight back along the edge it arrived on. Pass the parent down and skip it — the same guard as undirected cycle detection.",
          "Choosing a root. For a rooted binary tree the root is given. For an undirected tree any node works, and node 0 is the usual choice; the answers to symmetric questions like diameter do not depend on which you pick.",
          "One alternative worth knowing for diameter specifically: run BFS from any node to find the farthest node, then BFS again from that one. The second BFS's greatest distance is the diameter. It is two linear passes and no DP at all, and it is a good answer to give alongside the recursive one.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    explicit TreeNode(int v) : val(v) {}
};

// DIAMETER. The split between RETURNED and RECORDED is the whole idea.
int diameter(TreeNode* root) {
    int best = 0;

    function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int left  = height(node->left);            // children first
        int right = height(node->right);

        best = max(best, left + right);            // RECORD: bends here,
                                                   // so it can't go upward
        return 1 + max(left, right);               // RETURN: a single branch,
    };                                             // which a parent CAN extend

    height(root);
    return best;
}

// MAXIMUM PATH SUM. Same split, plus clamping: a negative branch is
// optional, so treat it as 0 rather than subtracting from the total.
int maxPathSum(TreeNode* root) {
    int best = INT_MIN;                            // NOT 0 - an all-negative
                                                   // tree has a real answer
    function<int(TreeNode*)> gain = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int left  = max(gain(node->left),  0);     // skip if it hurts
        int right = max(gain(node->right), 0);

        best = max(best, node->val + left + right);   // RECORD
        return node->val + max(left, right);          // RETURN
    };

    gain(root);
    return best;
}

// RETURNING A PAIR. Robbing a node forbids robbing its children, so each
// node reports both outcomes and the parent picks.
int rob(TreeNode* root) {
    function<pair<int,int>(TreeNode*)> solve =
        [&](TreeNode* node) -> pair<int,int> {     // {robbed, skipped}
            if (!node) return {0, 0};
            auto [lRob, lSkip] = solve(node->left);
            auto [rRob, rSkip] = solve(node->right);

            int robbed  = node->val + lSkip + rSkip;   // children must skip
            int skipped = max(lRob, lSkip) + max(rRob, rSkip);  // free choice
            return {robbed, skipped};
        };

    auto [robbed, skipped] = solve(root);
    return max(robbed, skipped);
}

// ON A GENERAL TREE (undirected edge list). Carry the parent, or DFS
// walks straight back along the edge it arrived on.
int treeDiameterGeneral(int n, const vector<vector<int>>& adj) {
    int best = 0;

    function<int(int,int)> depth = [&](int node, int parent) -> int {
        int top1 = 0, top2 = 0;                    // two deepest branches
        for (int next : adj[node]) {
            if (next == parent) continue;          // <-- the guard
            int d = depth(next, node);
            if (d > top1) { top2 = top1; top1 = d; }
            else if (d > top2) { top2 = d; }
        }
        best = max(best, top1 + top2);             // RECORD
        return 1 + top1;                           // RETURN
    };

    depth(0, -1);
    return best;
}

// REROOTING - "for EACH node" rather than "for the tree".
// Pass 1 (post-order): each subtree's own count and distance sum.
// Pass 2 (pre-order): move the root one edge and adjust in O(1).
vector<long long> sumOfDistances(int n, const vector<vector<int>>& adj) {
    vector<long long> count(n, 1), answer(n, 0);

    function<void(int,int)> down = [&](int node, int parent) {
        for (int next : adj[node]) {
            if (next == parent) continue;
            down(next, node);
            count[node]  += count[next];
            answer[node] += answer[next] + count[next];
        }
    };

    function<void(int,int)> up = [&](int node, int parent) {
        for (int next : adj[node]) {
            if (next == parent) continue;
            // Moving the root from node to next: everything inside
            // next's subtree gets one closer, everything else one further.
            answer[next] = answer[node] - count[next] + (n - count[next]);
            up(next, node);
        }
    };

    down(0, -1);
    up(0, -1);
    return answer;
}

// Diameter without any DP: BFS to the farthest node, then BFS again
// from there. Two linear passes, and worth offering as an alternative.
int diameterByBfs(int n, const vector<vector<int>>& adj) {
    auto farthest = [&](int start) {
        vector<int> dist(n, -1);
        queue<int> q;
        dist[start] = 0;
        q.push(start);
        int best = start;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            if (dist[node] > dist[best]) best = node;
            for (int next : adj[node])
                if (dist[next] == -1) { dist[next] = dist[node] + 1; q.push(next); }
        }
        return pair<int,int>{best, dist[best]};
    };

    auto [end1, _] = farthest(0);
    auto [end2, length] = farthest(end1);
    return length;
}`,
  },
};
