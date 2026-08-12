// Range Queries
export const name = "Range Queries";

export const topics = [
  {
    id: "graphs-segment-tree",
    title: "Segment Trees",
    subtitle: "Graphs",
    summary: "A tree data structure for efficient range queries and updates on an array.",
    complexity: {
      time: "O(log n)",
      space: "O(n)",
      note: "Per query or update, after an O(n) build. The 4n array sizing is the safe upper bound.",
    },
    description: "A Segment Tree is a tree data structure used for storing information about intervals or segments. It allows for efficient querying of information (like sum, minimum, maximum) over a given range and updating elements in the underlying array. Each node in the segment tree represents an interval, and its children represent sub-intervals. The leaves of the tree represent single elements of the array. Building a segment tree takes O(N) time, and both range queries and point updates take O(log N) time. This makes it significantly faster than iterating through the array for each query (O(N) per query) when many queries are performed. It's particularly useful for problems involving static arrays with frequent range queries or dynamic arrays with point updates.",
    useCases: [
      "Range Sum Query. Range Minimum/Maximum Query. Range XOR Query. Any problem requiring efficient range queries and point updates on an array. Used in competitive programming for complex range problems."
    ],
    illustration: `
                        <div class="text-center">
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-200 p-2 rounded-full w-24 h-12 flex items-center justify-center font-bold">Sum [0,3] (10)</div>
                                <div class="flex justify-center w-full space-x-4 mt-2">
                                    <div class="bg-gray-100 p-2 rounded-full w-20 h-10 flex items-center justify-center">Sum [0,1] (3)</div>
                                    <div class="bg-gray-100 p-2 rounded-full w-20 h-10 flex items-center justify-center">Sum [2,3] (7)</div>
                                </div>
                                <div class="flex justify-between w-full mt-2">
                                    <div class="flex justify-center w-1/2 space-x-2">
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-8 flex items-center justify-center">1</div>
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-8 flex items-center justify-center">2</div>
                                    </div>
                                    <div class="flex justify-center w-1/2 space-x-2">
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-8 flex items-center justify-center">3</div>
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-8 flex items-center justify-center">4</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Each node stores aggregate info for its range.</div>
                        </div>
                    `,
    code: {
      python: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n) # Max size of segment tree
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, tree_idx, start, end):
        if start == end:
            self.tree[tree_idx] = arr[start]
        else:
            mid = (start + end) // 2
            self._build(arr, 2 * tree_idx + 1, start, mid)
            self._build(arr, 2 * tree_idx + 2, mid + 1, end)
            self.tree[tree_idx] = self.tree[2 * tree_idx + 1] + self.tree[2 * tree_idx + 2]

    def query(self, query_start, query_end):
        return self._query(0, 0, self.n - 1, query_start, query_end)

    def _query(self, tree_idx, start, end, query_start, query_end):
        if query_start <= start and end <= query_end: # Current segment fully within query range
            return self.tree[tree_idx]
        if end < query_start or start > query_end: # Current segment outside query range
            return 0 # Identity for sum query
        
        mid = (start + end) // 2
        p1 = self._query(2 * tree_idx + 1, start, mid, query_start, query_end)
        p2 = self._query(2 * tree_idx + 2, mid + 1, end, query_start, query_end)
        return p1 + p2

    def update(self, idx, val):
        self._update(0, 0, self.n - 1, idx, val)

    def _update(self, tree_idx, start, end, idx, val):
        if start == end:
            self.tree[tree_idx] = val
        else:
            mid = (start + end) // 2
            if start <= idx <= mid:
                self._update(2 * tree_idx + 1, start, mid, idx, val)
            else:
                self._update(2 * tree_idx + 2, mid + 1, end, idx, val)
            self.tree[tree_idx] = self.tree[2 * tree_idx + 1] + self.tree[2 * tree_idx + 2]`,
      typescript: `class SegmentTree {
    private n: number;
    private tree: number[]; // Stores sum for simplicity

    constructor(arr: number[]) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(0); // Max size of segment tree
        this.build(arr, 0, 0, this.n - 1);
    }

    private build(arr: number[], treeIdx: number, start: number, end: number): void {
        if (start === end) {
            this.tree[treeIdx] = arr[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            this.build(arr, 2 * treeIdx + 1, start, mid);
            this.build(arr, 2 * treeIdx + 2, mid + 1, end);
            this.tree[treeIdx] = this.tree[2 * treeIdx + 1] + this.tree[2 * treeIdx + 2];
        }
    }

    query(queryStart: number, queryEnd: number): number {
        return this._query(0, 0, this.n - 1, queryStart, queryEnd);
    }

    private _query(treeIdx: number, start: number, end: number, queryStart: number, queryEnd: number): number {
        if (queryStart <= start && end <= queryEnd) { // Current segment fully within query range
            return this.tree[treeIdx];
        }
        if (end < queryStart || start > queryEnd) { // Current segment outside query range
            return 0; // Identity for sum query
        }
        
        const mid = Math.floor((start + end) / 2);
        const p1 = this._query(2 * treeIdx + 1, start, mid, queryStart, queryEnd);
        const p2 = this._query(2 * treeIdx + 2, mid + 1, end, queryStart, queryEnd);
        return p1 + p2;
    }

    update(idx: number, val: number): void {
        this._update(0, 0, this.n - 1, idx, val);
    }

    private _update(treeIdx: number, start: number, end: number, idx: number, val: number): void {
        if (start === end) {
            this.tree[treeIdx] = val;
        } else {
            const mid = Math.floor((start + end) / 2);
            if (start <= idx && idx <= mid) {
                this._update(2 * treeIdx + 1, start, mid, idx, val);
            } else {
                this._update(2 * treeIdx + 2, mid + 1, end, idx, val);
            }
            this.tree[treeIdx] = this.tree[2 * treeIdx + 1] + this.tree[2 * treeIdx + 2];
        }
    }
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Range Sum Query - Immutable",
          "url": "https://leetcode.com/problems/range-sum-query-immutable/"
        },
        {
          "name": "Range Sum Query 2D - Immutable",
          "url": "https://leetcode.com/problems/range-sum-query-2d-immutable/"
        },
        {
          "name": "Count of Smaller Numbers After Self (Segment Tree variant)",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        {
          "name": "Maximum Product Subarray (Segment Tree variant)",
          "url": "https://leetcode.com/problems/maximum-product-subarray/"
        },
        {
          "name": "Find Right Interval",
          "url": "https://leetcode.com/problems/find-right-interval/"
        }
      ],
      "medium": [
        {
          "name": "Range Sum Query - Mutable",
          "url": "https://leetcode.com/problems/range-sum-query-mutable/"
        },
        {
          "name": "Range Sum Query 2D - Mutable",
          "url": "https://leetcode.com/problems/range-sum-query-2d-mutable/"
        },
        {
          "name": "Count of Smaller Numbers After Self",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        {
          "name": "The Skyline Problem",
          "url": "https://leetcode.com/problems/the-skyline-problem/"
        },
        {
          "name": "Maximum Sum of 3 Non-Overlapping Subarrays",
          "url": "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/"
        },
        {
          "name": "Longest Increasing Subsequence (Segment Tree variant)",
          "url": "https://leetcode.com/problems/longest-increasing-subsequence/"
        },
        {
          "name": "Count of Smaller Numbers After Self (Segment Tree variant)",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        {
          "name": "Create Sorted Array through Instructions",
          "url": "https://leetcode.com/problems/create-sorted-array-through-instructions/"
        },
        {
          "name": "Number of Pairs Satisfying Inequality",
          "url": "https://leetcode.com/problems/number-of-pairs-satisfying-inequality/"
        },
        {
          "name": "Find K-th Smallest Pair Distance",
          "url": "https://leetcode.com/problems/find-k-th-smallest-pair-distance/"
        }
      ],
      "hard": [
        {
          "name": "The Skyline Problem",
          "url": "https://leetcode.com/problems/the-skyline-problem/"
        },
        {
          "name": "Count of Range Sum",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        {
          "name": "Range Module",
          "url": "https://leetcode.com/problems/range-module/"
        },
        {
          "name": "Minimum Number of K Consecutive Bit Flips",
          "url": "https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/"
        },
        {
          "name": "Maximum Sum of 3 Non-Overlapping Subarrays",
          "url": "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/"
        }
      ]
    },
  },

  {
    id: "range-fenwick-tree",
    title: "Fenwick Tree (BIT)",
    subtitle: "Range Queries",
    summary: "Prefix sums with updates, in twenty lines and O(log n) per operation.",
    complexity: {
      time: "O(log n)",
      space: "O(n)",
      note: "Same bound as a segment tree for prefix sums, with a much smaller constant factor and far less code — but it cannot do range minimum.",
    },
    description:
      "A Fenwick tree, or binary indexed tree, maintains prefix sums under point updates in O(log n), and it does it with a fraction of a segment tree's code. The idea rests entirely on one bit trick: i & -i isolates the lowest set bit of i, and each index i is made responsible for a block of exactly that many elements ending at i. Updating walks upward by repeatedly adding the lowest set bit, and querying a prefix walks downward by repeatedly subtracting it — both taking at most log n steps because each step clears or sets one bit. Range sums come from the difference of two prefix queries. The trade-off against a segment tree is worth stating plainly: a Fenwick tree only supports operations with an inverse, so sums work and minimums do not, since you cannot subtract a minimum back out. When the problem is prefix or range sums, prefer it — less code means fewer bugs under interview pressure. It is also the standard tool for counting inversions and for 'how many elements before me are smaller' problems, after coordinate-compressing the values into a dense index range.",
    useCases: [
      "Prefix or range sums over an array that keeps changing.",
      "Counting inversions, or 'how many smaller elements come after this one'.",
      "Running rank and order-statistic queries over a stream of values.",
      "Frequency tables where both increments and cumulative counts are needed.",
      "Any segment-tree sum problem where you want the same complexity with a third of the code.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">index i covers (i &amp; -i) elements ending at i</div>
        <div class="flex space-x-2 mb-2">
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">1</div>
          <div class="p-1 bg-blue-200 border border-blue-400 rounded-sm w-20 text-center">2</div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">3</div>
          <div class="p-1 bg-blue-300 border border-blue-500 rounded-sm w-32 text-center">4</div>
        </div>
        <div class="flex space-x-2 text-gray-500 mb-2 text-sm">
          <div class="w-10 text-center">[1]</div>
          <div class="w-20 text-center">[1,2]</div>
          <div class="w-10 text-center">[3]</div>
          <div class="w-32 text-center">[1..4]</div>
        </div>
        <div class="p-1 bg-green-200 border border-green-500 rounded-sm">query(7) = tree[7] + tree[6] + tree[4]</div>
        <div class="text-sm text-gray-600 mt-2">7 &rarr; 6 &rarr; 4 &rarr; 0 &nbsp;(strip one bit each step)</div>
      </div>
    `,
    code: {
      python: `# Fenwick tree / binary indexed tree. 1-indexed internally, which is
# what makes the bit arithmetic work - index 0 has no lowest set bit.
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        """Add delta at 0-indexed position i."""
        i += 1                          # shift to 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i                 # move to the next responsible node

    def prefix_sum(self, i):
        """Sum of the first i elements (0-indexed exclusive)."""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i                 # strip the lowest set bit
        return total

    def range_sum(self, left, right):
        """Sum over [left, right], 0-indexed inclusive."""
        return self.prefix_sum(right + 1) - self.prefix_sum(left)

    @classmethod
    def build(cls, values):
        """O(n) construction - cheaper than n separate updates."""
        ft = cls(len(values))
        ft.tree[1:] = list(values)
        for i in range(1, ft.n + 1):
            parent = i + (i & -i)
            if parent <= ft.n:
                ft.tree[parent] += ft.tree[i]
        return ft


# Counting inversions with a Fenwick tree over compressed values.
def count_inversions(nums):
    ranks = {v: i for i, v in enumerate(sorted(set(nums)))}
    ft = FenwickTree(len(ranks))
    inversions = 0
    for x in reversed(nums):
        r = ranks[x]
        inversions += ft.prefix_sum(r)   # how many smaller values seen so far
        ft.update(r, 1)
    return inversions`,
      typescript: `// Fenwick tree / binary indexed tree. 1-indexed internally.
class FenwickTree {
  private tree: number[];

  constructor(private n: number) {
    this.tree = new Array(n + 1).fill(0);
  }

  /** Add delta at 0-indexed position i. */
  update(i: number, delta: number): void {
    for (let k = i + 1; k <= this.n; k += k & -k) {
      this.tree[k] += delta;             // walk up, adding the lowest bit
    }
  }

  /** Sum of the first i elements (0-indexed exclusive). */
  prefixSum(i: number): number {
    let total = 0;
    for (let k = i; k > 0; k -= k & -k) { // walk down, stripping the bit
      total += this.tree[k];
    }
    return total;
  }

  /** Sum over [left, right], 0-indexed inclusive. */
  rangeSum(left: number, right: number): number {
    return this.prefixSum(right + 1) - this.prefixSum(left);
  }
}

// Counting inversions over coordinate-compressed values.
function countInversions(nums: number[]): number {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map(sorted.map((v, i) => [v, i]));
  const ft = new FenwickTree(sorted.length);
  let inversions = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    const r = rank.get(nums[i])!;
    inversions += ft.prefixSum(r);       // smaller values already seen
    ft.update(r, 1);
  }
  return inversions;
}`,
    },
    pitfalls: [
      "Using 0-based indexing internally. Index 0 has no lowest set bit, so the update loop never advances and hangs — the internal array must be 1-indexed.",
      "Trying to use it for range minimum. Fenwick trees need an invertible operation; you cannot subtract a minimum back out. Use a segment tree instead.",
      "Confusing update with assignment. update(i, delta) adds a delta; setting a value requires computing the difference from the current one first.",
      "Off-by-one between the inclusive range the problem states and the exclusive prefix the tree returns. Write down which convention you are using.",
      "Forgetting to coordinate-compress before using values as indices. A value of 10^9 would need an array that size.",
    ],
    problems: {
      easy: [
        { name: "Range Sum Query - Immutable", url: "https://leetcode.com/problems/range-sum-query-immutable/" },
      ],
      medium: [
        { name: "Range Sum Query - Mutable", url: "https://leetcode.com/problems/range-sum-query-mutable/" },
        { name: "Count of Range Sum", url: "https://leetcode.com/problems/count-of-range-sum/" },
        { name: "Queries on a Permutation With Key", url: "https://leetcode.com/problems/queries-on-a-permutation-with-key/" },
        { name: "Longest Increasing Subsequence II", url: "https://leetcode.com/problems/longest-increasing-subsequence-ii/" },
      ],
      hard: [
        { name: "Count of Smaller Numbers After Self", url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
        { name: "Reverse Pairs", url: "https://leetcode.com/problems/reverse-pairs/" },
        { name: "Create Sorted Array through Instructions", url: "https://leetcode.com/problems/create-sorted-array-through-instructions/" },
      ],
    },
  },
];
