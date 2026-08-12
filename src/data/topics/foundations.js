// Foundations
export const name = "Foundations";

export const topics = [
  {
    id: "foundations-complexity",
    title: "Complexity Analysis",
    subtitle: "Foundations",
    summary: "Reading the cost of an algorithm before you write it.",
    complexity: {
      time: "O(1)",
      space: "O(1)",
      note: "The scale below is the one every other topic in this library is placed on. Learn to read it and you can price an algorithm before implementing it.",
    },
    description:
      "Big-O notation describes how an algorithm's cost grows as the input grows, ignoring constant factors and lower-order terms. It answers 'what happens when n doubles?', not 'how many milliseconds does this take?'. The three bounds worth separating: O (upper bound, the worst case), Omega (lower bound, the best case), and Theta (tight bound, when best and worst agree). Interviewers almost always mean worst-case O unless they say otherwise. Two subtleties matter more than the notation itself. First, amortised analysis: a dynamic array's push is O(n) whenever it resizes, but resizes are rare enough that the average over any sequence of pushes is O(1) — quoting the worst case here would be misleading. Second, the input size you are measuring against: for a graph it is V and E separately, for a string-matching problem it is text length and pattern length separately, and for numeric problems it is often the number of bits, not the value. Saying 'O(n)' without naming what n is has communicated nothing.",
    useCases: [
      "Choosing between two candidate approaches before writing either of them.",
      "Justifying a data structure to an interviewer — 'a heap because I need repeated minimums, and O(log n) beats re-scanning at O(n)'.",
      "Spotting that a nested loop is not actually quadratic because the inner loop's total work is bounded across all iterations.",
      "Recognising when constant factors matter in practice despite identical asymptotic cost, such as cache-friendly array traversal versus pointer chasing.",
    ],
    illustration: `
      <div class="flex flex-col items-center">
        <div class="eyebrow mb-2">Operations when n = 1,000,000</div>
        <div class="flex flex-col w-full">
          <div class="flex items-center justify-between p-1"><span class="font-mono text-sm">O(1)</span><div class="bg-green-200 h-6 rounded-sm" style="width:2%"></div><span class="font-mono text-sm text-gray-600">1</span></div>
          <div class="flex items-center justify-between p-1"><span class="font-mono text-sm">O(log n)</span><div class="bg-green-200 h-6 rounded-sm" style="width:4%"></div><span class="font-mono text-sm text-gray-600">20</span></div>
          <div class="flex items-center justify-between p-1"><span class="font-mono text-sm">O(n)</span><div class="bg-blue-200 h-6 rounded-sm" style="width:30%"></div><span class="font-mono text-sm text-gray-600">10<sup>6</sup></span></div>
          <div class="flex items-center justify-between p-1"><span class="font-mono text-sm">O(n log n)</span><div class="bg-blue-300 h-6 rounded-sm" style="width:45%"></div><span class="font-mono text-sm text-gray-600">2&times;10<sup>7</sup></span></div>
          <div class="flex items-center justify-between p-1"><span class="font-mono text-sm">O(n&sup2;)</span><div class="bg-red-200 h-6 rounded-sm" style="width:80%"></div><span class="font-mono text-sm text-gray-600">10<sup>12</sup></span></div>
        </div>
        <div class="text-sm text-gray-600 mt-4">A rough bench rule: about 10<sup>8</sup> simple operations per second.</div>
      </div>
    `,
    code: {
      python: `# Reading complexity from structure, not from intuition.

# O(n) - one pass, work per element is constant
def total(nums):
    s = 0
    for x in nums:          # n iterations
        s += x              # O(1) each
    return s

# O(n^2) - the inner loop restarts for every outer iteration
def has_duplicate_pair(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False

# Still O(n) - the inner loop looks nested, but 'left' only ever moves
# forward, so across the whole run it advances at most n times total.
# This is the amortised argument behind sliding window and monotonic stack.
def longest_unique(s):
    seen = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        best = max(best, right - left + 1)
    return best

# O(log n) - the search space halves every step
def count_halvings(n):
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps`,
      typescript: `// Reading complexity from structure, not from intuition.

// O(n) - one pass, constant work per element
function total(nums: number[]): number {
  let s = 0;
  for (const x of nums) s += x;
  return s;
}

// O(n^2) - the inner loop restarts for every outer iteration
function hasDuplicatePair(nums: number[]): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// Still O(n) - 'left' only moves forward, so its total travel is bounded
// by n across the entire run. This is the amortised argument behind
// sliding window and monotonic stack.
function longestUnique(s: string): number {
  const seen = new Map<string, number>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    const prev = seen.get(ch);
    if (prev !== undefined && prev >= left) left = prev + 1;
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// O(log n) - the search space halves every step
function countHalvings(n: number): number {
  let steps = 0;
  while (n > 1) { n = Math.floor(n / 2); steps++; }
  return steps;
}`,
    },
    pitfalls: [
      "Calling a loop quadratic because it is nested. Ask instead how far the inner pointer travels in total across the whole run — sliding window and monotonic stack both look nested and are both linear.",
      "Forgetting the space cost of recursion. A recursive tree traversal is O(h) space for the call stack even though it allocates nothing itself.",
      "Quoting average case when the interviewer wants worst case. Hash map lookups are O(1) average and O(n) worst; say which one you mean.",
      "Dropping the term that actually dominates. Sorting inside a loop over n items is O(n^2 log n), not O(n log n).",
      "Ignoring the cost of the output. Generating all subsets is O(2^n) no matter how clever the generation is, because there are 2^n things to emit.",
    ],
    problems: {
      easy: [
        { name: "Running Sum of 1d Array", url: "https://leetcode.com/problems/running-sum-of-1d-array/" },
        { name: "Richest Customer Wealth", url: "https://leetcode.com/problems/richest-customer-wealth/" },
        { name: "Number of Good Pairs", url: "https://leetcode.com/problems/number-of-good-pairs/" },
      ],
      medium: [
        { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { name: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/" },
        { name: "Insert Delete GetRandom O(1)", url: "https://leetcode.com/problems/insert-delete-getrandom-o1/" },
      ],
      hard: [
        { name: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/" },
        { name: "Max Value of Equation", url: "https://leetcode.com/problems/max-value-of-equation/" },
      ],
    },
  },

  {
    id: "foundations-recursion",
    title: "Recursion",
    subtitle: "Foundations",
    summary: "Solving a problem by calling a smaller version of itself.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "Varies entirely with the recurrence. The space bound is the maximum call-stack depth, which is easy to forget and is what causes stack overflow on deep inputs.",
    },
    description:
      "A recursive function solves a problem by reducing it to a smaller instance of the same problem, and it needs exactly two things to be correct: a base case that returns without recursing, and a recursive step that makes strict progress toward that base case. Everything else is bookkeeping. The useful mental model is the call stack — each call gets its own frame holding its own parameters and locals, frames stack up as you descend and unwind as you return, and any work you place after the recursive call runs on the way back up. That distinction is the whole difference between preorder and postorder tree traversal. Recursion earns its place when the problem's structure is itself recursive: trees, nested lists, divide and conquer, and any search over a branching space. It costs you O(depth) stack space that an iterative loop would not need, which is why linked list reversal is usually written iteratively and tree traversal usually is not. When a recursion revisits the same subproblem repeatedly, adding a cache turns it into dynamic programming — that is the only difference between the exponential and linear versions of Fibonacci.",
    useCases: [
      "Tree and graph traversal, where the structure is defined recursively in the first place.",
      "Divide and conquer algorithms such as merge sort, quicksort and binary search.",
      "Exhaustive search over a branching space — permutations, subsets, N-Queens — where backtracking is recursion plus undo.",
      "Flattening or walking arbitrarily nested data, such as nested lists or a directory tree.",
      "Any problem where you can state the answer for n in terms of the answer for n-1 or n/2.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">factorial(4) - descend, then unwind</div>
        <div class="w-full">
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">factorial(4) &rarr; 4 * factorial(3)</div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1 ml-16">factorial(3) &rarr; 3 * factorial(2)</div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1 ml-24">factorial(2) &rarr; 2 * factorial(1)</div>
          <div class="p-1 bg-green-200 border border-green-400 rounded-sm mb-2 ml-24">factorial(1) &rarr; 1 &nbsp;&nbsp;<span class="text-green-700">base case</span></div>
          <div class="text-center text-gray-500 my-2">&uarr; returns unwind &uarr;</div>
          <div class="p-1 bg-gray-100 border rounded-sm text-center">1 &rarr; 2 &rarr; 6 &rarr; 24</div>
        </div>
      </div>
    `,
    code: {
      python: `# 1. Base case + progress: the two things every recursion needs.
def factorial(n):
    if n <= 1:              # base case - returns without recursing
        return 1
    return n * factorial(n - 1)   # strict progress toward the base

# 2. Work before vs after the call decides traversal order.
def traverse(node):
    if not node:
        return
    print(node.val)     # PRE  - on the way down
    traverse(node.left)
    traverse(node.right)
    # print(node.val)   # POST - on the way back up

# 3. Naive recursion can be exponential when subproblems repeat.
def fib_slow(n):                       # O(2^n) - recomputes constantly
    if n < 2:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# 4. Cache the repeats and the same code becomes linear.
#    This single change is what turns recursion into dynamic programming.
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_fast(n):                       # O(n)
    if n < 2:
        return n
    return fib_fast(n - 1) + fib_fast(n - 2)

# 5. Every recursion can be rewritten with an explicit stack.
def traverse_iterative(root):
    stack = [root]
    while stack:
        node = stack.pop()
        if not node:
            continue
        print(node.val)
        stack.append(node.right)   # right first, so left pops first
        stack.append(node.left)`,
      typescript: `// 1. Base case + progress: the two things every recursion needs.
function factorial(n: number): number {
  if (n <= 1) return 1;                 // base case
  return n * factorial(n - 1);          // strict progress
}

// 2. Work before vs after the call decides traversal order.
function traverse(node: TreeNode | null): void {
  if (!node) return;
  console.log(node.val);   // PRE  - on the way down
  traverse(node.left);
  traverse(node.right);
  // console.log(node.val); // POST - on the way back up
}

// 3. Naive recursion is exponential when subproblems repeat.
function fibSlow(n: number): number {   // O(2^n)
  if (n < 2) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

// 4. Cache the repeats and it becomes linear - this is the whole
//    step from recursion to dynamic programming.
function fibFast(n: number, memo = new Map<number, number>()): number {
  if (n < 2) return n;
  const hit = memo.get(n);
  if (hit !== undefined) return hit;
  const val = fibFast(n - 1, memo) + fibFast(n - 2, memo);
  memo.set(n, val);
  return val;
}

// 5. Any recursion can be rewritten with an explicit stack.
function traverseIterative(root: TreeNode | null): void {
  const stack: (TreeNode | null)[] = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    console.log(node.val);
    stack.push(node.right);   // right first, so left pops first
    stack.push(node.left);
  }
}`,
    },
    pitfalls: [
      "A base case that is never reached because the recursive step does not strictly shrink the input — the classic cause of stack overflow.",
      "Forgetting that stack depth is real space. A recursion n deep on n = 10^5 will overflow in Python (default limit ~1000) and in most JS engines.",
      "Mutating a shared list and forgetting to undo it before returning. In backtracking the undo is not optional.",
      "Returning the shared accumulator instead of a copy, so every result in your output array points at the same mutated list.",
      "Assuming tail-call optimisation exists. Neither CPython nor V8 performs it, so deep tail recursion still overflows.",
    ],
    problems: {
      easy: [
        { name: "Fibonacci Number", url: "https://leetcode.com/problems/fibonacci-number/" },
        { name: "Reverse String", url: "https://leetcode.com/problems/reverse-string/" },
        { name: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { name: "Pow(x, n)", url: "https://leetcode.com/problems/powx-n/" },
      ],
      medium: [
        { name: "Flatten Nested List Iterator", url: "https://leetcode.com/problems/flatten-nested-list-iterator/" },
        { name: "Decode String", url: "https://leetcode.com/problems/decode-string/" },
        { name: "Generate Parentheses", url: "https://leetcode.com/problems/generate-parentheses/" },
        { name: "Different Ways to Add Parentheses", url: "https://leetcode.com/problems/different-ways-to-add-parentheses/" },
      ],
      hard: [
        { name: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching/" },
        { name: "Special Binary String", url: "https://leetcode.com/problems/special-binary-string/" },
      ],
    },
  },

  {
    id: "foundations-divide-conquer",
    title: "Divide and Conquer",
    subtitle: "Foundations",
    summary: "Split into independent halves, solve each, then merge.",
    complexity: {
      time: "O(n log n)",
      space: "O(log n)",
      note: "For the common split-in-half-with-linear-merge shape. The Master Theorem gives the bound for any T(n) = a·T(n/b) + f(n).",
    },
    description:
      "Divide and conquer has three moves: divide the problem into independent subproblems, conquer each recursively, and combine the results. The word that carries the weight is 'independent' — if the subproblems overlap and get recomputed, you are looking at dynamic programming instead, and you should be caching rather than recursing blindly. The cost follows a recurrence of the form T(n) = a·T(n/b) + f(n), where a is the number of subproblems, b is the shrink factor, and f(n) is the cost of splitting plus merging. The Master Theorem reads this off directly: merge sort splits into 2 halves with linear merge, giving T(n) = 2T(n/2) + O(n) = O(n log n); binary search recurses on one half with constant work, giving T(n) = T(n/2) + O(1) = O(log n). The pattern shows up beyond sorting — counting inversions is merge sort with a counter, closest-pair-of-points is a geometric divide and conquer, and quickselect is quicksort that only recurses into the side it needs, dropping the average from O(n log n) to O(n).",
    useCases: [
      "Sorting: merge sort and quicksort are both divide and conquer at heart.",
      "Counting inversions or 'how many pairs are out of order' by piggy-backing on the merge step.",
      "Selection problems — quickselect finds the k-th smallest in O(n) average by only recursing into one side.",
      "Searching a sorted or partially-ordered space, where each step discards a constant fraction of the candidates.",
      "Parallelisable work, since independent subproblems can genuinely run on different cores.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="p-2 bg-blue-100 border border-blue-300 rounded-md mb-1">[ 8, 3, 5, 1 ]</div>
        <div class="text-gray-500 my-1">divide &darr;</div>
        <div class="flex space-x-4 mb-1">
          <div class="p-2 bg-blue-100 border border-blue-300 rounded-md">[ 8, 3 ]</div>
          <div class="p-2 bg-blue-100 border border-blue-300 rounded-md">[ 5, 1 ]</div>
        </div>
        <div class="flex space-x-2 mb-2">
          <div class="p-1 bg-gray-100 border rounded-sm">[8]</div>
          <div class="p-1 bg-gray-100 border rounded-sm">[3]</div>
          <div class="p-1 bg-gray-100 border rounded-sm">[5]</div>
          <div class="p-1 bg-gray-100 border rounded-sm">[1]</div>
        </div>
        <div class="text-gray-500 my-1">&uarr; conquer + combine</div>
        <div class="flex space-x-4 mb-1">
          <div class="p-2 bg-green-100 border border-green-400 rounded-md">[ 3, 8 ]</div>
          <div class="p-2 bg-green-100 border border-green-400 rounded-md">[ 1, 5 ]</div>
        </div>
        <div class="p-2 bg-green-200 border border-green-500 rounded-md">[ 1, 3, 5, 8 ]</div>
        <div class="text-sm text-gray-600 mt-2">log n levels &times; O(n) merge per level = O(n log n)</div>
      </div>
    `,
    code: {
      python: `# Quickselect: k-th smallest in O(n) average.
# Quicksort recurses into both halves; this only recurses into the half
# that can contain the answer, which is what drops n log n to n.
import random

def quickselect(nums, k):          # k is 0-indexed
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        p = partition(nums, lo, hi)
        if p == k:
            return nums[p]
        if p < k:
            lo = p + 1             # answer is to the right
        else:
            hi = p - 1             # answer is to the left

def partition(nums, lo, hi):
    idx = random.randint(lo, hi)   # random pivot avoids the sorted-input trap
    nums[idx], nums[hi] = nums[hi], nums[idx]
    pivot, store = nums[hi], lo
    for i in range(lo, hi):
        if nums[i] < pivot:
            nums[i], nums[store] = nums[store], nums[i]
            store += 1
    nums[store], nums[hi] = nums[hi], nums[store]
    return store


# Counting inversions: merge sort with a counter in the merge step.
# When we take from the right half, every remaining element in the left
# half forms an inversion with it - count them all at once.
def count_inversions(arr):
    def sort(a):
        if len(a) < 2:
            return a, 0
        mid = len(a) // 2
        left, x = sort(a[:mid])
        right, y = sort(a[mid:])
        merged, z = merge(left, right)
        return merged, x + y + z

    def merge(left, right):
        out, i, j, inv = [], 0, 0, 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                out.append(left[i]); i += 1
            else:
                out.append(right[j]); j += 1
                inv += len(left) - i        # the key line
        out.extend(left[i:]); out.extend(right[j:])
        return out, inv

    return sort(arr)[1]`,
      typescript: `// Quickselect: k-th smallest in O(n) average.
// Only recurses into the half that can contain the answer.
function quickselect(nums: number[], k: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const p = partition(nums, lo, hi);
    if (p === k) return nums[p];
    if (p < k) lo = p + 1;
    else hi = p - 1;
  }
  return -1;
}

function partition(nums: number[], lo: number, hi: number): number {
  const idx = lo + Math.floor(Math.random() * (hi - lo + 1));
  [nums[idx], nums[hi]] = [nums[hi], nums[idx]];
  const pivot = nums[hi];
  let store = lo;
  for (let i = lo; i < hi; i++) {
    if (nums[i] < pivot) {
      [nums[i], nums[store]] = [nums[store], nums[i]];
      store++;
    }
  }
  [nums[store], nums[hi]] = [nums[hi], nums[store]];
  return store;
}

// Counting inversions: merge sort with a counter in the merge step.
function countInversions(arr: number[]): number {
  function sort(a: number[]): [number[], number] {
    if (a.length < 2) return [a, 0];
    const mid = a.length >> 1;
    const [left, x] = sort(a.slice(0, mid));
    const [right, y] = sort(a.slice(mid));
    const [merged, z] = merge(left, right);
    return [merged, x + y + z];
  }

  function merge(left: number[], right: number[]): [number[], number] {
    const out: number[] = [];
    let i = 0, j = 0, inv = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) out.push(left[i++]);
      else {
        out.push(right[j++]);
        inv += left.length - i;      // the key line
      }
    }
    return [[...out, ...left.slice(i), ...right.slice(j)], inv];
  }

  return sort(arr)[1];
}`,
    },
    pitfalls: [
      "Using divide and conquer when subproblems overlap. Recomputing the same subproblem across branches is the exponential-Fibonacci mistake — that is a DP problem wearing a D&C hat.",
      "A fixed pivot in quickselect or quicksort. Already-sorted input then degrades it to O(n^2); randomise or use median-of-three.",
      "Slicing arrays at every level in Python or JS. `a[:mid]` copies, adding an O(n) allocation per call — pass indices instead when memory matters.",
      "Getting the inversion count off by one. When you take from the right half, the count is the number of elements *remaining* in the left half, not the left half's total length.",
      "Assuming the merge step is free. The combine cost f(n) is what usually decides the final bound, not the recursion.",
    ],
    problems: {
      easy: [
        { name: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array/" },
        { name: "Majority Element", url: "https://leetcode.com/problems/majority-element/" },
      ],
      medium: [
        { name: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
        { name: "Sort an Array", url: "https://leetcode.com/problems/sort-an-array/" },
        { name: "Search a 2D Matrix II", url: "https://leetcode.com/problems/search-a-2d-matrix-ii/" },
        { name: "Beautiful Array", url: "https://leetcode.com/problems/beautiful-array/" },
        { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
      ],
      hard: [
        { name: "Count of Smaller Numbers After Self", url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
        { name: "Reverse Pairs", url: "https://leetcode.com/problems/reverse-pairs/" },
        { name: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
        { name: "The Skyline Problem", url: "https://leetcode.com/problems/the-skyline-problem/" },
      ],
    },
  },
];
