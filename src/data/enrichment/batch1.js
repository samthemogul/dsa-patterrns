/**
 * Enrichment: dynamic programming and union find.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "dp-fundamentals": {
    walkthrough: [
      {
        heading: "The two conditions that make a problem a DP problem",
        body: [
          "Dynamic programming applies when both of these hold. Optimal substructure: the best answer to the whole problem can be assembled from best answers to smaller versions of the same problem. Overlapping subproblems: those smaller versions recur many times as you break the problem down.",
          "Both conditions matter, and the second is what separates DP from divide and conquer. Merge sort has optimal substructure — sorted halves combine into a sorted whole — but its two halves are disjoint and never recomputed, so caching would buy nothing. Fibonacci has both: fib(5) needs fib(4) and fib(3), and fib(4) needs fib(3) again. That repeat is where all the savings live.",
          "If a greedy choice is provably safe, you do not need DP. Coin change with denominations 1, 5, 10, 25 can be solved greedily. Change the set to 1, 3, 4 and greedy breaks — making 6 greedily gives 4+1+1, three coins, while the optimum is 3+3, two coins. The moment a locally-best choice can be globally wrong, you are in DP territory.",
        ],
      },
      {
        heading: "The four questions to answer before writing code",
        body: [
          "Every DP is fully specified by four decisions, and writing them down before touching the keyboard is the difference between a clean solution and forty minutes of debugging.",
          "One: what is a state? A state is the smallest set of facts that determines the rest of the answer. For climbing stairs it is 'which step am I on' — one number. For 0/1 knapsack it is 'which items have I considered, and how much capacity is left' — two numbers. Two: what is the transition? Given a state, what choices are available, and which earlier states do they read from? Three: what are the base cases, the states whose answers are known outright? Four: which state holds the final answer?",
        ],
        trace: `Climbing stairs — n steps, moving 1 or 2 at a time.
How many distinct ways to reach the top?

  state       i = the step I am standing on
  transition  ways(i) = ways(i-1) + ways(i-2)
              (I arrived here from one step
               below or two steps below)
  base        ways(0) = 1   (one way to stand still)
              ways(1) = 1
  answer      ways(n)

Four lines. The code is now mechanical.`,
      },
      {
        heading: "Memoisation: top-down",
        body: [
          "Memoisation is the recursion you would write anyway, plus a cache. You write the recurrence directly as a function, and before computing anything you check whether this state has already been solved; after computing, you store it.",
          "The advantages are real. It is the easiest form to derive, because it follows the natural recursive statement of the problem. It only ever computes states that are actually reachable, which matters when the state space is large but sparsely used. And you never have to think about iteration order — the recursion resolves dependencies for you.",
          "The costs: function-call overhead makes it slower by a constant factor, and the recursion depth is bounded by your language's stack. Python's default limit of about 1000 frames is easy to hit. If your state space is 10⁵ deep, memoisation will overflow.",
        ],
      },
      {
        heading: "Tabulation: bottom-up",
        body: [
          "Tabulation fills an array in dependency order with no recursion. Same recurrence, same answers, different mechanics: you start from the base cases and iterate forward, guaranteeing that every state a transition reads has already been filled.",
          "The advantages are the mirror image. No stack limit. Faster in practice, since it is a tight loop over an array rather than a tree of function calls. And it is what makes space optimisation possible — once you see the table, you can often notice that only the last row or two is ever read, and collapse an O(n²) table into O(n).",
          "The cost is that you must work out the iteration order yourself, and getting it wrong produces a table that reads cells before they are computed — a silent wrong answer rather than a crash.",
        ],
        trace: `Same recurrence, both directions, n = 5.

MEMOISATION (top-down) — call order:
  ways(5) → ways(4) → ways(3) → ways(2) → ways(1) ✓
                                       → ways(0) ✓
            (unwinding, each result cached)

TABULATION (bottom-up) — fill order:
  dp[0]=1  dp[1]=1  dp[2]=2  dp[3]=3  dp[4]=5  dp[5]=8
   base     base     ↑ each reads the two cells to its left

Same numbers. Memoisation discovers which
states it needs; tabulation computes all of them.`,
      },
      {
        heading: "Which one to use",
        body: [
          "Use memoisation while you are still working out the recurrence. It is closer to how you think about the problem, and if you get the state wrong you find out immediately rather than after building a table around it. In an interview this is usually the right thing to write first, and saying 'let me start top-down and convert if we need the speed' is a good signal.",
          "Switch to tabulation when the recursion depth is a real risk, when you need the constant-factor speed, or when you want to space-optimise. The conversion is mechanical once the recurrence is right: replace the function with an array, and iterate in the order the dependencies require.",
          "Use tabulation from the start when the state space is small and dense and you will visit essentially all of it anyway — grid DP is the clearest example, since you need every cell regardless.",
        ],
        aside:
          "Do not space-optimise until the full table is correct. Collapsing to a rolling array is a mechanical transformation of working code, and it is close to impossible to debug if you write it from scratch — you lose the ability to print the table and look at it.",
      },
      {
        heading: "Space optimisation, once it works",
        body: [
          "Look at the recurrence and ask how far back it reaches. Climbing stairs reads dp[i-1] and dp[i-2], so only two values are ever live — two variables replace the whole array, taking space from O(n) to O(1). 0/1 knapsack reads only the previous row, so one row replaces the 2D table.",
          "There is a trap in the knapsack case worth naming now because it recurs throughout stage 4: when you collapse to one row, the iteration direction starts to matter. Iterating capacity backwards reads values from the previous item; iterating forwards reads values already updated for the current item, which lets the item be reused. Backwards gives 0/1 knapsack, forwards gives unbounded knapsack. Same code, one loop direction apart, and both compile.",
        ],
      },
      {
        heading: "Reading complexity off the state space",
        body: [
          "The rule is universal and worth committing to memory: total cost is the number of distinct states multiplied by the work done per state.",
          "Climbing stairs has n states with O(1) work each — O(n). 0/1 knapsack has n × W states with O(1) work — O(nW). Longest common subsequence has n × m states with O(1) work — O(nm). Interval DP typically has n² states, each scanning O(n) split points, giving O(n³). Bitmask DP has 2ⁿ × n states, which is why n above about 20 becomes hopeless.",
          "One caution on knapsack: O(nW) is pseudo-polynomial, not polynomial. W is the capacity's numeric value, not its size in bits, so a capacity of 10⁹ is intractable no matter how few items there are.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// The same DP three ways.
//   state       i = the step we are standing on
//   transition  ways(i) = ways(i-1) + ways(i-2)
//   base        ways(0) = ways(1) = 1
//   answer      ways(n)

// 1. Top-down memoisation - the recursion you'd write anyway, plus a cache.
long long climbMemo(int i, vector<long long>& memo) {
    if (i <= 1) return 1;
    if (memo[i] != -1) return memo[i];
    return memo[i] = climbMemo(i - 1, memo) + climbMemo(i - 2, memo);
}

// 2. Bottom-up tabulation - same recurrence, filled in dependency order.
long long climbTable(int n) {
    if (n <= 1) return 1;
    vector<long long> dp(n + 1);
    dp[0] = dp[1] = 1;
    for (int i = 2; i <= n; ++i) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

// 3. Space-optimised - the recurrence only reaches back two states,
//    so two variables replace the entire table. O(n) time, O(1) space.
long long climbRolling(int n) {
    long long prev = 1, cur = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = prev + cur;
        prev = cur;
        cur = next;
    }
    return cur;
}

int main() {
    int n = 10;
    vector<long long> memo(n + 1, -1);
    cout << climbMemo(n, memo) << ' '
         << climbTable(n) << ' '
         << climbRolling(n) << '\\n';   // 89 89 89
}`,
  },

  "union-find-basics": {
    walkthrough: [
      {
        heading: "The problem it solves",
        body: [
          "Union Find, also called Disjoint Set Union, answers one question repeatedly: are these two things in the same group? And it supports one modification: merge these two groups. That is the entire interface — find and union — and it turns out to be exactly what a surprising number of problems need.",
          "The obvious alternative is to run a graph traversal each time you are asked. That costs O(V + E) per query, which is fine once and hopeless if you are asked a hundred thousand times. Union Find answers each query in effectively constant time, and crucially it handles edges arriving one at a time, which a traversal cannot do without redoing everything.",
        ],
      },
      {
        heading: "The representation: forests of pointers",
        body: [
          "Each element points to a parent. Follow the parent chain far enough and you reach an element that points to itself — that is the root, and the root is the group's identity. Two elements are in the same group exactly when they have the same root.",
          "Initially every element is its own root, so there are n groups of one. Union works by finding both roots and making one point to the other. Find works by walking up to the root. That is the naive version, and it is already correct — the two optimisations below are purely about speed.",
        ],
        trace: `Start: 5 elements, 5 groups

  parent = [0, 1, 2, 3, 4]
            0  1  2  3  4      each points to itself

union(0, 1):  root(0)=0, root(1)=1 → parent[1] = 0

  parent = [0, 0, 2, 3, 4]        0
                                  |
                                  1

union(2, 3), then union(1, 3):

  parent = [0, 0, 0, 2, 4]        0
                                 / \\
                                1   2
                                    |
                                    3

find(3) walks 3 → 2 → 0. Same root as 1,
so connected(1, 3) is true.`,
      },
      {
        heading: "Why the naive version degrades",
        body: [
          "Nothing so far stops the tree becoming a chain. Union 0 with 1, then 1 with 2, then 2 with 3, and if each union attaches the existing root under the new element you end up with a path of length n. Every find then costs O(n), and you have built a linked list with extra steps.",
          "Both optimisations attack the same thing: keeping the trees flat. They are simple enough that there is no reason to omit them, and together they change the complexity from O(n) per operation to effectively O(1).",
        ],
      },
      {
        heading: "Optimisation 1 — union by size or rank",
        body: [
          "When merging two trees, always attach the smaller one under the larger one's root. If you do the reverse, the deeper tree gets deeper; doing it this way, the depth only increases when two trees of equal depth merge.",
          "The argument for why this bounds the depth at O(log n) is short and worth knowing: a tree only gains depth when it merges with one of equal depth, and doing so doubles its size. So a tree of depth d contains at least 2^d elements, which means d is at most log₂ n.",
          "Union by size — comparing element counts — and union by rank — comparing an upper bound on depth — both work. Size is easier to reason about and gives you group sizes for free, which many problems want anyway.",
        ],
        trace: `WITHOUT union by size — attaching the big tree
under the small one:

  0     then union with {1,2,3}:      4
  |                                   |
  1                                   0
  |                                   |
  2                                   1
  |                                   |
  3                                   2
                                      |
                                      3     depth 4

WITH union by size — smaller goes under larger:

      0                              0
     /|\\        + {4}   →         / | \\ \\
    1 2 3                         1  2 3  4     depth 1`,
      },
      {
        heading: "Optimisation 2 — path compression",
        body: [
          "When find walks from an element up to the root, it passes through every node on the path — and every one of those nodes belongs to the same group as the root. So on the way back, point each of them directly at the root. The next find on any of them is a single step.",
          "This is one extra line in the recursive version: instead of returning the root, assign it to parent[x] first and return that. The work is not wasted effort; you were walking the path anyway, and flattening it costs nothing extra.",
        ],
        trace: `find(3) on a chain, with path compression:

  before          walk 3→2→1→0      after
    0                                 0
    |                                /|\\
    1                               1 2 3
    |
    2            every node on the path
    |            now points straight at
    3            the root

Next find(3), find(2), find(1): one step each.`,
      },
      {
        heading: "Why the complexity is 'effectively constant'",
        body: [
          "With both optimisations, the amortised cost per operation is O(α(n)), where α is the inverse Ackermann function. This function grows so slowly that for any n you could physically store — including numbers far larger than the count of atoms in the observable universe — α(n) is under 5.",
          "So the honest statement is that it is not technically O(1), but it is bounded by a constant under 5 for every input that will ever exist. In an interview, say 'effectively constant, formally O(α(n)) with path compression and union by size' — that is the answer they are listening for.",
        ],
        aside:
          "Never compare parent[a] == parent[b] to test connectivity. Two elements can share the same group while sitting at different depths, so they can have different immediate parents. Always compare find(a) == find(b).",
      },
      {
        heading: "Recognising it in a problem statement",
        body: [
          "The signals are consistent. The problem talks about connectivity, groups, components, or merging. Edges or relationships arrive incrementally rather than being given up front. You need to count how many distinct groups remain, or find the size of the largest one. Or you are asked to detect whether adding an edge creates a cycle — which it does exactly when both endpoints already share a root.",
          "Kruskal's minimum spanning tree algorithm is the classic composition: sort edges by weight, then walk through them adding any edge whose endpoints are not already connected. Union Find is what makes that check fast.",
          "The important limitation: there is no efficient undo. Union Find handles merges beautifully and splits not at all. If a problem removes edges over time, the standard trick is to process the queries in reverse, turning removals into additions.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Union Find with both optimisations. Effectively O(1) per operation.
struct DSU {
    vector<int> parent, size;
    int components;

    explicit DSU(int n) : parent(n), size(n, 1), components(n) {
        iota(parent.begin(), parent.end(), 0);   // everyone is their own root
    }

    // Path compression: point every node on the path straight at the root.
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    // Union by size: the smaller tree goes under the larger root.
    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;              // already together
        if (size[ra] < size[rb]) swap(ra, rb);
        parent[rb] = ra;
        size[ra] += size[rb];
        --components;
        return true;
    }

    bool connected(int a, int b) { return find(a) == find(b); }
    int groupSize(int x) { return size[find(x)]; }
};

// Kruskal's MST - the classic use. Sort edges, add any that connect
// two components that are not yet joined.
long long kruskal(int n, vector<array<int,3>> edges) {  // {weight, u, v}
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long total = 0;
    for (auto& [w, u, v] : edges)
        if (dsu.unite(u, v)) total += w;         // unite() returns false
    return dsu.components == 1 ? total : -1;     // on a would-be cycle
}

// Iterative find, for when recursion depth is a concern.
int findIterative(vector<int>& parent, int x) {
    int root = x;
    while (parent[root] != root) root = parent[root];
    while (parent[x] != root) {                  // second pass compresses
        int next = parent[x];
        parent[x] = root;
        x = next;
    }
    return root;
}`,
  },
};
