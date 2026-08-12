/**
 * Enrichment batch 8 — Stage 4, part three: divide and conquer,
 * unbounded knapsack, edit distance.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "foundations-divide-conquer": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Merge sort splitting an array to single elements and merging back, with the per-level cost shown">
  <text x="0" y="14" class="dg-title">log n levels &#215; O(n) work per level = O(n log n)</text>

  <g transform="translate(0,32)">
    <rect x="230" y="0" width="240" height="24" rx="3" class="dg-cell-mark"/>
    <text x="350" y="17" text-anchor="middle" class="dg-note">8&#160;&#160;3&#160;&#160;5&#160;&#160;1&#160;&#160;9&#160;&#160;2&#160;&#160;7&#160;&#160;4</text>
    <text x="500" y="17" class="dg-label">n items</text>

    <rect x="170" y="42" width="120" height="24" rx="3" class="dg-cell-live"/>
    <text x="230" y="59" text-anchor="middle" class="dg-note">8&#160;&#160;3&#160;&#160;5&#160;&#160;1</text>
    <rect x="410" y="42" width="120" height="24" rx="3" class="dg-cell-live"/>
    <text x="470" y="59" text-anchor="middle" class="dg-note">9&#160;&#160;2&#160;&#160;7&#160;&#160;4</text>
    <text x="560" y="59" class="dg-label">2 &#215; n/2</text>

    <rect x="150" y="84" width="60" height="24" rx="3" class="dg-cell"/><text x="180" y="101" text-anchor="middle" class="dg-note">8&#160;&#160;3</text>
    <rect x="220" y="84" width="60" height="24" rx="3" class="dg-cell"/><text x="250" y="101" text-anchor="middle" class="dg-note">5&#160;&#160;1</text>
    <rect x="390" y="84" width="60" height="24" rx="3" class="dg-cell"/><text x="420" y="101" text-anchor="middle" class="dg-note">9&#160;&#160;2</text>
    <rect x="460" y="84" width="60" height="24" rx="3" class="dg-cell"/><text x="490" y="101" text-anchor="middle" class="dg-note">7&#160;&#160;4</text>
    <text x="560" y="101" class="dg-label">4 &#215; n/4</text>

    <rect x="150" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="163" y="143" text-anchor="middle" class="dg-index">8</text>
    <rect x="182" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="195" y="143" text-anchor="middle" class="dg-index">3</text>
    <rect x="220" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="233" y="143" text-anchor="middle" class="dg-index">5</text>
    <rect x="252" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="265" y="143" text-anchor="middle" class="dg-index">1</text>
    <rect x="390" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="403" y="143" text-anchor="middle" class="dg-index">9</text>
    <rect x="422" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="435" y="143" text-anchor="middle" class="dg-index">2</text>
    <rect x="460" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="473" y="143" text-anchor="middle" class="dg-index">7</text>
    <rect x="492" y="126" width="26" height="24" rx="3" class="dg-cell-idle"/><text x="505" y="143" text-anchor="middle" class="dg-index">4</text>
    <text x="560" y="143" class="dg-label">n &#215; 1</text>

    <text x="0" y="59"  class="dg-label">divide</text>
    <text x="0" y="180" class="dg-label">merge</text>

    <rect x="150" y="168" width="128" height="24" rx="3" class="dg-cell"/>
    <text x="214" y="185" text-anchor="middle" class="dg-note">1&#160;&#160;3&#160;&#160;5&#160;&#160;8</text>
    <rect x="390" y="168" width="128" height="24" rx="3" class="dg-cell"/>
    <text x="454" y="185" text-anchor="middle" class="dg-note">2&#160;&#160;4&#160;&#160;7&#160;&#160;9</text>

    <rect x="230" y="210" width="240" height="24" rx="3" class="dg-cell-hit"/>
    <text x="350" y="227" text-anchor="middle" class="dg-note">1&#160;&#160;2&#160;&#160;3&#160;&#160;4&#160;&#160;5&#160;&#160;7&#160;&#160;8&#160;&#160;9</text>
    <text x="500" y="227" class="dg-good">sorted</text>
  </g>

  <line x1="0" y1="282" x2="700" y2="282" class="dg-guide"/>
  <text x="0" y="304" class="dg-note">Every level touches all n elements once. Halving takes log&#8322;n levels to reach single items.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Three moves, and the word that matters",
        body: [
          "Divide and conquer breaks a problem into subproblems, solves each recursively, and combines the results. What distinguishes it from dynamic programming is one word in that description: the subproblems must be independent. They do not overlap, so nothing is ever computed twice, and there is nothing to cache.",
          "That distinction is the practical test. Merge sort splits an array into two halves that share no elements — solving one tells you nothing about the other, and neither is ever revisited. Fibonacci splits into n-1 and n-2, which overlap enormously, so the same subproblems recur and you should be memoising instead. Same recursive shape, completely different treatment.",
          "The combine step is usually where the real work lives. Merge sort's divide is trivial — pick the midpoint — and its merge is the O(n) part that determines the whole complexity. Quicksort inverts this: partitioning is the expensive step and the combine is nothing at all, because the halves are already in the right places.",
        ],
      },
      {
        heading: "Reading the cost off the recurrence",
        body: [
          "The running time follows a recurrence of the form T(n) = a·T(n/b) + f(n), where a is how many subproblems you create, b is the factor by which each shrinks, and f(n) is the cost of dividing plus combining.",
          "Merge sort makes two subproblems of half the size with a linear merge: T(n) = 2T(n/2) + O(n), which is O(n log n). Binary search makes one subproblem of half the size with constant work: T(n) = T(n/2) + O(1), which is O(log n). Naive Karatsuba-style multiplication makes three subproblems of half the size: T(n) = 3T(n/2) + O(n), which is O(n^1.585).",
          "The Master Theorem formalises this by comparing f(n) against n^(log_b a) — the total cost of the leaves. If the leaves dominate, that term wins. If the combine dominates, f(n) wins. If they balance, you get an extra log factor, which is exactly the merge sort case.",
        ],
        trace: `Reading it without the theorem:

  merge sort, n = 8

  level 0:  1 piece  of size 8   → 8 units merged
  level 1:  2 pieces of size 4   → 8 units merged
  level 2:  4 pieces of size 2   → 8 units merged
  level 3:  8 pieces of size 1   → base case

  Each level touches every element once: O(n).
  Halving from n to 1 takes log₂n levels.
  Total: O(n log n).

Binary search discards one half instead of
recursing into both, so each level is a single
O(1) comparison: O(log n).`,
      },
      {
        heading: "Quickselect — recursing into one side only",
        body: [
          "Quicksort partitions around a pivot and recurses into both halves. Quickselect answers a narrower question — what is the k-th smallest element — and exploits the fact that after partitioning you know which half contains the answer.",
          "So you recurse into that half only, and discard the other entirely. The recurrence changes from T(n) = 2T(n/2) + O(n) to T(n) = T(n/2) + O(n), and the sum n + n/2 + n/4 + ... converges to 2n. That is O(n) average, beating the O(n log n) of sorting and then indexing.",
          "The average is doing real work in that sentence. A bad pivot on already-sorted input degrades quickselect to O(n²), just as it does quicksort. Randomising the pivot makes that outcome vanishingly unlikely without changing the code much, and it is what you should write. There is a deterministic O(n) worst-case variant, median-of-medians, but its constant factor is bad enough that randomised quickselect wins in practice.",
        ],
        aside:
          "Quickselect can be written as a loop rather than recursion, since the recursive call is in tail position and there is only one of it. The iterative form avoids stack depth entirely and is what the implementation below uses.",
      },
      {
        heading: "Counting inversions in the merge step",
        body: [
          "A pair of indices is an inversion if the earlier element is larger — informally, how far the array is from sorted. Counting them naively is O(n²), and merge sort counts them for free.",
          "The observation lives in the merge. When you take an element from the right half, every element still remaining in the left half is greater than it and appears earlier in the original array. So each of those is an inversion with the element you just took, and you can count them all at once by adding the number of unconsumed left-half elements.",
          "That single line turns merge sort into an inversion counter at no extra asymptotic cost. The same idea generalises: Count of Smaller Numbers After Self and Reverse Pairs both piggy-back a counter on the merge, with a slightly different comparison. It is worth recognising the shape — 'count pairs satisfying a cross-halves condition' is a merge sort problem.",
        ],
        trace: `merging  left [3, 5]  right [1, 4]

  compare 3 and 1 → take 1 from the RIGHT
      left still holds [3, 5] → 2 elements
      both are inversions with 1  → count += 2

  compare 3 and 4 → take 3 from the left
  compare 5 and 4 → take 4 from the RIGHT
      left still holds [5] → 1 element
      count += 1

  take 5.  Total inversions across this merge: 3
  (3,1) (5,1) (5,4)`,
      },
      {
        heading: "Where it shows up beyond sorting",
        body: [
          "Binary search is divide and conquer with a degenerate combine — you discard one half rather than merging two results.",
          "Closest pair of points in the plane: split by x-coordinate, solve each side, then check only the narrow strip near the dividing line, which can be done in linear time. That gives O(n log n) for a problem that looks inherently quadratic.",
          "Fast exponentiation computes a^n by squaring a^(n/2), which is divide and conquer over the exponent's bits. Matrix exponentiation for linear recurrences is the same idea with matrices, giving Fibonacci in O(log n).",
          "The Skyline Problem merges skylines the way merge sort merges arrays. Maximum subarray has a divide-and-conquer solution that considers the best on the left, the best on the right, and the best crossing the midpoint — worth knowing even though Kadane's beats it, because the crossing case is a good exercise in what a combine step has to handle.",
        ],
      },
      {
        heading: "The practical costs",
        body: [
          "Two things routinely make a correct divide-and-conquer implementation slower than it should be.",
          "Slicing. Writing the recursion over copied sub-arrays adds an O(n) allocation at every level, which is asymptotically harmless for merge sort but wasteful and can be much worse for other shapes. Passing indices into the original array avoids it entirely, at the cost of slightly noisier code.",
          "Recursion depth. It is O(log n) for balanced splits, which is fine — around 20 frames for a million elements. But an unbalanced split makes it O(n), and that is exactly what an unrandomised quicksort pivot produces on sorted input. Recursing into the smaller half and looping on the larger caps the stack at O(log n) even in the worst case.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Merge sort over INDICES rather than slices - no per-level allocation.
void mergeSort(vector<int>& a, vector<int>& buffer, int lo, int hi) {
    if (hi - lo < 2) return;                       // one element is sorted
    int mid = lo + (hi - lo) / 2;

    mergeSort(a, buffer, lo, mid);                 // divide + conquer
    mergeSort(a, buffer, mid, hi);

    int i = lo, j = mid, k = lo;                   // combine: the O(n) part
    while (i < mid && j < hi)
        buffer[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];   // <= keeps it stable
    while (i < mid) buffer[k++] = a[i++];
    while (j < hi)  buffer[k++] = a[j++];
    copy(buffer.begin() + lo, buffer.begin() + hi, a.begin() + lo);
}

// COUNTING INVERSIONS - merge sort with one extra line.
// Taking from the right half means every remaining left element is an
// inversion with it, so count them all at once.
long long countInversions(vector<int>& a, vector<int>& buffer, int lo, int hi) {
    if (hi - lo < 2) return 0;
    int mid = lo + (hi - lo) / 2;
    long long count = countInversions(a, buffer, lo, mid)
                    + countInversions(a, buffer, mid, hi);

    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        if (a[i] <= a[j]) buffer[k++] = a[i++];
        else {
            count += mid - i;                      // <-- the whole trick
            buffer[k++] = a[j++];
        }
    }
    while (i < mid) buffer[k++] = a[i++];
    while (j < hi)  buffer[k++] = a[j++];
    copy(buffer.begin() + lo, buffer.begin() + hi, a.begin() + lo);
    return count;
}

// QUICKSELECT - k-th smallest in O(n) average. Only one side can hold
// the answer, so only one side is recursed into: n + n/2 + n/4 ... = 2n.
// Written as a loop, since the recursive call is in tail position.
int quickselect(vector<int>& a, int k) {           // k is 0-indexed
    int lo = 0, hi = (int)a.size() - 1;
    mt19937 rng(random_device{}());

    while (lo <= hi) {
        int pivotIndex = lo + (int)(rng() % (hi - lo + 1));   // randomise:
        swap(a[pivotIndex], a[hi]);                // a fixed pivot degrades
        int pivot = a[hi], store = lo;             // to O(n^2) on sorted input

        for (int i = lo; i < hi; ++i)
            if (a[i] < pivot) swap(a[i], a[store++]);
        swap(a[store], a[hi]);

        if (store == k) return a[store];
        if (store < k) lo = store + 1;             // answer is to the right
        else           hi = store - 1;             // answer is to the left
    }
    return -1;
}

// Fast exponentiation - divide and conquer over the exponent's bits.
// a^n = (a^(n/2))^2, halving the work each step.
long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;                  // square for the next bit
        exp >>= 1;
    }
    return result;
}

// Maximum subarray by divide and conquer. Kadane beats it, but the
// crossing case is a good illustration of what a combine must handle:
// the best answer may use neither half alone.
int maxCrossing(const vector<int>& a, int lo, int mid, int hi) {
    int sum = 0, left = INT_MIN;
    for (int i = mid - 1; i >= lo; --i) { sum += a[i]; left = max(left, sum); }
    sum = 0;
    int right = INT_MIN;
    for (int i = mid; i < hi; ++i) { sum += a[i]; right = max(right, sum); }
    return left + right;
}

int maxSubarrayDC(const vector<int>& a, int lo, int hi) {
    if (hi - lo == 1) return a[lo];
    int mid = lo + (hi - lo) / 2;
    return max({ maxSubarrayDC(a, lo, mid),        // entirely left
                 maxSubarrayDC(a, mid, hi),        // entirely right
                 maxCrossing(a, lo, mid, hi) });   // straddling the split
}`,
  },

  "dp-unbounded-knapsack": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Loop order deciding whether coin combinations or permutations are counted, with greedy failing on the same input">
  <text x="0" y="14" class="dg-title">coins [1, 3, 4] &#183; make 6</text>

  <g transform="translate(0,32)">
    <rect x="0" y="0" width="200" height="58" rx="4" class="dg-cell-out"/>
    <text x="14" y="22" class="dg-note">GREEDY: 4 + 1 + 1</text>
    <text x="14" y="44" class="dg-bad">3 coins &#8212; wrong</text>

    <rect x="220" y="0" width="200" height="58" rx="4" class="dg-cell-hit"/>
    <text x="234" y="22" class="dg-note">OPTIMAL: 3 + 3</text>
    <text x="234" y="44" class="dg-good">2 coins</text>

    <text x="440" y="22" class="dg-label">Taking the biggest coin destroys</text>
    <text x="440" y="42" class="dg-label">the pairing that would have won.</text>
  </g>

  <line x1="0" y1="112" x2="700" y2="112" class="dg-guide"/>
  <text x="0" y="136" class="dg-title">Counting: the loop order decides what you are counting</text>

  <g transform="translate(0,152)">
    <rect x="0" y="0" width="330" height="140" rx="4" class="dg-cell-live"/>
    <text x="14" y="24" class="dg-note">for coin in coins:&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#8592; OUTER</text>
    <text x="14" y="44" class="dg-note">&#160;&#160;for c in coin..amount:</text>
    <text x="14" y="64" class="dg-note">&#160;&#160;&#160;&#160;dp[c] += dp[c &#8722; coin]</text>
    <text x="14" y="94" class="dg-label">COMBINATIONS</text>
    <text x="14" y="116" class="dg-note">{1,2} and {2,1} counted ONCE</text>
    <text x="14" y="134" class="dg-label">each coin is considered a single time</text>

    <rect x="360" y="0" width="330" height="140" rx="4" class="dg-cell-mark"/>
    <text x="374" y="24" class="dg-note">for c in 1..amount:&#160;&#160;&#160;&#160;&#8592; OUTER</text>
    <text x="374" y="44" class="dg-note">&#160;&#160;for coin in coins:</text>
    <text x="374" y="64" class="dg-note">&#160;&#160;&#160;&#160;dp[c] += dp[c &#8722; coin]</text>
    <text x="374" y="94" class="dg-label">PERMUTATIONS</text>
    <text x="374" y="116" class="dg-note">{1,2} and {2,1} counted TWICE</text>
    <text x="374" y="134" class="dg-label">every coin is retried at every amount</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "One rule removed",
        body: [
          "Unbounded knapsack is 0/1 knapsack with the at-most-once restriction lifted: each item may be taken any number of times. The state and the shape of the transition are identical, and exactly one thing changes.",
          "In the 2D formulation, the take branch reads dp[i][w - weight[i]] instead of dp[i-1][w - weight[i]]. Staying on row i means the value it reads may already include item i, which is precisely the reuse you now want.",
          "In the 1D formulation that becomes a loop direction. Iterating capacity forwards means dp[c - weight] has already been updated for the current item, so taking it again is possible. Backwards for 0/1, forwards for unbounded — the same three lines of code, and the only visible difference is which way the loop counts.",
        ],
        aside:
          "This is the reason the 0/1 loop-direction bug is so easy to miss: both directions compile, both run, and both produce a plausible number. The wrong one is a correct solution to the other problem.",
      },
      {
        heading: "Coin change, and why greedy fails",
        body: [
          "Minimum coins to make an amount is the best-known instance. The greedy instinct — take the largest coin that fits, repeat — is correct for the coin systems most people grow up with, which is exactly why it feels safe.",
          "With coins 1, 3 and 4, making 6 greedily takes 4, then 1, then 1: three coins. The optimum is 3 and 3: two coins. Taking the 4 consumed the room that a second 3 needed, and greedy has no mechanism to reconsider.",
          "A coin system where greedy always works is called canonical, and testing whether an arbitrary system is canonical is itself non-trivial. The practical rule: unless the problem guarantees a canonical system, use DP. It is O(amount × coins) and removes the question entirely.",
        ],
      },
      {
        heading: "Counting: the loop order is the specification",
        body: [
          "Switching from 'fewest coins' to 'how many ways' changes min to a sum, and introduces the subtlety that costs people interviews. The two nested loops can be written in either order, both run, and they answer different questions.",
          "Coins in the outer loop and amount in the inner counts combinations. Each coin is considered exactly once across the whole run, so a set of coins is only ever built in one canonical order — {1,2} and {2,1} are the same way.",
          "Amount in the outer loop and coins in the inner counts permutations. At every amount, every coin is reconsidered, so the same multiset can be assembled in several orders and each is counted separately.",
          "Neither is wrong. Coin Change II asks for combinations; Combination Sum IV, despite its name, asks for permutations. Read the problem statement for whether order matters, then choose the loop order deliberately rather than by habit.",
        ],
        trace: `coins [1, 2], amount 3

COMBINATIONS — coins outer
  after coin 1: dp = [1, 1, 1, 1]
  after coin 2: dp = [1, 1, 2, 2]
  answer 2:  {1,1,1}  {1,2}

PERMUTATIONS — amount outer
  c=1: dp[1] += dp[0] → 1
  c=2: dp[2] += dp[1] + dp[0] → 2
  c=3: dp[3] += dp[2] + dp[1] → 3
  answer 3:  {1,1,1}  {1,2}  {2,1}

Identical arithmetic, different totals.`,
      },
      {
        heading: "The sentinel, and reporting impossibility",
        body: [
          "For minimum-coins, unreachable amounts need a value that loses every comparison. Infinity works in Python and JavaScript; in C++ use a large sentinel rather than INT_MAX, because INT_MAX plus one overflows the moment you write dp[c - coin] + 1.",
          "A safe choice is amount + 1, which is larger than any achievable coin count since every coin is at least 1. It also makes the final check readable: if dp[amount] still exceeds amount, no combination exists, so return -1.",
          "Skipping that final check is a common bug. Without it, an impossible amount returns a huge number that looks like a real answer, and the failure only surfaces on a test case with a reachable-looking but unreachable target.",
        ],
      },
      {
        heading: "The other members of the family",
        body: [
          "Rod cutting. Given prices for each length, maximise the value from cutting a rod. Lengths can be reused, so it is unbounded knapsack maximising rather than minimising — dp[length] is the best value for that length, taking the max over every possible first cut.",
          "Perfect squares. Minimum number of square numbers summing to n. The 'coins' are 1, 4, 9, 16 and so on, generated up to n. Same code as coin change.",
          "Integer break. Split n into at least two positive parts to maximise their product. Not literally knapsack, but the same unbounded structure: dp[n] is the max over every first split, and the subtlety is that a part may either be taken as-is or split further, so the transition compares j × (n − j) against j × dp[n − j].",
          "Minimum Cost For Tickets. Passes of different durations, each reusable — unbounded knapsack over days rather than capacity.",
        ],
      },
      {
        heading: "Cost and limits",
        body: [
          "The complexity is O(amount × coins), which is the same pseudo-polynomial situation as 0/1 knapsack: the amount is a value, not a size, so it contributes only log(amount) bits to the input. An amount of a billion is intractable however few coin types there are.",
          "Space is O(amount) with the rolling array, and unlike 0/1 knapsack you rarely need the full 2D table, because reconstructing which coins were used can be done with a separate parent array recording the coin chosen at each amount.",
          "Counting variants overflow easily. The number of ways to make a large amount grows fast, which is why these problems usually ask for the answer modulo 10⁹+7. If a counting problem does not mention a modulus, check that the constraints keep the count inside a 64-bit integer.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// MINIMUM COINS. Forward capacity loop = unlimited reuse.
// Sentinel is amount+1, not INT_MAX: INT_MAX + 1 overflows.
int coinChange(const vector<int>& coins, int amount) {
    const int INF = amount + 1;                    // beats any real answer
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;

    for (int c = 1; c <= amount; ++c)
        for (int coin : coins)
            if (coin <= c) dp[c] = min(dp[c], dp[c - coin] + 1);

    return dp[amount] > amount ? -1 : dp[amount];  // the check that matters
}

// COUNTING COMBINATIONS - coins OUTER. Each coin is considered once
// across the whole run, so {1,2} and {2,1} collapse to one way.
long long countCombinations(const vector<int>& coins, int amount) {
    vector<long long> dp(amount + 1, 0);
    dp[0] = 1;
    for (int coin : coins)                         // <-- outer
        for (int c = coin; c <= amount; ++c)
            dp[c] += dp[c - coin];
    return dp[amount];
}

// COUNTING PERMUTATIONS - amount OUTER. Every coin is retried at every
// amount, so orderings are counted separately.
long long countPermutations(const vector<int>& coins, int amount) {
    vector<long long> dp(amount + 1, 0);
    dp[0] = 1;
    for (int c = 1; c <= amount; ++c)              // <-- outer
        for (int coin : coins)
            if (coin <= c) dp[c] += dp[c - coin];
    return dp[amount];
}

// Which coins were used - a parent array recording the choice per amount.
vector<int> coinsUsed(const vector<int>& coins, int amount) {
    const int INF = amount + 1;
    vector<int> dp(amount + 1, INF), choice(amount + 1, -1);
    dp[0] = 0;

    for (int c = 1; c <= amount; ++c)
        for (int coin : coins)
            if (coin <= c && dp[c - coin] + 1 < dp[c]) {
                dp[c] = dp[c - coin] + 1;
                choice[c] = coin;                  // remember what we took
            }

    if (dp[amount] > amount) return {};
    vector<int> out;
    for (int c = amount; c > 0; c -= choice[c]) out.push_back(choice[c]);
    return out;
}

// ROD CUTTING - unbounded knapsack maximising. prices[i] is the value
// of a piece of length i+1, and lengths may be reused freely.
int rodCutting(const vector<int>& prices, int n) {
    vector<int> dp(n + 1, 0);
    for (int length = 1; length <= n; ++length)
        for (int cut = 1; cut <= length && cut <= (int)prices.size(); ++cut)
            dp[length] = max(dp[length], prices[cut - 1] + dp[length - cut]);
    return dp[n];
}

// PERFECT SQUARES - the same code with generated "coins".
int numSquares(int n) {
    vector<int> dp(n + 1, n + 1);
    dp[0] = 0;
    for (int c = 1; c <= n; ++c)
        for (int root = 1; root * root <= c; ++root)
            dp[c] = min(dp[c], dp[c - root * root] + 1);
    return dp[n];
}

// INTEGER BREAK - a part may be taken whole OR split further, so the
// transition compares j*(n-j) against j*dp[n-j].
int integerBreak(int n) {
    vector<int> dp(n + 1, 0);
    for (int i = 2; i <= n; ++i)
        for (int j = 1; j < i; ++j)
            dp[i] = max({dp[i], j * (i - j), j * dp[i - j]});
    return dp[n];
}`,
  },

  "dp-edit-distance": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The edit distance grid with the three neighbouring cells labelled as delete, insert and replace">
  <text x="0" y="14" class="dg-title">"horse" &#8594; "ros" in 3 operations</text>

  <g transform="translate(70,34)">
    <text x="24"  y="16" text-anchor="middle" class="dg-index">&#8212;</text>
    <text x="80"  y="16" text-anchor="middle" class="dg-index">r</text>
    <text x="136" y="16" text-anchor="middle" class="dg-index">o</text>
    <text x="192" y="16" text-anchor="middle" class="dg-index">s</text>

    <text x="-24" y="46" class="dg-index">&#8212;</text>
    <rect x="0"   y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="80"  y="44" text-anchor="middle" class="dg-index">1</text>
    <rect x="112" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="136" y="44" text-anchor="middle" class="dg-index">2</text>
    <rect x="168" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="192" y="44" text-anchor="middle" class="dg-index">3</text>

    <text x="-24" y="82" class="dg-index">h</text>
    <rect x="0"   y="62" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="80" text-anchor="middle" class="dg-index">1</text>
    <rect x="56"  y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="80" text-anchor="middle">1</text>
    <rect x="112" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="80" text-anchor="middle">2</text>
    <rect x="168" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="80" text-anchor="middle">3</text>

    <text x="-24" y="118" class="dg-index">o</text>
    <rect x="0"   y="98" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="116" text-anchor="middle" class="dg-index">2</text>
    <rect x="56"  y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="116" text-anchor="middle">2</text>
    <rect x="112" y="98" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="136" y="116" text-anchor="middle">1</text>
    <rect x="168" y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="116" text-anchor="middle">2</text>

    <text x="-24" y="154" class="dg-index">r</text>
    <rect x="0"   y="134" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="152" text-anchor="middle" class="dg-index">3</text>
    <rect x="56"  y="134" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="80"  y="152" text-anchor="middle">2</text>
    <rect x="112" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="152" text-anchor="middle">2</text>
    <rect x="168" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="152" text-anchor="middle">2</text>

    <text x="-24" y="190" class="dg-index">s</text>
    <rect x="0"   y="170" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="188" text-anchor="middle" class="dg-index">4</text>
    <rect x="56"  y="170" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="188" text-anchor="middle">3</text>
    <rect x="112" y="170" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="188" text-anchor="middle">3</text>
    <rect x="168" y="170" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="192" y="188" text-anchor="middle">2</text>

    <text x="-24" y="226" class="dg-index">e</text>
    <rect x="0"   y="206" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="224" text-anchor="middle" class="dg-index">5</text>
    <rect x="56"  y="206" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="224" text-anchor="middle">4</text>
    <rect x="112" y="206" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="224" text-anchor="middle">4</text>
    <rect x="168" y="206" width="48" height="26" rx="3" class="dg-cell-mark"/><text x="192" y="224" text-anchor="middle">3</text>
  </g>

  <g transform="translate(330,58)">
    <rect x="0" y="0" width="350" height="164" rx="4" class="dg-cell-idle"/>
    <text x="14" y="26" class="dg-note">The three neighbours ARE the three operations</text>
    <text x="14" y="56" class="dg-ptr">&#8593;&#160;&#160;from above&#160;&#160;&#8594; DELETE from the first string</text>
    <text x="14" y="82" class="dg-ptr2">&#8592;&#160;&#160;from the left&#160;&#8594; INSERT from the second</text>
    <text x="14" y="108" class="dg-good">&#8598;&#160;&#160;diagonal&#160;&#160;&#160;&#160;&#8594; REPLACE &#8212; or FREE on a match</text>
    <text x="14" y="142" class="dg-note">first row and column must be 0,1,2,3&#8230;</text>
  </g>

  <line x1="0" y1="290" x2="700" y2="290" class="dg-guide"/>
  <text x="0" y="312" class="dg-note">Converting to or from the empty string costs one operation per character &#8212; that is the padding.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Three operations, three neighbours",
        body: [
          "Edit distance, also called Levenshtein distance, is the fewest single-character insertions, deletions and replacements needed to turn one string into another. The state is dp[i][j] — the distance between the first i characters of one and the first j of the other.",
          "The elegance is that each of the three operations corresponds to one neighbouring cell. Deleting a character from the first string means you still have to match j characters but only i-1 remain, so the cost is dp[i-1][j] plus one. Inserting means you have covered one more of the second string, so dp[i][j-1] plus one. Replacing consumes one from each, so dp[i-1][j-1] plus one.",
          "And if the current characters already match, no operation is needed at all: the cost passes straight through the diagonal, dp[i-1][j-1], with nothing added. That free diagonal is what the whole algorithm is trying to find as much of as possible.",
        ],
      },
      {
        heading: "The base cases carry real information",
        body: [
          "The first row and first column are not padding zeros here, unlike in LCS. Turning a string of length i into the empty string costs i deletions, so the first column reads 0, 1, 2, 3 and so on. Building a string of length j from nothing costs j insertions, so the first row does the same.",
          "Leaving them at zero is the single most common bug in this problem, and it fails quietly — the answer comes out too small, and only on inputs where one string is a prefix-ish of the other does the error become obvious.",
          "It is worth reading the base cases as a sanity check on your indexing. dp[3][0] should be 3, because 'hor' to '' is three deletions. If your table does not say that, the initialisation is wrong before any of the interesting cells have been computed.",
        ],
        aside:
          "Test the base cases before the transitions. If dp[i][0] equals i and dp[0][j] equals j, your indexing convention is right, and the rest of the grid usually follows.",
      },
      {
        heading: "Reading the answer back as an edit script",
        body: [
          "The corner cell gives the distance. Recovering the actual sequence of edits means walking backwards from it, at each step working out which neighbour produced the stored value.",
          "If the characters match and the cell equals the diagonal, no edit happened — move diagonally and record nothing. Otherwise compare against the three candidates: if the cell equals one plus the diagonal, it was a replace; one plus the cell above, a delete; one plus the cell to the left, an insert. Follow that neighbour and record the operation.",
          "This is what a diff tool does, and it is why the full grid is worth keeping when the output is the edit script rather than just its length. It also makes the algorithm concrete: printing the reconstructed script for 'horse' to 'ros' shows replace h with r, delete r, delete e — three operations, matching the corner.",
        ],
        trace: `walking back from dp[5][3] = 3

  (5,3) 'e' vs 's', dp=3, left+1 = 4, up+1 = 3
        came from ABOVE → delete 'e'
  (4,3) 's' vs 's', match, dp = diagonal = 2
        came DIAGONALLY, free → keep 's'
  (3,2) 'r' vs 'o', dp=2, diagonal+1 = 2
        REPLACE 'r' with 'o'
  ... continue to (0,0)

  script: replace h→r, delete r, delete e`,
      },
      {
        heading: "Space optimisation, and the diagonal trap",
        body: [
          "Each row depends only on the row above and the cell to its left, so two rows suffice — O(min(n, m)) space if you make the shorter string the inner dimension.",
          "The trap is the diagonal. In the full grid, dp[i-1][j-1] is unambiguous. In the two-row version it lives in the previous row at the previous column, which the current row has not yet reached — but if you write into the current row in place with a single array, you overwrite the value you are about to need.",
          "Two clean fixes. Keep two separate arrays and read the diagonal from the previous one, which is what the implementation below does. Or use a single array and stash the value about to be overwritten in a temporary before each write. Both work; the two-array form is easier to get right under pressure.",
        ],
      },
      {
        heading: "The variants",
        body: [
          "Restrict the operations and you get a family. Allow deletions only, from both strings, and the answer is n plus m minus twice the LCS — that is Delete Operation for Two Strings. Weight the operations differently, as spell checkers do when a transposition is cheaper than two edits, and the min simply takes weighted terms.",
          "Damerau-Levenshtein adds transposition of adjacent characters as a fourth operation, which contributes a fourth candidate reading from dp[i-2][j-2]. It is what most real spell checkers use, since swapped letters are a very common typo.",
          "One asymmetry worth stating: with unequal operation costs, the distance is no longer symmetric — the cost of turning a into b need not equal the cost of turning b into a. With the standard unit costs it is symmetric, because every operation has an inverse of the same price.",
        ],
      },
      {
        heading: "Neighbouring problems with the same grid",
        body: [
          "Several harder string DPs are this grid with a different transition, and recognising the shape saves you deriving each from scratch.",
          "Regular Expression Matching and Wildcard Matching both fill an n-by-m table where dp[i][j] means 'does the first i characters of the text match the first j of the pattern'. The star cases branch into 'use it zero times' and 'use it once more', which read as the up and left neighbours.",
          "Interleaving String asks whether a third string is a shuffle of two others, which is a grid over the two source strings where each cell asks whether the next character came from one or the other.",
          "Distinct Subsequences counts how many ways one string appears as a subsequence of another — the same grid, summing instead of minimising.",
          "In every case the useful question is the same: what are the two indices, and what small set of moves gets me to the current cell?",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Levenshtein distance. The three neighbours ARE the three operations.
int editDistance(const string& a, const string& b) {
    int n = (int)a.size(), m = (int)b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    // Base cases carry real information: to/from the empty string costs
    // one operation per character. Leaving these at 0 is THE classic bug.
    for (int i = 0; i <= n; ++i) dp[i][0] = i;     // delete everything
    for (int j = 0; j <= m; ++j) dp[0][j] = j;     // insert everything

    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];       // match: free diagonal
            } else {
                dp[i][j] = 1 + min({
                    dp[i - 1][j],                  // delete a[i-1]
                    dp[i][j - 1],                  // insert b[j-1]
                    dp[i - 1][j - 1],              // replace a[i-1] with b[j-1]
                });
            }
        }
    }
    return dp[n][m];
}

// Two rows. The diagonal must come from the PREVIOUS row - reading it
// from the current one gives a value already overwritten this pass.
int editDistanceRolling(string a, string b) {
    if (a.size() < b.size()) swap(a, b);           // shorter goes inner
    int m = (int)b.size();
    vector<int> prev(m + 1), cur(m + 1);
    iota(prev.begin(), prev.end(), 0);             // 0, 1, 2, ...

    for (int i = 1; i <= (int)a.size(); ++i) {
        cur[0] = i;
        for (int j = 1; j <= m; ++j) {
            cur[j] = (a[i-1] == b[j-1])
                   ? prev[j - 1]                   // diagonal, previous row
                   : 1 + min({prev[j], cur[j - 1], prev[j - 1]});
        }
        swap(prev, cur);
    }
    return prev[m];
}

// The edit SCRIPT, not just its length. Needs the full grid.
vector<string> editScript(const string& a, const string& b) {
    int n = (int)a.size(), m = (int)b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; ++i) dp[i][0] = i;
    for (int j = 0; j <= m; ++j) dp[0][j] = j;
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1]
                     : 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});

    vector<string> script;
    int i = n, j = m;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && a[i-1] == b[j-1] && dp[i][j] == dp[i-1][j-1]) {
            --i; --j;                              // free match, record nothing
        } else if (i > 0 && j > 0 && dp[i][j] == dp[i-1][j-1] + 1) {
            script.push_back(string("replace ") + a[i-1] + " with " + b[j-1]);
            --i; --j;
        } else if (i > 0 && dp[i][j] == dp[i-1][j] + 1) {
            script.push_back(string("delete ") + a[i-1]);
            --i;
        } else {
            script.push_back(string("insert ") + b[j-1]);
            --j;
        }
    }
    reverse(script.begin(), script.end());
    return script;
}

// Weighted operations - a spell checker might price a replacement below
// an insert-plus-delete pair. Note the distance stops being symmetric
// once insert and delete cost differently.
int weightedEditDistance(const string& a, const string& b,
                         int costInsert, int costDelete, int costReplace) {
    int n = (int)a.size(), m = (int)b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; ++i) dp[i][0] = i * costDelete;
    for (int j = 0; j <= m; ++j) dp[0][j] = j * costInsert;

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1]
                     : min({dp[i-1][j]   + costDelete,
                            dp[i][j-1]   + costInsert,
                            dp[i-1][j-1] + costReplace});
    return dp[n][m];
}`,
  },
};
