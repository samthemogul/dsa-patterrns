/**
 * Enrichment: long-form walkthroughs and C++ implementations.
 *
 * Kept separate from the topic definitions so this can be filled in
 * batch by batch without touching the category files. Anything here is
 * merged over the matching topic id in ../index.js — a topic with no entry
 * simply falls back to its short `description`.
 */

export const enrichment = {
  "foundations-complexity": {
    walkthrough: [
      {
        heading: "What Big-O actually measures",
        body: [
          "Big-O describes how the work an algorithm does grows as its input grows. It deliberately throws away two things: constant factors and lower-order terms. An algorithm doing 3n + 50 operations is O(n), and so is one doing 1000n. That looks like a strange thing to ignore, but the point is to answer one specific question — what happens when the input doubles? — and for that question the constants are noise.",
          "Concretely: an O(n) algorithm on doubled input does roughly twice the work. An O(n²) algorithm does four times. An O(log n) algorithm does one extra step. That is the whole intuition, and it is what lets you rule out an approach before writing it.",
          "The three symbols are worth separating once. O is an upper bound — the work is at most this. Omega is a lower bound — at least this. Theta is both at once, a tight bound. In practice, interviewers say 'what's the complexity' and mean worst-case O, so answer that unless told otherwise.",
        ],
      },
      {
        heading: "Counting operations from structure",
        body: [
          "You do not need to count operations exactly. Read the shape of the code instead. A single loop over n elements doing constant work per element is O(n). A loop nested inside another, where the inner one restarts for each outer iteration, is O(n²). A loop that halves its range every step is O(log n), because the number of times you can halve n before reaching 1 is log₂ n.",
          "Sequential blocks add, and the largest one wins: an O(n) pass followed by an O(n log n) sort is O(n log n) overall. Nested blocks multiply: sorting inside a loop over n items is O(n · n log n) = O(n² log n).",
        ],
        trace: `n = 8, halving until 1:

  8 → 4 → 2 → 1        3 steps
  log₂(8) = 3          ✓

n = 1,000,000:
  log₂(10⁶) ≈ 20 steps

That is why binary search on a million
items beats a linear scan by a factor
of fifty thousand.`,
      },
      {
        heading: "The nested loop that isn't quadratic",
        body: [
          "This is the single most useful thing in this topic, and the thing most people get wrong. Consider a sliding window: an outer loop moves a right pointer across the array, and inside it a while loop moves a left pointer forward. It looks nested, so the instinct is to call it O(n²).",
          "It is O(n). The question to ask is not 'is there a loop inside a loop' but 'how far does the inner pointer travel in total, across the entire run?' The left pointer only ever moves forward, and it can never pass the right pointer, so across the whole algorithm it advances at most n times. Total work is the n steps of the outer loop plus the at-most-n steps of the inner one — 2n operations, which is O(n).",
          "This is called an amortised argument, and it is what makes sliding window, two pointers, and monotonic stacks linear. In a monotonic stack the same reasoning applies to pops: each element is pushed exactly once and popped at most once, so the inner while loop contributes at most n pops in total no matter how it clusters.",
        ],
        aside:
          "Say the amortised argument out loud in an interview. 'This looks quadratic, but the left pointer only moves forward, so its total travel is bounded by n' is the sentence that shows you understand your own solution rather than having memorised it.",
      },
      {
        heading: "Space complexity, including the parts you didn't allocate",
        body: [
          "Space complexity counts the extra memory an algorithm needs beyond its input. The trap is recursion: a recursive tree traversal allocates nothing explicitly, but each pending call holds a stack frame, so its space cost is O(h) where h is the tree's height. On a balanced tree that is O(log n); on a degenerate one-child-per-node tree it is O(n), and deep enough input will overflow the stack.",
          "The other common miss is the output. Generating every subset of n elements is O(2ⁿ) time and space no matter how efficiently you generate them, simply because there are 2ⁿ subsets to hold. When an interviewer asks about space, clarify whether the output counts — often they mean auxiliary space, excluding it.",
        ],
      },
      {
        heading: "Choosing a target complexity from the constraints",
        body: [
          "Competitive judges and interviewers both leak the intended solution through the input limits. A rough working figure is 10⁸ simple operations per second. Read the constraint, divide, and you know roughly what you are allowed to do.",
          "This is a genuinely useful habit: before designing anything, look at n and write down the complexity you are aiming for. It eliminates whole families of approach immediately, and often points straight at the technique.",
        ],
        trace: `n ≤ 10        O(n!)  or O(2ⁿ)  — permutations, brute force
n ≤ 20        O(2ⁿ · n)      — bitmask DP
n ≤ 500       O(n³)          — Floyd-Warshall, interval DP
n ≤ 5,000     O(n²)          — most 2D DP tables
n ≤ 10⁵       O(n log n)     — sorting, heaps, binary search
n ≤ 10⁶       O(n)           — single pass, counting
n ≥ 10⁹       O(log n)/O(1)  — maths, direct formula`,
      },
      {
        heading: "Amortised vs average vs worst case",
        body: [
          "Three different claims that are easy to blur together. Worst case is the most expensive input that exists. Average case is the expectation over some distribution of inputs — which requires you to state the distribution, and is why quicksort's O(n log n) is usually qualified as 'with random pivots'. Amortised is stronger than average: it says that over any sequence of operations, the total cost divided by the number of operations is bounded, with no probabilistic assumption at all.",
          "Appending to a dynamic array is the standard example. Most appends are O(1); occasionally the array is full and must be copied to a larger buffer, costing O(n). But because capacity doubles, those copies happen rarely enough that any sequence of n appends costs O(n) in total — O(1) amortised per append. That is a guarantee, not an average.",
        ],
      },
    ],
    cpp: `// Reading complexity from structure, not from intuition.
#include <bits/stdc++.h>
using namespace std;

// O(n) - one pass, constant work per element
long long total(const vector<int>& nums) {
    long long s = 0;
    for (int x : nums) s += x;        // n iterations, O(1) each
    return s;
}

// O(n^2) - the inner loop restarts for every outer iteration
bool hasDuplicatePair(const vector<int>& nums) {
    for (size_t i = 0; i < nums.size(); ++i)
        for (size_t j = i + 1; j < nums.size(); ++j)
            if (nums[i] == nums[j]) return true;
    return false;
}

// Still O(n) - 'left' only moves forward, so its total travel across the
// whole run is bounded by n. This is the amortised argument behind
// sliding window and monotonic stack.
int longestUnique(const string& s) {
    unordered_map<char, int> seen;
    int left = 0, best = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        auto it = seen.find(s[right]);
        if (it != seen.end() && it->second >= left) left = it->second + 1;
        seen[s[right]] = right;
        best = max(best, right - left + 1);
    }
    return best;
}

// O(log n) - the search space halves every step
int countHalvings(int n) {
    int steps = 0;
    while (n > 1) { n /= 2; ++steps; }
    return steps;
}`,
  },

  "foundations-recursion": {
    walkthrough: [
      {
        heading: "The two-part contract",
        body: [
          "Every correct recursive function contains exactly two things. A base case, which returns an answer without calling itself. And a recursive step, which calls itself on a strictly smaller input and builds its answer from the result. If either is missing or wrong, the function either never terminates or returns nonsense — there is no third failure mode.",
          "The word 'strictly' matters. factorial(n) calling factorial(n-1) shrinks by one every time and will reach the base. A function calling itself on the same input, or on something that only sometimes shrinks, will not. When a recursion overflows the stack, this is almost always why.",
        ],
      },
      {
        heading: "How the call stack actually works",
        body: [
          "When a function calls itself, the outer call does not finish — it pauses. The machine stores its local variables and its position in a stack frame, then starts the inner call fresh. Frames pile up as you descend and unwind as each call returns. That is why a recursion n deep costs O(n) memory even if it allocates nothing.",
          "The practical consequence is that any code you place before the recursive call runs on the way down, and any code after it runs on the way back up. That single distinction is the entire difference between preorder and postorder tree traversal, and it is worth internalising because tree DP depends on it completely.",
        ],
        trace: `factorial(4)

  DOWN                      UP
  factorial(4)              ← 24
    4 * factorial(3)        ← 6
      3 * factorial(2)      ← 2
        2 * factorial(1)    ← 1
          return 1  ← base case reached

Four frames live at once at the deepest point.
That is the O(n) space cost.`,
      },
      {
        heading: "Trusting the recursion",
        body: [
          "The hardest habit to build is refusing to trace the whole tree in your head. Do not try to follow four levels down. Instead, assume the recursive call already returns the correct answer for its smaller input, and ask only: given that, how do I build my answer?",
          "For tree height: assume height(left) and height(right) are correct. Then my height is one plus the larger of them. Done — that is the whole function. This is exactly induction. The base case is the base of the induction, the recursive step is the inductive step, and if both are right the function is right for every input.",
        ],
        aside:
          "If you find yourself mentally simulating five levels of recursion to convince yourself the code works, you have skipped the induction step. Go back and state the assumption — 'the child call returns the correct height' — and check that your combination logic is right given it.",
      },
      {
        heading: "When recursion becomes dynamic programming",
        body: [
          "Naive Fibonacci is O(2ⁿ) because fib(5) computes fib(3) twice, fib(2) three times, and so on — the recursion tree is packed with repeats. The fix is one line: cache each result the first time you compute it and return the cached value afterwards.",
          "That caching is memoisation, and memoisation is dynamic programming. There is no deeper distinction. A DP problem is just a recursion whose subproblems overlap, and the whole of the DP stage in this roadmap is about recognising when that overlap exists and what the state should be keyed on.",
        ],
        trace: `fib(5) without a cache — the repeats

              fib(5)
            /        \\
        fib(4)        fib(3)  ←┐
        /    \\        /   \\   │ computed
    fib(3)  fib(2) fib(2) fib(1)  twice
     ←┘      ←──────┘

  15 calls for n = 5.  For n = 40, ~300 million.

With a cache: 5 calls. Each distinct
argument is computed exactly once.`,
      },
      {
        heading: "Converting to iteration, and when to bother",
        body: [
          "Every recursion can be rewritten with an explicit stack — that is literally what the machine is doing for you. The rewrite is worth it in two situations: when depth could exceed the stack limit (Python defaults to about 1000 frames; JavaScript engines allow roughly 10⁴), and when the recursion is a simple linear chain where a loop is plainly clearer.",
          "Linked list reversal is the standard example of the second case: the iterative three-pointer version is O(1) space and easy to read, while the recursive version costs O(n) stack for no benefit. Tree traversal is the opposite — the recursive version is four lines and obviously correct, so keep it unless depth is a genuine risk.",
        ],
        aside:
          "Neither CPython nor V8 performs tail-call optimisation, so writing your recursion in tail position does not save you. If depth is the concern, convert to a real loop or an explicit stack.",
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// 1. Base case + strict progress: the two things every recursion needs.
long long factorial(int n) {
    if (n <= 1) return 1;                  // base case
    return 1LL * n * factorial(n - 1);     // strict progress
}

struct TreeNode { int val; TreeNode *left = nullptr, *right = nullptr; };

// 2. Work before vs after the call decides traversal order.
void traverse(TreeNode* node) {
    if (!node) return;
    cout << node->val << ' ';   // PRE  - on the way down
    traverse(node->left);
    traverse(node->right);
    // cout << node->val;       // POST - on the way back up
}

// 3. Naive recursion is exponential when subproblems repeat.
long long fibSlow(int n) {                 // O(2^n)
    if (n < 2) return n;
    return fibSlow(n - 1) + fibSlow(n - 2);
}

// 4. Cache the repeats and it becomes linear. This one change is the
//    whole step from recursion to dynamic programming.
long long fibFast(int n, vector<long long>& memo) {
    if (n < 2) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibFast(n - 1, memo) + fibFast(n - 2, memo);
}

// 5. Any recursion can be rewritten with an explicit stack.
void traverseIterative(TreeNode* root) {
    stack<TreeNode*> st;
    st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        if (!node) continue;
        cout << node->val << ' ';
        st.push(node->right);   // right first, so left pops first
        st.push(node->left);
    }
}`,
  },

  "array-searching-binary-search": {
    walkthrough: [
      {
        heading: "The invariant, which is the only thing to remember",
        body: [
          "Binary search maintains a range [low, high] and one promise: if the target is anywhere in the array, it is inside that range. Every step compares the middle element to the target and discards the half that cannot contain it, which preserves the promise while halving the range.",
          "Because the range halves each step, it reaches size one in log₂ n steps. On a million elements that is twenty comparisons. The prerequisite is that the data is sorted, or more precisely that there is some monotonic property you can test at the midpoint that tells you which half to keep.",
        ],
      },
      {
        heading: "A trace on a concrete array",
        body: [
          "Working one through by hand is worth more than reading the code. Array [1, 3, 5, 7, 9, 11, 13, 15], target 11.",
        ],
        trace: `low=0  high=7  mid=3  arr[3]=7   7 < 11 → go right, low=4
low=4  high=7  mid=5  arr[5]=11  found at index 5

Target 4 (absent):
low=0  high=7  mid=3  arr[3]=7   7 > 4  → go left,  high=2
low=0  high=2  mid=1  arr[1]=3   3 < 4  → go right, low=2
low=2  high=2  mid=2  arr[2]=5   5 > 4  → go left,  high=1
low=2  high=1  → low > high, range empty → return -1

Note where low ends up: index 2, which is exactly
where 4 would be inserted. That is not a coincidence.`,
      },
      {
        heading: "Why low is the insertion point",
        body: [
          "When the loop exits without finding the target, low sits at the first position holding a value greater than the target — the insertion point that keeps the array sorted. This falls out of the invariant: everything below low was ruled out for being too small, everything above high for being too large.",
          "That property is what turns binary search from a lookup into a general tool. 'Search insert position', 'first bad version', 'find the first element ≥ x' and lower_bound are all the same algorithm, read differently at the end.",
        ],
      },
      {
        heading: "Finding boundaries instead of values",
        body: [
          "The version most interviews actually want is not 'is x present' but 'where does the condition first become true'. Imagine the array mapped to booleans: false, false, false, true, true, true. You want the first true.",
          "The template changes slightly: when the midpoint satisfies the condition, do not stop — it might be the answer, so set high = mid and keep searching left for an earlier one. When it does not, set low = mid + 1. The loop runs while low < high, and low is the answer when it exits. This single template handles first occurrence, last occurrence, and every 'binary search on the answer' problem in stage 4.",
        ],
        trace: `Find the FIRST index where arr[i] >= 7
arr = [1, 3, 5, 7, 7, 9]

low=0 high=5 mid=2  arr[2]=5 <7  → low=3
low=3 high=5 mid=4  arr[4]=7 >=7 → high=4   (keep mid!)
low=3 high=4 mid=3  arr[3]=7 >=7 → high=3
low=3 high=3 → exit, answer 3

Never write high = mid - 1 here. mid might
be the answer and you would discard it.`,
      },
      {
        heading: "The two bugs everyone writes",
        body: [
          "First, the infinite loop. When you compute mid = (low + high) / 2 the division rounds down, so with low = 3 and high = 4 you get mid = 3. If your branch then sets low = mid, nothing changes and the loop spins forever. Rule: if a branch assigns low = mid, the midpoint must round up — use (low + high + 1) / 2.",
          "Second, overflow. In C++ and Java, low + high can exceed the integer range on large arrays even though both values fit. Write low + (high - low) / 2 instead. Python and JavaScript are immune to this, but the interviewer may still ask, and in C++ it is a real bug.",
        ],
        aside:
          "If your binary search hangs, look at whether a branch assigns low = mid with a rounding-down midpoint. That is the cause almost every time.",
      },
      {
        heading: "The jump-search formulation",
        body: [
          "There is an alternative shape worth knowing because it sidesteps both bugs entirely. Instead of tracking two bounds, keep a single position k and a jump size b that starts at n/2 and halves each round. While the jump would keep you at or below the target, take it.",
          "The invariant is that arr[k] is always ≤ the target, so k never overshoots. When the jump size reaches 1 and can no longer move, k is sitting on the last position with a value ≤ target — which is the target itself if it is present. No midpoint, no overflow, no off-by-one on the bounds.",
        ],
        trace: `arr = [1, 3, 5, 7, 9, 11, 13, 15], x = 11, k = 0

b=4:  arr[0+4]=9  <= 11 → jump, k=4
      arr[4+4] out of range → stop
b=2:  arr[4+2]=13 > 11  → stop
b=1:  arr[4+1]=11 <= 11 → jump, k=5
      arr[5+1]=13 > 11  → stop

arr[5] == 11 → found at index 5`,
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Classic binary search. Note low + (high - low) / 2 to avoid the
// integer overflow that (low + high) / 2 can cause on large arrays.
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;                       // low is now the insertion point
}

// Boundary search: first index where the predicate becomes true.
// This is the template that generalises to "binary search the answer".
int firstTrue(int low, int high, const function<bool(int)>& ok) {
    while (low < high) {
        int mid = low + (high - low) / 2;   // rounds DOWN
        if (ok(mid)) high = mid;            // might be the answer - keep it
        else low = mid + 1;                 // definitely not - discard it
    }
    return low;
}

// Jump-shrinking variant: one pointer, no bounds arithmetic at all.
// Invariant: arr[k] <= x always, so k can never overshoot.
int jumpSearch(const vector<int>& arr, int x) {
    int n = (int)arr.size(), k = 0;
    for (int b = n / 2; b >= 1; b /= 2)
        while (k + b < n && arr[k + b] <= x) k += b;
    return arr[k] == x ? k : -1;
}

// The standard library already has both boundary forms.
void stdlib(const vector<int>& arr, int x) {
    auto lo = lower_bound(arr.begin(), arr.end(), x);  // first >= x
    auto hi = upper_bound(arr.begin(), arr.end(), x);  // first >  x
    cout << "count of x = " << (hi - lo) << '\\n';
}`,
  },
};
