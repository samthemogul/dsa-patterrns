// Dynamic Programming
export const name = "Dynamic Programming";

export const topics = [
  {
    id: "dp-fundamentals",
    title: "DP Fundamentals",
    subtitle: "Dynamic Programming",
    summary: "Recursion plus a cache — memoisation, tabulation, and how to spot a DP problem.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "The universal rule: cost = number of distinct states x work per state. Get those two numbers and you have the complexity, whatever the problem.",
    },
    description:
      "Dynamic programming applies when a problem has two properties. Optimal substructure: the best answer for a problem is built from best answers to smaller subproblems. Overlapping subproblems: those smaller problems recur many times across the recursion tree. Without overlap you have divide and conquer; without optimal substructure you usually have greedy or search. There are two ways to write the same DP. Top-down memoisation is the recursion you would write anyway plus a cache — easiest to derive, and it only ever computes states it actually needs. Bottom-up tabulation fills a table in dependency order with no recursion — no stack limit and usually faster in practice, but you must work out the iteration order yourself. Neither is more 'real' than the other; write memoisation first to find the recurrence, then convert if you need the speed. Every DP is defined by four decisions: what a state is, what the transition between states is, what the base cases are, and which state holds the answer. Say those four out loud before writing a line of code.",
    useCases: [
      "Counting problems: how many ways to reach a target, climb stairs, or decode a string.",
      "Optimisation over choices: maximum profit, minimum cost, longest or shortest subsequence.",
      "Feasibility questions: can this set be partitioned, can this string be segmented into dictionary words.",
      "Any recursion where you notice the same arguments being computed twice — that is the signal to cache.",
      "Problems where a greedy choice is tempting but provably wrong, such as coin change with denominations like 1, 3, 4.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">fib(5) - the shaded nodes repeat</div>
        <div class="flex flex-col items-center">
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">fib(5)</div>
          <div class="flex space-x-4 mb-1">
            <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm">fib(4)</div>
            <div class="p-1 bg-red-200 border border-red-500 rounded-sm">fib(3)</div>
          </div>
          <div class="flex space-x-2 mb-1">
            <div class="p-1 bg-red-200 border border-red-500 rounded-sm">fib(3)</div>
            <div class="p-1 bg-red-200 border border-red-500 rounded-sm">fib(2)</div>
            <div class="p-1 bg-red-200 border border-red-500 rounded-sm">fib(2)</div>
            <div class="p-1 bg-gray-100 border rounded-sm">fib(1)</div>
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-2">Cache each state once: O(2<sup>n</sup>) &rarr; O(n)</div>
      </div>
    `,
    code: {
      python: `# The same DP written three ways. Climbing stairs: how many ways to
# reach step n taking 1 or 2 steps at a time?
#
#   state      : i = the step we are standing on
#   transition : ways(i) = ways(i-1) + ways(i-2)
#   base       : ways(0) = ways(1) = 1
#   answer     : ways(n)

# 1. Top-down memoisation - the recursion you'd write anyway, plus a cache.
def climb_memo(n):
    memo = {}
    def ways(i):
        if i <= 1:
            return 1
        if i not in memo:
            memo[i] = ways(i - 1) + ways(i - 2)
        return memo[i]
    return ways(n)

# 2. Bottom-up tabulation - same recurrence, filled in dependency order.
def climb_table(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# 3. Space-optimised - the recurrence only looks back two states, so
#    keep two variables instead of the whole table. O(n) time, O(1) space.
def climb_rolling(n):
    prev, cur = 1, 1
    for _ in range(2, n + 1):
        prev, cur = cur, prev + cur
    return cur`,
      typescript: `// The same DP written three ways.
//   state      : i = the step we are standing on
//   transition : ways(i) = ways(i-1) + ways(i-2)
//   base       : ways(0) = ways(1) = 1
//   answer     : ways(n)

// 1. Top-down memoisation
function climbMemo(n: number): number {
  const memo = new Map<number, number>();
  const ways = (i: number): number => {
    if (i <= 1) return 1;
    const hit = memo.get(i);
    if (hit !== undefined) return hit;
    const val = ways(i - 1) + ways(i - 2);
    memo.set(i, val);
    return val;
  };
  return ways(n);
}

// 2. Bottom-up tabulation
function climbTable(n: number): number {
  if (n <= 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

// 3. Space-optimised - only two previous states are ever needed.
function climbRolling(n: number): number {
  let prev = 1, cur = 1;
  for (let i = 2; i <= n; i++) [prev, cur] = [cur, prev + cur];
  return cur;
}`,
    },
    pitfalls: [
      "Writing code before naming the state. If you cannot say what dp[i] means in one sentence, you cannot debug it.",
      "Caching on an incomplete key. If the answer depends on two parameters, the cache key needs both — a common silent bug.",
      "Filling the table in the wrong order, so a transition reads a cell that has not been computed yet.",
      "Confusing 'number of ways' with 'best way'. Counting DPs sum their transitions; optimisation DPs take min or max.",
      "Space-optimising too early. Get the full table correct first, then collapse it — a rolling array is much harder to debug from scratch.",
      "Using memoisation on a state space deeper than the stack allows. Convert to tabulation when depth approaches 10^4 or so.",
    ],
    problems: {
      easy: [
        { name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
        { name: "Fibonacci Number", url: "https://leetcode.com/problems/fibonacci-number/" },
        { name: "Min Cost Climbing Stairs", url: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
        { name: "N-th Tribonacci Number", url: "https://leetcode.com/problems/n-th-tribonacci-number/" },
        { name: "Pascal's Triangle", url: "https://leetcode.com/problems/pascals-triangle/" },
      ],
      medium: [
        { name: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
        { name: "House Robber II", url: "https://leetcode.com/problems/house-robber-ii/" },
        { name: "Decode Ways", url: "https://leetcode.com/problems/decode-ways/" },
        { name: "Word Break", url: "https://leetcode.com/problems/word-break/" },
        { name: "Delete and Earn", url: "https://leetcode.com/problems/delete-and-earn/" },
      ],
      hard: [
        { name: "Frog Jump", url: "https://leetcode.com/problems/frog-jump/" },
        { name: "Student Attendance Record II", url: "https://leetcode.com/problems/student-attendance-record-ii/" },
      ],
    },
  },

  {
    id: "dp-kadane",
    title: "Kadane's Algorithm",
    subtitle: "Maximum Subarray",
    summary: "Maximum-sum contiguous subarray in one linear pass.",
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "One pass, two running variables. The DP table collapses to a single value because each state only depends on the one before it.",
    },
    description:
      "Kadane's algorithm finds the contiguous subarray with the largest sum in a single pass. The insight is a one-line recurrence: the best subarray ending at index i is either the element alone, or that element joined to the best subarray ending at i-1. Formally, best[i] = max(nums[i], best[i-1] + nums[i]). Since best[i] only ever looks at best[i-1], the table collapses to one variable, and a second variable tracks the maximum seen so far. Read the recurrence in plain language and it is obvious: if the running sum so far is negative, it can only hurt you, so drop it and start fresh from the current element. The pattern generalises cleanly — track a running minimum alongside the maximum and you get maximum product subarray, since a large negative times a negative becomes a large positive. Handle the circular variant by computing both the maximum subarray and the total minus the minimum subarray, taking the larger.",
    useCases: [
      "Maximum profit from a contiguous run — best window of stock gains, best stretch of sales.",
      "Any 'best contiguous segment' phrasing over an array of signed values.",
      "Signal processing style problems where you want the strongest continuous burst.",
      "As a subroutine inside 2D problems: fixing a pair of columns and running Kadane down the rows gives maximum submatrix sum.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="flex space-x-2 mb-2">
          <div class="p-2 bg-gray-100 border rounded-sm">-2</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm">1</div>
          <div class="p-2 bg-gray-100 border rounded-sm">-3</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm">4</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm">-1</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm">2</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm">1</div>
          <div class="p-2 bg-gray-100 border rounded-sm">-5</div>
        </div>
        <div class="text-gray-600 mb-1">running best ending here:</div>
        <div class="flex space-x-2 mb-2 text-gray-500">
          <div class="w-10 text-center">-2</div><div class="w-10 text-center">1</div>
          <div class="w-10 text-center">-2</div><div class="w-10 text-center">4</div>
          <div class="w-10 text-center">3</div><div class="w-10 text-center">5</div>
          <div class="w-10 text-center font-bold text-green-700">6</div><div class="w-10 text-center">1</div>
        </div>
        <div class="p-2 bg-blue-100 border border-blue-300 rounded-md">[4, -1, 2, 1] &rarr; sum 6</div>
      </div>
    `,
    code: {
      python: `# Maximum subarray sum. best_here = max(x, best_here + x)
def max_subarray(nums):
    best_here = best_overall = nums[0]
    for x in nums[1:]:
        best_here = max(x, best_here + x)    # extend, or start fresh
        best_overall = max(best_overall, best_here)
    return best_overall

# Same idea, but also return the indices - useful when asked to
# produce the subarray itself rather than just its sum.
def max_subarray_range(nums):
    best_here = best_overall = nums[0]
    start = best_start = best_end = 0
    for i in range(1, len(nums)):
        if nums[i] > best_here + nums[i]:
            best_here, start = nums[i], i    # start fresh here
        else:
            best_here += nums[i]
        if best_here > best_overall:
            best_overall, best_start, best_end = best_here, start, i
    return best_overall, best_start, best_end

# Maximum PRODUCT subarray. A negative flips the ordering, so track the
# running minimum too - today's minimum can become tomorrow's maximum.
def max_product(nums):
    hi = lo = best = nums[0]
    for x in nums[1:]:
        if x < 0:
            hi, lo = lo, hi                  # negative swaps the roles
        hi = max(x, hi * x)
        lo = min(x, lo * x)
        best = max(best, hi)
    return best`,
      typescript: `// Maximum subarray sum. bestHere = max(x, bestHere + x)
function maxSubarray(nums: number[]): number {
  let bestHere = nums[0], bestOverall = nums[0];
  for (let i = 1; i < nums.length; i++) {
    bestHere = Math.max(nums[i], bestHere + nums[i]);
    bestOverall = Math.max(bestOverall, bestHere);
  }
  return bestOverall;
}

// Same idea, returning the indices as well as the sum.
function maxSubarrayRange(nums: number[]): [number, number, number] {
  let bestHere = nums[0], bestOverall = nums[0];
  let start = 0, bestStart = 0, bestEnd = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > bestHere + nums[i]) { bestHere = nums[i]; start = i; }
    else bestHere += nums[i];
    if (bestHere > bestOverall) {
      bestOverall = bestHere; bestStart = start; bestEnd = i;
    }
  }
  return [bestOverall, bestStart, bestEnd];
}

// Maximum PRODUCT subarray - track the running minimum too, because a
// negative flips which of the two is the best candidate.
function maxProduct(nums: number[]): number {
  let hi = nums[0], lo = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    if (x < 0) [hi, lo] = [lo, hi];
    hi = Math.max(x, hi * x);
    lo = Math.min(x, lo * x);
    best = Math.max(best, hi);
  }
  return best;
}`,
    },
    pitfalls: [
      "Initialising the answer to 0. If every element is negative the correct answer is the largest single element, not 0 — seed from nums[0] instead.",
      "Forgetting that the subarray must be non-empty unless the problem says otherwise.",
      "On the product variant, dropping the running minimum. Two negatives make a positive, so the minimum is a live candidate for tomorrow's maximum.",
      "On the circular variant, returning total - minSubarray when every element is negative. That case gives an empty subarray; fall back to the plain Kadane answer.",
      "Updating the global maximum before updating the local one, which lets a stale value through.",
    ],
    problems: {
      easy: [
        { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
        { name: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      ],
      medium: [
        { name: "Maximum Product Subarray", url: "https://leetcode.com/problems/maximum-product-subarray/" },
        { name: "Maximum Sum Circular Subarray", url: "https://leetcode.com/problems/maximum-sum-circular-subarray/" },
        { name: "Maximum Absolute Sum of Any Subarray", url: "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/" },
        { name: "Longest Turbulent Subarray", url: "https://leetcode.com/problems/longest-turbulent-subarray/" },
        { name: "K-Concatenation Maximum Sum", url: "https://leetcode.com/problems/k-concatenation-maximum-sum/" },
      ],
      hard: [
        { name: "Maximum Sum of 3 Non-Overlapping Subarrays", url: "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/" },
        { name: "Max Sum of Rectangle No Larger Than K", url: "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/" },
      ],
    },
  },

  {
    id: "dp-knapsack-01",
    title: "0/1 Knapsack",
    subtitle: "Knapsack Family",
    summary: "Take it or leave it — each item may be used at most once.",
    complexity: {
      time: "O(n W)",
      space: "O(W)",
      note: "Pseudo-polynomial: W is the capacity's value, not its bit length, so a huge capacity is expensive even with few items.",
    },
    description:
      "You have n items, each with a weight and a value, and a bag with capacity W. Each item may be taken at most once. Maximise the value carried. The state is dp[i][w] — the best value achievable using the first i items with capacity w — and every item presents exactly one binary decision: skip it, leaving dp[i-1][w]; or take it, giving value[i] + dp[i-1][w - weight[i]] provided it fits. Take the better of the two. That take-it-or-leave-it shape is the entire family. Once you can see it, a surprising number of problems are knapsack in disguise: partitioning a set into two equal-sum halves is knapsack with capacity sum/2 asking for feasibility rather than value; counting subsets that hit a target sum is the same table summing instead of maximising; and the 'target sum' sign-assignment problem reduces to it with one line of algebra. The 1D space optimisation is where people trip — you must iterate capacity in reverse, because forward iteration would let the same item be picked twice, silently turning it into the unbounded variant.",
    useCases: [
      "Resource allocation under a hard budget where each option is all-or-nothing.",
      "Subset-sum and set-partition questions — can this array be split into two halves of equal sum?",
      "Counting how many subsets reach a given total.",
      "Selecting projects, features, or investments under a fixed capacity constraint.",
      "Any problem phrased as 'choose a subset of these to maximise X without exceeding Y'.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">capacity 5 &middot; items (w,v): (2,3) (3,4) (4,5)</div>
        <table style="border-collapse:collapse">
          <tr>
            <td class="p-1 text-gray-500">w &rarr;</td>
            <td class="p-1 text-gray-500 w-10 text-center">0</td><td class="p-1 text-gray-500 w-10 text-center">1</td>
            <td class="p-1 text-gray-500 w-10 text-center">2</td><td class="p-1 text-gray-500 w-10 text-center">3</td>
            <td class="p-1 text-gray-500 w-10 text-center">4</td><td class="p-1 text-gray-500 w-10 text-center">5</td>
          </tr>
          <tr><td class="p-1 text-gray-500">none</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td></tr>
          <tr><td class="p-1 text-gray-500">(2,3)</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td></tr>
          <tr><td class="p-1 text-gray-500">(3,4)</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">4</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">4</td><td class="p-1 bg-green-200 border border-green-500 text-center">7</td></tr>
          <tr><td class="p-1 text-gray-500">(4,5)</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">4</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">5</td><td class="p-1 bg-green-200 border border-green-500 text-center">7</td></tr>
        </table>
        <div class="text-sm text-gray-600 mt-2">Answer 7 = items (2,3) + (3,4)</div>
      </div>
    `,
    code: {
      python: `# 2D table - clearest to read and to debug.
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        w, v = weights[i - 1], values[i - 1]
        for c in range(capacity + 1):
            dp[i][c] = dp[i - 1][c]                       # skip item i
            if w <= c:                                    # or take it
                dp[i][c] = max(dp[i][c], v + dp[i - 1][c - w])
    return dp[n][capacity]

# 1D rolling row. NOTE the reversed capacity loop: iterating forward
# would read a cell already updated for item i, letting the same item
# be taken twice - that is the unbounded knapsack, not this one.
def knapsack_1d(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for w, v in zip(weights, values):
        for c in range(capacity, w - 1, -1):    # <-- reversed
            dp[c] = max(dp[c], v + dp[c - w])
    return dp[capacity]

# Partition Equal Subset Sum - the same table asking a yes/no question.
def can_partition(nums):
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for c in range(target, x - 1, -1):
            dp[c] = dp[c] or dp[c - x]
    return dp[target]`,
      typescript: `// 2D table - clearest to read and debug.
function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1], v = values[i - 1];
    for (let c = 0; c <= capacity; c++) {
      dp[i][c] = dp[i - 1][c];                       // skip
      if (w <= c) dp[i][c] = Math.max(dp[i][c], v + dp[i - 1][c - w]);
    }
  }
  return dp[n][capacity];
}

// 1D rolling row. The capacity loop MUST run backwards, or the same
// item gets reused and you have solved unbounded knapsack by mistake.
function knapsack1D(weights: number[], values: number[], capacity: number): number {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let c = capacity; c >= weights[i]; c--) {   // <-- reversed
      dp[c] = Math.max(dp[c], values[i] + dp[c - weights[i]]);
    }
  }
  return dp[capacity];
}

// Partition Equal Subset Sum - same table, feasibility instead of value.
function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let c = target; c >= x; c--) dp[c] = dp[c] || dp[c - x];
  }
  return dp[target];
}`,
    },
    pitfalls: [
      "Iterating capacity forwards in the 1D version. That reuses the current item and silently solves unbounded knapsack instead.",
      "Calling this polynomial. O(nW) is pseudo-polynomial — W appears as a value, so a capacity of 10^9 is intractable regardless of n.",
      "Off-by-one between item index i and array index i-1 when the table has an extra leading row.",
      "Forgetting to check the odd-total shortcut in partition problems — an odd sum can never split evenly.",
      "Mixing up 'maximise value' with 'count the ways'. One takes max over transitions, the other sums them.",
    ],
    problems: {
      easy: [
        { name: "Last Stone Weight II", url: "https://leetcode.com/problems/last-stone-weight-ii/" },
      ],
      medium: [
        { name: "Partition Equal Subset Sum", url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
        { name: "Target Sum", url: "https://leetcode.com/problems/target-sum/" },
        { name: "Ones and Zeroes", url: "https://leetcode.com/problems/ones-and-zeroes/" },
        { name: "Combination Sum IV", url: "https://leetcode.com/problems/combination-sum-iv/" },
        { name: "0/1 Knapsack (GFG)", url: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1" },
      ],
      hard: [
        { name: "Profitable Schemes", url: "https://leetcode.com/problems/profitable-schemes/" },
        { name: "Tallest Billboard", url: "https://leetcode.com/problems/tallest-billboard/" },
      ],
    },
  },

  {
    id: "dp-unbounded-knapsack",
    title: "Unbounded Knapsack & Coin Change",
    subtitle: "Knapsack Family",
    summary: "Same table, unlimited copies — and the loop order that decides combinations vs permutations.",
    complexity: {
      time: "O(n W)",
      space: "O(W)",
      note: "Identical bound to 0/1, but the inner loop runs forwards. That single direction change is what allows reuse.",
    },
    description:
      "Unbounded knapsack is 0/1 knapsack with one rule removed: each item may be taken any number of times. In the 1D formulation that amounts to iterating capacity forwards instead of backwards, so that dp[c - w] may already include the current item. Coin change is the best-known instance — minimum coins to make an amount is unbounded knapsack minimising count, and counting the ways to make an amount is the same table summing instead. The subtlety that costs people interviews is loop order in the counting version. Putting coins in the outer loop and amount in the inner counts combinations, treating {1,2} and {2,1} as the same. Swapping them counts permutations, treating those as different. Neither is wrong; they answer different questions, and you should say which one the problem is asking for before you write it. This is also the family where greedy fails in an instructive way: with coins {1, 3, 4} making 6, greedy takes 4+1+1 for three coins while the optimum is 3+3 for two.",
    useCases: [
      "Making change with unlimited coins of each denomination.",
      "Cutting a rod into pieces to maximise total value, where a length may be used repeatedly.",
      "Counting the number of ways to reach a total from a repeatable set of steps or scores.",
      "Minimum number of perfect squares, or of any repeatable unit, that sum to n.",
      "Any budget problem where an option can be selected more than once.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">coins [1, 3, 4] &middot; amount 6</div>
        <div class="flex space-x-2 mb-2">
          <div class="p-2 bg-red-200 border border-red-500 rounded-md text-center">greedy<br/>4+1+1<br/><span class="text-red-500">3 coins</span></div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-md text-center">optimal<br/>3+3<br/><span class="text-green-700">2 coins</span></div>
        </div>
        <div class="text-gray-600 mt-2 mb-1">min coins per amount:</div>
        <div class="flex space-x-2">
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">0<br/><span class="text-gray-500">0</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1<br/><span class="text-gray-500">1</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">2<br/><span class="text-gray-500">2</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">3<br/><span class="text-gray-500">1</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">4<br/><span class="text-gray-500">1</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">5<br/><span class="text-gray-500">2</span></div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">6<br/><span class="text-green-700">2</span></div>
        </div>
      </div>
    `,
    code: {
      python: `# Minimum coins to make the target amount. Forward loop = unlimited reuse.
def coin_change(coins, amount):
    INF = float('inf')
    dp = [0] + [INF] * amount
    for c in range(1, amount + 1):
        for coin in coins:
            if coin <= c and dp[c - coin] + 1 < dp[c]:
                dp[c] = dp[c - coin] + 1
    return -1 if dp[amount] == INF else dp[amount]

# COUNTING - loop order decides what you are counting.

# Coins outer, amount inner -> COMBINATIONS. {1,2} and {2,1} are one way.
def count_combinations(coins, amount):
    dp = [1] + [0] * amount
    for coin in coins:                    # each coin considered once
        for c in range(coin, amount + 1):
            dp[c] += dp[c - coin]
    return dp[amount]

# Amount outer, coins inner -> PERMUTATIONS. {1,2} and {2,1} are two ways.
def count_permutations(coins, amount):
    dp = [1] + [0] * amount
    for c in range(1, amount + 1):        # each amount considered once
        for coin in coins:
            if coin <= c:
                dp[c] += dp[c - coin]
    return dp[amount]

# Rod cutting - unbounded knapsack maximising instead of minimising.
def rod_cutting(prices, n):               # prices[i] = value of length i+1
    dp = [0] * (n + 1)
    for length in range(1, n + 1):
        for cut in range(1, length + 1):
            dp[length] = max(dp[length], prices[cut - 1] + dp[length - cut])
    return dp[n]`,
      typescript: `// Minimum coins to make the target amount. Forward loop = unlimited reuse.
function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let c = 1; c <= amount; c++) {
    for (const coin of coins) {
      if (coin <= c) dp[c] = Math.min(dp[c], dp[c - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Coins outer -> COMBINATIONS ({1,2} and {2,1} count once)
function countCombinations(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let c = coin; c <= amount; c++) dp[c] += dp[c - coin];
  }
  return dp[amount];
}

// Amount outer -> PERMUTATIONS ({1,2} and {2,1} count separately)
function countPermutations(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let c = 1; c <= amount; c++) {
    for (const coin of coins) if (coin <= c) dp[c] += dp[c - coin];
  }
  return dp[amount];
}

// Rod cutting - unbounded knapsack, maximising.
function rodCutting(prices: number[], n: number): number {
  const dp = new Array(n + 1).fill(0);
  for (let len = 1; len <= n; len++) {
    for (let cut = 1; cut <= len; cut++) {
      dp[len] = Math.max(dp[len], prices[cut - 1] + dp[len - cut]);
    }
  }
  return dp[n];
}`,
    },
    pitfalls: [
      "Swapping the loop order in the counting variant without meaning to. Coins outer counts combinations; amount outer counts permutations, and they give different answers.",
      "Reaching for greedy. Greedy coin change is only optimal for canonical systems like {1,5,10,25}; sets like {1,3,4} break it.",
      "Returning dp[amount] without checking for the unreachable sentinel, so an impossible amount reports a huge number instead of -1.",
      "Using the backwards capacity loop copied from 0/1 knapsack, which forbids reuse and gives the wrong answer here.",
      "Overflow in counting problems on large inputs — many such problems ask for the count modulo 10^9+7 for exactly this reason.",
    ],
    problems: {
      easy: [
        { name: "Min Cost Climbing Stairs", url: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
      ],
      medium: [
        { name: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
        { name: "Coin Change II", url: "https://leetcode.com/problems/coin-change-ii/" },
        { name: "Perfect Squares", url: "https://leetcode.com/problems/perfect-squares/" },
        { name: "Combination Sum IV", url: "https://leetcode.com/problems/combination-sum-iv/" },
        { name: "Integer Break", url: "https://leetcode.com/problems/integer-break/" },
        { name: "Minimum Cost For Tickets", url: "https://leetcode.com/problems/minimum-cost-for-tickets/" },
      ],
      hard: [
        { name: "Number of Ways to Earn Points", url: "https://leetcode.com/problems/number-of-ways-to-earn-points/" },
        { name: "Count of Sub-Multisets With Bounded Sum", url: "https://leetcode.com/problems/count-of-sub-multisets-with-bounded-sum/" },
      ],
    },
  },

  {
    id: "dp-lcs",
    title: "Longest Common Subsequence",
    subtitle: "String DP",
    summary: "The two-string grid that most sequence-comparison problems reduce to.",
    complexity: {
      time: "O(n m)",
      space: "O(n m)",
      note: "Collapses to O(min(n, m)) space if you only need the length. Keep the full grid when you must reconstruct the actual subsequence.",
    },
    description:
      "Given two sequences, find the longest subsequence present in both — subsequence meaning order is preserved but the characters need not be adjacent. The state is dp[i][j], the LCS length of the first i characters of one string and the first j of the other, and the transition splits on a single question: do the current characters match? If they do, the answer extends the diagonal, 1 + dp[i-1][j-1]. If they do not, one of the two characters must be discarded, so take max(dp[i-1][j], dp[i][j-1]). That two-branch grid is the template for a whole family. Longest common substring is the same grid with the mismatch branch resetting to 0 instead of inheriting. The shortest common supersequence has length n + m - LCS. The minimum deletions to make two strings equal is n + m - 2·LCS. And a neat trick worth remembering: the longest palindromic subsequence of a string is just the LCS of that string with its own reverse.",
    useCases: [
      "Diff tools — the unchanged lines between two file versions are exactly their LCS.",
      "Version control merge logic and patch generation.",
      "Bioinformatics sequence alignment for DNA or protein strings.",
      "Plagiarism and similarity scoring between documents.",
      "As a reduction target: palindromic subsequence, minimum deletions, shortest common supersequence.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">"ABCBDAB" vs "BDCABA" &rarr; LCS "BCBA" (4)</div>
        <table style="border-collapse:collapse">
          <tr><td class="p-1"></td><td class="p-1 text-gray-500 w-10 text-center">-</td><td class="p-1 text-gray-500 w-10 text-center">B</td><td class="p-1 text-gray-500 w-10 text-center">D</td><td class="p-1 text-gray-500 w-10 text-center">C</td><td class="p-1 text-gray-500 w-10 text-center">A</td></tr>
          <tr><td class="p-1 text-gray-500">-</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">0</td></tr>
          <tr><td class="p-1 text-gray-500">A</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">0</td><td class="p-1 bg-green-200 border border-green-500 text-center">1</td></tr>
          <tr><td class="p-1 text-gray-500">B</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-green-200 border border-green-500 text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">1</td></tr>
          <tr><td class="p-1 text-gray-500">C</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">1</td><td class="p-1 bg-green-200 border border-green-500 text-center">2</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">2</td></tr>
        </table>
        <div class="text-sm text-gray-600 mt-2">match &rarr; diagonal + 1 &nbsp;|&nbsp; mismatch &rarr; max(up, left)</div>
      </div>
    `,
    code: {
      python: `# Length of the longest common subsequence.
def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]      # extend the diagonal
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]

# Reconstructing the actual subsequence: walk back from the corner,
# following the decision that produced each cell.
def lcs_string(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            dp[i][j] = (1 + dp[i-1][j-1]) if a[i-1] == b[j-1] \\
                       else max(dp[i-1][j], dp[i][j-1])
    out, i, j = [], n, m
    while i and j:
        if a[i - 1] == b[j - 1]:
            out.append(a[i - 1]); i -= 1; j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    return ''.join(reversed(out))

# Longest common SUBSTRING - contiguous, so a mismatch resets to 0.
def lcsubstr(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    best = 0
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
                best = max(best, dp[i][j])
            # else it stays 0 - that reset is the only difference
    return best

# Longest palindromic subsequence = LCS of s with reversed s.
def lps(s):
    return lcs(s, s[::-1])`,
      typescript: `// Length of the longest common subsequence.
function lcs(a: string, b: string): number {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? 1 + dp[i - 1][j - 1]
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[n][m];
}

// Reconstructing the subsequence by walking back from the corner.
function lcsString(a: string, b: string): string {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? 1 + dp[i - 1][j - 1]
        : Math.max(dp[i - 1][j], dp[i][j - 1]);

  let i = n, j = m; const out: string[] = [];
  while (i && j) {
    if (a[i - 1] === b[j - 1]) { out.push(a[--i]); j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
    else j--;
  }
  return out.reverse().join('');
}

// Longest common SUBSTRING - contiguous, so mismatch resets to 0.
function lcSubstring(a: string, b: string): number {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best;
}

// Longest palindromic subsequence = LCS of s with its reverse.
const lps = (s: string) => lcs(s, [...s].reverse().join(''));`,
    },
    pitfalls: [
      "Confusing subsequence with substring. Subsequence allows gaps; substring does not, and the only code difference is whether a mismatch resets to 0 or inherits a neighbour.",
      "Indexing the strings with i and j instead of i-1 and j-1 when the table has a padding row and column.",
      "Space-optimising to two rows and then being unable to reconstruct the answer — reconstruction needs the whole grid.",
      "Assuming the LCS is unique. Several distinct subsequences can share the maximum length; the reconstruction returns one of them.",
      "Trying to build LCS greedily by matching the first common character. That fails on cases like 'AGGTAB' and 'GXTXAYB'.",
    ],
    problems: {
      easy: [
        { name: "Is Subsequence", url: "https://leetcode.com/problems/is-subsequence/" },
      ],
      medium: [
        { name: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/" },
        { name: "Longest Palindromic Subsequence", url: "https://leetcode.com/problems/longest-palindromic-subsequence/" },
        { name: "Delete Operation for Two Strings", url: "https://leetcode.com/problems/delete-operation-for-two-strings/" },
        { name: "Shortest Common Supersequence", url: "https://leetcode.com/problems/shortest-common-supersequence/" },
        { name: "Uncrossed Lines", url: "https://leetcode.com/problems/uncrossed-lines/" },
        { name: "Maximum Length of Repeated Subarray", url: "https://leetcode.com/problems/maximum-length-of-repeated-subarray/" },
      ],
      hard: [
        { name: "Distinct Subsequences", url: "https://leetcode.com/problems/distinct-subsequences/" },
        { name: "Minimum Insertion Steps to Make a String Palindrome", url: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/" },
      ],
    },
  },

  {
    id: "dp-edit-distance",
    title: "Edit Distance",
    subtitle: "String DP",
    summary: "Minimum insert, delete and replace operations to turn one string into another.",
    complexity: {
      time: "O(n m)",
      space: "O(m)",
      note: "Two rows are enough for the distance itself. Keep the full grid only if you must list the actual edit operations.",
    },
    description:
      "Also called Levenshtein distance: the fewest single-character insertions, deletions or replacements needed to transform one string into another. The state dp[i][j] is the distance between the first i characters of one string and the first j of the other. If the current characters match, no operation is needed and the cost carries over diagonally from dp[i-1][j-1]. If they differ, you pay 1 and pick the cheapest of the three moves — delete takes dp[i-1][j], insert takes dp[i][j-1], and replace takes dp[i-1][j-1]. The base cases are what make it click: turning a string of length i into an empty string costs i deletions, so the first row and column are simply 0, 1, 2, 3 and so on. Once you can read the three neighbours as three operations, the variants follow immediately — restrict the moves to deletion only and you get 'minimum deletions to make two strings equal', and weight the operations differently and you get the asymmetric-cost version used in spell checkers.",
    useCases: [
      "Spell checkers and 'did you mean' suggestions, ranking candidates by distance from the typed word.",
      "Fuzzy string matching and record deduplication across messy datasets.",
      "DNA sequence alignment where insertions, deletions and mutations all carry a cost.",
      "Diffing and autocorrect, where the cheapest edit script is the one to show the user.",
      "Measuring similarity between two commands, filenames, or user inputs.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">"horse" &rarr; "ros" &nbsp;=&nbsp; 3 operations</div>
        <table style="border-collapse:collapse">
          <tr><td class="p-1"></td><td class="p-1 text-gray-500 w-10 text-center">-</td><td class="p-1 text-gray-500 w-10 text-center">r</td><td class="p-1 text-gray-500 w-10 text-center">o</td><td class="p-1 text-gray-500 w-10 text-center">s</td></tr>
          <tr><td class="p-1 text-gray-500">-</td><td class="p-1 bg-gray-100 border text-center">0</td><td class="p-1 bg-gray-100 border text-center">1</td><td class="p-1 bg-gray-100 border text-center">2</td><td class="p-1 bg-gray-100 border text-center">3</td></tr>
          <tr><td class="p-1 text-gray-500">h</td><td class="p-1 bg-gray-100 border text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">2</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">3</td></tr>
          <tr><td class="p-1 text-gray-500">o</td><td class="p-1 bg-gray-100 border text-center">2</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">2</td><td class="p-1 bg-green-200 border border-green-500 text-center">1</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">2</td></tr>
          <tr><td class="p-1 text-gray-500">r</td><td class="p-1 bg-gray-100 border text-center">3</td><td class="p-1 bg-green-200 border border-green-500 text-center">2</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">2</td><td class="p-1 bg-blue-100 border border-blue-300 text-center">2</td></tr>
        </table>
        <div class="text-sm text-gray-600 mt-2">match &rarr; diagonal &nbsp;|&nbsp; else 1 + min(&uarr; delete, &larr; insert, &#8598; replace)</div>
      </div>
    `,
    code: {
      python: `# Levenshtein distance. The three neighbours ARE the three operations.
def edit_distance(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]

    for i in range(n + 1):
        dp[i][0] = i          # delete every character of a
    for j in range(m + 1):
        dp[0][j] = j          # insert every character of b

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]        # free - no operation
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete a[i-1]
                    dp[i][j - 1],      # insert b[j-1]
                    dp[i - 1][j - 1],  # replace a[i-1] with b[j-1]
                )
    return dp[n][m]

# Two-row version - O(min(n, m)) space when you only need the number.
def edit_distance_rolling(a, b):
    if len(a) < len(b):
        a, b = b, a
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            cur[j] = prev[j - 1] if a[i-1] == b[j-1] \\
                     else 1 + min(prev[j], cur[j - 1], prev[j - 1])
        prev = cur
    return prev[len(b)]`,
      typescript: `// Levenshtein distance. The three neighbours ARE the three operations.
function editDistance(a: string, b: string): number {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 0; i <= n; i++) dp[i][0] = i;   // delete everything
  for (let j = 0; j <= m; j++) dp[0][j] = j;   // insert everything

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];           // free
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],       // delete
          dp[i][j - 1],       // insert
          dp[i - 1][j - 1],   // replace
        );
      }
    }
  }
  return dp[n][m];
}

// Two-row version - O(min(n, m)) space.
function editDistanceRolling(a: string, b: string): number {
  if (a.length < b.length) [a, b] = [b, a];
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = new Array(b.length + 1).fill(0);
    cur[0] = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j], cur[j - 1], prev[j - 1]);
    }
    prev = cur;
  }
  return prev[b.length];
}`,
    },
    pitfalls: [
      "Leaving the first row and column at 0. They must be 0,1,2,3... — converting to or from an empty string costs one operation per character.",
      "Mixing up which neighbour is which operation. Up is delete, left is insert, diagonal is replace; naming them in a comment saves you every time.",
      "Adding 1 on the matching branch. A match is free, and the cost passes straight through the diagonal.",
      "In the rolling version, reading prev[j-1] after you have already overwritten it — that is why the diagonal must be read from the previous row, not the current one.",
      "Assuming distance is symmetric when operation costs differ. With unequal insert and delete costs, d(a,b) is not d(b,a).",
    ],
    problems: {
      easy: [
        { name: "Delete Columns to Make Sorted", url: "https://leetcode.com/problems/delete-columns-to-make-sorted/" },
      ],
      medium: [
        { name: "Delete Operation for Two Strings", url: "https://leetcode.com/problems/delete-operation-for-two-strings/" },
        { name: "Minimum ASCII Delete Sum for Two Strings", url: "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/" },
        { name: "One Edit Distance", url: "https://leetcode.com/problems/one-edit-distance/" },
      ],
      hard: [
        { name: "Edit Distance", url: "https://leetcode.com/problems/edit-distance/" },
        { name: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching/" },
        { name: "Wildcard Matching", url: "https://leetcode.com/problems/wildcard-matching/" },
        { name: "Interleaving String", url: "https://leetcode.com/problems/interleaving-string/" },
      ],
    },
  },

  {
    id: "dp-lis",
    title: "Longest Increasing Subsequence",
    subtitle: "Sequence DP",
    summary: "The O(n²) DP, and the patience-sorting trick that makes it O(n log n).",
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      note: "The binary-search version. The straightforward DP is O(n^2) — know both, and know why the fast one works.",
    },
    description:
      "Find the length of the longest strictly increasing subsequence of an array. The direct DP defines dp[i] as the length of the best increasing subsequence ending at index i, computed by scanning every earlier index j and extending whenever nums[j] < nums[i]. That is O(n²) and is worth writing first because it is obviously correct. The faster method is the one interviewers are usually fishing for. Maintain an array called tails, where tails[k] holds the smallest possible value that can end an increasing subsequence of length k+1. For each element, binary search for the first entry that is greater than or equal to it and overwrite that entry, appending instead if the element is larger than everything so far. The length of tails is the answer. The crucial caveat: tails is not itself a valid subsequence — it is a set of best-possible endings, and reconstructing the real subsequence needs a parallel parent-pointer array. Switching the binary search from lower to upper bound turns strictly increasing into non-decreasing, which is a common variant.",
    useCases: [
      "Scheduling or stacking problems where items must be placed in increasing order of some attribute.",
      "Russian doll envelopes and box stacking, after sorting on one dimension and running LIS on the other.",
      "Minimum number of operations to make an array sorted — n minus the LIS length.",
      "Longest chain of pairs, or any 'longest run of compatible items' framing.",
      "Patience sorting and the card-game intuition it comes from.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="mb-2">[10, 9, 2, 5, 3, 7, 101, 18]</div>
        <div class="text-gray-600 mb-1">tails evolves:</div>
        <div class="flex flex-col w-full">
          <div class="flex justify-between p-1"><span class="text-gray-500">10</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[10]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">9</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[9]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">2</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[2]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">5</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[2, 5]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">3</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[2, 3]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">7</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[2, 3, 7]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">101</span><span class="bg-blue-100 border border-blue-300 rounded-sm p-1">[2, 3, 7, 101]</span></div>
          <div class="flex justify-between p-1"><span class="text-gray-500">18</span><span class="bg-green-200 border border-green-500 rounded-sm p-1">[2, 3, 7, 18]</span></div>
        </div>
        <div class="text-sm text-gray-600 mt-2">length 4 &middot; tails is NOT the subsequence itself</div>
      </div>
    `,
    code: {
      python: `# O(n^2) - obviously correct, write this one first.
def lis_quadratic(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)                 # every element alone is length 1
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# O(n log n) - patience sorting.
# tails[k] = smallest value that can end an increasing subsequence
# of length k+1. Note tails is NOT a valid subsequence itself.
from bisect import bisect_left

def lis(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)        # first entry >= x
        if i == len(tails):
            tails.append(x)              # x extends the longest run
        else:
            tails[i] = x                 # x is a better ending for length i+1
    return len(tails)

# Non-decreasing variant: bisect_right instead of bisect_left, so
# equal values are allowed to extend rather than replace.
from bisect import bisect_right

def longest_non_decreasing(nums):
    tails = []
    for x in nums:
        i = bisect_right(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)

# Reconstructing the real subsequence needs parent pointers.
def lis_sequence(nums):
    tails, tail_idx, parent = [], [], [-1] * len(nums)
    for i, x in enumerate(nums):
        k = bisect_left(tails, x)
        if k > 0:
            parent[i] = tail_idx[k - 1]
        if k == len(tails):
            tails.append(x); tail_idx.append(i)
        else:
            tails[k] = x; tail_idx[k] = i
    out, cur = [], tail_idx[-1] if tail_idx else -1
    while cur != -1:
        out.append(nums[cur]); cur = parent[cur]
    return out[::-1]`,
      typescript: `// O(n^2) - obviously correct, write this one first.
function lisQuadratic(nums: number[]): number {
  if (!nums.length) return 0;
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}

// O(n log n) - patience sorting.
// tails[k] = smallest value that can end a subsequence of length k+1.
function lis(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {                    // lower bound: first entry >= x
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}

// Non-decreasing variant: switch to an upper bound (tails[mid] <= x).
function longestNonDecreasing(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] <= x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}`,
    },
    pitfalls: [
      "Returning tails as the subsequence. It has the right length but its contents are not a real subsequence of the input — reconstruct with parent pointers instead.",
      "Using the wrong binary search bound. Lower bound gives strictly increasing; upper bound gives non-decreasing. Read the problem statement carefully.",
      "In the O(n^2) version, returning dp[n-1] instead of max(dp). The best subsequence need not end at the last element.",
      "Forgetting the empty-input case, which should return 0 rather than crashing on max of an empty list.",
      "On envelope or box-stacking variants, sorting both dimensions ascending. Sort the second dimension descending within equal first values, or you will chain items that share a dimension.",
    ],
    problems: {
      easy: [
        { name: "Is Subsequence", url: "https://leetcode.com/problems/is-subsequence/" },
      ],
      medium: [
        { name: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
        { name: "Number of Longest Increasing Subsequence", url: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/" },
        { name: "Longest String Chain", url: "https://leetcode.com/problems/longest-string-chain/" },
        { name: "Maximum Length of Pair Chain", url: "https://leetcode.com/problems/maximum-length-of-pair-chain/" },
        { name: "Best Team With No Conflicts", url: "https://leetcode.com/problems/best-team-with-no-conflicts/" },
      ],
      hard: [
        { name: "Russian Doll Envelopes", url: "https://leetcode.com/problems/russian-doll-envelopes/" },
        { name: "Minimum Number of Removals to Make Mountain Array", url: "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/" },
      ],
    },
  },

  {
    id: "dp-grid-paths",
    title: "Grid & Path DP",
    subtitle: "Grid DP",
    summary: "Counting routes and finding cheapest paths through a 2D board.",
    complexity: {
      time: "O(n m)",
      space: "O(m)",
      note: "Every cell is computed once from its neighbours. One row of memory suffices when movement is restricted to right and down.",
    },
    description:
      "Grid DP covers any problem where you move through a 2D board and each cell's answer depends on the cells you could have arrived from. When movement is limited to right and down, the structure is especially clean: dp[i][j] depends only on dp[i-1][j] and dp[i][j-1], both already computed if you fill the grid row by row, and a single rolling row is enough memory. Counting paths sums those two predecessors; finding the minimum-cost path takes their minimum and adds the current cell; finding the maximum takes their maximum. Obstacles are handled by forcing the blocked cell's value to zero for counting or to infinity for minimisation. The edges deserve care — the first row and first column each have only one predecessor, so either seed them explicitly or guard the index. Related problems bend the movement rule rather than the method: triangle path DP allows two downward neighbours, falling-path problems allow three, and 'maximal square' is grid DP where the transition takes a minimum over three neighbours to find the largest square of ones.",
    useCases: [
      "Counting distinct routes through a grid, with or without blocked cells.",
      "Minimum-cost or maximum-value path through a weighted board.",
      "Largest square or rectangle of ones inside a binary matrix.",
      "Dungeon-style problems where you track a resource such as health along the path.",
      "Any problem on a grid where a cell's answer is a function of its already-visited neighbours.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">unique paths, moving only right or down</div>
        <div class="flex flex-col">
          <div class="flex space-x-2 mb-2">
            <div class="p-2 bg-green-200 border border-green-500 rounded-sm w-10 text-center">1</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1</div>
          </div>
          <div class="flex space-x-2 mb-2">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">2</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">3</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">4</div>
          </div>
          <div class="flex space-x-2">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">3</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">6</div>
            <div class="p-2 bg-green-200 border border-green-500 rounded-sm w-10 text-center">10</div>
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-2">each cell = cell above + cell to the left</div>
      </div>
    `,
    code: {
      python: `# Count paths from top-left to bottom-right, moving right or down.
def unique_paths(rows, cols):
    dp = [1] * cols                      # first row: exactly one way each
    for _ in range(1, rows):
        for c in range(1, cols):
            dp[c] += dp[c - 1]           # from above (dp[c]) + from left
    return dp[cols - 1]

# With obstacles: a blocked cell contributes zero paths.
def unique_paths_obstacles(grid):
    if not grid or grid[0][0] == 1:
        return 0
    cols = len(grid[0])
    dp = [0] * cols
    dp[0] = 1
    for row in grid:
        for c in range(cols):
            if row[c] == 1:
                dp[c] = 0                # blocked - no route through here
            elif c > 0:
                dp[c] += dp[c - 1]
    return dp[-1]

# Minimum path sum: same shape, min instead of sum.
def min_path_sum(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [float('inf')] * cols
    dp[0] = 0
    for r in range(rows):
        dp[0] += grid[r][0]              # first column has one predecessor
        for c in range(1, cols):
            dp[c] = grid[r][c] + min(dp[c], dp[c - 1])
    return dp[-1]

# Maximal square of 1s - the transition is a min over three neighbours,
# because a square can only grow if all three corners support it.
def maximal_square(matrix):
    if not matrix:
        return 0
    rows, cols = len(matrix), len(matrix[0])
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    best = 0
    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            if matrix[r - 1][c - 1] == '1':
                dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])
                best = max(best, dp[r][c])
    return best * best`,
      typescript: `// Count paths from top-left to bottom-right, moving right or down.
function uniquePaths(rows: number, cols: number): number {
  const dp = new Array(cols).fill(1);
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) dp[c] += dp[c - 1];
  }
  return dp[cols - 1];
}

// With obstacles: a blocked cell contributes zero paths.
function uniquePathsWithObstacles(grid: number[][]): number {
  if (!grid.length || grid[0][0] === 1) return 0;
  const cols = grid[0].length;
  const dp = new Array(cols).fill(0);
  dp[0] = 1;
  for (const row of grid) {
    for (let c = 0; c < cols; c++) {
      if (row[c] === 1) dp[c] = 0;
      else if (c > 0) dp[c] += dp[c - 1];
    }
  }
  return dp[cols - 1];
}

// Minimum path sum: same shape, min instead of sum.
function minPathSum(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const dp = new Array(cols).fill(Infinity);
  dp[0] = 0;
  for (let r = 0; r < rows; r++) {
    dp[0] += grid[r][0];
    for (let c = 1; c < cols; c++) {
      dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
    }
  }
  return dp[cols - 1];
}

// Maximal square of 1s - min over three neighbours.
function maximalSquare(matrix: string[][]): number {
  if (!matrix.length) return 0;
  const rows = matrix.length, cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  let best = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      if (matrix[r - 1][c - 1] === '1') {
        dp[r][c] = 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]);
        best = Math.max(best, dp[r][c]);
      }
    }
  }
  return best * best;
}`,
    },
    pitfalls: [
      "Not handling the first row and first column, which have only one predecessor each and will read out of bounds if treated like interior cells.",
      "Forgetting that an obstacle in the very first cell makes the answer 0 immediately.",
      "Reusing a rolling row when movement allows going up or left as well. Rolling rows only work when every dependency is already computed.",
      "Treating maximal-square as a sum. It is a min over three neighbours — a square only extends if all three supporting cells do.",
      "Reaching for grid DP when the grid allows movement in all four directions and revisits. That is a shortest-path problem for BFS or Dijkstra, not a DP fill.",
    ],
    problems: {
      easy: [
        { name: "Minimum Path Sum", url: "https://leetcode.com/problems/minimum-path-sum/" },
        { name: "Pascal's Triangle II", url: "https://leetcode.com/problems/pascals-triangle-ii/" },
      ],
      medium: [
        { name: "Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
        { name: "Unique Paths II", url: "https://leetcode.com/problems/unique-paths-ii/" },
        { name: "Triangle", url: "https://leetcode.com/problems/triangle/" },
        { name: "Maximal Square", url: "https://leetcode.com/problems/maximal-square/" },
        { name: "Minimum Falling Path Sum", url: "https://leetcode.com/problems/minimum-falling-path-sum/" },
        { name: "Cherry Pickup II", url: "https://leetcode.com/problems/cherry-pickup-ii/" },
      ],
      hard: [
        { name: "Dungeon Game", url: "https://leetcode.com/problems/dungeon-game/" },
        { name: "Cherry Pickup", url: "https://leetcode.com/problems/cherry-pickup/" },
        { name: "Maximal Rectangle", url: "https://leetcode.com/problems/maximal-rectangle/" },
      ],
    },
  },

  {
    id: "dp-trees",
    title: "DP on Trees",
    subtitle: "Tree DP",
    summary: "Post-order traversal where each node combines answers from its children.",
    complexity: {
      time: "O(n)",
      space: "O(h)",
      note: "Each node is visited once and does constant work combining its children. Space is the recursion depth.",
    },
    description:
      "Tree DP is dynamic programming where the subproblems are subtrees. Because a tree has no cycles, every node's answer depends only on its children, and a single post-order traversal computes everything — no memo table required, since the recursion itself never revisits a node. The pattern is always the same: recurse into the children first, then combine their returned values into this node's answer. The part that trips people up is that many tree problems need two different quantities. The value you return to your parent is often not the value you record as the global best. Tree diameter is the clearest example: a node returns the height of its deepest branch, because that is all a parent can use, but it records left height plus right height plus one as a candidate for the global answer, since a path through this node cannot continue upward. The same split appears in maximum path sum, where you return the best single-branch sum but record the best through-node sum. When a node needs information from its parent as well as its children — for example, computing every node's answer as if it were the root — you need the rerooting technique: one pass down and one pass up.",
    useCases: [
      "Tree diameter, height, and any longest-path-in-a-tree question.",
      "Maximum path sum where the path may bend at a node instead of running root-to-leaf.",
      "House Robber III style problems, where choosing a node forbids choosing its children.",
      "Counting subtree properties — number of nodes, sum of a subtree, or how many subtrees satisfy a condition.",
      "Minimum vertex cover, independent set, and other classic graph problems that become easy on trees.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">diameter: return height, record height(L)+height(R)</div>
        <div class="flex flex-col items-center">
          <div class="p-2 bg-green-200 border border-green-500 rounded-full w-10 text-center mb-1">1</div>
          <div class="text-gray-500">&#8601; &nbsp; &#8600;</div>
          <div class="flex space-x-4 my-1">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">2</div>
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">3</div>
          </div>
          <div class="text-gray-500 ml-24">&#8601; &nbsp; &#8600;</div>
          <div class="flex space-x-4 mt-1 ml-24">
            <div class="p-2 bg-gray-100 border rounded-full w-10 text-center">4</div>
            <div class="p-2 bg-gray-100 border rounded-full w-10 text-center">5</div>
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-4">at node 1: height(2)=1, height(3)=2 &rarr; diameter 3</div>
        <div class="text-sm text-gray-600">node 1 returns 1 + max(1, 2) = 3 to its parent</div>
      </div>
    `,
    code: {
      python: `# Tree diameter. The value RETURNED and the value RECORDED differ -
# this split is the heart of tree DP.
def diameter(root):
    best = 0

    def height(node):
        nonlocal best
        if not node:
            return 0
        left = height(node.left)         # solve children first
        right = height(node.right)
        best = max(best, left + right)   # RECORD: path bending at this node
        return 1 + max(left, right)      # RETURN: what a parent can extend

    height(root)
    return best

# Maximum path sum - same split, with negative branches clamped to 0.
def max_path_sum(root):
    best = float('-inf')

    def gain(node):
        nonlocal best
        if not node:
            return 0
        left = max(gain(node.left), 0)   # a negative branch is worth skipping
        right = max(gain(node.right), 0)
        best = max(best, node.val + left + right)   # RECORD
        return node.val + max(left, right)          # RETURN

    gain(root)
    return best

# House Robber III - each node returns a pair: (best if robbed,
# best if skipped). Robbing a node forbids robbing its children.
def rob(root):
    def solve(node):
        if not node:
            return (0, 0)
        l_rob, l_skip = solve(node.left)
        r_rob, r_skip = solve(node.right)
        robbed = node.val + l_skip + r_skip          # children must be skipped
        skipped = max(l_rob, l_skip) + max(r_rob, r_skip)
        return (robbed, skipped)
    return max(solve(root))`,
      typescript: `// Tree diameter. The value RETURNED and the value RECORDED differ.
function diameter(root: TreeNode | null): number {
  let best = 0;

  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    best = Math.max(best, left + right);     // RECORD: path bends here
    return 1 + Math.max(left, right);        // RETURN: parent can extend
  };

  height(root);
  return best;
}

// Maximum path sum - same split, negative branches clamped to 0.
function maxPathSum(root: TreeNode | null): number {
  let best = -Infinity;

  const gain = (node: TreeNode | null): number => {
    if (!node) return 0;
    const left = Math.max(gain(node.left), 0);
    const right = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + left + right);   // RECORD
    return node.val + Math.max(left, right);          // RETURN
  };

  gain(root);
  return best;
}

// House Robber III - each node returns [bestIfRobbed, bestIfSkipped].
function rob(root: TreeNode | null): number {
  const solve = (node: TreeNode | null): [number, number] => {
    if (!node) return [0, 0];
    const [lRob, lSkip] = solve(node.left);
    const [rRob, rSkip] = solve(node.right);
    const robbed = node.val + lSkip + rSkip;
    const skipped = Math.max(lRob, lSkip) + Math.max(rRob, rSkip);
    return [robbed, skipped];
  };
  return Math.max(...solve(root));
}`,
    },
    pitfalls: [
      "Returning the recorded global answer instead of the value the parent can actually use. A bent path cannot be extended upward, so it must not be returned.",
      "Forgetting to clamp negative subtree contributions to zero in maximum path sum — a negative branch should be dropped, not added.",
      "Trying to memoise. On a tree there is nothing to memoise; each node is visited exactly once by construction.",
      "Using recursion on a skewed tree with 10^5 nodes and hitting the stack limit. Convert to an explicit stack or raise the limit.",
      "On a general graph disguised as a tree, forgetting the visited set. Undirected trees need a parent check or DFS will bounce back and forth over an edge.",
    ],
    problems: {
      easy: [
        { name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { name: "Diameter of Binary Tree", url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
        { name: "Balanced Binary Tree", url: "https://leetcode.com/problems/balanced-binary-tree/" },
      ],
      medium: [
        { name: "House Robber III", url: "https://leetcode.com/problems/house-robber-iii/" },
        { name: "Longest Univalue Path", url: "https://leetcode.com/problems/longest-univalue-path/" },
        { name: "Count Good Nodes in Binary Tree", url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
        { name: "Distribute Coins in Binary Tree", url: "https://leetcode.com/problems/distribute-coins-in-binary-tree/" },
        { name: "Binary Tree Cameras", url: "https://leetcode.com/problems/binary-tree-cameras/" },
      ],
      hard: [
        { name: "Binary Tree Maximum Path Sum", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
        { name: "Sum of Distances in Tree", url: "https://leetcode.com/problems/sum-of-distances-in-tree/" },
        { name: "Tree of Coprimes", url: "https://leetcode.com/problems/tree-of-coprimes/" },
      ],
    },
  },

  {
    id: "dp-bitmask",
    title: "Bitmask DP",
    subtitle: "Advanced DP",
    summary: "When the state is a subset, store it as the bits of an integer.",
    complexity: {
      time: "O(2\u207F n)",
      space: "O(2\u207F)",
      note: "Exponential but tractable up to roughly n = 20, where 2^20 is about a million states. Beyond that, look for a different formulation.",
    },
    description:
      "Some problems have a subset as their natural state — which cities have I already visited, which people have been assigned a task, which items are used. Bitmask DP encodes that subset as the bits of a single integer, so subset number 13 is binary 1101, meaning items 0, 2 and 3 are in use. Once a subset is an integer it can index an array directly, and set operations become single instructions: testing membership is mask & (1 << i), adding an element is mask | (1 << i), and removing one is mask & ~(1 << i). The classic application is the travelling salesman problem, where dp[mask][i] holds the cheapest route that has visited exactly the cities in mask and currently sits at city i, giving O(2ⁿ · n²) — vastly better than the O(n!) of trying every ordering, though still exponential. Assignment problems are the other big family: matching n workers to n tasks optimally is dp[mask] where the popcount of mask tells you which worker you are placing, so only one dimension is needed. The hard limit is memory: n = 20 means a million states, n = 25 means 33 million, and past that the approach stops being practical.",
    useCases: [
      "Travelling salesman and shortest-Hamiltonian-path problems on small graphs.",
      "Assignment problems — matching workers to tasks, people to hats, students to seats.",
      "Counting or enumerating over subsets where order of selection matters to the cost.",
      "Partitioning a small set into groups subject to constraints, such as fair-teams problems.",
      "Any state that is naturally 'which of these n things have I used so far', with n at most about 20.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">mask 1101 = items {0, 2, 3} used</div>
        <div class="flex space-x-2 mb-4">
          <div class="p-2 bg-blue-500 text-white border border-blue-500 rounded-sm w-10 text-center">1</div>
          <div class="p-2 bg-blue-500 text-white border border-blue-500 rounded-sm w-10 text-center">1</div>
          <div class="p-2 bg-gray-100 border rounded-sm w-10 text-center">0</div>
          <div class="p-2 bg-blue-500 text-white border border-blue-500 rounded-sm w-10 text-center">1</div>
        </div>
        <div class="flex space-x-2 text-gray-500 mb-4">
          <div class="w-10 text-center">3</div><div class="w-10 text-center">2</div>
          <div class="w-10 text-center">1</div><div class="w-10 text-center">0</div>
        </div>
        <div class="w-full">
          <div class="p-1 bg-gray-100 border rounded-sm mb-1">test i:&nbsp; mask &amp; (1 &lt;&lt; i)</div>
          <div class="p-1 bg-gray-100 border rounded-sm mb-1">add i:&nbsp;&nbsp; mask | (1 &lt;&lt; i)</div>
          <div class="p-1 bg-gray-100 border rounded-sm">clear i: mask &amp; ~(1 &lt;&lt; i)</div>
        </div>
      </div>
    `,
    code: {
      python: `# Travelling salesman. dp[mask][i] = cheapest route visiting exactly
# the cities in the mask and ending at city i.
def tsp(dist):
    n = len(dist)
    FULL = (1 << n) - 1
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0                          # start at city 0, only it visited

    for mask in range(1 << n):
        for i in range(n):
            if dp[mask][i] == INF or not (mask & (1 << i)):
                continue
            for j in range(n):
                if mask & (1 << j):       # j already visited - skip
                    continue
                nxt = mask | (1 << j)
                cost = dp[mask][i] + dist[i][j]
                if cost < dp[nxt][j]:
                    dp[nxt][j] = cost

    return min(dp[FULL][i] + dist[i][0] for i in range(n))

# Assignment problem: n workers, n tasks, cost[w][t].
# popcount(mask) tells us which worker we are placing, so one dimension
# is enough - the second is implied.
def min_assignment(cost):
    n = len(cost)
    INF = float('inf')
    dp = [INF] * (1 << n)
    dp[0] = 0
    for mask in range(1 << n):
        if dp[mask] == INF:
            continue
        worker = bin(mask).count('1')     # this many tasks already assigned
        if worker == n:
            continue
        for task in range(n):
            if mask & (1 << task):
                continue
            nxt = mask | (1 << task)
            dp[nxt] = min(dp[nxt], dp[mask] + cost[worker][task])
    return dp[(1 << n) - 1]

# Iterating every SUBSET of a mask - a useful idiom, O(3^n) overall.
def iterate_submasks(mask):
    sub = mask
    while sub:
        yield sub
        sub = (sub - 1) & mask            # next smaller subset of mask`,
      typescript: `// Travelling salesman. dp[mask][i] = cheapest route covering the mask,
// ending at city i.
function tsp(dist: number[][]): number {
  const n = dist.length;
  const FULL = (1 << n) - 1;
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;

  for (let mask = 0; mask <= FULL; mask++) {
    for (let i = 0; i < n; i++) {
      if (dp[mask][i] === Infinity || !(mask & (1 << i))) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;      // already visited
        const next = mask | (1 << j);
        dp[next][j] = Math.min(dp[next][j], dp[mask][i] + dist[i][j]);
      }
    }
  }

  let best = Infinity;
  for (let i = 0; i < n; i++) best = Math.min(best, dp[FULL][i] + dist[i][0]);
  return best;
}

// Assignment problem - popcount(mask) implies which worker we're placing.
function minAssignment(cost: number[][]): number {
  const n = cost.length;
  const dp = new Array(1 << n).fill(Infinity);
  dp[0] = 0;
  const popcount = (x: number) => {
    let c = 0;
    while (x) { x &= x - 1; c++; }
    return c;
  };

  for (let mask = 0; mask < (1 << n); mask++) {
    if (dp[mask] === Infinity) continue;
    const worker = popcount(mask);
    if (worker === n) continue;
    for (let task = 0; task < n; task++) {
      if (mask & (1 << task)) continue;
      const next = mask | (1 << task);
      dp[next] = Math.min(dp[next], dp[mask] + cost[worker][task]);
    }
  }
  return dp[(1 << n) - 1];
}

// Iterating every SUBSET of a mask - O(3^n) across all masks.
function* submasks(mask: number): Generator<number> {
  let sub = mask;
  while (sub) {
    yield sub;
    sub = (sub - 1) & mask;
  }
}`,
    },
    pitfalls: [
      "Operator precedence. In C-like languages `mask & 1 << i` parses as `mask & (1 << i)` but `mask & 1 << i == 0` does not do what you expect — parenthesise everything.",
      "Using 1 << i with i >= 31 in JavaScript, where bitwise operators coerce to 32-bit signed integers and silently overflow.",
      "Iterating masks out of order. Transitions must go from smaller to larger masks, which plain ascending iteration gives you for free — but only because adding a bit always increases the value.",
      "Forgetting the return leg in TSP. The cycle needs dist[i][0] added back at the end.",
      "Reaching for bitmask DP when n is 30 or more. Two to the thirty is a billion states; the approach has a hard ceiling around 20.",
    ],
    problems: {
      easy: [
        { name: "Subsets", url: "https://leetcode.com/problems/subsets/" },
      ],
      medium: [
        { name: "Partition to K Equal Sum Subsets", url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/" },
        { name: "Matchsticks to Square", url: "https://leetcode.com/problems/matchsticks-to-square/" },
        { name: "Fair Distribution of Cookies", url: "https://leetcode.com/problems/fair-distribution-of-cookies/" },
        { name: "Maximum Compatibility Score Sum", url: "https://leetcode.com/problems/maximum-compatibility-score-sum/" },
      ],
      hard: [
        { name: "Find the Shortest Superstring", url: "https://leetcode.com/problems/find-the-shortest-superstring/" },
        { name: "Number of Ways to Wear Different Hats", url: "https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/" },
        { name: "Parallel Courses II", url: "https://leetcode.com/problems/parallel-courses-ii/" },
        { name: "Minimum Cost to Connect Two Groups of Points", url: "https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/" },
      ],
    },
  },
];
