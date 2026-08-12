/**
 * Enrichment batch 6 — Stage 4, part one: backtracking, greedy,
 * and binary search on the answer.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "backtracking-permutations": {
    illustration: `
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The recursion tree for permutations of three elements, showing choose, explore and un-choose at each level">
  <text x="0" y="14" class="dg-title">Permutations of [1,2,3] &#8212; every leaf is one complete answer</text>

  <g transform="translate(0,34)">
    <line x1="330" y1="34" x2="140" y2="74"  class="dg-link-hi"/>
    <line x1="330" y1="34" x2="330" y2="74"  class="dg-link"/>
    <line x1="330" y1="34" x2="520" y2="74"  class="dg-link"/>

    <line x1="140" y1="108" x2="80"  y2="148" class="dg-link-hi"/>
    <line x1="140" y1="108" x2="200" y2="148" class="dg-link"/>
    <line x1="330" y1="108" x2="290" y2="148" class="dg-link"/>
    <line x1="330" y1="108" x2="370" y2="148" class="dg-link"/>
    <line x1="520" y1="108" x2="470" y2="148" class="dg-link"/>
    <line x1="520" y1="108" x2="570" y2="148" class="dg-link"/>

    <line x1="80"  y1="182" x2="80"  y2="222" class="dg-link-hi"/>
    <line x1="200" y1="182" x2="200" y2="222" class="dg-link"/>
    <line x1="290" y1="182" x2="290" y2="222" class="dg-link"/>
    <line x1="370" y1="182" x2="370" y2="222" class="dg-link"/>
    <line x1="470" y1="182" x2="470" y2="222" class="dg-link"/>
    <line x1="570" y1="182" x2="570" y2="222" class="dg-link"/>

    <rect x="290" y="12" width="80" height="24" rx="3" class="dg-cell-mark"/>
    <text x="330" y="29" text-anchor="middle" class="dg-note">[ ]</text>

    <rect x="104" y="84" width="72" height="24" rx="3" class="dg-cell-live"/><text x="140" y="101" text-anchor="middle" class="dg-note">[1]</text>
    <rect x="294" y="84" width="72" height="24" rx="3" class="dg-cell"/><text x="330" y="101" text-anchor="middle" class="dg-note">[2]</text>
    <rect x="484" y="84" width="72" height="24" rx="3" class="dg-cell"/><text x="520" y="101" text-anchor="middle" class="dg-note">[3]</text>

    <rect x="44"  y="158" width="72" height="24" rx="3" class="dg-cell-live"/><text x="80"  y="175" text-anchor="middle" class="dg-note">[1,2]</text>
    <rect x="164" y="158" width="72" height="24" rx="3" class="dg-cell"/><text x="200" y="175" text-anchor="middle" class="dg-note">[1,3]</text>
    <rect x="254" y="158" width="72" height="24" rx="3" class="dg-cell"/><text x="290" y="175" text-anchor="middle" class="dg-note">[2,1]</text>
    <rect x="334" y="158" width="72" height="24" rx="3" class="dg-cell"/><text x="370" y="175" text-anchor="middle" class="dg-note">[2,3]</text>
    <rect x="434" y="158" width="72" height="24" rx="3" class="dg-cell"/><text x="470" y="175" text-anchor="middle" class="dg-note">[3,1]</text>
    <rect x="534" y="158" width="72" height="24" rx="3" class="dg-cell"/><text x="570" y="175" text-anchor="middle" class="dg-note">[3,2]</text>

    <rect x="40"  y="232" width="80" height="24" rx="3" class="dg-cell-hit"/><text x="80"  y="249" text-anchor="middle" class="dg-note">[1,2,3]</text>
    <rect x="160" y="232" width="80" height="24" rx="3" class="dg-cell-hit"/><text x="200" y="249" text-anchor="middle" class="dg-note">[1,3,2]</text>
    <rect x="250" y="232" width="80" height="24" rx="3" class="dg-cell-hit"/><text x="290" y="249" text-anchor="middle" class="dg-note">[2,1,3]</text>
    <rect x="330" y="232" width="80" height="24" rx="3" class="dg-cell-hit"/><text x="370" y="249" text-anchor="middle" class="dg-note">[2,3,1]</text>
    <rect x="430" y="232" width="80" height="24" rx="3" class="dg-cell-hit"/><text x="470" y="249" text-anchor="middle" class="dg-note">[3,1,2]</text>
    <rect x="530" y="232" width="80" height="24" rx="3" class="dg-cell-hit"/><text x="570" y="249" text-anchor="middle" class="dg-note">[3,2,1]</text>

    <text x="640" y="101" class="dg-label">3 choices</text>
    <text x="640" y="175" class="dg-label">2 left</text>
    <text x="640" y="249" class="dg-label">1 left</text>
  </g>

  <line x1="0" y1="304" x2="700" y2="304" class="dg-guide"/>
  <text x="0" y="326" class="dg-note">Going down = choose and mark used. Coming back up = un-choose, so the sibling branch starts clean.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Backtracking is DFS over decisions",
        body: [
          "Backtracking explores a tree that does not exist in memory. Each node is a partial solution, each edge is a decision, and each leaf is a complete candidate. You build the tree by making a choice, recursing, and then undoing that choice so the next sibling branch starts from a clean state.",
          "The undo is the entire distinction from ordinary DFS. In graph traversal you mark a node visited and leave it marked, because you want to see each node once. Here you un-mark on the way out, because the same element can legitimately appear in a different arrangement. Delete that one line and you get one solution instead of all of them.",
          "The template never changes: if the partial solution is complete, record it and return; otherwise, for each available choice — make it, recurse, unmake it. Everything problem-specific lives in what counts as complete, what the available choices are, and what makes a choice invalid.",
        ],
        trace: `THE TEMPLATE

  backtrack(state):
      if state is complete:
          record a COPY of it
          return

      for each choice available in state:
          if choice is invalid: continue

          apply(choice)          ← choose
          backtrack(state)       ← explore
          undo(choice)           ← un-choose

Three lines in the loop body, always in
that order. Nothing else varies.`,
      },
      {
        heading: "The copy that everyone forgets",
        body: [
          "When a leaf is reached you append the current partial solution to your results. If you append the list itself rather than a copy, every entry in your output points at the same object — and that object keeps mutating as the search continues. At the end you get n identical results, usually empty.",
          "This is the most common backtracking bug and it is silent: the code runs, the recursion is correct, the output is wrong. In Python write `result.append(path[:])` or `list(path)`. In C++, `push_back(path)` copies a vector by value so it is fine, but pushing a pointer or reference is not. In JavaScript, `result.push([...path])`.",
          "The same care applies to the undo. Whatever you did on the way in must be reversed exactly on the way out — if you pushed onto a list, pop; if you set a flag, clear it; if you overwrote a grid cell, restore the saved value, not a guess at what it was.",
        ],
        aside:
          "If your backtracking returns the right number of results but they are all identical, you appended the mutable path instead of a copy. If it returns too few, your undo is incomplete.",
      },
      {
        heading: "Pruning is where the performance is",
        body: [
          "The raw search space is exponential — n! for permutations, 2ⁿ for subsets. You cannot change that ceiling, but most problems never come close to it because whole branches can be discarded before being explored.",
          "Pruning means recognising, at a partial solution, that no completion of it can be valid, and returning immediately. In N-Queens you reject a square the moment it shares a row, column or diagonal with an existing queen, rather than placing all n queens and checking at the end. In Combination Sum, if the running total already exceeds the target and all values are positive, every extension overshoots — stop.",
          "The gain is not a constant factor. Cutting a branch at depth 3 of an n-deep tree discards everything beneath it, which is exponentially many leaves. This is why N-Queens is solvable for n = 12 despite a nominal search space of 12!, roughly 479 million.",
        ],
      },
      {
        heading: "Handling duplicates",
        body: [
          "When the input contains repeated values, the naive search emits the same result several times — once for each way of picking the same multiset of positions. Deduplicating afterwards works but wastes all the effort spent generating the repeats.",
          "The fix is to sort the input first, then skip a choice if it equals the previous one and the previous one was not used at this level. Sorting puts equal values adjacent so the check is local; the guard means that among a run of equal values, you always take them in left-to-right order and never start a branch with a later copy.",
          "The exact form of the guard differs by problem shape. For subsets and combinations, where you iterate from a start index, the condition is that the index is past the start and the value equals its predecessor. For permutations, where a used array tracks consumption, you additionally require that the predecessor is currently unused — meaning this branch would duplicate one already explored at the same level.",
        ],
        trace: `Subsets of [1, 2, 2] — sorted first

  WITHOUT the guard:
      [] [1] [1,2] [1,2,2] [1,2] [2] [2,2] [2]
                            ↑ dup       ↑ dup

  WITH  if (i > start && nums[i] == nums[i-1]) continue:
      [] [1] [1,2] [1,2,2] [2] [2,2]

  The second 2 may only extend a branch that
  already contains the first 2 — never start
  a fresh branch of its own.`,
      },
      {
        heading: "The four shapes",
        body: [
          "Almost every backtracking problem is one of four, and recognising which decides your loop structure.",
          "Subsets — each element is either in or out, giving 2ⁿ results. Loop from a start index, and record at every node rather than only at leaves, because every partial solution is itself a valid subset.",
          "Combinations — choose k of n, order irrelevant. Same start-index loop, but only record when the path reaches length k. The start index is what prevents [1,2] and [2,1] both appearing.",
          "Permutations — all n! orderings, order matters. Loop over every element each time with a used array, rather than a start index, because earlier elements remain available.",
          "Constraint satisfaction — N-Queens, Sudoku, word search. There is a board or grid, and the loop is over positions with a validity check. This is where pruning matters most, and where you often maintain incremental state — sets of occupied columns and diagonals — so that validity is O(1) rather than a rescan.",
        ],
      },
      {
        heading: "Cost, and when to stop",
        body: [
          "Complexity is the number of nodes in the search tree times the work per node. Permutations produce n! leaves and each costs O(n) to copy out, giving O(n · n!). Subsets give O(n · 2ⁿ). Combination-style problems sit between, depending on the branching factor.",
          "That output cost is unavoidable — if a problem asks for all 2ⁿ subsets, no algorithm beats O(2ⁿ), because there are that many things to emit. The question is only whether you are doing extra work beyond emitting.",
          "The signal to abandon backtracking is when the problem asks for a count or an optimum rather than a listing. 'How many ways' and 'what is the maximum' usually mean overlapping subproblems and therefore dynamic programming — enumerating every arrangement to count them is exponential where a DP is polynomial. Backtracking is for when you genuinely need the arrangements themselves.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// PERMUTATIONS - loop over every element, track what's consumed.
void permute(vector<int>& nums, vector<int>& path, vector<bool>& used,
             vector<vector<int>>& out) {
    if (path.size() == nums.size()) {
        out.push_back(path);          // vector copies by value - safe here
        return;
    }
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (used[i]) continue;

        path.push_back(nums[i]);      // choose
        used[i] = true;
        permute(nums, path, used, out);   // explore
        used[i] = false;              // un-choose - the line that makes
        path.pop_back();              // this backtracking rather than DFS
    }
}

// PERMUTATIONS WITH DUPLICATES - sort first, then skip a repeat whose
// identical predecessor is not currently in use at this level.
void permuteUnique(vector<int>& nums, vector<int>& path, vector<bool>& used,
                   vector<vector<int>>& out) {
    if (path.size() == nums.size()) { out.push_back(path); return; }
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (used[i]) continue;
        if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;

        path.push_back(nums[i]); used[i] = true;
        permuteUnique(nums, path, used, out);
        used[i] = false; path.pop_back();
    }
}

// SUBSETS - a start index prevents re-picking earlier elements, and
// every node is itself a valid answer, so record on entry not at leaves.
void subsets(const vector<int>& nums, int start, vector<int>& path,
             vector<vector<int>>& out) {
    out.push_back(path);                          // record at EVERY node
    for (int i = start; i < (int)nums.size(); ++i) {
        if (i > start && nums[i] == nums[i - 1]) continue;   // skip duplicates
        path.push_back(nums[i]);
        subsets(nums, i + 1, path, out);          // i+1: no reuse
        path.pop_back();
    }
}

// COMBINATION SUM with pruning. Sorted input lets us break rather than
// continue: if this candidate overshoots, so does everything after it.
void combinationSum(const vector<int>& candidates, int target, int start,
                    vector<int>& path, vector<vector<int>>& out) {
    if (target == 0) { out.push_back(path); return; }
    for (int i = start; i < (int)candidates.size(); ++i) {
        if (candidates[i] > target) break;        // PRUNE the whole tail
        path.push_back(candidates[i]);
        combinationSum(candidates, target - candidates[i], i, path, out);
        path.pop_back();                          // i, not i+1: reuse allowed
    }
}

// N-QUEENS. Incremental state makes validity O(1) instead of a rescan,
// and the pruning is what makes n = 12 feasible despite 12! candidates.
struct NQueens {
    int n;
    vector<int> queenCol;                 // queenCol[row] = chosen column
    vector<bool> colUsed, diagUsed, antiUsed;
    vector<vector<int>> solutions;

    explicit NQueens(int size)
        : n(size), colUsed(size, false),
          diagUsed(2 * size, false), antiUsed(2 * size, false) {}

    void place(int row) {
        if (row == n) { solutions.push_back(queenCol); return; }
        for (int col = 0; col < n; ++col) {
            int diag = row - col + n;     // +n keeps the index non-negative
            int anti = row + col;
            if (colUsed[col] || diagUsed[diag] || antiUsed[anti]) continue;

            queenCol.push_back(col);
            colUsed[col] = diagUsed[diag] = antiUsed[anti] = true;
            place(row + 1);
            colUsed[col] = diagUsed[diag] = antiUsed[anti] = false;
            queenCol.pop_back();
        }
    }
};`,
  },

  "greedy-activity-selection": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Sorting intervals by end time and greedily taking non-overlapping ones, contrasted with sorting by start or duration">
  <text x="0" y="14" class="dg-title">Sort by EARLIEST FINISH, then take anything that fits</text>

  <g transform="translate(20,32)">
    <text x="-14" y="14" class="dg-label">A</text>
    <rect x="0"   y="0"  width="130" height="20" rx="3" class="dg-cell-hit"/><text x="65"  y="15" text-anchor="middle" class="dg-note">1&#8211;4</text>
    <text x="-14" y="42" class="dg-label">B</text>
    <rect x="60"  y="28" width="130" height="20" rx="3" class="dg-cell-out"/><text x="125" y="43" text-anchor="middle" class="dg-note">3&#8211;7</text>
    <text x="-14" y="70" class="dg-label">C</text>
    <rect x="160" y="56" width="100" height="20" rx="3" class="dg-cell-hit"/><text x="210" y="71" text-anchor="middle" class="dg-note">5&#8211;8</text>
    <text x="-14" y="98" class="dg-label">D</text>
    <rect x="230" y="84" width="130" height="20" rx="3" class="dg-cell-out"/><text x="295" y="99" text-anchor="middle" class="dg-note">7&#8211;11</text>
    <text x="-14" y="126" class="dg-label">E</text>
    <rect x="290" y="112" width="100" height="20" rx="3" class="dg-cell-hit"/><text x="340" y="127" text-anchor="middle" class="dg-note">9&#8211;12</text>

    <line x1="0" y1="146" x2="420" y2="146" class="dg-line"/>
    <text x="430" y="15"  class="dg-good">take</text>
    <text x="430" y="43"  class="dg-bad">clash</text>
    <text x="430" y="71"  class="dg-good">take</text>
    <text x="430" y="99"  class="dg-bad">clash</text>
    <text x="430" y="127" class="dg-good">take</text>
    <text x="500" y="71"  class="dg-note">3 activities</text>
  </g>

  <line x1="0" y1="196" x2="700" y2="196" class="dg-guide"/>
  <text x="0" y="218" class="dg-title">Why the other two orderings fail</text>

  <g transform="translate(0,232)">
    <text x="0" y="14" class="dg-label">by START</text>
    <rect x="90"  y="0" width="230" height="20" rx="3" class="dg-cell-out"/><text x="205" y="15" text-anchor="middle" class="dg-note">1&#8211;12&#160;&#160;taken first, blocks everything</text>
    <rect x="330" y="0" width="80" height="20" rx="3" class="dg-cell-idle"/><text x="370" y="15" text-anchor="middle" class="dg-index">2&#8211;4</text>
    <rect x="414" y="0" width="80" height="20" rx="3" class="dg-cell-idle"/><text x="454" y="15" text-anchor="middle" class="dg-index">5&#8211;7</text>
    <text x="510" y="15" class="dg-bad">1 instead of 2</text>

    <text x="0" y="48" class="dg-label">by LENGTH</text>
    <rect x="90"  y="34" width="120" height="20" rx="3" class="dg-cell-out"/><text x="150" y="49" text-anchor="middle" class="dg-note">5&#8211;7 shortest</text>
    <rect x="220" y="34" width="100" height="20" rx="3" class="dg-cell-idle"/><text x="270" y="49" text-anchor="middle" class="dg-index">1&#8211;6</text>
    <rect x="330" y="34" width="100" height="20" rx="3" class="dg-cell-idle"/><text x="380" y="49" text-anchor="middle" class="dg-index">6&#8211;11</text>
    <text x="510" y="49" class="dg-bad">1 instead of 2</text>
  </g>

  <text x="0" y="312" class="dg-note">Earliest finish leaves the most room behind it. That is the property the exchange argument formalises.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What makes an algorithm greedy",
        body: [
          "A greedy algorithm builds a solution one step at a time, and at each step takes whatever looks best right now, never reconsidering. No lookahead, no undo, no table of subproblems.",
          "That makes greedy algorithms short and fast — usually a sort plus a single pass, so O(n log n). It also makes them wrong far more often than people expect. The whole difficulty of this topic is not implementing greedy, it is knowing when greedy is valid, because the code for a correct greedy and an incorrect one look equally reasonable.",
          "The distinguishing property is called the greedy choice property: there must exist an optimal solution that includes the locally-best choice. If that holds at every step, taking the local best never costs you the global optimum. If it does not hold, greedy produces something plausible and wrong.",
        ],
      },
      {
        heading: "Activity selection, and why earliest finish wins",
        body: [
          "The problem: given intervals, select as many as possible with no overlaps. Three orderings suggest themselves and only one works.",
          "Sorting by start time fails immediately — a single interval spanning the whole day gets picked first and blocks everything. Sorting by duration also fails: a short interval sitting across the middle can block two longer ones that would not have clashed with each other.",
          "Sorting by end time works. Take the interval that finishes earliest, discard everything that overlaps it, and repeat. The intuition is that finishing earliest leaves the maximum remaining room, so it can never be worse than any alternative first pick.",
        ],
      },
      {
        heading: "The exchange argument",
        body: [
          "Intuition is not proof, and interviewers ask for proof. The standard technique for greedy correctness is the exchange argument, and it is worth being able to run through.",
          "Suppose some optimal solution exists that does not start with the earliest-finishing interval, call it g. Take that optimal solution's first interval, call it x. Since g finishes no later than x, swapping x for g cannot create a conflict with anything else in the solution — everything after x started after x finished, and therefore after g finished too.",
          "So the exchange gives another solution of the same size that does include g. Repeat the argument on the remaining intervals and you build an optimal solution that agrees with greedy at every step. Therefore greedy is optimal.",
          "The general shape transfers: assume an optimum that differs from greedy, exchange greedy's choice in without making anything worse, conclude greedy is at least as good. When you cannot construct that exchange, that is a strong signal greedy does not apply and you should be reaching for DP.",
        ],
        trace: `EXCHANGE ARGUMENT, in outline

  Let  G = greedy's first pick (earliest finish)
       O = some optimal solution
       x = O's first pick

  If x = G, nothing to prove.
  Otherwise:  finish(G) ≤ finish(x)     (G finishes earliest)

  Every other interval in O starts after finish(x),
  hence after finish(G) too.

  So (O − x) ∪ {G} is:
      • still conflict-free
      • the same size as O
      • optimal, and it agrees with greedy

  Recurse on what remains.`,
      },
      {
        heading: "When greedy fails",
        body: [
          "The clearest counterexample is coin change. With denominations 1, 5, 10, 25, greedily taking the largest coin that fits is optimal — that is why the intuition feels safe. Change the set to 1, 3, 4 and make 6: greedy takes 4, then 1, then 1, for three coins. The optimum is 3 and 3, two coins. The greedy choice property fails because taking 4 destroys the option that would have paired better.",
          "The general warning sign is when a local choice consumes a resource that a later choice needed. In 0/1 knapsack, taking the item with the best value-to-weight ratio can use capacity that two other items would have filled more profitably — which is why 0/1 knapsack is DP and fractional knapsack, where you can take part of an item, is greedy.",
          "The practical test: try to construct a counterexample before trusting greedy. Two or three minutes of trying to break it is worth more than the same time spent implementing something wrong. If you cannot break it, try to state the exchange argument. If you can do neither, assume greedy is unproven and consider DP.",
        ],
        aside:
          "Greedy and DP look for the same thing — optimal substructure — but greedy also needs the greedy choice property. When only optimal substructure holds, DP works and greedy does not. That is exactly the coin-change situation.",
      },
      {
        heading: "The sorting key is the algorithm",
        body: [
          "In practice nearly all greedy interval problems reduce to choosing what to sort by, and the choice is not interchangeable.",
          "Sort by end time for maximum non-overlapping intervals, and for the closely related minimum-removals-to-eliminate-overlap, which is just n minus that count. Also for minimum arrows to burst balloons, where each arrow is placed at the earliest end point.",
          "Sort by start time for merging overlapping intervals, for inserting into a schedule, and for anything that sweeps left to right maintaining a current interval.",
          "Sort by a ratio or a custom comparator when the problem weights items. Fractional knapsack sorts by value per unit weight. Some scheduling problems sort by a pairwise comparison — 'does a before b beat b before a' — which is an exchange argument turned directly into a comparator.",
        ],
      },
      {
        heading: "Greedy with a heap",
        body: [
          "A large family of greedy algorithms needs the best remaining option at every step, where the set of options keeps changing. That is exactly what a heap provides, and the combination covers more ground than sorting alone.",
          "Huffman coding builds an optimal prefix code by repeatedly taking the two least frequent symbols, merging them, and pushing the merged node back. The greedy choice — always merge the two rarest — is provably optimal by an exchange argument on the two deepest leaves.",
          "Task scheduling with cooldowns, meeting rooms via a heap of end times, and Dijkstra's algorithm itself are all this pattern: repeatedly extract the current best, then update the frontier. Dijkstra is worth recognising as a greedy algorithm rather than a separate category — it commits to a node's distance the moment that node is extracted, and never revisits it.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// ACTIVITY SELECTION. Sort by END time - earliest finish leaves the
// most room behind it. Sorting by start or by duration both fail.
int maxActivities(vector<pair<int,int>> intervals) {   // {start, end}
    sort(intervals.begin(), intervals.end(),
         [](auto& a, auto& b) { return a.second < b.second; });

    int count = 0, lastEnd = INT_MIN;
    for (auto [start, end] : intervals) {
        if (start >= lastEnd) {          // fits after everything taken so far
            ++count;
            lastEnd = end;
        }
    }
    return count;
}

// Minimum removals to eliminate all overlaps - n minus the above.
int minRemovals(vector<pair<int,int>> intervals) {
    return (int)intervals.size() - maxActivities(intervals);
}

// FRACTIONAL knapsack IS greedy - sort by value per unit weight and
// fill. Note 0/1 knapsack is NOT: taking the best ratio can consume
// capacity that two other items would have used better.
double fractionalKnapsack(vector<pair<int,int>> items, int capacity) {
    // items: {value, weight}
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.first / a.second > (double)b.first / b.second;
    });

    double total = 0;
    for (auto [value, weight] : items) {
        if (capacity == 0) break;
        int take = min(capacity, weight);
        total += value * ((double)take / weight);   // partial take allowed
        capacity -= take;
    }
    return total;
}

// HUFFMAN CODING - greedy with a heap. Repeatedly merge the two rarest
// symbols; optimal by an exchange argument on the two deepest leaves.
long long huffmanCost(const vector<int>& frequencies) {
    priority_queue<long long, vector<long long>, greater<long long>> heap(
        frequencies.begin(), frequencies.end());

    long long total = 0;
    while (heap.size() > 1) {
        long long a = heap.top(); heap.pop();
        long long b = heap.top(); heap.pop();
        total += a + b;                  // this merge adds one bit to both
        heap.push(a + b);
    }
    return total;
}

// Minimum arrows to burst balloons - the same earliest-finish greedy.
int minArrows(vector<pair<int,int>> balloons) {
    if (balloons.empty()) return 0;
    sort(balloons.begin(), balloons.end(),
         [](auto& a, auto& b) { return a.second < b.second; });

    int arrows = 1;
    long long shotAt = balloons[0].second;      // fire at the earliest end
    for (auto [start, end] : balloons) {
        if (start > shotAt) {                   // this one was missed
            ++arrows;
            shotAt = end;
        }
    }
    return arrows;
}

// A comparator that IS an exchange argument: order two items by asking
// which arrangement of the pair is better. Largest concatenated number.
string largestNumber(vector<int> nums) {
    vector<string> parts;
    for (int x : nums) parts.push_back(to_string(x));

    sort(parts.begin(), parts.end(), [](const string& a, const string& b) {
        return a + b > b + a;            // "does a before b beat b before a?"
    });

    if (parts[0] == "0") return "0";
    string out;
    for (auto& p : parts) out += p;
    return out;
}`,
  },

  "array-binary-search-answer": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The feasibility line for candidate answers, false then true, with binary search converging on the boundary">
  <text x="0" y="14" class="dg-title">Search the ANSWER range, not the array &#8212; feasibility must be monotonic</text>

  <g transform="translate(20,40)">
    <text x="-10" y="-8" class="dg-label">candidate answer &#8212; can we finish in time at this speed?</text>
    <rect x="0"   y="0" width="60" height="30" rx="3" class="dg-cell-out"/><text x="30"  y="20" text-anchor="middle">1</text>
    <rect x="64"  y="0" width="60" height="30" rx="3" class="dg-cell-out"/><text x="94"  y="20" text-anchor="middle">2</text>
    <rect x="128" y="0" width="60" height="30" rx="3" class="dg-cell-out"/><text x="158" y="20" text-anchor="middle">3</text>
    <rect x="192" y="0" width="60" height="30" rx="3" class="dg-cell-hit"/><text x="222" y="20" text-anchor="middle">4</text>
    <rect x="256" y="0" width="60" height="30" rx="3" class="dg-cell-hit"/><text x="286" y="20" text-anchor="middle">5</text>
    <rect x="320" y="0" width="60" height="30" rx="3" class="dg-cell-hit"/><text x="350" y="20" text-anchor="middle">6</text>
    <rect x="384" y="0" width="60" height="30" rx="3" class="dg-cell-hit"/><text x="414" y="20" text-anchor="middle">7</text>
    <rect x="448" y="0" width="60" height="30" rx="3" class="dg-cell-hit"/><text x="478" y="20" text-anchor="middle">8</text>

    <text x="30"  y="50" text-anchor="middle" class="dg-bad">F</text>
    <text x="94"  y="50" text-anchor="middle" class="dg-bad">F</text>
    <text x="158" y="50" text-anchor="middle" class="dg-bad">F</text>
    <text x="222" y="50" text-anchor="middle" class="dg-good">T</text>
    <text x="286" y="50" text-anchor="middle" class="dg-good">T</text>
    <text x="350" y="50" text-anchor="middle" class="dg-good">T</text>
    <text x="414" y="50" text-anchor="middle" class="dg-good">T</text>
    <text x="478" y="50" text-anchor="middle" class="dg-good">T</text>

    <line x1="190" y1="-8" x2="190" y2="60" class="dg-link-cut"/>
    <text x="196" y="76" class="dg-ptr">the boundary &#8212; the answer is 4</text>
  </g>

  <line x1="0" y1="150" x2="700" y2="150" class="dg-guide"/>

  <g transform="translate(0,168)">
    <text x="0" y="0" class="dg-label">converging on it</text>

    <rect x="0"  y="10" width="330" height="24" rx="3" class="dg-cell-idle"/>
    <text x="10" y="27" class="dg-note">lo=1 hi=8&#160;&#160;mid=4&#160;&#160;feasible &#8594; hi=4&#160;&#160;(keep mid!)</text>

    <rect x="0"  y="40" width="330" height="24" rx="3" class="dg-cell-idle"/>
    <text x="10" y="57" class="dg-note">lo=1 hi=4&#160;&#160;mid=2&#160;&#160;not feasible &#8594; lo=3</text>

    <rect x="0"  y="70" width="330" height="24" rx="3" class="dg-cell-idle"/>
    <text x="10" y="87" class="dg-note">lo=3 hi=4&#160;&#160;mid=3&#160;&#160;not feasible &#8594; lo=4</text>

    <rect x="0"  y="100" width="330" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="117" class="dg-note">lo=4 hi=4&#160;&#160;&#8594; exit, answer 4</text>

    <rect x="360" y="10" width="330" height="114" rx="4" class="dg-cell-idle"/>
    <text x="374" y="32" class="dg-note">feasible(mid)&#160;&#8594;&#160;hi = mid</text>
    <text x="374" y="52" class="dg-note">&#160;&#160;mid might BE the answer, so keep it</text>
    <text x="374" y="76" class="dg-note">not feasible&#160;&#8594;&#160;lo = mid + 1</text>
    <text x="374" y="96" class="dg-note">&#160;&#160;mid is ruled out, so discard it</text>
    <text x="374" y="116" class="dg-note">log&#8322;(range) checks, each costing one O(n) scan</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "The reframing",
        body: [
          "Some optimisation problems are hard to solve directly but easy to verify. 'What is the smallest ship capacity that delivers all packages in D days' is awkward to compute; 'can capacity 17 deliver them in D days' is a simple greedy simulation. This pattern exploits that gap.",
          "Instead of searching the input array, you binary search the range of possible answers. At each candidate you run a yes/no feasibility check, and use the result to halve the range. The cost is O(log R) checks where R is the width of the answer range, each check typically O(n), giving O(n log R).",
          "The tell in the problem statement is superlative phrasing over a threshold: 'minimise the maximum', 'maximise the minimum', 'smallest capacity such that', 'largest size such that'. When you see one of those, ask whether you could verify a guess. If yes, this is the pattern.",
        ],
      },
      {
        heading: "Monotonicity is the requirement",
        body: [
          "Binary search only works because the feasible answers form one contiguous block. If ship capacity 17 works, capacity 18 must also work — a bigger ship can do anything a smaller one can. So the answer line reads false, false, false, true, true, true, and you are hunting the boundary.",
          "State this explicitly before writing code, because it is the assumption everything rests on. If feasibility can flip back and forth — feasible at 5, infeasible at 6, feasible at 7 — binary search lands somewhere arbitrary and gives no indication anything went wrong.",
          "The check is usually one sentence: 'if X works, does anything larger than X also work?' For capacity, speed and size the answer is normally yes by construction. When it is not obvious, that is a sign to look for a different approach rather than to hope.",
        ],
        aside:
          "Monotonicity failing is a silent bug, not a crash. The algorithm returns a number that looks like an answer. Verify the property in your head before trusting the output.",
      },
      {
        heading: "Two independent pieces",
        body: [
          "The implementation splits cleanly, and writing them separately is what keeps it manageable. The search skeleton is boilerplate you can memorise once. The feasibility function is problem-specific and is where all the thinking goes.",
          "Write the feasibility function first. It is usually a straightforward greedy simulation: given this capacity, walk the packages and count how many days it takes. Given this eating speed, sum the hours needed per pile. Given this maximum subarray sum, count how many pieces the array splits into.",
          "Once feasibility is correct, the skeleton is mechanical. Because feasibility is separate, you can test it directly on the extremes — it should be false at the lowest candidate and true at the highest — which catches most bugs before you have run the search at all.",
        ],
      },
      {
        heading: "Choosing the bounds",
        body: [
          "The low bound must be a value that could conceivably be the answer, and the high bound must be one that definitely works. Getting either wrong means the boundary sits outside your search range and you return garbage.",
          "For Split Array Largest Sum, the low bound is the largest single element — no partition can produce a maximum smaller than its biggest member, since that element must live in some part. The high bound is the total sum, which corresponds to one part holding everything. Starting at 0 instead of max(nums) is a common error; it does not break the search, but it wastes iterations and can mask a feasibility bug.",
          "For Koko Eating Bananas, the low bound is 1, since speed 0 never finishes, and the high bound is the largest pile, since eating faster than that cannot help — each pile takes at least one hour regardless.",
          "The bounds do not need to be tight, only correct. A loose range costs a few extra iterations at O(log R), which is nothing. A wrong range costs the answer.",
        ],
        trace: `Split an array into k parts, minimising
the largest part's sum.

  nums = [7, 2, 5, 10, 8],  k = 2

  lo = max(nums) = 10   ← 10 must live in some
                          part, so no answer is
                          smaller than 10
  hi = sum(nums)  = 32  ← one part holds it all

  feasible(18): 7+2+5 = 14 ✓,  10+8 = 18 ✓
                → 2 parts, ≤ k, feasible

  feasible(17): 7+2+5 = 14,  +10 = 24 > 17 → new part
                10+8 = 18 > 17 → new part
                → 3 parts, > k, not feasible

  answer = 18`,
      },
      {
        heading: "The two skeletons, and the loop that hangs",
        body: [
          "When minimising — finding the smallest feasible value — the midpoint rounds down, a feasible midpoint sets high to mid, and an infeasible one sets low to mid plus one. Low is the answer when the loop exits.",
          "When maximising — finding the largest feasible value — the assignments reverse: a feasible midpoint sets low to mid, and an infeasible one sets high to mid minus one. And the midpoint must round up.",
          "That rounding is not a stylistic detail; it is the difference between working and hanging forever. With low equal to 3 and high equal to 4, a rounding-down midpoint gives 3. If the branch then sets low to mid, low stays 3, high stays 4, and the loop repeats identically for eternity. Rule: any branch that assigns low equals mid requires the midpoint to round up.",
        ],
      },
      {
        heading: "Where else it shows up",
        body: [
          "Beyond the obvious capacity and speed problems, three variants are worth recognising.",
          "Placement problems — 'maximise the minimum distance between k items placed in these positions'. Feasibility is greedy: walk the sorted positions placing an item whenever the gap since the last placement is at least the candidate distance, and check whether you placed k of them.",
          "Searching a value space rather than an index space. Kth Smallest Element in a Sorted Matrix binary searches over the values themselves, using 'how many entries are at most x' as the check. Median of Two Sorted Arrays is a partition search of the same flavour.",
          "Real-valued answers, where the loop runs a fixed number of iterations rather than until the bounds meet. A hundred iterations of halving a floating-point range gets you well past any precision a judge will check, and it sidesteps the termination problems that comparing floats introduces.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// MINIMISING skeleton: the smallest feasible value.
// Midpoint rounds DOWN; a feasible mid is kept, not discarded.
long long searchMin(long long lo, long long hi,
                    const function<bool(long long)>& feasible) {
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;     // rounds down
        if (feasible(mid)) hi = mid;            // might be the answer - KEEP
        else               lo = mid + 1;        // ruled out - discard
    }
    return lo;
}

// MAXIMISING skeleton: the largest feasible value.
// Midpoint must round UP, or "lo = mid" never advances and this hangs.
long long searchMax(long long lo, long long hi,
                    const function<bool(long long)>& feasible) {
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2; // rounds UP - essential
        if (feasible(mid)) lo = mid;
        else               hi = mid - 1;
    }
    return lo;
}

// Koko eating bananas: smallest speed that finishes within h hours.
// lo = 1 (speed 0 never finishes), hi = biggest pile (faster cannot help,
// since every pile costs at least one hour regardless).
int minEatingSpeed(const vector<int>& piles, int h) {
    auto feasible = [&](long long speed) {
        long long hours = 0;
        for (int p : piles) hours += (p + speed - 1) / speed;   // ceil divide
        return hours <= h;
    };
    return (int)searchMin(1, *max_element(piles.begin(), piles.end()), feasible);
}

// Split into k subarrays, minimising the largest subarray sum.
// lo = max element: it must sit in SOME part, so no answer beats it.
// hi = total sum: one part holding everything.
int splitArray(const vector<int>& nums, int k) {
    auto feasible = [&](long long limit) {
        int parts = 1;
        long long current = 0;
        for (int x : nums) {
            if (current + x > limit) { ++parts; current = x; }
            else current += x;
        }
        return parts <= k;
    };
    long long lo = *max_element(nums.begin(), nums.end());
    long long hi = accumulate(nums.begin(), nums.end(), 0LL);
    return (int)searchMin(lo, hi, feasible);
}

// MAXIMISE the minimum: place k items as far apart as possible.
int maxMinDistance(vector<int> positions, int k) {
    sort(positions.begin(), positions.end());

    auto feasible = [&](long long gap) {
        int placed = 1;
        long long last = positions[0];
        for (size_t i = 1; i < positions.size(); ++i) {
            if (positions[i] - last >= gap) { ++placed; last = positions[i]; }
        }
        return placed >= k;                      // could we fit them all?
    };
    return (int)searchMax(0, positions.back() - positions.front(), feasible);
}

// Kth smallest in a sorted matrix: binary search the VALUES, using
// "how many entries are <= x" as the check. Counting walks the staircase
// from the bottom-left corner in O(n).
int kthSmallest(const vector<vector<int>>& matrix, int k) {
    int n = (int)matrix.size();
    auto countAtMost = [&](int x) {
        int count = 0, row = n - 1, col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= x) { count += row + 1; ++col; }
            else --row;
        }
        return count;
    };
    return (int)searchMin(matrix[0][0], matrix[n-1][n-1],
                          [&](long long x) { return countAtMost((int)x) >= k; });
}

// REAL-VALUED answers: fix the iteration count instead of comparing
// floats for equality. 100 halvings is far past any judged precision.
double searchReal(double lo, double hi, const function<bool(double)>& feasible) {
    for (int i = 0; i < 100; ++i) {
        double mid = (lo + hi) / 2;
        if (feasible(mid)) hi = mid;
        else               lo = mid;
    }
    return lo;
}`,
  },
};
