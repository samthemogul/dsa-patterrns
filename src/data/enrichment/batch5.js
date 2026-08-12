/**
 * Enrichment batch 5 — Stage 3, part two: DFS, heaps, topological sort.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "graphs-traversal-dfs": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Depth-first search plunging down one branch before backtracking, with entry and exit times shown per node">
  <text x="0" y="14" class="dg-title">DFS commits to one branch until it dead-ends, then backtracks</text>

  <g transform="translate(30,34)">
    <line x1="130" y1="42" x2="70"  y2="82"  class="dg-link-hi"/>
    <line x1="130" y1="42" x2="200" y2="82"  class="dg-link"/>
    <line x1="70"  y1="122" x2="40"  y2="162" class="dg-link-hi"/>
    <line x1="70"  y1="122" x2="110" y2="162" class="dg-link"/>
    <line x1="200" y1="122" x2="200" y2="162" class="dg-link"/>

    <circle cx="130" cy="22"  r="20" class="dg-cell-mark"/><text x="130" y="27" text-anchor="middle">A</text>
    <circle cx="70"  cy="102" r="20" class="dg-cell-mark"/><text x="70"  y="107" text-anchor="middle">B</text>
    <circle cx="200" cy="102" r="20" class="dg-cell-live"/><text x="200" y="107" text-anchor="middle">C</text>
    <circle cx="40"  cy="182" r="20" class="dg-cell-mark"/><text x="40"  y="187" text-anchor="middle">D</text>
    <circle cx="110" cy="182" r="20" class="dg-cell-live"/><text x="110" y="187" text-anchor="middle">E</text>
    <circle cx="200" cy="182" r="20" class="dg-cell-live"/><text x="200" y="187" text-anchor="middle">F</text>

    <text x="156" y="18"  class="dg-ptr">1 / 12</text>
    <text x="96"  y="98"  class="dg-ptr">2 / 7</text>
    <text x="226" y="98"  class="dg-label">8 / 11</text>
    <text x="66"  y="178" class="dg-ptr">3 / 4</text>
    <text x="136" y="178" class="dg-label">5 / 6</text>
    <text x="226" y="178" class="dg-label">9 / 10</text>

    <text x="0" y="232" class="dg-label">labels are entry / exit time</text>
  </g>

  <g transform="translate(330,44)">
    <text x="0" y="0" class="dg-label">the stack over time</text>
    <rect x="0" y="10"  width="330" height="24" rx="3" class="dg-cell-mark"/>
    <text x="10" y="27" class="dg-note">A&#160;&#160;&#8594; enter A</text>
    <rect x="0" y="38"  width="330" height="24" rx="3" class="dg-cell-mark"/>
    <text x="10" y="55" class="dg-note">A B&#160;&#160;&#8594; plunge into B</text>
    <rect x="0" y="66"  width="330" height="24" rx="3" class="dg-cell-mark"/>
    <text x="10" y="83" class="dg-note">A B D&#160;&#160;&#8594; D is a dead end</text>
    <rect x="0" y="94"  width="330" height="24" rx="3" class="dg-cell-out"/>
    <text x="10" y="111" class="dg-note">A B&#160;&#160;&#8594; backtrack, exit D at 4</text>
    <rect x="0" y="122" width="330" height="24" rx="3" class="dg-cell-live"/>
    <text x="10" y="139" class="dg-note">A B E&#160;&#160;&#8594; try B's other child</text>
    <rect x="0" y="150" width="330" height="24" rx="3" class="dg-cell-out"/>
    <text x="10" y="167" class="dg-note">A&#160;&#160;&#8594; B done, exit at 7</text>
    <rect x="0" y="178" width="330" height="24" rx="3" class="dg-cell-live"/>
    <text x="10" y="195" class="dg-note">A C ...&#160;&#160;&#8594; only now does C begin</text>
  </g>

  <line x1="0" y1="298" x2="700" y2="298" class="dg-guide"/>
  <text x="0" y="320" class="dg-note">u is an ancestor of v exactly when entry(u) &lt; entry(v) &lt; exit(v) &lt; exit(u) &#8212; nested intervals.</text>
</svg>`,
    walkthrough: [
      {
        heading: "One branch at a time",
        body: [
          "DFS picks a neighbour and commits: it goes as deep as that branch allows before considering any alternative. Only when a path dead-ends does it back up and try the next option. Where BFS fans out in rings, DFS drives a single spike down and then sweeps sideways.",
          "The mechanism is a stack, whether you supply one explicitly or let the call stack do it for you. Recursion is the natural expression, and the recursive version is four lines: mark the node visited, then for each unvisited neighbour, recurse.",
          "The cost is the same as BFS — O(V + E) time, since each vertex and edge is handled once. Space differs in character: BFS holds an entire level, DFS holds a single root-to-current path. On a wide shallow graph DFS wins comfortably; on a deep narrow one it risks a stack overflow that BFS would not.",
        ],
      },
      {
        heading: "Entry and exit times",
        body: [
          "Record two timestamps per node — the moment you enter it and the moment you finish it — and DFS starts revealing structure that a plain visited flag hides.",
          "The key property is nesting: node u is an ancestor of node v in the DFS tree exactly when entry(u) < entry(v) < exit(v) < exit(u). One node's interval sits entirely inside the other's. That single test answers ancestor queries in O(1) after one traversal, which is the basis of several tree and graph techniques including Euler tours.",
          "The exit time is also what makes topological sorting work. A node's exit time is later than every node reachable from it, so sorting by decreasing exit time yields a valid topological order — which is exactly what the DFS variant of topological sort computes.",
        ],
        trace: `entry/exit for the tree above

  A  1 / 12        ┌───────────────────┐
  B  2 /  7        │ ┌───────┐         │
  D  3 /  4        │ │ ┌──┐  │         │
  E  5 /  6        │ │    ┌──┐         │
  C  8 / 11        │         ┌───────┐ │
  F  9 / 10        │         │ ┌───┐ │ │

Is B an ancestor of E?
  entry(B)=2 < entry(E)=5 < exit(E)=6 < exit(B)=7  ✓

Is B an ancestor of F?
  entry(B)=2 < entry(F)=9, but exit(B)=7 < exit(F)=10
  intervals overlap without nesting → no`,
      },
      {
        heading: "Edge classification, and finding cycles",
        body: [
          "During DFS every edge falls into one of four kinds, and distinguishing them is what turns DFS into a cycle detector. A tree edge leads to an undiscovered node. A back edge leads to a node currently on the recursion stack — an ancestor. A forward edge leads to an already-finished descendant, and a cross edge to an already-finished node that is neither.",
          "A directed graph has a cycle if and only if DFS finds a back edge. That is the whole test, and it is why a plain boolean visited array is not enough: it cannot tell 'currently on the stack' from 'finished long ago'. You need three states, conventionally white for undiscovered, grey for in progress, and black for finished. Reaching a grey node is a cycle; reaching a black one is not.",
          "Undirected graphs are simpler. Any edge back to an already-visited node is a cycle, with one exception — the edge you just came in on. So pass the parent down and ignore it. Watch out for multi-edges: if the graph can have two distinct edges between the same pair, skipping by parent identity is wrong and you should skip by edge index instead.",
        ],
        aside:
          "The two-state versus three-state distinction is the most common DFS bug in directed graphs. If your cycle detector reports cycles on a DAG, you are almost certainly treating 'already visited' as 'currently on the stack'.",
      },
      {
        heading: "Recursion depth is a real constraint",
        body: [
          "The recursive form is cleaner and shorter, and on a graph of 10⁵ nodes arranged in a path it will overflow the stack. Python's default limit is about 1000 frames; V8 allows roughly 10⁴; C++ typically manages a few hundred thousand before the 8MB stack runs out.",
          "Two ways out. Raise the limit, which in Python means sys.setrecursionlimit along with a larger thread stack, and is fine for a competitive submission but fragile in production. Or convert to an explicit stack, which is always safe.",
          "The iterative conversion is easy for preorder-style work: push the start node, then pop, visit, and push its unvisited neighbours. It is harder when you need postorder behaviour — 'do something after all children finish' — because you must know when a node's children are done. The usual technique is to push each node twice with a marker, or to track a per-node iterator position, which is precisely the bookkeeping recursion was doing for you.",
        ],
      },
      {
        heading: "What DFS is actually used for",
        body: [
          "Connected components. Loop over every vertex, and each time you find an unvisited one, run a DFS from it — everything that traversal reaches is one component. Counting islands in a grid is this exact algorithm.",
          "Cycle detection, via the back-edge test above, and topological sorting via exit times.",
          "Path existence and path enumeration. DFS with an undo step is backtracking, which is how you enumerate all paths, all subsets, or all valid configurations. The difference between DFS and backtracking is only whether you un-mark a node when you leave it.",
          "Structural properties that need finish-time information: bridges, articulation points, and strongly connected components via Kosaraju or Tarjan. All of them depend on knowing when a subtree completed, which BFS cannot tell you.",
        ],
      },
      {
        heading: "Backtracking is DFS with an undo",
        body: [
          "It is worth being explicit about the relationship, because they are usually taught as separate topics. In ordinary DFS a node is marked visited and stays marked, because you are exploring a fixed graph and want each node once. In backtracking you un-mark it on the way out, because you are exploring a space of configurations and the same node may legitimately appear on a different path.",
          "Word Search makes the distinction concrete: after failing to complete a word through a cell, you must release that cell so a different route can use it. Leave it marked and you have written a connectivity check, not a search.",
          "That one line — undo the mark after the recursive call returns — is the difference between the two entire topics. Everything else about the code is identical.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Recursive DFS - the natural form, but O(depth) stack.
void dfs(int node, const vector<vector<int>>& adj, vector<bool>& seen) {
    seen[node] = true;
    for (int next : adj[node])
        if (!seen[next]) dfs(next, adj, seen);
}

// Connected components: one DFS per unvisited vertex.
int countComponents(int n, const vector<vector<int>>& adj) {
    vector<bool> seen(n, false);
    int components = 0;
    for (int v = 0; v < n; ++v)
        if (!seen[v]) { ++components; dfs(v, adj, seen); }
    return components;
}

// Entry and exit times. u is an ancestor of v iff their intervals nest:
// entry[u] < entry[v] < exit[v] < exit[u].
struct Timer {
    vector<int> entry, exitTime;
    int clock = 0;

    void run(int node, const vector<vector<int>>& adj, vector<bool>& seen) {
        seen[node] = true;
        entry[node] = ++clock;
        for (int next : adj[node])
            if (!seen[next]) run(next, adj, seen);
        exitTime[node] = ++clock;              // set on the way back UP
    }

    bool isAncestor(int u, int v) const {
        return entry[u] < entry[v] && exitTime[v] < exitTime[u];
    }
};

// CYCLE DETECTION, DIRECTED. Needs three states: a boolean cannot tell
// "on the current stack" from "finished earlier".
enum Colour { WHITE, GREY, BLACK };

bool hasCycleDirected(int node, const vector<vector<int>>& adj,
                      vector<Colour>& colour) {
    colour[node] = GREY;                       // on the stack now
    for (int next : adj[node]) {
        if (colour[next] == GREY) return true;         // back edge - cycle
        if (colour[next] == WHITE && hasCycleDirected(next, adj, colour))
            return true;
        // BLACK means finished elsewhere - not a cycle
    }
    colour[node] = BLACK;                      // done
    return false;
}

// CYCLE DETECTION, UNDIRECTED. Any edge to a visited node is a cycle,
// except the one we arrived on - so carry the parent.
bool hasCycleUndirected(int node, int parent, const vector<vector<int>>& adj,
                        vector<bool>& seen) {
    seen[node] = true;
    for (int next : adj[node]) {
        if (next == parent) continue;                  // the edge we came in on
        if (seen[next]) return true;
        if (hasCycleUndirected(next, node, adj, seen)) return true;
    }
    return false;
}

// ITERATIVE DFS, for when recursion depth is a risk.
void dfsIterative(int start, const vector<vector<int>>& adj, vector<bool>& seen) {
    stack<int> st;
    st.push(start);
    while (!st.empty()) {
        int node = st.top(); st.pop();
        if (seen[node]) continue;              // may be stacked more than once
        seen[node] = true;
        for (int next : adj[node])
            if (!seen[next]) st.push(next);
    }
}

// BACKTRACKING is DFS with the mark UNDONE on the way out - one line.
bool wordSearch(vector<vector<char>>& board, const string& word,
                int r, int c, int i) {
    if (i == (int)word.size()) return true;
    if (r < 0 || r >= (int)board.size() ||
        c < 0 || c >= (int)board[0].size()) return false;
    if (board[r][c] != word[i]) return false;

    char saved = board[r][c];
    board[r][c] = '#';                         // mark, so this path can't reuse it

    bool found = wordSearch(board, word, r + 1, c, i + 1)
              || wordSearch(board, word, r - 1, c, i + 1)
              || wordSearch(board, word, r, c + 1, i + 1)
              || wordSearch(board, word, r, c - 1, i + 1);

    board[r][c] = saved;    // UNDO - a different route may need this cell.
                            // Leaving it marked turns this into a
                            // connectivity check rather than a search.
    return found;
}`,
  },

  "heaps-basics": {
    illustration: `
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A min-heap shown as both a tree and the flat array backing it, with sift-up after an insertion">
  <text x="0" y="14" class="dg-title">A heap is a complete tree stored in a flat array &#8212; no pointers</text>

  <g transform="translate(40,34)">
    <line x1="150" y1="42" x2="80"  y2="82"  class="dg-link"/>
    <line x1="150" y1="42" x2="220" y2="82"  class="dg-link"/>
    <line x1="80"  y1="122" x2="45"  y2="162" class="dg-link-hi"/>
    <line x1="80"  y1="122" x2="115" y2="162" class="dg-link"/>
    <line x1="220" y1="122" x2="185" y2="162" class="dg-link"/>

    <circle cx="150" cy="22"  r="19" class="dg-cell-hit"/><text x="150" y="27" text-anchor="middle">2</text>
    <circle cx="80"  cy="102" r="19" class="dg-cell-mark"/><text x="80"  y="107" text-anchor="middle">4</text>
    <circle cx="220" cy="102" r="19" class="dg-cell"/><text x="220" y="107" text-anchor="middle">7</text>
    <circle cx="45"  cy="182" r="19" class="dg-cell-live"/><text x="45"  y="187" text-anchor="middle">9</text>
    <circle cx="115" cy="182" r="19" class="dg-cell"/><text x="115" y="187" text-anchor="middle">6</text>
    <circle cx="185" cy="182" r="19" class="dg-cell"/><text x="185" y="187" text-anchor="middle">8</text>

    <text x="176" y="18"  class="dg-label">i = 0</text>
    <text x="20"  y="98"  class="dg-label">1</text>
    <text x="246" y="98"  class="dg-label">2</text>
    <text x="10"  y="215" class="dg-label">3</text>
    <text x="105" y="215" class="dg-label">4</text>
    <text x="175" y="215" class="dg-label">5</text>
  </g>

  <g transform="translate(0,258)">
    <text x="0" y="0" class="dg-label">backing array</text>
    <rect x="0"   y="8" width="48" height="26" rx="3" class="dg-cell-hit"/><text x="24"  y="26" text-anchor="middle">2</text>
    <rect x="52"  y="8" width="48" height="26" rx="3" class="dg-cell-mark"/><text x="76"  y="26" text-anchor="middle">4</text>
    <rect x="104" y="8" width="48" height="26" rx="3" class="dg-cell"/><text x="128" y="26" text-anchor="middle">7</text>
    <rect x="156" y="8" width="48" height="26" rx="3" class="dg-cell-live"/><text x="180" y="26" text-anchor="middle">9</text>
    <rect x="208" y="8" width="48" height="26" rx="3" class="dg-cell"/><text x="232" y="26" text-anchor="middle">6</text>
    <rect x="260" y="8" width="48" height="26" rx="3" class="dg-cell"/><text x="284" y="26" text-anchor="middle">8</text>
    <text x="24"  y="52" text-anchor="middle" class="dg-index">0</text>
    <text x="76"  y="52" text-anchor="middle" class="dg-index">1</text>
    <text x="128" y="52" text-anchor="middle" class="dg-index">2</text>
    <text x="180" y="52" text-anchor="middle" class="dg-index">3</text>
    <text x="232" y="52" text-anchor="middle" class="dg-index">4</text>
    <text x="284" y="52" text-anchor="middle" class="dg-index">5</text>
  </g>

  <g transform="translate(350,246)">
    <rect x="0" y="0" width="330" height="72" rx="4" class="dg-cell-idle"/>
    <text x="14" y="22" class="dg-note">parent(i) = (i &#8722; 1) / 2</text>
    <text x="14" y="42" class="dg-note">left(i)&#160;&#160; = 2i + 1&#160;&#160;&#160;&#160;right(i) = 2i + 2</text>
    <text x="14" y="62" class="dg-note">Index 3's parent is (3&#8722;1)/2 = 1, holding 4. &#10003;</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "What a heap is, and what it deliberately is not",
        body: [
          "A heap keeps one promise: every parent is smaller than both its children, for a min-heap. That is a much weaker promise than sorting — it says nothing about how two siblings compare, or how a node compares to anything outside its own subtree. The only element whose position you know is the root, which is the minimum.",
          "That weakness is the point. A fully sorted structure costs O(n log n) to build and O(n) to insert into. A heap costs O(log n) per insertion and gives you the one element you actually asked for in O(1). If your problem only ever needs the extreme, paying for a total order is waste.",
          "The second half of the definition is shape: a heap is a complete binary tree, filled left to right with no gaps. That is what allows it to live in a flat array with no pointers at all.",
        ],
      },
      {
        heading: "The array trick",
        body: [
          "Because the tree is complete, you can number the nodes top to bottom, left to right, and store them in exactly those array slots. The parent-child relationships then become arithmetic: the children of index i sit at 2i+1 and 2i+2, and the parent of index i is at (i-1)/2 with integer division.",
          "This is why heaps are fast in practice as well as in theory. There are no node allocations, no pointer dereferences, and the traversal from a node to its parent is a shift rather than a memory fetch. A binary search tree with the same asymptotic bounds is meaningfully slower because every step chases a pointer to a random address.",
          "It also means the entire structure is one contiguous block, which is straightforward to copy, serialise, or hand to another routine.",
        ],
      },
      {
        heading: "Insert, and sift up",
        body: [
          "To insert, place the new element at the end of the array — the only position that keeps the tree complete — then repair the ordering by walking upward. Compare with the parent; if the new element is smaller, swap and continue; stop as soon as the parent is smaller or you reach the root.",
          "The repair is local. You never touch a sibling or any other branch, because the heap property only constrains parent-child pairs. At most log n swaps happen, one per level, which is where O(log n) comes from.",
          "It is worth seeing why the swap is safe: when you exchange a small child with a larger parent, the parent moves down into a position whose other child was already larger than it, so no new violation is created. Only the pair above needs re-checking.",
        ],
        trace: `Insert 3 into [2, 4, 7, 9, 6, 8]

  place at the end          [2, 4, 7, 9, 6, 8, 3]
                                                ↑ i=6

  parent(6) = (6-1)/2 = 2   → value 7
  3 < 7  → swap             [2, 4, 3, 9, 6, 8, 7]
                                   ↑ i=2

  parent(2) = (2-1)/2 = 0   → value 2
  3 > 2  → stop, heap property holds

  Two swaps, not six. Only the path to the
  root is ever touched.`,
      },
      {
        heading: "Extract, and sift down",
        body: [
          "Removing the minimum is the mirror image, with one wrinkle. You cannot simply delete the root, because that would leave a hole at the top. Instead take the last element, move it to the root, shrink the array by one, and repair downward.",
          "Sifting down compares the node with both children and swaps with the smaller of the two, then repeats. Swapping with the smaller child specifically is essential: swap with the larger one and the new parent is bigger than its remaining sibling, so you have created a fresh violation while fixing the old one.",
          "This is also the operation that makes heapsort work — repeatedly extract the minimum and you get the elements in order, at O(n log n) with O(1) extra space if you reuse the vacated tail of the array.",
        ],
        aside:
          "Swapping with the smaller child, not just any child that violates the order, is the classic sift-down bug. Write the comparison to select the smaller child first, then compare that one against the parent.",
      },
      {
        heading: "Building a heap in O(n), not O(n log n)",
        body: [
          "The obvious way to build a heap from n elements is n insertions, at O(n log n). There is a better way, and the reason it is faster is a nice piece of accounting worth knowing.",
          "Take the array as it is and sift down every node, starting from the last internal node and moving backwards to the root. Going backwards guarantees that when you sift down a node, both its subtrees are already valid heaps, which is exactly what sift-down requires.",
          "This is O(n). The intuition: sift-down's cost is proportional to a node's height, not the tree's height, and almost all nodes are near the bottom where the height is tiny. Half the nodes are leaves with height 0 and cost nothing at all; a quarter have height 1; only the single root has height log n. Summing height times count over all levels converges to 2n rather than n log n.",
        ],
        trace: `Heights, not depths, are what you pay for.

  level      nodes      height    work
  leaves      n/2          0       0
  next        n/4          1       n/4
  next        n/8          2       2n/8
  ...
  root         1        log n     log n

  Σ (n / 2^(h+1)) · h  →  n · Σ h/2^h  =  2n

The series converges. Building bottom-up is
linear; inserting one at a time is not.`,
      },
      {
        heading: "Max-heaps, and the languages that only give you one",
        body: [
          "Everything above describes a min-heap. A max-heap is the same structure with the comparison reversed, and most languages let you supply a comparator to get one — C++ takes a comparator type, and priority_queue is a max-heap by default, which trips up people arriving from Python.",
          "Python's heapq is min-only and offers no comparator parameter. The standard workaround is to push negated values and negate again on the way out. For tuples or objects, push a tuple whose first element is the negated sort key. It is ugly but it is idiomatic and everyone reading your code will recognise it.",
          "One more Python detail: heapq compares tuples element by element, so if two entries tie on the first element it will compare the second — and if that is an object with no ordering defined, it raises. The fix is to insert a unique tie-breaker, usually a monotonically increasing counter, as the second element.",
        ],
      },
      {
        heading: "When a heap is the answer",
        body: [
          "Repeated extraction of the extreme while the collection changes. If you only need the minimum once, a single linear scan is O(n) and beats building a heap. The heap pays off when you take the minimum repeatedly and insert as you go — which is exactly Dijkstra's algorithm and Prim's.",
          "Top-k problems. Keeping a heap of size k and evicting whenever it grows past k gives O(n log k), which beats sorting at O(n log n) when k is much smaller than n. Counter-intuitively, you use a max-heap to find the k smallest, because you need to evict the largest of your current candidates.",
          "Merging k sorted sequences. Put the head of each sequence in a heap and repeatedly take the smallest, pushing that sequence's next element. O(n log k) for n total elements.",
          "Two-heap patterns for running medians, where a max-heap holds the lower half and a min-heap the upper, and the median sits at one or both roots.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Built by hand, to show the mechanics. The array IS the tree.
struct MinHeap {
    vector<int> a;

    static int parent(int i) { return (i - 1) / 2; }
    static int left(int i)   { return 2 * i + 1; }
    static int right(int i)  { return 2 * i + 2; }

    int peek() const { return a[0]; }          // O(1) - the whole point
    bool empty() const { return a.empty(); }

    void push(int value) {
        a.push_back(value);                    // only spot that stays complete
        siftUp((int)a.size() - 1);
    }

    int pop() {
        int top = a[0];
        a[0] = a.back();                       // last element fills the hole
        a.pop_back();
        if (!a.empty()) siftDown(0);
        return top;
    }

    void siftUp(int i) {
        while (i > 0 && a[i] < a[parent(i)]) { // stop as soon as order holds
            swap(a[i], a[parent(i)]);
            i = parent(i);
        }
    }

    void siftDown(int i) {
        int n = (int)a.size();
        while (true) {
            int smallest = i, l = left(i), r = right(i);
            if (l < n && a[l] < a[smallest]) smallest = l;
            if (r < n && a[r] < a[smallest]) smallest = r;
            if (smallest == i) return;
            // Swapping with the SMALLER child matters: swap with the larger
            // and the new parent exceeds its remaining sibling.
            swap(a[i], a[smallest]);
            i = smallest;
        }
    }

    // O(n) construction. Backwards from the last internal node means both
    // subtrees are already valid heaps when each node is sifted.
    static MinHeap heapify(vector<int> values) {
        MinHeap h;
        h.a = move(values);
        for (int i = (int)h.a.size() / 2 - 1; i >= 0; --i) h.siftDown(i);
        return h;
    }
};

// The standard library version. NOTE: priority_queue is a MAX-heap.
void stdlibHeaps() {
    priority_queue<int> maxHeap;                                  // default
    priority_queue<int, vector<int>, greater<int>> minHeap;       // reversed

    // O(n) heapify over an existing container - the range constructor
    // uses the bottom-up build, not n separate pushes.
    vector<int> data = {5, 1, 8, 3};
    priority_queue<int> fromRange(data.begin(), data.end());

    // Custom ordering: closest to the origin first.
    auto byDistance = [](const pair<int,int>& a, const pair<int,int>& b) {
        return a.first * a.first + a.second * a.second >
               b.first * b.first + b.second * b.second;    // > gives a MIN-heap
    };
    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(byDistance)>
        closest(byDistance);
}

// Top-k largest with a MIN-heap of size k: the root is the weakest
// candidate, so it is the one to evict. O(n log k), beating a full sort.
vector<int> topK(const vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> heap;
    for (int x : nums) {
        heap.push(x);
        if ((int)heap.size() > k) heap.pop();   // drop the smallest so far
    }
    vector<int> out;
    while (!heap.empty()) { out.push_back(heap.top()); heap.pop(); }
    return out;
}

// Merging k sorted lists: O(n log k) rather than O(n log n).
vector<int> mergeKSorted(const vector<vector<int>>& lists) {
    using Entry = tuple<int,int,int>;           // value, list index, position
    priority_queue<Entry, vector<Entry>, greater<Entry>> heap;

    for (int i = 0; i < (int)lists.size(); ++i)
        if (!lists[i].empty()) heap.push({lists[i][0], i, 0});

    vector<int> out;
    while (!heap.empty()) {
        auto [value, list, pos] = heap.top(); heap.pop();
        out.push_back(value);
        if (pos + 1 < (int)lists[list].size())
            heap.push({lists[list][pos + 1], list, pos + 1});
    }
    return out;
}`,
  },

  "graphs-topological-sort": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Kahn's algorithm draining a dependency graph by repeatedly removing nodes whose in-degree has reached zero">
  <defs>
    <marker id="ts-a" viewBox="0 0 8 8" refX="10" refY="4" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow"/>
    </marker>
  </defs>

  <text x="0" y="14" class="dg-title">Kahn's algorithm &#8212; repeatedly take a node with no unmet prerequisites</text>

  <g transform="translate(20,40)">
    <line x1="45"  y1="30" x2="115" y2="30"  class="dg-link" marker-end="url(#ts-a)"/>
    <line x1="45"  y1="40" x2="115" y2="100" class="dg-link" marker-end="url(#ts-a)"/>
    <line x1="145" y1="40" x2="205" y2="100" class="dg-link" marker-end="url(#ts-a)"/>
    <line x1="145" y1="110" x2="205" y2="110" class="dg-link" marker-end="url(#ts-a)"/>

    <circle cx="25"  cy="30"  r="20" class="dg-cell-hit"/><text x="25"  y="35" text-anchor="middle">A</text>
    <circle cx="135" cy="30"  r="20" class="dg-cell"/><text x="135" y="35" text-anchor="middle">B</text>
    <circle cx="135" cy="110" r="20" class="dg-cell"/><text x="135" y="115" text-anchor="middle">C</text>
    <circle cx="225" cy="110" r="20" class="dg-cell"/><text x="225" y="115" text-anchor="middle">D</text>

    <text x="25"  y="72"  text-anchor="middle" class="dg-good">0</text>
    <text x="135" y="-2"  text-anchor="middle" class="dg-ptr">1</text>
    <text x="135" y="152" text-anchor="middle" class="dg-ptr">1</text>
    <text x="225" y="152" text-anchor="middle" class="dg-ptr">2</text>
    <text x="0" y="185" class="dg-label">numbers are in-degree &#8212; unmet prerequisites</text>
  </g>

  <g transform="translate(320,42)">
    <rect x="0" y="0" width="360" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="17" class="dg-note">queue [A]&#160;&#160;&#8594; take A, output A</text>

    <rect x="0" y="30" width="360" height="24" rx="3" class="dg-cell-live"/>
    <text x="10" y="47" class="dg-note">B:1&#8594;0&#160;&#160;C:1&#8594;0&#160;&#160;both reach zero, enqueue</text>

    <rect x="0" y="60" width="360" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="77" class="dg-note">queue [B, C]&#160;&#160;&#8594; take B, output B</text>

    <rect x="0" y="90" width="360" height="24" rx="3" class="dg-cell-live"/>
    <text x="10" y="107" class="dg-note">D:2&#8594;1&#160;&#160;still blocked by C</text>

    <rect x="0" y="120" width="360" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="137" class="dg-note">queue [C]&#160;&#160;&#8594; take C, output C&#160;&#160;&#160;D:1&#8594;0</text>

    <rect x="0" y="150" width="360" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="167" class="dg-note">queue [D]&#160;&#160;&#8594; take D, output D</text>

    <rect x="0" y="184" width="360" height="30" rx="3" class="dg-cell-mark"/>
    <text x="10" y="204" class="dg-note">order: A B C D&#160;&#160;&#8212;&#160;4 of 4 placed &#10003;</text>
  </g>

  <line x1="0" y1="292" x2="700" y2="292" class="dg-guide"/>
  <text x="0" y="314" class="dg-note">Fewer outputs than vertices means the leftovers are locked in a cycle &#8212; no valid order exists.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What it produces, and when it exists",
        body: [
          "A topological order lists the vertices of a directed graph so that every edge points forwards: if A must happen before B, A appears earlier. It is the answer to any question about satisfying dependencies — course prerequisites, build targets, task scheduling.",
          "Such an order exists if and only if the graph has no directed cycle. The reasoning is immediate: if A depends on B and B depends back on A, neither can go first. So a topological sort is simultaneously a cycle detector, and most problems in this family are really asking 'is this satisfiable' rather than 'give me the order'.",
          "The order is almost never unique. Any node with no unmet prerequisites is a legal next choice, so a graph with several such nodes has several valid orders. If a problem demands a specific one — lexicographically smallest, usually — you control the choice by swapping the queue for a priority queue.",
        ],
      },
      {
        heading: "Kahn's algorithm, step by step",
        body: [
          "Compute each node's in-degree — how many edges point at it, which is how many prerequisites it still has unmet. Seed a queue with every node whose in-degree is zero, since those depend on nothing and can go first.",
          "Then repeat: take a node from the queue, append it to the output, and for each of its outgoing edges decrement the target's in-degree. A target reaching zero has just had its last prerequisite satisfied, so enqueue it.",
          "The mental model that makes this stick is draining. You are peeling off the currently-unblocked layer, which unblocks the next layer, and so on. If the graph is acyclic, every node eventually reaches in-degree zero and the output holds all of them. If a cycle exists, the nodes inside it are each waiting on another node in the cycle, none ever reaches zero, and they never enter the queue.",
        ],
        aside:
          "The cycle check is the final length comparison, and it is easy to omit. If the output holds fewer than V nodes, the missing ones form a cycle. Without that check a cyclic graph silently returns a partial order that looks plausible.",
      },
      {
        heading: "Getting the edge direction right",
        body: [
          "This is where most attempts go wrong, and the problem statement is usually phrased in the opposite direction to the edge you need. 'To take course B you must first take course A' describes a dependency of B on A, but the edge runs A to B, because that is the direction the order flows.",
          "The reliable check is to ask what in-degree should mean. In-degree must count unmet prerequisites, so an edge must point from the prerequisite to the thing that needs it. Build the graph so that a node with no prerequisites has in-degree zero, and if your starting nodes come out with a non-zero in-degree, you have the edges backwards.",
          "LeetCode's course-schedule input is given as pairs [course, prerequisite], which reads naturally but is the reverse of the edge — the edge runs prerequisite to course. Reading that pair the wrong way round produces a valid-looking but wrong ordering, and it will pass some tests.",
        ],
        trace: `"B needs A"  and  "D needs B and C"

  EDGES point prerequisite → dependent:
      A → B      B → D      C → D

  in-degree:   A:0   B:1   C:0   D:2
               ↑ no prerequisites, so it starts

  Backwards (B → A) would give:
      in-degree A:1, B:0 — and the algorithm
      would try to take B before A.`,
      },
      {
        heading: "The DFS formulation",
        body: [
          "The alternative uses exit times. Run DFS, and append each node to a list after all of its descendants have finished. Reverse the list at the end and you have a topological order.",
          "Why it works: a node's finish time is later than every node reachable from it, so ordering by decreasing finish time puts every node before its dependents. Appending on the way out and reversing is exactly ordering by decreasing finish time.",
          "The catch is cycle detection. A plain visited boolean cannot distinguish a node currently on the recursion stack from one that finished earlier, so you need the three-colour scheme — white, grey, black — and a grey node encountered mid-traversal is a back edge and therefore a cycle. Kahn's gives you cycle detection with no extra machinery, which is why it is usually the better one to reach for under pressure.",
        ],
      },
      {
        heading: "Controlling which valid order you get",
        body: [
          "Because any zero-in-degree node is a legal next pick, you can impose a preference by choosing which one to take. Replace the plain queue with a min-heap and you always take the smallest available node, producing the lexicographically smallest topological order. The cost rises from O(V + E) to O(V + E log V).",
          "A different variation asks for the minimum time to finish everything when tasks can run in parallel. Run Kahn's level by level, exactly as with BFS: the number of rounds is the length of the longest dependency chain, which is the critical path. Parallel Courses is this question.",
          "When tasks have durations rather than unit cost, carry a completion time per node — a node's start time is the maximum of its prerequisites' finish times. That is longest-path-on-a-DAG, and processing in topological order is what makes it a simple linear scan rather than a search.",
        ],
      },
      {
        heading: "Recognising it",
        body: [
          "The direct signals: prerequisites, dependencies, build order, 'can all tasks be completed', 'is there a valid ordering'. Anything phrased as 'X must come before Y'.",
          "The indirect one worth knowing: Alien Dictionary. Given words sorted in an unknown alphabet, deduce the letter ordering. Comparing adjacent words gives the first position where they differ, and that yields one ordering constraint between two letters. Collect all such constraints and topologically sort them. The subtlety is the invalid case where a word is a prefix of a shorter word that precedes it, which no ordering can explain.",
          "Also worth noting: once vertices are in topological order, dynamic programming on a DAG becomes a straightforward linear pass, because every node's dependencies are already computed by the time you reach it. Longest path in a DAG is O(V + E) for exactly this reason, while longest path in a general graph is NP-hard.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// KAHN'S ALGORITHM. Returns the order, or an empty vector if a cycle exists.
// Edges must point prerequisite -> dependent, so in-degree counts unmet
// prerequisites and a node with none starts at zero.
vector<int> topologicalSort(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> indegree(n, 0);
    for (auto [from, to] : edges) {
        adj[from].push_back(to);
        ++indegree[to];
    }

    queue<int> q;
    for (int v = 0; v < n; ++v)
        if (indegree[v] == 0) q.push(v);       // nothing blocking these

    vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int next : adj[node])
            if (--indegree[next] == 0) q.push(next);   // last prereq satisfied
    }

    // Fewer than n placed means the rest are locked in a cycle.
    return (int)order.size() == n ? order : vector<int>{};
}

// Lexicographically smallest valid order: a heap instead of a queue.
// O(V + E log V) rather than O(V + E).
vector<int> topologicalSortSmallest(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> indegree(n, 0);
    for (auto [from, to] : edges) { adj[from].push_back(to); ++indegree[to]; }

    priority_queue<int, vector<int>, greater<int>> heap;
    for (int v = 0; v < n; ++v) if (indegree[v] == 0) heap.push(v);

    vector<int> order;
    while (!heap.empty()) {
        int node = heap.top(); heap.pop();
        order.push_back(node);
        for (int next : adj[node])
            if (--indegree[next] == 0) heap.push(next);
    }
    return (int)order.size() == n ? order : vector<int>{};
}

// DFS FORM. Append on the way OUT, then reverse - that is ordering by
// decreasing finish time. Three colours, because a boolean cannot tell
// "on the stack now" from "finished earlier".
vector<int> topologicalSortDfs(int n, const vector<vector<int>>& adj) {
    enum { WHITE, GREY, BLACK };
    vector<int> colour(n, WHITE), order;
    bool cyclic = false;

    function<void(int)> visit = [&](int node) {
        colour[node] = GREY;                   // on the stack
        for (int next : adj[node]) {
            if (colour[next] == GREY) { cyclic = true; return; }  // back edge
            if (colour[next] == WHITE) visit(next);
        }
        colour[node] = BLACK;
        order.push_back(node);                 // after all descendants
    };

    for (int v = 0; v < n && !cyclic; ++v)
        if (colour[v] == WHITE) visit(v);

    if (cyclic) return {};
    reverse(order.begin(), order.end());
    return order;
}

// Minimum rounds when independent tasks run in parallel - Kahn's, level
// by level. The round count is the longest dependency chain.
int parallelRounds(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> indegree(n, 0);
    for (auto [from, to] : edges) { adj[from].push_back(to); ++indegree[to]; }

    queue<int> q;
    for (int v = 0; v < n; ++v) if (indegree[v] == 0) q.push(v);

    int rounds = 0, placed = 0;
    while (!q.empty()) {
        int count = (int)q.size();             // everything runnable now
        ++rounds;
        for (int i = 0; i < count; ++i) {
            int node = q.front(); q.pop();
            ++placed;
            for (int next : adj[node])
                if (--indegree[next] == 0) q.push(next);
        }
    }
    return placed == n ? rounds : -1;          // -1 means a cycle
}`,
  },
};
