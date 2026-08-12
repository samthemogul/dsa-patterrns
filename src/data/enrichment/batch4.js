/**
 * Enrichment batch 4 — Stage 3, part one: tree traversal and BFS.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "trees-traversal": {
    illustration: `
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="One binary tree visited four ways, showing the output order of preorder, inorder, postorder and level order">
  <text x="0" y="14" class="dg-title">One tree, four visit orders</text>

  <g transform="translate(30,30)">
    <line x1="150" y1="42" x2="80"  y2="82"  class="dg-link"/>
    <line x1="150" y1="42" x2="220" y2="82"  class="dg-link"/>
    <line x1="80"  y1="122" x2="40"  y2="162" class="dg-link"/>
    <line x1="80"  y1="122" x2="120" y2="162" class="dg-link"/>
    <line x1="220" y1="122" x2="260" y2="162" class="dg-link"/>

    <circle cx="150" cy="22"  r="20" class="dg-cell-live"/><text x="150" y="27" text-anchor="middle">1</text>
    <circle cx="80"  cy="102" r="20" class="dg-cell"/><text x="80"  y="107" text-anchor="middle">2</text>
    <circle cx="220" cy="102" r="20" class="dg-cell"/><text x="220" y="107" text-anchor="middle">3</text>
    <circle cx="40"  cy="182" r="20" class="dg-cell"/><text x="40"  y="187" text-anchor="middle">4</text>
    <circle cx="120" cy="182" r="20" class="dg-cell"/><text x="120" y="187" text-anchor="middle">5</text>
    <circle cx="260" cy="182" r="20" class="dg-cell"/><text x="260" y="187" text-anchor="middle">6</text>
  </g>

  <g transform="translate(360,44)">
    <text x="0" y="0" class="dg-label">PREORDER &#8212; node, left, right</text>
    <rect x="0" y="8" width="290" height="26" rx="3" class="dg-cell-mark"/>
    <text x="10" y="26" class="dg-note">1&#160;&#160;2&#160;&#160;4&#160;&#160;5&#160;&#160;3&#160;&#160;6</text>
    <text x="120" y="26" class="dg-label">visit on the way DOWN</text>

    <text x="0" y="68" class="dg-label">INORDER &#8212; left, node, right</text>
    <rect x="0" y="76" width="290" height="26" rx="3" class="dg-cell-live"/>
    <text x="10" y="94" class="dg-note">4&#160;&#160;2&#160;&#160;5&#160;&#160;1&#160;&#160;3&#160;&#160;6</text>
    <text x="120" y="94" class="dg-label">sorted, if this is a BST</text>

    <text x="0" y="136" class="dg-label">POSTORDER &#8212; left, right, node</text>
    <rect x="0" y="144" width="290" height="26" rx="3" class="dg-cell-hit"/>
    <text x="10" y="162" class="dg-note">4&#160;&#160;5&#160;&#160;2&#160;&#160;6&#160;&#160;3&#160;&#160;1</text>
    <text x="120" y="162" class="dg-label">children before parent</text>

    <text x="0" y="204" class="dg-label">LEVEL ORDER &#8212; a queue, not recursion</text>
    <rect x="0" y="212" width="290" height="26" rx="3" class="dg-cell"/>
    <text x="10" y="230" class="dg-note">1&#160;&#160;2&#160;&#160;3&#160;&#160;4&#160;&#160;5&#160;&#160;6</text>
    <text x="120" y="230" class="dg-label">row by row</text>
  </g>

  <line x1="0" y1="300" x2="700" y2="300" class="dg-guide"/>
  <text x="0" y="322" class="dg-note">The three depth-first orders run identical code. Only the position of the visit line differs.</text>
</svg>`,
    walkthrough: [
      {
        heading: "One traversal, three positions",
        body: [
          "The three depth-first orders — preorder, inorder, postorder — are not three algorithms. They are one algorithm with the visit line in three different places. Recurse left, recurse right, and put the work before, between, or after those two calls.",
          "That is the whole distinction, and it maps directly onto the call stack. Anything you do before the recursive calls happens on the way down, while you still have no information from below. Anything after them happens on the way back up, once both children have finished and returned. Postorder is therefore the only order in which a node can see its children's results, which is why every tree DP is postorder.",
          "Level order is genuinely different. It cannot be expressed by moving a line, because it visits nodes across branches rather than down them, and that needs a queue instead of a stack. It is BFS applied to a tree.",
        ],
        trace: `void visit(node):
    if node is null: return

    // PREORDER position — on the way down
    visit(node.left)
    // INORDER position — between the children
    visit(node.right)
    // POSTORDER position — on the way back up

Move one line, get a different order.
Nothing else changes.`,
      },
      {
        heading: "Which order to use, and why",
        body: [
          "Preorder handles the root before anything below it, so it is what you want when a node's processing must happen before its children's — copying or serialising a tree, where the parent must exist before children can be attached to it, and printing a directory structure where the folder name comes before its contents.",
          "Inorder on a binary search tree yields the values in sorted order. That single fact is the answer to a large family of questions: validating a BST, finding the k-th smallest element, converting a BST to a sorted list, and finding the in-order successor. If a problem mentions a BST and sorted order in the same breath, inorder is the tool.",
          "Postorder handles children before the node, so it is what you need whenever a node's answer depends on its subtrees — computing height, diameter, or any tree DP, and deleting a tree, where you must free the children before you lose the pointer to them.",
        ],
        aside:
          "The BST-and-inorder connection is worth memorising rather than deriving. Validate BST, k-th smallest, BST to sorted list, in-order successor, recover a swapped BST — all of them are an inorder walk with a small amount of extra state.",
      },
      {
        heading: "Doing it without recursion",
        body: [
          "Recursion costs O(h) stack, and on a degenerate tree that is O(n) — deep enough input will overflow. The iterative versions matter, and preorder is the easy one: push the root, then repeatedly pop a node, visit it, and push its right child then its left. Right goes first because a stack reverses the order, so pushing right first makes left pop first.",
          "Iterative inorder is the one worth practising. Walk as far left as you can, pushing each node as you pass it. When you can go no further, pop, visit, and move to that node's right child. The stack is holding exactly the ancestors whose own visit has not happened yet.",
          "Iterative postorder is the awkward one, and the trick is to avoid it. Run the preorder loop but push left before right, giving node-right-left, then reverse the output. That is postorder, obtained without any of the two-visit bookkeeping the direct version needs.",
        ],
        trace: `ITERATIVE INORDER

  curr = root, stack = []

  while curr or stack:
      while curr:              ← run all the way left
          push(curr)
          curr = curr.left
      curr = pop()             ← nothing further left
      visit(curr)
      curr = curr.right        ← now handle the right subtree

The stack holds the ancestors whose visit
is still pending. That is exactly what the
call stack would have held.`,
      },
      {
        heading: "Level order and the level boundary",
        body: [
          "Level order uses a queue: enqueue the root, then repeatedly dequeue a node, visit it, and enqueue its children. The FIFO order guarantees that every node at depth d is processed before any node at depth d+1.",
          "Most problems want the levels separated, not one flat sequence — 'return a list of lists' or 'return the rightmost node of each row'. The clean way to do that is to record the queue's size at the top of each outer iteration, then process exactly that many nodes. Those are precisely the current level, because everything enqueued during the pass belongs to the next one.",
          "That one idea covers a surprising amount: level averages, zigzag order (reverse alternate levels), right side view (take the last node of each level), and minimum depth (return as soon as you dequeue a leaf, since BFS reaches the shallowest one first).",
        ],
        trace: `LEVEL-BY-LEVEL

  queue = [root]
  while queue:
      count = len(queue)       ← freeze the level size FIRST
      level = []
      repeat count times:
          node = dequeue()
          level.append(node.val)
          enqueue node's children
      output.append(level)

Reading len(queue) before the inner loop is
what separates the levels. Read it inside and
you sweep up the next level too.`,
      },
      {
        heading: "Morris traversal — O(1) space",
        body: [
          "Both recursion and an explicit stack cost O(h) space. Morris traversal does an inorder walk in O(1) by temporarily rewiring the tree itself.",
          "Before descending into a left subtree, find that subtree's rightmost node — the in-order predecessor of the current node — and point its right pointer at the current node. That thread is a breadcrumb: when the left subtree finishes, following it returns you to where you were, with no stack needed. On the second visit you find the thread already in place, remove it to restore the tree, and visit the node.",
          "It is worth knowing exists rather than reaching for by default. It mutates the tree during traversal, which makes it unusable if anything else might read the tree concurrently, and the constant factor is worse because each node's predecessor is located twice. Mention it if asked for O(1) space; use the stack otherwise.",
        ],
      },
      {
        heading: "Reconstructing a tree from traversals",
        body: [
          "A standard follow-up: given two traversal outputs, rebuild the tree. Preorder plus inorder works, and so does postorder plus inorder, but preorder plus postorder does not uniquely determine a binary tree — it cannot distinguish a single left child from a single right one.",
          "The construction reasons from what each order tells you. Preorder's first element is the root. Find that value in the inorder list; everything to its left is the left subtree and everything to its right is the right subtree, which also gives you their sizes. Slice the preorder list accordingly and recurse.",
          "The naive version searches the inorder list at every step, giving O(n²). Building a hash map from value to inorder index up front makes each lookup O(1) and the whole construction O(n). That improvement is usually the point of the question.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    explicit TreeNode(int v) : val(v) {}
};

// THE THREE DEPTH-FIRST ORDERS - identical code, one line moved.
void preorder(TreeNode* node, vector<int>& out) {
    if (!node) return;
    out.push_back(node->val);          // before the children
    preorder(node->left, out);
    preorder(node->right, out);
}

void inorder(TreeNode* node, vector<int>& out) {
    if (!node) return;
    inorder(node->left, out);
    out.push_back(node->val);          // between the children - sorted on a BST
    inorder(node->right, out);
}

void postorder(TreeNode* node, vector<int>& out) {
    if (!node) return;
    postorder(node->left, out);
    postorder(node->right, out);
    out.push_back(node->val);          // after both - children are done
}

// ITERATIVE PREORDER. Push right first: the stack reverses, so left pops first.
vector<int> preorderIterative(TreeNode* root) {
    vector<int> out;
    stack<TreeNode*> st;
    if (root) st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        out.push_back(node->val);
        if (node->right) st.push(node->right);
        if (node->left)  st.push(node->left);
    }
    return out;
}

// ITERATIVE INORDER. The stack holds ancestors whose visit is still pending.
vector<int> inorderIterative(TreeNode* root) {
    vector<int> out;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }  // run all the way left
        curr = st.top(); st.pop();
        out.push_back(curr->val);
        curr = curr->right;
    }
    return out;
}

// ITERATIVE POSTORDER, the easy way: do node-right-left, then reverse.
vector<int> postorderIterative(TreeNode* root) {
    vector<int> out;
    stack<TreeNode*> st;
    if (root) st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        out.push_back(node->val);
        if (node->left)  st.push(node->left);   // left first this time
        if (node->right) st.push(node->right);
    }
    reverse(out.begin(), out.end());
    return out;
}

// LEVEL ORDER, levels kept separate.
// Freezing the queue size BEFORE the inner loop is what separates them.
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> out;
    if (!root) return out;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int count = (int)q.size();          // this level, frozen
        vector<int> level;
        for (int i = 0; i < count; ++i) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        out.push_back(move(level));
    }
    return out;
}

// MORRIS INORDER - O(1) space, by threading the tree and unthreading it.
vector<int> morrisInorder(TreeNode* root) {
    vector<int> out;
    TreeNode* curr = root;
    while (curr) {
        if (!curr->left) {
            out.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* pred = curr->left;               // in-order predecessor
            while (pred->right && pred->right != curr) pred = pred->right;

            if (!pred->right) {
                pred->right = curr;                    // thread: breadcrumb back
                curr = curr->left;
            } else {
                pred->right = nullptr;                 // unthread: restore tree
                out.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return out;
}

// Rebuild from preorder + inorder. The index map makes it O(n) not O(n^2).
TreeNode* build(const vector<int>& pre, const vector<int>& in) {
    unordered_map<int,int> pos;
    for (int i = 0; i < (int)in.size(); ++i) pos[in[i]] = i;
    int p = 0;

    function<TreeNode*(int,int)> go = [&](int lo, int hi) -> TreeNode* {
        if (lo > hi) return nullptr;
        TreeNode* node = new TreeNode(pre[p++]);       // preorder gives the root
        int mid = pos[node->val];                      // inorder gives the split
        node->left  = go(lo, mid - 1);
        node->right = go(mid + 1, hi);
        return node;
    };
    return go(0, (int)in.size() - 1);
}`,
  },

  "graphs-traversal-bfs": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Breadth-first search expanding outward in rings from a source node, with the queue contents shown per level">
  <text x="0" y="14" class="dg-title">BFS expands in rings &#8212; every node in ring d is at distance d</text>

  <g transform="translate(40,40)">
    <circle cx="150" cy="110" r="105" class="dg-guide" fill="none"/>
    <circle cx="150" cy="110" r="60"  class="dg-guide" fill="none"/>

    <line x1="150" y1="110" x2="150" y2="50"  class="dg-link-hi"/>
    <line x1="150" y1="110" x2="90"  y2="110" class="dg-link-hi"/>
    <line x1="150" y1="110" x2="150" y2="170" class="dg-link-hi"/>
    <line x1="150" y1="50"  x2="150" y2="5"   class="dg-link"/>
    <line x1="90"  y1="110" x2="45"  y2="110" class="dg-link"/>
    <line x1="150" y1="170" x2="150" y2="215" class="dg-link"/>
    <line x1="150" y1="50"  x2="90"  y2="110" class="dg-link"/>

    <circle cx="150" cy="110" r="20" class="dg-cell-mark"/><text x="150" y="115" text-anchor="middle">S</text>
    <circle cx="150" cy="50"  r="18" class="dg-cell-hit"/><text x="150" y="55" text-anchor="middle">A</text>
    <circle cx="90"  cy="110" r="18" class="dg-cell-hit"/><text x="90"  y="115" text-anchor="middle">B</text>
    <circle cx="150" cy="170" r="18" class="dg-cell-hit"/><text x="150" y="175" text-anchor="middle">C</text>
    <circle cx="150" cy="5"   r="18" class="dg-cell-live"/><text x="150" y="10" text-anchor="middle">D</text>
    <circle cx="45"  cy="110" r="18" class="dg-cell-live"/><text x="45"  y="115" text-anchor="middle">E</text>
    <circle cx="150" cy="215" r="18" class="dg-cell-live"/><text x="150" y="220" text-anchor="middle">F</text>

    <text x="264" y="114" class="dg-label">dist 1</text>
    <text x="264" y="30"  class="dg-label">dist 2</text>
  </g>

  <g transform="translate(400,50)">
    <text x="0" y="0" class="dg-label">queue, level by level</text>

    <rect x="0" y="10" width="260" height="26" rx="3" class="dg-cell-mark"/>
    <text x="10" y="28" class="dg-note">[ S ]&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;count = 1</text>

    <text x="0" y="62" class="dg-label">&#8595; dequeue S, enqueue its neighbours</text>

    <rect x="0" y="72" width="260" height="26" rx="3" class="dg-cell-hit"/>
    <text x="10" y="90" class="dg-note">[ A, B, C ]&#160;&#160;&#160;&#160;count = 3</text>

    <text x="0" y="124" class="dg-label">&#8595; process exactly those three</text>

    <rect x="0" y="134" width="260" height="26" rx="3" class="dg-cell-live"/>
    <text x="10" y="152" class="dg-note">[ D, E, F ]&#160;&#160;&#160;&#160;count = 3</text>

    <rect x="0" y="180" width="260" height="46" rx="3" class="dg-cell-idle"/>
    <text x="10" y="198" class="dg-note">Freeze len(queue) at the top of</text>
    <text x="10" y="214" class="dg-note">each pass &#8212; that IS the level.</text>
  </g>

  <line x1="0" y1="300" x2="700" y2="300" class="dg-guide"/>
  <text x="0" y="322" class="dg-note">Mark visited when you ENQUEUE, not when you dequeue, or nodes get queued several times over.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What the queue guarantees",
        body: [
          "BFS explores a graph in rings. It visits every node at distance 1 from the source, then every node at distance 2, and so on outward. The queue is what enforces that: FIFO means a node enqueued earlier — and therefore discovered at a shallower depth — is always processed first.",
          "The consequence is the property BFS is used for. The first time you reach a node, you have reached it by a shortest path, measured in number of edges. Not one of the shortest paths — the shortest, because any shorter route would have been explored in an earlier ring. That is why BFS is the answer to unweighted shortest path and DFS is not.",
          "The cost is O(V + E): every vertex is enqueued once and every edge is examined once, twice for an undirected graph where each edge appears in both endpoints' lists. Space is O(V) for the visited set and the queue, and the queue can hold an entire level at once, which on a wide graph is most of the vertices.",
        ],
      },
      {
        heading: "Mark visited on enqueue, not on dequeue",
        body: [
          "This is the single most common BFS bug and it is worth understanding rather than memorising. If you only mark a node visited when you dequeue it, then between the moment it is enqueued and the moment it is processed, every other neighbour that discovers it will enqueue it again.",
          "On a sparse graph this looks harmless — you get duplicates and the answer is still right, because the extra copies are skipped when they finally surface. On a dense graph it is not harmless: a node with a thousand neighbours can be enqueued a thousand times, and the queue's size stops being bounded by V.",
          "Marking on enqueue makes the invariant clean: a node is in the visited set exactly when it has been discovered, and it enters the queue exactly once. Distance can be recorded at the same moment, since the distance is fixed the instant the node is discovered.",
        ],
        aside:
          "The same rule applies to recording distances. Set dist[neighbour] = dist[node] + 1 when you enqueue it. Any later route to that node is at least as long, so the first value written is already final and must never be overwritten.",
      },
      {
        heading: "The level-by-level variant",
        body: [
          "Plain BFS gives you a flat visiting order. Many problems want the levels separated — 'how many steps did it take', 'return each row', 'what is on the last level'. The technique is to capture the queue's size at the start of each outer pass and process exactly that many nodes.",
          "The nodes in the queue at that instant are precisely the current ring, because everything discovered while processing them lands behind them and belongs to the next ring. Freezing the count before the inner loop is what keeps the boundary; reading the queue's live size inside the loop sweeps the next level in with the current one.",
          "There are two ways to track distance and both are fine — carry it in a distance map keyed by node, or count outer passes with the level loop. The distance map is more flexible; the level counter is less code when you only need the final number.",
        ],
        trace: `Word Ladder: shortest transformation chain.

  queue = [(begin)], steps = 1
  while queue:
      count = len(queue)          ← freeze the ring
      repeat count times:
          word = dequeue()
          if word == target: return steps
          for each one-letter variant in the dictionary:
              if not visited:
                  mark visited      ← on ENQUEUE
                  enqueue it
      steps += 1                  ← one ring outward

The first time the target surfaces, the step
count is the shortest chain length. No later
route can be shorter.`,
      },
      {
        heading: "Grids are graphs",
        body: [
          "Most BFS interview questions are set on a grid rather than an explicit graph, and the translation is mechanical: each cell is a vertex, and its edges run to the up to four orthogonally adjacent cells. Nothing about the algorithm changes.",
          "The idiom worth adopting is a direction array — a list of the four offsets — so neighbour generation is one loop rather than four copy-pasted blocks. Copy-paste is where sign errors live. Some problems want eight directions including diagonals; the same loop handles it with a longer array.",
          "For visited marking on a grid you have a choice. A separate boolean grid is O(n) space and non-destructive. Overwriting the cell itself with a sentinel is O(1) extra space but mutates the input — offer that as the space-optimised version and say explicitly that it destroys the grid.",
        ],
      },
      {
        heading: "Multi-source BFS",
        body: [
          "A powerful variation that is barely a change to the code. Instead of enqueueing one source, enqueue several before the loop starts, all at distance zero. The rings then expand from all of them simultaneously, and every node ends up labelled with its distance to the nearest source.",
          "Rotting Oranges is the standard example: every rotten orange starts in the queue, and the answer is the number of rings needed to reach every fresh one. Walls and Gates fills each empty room with its distance to the closest gate. 01 Matrix labels every cell with its distance to the nearest zero.",
          "The naive alternative — run a separate BFS from each source and take the minimum — is O(sources × (V + E)). Multi-source does it in one pass at O(V + E). Recognising that a problem asks for 'distance to the nearest anything' is the trigger.",
        ],
        trace: `01 Matrix — distance to the nearest 0.

  enqueue EVERY zero cell at distance 0
  mark them visited
  then run ordinary BFS

  0 0 1 1        0 0 1 2
  0 1 1 1   →    0 1 2 3
  1 1 1 1        1 2 3 4

One pass, O(rows × cols), regardless of
how many zeros there are.`,
      },
      {
        heading: "BFS or DFS?",
        body: [
          "Use BFS when the question is about distance or the fewest steps. Shortest path in an unweighted graph, minimum moves, the level a node sits on, the nearest source. DFS gives you a path, but no reason to think it is a short one.",
          "Use DFS when the question is about reachability, structure, or exhaustive exploration. Connected components, cycle detection, topological order, and anything that needs to know when a subtree has finished. DFS is also less code, and on a deep narrow graph it uses far less memory than BFS, whose queue can hold an entire level.",
          "One important limit: BFS finds shortest paths only when every edge costs the same. Add weights and the ring argument collapses, because a two-edge route can be cheaper than a one-edge route. That is Dijkstra's territory. The exception is a graph with only weights 0 and 1, where a deque — pushing zero-weight edges to the front and one-weight edges to the back — restores the ordering and gives 0-1 BFS at O(V + E).",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Shortest path in an unweighted graph. dist[v] is final the moment v
// is discovered, because BFS reaches every node by a shortest route first.
vector<int> bfsDistances(const vector<vector<int>>& adj, int source) {
    vector<int> dist(adj.size(), -1);
    queue<int> q;
    dist[source] = 0;
    q.push(source);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        for (int next : adj[node]) {
            if (dist[next] != -1) continue;      // already discovered
            dist[next] = dist[node] + 1;         // set on ENQUEUE - final
            q.push(next);
        }
    }
    return dist;
}

// Reconstructing the path needs a parent array, filled at the same moment.
vector<int> shortestPath(const vector<vector<int>>& adj, int from, int to) {
    vector<int> parent(adj.size(), -2);
    queue<int> q;
    parent[from] = -1;
    q.push(from);

    while (!q.empty()) {
        int node = q.front(); q.pop();
        if (node == to) break;
        for (int next : adj[node])
            if (parent[next] == -2) { parent[next] = node; q.push(next); }
    }

    if (parent[to] == -2) return {};             // unreachable
    vector<int> path;
    for (int at = to; at != -1; at = parent[at]) path.push_back(at);
    reverse(path.begin(), path.end());
    return path;
}

// LEVEL BY LEVEL. Freezing the queue size is what separates the rings.
int ringsToReach(const vector<vector<int>>& adj, int source, int target) {
    if (source == target) return 0;
    vector<bool> seen(adj.size(), false);
    queue<int> q;
    seen[source] = true;
    q.push(source);

    int steps = 0;
    while (!q.empty()) {
        int count = (int)q.size();               // this ring, frozen
        ++steps;
        for (int i = 0; i < count; ++i) {
            int node = q.front(); q.pop();
            for (int next : adj[node]) {
                if (seen[next]) continue;
                if (next == target) return steps;
                seen[next] = true;               // mark on ENQUEUE
                q.push(next);
            }
        }
    }
    return -1;
}

// GRIDS. The direction array keeps neighbour generation to one loop -
// four copy-pasted blocks is where sign errors live.
const int DR[] = {-1, 1, 0, 0};
const int DC[] = { 0, 0,-1, 1};

// MULTI-SOURCE: seed the queue with every source at distance 0.
// One pass gives every cell its distance to the NEAREST source.
vector<vector<int>> nearestZero(const vector<vector<int>>& grid) {
    int rows = (int)grid.size(), cols = (int)grid[0].size();
    vector<vector<int>> dist(rows, vector<int>(cols, -1));
    queue<pair<int,int>> q;

    for (int r = 0; r < rows; ++r)
        for (int c = 0; c < cols; ++c)
            if (grid[r][c] == 0) { dist[r][c] = 0; q.push({r, c}); }

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        for (int d = 0; d < 4; ++d) {
            int nr = r + DR[d], nc = c + DC[d];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    return dist;
}

// 0-1 BFS: weights of only 0 and 1. A deque restores the ordering that
// plain BFS loses once edges stop costing the same - O(V + E), no heap.
vector<int> zeroOneBfs(const vector<vector<pair<int,int>>>& adj, int source) {
    vector<int> dist(adj.size(), INT_MAX);
    deque<int> dq;
    dist[source] = 0;
    dq.push_back(source);

    while (!dq.empty()) {
        int node = dq.front(); dq.pop_front();
        for (auto [next, weight] : adj[node]) {
            if (dist[node] + weight >= dist[next]) continue;
            dist[next] = dist[node] + weight;
            if (weight == 0) dq.push_front(next);   // free - same ring
            else             dq.push_back(next);    // costs 1 - next ring
        }
    }
    return dist;
}`,
  },
};
