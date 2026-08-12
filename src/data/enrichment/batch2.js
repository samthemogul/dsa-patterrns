/**
 * Enrichment batch 2 — Stage 2 core patterns (arrays).
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "array-twopointers": {
    illustration: `
<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Two pointers converging from both ends of a sorted array to find a pair summing to 12">
  <defs>
    <marker id="tp-arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow-mark"/>
    </marker>
  </defs>

  <text x="0" y="14" class="dg-title">Sorted array, target sum 12</text>

  <!-- Step 1 -->
  <text x="0" y="46" class="dg-label">step 1</text>
  <g transform="translate(70,32)">
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell-mark"/><text x="23" y="18" text-anchor="middle">2</text>
    <rect x="50"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="73" y="18" text-anchor="middle">4</text>
    <rect x="100" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="123" y="18" text-anchor="middle">5</text>
    <rect x="150" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="173" y="18" text-anchor="middle">7</text>
    <rect x="200" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="223" y="18" text-anchor="middle">9</text>
    <rect x="250" y="0" width="46" height="26" rx="3" class="dg-cell-mark"/><text x="273" y="18" text-anchor="middle">11</text>
    <text x="23"  y="44" text-anchor="middle" class="dg-ptr">L</text>
    <text x="273" y="44" text-anchor="middle" class="dg-ptr">R</text>
    <text x="320" y="18" class="dg-note">2 + 11 = 13 &gt; 12 &#8594; move R left</text>
  </g>

  <!-- Step 2 -->
  <text x="0" y="106" class="dg-label">step 2</text>
  <g transform="translate(70,92)">
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell-mark"/><text x="23" y="18" text-anchor="middle">2</text>
    <rect x="50"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="73" y="18" text-anchor="middle">4</text>
    <rect x="100" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="123" y="18" text-anchor="middle">5</text>
    <rect x="150" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="173" y="18" text-anchor="middle">7</text>
    <rect x="200" y="0" width="46" height="26" rx="3" class="dg-cell-mark"/><text x="223" y="18" text-anchor="middle">9</text>
    <rect x="250" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="273" y="18" text-anchor="middle" class="dg-index">11</text>
    <text x="23"  y="44" text-anchor="middle" class="dg-ptr">L</text>
    <text x="223" y="44" text-anchor="middle" class="dg-ptr">R</text>
    <text x="320" y="18" class="dg-note">2 + 9 = 11 &lt; 12 &#8594; move L right</text>
  </g>

  <!-- Step 3 -->
  <text x="0" y="166" class="dg-label">step 3</text>
  <g transform="translate(70,152)">
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="23" y="18" text-anchor="middle" class="dg-index">2</text>
    <rect x="50"  y="0" width="46" height="26" rx="3" class="dg-cell-hit"/><text x="73" y="18" text-anchor="middle">4</text>
    <rect x="100" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="123" y="18" text-anchor="middle">5</text>
    <rect x="150" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="173" y="18" text-anchor="middle">7</text>
    <rect x="200" y="0" width="46" height="26" rx="3" class="dg-cell-hit"/><text x="223" y="18" text-anchor="middle">9</text>
    <rect x="250" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="273" y="18" text-anchor="middle" class="dg-index">11</text>
    <text x="73"  y="44" text-anchor="middle" class="dg-ptr">L</text>
    <text x="223" y="44" text-anchor="middle" class="dg-ptr">R</text>
    <text x="320" y="18" class="dg-good">4 + 9 = 12 &#10003; found</text>
  </g>

  <line x1="0" y1="210" x2="700" y2="210" class="dg-guide"/>
  <text x="0" y="232" class="dg-note">Each step discards a whole row or column of the pair grid &#8212; that is why one pass suffices.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The problem it replaces",
        body: [
          "Finding a pair in an array that sums to a target has an obvious solution: try every pair. Two nested loops, O(n²), and on 10⁵ elements that is ten billion operations — far too slow. The two-pointer technique brings it to O(n), but only because the array is sorted, and understanding exactly why sorting unlocks it is the whole point of this topic.",
          "The setup is simple: put one pointer at the far left, one at the far right, and look at the sum of the two values they point to. Then move one of them inward. The question is which one, and the answer is what makes the algorithm correct rather than just fast.",
        ],
      },
      {
        heading: "Why moving the correct pointer is safe",
        body: [
          "Suppose the sum is too large. You need a smaller sum. Moving the left pointer right would make the sum larger, which is the wrong direction, so you move the right pointer left. That is the mechanical reason. The important reason is what you are allowed to throw away.",
          "When the sum at (L, R) exceeds the target, the value at R is too large to pair with anything remaining. Every element from L rightwards is at least as large as the one at L, so pairing any of them with R gives a sum at least as big — all of them overshoot too. So R cannot participate in any valid pair, and discarding it discards an entire column of the n² pair grid in one step.",
          "That is the real content of the algorithm. Each step eliminates a whole row or column rather than a single cell, so n steps cover all n² pairs. Sorting is what licenses the elimination, because it is what lets you reason about every remaining element from one comparison.",
        ],
        aside:
          "If the array is not sorted this reasoning collapses entirely — you cannot conclude anything about the other elements from one comparison. On unsorted input, use a hash map instead: one pass, storing what you have seen and checking for target minus current.",
      },
      {
        heading: "The two shapes of the pattern",
        body: [
          "There are two distinct arrangements and it is worth naming both, because they solve different problems.",
          "Opposite ends, converging. The pointers start at the two extremes and move toward each other. This is the pair-sum shape, and also palindrome checking, container-with-most-water, and reversing an array in place. The loop runs while left is less than right.",
          "Same direction, at different speeds. Both pointers start at the left, and one advances faster or under a different condition. This is the shape for removing duplicates in place, moving zeros to the end, and partitioning — one pointer scans while a slower one marks where the next kept element belongs. Fast-and-slow cycle detection in linked lists is this shape too.",
        ],
        trace: `SAME DIRECTION — remove duplicates in place

  [1, 1, 2, 2, 2, 3]
   w  r                  arr[r]==arr[w]  → just advance r
   w     r               arr[r]!=arr[w]  → ++w, copy
  [1, 2, 2, 2, 2, 3]
      w     r            equal → advance r
      w        r         equal → advance r
      w           r      differs → ++w, copy
  [1, 2, 3, 2, 2, 3]
         w        r      done, length = w+1 = 3

'w' marks where the next kept element goes.
Everything past index w is scratch.`,
      },
      {
        heading: "Extending to three or more",
        body: [
          "Three-sum is the standard follow-up and it is not a new technique — it is a loop wrapped around this one. Sort the array, then fix the first element with an outer loop and run two pointers over the remainder to find a pair summing to the negation of it. That gives O(n²) overall: one O(n) inner sweep for each of n outer positions, plus the O(n log n) sort.",
          "The part people fumble is duplicate handling. If the array contains repeated values you will emit the same triplet several times. The fix is to skip repeats at every level: after fixing an outer element, skip any subsequent identical value; after recording a hit, advance both pointers past their duplicates. Doing this while scanning is much cleaner than deduplicating the results afterwards.",
        ],
      },
      {
        heading: "Proving you have not missed a pair",
        body: [
          "It is worth being able to state the correctness argument, because interviewers ask. The invariant is that if a valid pair exists among the elements between L and R inclusive, the algorithm will find it.",
          "It holds initially, since the whole array is in range. Each step preserves it: when you discard R because the sum was too large, you have just shown R belongs to no valid pair, so any valid pair remains inside the smaller range. The same argument applies symmetrically when discarding L. The range shrinks by one every step, so the loop terminates, and it can only exit empty if no pair existed.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Opposite ends, converging. Requires sorted input.
pair<int,int> twoSumSorted(const vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo < hi) {
        int sum = arr[lo] + arr[hi];
        if (sum == target) return {lo, hi};
        if (sum < target) ++lo;      // need bigger  - arr[lo] can't help
        else --hi;                   // need smaller - arr[hi] can't help
    }
    return {-1, -1};
}

// Same direction, different speeds: compact the array in place.
// 'write' marks where the next kept element belongs.
int removeDuplicates(vector<int>& arr) {
    if (arr.empty()) return 0;
    int write = 0;
    for (int read = 1; read < (int)arr.size(); ++read)
        if (arr[read] != arr[write]) arr[++write] = arr[read];
    return write + 1;
}

// Three-sum: fix one element, two-pointer the rest. O(n^2).
// The skip-duplicate lines are what keep the output unique.
vector<vector<int>> threeSum(vector<int> nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> out;
    int n = (int)nums.size();

    for (int i = 0; i + 2 < n; ++i) {
        if (nums[i] > 0) break;                        // rest is all positive
        if (i > 0 && nums[i] == nums[i - 1]) continue; // skip repeated anchor

        int lo = i + 1, hi = n - 1;
        while (lo < hi) {
            int sum = nums[i] + nums[lo] + nums[hi];
            if (sum < 0) ++lo;
            else if (sum > 0) --hi;
            else {
                out.push_back({nums[i], nums[lo], nums[hi]});
                while (lo < hi && nums[lo] == nums[lo + 1]) ++lo;
                while (lo < hi && nums[hi] == nums[hi - 1]) --hi;
                ++lo; --hi;
            }
        }
    }
    return out;
}

// Container with most water - same converging shape, different rule:
// always move the SHORTER wall, since moving the taller one can only
// reduce the height while also reducing the width.
int maxArea(const vector<int>& height) {
    int lo = 0, hi = (int)height.size() - 1, best = 0;
    while (lo < hi) {
        best = max(best, (hi - lo) * min(height[lo], height[hi]));
        if (height[lo] < height[hi]) ++lo; else --hi;
    }
    return best;
}`,
  },

  "array-sliding-window": {
    illustration: `
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A variable-size sliding window expanding and contracting to find the longest substring without repeats">
  <text x="0" y="14" class="dg-title">Longest substring with no repeated character &#8212; "abcabcbb"</text>

  <!-- row helper: 8 cells of 46px -->
  <!-- Step 1 -->
  <text x="0" y="48" class="dg-label">expand</text>
  <g transform="translate(70,34)">
    <rect x="-4" y="-4" width="150" height="34" rx="4" class="dg-cell-live"/>
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="23"  y="18" text-anchor="middle">a</text>
    <rect x="50"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="73"  y="18" text-anchor="middle">b</text>
    <rect x="100" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="123" y="18" text-anchor="middle">c</text>
    <rect x="150" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="173" y="18" text-anchor="middle" class="dg-index">a</text>
    <rect x="200" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="223" y="18" text-anchor="middle" class="dg-index">b</text>
    <rect x="250" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="273" y="18" text-anchor="middle" class="dg-index">c</text>
    <rect x="300" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="323" y="18" text-anchor="middle" class="dg-index">b</text>
    <rect x="350" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="373" y="18" text-anchor="middle" class="dg-index">b</text>
    <text x="23"  y="46" text-anchor="middle" class="dg-ptr2">L</text>
    <text x="123" y="46" text-anchor="middle" class="dg-ptr">R</text>
    <text x="420" y="18" class="dg-good">valid, length 3</text>
  </g>

  <!-- Step 2 -->
  <text x="0" y="118" class="dg-label">conflict</text>
  <g transform="translate(70,104)">
    <rect x="-4" y="-4" width="200" height="34" rx="4" class="dg-cell-out"/>
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell-out"/><text x="23"  y="18" text-anchor="middle">a</text>
    <rect x="50"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="73"  y="18" text-anchor="middle">b</text>
    <rect x="100" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="123" y="18" text-anchor="middle">c</text>
    <rect x="150" y="0" width="46" height="26" rx="3" class="dg-cell-out"/><text x="173" y="18" text-anchor="middle">a</text>
    <rect x="200" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="223" y="18" text-anchor="middle" class="dg-index">b</text>
    <rect x="250" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="273" y="18" text-anchor="middle" class="dg-index">c</text>
    <rect x="300" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="323" y="18" text-anchor="middle" class="dg-index">b</text>
    <rect x="350" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="373" y="18" text-anchor="middle" class="dg-index">b</text>
    <text x="23"  y="46" text-anchor="middle" class="dg-ptr2">L</text>
    <text x="173" y="46" text-anchor="middle" class="dg-ptr">R</text>
    <text x="420" y="18" class="dg-bad">'a' repeats &#8594; shrink</text>
  </g>

  <!-- Step 3 -->
  <text x="0" y="188" class="dg-label">shrink</text>
  <g transform="translate(70,174)">
    <rect x="46" y="-4" width="150" height="34" rx="4" class="dg-cell-live"/>
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="23"  y="18" text-anchor="middle" class="dg-index">a</text>
    <rect x="50"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="73"  y="18" text-anchor="middle">b</text>
    <rect x="100" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="123" y="18" text-anchor="middle">c</text>
    <rect x="150" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="173" y="18" text-anchor="middle">a</text>
    <rect x="200" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="223" y="18" text-anchor="middle" class="dg-index">b</text>
    <rect x="250" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="273" y="18" text-anchor="middle" class="dg-index">c</text>
    <rect x="300" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="323" y="18" text-anchor="middle" class="dg-index">b</text>
    <rect x="350" y="0" width="46" height="26" rx="3" class="dg-cell-idle"/><text x="373" y="18" text-anchor="middle" class="dg-index">b</text>
    <text x="73"  y="46" text-anchor="middle" class="dg-ptr2">L</text>
    <text x="173" y="46" text-anchor="middle" class="dg-ptr">R</text>
    <text x="420" y="18" class="dg-good">valid again, length 3</text>
  </g>

  <line x1="0" y1="232" x2="700" y2="232" class="dg-guide"/>
  <text x="0" y="254" class="dg-note">L never moves backwards. Its total travel across the whole run is at most n &#8212;</text>
  <text x="0" y="270" class="dg-note">which is why the nested-looking loop is still O(n).</text>
</svg>`,
    walkthrough: [
      {
        heading: "What a window is, and why it saves work",
        body: [
          "A window is a contiguous range of the array, tracked by two indices. The pattern applies whenever you are asked about the best or the count of contiguous subarrays or substrings satisfying some condition — the words 'contiguous', 'subarray', 'substring' and 'consecutive' are the tell.",
          "The brute-force approach recomputes each candidate range from scratch, giving O(n²) ranges times O(n) to evaluate each. Sliding window exploits the fact that consecutive ranges overlap almost entirely: moving from [i, j] to [i, j+1] adds one element and removes none. If you can update your running answer in O(1) when an element enters or leaves, the whole scan costs O(n).",
          "That last condition is the real requirement, and it is what disqualifies some problems. Maintaining a sum is easy — add on entry, subtract on exit. Maintaining a maximum is not, because when the maximum leaves the window you have no idea what the new one is; that is why sliding-window-maximum needs a monotonic deque rather than a plain variable.",
        ],
      },
      {
        heading: "Fixed size vs variable size",
        body: [
          "Fixed-size windows are the simpler case. The window is always exactly k wide, so every step adds the element entering on the right and removes the one leaving on the left, in lockstep. Maximum sum of any k consecutive elements is the canonical example, and the code is a single loop with no inner loop at all.",
          "Variable-size windows are the interesting case and the one interviews favour. The window grows and shrinks according to a condition rather than a fixed width. The structure is always the same three moves: expand the right edge by one, then while the window is invalid, shrink from the left, then record the answer. Everything specific to the problem lives in what 'invalid' means and what you record.",
        ],
        trace: `THE VARIABLE-SIZE TEMPLATE

  left = 0
  for right in 0..n-1:
      add arr[right] to the window state

      while window is INVALID:
          remove arr[left] from the state
          left += 1

      record the answer for [left, right]

Three moves, always in that order. Only two
lines ever change between problems:
the invalid condition, and what you record.`,
      },
      {
        heading: "The amortised argument",
        body: [
          "A while loop inside a for loop looks quadratic, and this is the single most common misreading of the pattern. It is linear, and the reason is worth being able to state precisely.",
          "The left pointer only ever moves forward. It starts at 0, it never decreases, and it can never pass the right pointer. So across the entire run — not per iteration, across the whole algorithm — it advances at most n times in total. The outer loop contributes n steps, the inner loop contributes at most n steps in aggregate, and the total is at most 2n operations, which is O(n).",
          "The word for this is amortised. Some individual iterations of the outer loop do a lot of shrinking, but they can only do so by consuming budget that other iterations then cannot use. Monotonic stacks are linear for exactly the same reason, with pops in place of shrinks.",
        ],
        aside:
          "In an interview, say this out loud: 'the inner loop looks like it makes this quadratic, but left only moves forward so its total travel is bounded by n — the whole thing is O(n).' It is the sentence that distinguishes understanding the pattern from having memorised it.",
      },
      {
        heading: "Choosing the window state",
        body: [
          "The state is whatever you need to answer 'is this window valid?' in constant time. Picking it correctly is most of the work.",
          "A running sum works for 'subarray with sum at most k'. A hash map from character to count works for 'at most k distinct characters' — the map size is the distinct count. A hash map from character to its last index works for 'no repeats', letting you jump the left pointer straight past the previous occurrence rather than shrinking one step at a time. A count of how many required characters are still unsatisfied works for minimum-window-substring.",
          "The test is whether entry and exit are both O(1). If removing an element forces you to rescan the window to recompute the state, you have chosen wrong and the complexity is back to quadratic.",
        ],
      },
      {
        heading: "Counting subarrays, and the at-most trick",
        body: [
          "A family of problems asks how many subarrays satisfy a condition, rather than for the longest one. There is a small idea here that makes them easy.",
          "First, when the window [left, right] is valid, the number of valid subarrays ending at right is right minus left plus one — every start position from left through right works. Summing that over all right values counts everything, in one pass.",
          "Second, when the condition is 'exactly k' rather than 'at most k', direct counting is awkward because the window has no clean validity rule. The trick is that exactly(k) equals atMost(k) minus atMost(k-1). Write the at-most version once, call it twice. Subarrays with exactly k distinct integers, and binary subarrays with exactly k ones, both fall out of this immediately.",
        ],
        trace: `Counting subarrays with sum <= 5:  [1, 2, 1, 3]

  right=0  window [1]        left=0  → 0-0+1 = 1 subarray
  right=1  window [1,2]      left=0  → 1-0+1 = 2 subarrays
  right=2  window [1,2,1]    left=0  → 2-0+1 = 3 subarrays
  right=3  sum 7 > 5 → shrink to [2,1,3]? still 6 > 5
                       shrink to [1,3]  = 4  ✓  left=2
                                        → 3-2+1 = 2 subarrays

  total = 1 + 2 + 3 + 2 = 8

Every valid window contributes (right-left+1)
subarrays, all of which end at 'right'.`,
      },
      {
        heading: "When it does not apply",
        body: [
          "Two disqualifiers are worth checking before you commit. First, the target must be contiguous. If the problem allows skipping elements — subsequence rather than subarray — sliding window cannot express it, and you are usually in dynamic programming territory.",
          "Second, with negative numbers the 'shrink while too large' logic breaks for sum-based conditions. Adding an element can decrease the sum, so the window's validity is no longer monotonic in its width, and shrinking may not help. Subarray-sum-equals-k with negative values is solved with a prefix-sum hash map instead, which is the next topic.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// FIXED size: add the entering element, remove the leaving one, in lockstep.
long long maxSumOfK(const vector<int>& arr, int k) {
    long long sum = 0, best = LLONG_MIN;
    for (int i = 0; i < (int)arr.size(); ++i) {
        sum += arr[i];
        if (i >= k) sum -= arr[i - k];       // element leaving the window
        if (i >= k - 1) best = max(best, sum);
    }
    return best;
}

// VARIABLE size: expand, shrink while invalid, record.
// Longest substring with no repeated character.
int longestUnique(const string& s) {
    vector<int> last(128, -1);
    int left = 0, best = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        // Jump left straight past the previous occurrence rather than
        // shrinking one step at a time.
        if (last[s[right]] >= left) left = last[s[right]] + 1;
        last[s[right]] = right;
        best = max(best, right - left + 1);
    }
    return best;
}

// Minimum window substring: state is "how many required chars are still
// unsatisfied". Expand until satisfied, then shrink as far as it stays so.
string minWindow(const string& s, const string& t) {
    if (t.empty() || s.size() < t.size()) return "";
    vector<int> need(128, 0);
    for (char c : t) ++need[c];

    int missing = (int)t.size(), left = 0, bestLen = INT_MAX, bestStart = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        if (need[s[right]]-- > 0) --missing;      // this char was still needed
        while (missing == 0) {                    // valid - try to shrink
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1;
                bestStart = left;
            }
            if (++need[s[left]] > 0) ++missing;   // giving one back breaks it
            ++left;
        }
    }
    return bestLen == INT_MAX ? "" : s.substr(bestStart, bestLen);
}

// COUNTING: subarrays with at most k distinct values.
long long atMostKDistinct(const vector<int>& arr, int k) {
    unordered_map<int,int> count;
    long long total = 0;
    int left = 0;
    for (int right = 0; right < (int)arr.size(); ++right) {
        ++count[arr[right]];
        while ((int)count.size() > k)
            if (--count[arr[left++]] == 0) count.erase(arr[left - 1]);
        total += right - left + 1;    // every start in [left, right] works
    }
    return total;
}

// "Exactly k" is the difference of two "at most" runs.
long long exactlyKDistinct(const vector<int>& arr, int k) {
    return atMostKDistinct(arr, k) - atMostKDistinct(arr, k - 1);
}`,
  },

  "array-prefix-sum": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Prefix sums built once, then a range sum answered by subtracting two of them">
  <text x="0" y="14" class="dg-title">Build once in O(n), then every range sum is O(1)</text>

  <text x="0" y="48" class="dg-label">array</text>
  <g transform="translate(90,34)">
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="26"  y="18" text-anchor="middle">3</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="82"  y="18" text-anchor="middle">1</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="138" y="18" text-anchor="middle">4</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="194" y="18" text-anchor="middle">1</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="250" y="18" text-anchor="middle">5</text>
    <rect x="280" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="306" y="18" text-anchor="middle">9</text>
    <text x="26"  y="-6" text-anchor="middle" class="dg-index">0</text>
    <text x="82"  y="-6" text-anchor="middle" class="dg-index">1</text>
    <text x="138" y="-6" text-anchor="middle" class="dg-index">2</text>
    <text x="194" y="-6" text-anchor="middle" class="dg-index">3</text>
    <text x="250" y="-6" text-anchor="middle" class="dg-index">4</text>
    <text x="306" y="-6" text-anchor="middle" class="dg-index">5</text>
    <text x="360" y="18" class="dg-note">sum of [2..4] = ?</text>
  </g>

  <text x="0" y="120" class="dg-label">prefix</text>
  <g transform="translate(90,106)">
    <rect x="-56" y="0" width="52" height="26" rx="3" class="dg-cell-idle"/><text x="-30" y="18" text-anchor="middle">0</text>
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="26"  y="18" text-anchor="middle">3</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell-mark"/><text x="82"  y="18" text-anchor="middle">4</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="138" y="18" text-anchor="middle">8</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="194" y="18" text-anchor="middle">9</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-mark"/><text x="250" y="18" text-anchor="middle">14</text>
    <rect x="280" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="306" y="18" text-anchor="middle">23</text>
    <text x="-30" y="-6" text-anchor="middle" class="dg-index">P0</text>
    <text x="26"  y="-6" text-anchor="middle" class="dg-index">P1</text>
    <text x="82"  y="-6" text-anchor="middle" class="dg-index">P2</text>
    <text x="138" y="-6" text-anchor="middle" class="dg-index">P3</text>
    <text x="194" y="-6" text-anchor="middle" class="dg-index">P4</text>
    <text x="250" y="-6" text-anchor="middle" class="dg-index">P5</text>
    <text x="306" y="-6" text-anchor="middle" class="dg-index">P6</text>
    <text x="-56" y="48" class="dg-label">P[i] = sum of the first i elements &#8212; note the leading 0</text>
  </g>

  <line x1="0" y1="188" x2="700" y2="188" class="dg-guide"/>

  <g transform="translate(90,206)">
    <rect x="0" y="0" width="336" height="30" rx="3" class="dg-cell-live"/>
    <text x="168" y="20" text-anchor="middle" class="dg-note">P5 = 14 &#8212; everything up to index 4</text>
    <rect x="0" y="38" width="112" height="30" rx="3" class="dg-cell-mark"/>
    <text x="56" y="58" text-anchor="middle" class="dg-note">P2 = 4</text>
    <text x="130" y="58" class="dg-good">14 &#8722; 4 = 10 = 4 + 1 + 5 &#10003;</text>
  </g>

  <text x="0" y="292" class="dg-note">sum(l..r) = P[r+1] &#8722; P[l]. The leading zero is what makes l = 0 need no special case.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Trading one pass for constant-time queries",
        body: [
          "Summing a range of an array costs O(n) each time you do it. If you are asked for many range sums, that repeated work is the whole cost of the problem — a hundred thousand queries on a hundred thousand elements is ten billion operations.",
          "A prefix sum array precomputes, for every position, the sum of everything before it. Building it takes one pass. After that, the sum of any range is the difference of two entries, in constant time. The trade is O(n) extra memory and one preprocessing pass, and it pays for itself from about the second query onwards.",
          "The build itself is a single line: each entry is the previous entry plus the current element. That is a running total, and the fact that it is so simple is why prefix sums show up as a component inside larger algorithms rather than as an answer on their own.",
        ],
      },
      {
        heading: "The leading zero, and why it removes a special case",
        body: [
          "There are two conventions and one of them is much better. You can define P[i] as the sum of elements 0 through i inclusive, which makes the range sum P[r] minus P[l-1] — and that breaks when l is 0, forcing a conditional every time you use it.",
          "Or you define P as one element longer, with P[0] equal to 0 and P[i] equal to the sum of the first i elements. Then the range sum for [l, r] is P[r+1] minus P[l], with no special case at all: when l is 0 you subtract P[0], which is zero, which is correct.",
          "Always use the second convention. The extra element costs nothing and removes an entire class of off-by-one bug. The same padding idea recurs in DP tables and Fenwick trees for exactly the same reason.",
        ],
        aside:
          "Sum types overflow. In C++ a prefix array over 10⁵ elements of magnitude 10⁹ will exceed a 32-bit int at around the hundredth entry. Use long long. This is one of the most common silent wrong-answer causes in competitive programming.",
      },
      {
        heading: "The hash map extension — subarrays summing to k",
        body: [
          "This is where prefix sums become genuinely powerful, and it is a very common interview question. You want the number of subarrays summing to exactly k, and the array may contain negatives, which rules out sliding window.",
          "Rearrange the range formula. The sum of [l, r] equals P[r+1] minus P[l], so asking for a subarray ending at r with sum k is asking whether some earlier prefix equals P[r+1] minus k. So walk the array keeping a running prefix sum and a hash map counting how many times each prefix value has been seen. At each position, look up currentPrefix minus k in the map and add its count to your answer, then record the current prefix.",
          "One detail decides correctness: seed the map with prefix 0 having count 1, before the loop starts. That represents the empty prefix, and without it you miss every subarray that starts at index 0. The same trick handles 'count subarrays divisible by k' by keying on the prefix modulo k instead of the prefix itself.",
        ],
        trace: `Count subarrays summing to 3:  [1, 2, -1, 2, 1]

  map = {0: 1}          ← the empty prefix, seeded
  prefix = 0, count = 0

  x=1   prefix=1   need 1-3 = -2   not present
                   map = {0:1, 1:1}
  x=2   prefix=3   need 3-3 =  0   seen once  → count = 1
                   map = {0:1, 1:1, 3:1}
  x=-1  prefix=2   need 2-3 = -1   not present
                   map = {0:1, 1:1, 3:1, 2:1}
  x=2   prefix=4   need 4-3 =  1   seen once  → count = 2
                   map = {..., 4:1}
  x=1   prefix=5   need 5-3 =  2   seen once  → count = 3

  answer 3:  [1,2]  [2,-1,2]  [2,1]`,
      },
      {
        heading: "Two dimensions",
        body: [
          "The same idea extends to a grid, where P[i][j] holds the sum of the whole rectangle from the origin to that cell. Building it uses inclusion-exclusion: the cell's own value, plus the rectangle above, plus the rectangle to the left, minus the one counted twice where they overlap.",
          "Querying reverses the same logic. The sum of an arbitrary rectangle is the big corner rectangle, minus the strip above it, minus the strip to its left, plus the top-left block that both subtractions removed. Four array lookups, constant time, however large the rectangle.",
          "Getting the signs right is the only difficulty, and drawing the four rectangles on paper once is faster than reasoning about it abstractly. As with 1D, pad with a zero row and column so edge rectangles need no special handling.",
        ],
        trace: `2D query — sum of the rectangle (r1,c1) to (r2,c2):

     c1        c2
      ┌─────────┐
  r1  │  ┌──────┤        = P[r2+1][c2+1]
      │  │ WANT │          − P[r1  ][c2+1]   (strip above)
  r2  │  └──────┤          − P[r2+1][c1  ]   (strip left)
      └─────────┘          + P[r1  ][c1  ]   (added back:
                                              removed twice)`,
      },
      {
        heading: "Difference arrays — the same idea inverted",
        body: [
          "The mirror image is worth knowing, because it solves a problem that looks unrelated. Suppose you must apply many range updates — add v to everything in [l, r] — and only read the array once at the end. Doing each update directly is O(n) per update.",
          "Instead keep a difference array D, where applying an update means adding v at index l and subtracting v at index r+1. Each update is two operations regardless of the range's width. At the end, take the prefix sum of D and you have the final array. The plus and minus mark where a contribution begins and ends, and the prefix sum accumulates whatever is currently active.",
          "This is exactly the sweep-line idea from interval problems in different clothing, and it is the standard answer to 'apply these hundred thousand range increments'. Corporate flight bookings and car-pooling problems are both this in one line.",
        ],
      },
      {
        heading: "Choosing between this and a Fenwick tree",
        body: [
          "A prefix sum array assumes the underlying data does not change. The moment you update a single element, every prefix from that point onwards is stale, and rebuilding costs O(n) — so a workload mixing updates and queries degrades badly.",
          "If both updates and range queries are frequent, you want a Fenwick tree instead: O(log n) for each, covered in stage 6. The decision rule is simple. Static data with many queries: prefix sums, because O(1) queries beat O(log n) and the code is three lines. Mutable data: Fenwick tree. Range updates with a single read at the end: difference array.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Build with a leading zero, so l = 0 needs no special case.
// long long matters: 1e5 elements of size 1e9 overflows int immediately.
vector<long long> buildPrefix(const vector<int>& arr) {
    vector<long long> p(arr.size() + 1, 0);
    for (size_t i = 0; i < arr.size(); ++i) p[i + 1] = p[i] + arr[i];
    return p;
}

// Sum over [l, r] inclusive, in O(1).
long long rangeSum(const vector<long long>& p, int l, int r) {
    return p[r + 1] - p[l];
}

// Count subarrays summing to exactly k. Works with negatives, which
// rules out sliding window. Seed {0: 1} for the empty prefix.
long long countSubarraysWithSum(const vector<int>& arr, long long k) {
    unordered_map<long long, int> seen{{0, 1}};
    long long prefix = 0, count = 0;
    for (int x : arr) {
        prefix += x;
        auto it = seen.find(prefix - k);
        if (it != seen.end()) count += it->second;
        ++seen[prefix];
    }
    return count;
}

// Subarrays whose sum is divisible by k - key on the residue instead.
// The +k %k keeps the residue non-negative for negative prefixes.
long long countDivisibleByK(const vector<int>& arr, int k) {
    vector<int> seen(k, 0);
    seen[0] = 1;
    long long prefix = 0, count = 0;
    for (int x : arr) {
        prefix += x;
        int r = (int)(((prefix % k) + k) % k);
        count += seen[r]++;
    }
    return count;
}

// 2D prefix sums - inclusion-exclusion in both directions.
vector<vector<long long>> build2D(const vector<vector<int>>& g) {
    int n = (int)g.size(), m = (int)g[0].size();
    vector<vector<long long>> p(n + 1, vector<long long>(m + 1, 0));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            p[i+1][j+1] = g[i][j] + p[i][j+1] + p[i+1][j] - p[i][j];
    return p;
}

long long rectSum(const vector<vector<long long>>& p,
                  int r1, int c1, int r2, int c2) {
    return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1];
}

// DIFFERENCE ARRAY - many range updates, one read at the end.
// Each update is O(1) regardless of how wide the range is.
struct Difference {
    vector<long long> d;
    explicit Difference(int n) : d(n + 1, 0) {}

    void add(int l, int r, long long v) {   // add v to [l, r]
        d[l] += v;
        d[r + 1] -= v;                      // contribution stops here
    }

    vector<long long> finish() {            // prefix sum to materialise it
        vector<long long> out(d.size() - 1);
        long long running = 0;
        for (size_t i = 0; i + 1 < d.size(); ++i) out[i] = (running += d[i]);
        return out;
    }
};`,
  },
};
