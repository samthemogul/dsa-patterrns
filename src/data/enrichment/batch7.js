/**
 * Enrichment batch 7 — Stage 4, part two: the DP core and divide and conquer.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "dp-kadane": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Kadane's running best at each index, dropping the prefix whenever it turns negative">
  <text x="0" y="14" class="dg-title">best ending here = max(x, best ending here + x)</text>

  <g transform="translate(40,36)">
    <text x="-32" y="18" class="dg-label">x</text>
    <rect x="0"   y="0" width="70" height="26" rx="3" class="dg-cell"/><text x="35"  y="18" text-anchor="middle">&#8722;2</text>
    <rect x="76"  y="0" width="70" height="26" rx="3" class="dg-cell-live"/><text x="111" y="18" text-anchor="middle">1</text>
    <rect x="152" y="0" width="70" height="26" rx="3" class="dg-cell"/><text x="187" y="18" text-anchor="middle">&#8722;3</text>
    <rect x="228" y="0" width="70" height="26" rx="3" class="dg-cell-hit"/><text x="263" y="18" text-anchor="middle">4</text>
    <rect x="304" y="0" width="70" height="26" rx="3" class="dg-cell-hit"/><text x="339" y="18" text-anchor="middle">&#8722;1</text>
    <rect x="380" y="0" width="70" height="26" rx="3" class="dg-cell-hit"/><text x="415" y="18" text-anchor="middle">2</text>
    <rect x="456" y="0" width="70" height="26" rx="3" class="dg-cell-hit"/><text x="491" y="18" text-anchor="middle">1</text>
    <rect x="532" y="0" width="70" height="26" rx="3" class="dg-cell"/><text x="567" y="18" text-anchor="middle">&#8722;5</text>

    <text x="-32" y="60" class="dg-label">best</text>
    <text x="35"  y="60" text-anchor="middle" class="dg-note">&#8722;2</text>
    <text x="111" y="60" text-anchor="middle" class="dg-note">1</text>
    <text x="187" y="60" text-anchor="middle" class="dg-note">&#8722;2</text>
    <text x="263" y="60" text-anchor="middle" class="dg-note">4</text>
    <text x="339" y="60" text-anchor="middle" class="dg-note">3</text>
    <text x="415" y="60" text-anchor="middle" class="dg-note">5</text>
    <text x="491" y="60" text-anchor="middle" class="dg-good">6</text>
    <text x="567" y="60" text-anchor="middle" class="dg-note">1</text>

    <text x="-32" y="86" class="dg-label">action</text>
    <text x="35"  y="86" text-anchor="middle" class="dg-index">start</text>
    <text x="111" y="86" text-anchor="middle" class="dg-ptr">restart</text>
    <text x="187" y="86" text-anchor="middle" class="dg-index">extend</text>
    <text x="263" y="86" text-anchor="middle" class="dg-ptr">restart</text>
    <text x="339" y="86" text-anchor="middle" class="dg-index">extend</text>
    <text x="415" y="86" text-anchor="middle" class="dg-index">extend</text>
    <text x="491" y="86" text-anchor="middle" class="dg-index">extend</text>
    <text x="567" y="86" text-anchor="middle" class="dg-index">extend</text>
  </g>

  <line x1="0" y1="150" x2="700" y2="150" class="dg-guide"/>

  <g transform="translate(40,170)">
    <rect x="228" y="0" width="298" height="30" rx="3" class="dg-cell-hit"/>
    <text x="377" y="20" text-anchor="middle" class="dg-note">[4, &#8722;1, 2, 1] &#8594; sum 6</text>
    <text x="0" y="20" class="dg-label">the winning window</text>
  </g>

  <text x="0" y="250" class="dg-note">A restart happens exactly when the running total has gone negative &#8212; a negative prefix</text>
  <text x="0" y="268" class="dg-note">can only drag down whatever follows it, so drop it and begin again from the current element.</text>
  <text x="0" y="292" class="dg-note">Seed from nums[0], never from 0: on an all-negative array the answer is the least-bad element.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The recurrence, and why it is only one line",
        body: [
          "The question is the maximum sum over all contiguous subarrays. There are O(n²) of them, so checking each is too slow. Kadane's reframes it: instead of considering every subarray, consider only the best subarray ending at each index.",
          "That reframing is the whole trick, because there are only n such subarrays, and each one has exactly two candidates. The best subarray ending at index i is either the element alone, or the best subarray ending at i-1 extended by this element. Nothing else is possible — any subarray ending at i either starts at i or continues something ending at i-1.",
          "So best[i] = max(nums[i], best[i-1] + nums[i]). Take the maximum over all i and you have the answer. The DP table collapses to a single variable because the recurrence only reaches back one step.",
        ],
      },
      {
        heading: "Reading it as a decision",
        body: [
          "The max in that line is a choice between extending and restarting, and it is worth reading in plain language: if the running total from the left is negative, it can only hurt whatever comes next, so drop it and start fresh from the current element.",
          "That is why the restart condition is exactly 'the previous running total was negative'. A positive running total is always worth keeping, however small, because adding it to the current element beats the element alone. A negative one is always worth abandoning.",
          "Once you see it as 'drop a negative prefix', the algorithm stops feeling like a formula. It also explains why Kadane's has no notion of subarray length — it never needs to know where the current run started, only whether keeping it helps.",
        ],
        aside:
          "Initialise both variables to nums[0], not to 0. Seeding at 0 silently assumes the empty subarray is allowed, so an all-negative array returns 0 instead of its largest element. This is the most common Kadane bug and it only shows on one class of input.",
      },
      {
        heading: "Recovering the subarray itself",
        body: [
          "Plenty of problems want the indices, not just the sum. The extension is small: track where the current run started, and whenever the running total restarts, move that start marker to the current index.",
          "The bookkeeping detail that catches people is when to commit. Update the best-so-far indices only at the moment the running total exceeds the previous best — not on every iteration, and not when you restart. Otherwise you record the start of a run that never turned out to be the winner.",
          "Written carefully this is still one pass and O(1) space. The structure is identical to the plain version with three extra variables: current start, best start, best end.",
        ],
      },
      {
        heading: "Maximum product — where a second variable is needed",
        body: [
          "The product version looks like a trivial substitution and is not. With sums, a bigger running total is always better. With products, a large negative running value is valuable, because the next negative element flips it to a large positive.",
          "So you track two running values: the maximum product ending here and the minimum product ending here. When the current element is negative, the roles swap — today's minimum becomes the best candidate for tomorrow's maximum — so exchange them before updating.",
          "Zeros handle themselves: multiplying either running value by zero gives zero, and the max-against-the-element-alone term restarts the run at the next non-zero element. No special case is needed, which is a good sign the formulation is right.",
        ],
        trace: `Maximum product of [2, −3, −4]

  x = 2    hi = 2         lo = 2
  x = −3   negative → swap hi and lo first
           hi = max(−3, 2·−3)  = −3
           lo = min(−3, 2·−3)  = −6
  x = −4   negative → swap: hi = −6, lo = −3
           hi = max(−4, −6·−4) = 24   ←
           lo = min(−4, −3·−4) = −4

  answer 24, from the running MINIMUM of −6
  becoming the maximum two steps later.`,
      },
      {
        heading: "The circular variant",
        body: [
          "When the array wraps around, the best subarray is one of two shapes. Either it does not cross the boundary, in which case plain Kadane's finds it. Or it does cross, in which case the elements it excludes form a contiguous non-wrapping block — so its sum is the total minus the minimum subarray sum.",
          "So run Kadane's twice, once maximising and once minimising, and take the larger of the plain maximum and total-minus-minimum.",
          "There is one edge case that must be handled explicitly. If every element is negative, the minimum subarray is the entire array, so total minus minimum is zero — which corresponds to selecting nothing. Since the subarray must be non-empty, fall back to the plain Kadane answer whenever the maximum is negative.",
        ],
      },
      {
        heading: "Where the pattern generalises",
        body: [
          "Kadane's is the one-dimensional case of a broader idea: when the answer at each position depends only on the answer at the previous position, the DP table collapses to a constant number of variables.",
          "The two-dimensional application is worth knowing. Maximum sum submatrix fixes a pair of column boundaries, compresses the rows between them into a single array of row sums, and runs Kadane's down it. Iterating over all O(n²) column pairs with an O(n) Kadane inside gives O(n³) — far better than the O(n⁶) of checking every submatrix directly.",
          "The framing also transfers to problems phrased differently. Best Time to Buy and Sell Stock is Kadane's over the daily differences; the maximum profit is the maximum-sum contiguous run of price changes.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Maximum subarray sum. Seed from nums[0] - starting at 0 would assume
// the empty subarray is allowed and break on all-negative input.
int maxSubarray(const vector<int>& nums) {
    int bestHere = nums[0], bestOverall = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        // extend the run, or abandon a negative prefix and restart
        bestHere = max(nums[i], bestHere + nums[i]);
        bestOverall = max(bestOverall, bestHere);
    }
    return bestOverall;
}

// With the indices. Commit the best-so-far range only when the running
// total actually beats it - not on every iteration.
tuple<int,int,int> maxSubarrayRange(const vector<int>& nums) {
    int bestHere = nums[0], bestOverall = nums[0];
    int start = 0, bestStart = 0, bestEnd = 0;

    for (int i = 1; i < (int)nums.size(); ++i) {
        if (nums[i] > bestHere + nums[i]) {
            bestHere = nums[i];
            start = i;                      // the run restarts here
        } else {
            bestHere += nums[i];
        }
        if (bestHere > bestOverall) {       // only now is it the winner
            bestOverall = bestHere;
            bestStart = start;
            bestEnd = i;
        }
    }
    return {bestOverall, bestStart, bestEnd};
}

// Maximum PRODUCT. A large negative running value is worth keeping,
// because the next negative element flips it positive - so track both.
int maxProduct(const vector<int>& nums) {
    int hi = nums[0], lo = nums[0], best = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        int x = nums[i];
        if (x < 0) swap(hi, lo);            // negatives exchange the roles
        hi = max(x, hi * x);
        lo = min(x, lo * x);
        best = max(best, hi);
    }
    return best;
}

// CIRCULAR: either the best run doesn't wrap (plain Kadane), or it does,
// and what it excludes is a contiguous block - total minus the MINIMUM.
int maxSubarrayCircular(const vector<int>& nums) {
    int total = 0;
    int maxHere = nums[0], maxAll = nums[0];
    int minHere = nums[0], minAll = nums[0];

    for (size_t i = 0; i < nums.size(); ++i) {
        total += nums[i];
        if (i == 0) continue;
        maxHere = max(nums[i], maxHere + nums[i]);
        maxAll  = max(maxAll, maxHere);
        minHere = min(nums[i], minHere + nums[i]);
        minAll  = min(minAll, minHere);
    }

    // All-negative: total - minAll is 0, meaning "take nothing", which is
    // not allowed. Fall back to the non-wrapping answer.
    if (maxAll < 0) return maxAll;
    return max(maxAll, total - minAll);
}

// 2D: fix a pair of columns, compress the rows between them into one
// array, and run Kadane down it. O(cols^2 * rows) instead of O(n^6).
int maxSumSubmatrix(const vector<vector<int>>& grid) {
    int rows = (int)grid.size(), cols = (int)grid[0].size();
    int best = INT_MIN;

    for (int left = 0; left < cols; ++left) {
        vector<int> rowSums(rows, 0);
        for (int right = left; right < cols; ++right) {
            for (int r = 0; r < rows; ++r) rowSums[r] += grid[r][right];
            best = max(best, maxSubarray(rowSums));
        }
    }
    return best;
}`,
  },

  "dp-knapsack-01": {
    illustration: `
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The 0/1 knapsack table filled row by row, with the two candidate cells for one entry highlighted">
  <text x="0" y="14" class="dg-title">capacity 5 &#183; items (weight, value): (2,3) (3,4) (4,5)</text>

  <g transform="translate(90,36)">
    <text x="-80" y="16" class="dg-label">capacity &#8594;</text>
    <text x="24"  y="16" text-anchor="middle" class="dg-index">0</text>
    <text x="80"  y="16" text-anchor="middle" class="dg-index">1</text>
    <text x="136" y="16" text-anchor="middle" class="dg-index">2</text>
    <text x="192" y="16" text-anchor="middle" class="dg-index">3</text>
    <text x="248" y="16" text-anchor="middle" class="dg-index">4</text>
    <text x="304" y="16" text-anchor="middle" class="dg-index">5</text>

    <text x="-80" y="46" class="dg-label">none</text>
    <rect x="0"   y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="80"  y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="112" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="136" y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="168" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="192" y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="224" y="26" width="48" height="26" rx="3" class="dg-cell-mark"/><text x="248" y="44" text-anchor="middle">0</text>
    <rect x="280" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="304" y="44" text-anchor="middle" class="dg-index">0</text>

    <text x="-80" y="82" class="dg-label">(2,3)</text>
    <rect x="0"   y="62" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="80" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="62" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="80"  y="80" text-anchor="middle" class="dg-index">0</text>
    <rect x="112" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="80" text-anchor="middle">3</text>
    <rect x="168" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="80" text-anchor="middle">3</text>
    <rect x="224" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="248" y="80" text-anchor="middle">3</text>
    <rect x="280" y="62" width="48" height="26" rx="3" class="dg-cell-mark"/><text x="304" y="80" text-anchor="middle">3</text>

    <text x="-80" y="118" class="dg-label">(3,4)</text>
    <rect x="0"   y="98" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="116" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="98" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="80"  y="116" text-anchor="middle" class="dg-index">0</text>
    <rect x="112" y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="116" text-anchor="middle">3</text>
    <rect x="168" y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="116" text-anchor="middle">4</text>
    <rect x="224" y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="248" y="116" text-anchor="middle">4</text>
    <rect x="280" y="98" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="304" y="116" text-anchor="middle">7</text>

    <text x="-80" y="154" class="dg-label">(4,5)</text>
    <rect x="0"   y="134" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="152" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="134" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="80"  y="152" text-anchor="middle" class="dg-index">0</text>
    <rect x="112" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="152" text-anchor="middle">3</text>
    <rect x="168" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="152" text-anchor="middle">4</text>
    <rect x="224" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="248" y="152" text-anchor="middle">5</text>
    <rect x="280" y="134" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="304" y="152" text-anchor="middle">7</text>
  </g>

  <g transform="translate(430,60)">
    <rect x="0" y="0" width="264" height="130" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-note">Filling row (3,4), capacity 5:</text>
    <text x="14" y="48" class="dg-note">SKIP&#160;&#8594; the cell above = 3</text>
    <text x="14" y="72" class="dg-note">TAKE&#160;&#8594; 4 + above at capacity 5&#8722;3</text>
    <text x="14" y="92" class="dg-note">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;= 4 + 3 = 7</text>
    <text x="14" y="118" class="dg-good">max(3, 7) = 7&#160;&#160;&#8212; take it</text>
  </g>

  <line x1="0" y1="252" x2="700" y2="252" class="dg-guide"/>
  <text x="0" y="274" class="dg-note">Every cell asks one binary question: skip this item, or take it and drop to the reduced capacity.</text>
  <text x="0" y="294" class="dg-note">Collapsed to one row, the capacity loop MUST run backwards &#8212; forwards lets the same item be reused,</text>
  <text x="0" y="314" class="dg-note">which silently solves unbounded knapsack instead.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The shape, and why it is the whole family",
        body: [
          "You have n items, each with a weight and a value, and a bag of capacity W. Each item may be taken at most once — that 'at most once' is what the 0/1 refers to. Maximise the value carried.",
          "Every item presents exactly one binary decision, and the DP writes that decision down directly. Define dp[i][w] as the best value using the first i items with capacity w. Then dp[i][w] is the better of two options: skip item i, leaving dp[i-1][w]; or take it, giving value[i] plus dp[i-1][w - weight[i]], provided it fits.",
          "That take-it-or-leave-it structure is the reason this topic matters more than the literal knapsack problem. Once you can see it, a lot of problems that mention no bag at all turn out to be knapsack in disguise.",
        ],
      },
      {
        heading: "Why the previous row specifically",
        body: [
          "Notice that both branches read from row i-1, never from row i. That is not an accident — it is what enforces the at-most-once rule.",
          "Reading dp[i-1][w - weight[i]] means 'the best I could do with the remaining capacity, using only items before this one'. If it read dp[i][w - weight[i]] instead, that value might already include item i, and you would be taking it twice.",
          "That single index is the entire difference between 0/1 and unbounded knapsack. Change i-1 to i and you have permitted unlimited copies. Both versions are correct algorithms for different problems, which is why the bug is so easy to introduce and so hard to spot — nothing crashes, the answer is just wrong.",
        ],
      },
      {
        heading: "Collapsing to one row, and the reversed loop",
        body: [
          "Since each row only reads the row above, you do not need the whole table. One array of size W+1 suffices, updated in place as you sweep through the items.",
          "But now the direction of the capacity loop matters, and this is the classic knapsack trap. Iterating capacity upward means that by the time you reach capacity w, the entry at w - weight[i] has already been overwritten for the current item — so reading it gives you a value that may already include item i. That is reuse, which is the unbounded problem.",
          "Iterating capacity downward means w - weight[i] is a smaller index you have not touched yet this row, so it still holds the previous row's value. That is what you want.",
          "The rule is worth memorising as a pair: backwards for 0/1, forwards for unbounded. Same three lines of code, opposite loop direction, two different problems.",
        ],
        trace: `One row, item (weight 2, value 3), capacity 4.

FORWARD (wrong for 0/1):
  dp = [0, 0, 0, 0, 0]
  w=2: dp[2] = max(0, 3 + dp[0]=0) = 3
  w=3: dp[3] = max(0, 3 + dp[1]=0) = 3
  w=4: dp[4] = max(0, 3 + dp[2]=3) = 6   ← took it TWICE

BACKWARD (correct):
  w=4: dp[4] = max(0, 3 + dp[2]=0) = 3
  w=3: dp[3] = max(0, 3 + dp[1]=0) = 3
  w=2: dp[2] = max(0, 3 + dp[0]=0) = 3

  dp[2] is still 0 when w=4 reads it, because
  the sweep hasn't reached index 2 yet.`,
        aside:
          "If your 0/1 knapsack returns a value that is too high, check the capacity loop direction before anything else. Forward iteration is the cause in the large majority of cases.",
      },
      {
        heading: "Pseudo-polynomial, and what that means",
        body: [
          "The complexity is O(nW), which looks polynomial and is not. The distinction matters and interviewers do ask.",
          "Polynomial means polynomial in the *size* of the input. The capacity W contributes only log W bits to the input — writing the number 1,000,000,000 takes about 30 bits. So O(nW) is exponential in the number of bits used to express W, and the term for this is pseudo-polynomial.",
          "The practical consequence: knapsack with 10 items and a capacity of a billion is intractable, while knapsack with 10,000 items and a capacity of 1,000 is trivial. The item count is almost never the limiting factor; the capacity is. If a problem gives a huge capacity, this DP is not the intended solution — look for a greedy, a meet-in-the-middle, or a different state entirely.",
        ],
      },
      {
        heading: "The disguises",
        body: [
          "Partition Equal Subset Sum. Can this array be split into two halves with equal sums? If the total is odd, no. Otherwise it is knapsack with capacity total/2, asking for feasibility instead of maximum value — the table holds booleans, and the transition is an OR rather than a max.",
          "Target Sum. Assign a plus or minus to each number so the result equals a target. One line of algebra converts it: if P is the set assigned positive and N the set assigned negative, then P minus N equals the target and P plus N equals the total, so P equals (total + target) / 2. Count the subsets summing to that, which is the counting version of the same table.",
          "Ones and Zeroes. A knapsack with two capacity dimensions instead of one — the table gains an axis, and both dimensions iterate backwards.",
          "The general signal: a fixed budget, an all-or-nothing choice per item, and a question about the best or the count. If items can be taken repeatedly, it is the unbounded variant instead.",
        ],
      },
      {
        heading: "Recovering which items were chosen",
        body: [
          "The table gives the optimal value. When the question asks which items produced it, you need the full 2D table — the space-optimised row has discarded the information.",
          "Walk backwards from dp[n][W]. At each cell, compare it against dp[i-1][w], the value from skipping this item. If they are equal, item i was not needed, so move up a row. If they differ, item i must have been taken, so record it and move to dp[i-1][w - weight[i]].",
          "This is worth knowing as a general DP technique rather than a knapsack-specific one. Any DP built from a max or min over transitions can be reconstructed the same way: at each cell, work out which transition produced the stored value, and follow it back. The alternative is storing a parent pointer per cell during the fill, which uses more memory but avoids the reasoning.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// 2D table - clearest to read, and the only version that supports
// reconstructing which items were chosen.
int knapsack(const vector<int>& weight, const vector<int>& value, int capacity) {
    int n = (int)weight.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int w = 0; w <= capacity; ++w) {
            dp[i][w] = dp[i - 1][w];                       // skip item i
            if (weight[i - 1] <= w) {                      // or take it
                dp[i][w] = max(dp[i][w],
                               value[i - 1] + dp[i - 1][w - weight[i - 1]]);
            }
            // Note dp[i-1][...] on BOTH branches. Reading dp[i][...] here
            // would allow item i to be counted twice - that is unbounded.
        }
    }
    return dp[n][capacity];
}

// One row. The capacity loop MUST run downward: upward would read
// entries already updated for item i, i.e. reuse it.
int knapsack1D(const vector<int>& weight, const vector<int>& value, int capacity) {
    vector<int> dp(capacity + 1, 0);
    for (size_t i = 0; i < weight.size(); ++i)
        for (int w = capacity; w >= weight[i]; --w)        // <-- backwards
            dp[w] = max(dp[w], value[i] + dp[w - weight[i]]);
    return dp[capacity];
}

// Which items were taken. Needs the full table - the rolling row has
// thrown the information away.
vector<int> chosenItems(const vector<int>& weight, const vector<int>& value,
                        int capacity) {
    int n = (int)weight.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int w = 0; w <= capacity; ++w) {
            dp[i][w] = dp[i - 1][w];
            if (weight[i - 1] <= w)
                dp[i][w] = max(dp[i][w],
                               value[i - 1] + dp[i - 1][w - weight[i - 1]]);
        }

    vector<int> taken;
    for (int i = n, w = capacity; i > 0; --i) {
        if (dp[i][w] == dp[i - 1][w]) continue;    // value unchanged - skipped
        taken.push_back(i - 1);                    // differs - must be taken
        w -= weight[i - 1];
    }
    reverse(taken.begin(), taken.end());
    return taken;
}

// DISGUISE 1: Partition Equal Subset Sum - feasibility, not value.
// The table holds booleans and the transition is an OR.
bool canPartition(const vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (total % 2) return false;                   // odd never splits evenly
    int target = total / 2;

    vector<char> dp(target + 1, false);
    dp[0] = true;
    for (int x : nums)
        for (int w = target; w >= x; --w)          // backwards, as always
            dp[w] = dp[w] || dp[w - x];
    return dp[target];
}

// DISGUISE 2: Target Sum. If P is the positive-signed subset,
//   P − N = target  and  P + N = total   →   P = (total + target) / 2.
// Count subsets summing to P: the same table, summing instead of maxing.
int targetSum(const vector<int>& nums, int target) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    if (abs(target) > total || (total + target) % 2) return 0;
    int want = (total + target) / 2;

    vector<int> dp(want + 1, 0);
    dp[0] = 1;
    for (int x : nums)
        for (int w = want; w >= x; --w)
            dp[w] += dp[w - x];                    // COUNT, so add
    return dp[want];
}

// DISGUISE 3: Ones and Zeroes - two capacity dimensions. Both iterate
// backwards, for exactly the same reason as the single-dimension case.
int findMaxForm(const vector<string>& strs, int m, int n) {
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (const string& s : strs) {
        int zeros = (int)count(s.begin(), s.end(), '0');
        int ones  = (int)s.size() - zeros;
        for (int i = m; i >= zeros; --i)
            for (int j = n; j >= ones; --j)
                dp[i][j] = max(dp[i][j], 1 + dp[i - zeros][j - ones]);
    }
    return dp[m][n];
}`,
  },

  "dp-lcs": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The LCS grid for two strings, showing the diagonal step on a match and the max of two neighbours on a mismatch">
  <text x="0" y="14" class="dg-title">"ABCB" vs "BDCB" &#8212; longest common subsequence</text>

  <g transform="translate(70,34)">
    <text x="-56" y="18" class="dg-label">&#8595; a&#160;&#160;b &#8594;</text>
    <text x="24"  y="18" text-anchor="middle" class="dg-index">&#8212;</text>
    <text x="80"  y="18" text-anchor="middle" class="dg-index">B</text>
    <text x="136" y="18" text-anchor="middle" class="dg-index">D</text>
    <text x="192" y="18" text-anchor="middle" class="dg-index">C</text>
    <text x="248" y="18" text-anchor="middle" class="dg-index">B</text>

    <text x="-24" y="46" class="dg-index">&#8212;</text>
    <rect x="0"   y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="80"  y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="112" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="136" y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="168" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="192" y="44" text-anchor="middle" class="dg-index">0</text>
    <rect x="224" y="26" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="248" y="44" text-anchor="middle" class="dg-index">0</text>

    <text x="-24" y="82" class="dg-index">A</text>
    <rect x="0"   y="62" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="80" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="80" text-anchor="middle">0</text>
    <rect x="112" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="80" text-anchor="middle">0</text>
    <rect x="168" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="80" text-anchor="middle">0</text>
    <rect x="224" y="62" width="48" height="26" rx="3" class="dg-cell"/><text x="248" y="80" text-anchor="middle">0</text>

    <text x="-24" y="118" class="dg-index">B</text>
    <rect x="0"   y="98" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="116" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="98" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="80"  y="116" text-anchor="middle">1</text>
    <rect x="112" y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="116" text-anchor="middle">1</text>
    <rect x="168" y="98" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="116" text-anchor="middle">1</text>
    <rect x="224" y="98" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="248" y="116" text-anchor="middle">1</text>

    <text x="-24" y="154" class="dg-index">C</text>
    <rect x="0"   y="134" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="152" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="152" text-anchor="middle">1</text>
    <rect x="112" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="152" text-anchor="middle">1</text>
    <rect x="168" y="134" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="192" y="152" text-anchor="middle">2</text>
    <rect x="224" y="134" width="48" height="26" rx="3" class="dg-cell"/><text x="248" y="152" text-anchor="middle">2</text>

    <text x="-24" y="190" class="dg-index">B</text>
    <rect x="0"   y="170" width="48" height="26" rx="3" class="dg-cell-idle"/><text x="24"  y="188" text-anchor="middle" class="dg-index">0</text>
    <rect x="56"  y="170" width="48" height="26" rx="3" class="dg-cell"/><text x="80"  y="188" text-anchor="middle">1</text>
    <rect x="112" y="170" width="48" height="26" rx="3" class="dg-cell"/><text x="136" y="188" text-anchor="middle">1</text>
    <rect x="168" y="170" width="48" height="26" rx="3" class="dg-cell"/><text x="192" y="188" text-anchor="middle">2</text>
    <rect x="224" y="170" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="248" y="188" text-anchor="middle">3</text>
  </g>

  <g transform="translate(400,60)">
    <rect x="0" y="0" width="290" height="132" rx="4" class="dg-cell-idle"/>
    <text x="14" y="26" class="dg-note">MATCH&#160;&#160;&#8594; 1 + the DIAGONAL cell</text>
    <text x="14" y="46" class="dg-label">&#160;&#160;&#160;both characters are consumed</text>
    <text x="14" y="76" class="dg-note">MISMATCH &#8594; max(up, left)</text>
    <text x="14" y="96" class="dg-label">&#160;&#160;&#160;one of the two must be discarded</text>
    <text x="14" y="122" class="dg-good">answer 3 &#8212; "BCB"</text>
  </g>

  <line x1="0" y1="266" x2="700" y2="266" class="dg-guide"/>
  <text x="0" y="288" class="dg-note">Longest common SUBSTRING is the same grid with one change: a mismatch resets to 0 instead of</text>
  <text x="0" y="308" class="dg-note">inheriting a neighbour, because a substring cannot contain gaps.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The state and the two branches",
        body: [
          "A subsequence keeps the original order but may skip characters; a substring may not. LCS asks for the longest sequence appearing in both strings as a subsequence.",
          "The state is dp[i][j] — the LCS length of the first i characters of one string and the first j of the other. The transition asks one question: do the current characters match?",
          "If they match, both can be consumed together, and the answer extends the best result for everything before both of them: 1 plus dp[i-1][j-1], the diagonal. If they do not match, at least one of the two characters cannot be part of the answer at this position, so try discarding each and keep the better: max(dp[i-1][j], dp[i][j-1]).",
          "That is the whole recurrence. The grid fills row by row, each cell reading three already-computed neighbours, giving O(n·m) time and space.",
        ],
      },
      {
        heading: "Reading the three neighbours as decisions",
        body: [
          "It helps to attach a meaning to each direction rather than memorising indices. Moving up means discarding a character from the first string. Moving left means discarding one from the second. Moving diagonally means consuming one from each — which is only legal when they match.",
          "The mismatch branch takes a max because you genuinely do not know which discard is better, and the grid is cheap enough to try both. Notice it does not consider discarding both at once: that is dp[i-1][j-1], which can never exceed either of the two neighbours it is compared against, so including it would change nothing.",
          "The padding row and column of zeros represent comparing against an empty string, where the LCS is trivially zero. As with prefix sums, the padding removes what would otherwise be a special case at every edge.",
        ],
        aside:
          "Index the strings with i-1 and j-1, not i and j. The table is one larger than each string in both directions, so table cell (i, j) corresponds to characters at positions i-1 and j-1. Mixing these up produces an off-by-one that only shows on some inputs.",
      },
      {
        heading: "Substring is one character of difference",
        body: [
          "Longest common substring — contiguous — uses the same grid with a single change. On a match, still take 1 plus the diagonal. On a mismatch, set the cell to 0 rather than inheriting a neighbour.",
          "The reason is direct: a substring cannot contain a gap, so the moment the characters differ, any run ending at this pair is broken and its length is zero. Inheriting from a neighbour would be carrying forward a match that is no longer adjacent.",
          "The second consequence is that the answer is no longer in the bottom-right corner. The best substring can end anywhere, so you track a running maximum over the whole grid as you fill it. For LCS the corner is correct, because the subsequence is free to use anything before it.",
        ],
        trace: `SUBSEQUENCE vs SUBSTRING, mismatch branch

  common:      match  →  1 + dp[i-1][j-1]

  subsequence: mismatch →  max(dp[i-1][j], dp[i][j-1])
               gaps are allowed, so carry the
               best result forward

  substring:   mismatch →  0
               the run is broken; nothing before
               it is adjacent any more

  and the answer moves:
    subsequence → dp[n][m], the corner
    substring   → the max seen anywhere in the grid`,
      },
      {
        heading: "Reconstructing the subsequence",
        body: [
          "The grid gives the length. To recover the actual characters, walk backwards from the bottom-right corner, at each step working out which branch produced the stored value.",
          "If the characters at the current position match, that cell came from the diagonal, so record the character and move diagonally. If they do not match, move toward whichever neighbour holds the larger value — up if the value above is at least as large, left otherwise. Continue until you fall off an edge, then reverse what you collected.",
          "This requires the full grid, so it is incompatible with the two-row space optimisation. That is the standard trade: keep two rows when you only need the length, keep everything when you need the answer itself. Also worth saying explicitly — several distinct subsequences can share the maximum length, and this walk returns one of them, not all.",
        ],
      },
      {
        heading: "The reductions",
        body: [
          "LCS is worth learning well because a family of other questions collapses onto it with a line of arithmetic.",
          "Minimum deletions to make two strings equal: everything not in the common subsequence must go from both, so the answer is n plus m minus twice the LCS.",
          "Shortest common supersequence: the shortest string containing both as subsequences has length n plus m minus the LCS, since the shared part is written once instead of twice.",
          "Longest palindromic subsequence of a single string: it is the LCS of that string with its own reverse. This one is not obvious and is worth remembering outright — a palindromic subsequence reads the same forwards and backwards, which is exactly a subsequence shared with the reversal.",
          "Minimum insertions to make a string a palindrome: the length minus its longest palindromic subsequence, since every character not already in the palindrome needs a partner inserted.",
        ],
      },
      {
        heading: "Cost, and the space optimisation",
        body: [
          "Time is O(n·m) — every cell computed once with constant work — and there is no better general algorithm known for arbitrary strings. Space is O(n·m) for the full grid.",
          "When only the length is needed, each row depends solely on the row above, so two rows suffice, giving O(min(n, m)) space if you make the shorter string the inner dimension. The detail to get right in the rolling version is the diagonal: it must come from the previous row's earlier column, which means capturing that value before you overwrite it.",
          "For very long inputs there is Hirschberg's algorithm, which reconstructs the actual subsequence in O(min(n, m)) space by combining the rolling-row idea with divide and conquer. It is rarely required, but knowing it exists is a good answer to 'can you do better on space while still returning the subsequence'.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// LCS length. Match takes the diagonal; mismatch takes the better
// neighbour. The padding row and column represent the empty string.
int lcs(const string& a, const string& b) {
    int n = (int)a.size(), m = (int)b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (a[i - 1] == b[j - 1])                  // note i-1, not i
                dp[i][j] = 1 + dp[i - 1][j - 1];       // consume both
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);  // discard one
        }
    }
    return dp[n][m];
}

// The subsequence itself. Walk back from the corner, following whichever
// branch produced each value. Needs the full grid.
string lcsString(const string& a, const string& b) {
    int n = (int)a.size(), m = (int)b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1]) ? 1 + dp[i-1][j-1]
                                          : max(dp[i-1][j], dp[i][j-1]);

    string out;
    for (int i = n, j = m; i > 0 && j > 0; ) {
        if (a[i - 1] == b[j - 1]) { out += a[--i]; --j; }   // came diagonally
        else if (dp[i - 1][j] >= dp[i][j - 1]) --i;         // came from above
        else --j;                                           // came from the left
    }
    reverse(out.begin(), out.end());
    return out;
}

// Longest common SUBSTRING - contiguous, so a mismatch resets to 0 and
// the answer can end anywhere, not just at the corner.
int longestCommonSubstring(const string& a, const string& b) {
    int n = (int)a.size(), m = (int)b.size(), best = 0;
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                best = max(best, dp[i][j]);            // track as you go
            }
            // else it stays 0 - that reset is the only difference
    return best;
}

// Two rows, O(min(n, m)) space. The diagonal must be captured BEFORE
// the current cell is overwritten.
int lcsRolling(string a, string b) {
    if (a.size() < b.size()) swap(a, b);               // shorter goes inner
    vector<int> prev(b.size() + 1, 0), cur(b.size() + 1, 0);

    for (size_t i = 1; i <= a.size(); ++i) {
        for (size_t j = 1; j <= b.size(); ++j)
            cur[j] = (a[i-1] == b[j-1]) ? 1 + prev[j-1]
                                        : max(prev[j], cur[j-1]);
        swap(prev, cur);
    }
    return prev[b.size()];
}

// THE REDUCTIONS - each is one line on top of lcs().

// Everything outside the common part must go, from both strings.
int minDeletionsToMatch(const string& a, const string& b) {
    return (int)(a.size() + b.size()) - 2 * lcs(a, b);
}

// The shared part is written once instead of twice.
int shortestCommonSupersequence(const string& a, const string& b) {
    return (int)(a.size() + b.size()) - lcs(a, b);
}

// A palindromic subsequence is exactly one shared with the reversal.
int longestPalindromicSubsequence(const string& s) {
    string r(s.rbegin(), s.rend());
    return lcs(s, r);
}

// Every character not already in the palindrome needs a partner inserted.
int minInsertionsForPalindrome(const string& s) {
    return (int)s.size() - longestPalindromicSubsequence(s);
}`,
  },
};
