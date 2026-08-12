// Data Structures
export const name = "Data Structures";

export const topics = [
  {
    id: "structures-trees",
    title: "Trees: Types & Balance",
    subtitle: "Structure Primer",
    summary: "The vocabulary — full, complete, perfect, balanced — and the family from BST to B-tree.",
    complexity: {
      time: "O(log n)",
      space: "O(n)",
      note: "For a balanced tree. The whole point of the balancing machinery below is turning the O(n) worst case of a plain BST into this guarantee.",
    },
    illustration: `
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Four binary tree shapes side by side: full, complete, perfect and degenerate">
  <text x="0" y="14" class="dg-title">Four shapes, four different words &#8212; they are not interchangeable</text>

  <g transform="translate(10,32)">
    <line x1="55" y1="30" x2="30" y2="58" class="dg-link"/>
    <line x1="55" y1="30" x2="80" y2="58" class="dg-link"/>
    <line x1="80" y1="96" x2="60" y2="124" class="dg-link"/>
    <line x1="80" y1="96" x2="100" y2="124" class="dg-link"/>
    <circle cx="55"  cy="18"  r="14" class="dg-cell"/>
    <circle cx="30"  cy="76"  r="14" class="dg-cell"/>
    <circle cx="80"  cy="76"  r="14" class="dg-cell"/>
    <circle cx="60"  cy="140" r="14" class="dg-cell"/>
    <circle cx="100" cy="140" r="14" class="dg-cell"/>
    <text x="55" y="178" text-anchor="middle" class="dg-good">FULL</text>
    <text x="55" y="198" text-anchor="middle" class="dg-label">0 or 2 children,</text>
    <text x="55" y="214" text-anchor="middle" class="dg-label">never exactly 1</text>
  </g>

  <g transform="translate(185,32)">
    <line x1="55" y1="30" x2="30" y2="58" class="dg-link"/>
    <line x1="55" y1="30" x2="80" y2="58" class="dg-link"/>
    <line x1="30" y1="96" x2="12" y2="124" class="dg-link"/>
    <line x1="30" y1="96" x2="48" y2="124" class="dg-link"/>
    <circle cx="55" cy="18"  r="14" class="dg-cell"/>
    <circle cx="30" cy="76"  r="14" class="dg-cell"/>
    <circle cx="80" cy="76"  r="14" class="dg-cell"/>
    <circle cx="12" cy="140" r="14" class="dg-cell-live"/>
    <circle cx="48" cy="140" r="14" class="dg-cell-live"/>
    <text x="55" y="178" text-anchor="middle" class="dg-good">COMPLETE</text>
    <text x="55" y="198" text-anchor="middle" class="dg-label">every level full except</text>
    <text x="55" y="214" text-anchor="middle" class="dg-label">the last, filled LEFT</text>
  </g>

  <g transform="translate(360,32)">
    <line x1="55" y1="30" x2="30" y2="58" class="dg-link"/>
    <line x1="55" y1="30" x2="80" y2="58" class="dg-link"/>
    <line x1="30" y1="96" x2="12" y2="124" class="dg-link"/>
    <line x1="30" y1="96" x2="48" y2="124" class="dg-link"/>
    <line x1="80" y1="96" x2="62" y2="124" class="dg-link"/>
    <line x1="80" y1="96" x2="98" y2="124" class="dg-link"/>
    <circle cx="55" cy="18"  r="14" class="dg-cell"/>
    <circle cx="30" cy="76"  r="14" class="dg-cell"/>
    <circle cx="80" cy="76"  r="14" class="dg-cell"/>
    <circle cx="12" cy="140" r="14" class="dg-cell-hit"/>
    <circle cx="48" cy="140" r="14" class="dg-cell-hit"/>
    <circle cx="62" cy="140" r="14" class="dg-cell-hit"/>
    <circle cx="98" cy="140" r="14" class="dg-cell-hit"/>
    <text x="55" y="178" text-anchor="middle" class="dg-good">PERFECT</text>
    <text x="55" y="198" text-anchor="middle" class="dg-label">every level entirely</text>
    <text x="55" y="214" text-anchor="middle" class="dg-label">full &#8212; exactly 2&#7496;&#8314;&#185;&#8722;1 nodes</text>
  </g>

  <g transform="translate(545,32)">
    <line x1="30" y1="30" x2="48" y2="58" class="dg-link-cut"/>
    <line x1="55" y1="88" x2="73" y2="116" class="dg-link-cut"/>
    <line x1="80" y1="146" x2="98" y2="174" class="dg-link-cut"/>
    <circle cx="30"  cy="18"  r="14" class="dg-cell-out"/>
    <circle cx="55"  cy="76"  r="14" class="dg-cell-out"/>
    <circle cx="80"  cy="134" r="14" class="dg-cell-out"/>
    <circle cx="105" cy="192" r="14" class="dg-cell-out"/>
    <text x="55" y="228" text-anchor="middle" class="dg-bad">DEGENERATE</text>
    <text x="55" y="248" text-anchor="middle" class="dg-label">a linked list wearing</text>
    <text x="55" y="264" text-anchor="middle" class="dg-label">an extra pointer</text>
  </g>

  <line x1="0" y1="292" x2="700" y2="292" class="dg-guide"/>
  <text x="0" y="316" class="dg-note">A heap is COMPLETE, which is why it fits in a flat array. Perfect implies complete implies full.</text>
  <text x="0" y="336" class="dg-note">None of these mean BALANCED &#8212; balance is a statement about height, not about shape.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The words, and why they are not synonyms",
        body: [
          "Interviews use full, complete, perfect and balanced as if the distinctions are obvious, and they are not. Each describes a different constraint, and only one of them is about efficiency.",
          "A **full** binary tree has every node with either zero or two children — never exactly one. It says nothing about depth, so a full tree can still be lopsided.",
          "A **complete** binary tree has every level entirely filled except possibly the last, which is filled from the left with no gaps. This is the shape that maps onto a flat array with no wasted slots, which is why heaps are complete and why heap indices are pure arithmetic.",
          "A **perfect** binary tree has every level completely filled, so it has exactly 2^(h+1) - 1 nodes for height h. Perfect implies complete implies full; the implications do not run the other way.",
          "**Balanced** is different in kind. It is a statement about height rather than shape: the height is O(log n). The usual formal version is that for every node, the heights of its two subtrees differ by at most one — but the version that matters is the consequence, which is that operations are logarithmic.",
        ],
        trace: `Same 5 nodes, three arrangements

  FULL but not complete      COMPLETE but not full
        ●                          ●
       / \\                        / \\
      ●   ●                      ●   ●
         / \\                    /
        ●   ●                  ●

  The left tree never has a one-child node.
  The right fills left-to-right with no gaps.
  Neither implies the other.`,
      },
      {
        heading: "Height, depth, and the off-by-one that follows",
        body: [
          "Depth is measured downward from the root; height is measured upward from the leaves. The root has depth 0, and a leaf has height 0. A tree's height is the height of its root, which equals the depth of its deepest leaf.",
          "The convention people disagree on is whether a single node has height 0 or 1, and whether an empty tree has height -1 or 0. Both conventions exist in textbooks. The version used throughout this library — and the one that makes the arithmetic clean — is that an empty tree has height -1 and a single node has height 0, so height is the number of *edges* on the longest downward path, not the number of nodes.",
          "State your convention when asked for a tree's height in an interview. Getting an off-by-one here is common and it is not a knowledge failure, just an ambiguity in the question worth resolving out loud.",
          "The relationship that matters: a binary tree of height h has at most 2^(h+1) - 1 nodes, so a tree of n nodes has height at least log₂(n+1) - 1. That lower bound is what balancing tries to achieve, and it is why 'balanced' and 'O(log n)' are the same statement.",
        ],
      },
      {
        heading: "The unbalanced problem, and rotations",
        body: [
          "A plain binary search tree has no mechanism to control its shape. Insert sorted data and every value goes to the same side, producing a degenerate chain of height n where every operation is O(n). Since sorted or nearly-sorted input is extremely common, this is a practical failure, not a theoretical one.",
          "Self-balancing trees fix it with **rotations** — a local rearrangement that changes a subtree's height while preserving the search order. A right rotation takes a node and its left child and makes the child the new parent; the child's right subtree is reattached to the old parent. Four pointer updates, O(1), and the in-order sequence is unchanged.",
          "That last part is the key insight. A rotation cannot break the BST property, because it only moves subtrees between positions that already had the correct ordering relative to each other. So a tree can rebalance itself freely without any risk to correctness, and the only question is when to rotate and how many times.",
        ],
        trace: `Right rotation at y — order preserved

      y                    x
     / \\                  / \\
    x   C     ──►         A   y
   / \\                       / \\
  A   B                     B   C

  in-order before:  A x B y C
  in-order after:   A x B y C   ← identical

  B moves from x's right to y's left, and
  that is legal because B was already
  between x and y in the ordering.`,
      },
      {
        heading: "AVL and red-black — the two classic balancers",
        body: [
          "**AVL trees** store a balance factor per node — the height difference between its subtrees — and require it to stay in {-1, 0, 1}. After an insertion or deletion the factors are recomputed up the path, and a rotation (or a double rotation) is applied wherever the constraint breaks. The result is tightly balanced: height is at most about 1.44 log₂ n.",
          "**Red-black trees** colour each node red or black and enforce weaker rules: the root and leaves are black, a red node cannot have a red child, and every root-to-leaf path contains the same number of black nodes. Those constraints imply the longest path is at most twice the shortest, so height is at most 2 log₂(n+1).",
          "The trade is direct. AVL is more tightly balanced, so lookups are faster. Red-black allows more slack, so it does fewer rotations per insertion and deletion — at most two for insertion and three for deletion, versus AVL's possible cascade up the whole path.",
          "That is why the choice splits by workload. Read-heavy workloads favour AVL; write-heavy ones favour red-black. And red-black is what almost every standard library uses — C++'s `std::map` and `std::set`, Java's `TreeMap` and `TreeSet` — because general-purpose containers see a mix and the cheaper modification wins on average.",
        ],
        aside:
          "You will almost never implement either. What you should be able to say: a plain BST is O(n) worst case, self-balancing variants make it O(log n) guaranteed, AVL is stricter and faster to read, red-black is looser and faster to modify, and the library containers are red-black.",
      },
      {
        heading: "Beyond binary — B-trees and the disk",
        body: [
          "Binary trees assume that following a pointer is cheap. On disk it is not: reading one byte and reading four kilobytes cost the same, because the hardware transfers whole blocks. A binary tree of a billion keys is 30 levels deep, meaning 30 separate disk reads for one lookup.",
          "**B-trees** exploit the block by making each node hold many keys and many children — often hundreds. With a branching factor of 100, a billion keys fit in five levels, so a lookup is five block reads instead of thirty. The tree is kept balanced by splitting overfull nodes upward and merging underfull ones, which keeps every leaf at the same depth by construction.",
          "**B+ trees** refine this by storing values only in the leaves and linking the leaves together. Internal nodes become pure routing, so more keys fit per block and the branching factor rises further — and the linked leaves make a range scan a sequential walk rather than a tree traversal. This is why B+ trees back essentially every relational database index and most filesystems.",
          "The transferable idea is that the right structure depends on what an operation costs on the actual hardware. In memory, binary is fine because pointer chasing is cheap. On disk, the block size dictates the shape.",
        ],
      },
      {
        heading: "The specialised trees, and what each is for",
        body: [
          "Several structures in this library are trees with an extra invariant layered on, and seeing them as a family makes each easier to remember.",
          "A **heap** is a complete binary tree with the parent-child ordering property. Completeness is what lets it live in a flat array; the weak ordering is what makes it O(log n) to insert while giving O(1) access to the extreme.",
          "A **trie** is an n-ary tree where the path spells a key rather than the node storing it. Lookup depends on key length, not on how many keys are stored.",
          "A **segment tree** stores an aggregate over a range at each node, giving range queries with updates. A **Fenwick tree** is the same idea compressed into an implicit tree defined by bit arithmetic, trading generality for a much smaller constant.",
          "A **binary space partition tree**, quadtree or k-d tree partitions space rather than values, which is what makes them the right answer for nearest-neighbour and collision queries in graphics and geometry.",
        ],
      },
      {
        heading: "Choosing one",
        body: [
          "If you need exact-key lookup and nothing else, do not use a tree at all — a hash map is O(1) average against a tree's O(log n).",
          "If you need ordering, ranges, nearest-value queries, or sorted iteration, use the library's ordered map, which is a red-black tree. Building your own BST is an exercise, not a production choice.",
          "If you need repeated access to the minimum or maximum while the collection changes, use a heap. If you need prefix queries over strings, use a trie. If you need range aggregates with updates, use a segment or Fenwick tree.",
          "If the data lives on disk or is much larger than memory, you want a B+ tree — and in practice that means you want a database, which has already made this decision for you.",
        ],
      },
    ],
    useCases: [
      "Answering 'what kind of tree is this' precisely, which several interview questions depend on.",
      "Explaining why a plain BST degrades and what self-balancing actually does about it.",
      "Choosing between a hash map, an ordered map, a heap and a trie for a given access pattern.",
      "Understanding why database indexes are B+ trees rather than binary trees.",
      "Recognising heaps, tries and segment trees as members of one family rather than unrelated structures.",
    ],
    pitfalls: [
      "Treating full, complete and perfect as synonyms. They describe different constraints, and questions about heaps depend specifically on completeness.",
      "Assuming any of those shape properties imply balance. Balance is about height; a full tree can still be a chain of height n.",
      "Not stating your height convention. Whether a single node has height 0 or 1 is genuinely ambiguous — say which you are using.",
      "Claiming a BST is O(log n) without qualification. It is O(h), and h is O(n) unless something maintains balance.",
      "Reaching for a tree when a hash map would do. Ordering is the only thing a tree gives you that hashing does not.",
      "Assuming rotations can break the search order. They cannot — that is precisely why self-balancing is possible.",
    ],
    code: {
      python: `# The shape predicates, which the vocabulary above describes.

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def height(node):
    """Edges on the longest downward path. Empty = -1, single node = 0."""
    if not node:
        return -1
    return 1 + max(height(node.left), height(node.right))

def count(node):
    return 0 if not node else 1 + count(node.left) + count(node.right)

def is_full(node):
    """Every node has 0 or 2 children - never exactly 1."""
    if not node:
        return True
    if (node.left is None) != (node.right is None):
        return False                      # exactly one child
    return is_full(node.left) and is_full(node.right)

def is_perfect(node):
    """Every level entirely full: n == 2^(h+1) - 1."""
    return count(node) == 2 ** (height(node) + 1) - 1

def is_complete(node):
    """Levels full except the last, which fills from the LEFT.
    BFS and check that no node appears after the first gap."""
    from collections import deque
    if not node:
        return True
    queue, seen_gap = deque([node]), False
    while queue:
        current = queue.popleft()
        if current is None:
            seen_gap = True
        else:
            if seen_gap:
                return False              # a node after a gap
            queue.append(current.left)
            queue.append(current.right)
    return True

def is_balanced(node):
    """Heights of every node's subtrees differ by at most 1.
    Returns -2 as a sentinel for 'already unbalanced' so the whole
    check is a single O(n) pass rather than O(n log n)."""
    def check(n):
        if not n:
            return -1
        left = check(n.left)
        if left == -2:
            return -2
        right = check(n.right)
        if right == -2 or abs(left - right) > 1:
            return -2
        return 1 + max(left, right)
    return check(node) != -2


# ROTATION - the primitive every self-balancing tree is built from.
# Note the in-order sequence is unchanged, which is why it is safe.
def rotate_right(y):
    x = y.left
    y.left = x.right                      # B moves from x's right ...
    x.right = y                           # ... to y's left
    return x                              # x is the new subtree root

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    return y


# A minimal AVL insert, to show what "self-balancing" actually costs.
class AVLNode(TreeNode):
    def __init__(self, val):
        super().__init__(val)
        self.height = 0

def avl_height(n):
    return -1 if not n else n.height

def avl_update(n):
    n.height = 1 + max(avl_height(n.left), avl_height(n.right))

def avl_balance_factor(n):
    return 0 if not n else avl_height(n.left) - avl_height(n.right)

def avl_insert(node, val):
    if not node:
        return AVLNode(val)
    if val < node.val:
        node.left = avl_insert(node.left, val)
    elif val > node.val:
        node.right = avl_insert(node.right, val)
    else:
        return node                       # duplicates ignored

    avl_update(node)
    bf = avl_balance_factor(node)

    if bf > 1 and val < node.left.val:            # left-left
        return rotate_right(node)
    if bf < -1 and val > node.right.val:          # right-right
        return rotate_left(node)
    if bf > 1:                                    # left-right
        node.left = rotate_left(node.left)
        return rotate_right(node)
    if bf < -1:                                   # right-left
        node.right = rotate_right(node.right)
        return rotate_left(node)
    return node`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    int height = 0;                        // used by the AVL section below
    explicit TreeNode(int v) : val(v) {}
};

// Height in EDGES: empty is -1, a single node is 0. State your
// convention when asked - the alternative (nodes, not edges) is
// equally common and differs by one.
int height(TreeNode* node) {
    return node ? 1 + max(height(node->left), height(node->right)) : -1;
}

int countNodes(TreeNode* node) {
    return node ? 1 + countNodes(node->left) + countNodes(node->right) : 0;
}

// FULL: every node has 0 or 2 children, never exactly 1.
bool isFull(TreeNode* node) {
    if (!node) return true;
    if ((node->left == nullptr) != (node->right == nullptr)) return false;
    return isFull(node->left) && isFull(node->right);
}

// PERFECT: every level entirely full, so n == 2^(h+1) - 1.
bool isPerfect(TreeNode* node) {
    return countNodes(node) == (1 << (height(node) + 1)) - 1;
}

// COMPLETE: levels full except the last, filled from the LEFT.
// BFS including nulls; no real node may appear after the first gap.
// This is the property that lets a heap live in a flat array.
bool isComplete(TreeNode* node) {
    if (!node) return true;
    queue<TreeNode*> q;
    q.push(node);
    bool seenGap = false;

    while (!q.empty()) {
        TreeNode* current = q.front(); q.pop();
        if (!current) { seenGap = true; continue; }
        if (seenGap) return false;         // a node after a gap
        q.push(current->left);
        q.push(current->right);
    }
    return true;
}

// BALANCED: a statement about HEIGHT, not shape. Returning a sentinel
// short-circuits the whole check into one O(n) pass.
int balancedHeight(TreeNode* node) {
    if (!node) return -1;
    int left = balancedHeight(node->left);
    if (left == INT_MIN) return INT_MIN;
    int right = balancedHeight(node->right);
    if (right == INT_MIN || abs(left - right) > 1) return INT_MIN;
    return 1 + max(left, right);
}
bool isBalanced(TreeNode* node) { return balancedHeight(node) != INT_MIN; }

// ROTATION - the primitive underneath every self-balancing tree.
// Four pointer updates, O(1), and the IN-ORDER SEQUENCE IS UNCHANGED,
// which is exactly why rebalancing can never break the BST property.
TreeNode* rotateRight(TreeNode* y) {
    TreeNode* x = y->left;
    y->left = x->right;                    // B moves from x's right ...
    x->right = y;                          // ... to y's left
    return x;                              // x is the new subtree root
}

TreeNode* rotateLeft(TreeNode* x) {
    TreeNode* y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}

// AVL insert - the strict balancer. Balance factor must stay in
// {-1, 0, 1}, and four rotation cases restore it.
int avlHeight(TreeNode* n) { return n ? n->height : -1; }
void avlUpdate(TreeNode* n) {
    n->height = 1 + max(avlHeight(n->left), avlHeight(n->right));
}
int balanceFactor(TreeNode* n) {
    return n ? avlHeight(n->left) - avlHeight(n->right) : 0;
}

TreeNode* avlInsert(TreeNode* node, int val) {
    if (!node) return new TreeNode(val);
    if (val < node->val)      node->left  = avlInsert(node->left,  val);
    else if (val > node->val) node->right = avlInsert(node->right, val);
    else return node;

    avlUpdate(node);
    int bf = balanceFactor(node);

    if (bf >  1 && val < node->left->val)  return rotateRight(node);  // LL
    if (bf < -1 && val > node->right->val) return rotateLeft(node);   // RR
    if (bf >  1) { node->left  = rotateLeft(node->left);              // LR
                   return rotateRight(node); }
    if (bf < -1) { node->right = rotateRight(node->right);            // RL
                   return rotateLeft(node); }
    return node;
}

// The library's tree, which you should use instead of writing your own.
// std::map and std::set are RED-BLACK trees: looser balance than AVL,
// so fewer rotations per write, which suits a general-purpose container.
void useTheLibrary() {
    map<int, string> ordered;              // red-black, O(log n) guaranteed
    ordered[3] = "three";
    auto it = ordered.lower_bound(2);      // ordering is what you came for
    cout << it->second << '\\n';
}`,
      typescript: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Height in EDGES: empty is -1, single node is 0.
function height(node: TreeNode | null): number {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : -1;
}

function countNodes(node: TreeNode | null): number {
  return node ? 1 + countNodes(node.left) + countNodes(node.right) : 0;
}

// FULL - 0 or 2 children, never exactly 1.
function isFull(node: TreeNode | null): boolean {
  if (!node) return true;
  if ((node.left === null) !== (node.right === null)) return false;
  return isFull(node.left) && isFull(node.right);
}

// PERFECT - n === 2^(h+1) - 1.
function isPerfect(node: TreeNode | null): boolean {
  return countNodes(node) === 2 ** (height(node) + 1) - 1;
}

// COMPLETE - no real node may follow a gap in the level-order walk.
// This is the property a heap relies on for its array layout.
function isComplete(root: TreeNode | null): boolean {
  if (!root) return true;
  const queue: (TreeNode | null)[] = [root];
  let seenGap = false;

  for (let i = 0; i < queue.length; i++) {
    const node = queue[i];
    if (!node) { seenGap = true; continue; }
    if (seenGap) return false;
    queue.push(node.left, node.right);
  }
  return true;
}

// BALANCED - about height, not shape. The sentinel short-circuits so
// this is one O(n) pass rather than O(n log n).
function isBalanced(root: TreeNode | null): boolean {
  const UNBALANCED = Number.NEGATIVE_INFINITY;

  const check = (node: TreeNode | null): number => {
    if (!node) return -1;
    const left = check(node.left);
    if (left === UNBALANCED) return UNBALANCED;
    const right = check(node.right);
    if (right === UNBALANCED || Math.abs(left - right) > 1) return UNBALANCED;
    return 1 + Math.max(left, right);
  };

  return check(root) !== UNBALANCED;
}

// ROTATION - in-order order is preserved, which is why self-balancing
// trees can rearrange themselves freely without breaking the search
// property.
function rotateRight(y: TreeNode): TreeNode {
  const x = y.left!;
  y.left = x.right;        // B moves from x's right ...
  x.right = y;             // ... to y's left
  return x;
}

function rotateLeft(x: TreeNode): TreeNode {
  const y = x.right!;
  x.right = y.left;
  y.left = x;
  return y;
}

// JavaScript has no ordered map in the standard library - Map preserves
// INSERTION order, not sorted order. See the Ordered Maps & Sets topic
// for what to use instead.`,
    },
    problems: {
      easy: [
        { name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { name: "Balanced Binary Tree", url: "https://leetcode.com/problems/balanced-binary-tree/" },
        { name: "Minimum Depth of Binary Tree", url: "https://leetcode.com/problems/minimum-depth-of-binary-tree/" },
        { name: "Same Tree", url: "https://leetcode.com/problems/same-tree/" },
        { name: "Symmetric Tree", url: "https://leetcode.com/problems/symmetric-tree/" },
      ],
      medium: [
        { name: "Count Complete Tree Nodes", url: "https://leetcode.com/problems/count-complete-tree-nodes/" },
        { name: "Check Completeness of a Binary Tree", url: "https://leetcode.com/problems/check-completeness-of-a-binary-tree/" },
        { name: "Balance a Binary Search Tree", url: "https://leetcode.com/problems/balance-a-binary-search-tree/" },
        { name: "Convert Sorted Array to Binary Search Tree", url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
        { name: "Maximum Binary Tree", url: "https://leetcode.com/problems/maximum-binary-tree/" },
      ],
      hard: [
        { name: "Serialize and Deserialize Binary Tree", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
        { name: "Binary Tree Maximum Path Sum", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      ],
    },
  },

  {
    id: "structures-graphs",
    title: "Graphs: Representations & Terminology",
    subtitle: "Structure Primer",
    summary: "Adjacency list vs matrix vs edge list, and the vocabulary problems assume you already have.",
    complexity: {
      time: "O(V + E)",
      space: "O(V + E)",
      note: "For an adjacency list, which is the default. A matrix is O(V^2) space regardless of how few edges exist, and that is usually the deciding factor.",
    },
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The same graph shown as an adjacency list, an adjacency matrix and an edge list, with their costs compared">
  <text x="0" y="14" class="dg-title">One graph, three representations</text>

  <g transform="translate(20,36)">
    <line x1="34" y1="42" x2="76" y2="72" class="dg-link"/>
    <line x1="34" y1="52" x2="34" y2="86" class="dg-link"/>
    <line x1="76" y1="96" x2="42" y2="104" class="dg-link"/>

    <circle cx="24" cy="26" r="17" class="dg-cell"/><text x="24" y="31" text-anchor="middle">0</text>
    <circle cx="92" cy="84" r="17" class="dg-cell"/><text x="92" y="89" text-anchor="middle">1</text>
    <circle cx="24" cy="104" r="17" class="dg-cell"/><text x="24" y="109" text-anchor="middle">2</text>
    <text x="0" y="150" class="dg-label">undirected, 3 edges</text>
  </g>

  <g transform="translate(160,36)">
    <text x="0" y="0" class="dg-label">ADJACENCY LIST</text>
    <rect x="0" y="8"  width="150" height="22" rx="3" class="dg-cell-hit"/>
    <text x="8" y="24" class="dg-note">0 &#8594; [1, 2]</text>
    <rect x="0" y="34" width="150" height="22" rx="3" class="dg-cell-hit"/>
    <text x="8" y="50" class="dg-note">1 &#8594; [0, 2]</text>
    <rect x="0" y="60" width="150" height="22" rx="3" class="dg-cell-hit"/>
    <text x="8" y="76" class="dg-note">2 &#8594; [0, 1]</text>
    <text x="0" y="104" class="dg-good">O(V + E) space</text>
    <text x="0" y="122" class="dg-label">neighbours: O(deg)</text>
    <text x="0" y="138" class="dg-label">edge exists?: O(deg)</text>
  </g>

  <g transform="translate(350,36)">
    <text x="0" y="0" class="dg-label">ADJACENCY MATRIX</text>
    <rect x="30" y="8"  width="30" height="22" rx="2" class="dg-cell-idle"/><text x="45" y="24" text-anchor="middle" class="dg-index">0</text>
    <rect x="62" y="8"  width="30" height="22" rx="2" class="dg-cell-mark"/><text x="77" y="24" text-anchor="middle">1</text>
    <rect x="94" y="8"  width="30" height="22" rx="2" class="dg-cell-mark"/><text x="109" y="24" text-anchor="middle">1</text>
    <rect x="30" y="34" width="30" height="22" rx="2" class="dg-cell-mark"/><text x="45" y="50" text-anchor="middle">1</text>
    <rect x="62" y="34" width="30" height="22" rx="2" class="dg-cell-idle"/><text x="77" y="50" text-anchor="middle" class="dg-index">0</text>
    <rect x="94" y="34" width="30" height="22" rx="2" class="dg-cell-mark"/><text x="109" y="50" text-anchor="middle">1</text>
    <rect x="30" y="60" width="30" height="22" rx="2" class="dg-cell-mark"/><text x="45" y="76" text-anchor="middle">1</text>
    <rect x="62" y="60" width="30" height="22" rx="2" class="dg-cell-mark"/><text x="77" y="76" text-anchor="middle">1</text>
    <rect x="94" y="60" width="30" height="22" rx="2" class="dg-cell-idle"/><text x="109" y="76" text-anchor="middle" class="dg-index">0</text>
    <text x="0" y="104" class="dg-bad">O(V&#178;) space always</text>
    <text x="0" y="122" class="dg-label">neighbours: O(V)</text>
    <text x="0" y="138" class="dg-good">edge exists?: O(1)</text>
  </g>

  <g transform="translate(530,36)">
    <text x="0" y="0" class="dg-label">EDGE LIST</text>
    <rect x="0" y="8"  width="120" height="22" rx="3" class="dg-cell-live"/>
    <text x="8" y="24" class="dg-note">(0, 1)</text>
    <rect x="0" y="34" width="120" height="22" rx="3" class="dg-cell-live"/>
    <text x="8" y="50" class="dg-note">(0, 2)</text>
    <rect x="0" y="60" width="120" height="22" rx="3" class="dg-cell-live"/>
    <text x="8" y="76" class="dg-note">(1, 2)</text>
    <text x="0" y="104" class="dg-good">O(E) space</text>
    <text x="0" y="122" class="dg-label">neighbours: O(E)</text>
    <text x="0" y="138" class="dg-label">sorts well &#8212; Kruskal</text>
  </g>

  <line x1="0" y1="220" x2="700" y2="220" class="dg-guide"/>
  <text x="0" y="244" class="dg-note">A graph is SPARSE when E is around V, DENSE when E approaches V&#178;. Most real graphs are sparse,</text>
  <text x="0" y="264" class="dg-note">which is why the adjacency list is the default: a matrix for a million vertices needs 10&#185;&#178; cells.</text>
  <text x="0" y="296" class="dg-title">Undirected edges appear TWICE in an adjacency list &#8212; once in each endpoint.</text>
  <text x="0" y="318" class="dg-note">Forgetting the second insertion is the most common graph-building bug, and it fails silently.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The vocabulary problems assume",
        body: [
          "A graph is a set of **vertices** connected by **edges**. Everything else is qualification, and the qualifications matter because they change which algorithms apply.",
          "**Directed** edges go one way; **undirected** edges go both. This decides your cycle-detection algorithm, and whether topological sorting is even defined.",
          "**Weighted** edges carry a cost. This decides whether BFS finds shortest paths — it does on unweighted graphs and does not once weights vary.",
          "**Degree** is the number of edges at a vertex. Directed graphs split this into in-degree and out-degree, and in-degree is what Kahn's algorithm counts.",
          "A **path** is a sequence of vertices connected by edges; a **cycle** is a path returning to its start. **Connected** means every vertex is reachable from every other; for directed graphs, **strongly connected** means that holds following edge directions, and **weakly connected** means it holds if you ignore them.",
          "A **DAG** is a directed acyclic graph, and it is the precondition for topological sorting. A **tree** is a connected undirected graph with no cycles, which forces exactly V-1 edges — so a tree is a special case of a graph, not a separate thing.",
        ],
      },
      {
        heading: "Adjacency list — the default",
        body: [
          "Store, for each vertex, a list of its neighbours. Space is O(V + E), which for a sparse graph is close to the size of the input itself.",
          "Iterating a vertex's neighbours is O(degree), which is exactly what BFS and DFS want — they visit each vertex's neighbours once, giving the familiar O(V + E) total.",
          "Its weakness is answering 'is there an edge between u and v', which requires scanning u's list at O(degree). If a problem asks that repeatedly, either add a hash set per vertex or use a matrix.",
          "This is the right default for almost everything. Real graphs — road networks, social networks, dependency graphs — are overwhelmingly sparse, with average degree in the single or double digits regardless of size.",
        ],
      },
      {
        heading: "Adjacency matrix — when density or lookup wins",
        body: [
          "A V-by-V grid where cell (u, v) records whether an edge exists, and optionally its weight. Space is O(V²) whether the graph has a million edges or three.",
          "That fixed cost is the deciding factor. At V = 1,000 a matrix is a million cells, which is fine. At V = 100,000 it is ten billion, which is not — and a sparse graph that size fits comfortably in an adjacency list.",
          "What it buys is O(1) edge lookup, and simplicity. Floyd-Warshall is naturally expressed on a matrix because it repeatedly asks about arbitrary pairs. Dense-graph Prim uses a matrix to avoid materialising an edge list. And problems where the graph is given as a grid of distances are already in matrix form.",
          "The rule: use a matrix when V is small (under a few thousand), when the graph is dense, or when you need constant-time edge queries. Otherwise use a list.",
        ],
        trace: `Space at V = 100,000

  sparse graph, E = 500,000

  adjacency list   V + 2E  ≈  1.1 million entries
                            ≈  ~9 MB

  adjacency matrix V²      =  10,000,000,000 cells
                            ≈  10 GB as bytes

  Same graph. The matrix is not slower —
  it does not fit.`,
      },
      {
        heading: "Edge list — when you sort rather than traverse",
        body: [
          "Just a collection of (u, v) pairs, optionally with weights. Space is O(E) and there is no per-vertex structure at all.",
          "That makes traversal impractical — finding a vertex's neighbours means scanning every edge — but it is exactly right for algorithms that process edges as a batch rather than walking the graph.",
          "Kruskal's algorithm sorts all edges by weight and consumes them in order, so an edge list is its natural input. Bellman-Ford relaxes every edge repeatedly, which is a flat scan. Union Find problems generally arrive as edge lists because the edges are the input.",
          "Most problems give you an edge list and expect you to build an adjacency list from it as the first step. Doing that conversion cleanly is worth having as muscle memory.",
        ],
        aside:
          "When building an undirected adjacency list, add each edge to both endpoints' lists. Forgetting the second insertion produces a directed graph that looks correct on symmetric test cases and fails on others — it is the single most common graph-construction bug.",
      },
      {
        heading: "Implicit graphs",
        body: [
          "Many problems never mention a graph and are graph problems anyway. Recognising this is worth more than any implementation detail.",
          "A **grid** is a graph: each cell is a vertex, and its up-to-four orthogonal neighbours are its edges. Nothing is built — you generate neighbours on the fly from the coordinates. Every island, maze and flood-fill problem is this.",
          "A **state space** is a graph: each configuration is a vertex, and each legal move is an edge. Word Ladder treats words as vertices and single-letter changes as edges. Open the Lock treats each combination as a vertex. Sliding-puzzle problems are the same shape.",
          "Any **sequence where each value determines the next** is a graph where every vertex has out-degree one, which is why cycle detection on a linked list and on a repeated-function sequence are the same problem.",
          "The tell is that the problem asks for the fewest steps, or whether a target is reachable, over things that transform into other things. That is BFS on an implicit graph, and building an explicit adjacency list would usually be wasteful or impossible.",
        ],
      },
      {
        heading: "Special families worth naming",
        body: [
          "A **DAG** allows topological sorting, makes longest-path solvable in linear time (it is NP-hard in general), and lets DP run as a straight pass in topological order.",
          "A **bipartite** graph splits its vertices into two sets with no edges inside either set. Equivalent to being 2-colourable, and to containing no odd-length cycle. Matching problems live here.",
          "A **tree** is connected and acyclic with exactly V-1 edges. Any two of those three properties imply the third, which is a useful check: if you are told a graph has V-1 edges and is connected, it is a tree.",
          "A **complete** graph has every possible edge, so E is V(V-1)/2. This is the density ceiling and the case where a matrix is genuinely appropriate.",
          "A **multigraph** allows parallel edges between the same pair, and a **self-loop** is an edge from a vertex to itself. Both break naive algorithms — parent-based undirected cycle detection in particular — so check whether the problem permits them.",
        ],
      },
      {
        heading: "Building one, in practice",
        body: [
          "The standard opening move is converting the given edge list into an adjacency list, and there are two decisions to make deliberately.",
          "First, are the vertices already integers 0 to V-1? If so, a vector of vectors is fastest. If they are strings or arbitrary labels, either use a hash map from label to list, or map labels to indices once and work with integers — the latter is faster and worth doing when the graph is large.",
          "Second, is the graph directed? If not, insert both directions. This is where the common bug lives.",
          "For weighted graphs, store pairs of neighbour and weight rather than parallel arrays. And if a problem requires repeated edge-existence checks alongside traversal, keep both a list and a set — the memory cost is usually irrelevant next to getting the right complexity.",
        ],
      },
    ],
    useCases: [
      "Choosing a representation before writing any traversal, which determines the achievable complexity.",
      "Recognising grids, state spaces and word transformations as graphs when the problem never uses the word.",
      "Answering terminology questions — degree, strongly connected, bipartite, DAG — without hesitation.",
      "Knowing when a matrix is appropriate rather than reflexively reaching for a list, and vice versa.",
      "Converting between representations, which is the first step of most graph problems.",
    ],
    pitfalls: [
      "Building an undirected adjacency list and inserting each edge only once. The result is a directed graph and it fails silently on asymmetric cases.",
      "Using an adjacency matrix for a large sparse graph. It is not slow — it does not fit in memory.",
      "Assuming BFS gives shortest paths on a weighted graph. It does not; that requires equal edge costs.",
      "Forgetting that a vertex list may not be 0-indexed, or that some vertices may have no edges at all and so never appear in the edge list.",
      "Ignoring self-loops and parallel edges when the problem permits them — parent-based cycle detection breaks on both.",
      "Building an explicit graph for a grid or state space, when generating neighbours on the fly is simpler and uses no extra memory.",
    ],
    code: {
      python: `from collections import defaultdict, deque

# EDGE LIST -> ADJACENCY LIST. The standard opening move.
def build_adjacency(n, edges, directed=False):
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        if not directed:
            adj[v].append(u)      # BOTH directions - forgetting this is
    return adj                    # the most common graph-building bug

def build_weighted(n, edges, directed=False):
    adj = [[] for _ in range(n)]
    for u, v, w in edges:
        adj[u].append((v, w))
        if not directed:
            adj[v].append((u, w))
    return adj

# Non-integer labels: map to indices once, then work with integers.
def build_labelled(edges):
    index = {}
    def id_of(label):
        if label not in index:
            index[label] = len(index)
        return index[label]

    adj = defaultdict(list)
    for u, v in edges:
        a, b = id_of(u), id_of(v)
        adj[a].append(b)
        adj[b].append(a)
    return adj, index

# ADJACENCY MATRIX - O(V^2) space regardless of edge count, but O(1)
# edge lookup. Right for small or dense graphs only.
def build_matrix(n, edges, directed=False):
    matrix = [[0] * n for _ in range(n)]
    for u, v in edges:
        matrix[u][v] = 1
        if not directed:
            matrix[v][u] = 1
    return matrix

# DEGREES. Directed graphs split this in two, and in-degree is what
# Kahn's topological sort counts down.
def degrees(n, edges, directed=False):
    indeg, outdeg = [0] * n, [0] * n
    for u, v in edges:
        outdeg[u] += 1
        indeg[v] += 1
        if not directed:
            outdeg[v] += 1
            indeg[u] += 1
    return indeg, outdeg

# IMPLICIT GRAPH: a grid. No structure is built - neighbours are
# generated from the coordinates.
DIRECTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

def grid_neighbours(r, c, rows, cols):
    for dr, dc in DIRECTIONS:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            yield nr, nc

# IMPLICIT GRAPH: a state space. Word Ladder treats words as vertices
# and single-letter changes as edges, generated on demand.
def word_neighbours(word, dictionary):
    for i in range(len(word)):
        for ch in 'abcdefghijklmnopqrstuvwxyz':
            if ch == word[i]:
                continue
            candidate = word[:i] + ch + word[i+1:]
            if candidate in dictionary:
                yield candidate

# IS IT A TREE? Connected, acyclic, and exactly V-1 edges. Any two of
# the three imply the third, so checking connectivity plus the edge
# count is enough.
def is_tree(n, edges):
    if len(edges) != n - 1:
        return False
    adj = build_adjacency(n, edges)
    seen = {0}
    queue = deque([0])
    while queue:
        node = queue.popleft()
        for nxt in adj[node]:
            if nxt not in seen:
                seen.add(nxt)
                queue.append(nxt)
    return len(seen) == n          # connected with V-1 edges => a tree`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

// EDGE LIST -> ADJACENCY LIST. The standard opening move for most
// graph problems.
vector<vector<int>> buildAdjacency(int n, const vector<pair<int,int>>& edges,
                                   bool directed = false) {
    vector<vector<int>> adj(n);
    for (auto [u, v] : edges) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);   // BOTH directions - omitting
    }                                         // this silently builds a
    return adj;                               // DIRECTED graph instead
}

// Weighted: store {neighbour, weight} pairs, not parallel arrays.
vector<vector<pair<int,int>>> buildWeighted(int n,
        const vector<tuple<int,int,int>>& edges, bool directed = false) {
    vector<vector<pair<int,int>>> adj(n);
    for (auto [u, v, w] : edges) {
        adj[u].push_back({v, w});
        if (!directed) adj[v].push_back({u, w});
    }
    return adj;
}

// ADJACENCY MATRIX - O(V^2) space always. At V = 100,000 that is ten
// billion cells: not slow, but impossible. Use only when V is small
// or the graph is dense, or when you need O(1) edge lookup.
vector<vector<int>> buildMatrix(int n, const vector<pair<int,int>>& edges,
                                bool directed = false) {
    vector<vector<int>> matrix(n, vector<int>(n, 0));
    for (auto [u, v] : edges) {
        matrix[u][v] = 1;
        if (!directed) matrix[v][u] = 1;
    }
    return matrix;
}

// When both traversal AND fast edge lookup are needed, keep both.
// The extra memory is usually irrelevant next to the complexity win.
struct DualGraph {
    vector<vector<int>> adj;
    vector<unordered_set<int>> lookup;

    DualGraph(int n, const vector<pair<int,int>>& edges) : adj(n), lookup(n) {
        for (auto [u, v] : edges) {
            adj[u].push_back(v);   lookup[u].insert(v);
            adj[v].push_back(u);   lookup[v].insert(u);
        }
    }
    bool hasEdge(int u, int v) const { return lookup[u].count(v) > 0; }
};

// Labelled vertices: map to indices once, then work with integers.
// Faster than a hash map of lists on anything large.
pair<vector<vector<int>>, unordered_map<string,int>>
buildLabelled(const vector<pair<string,string>>& edges) {
    unordered_map<string,int> index;
    auto idOf = [&](const string& label) {
        auto [it, inserted] = index.try_emplace(label, (int)index.size());
        return it->second;
    };

    vector<pair<int,int>> numeric;
    for (auto& [u, v] : edges) numeric.push_back({idOf(u), idOf(v)});
    return {buildAdjacency((int)index.size(), numeric), index};
}

// IMPLICIT GRAPH - a grid. Nothing is built; neighbours come from the
// coordinates. The direction array keeps it to one loop.
const int DR[] = {-1, 1, 0, 0};
const int DC[] = { 0, 0,-1, 1};

vector<pair<int,int>> gridNeighbours(int r, int c, int rows, int cols) {
    vector<pair<int,int>> out;
    for (int d = 0; d < 4; ++d) {
        int nr = r + DR[d], nc = c + DC[d];
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push_back({nr, nc});
    }
    return out;
}

// IS IT A TREE? Connected + acyclic + exactly V-1 edges; any two imply
// the third, so connectivity and the edge count suffice.
bool isTree(int n, const vector<pair<int,int>>& edges) {
    if ((int)edges.size() != n - 1) return false;

    auto adj = buildAdjacency(n, edges);
    vector<bool> seen(n, false);
    queue<int> q;
    seen[0] = true;
    q.push(0);
    int visited = 1;

    while (!q.empty()) {
        int node = q.front(); q.pop();
        for (int next : adj[node])
            if (!seen[next]) { seen[next] = true; ++visited; q.push(next); }
    }
    return visited == n;
}

// BIPARTITE - 2-colourable, equivalently no odd-length cycle.
bool isBipartite(int n, const vector<vector<int>>& adj) {
    vector<int> colour(n, -1);
    for (int start = 0; start < n; ++start) {
        if (colour[start] != -1) continue;
        queue<int> q;
        colour[start] = 0;
        q.push(start);
        while (!q.empty()) {
            int node = q.front(); q.pop();
            for (int next : adj[node]) {
                if (colour[next] == colour[node]) return false;  // odd cycle
                if (colour[next] == -1) {
                    colour[next] = 1 - colour[node];
                    q.push(next);
                }
            }
        }
    }
    return true;
}`,
      typescript: `// EDGE LIST -> ADJACENCY LIST.
function buildAdjacency(
  n: number,
  edges: [number, number][],
  directed = false
): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    if (!directed) adj[v].push(u);   // BOTH directions for undirected -
  }                                  // omitting this is the classic bug
  return adj;
}

// Weighted edges as [neighbour, weight] pairs.
function buildWeighted(
  n: number,
  edges: [number, number, number][],
  directed = false
): [number, number][][] {
  const adj: [number, number][][] = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    if (!directed) adj[v].push([u, w]);
  }
  return adj;
}

// ADJACENCY MATRIX - O(V^2) space regardless of edge count.
function buildMatrix(
  n: number,
  edges: [number, number][],
  directed = false
): number[][] {
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  for (const [u, v] of edges) {
    matrix[u][v] = 1;
    if (!directed) matrix[v][u] = 1;
  }
  return matrix;
}

// Labelled vertices - a Map of arrays avoids the index-mapping step,
// at some cost in lookup speed.
function buildLabelled(edges: [string, string][]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, []);
    adj.get(a)!.push(b);
  };
  for (const [u, v] of edges) { add(u, v); add(v, u); }
  return adj;
}

// IMPLICIT GRAPH - a grid needs no structure at all.
const DIRECTIONS: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function* gridNeighbours(r: number, c: number, rows: number, cols: number) {
  for (const [dr, dc] of DIRECTIONS) {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) yield [nr, nc] as const;
  }
}

// IMPLICIT GRAPH - a state space. Words are vertices, single-letter
// changes are edges, generated on demand rather than stored.
function* wordNeighbours(word: string, dictionary: Set<string>) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < word.length; i++) {
    for (const ch of letters) {
      if (ch === word[i]) continue;
      const candidate = word.slice(0, i) + ch + word.slice(i + 1);
      if (dictionary.has(candidate)) yield candidate;
    }
  }
}

// IS IT A TREE? V-1 edges plus connected implies acyclic.
function isTree(n: number, edges: [number, number][]): boolean {
  if (edges.length !== n - 1) return false;
  const adj = buildAdjacency(n, edges);
  const seen = new Set<number>([0]);
  const queue = [0];

  for (let i = 0; i < queue.length; i++) {
    for (const next of adj[queue[i]]) {
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return seen.size === n;
}`,
    },
    problems: {
      easy: [
        { name: "Find Center of Star Graph", url: "https://leetcode.com/problems/find-center-of-star-graph/" },
        { name: "Find if Path Exists in Graph", url: "https://leetcode.com/problems/find-if-path-exists-in-graph/" },
        { name: "Find the Town Judge", url: "https://leetcode.com/problems/find-the-town-judge/" },
      ],
      medium: [
        { name: "Graph Valid Tree", url: "https://leetcode.com/problems/graph-valid-tree/" },
        { name: "Number of Connected Components", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
        { name: "Is Graph Bipartite?", url: "https://leetcode.com/problems/is-graph-bipartite/" },
        { name: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/" },
        { name: "Minimum Height Trees", url: "https://leetcode.com/problems/minimum-height-trees/" },
        { name: "Find Eventual Safe States", url: "https://leetcode.com/problems/find-eventual-safe-states/" },
      ],
      hard: [
        { name: "Word Ladder II", url: "https://leetcode.com/problems/word-ladder-ii/" },
        { name: "Reconstruct Itinerary", url: "https://leetcode.com/problems/reconstruct-itinerary/" },
      ],
    },
  },

  {
    id: "structures-arrays",
    title: "Arrays, Memory & Dynamic Growth",
    subtitle: "Structure Primer",
    summary: "Contiguous memory, amortised doubling, and why cache locality beats asymptotics more often than expected.",
    complexity: {
      time: "O(1)",
      space: "O(n)",
      note: "Indexing is a single address calculation. Appending is O(1) amortised — individual appends can be O(n) when the buffer resizes, but doubling spreads that cost.",
    },
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="An array laid out contiguously in memory versus a linked list scattered across it, and the doubling growth pattern">
  <text x="0" y="14" class="dg-title">Array: one block, address = base + index &#215; size</text>

  <g transform="translate(0,32)">
    <rect x="0"   y="0" width="66" height="28" rx="2" class="dg-cell-hit"/><text x="33"  y="19" text-anchor="middle">7</text>
    <rect x="66"  y="0" width="66" height="28" rx="2" class="dg-cell-hit"/><text x="99"  y="19" text-anchor="middle">2</text>
    <rect x="132" y="0" width="66" height="28" rx="2" class="dg-cell-hit"/><text x="165" y="19" text-anchor="middle">9</text>
    <rect x="198" y="0" width="66" height="28" rx="2" class="dg-cell-hit"/><text x="231" y="19" text-anchor="middle">4</text>
    <text x="33"  y="46" text-anchor="middle" class="dg-index">1000</text>
    <text x="99"  y="46" text-anchor="middle" class="dg-index">1004</text>
    <text x="165" y="46" text-anchor="middle" class="dg-index">1008</text>
    <text x="231" y="46" text-anchor="middle" class="dg-index">1012</text>
    <text x="290" y="19" class="dg-good">one cache line fetches several elements</text>
  </g>

  <text x="0" y="106" class="dg-title">Linked list: scattered, every step is a pointer dereference</text>

  <g transform="translate(0,120)">
    <rect x="0"   y="0" width="52" height="28" rx="2" class="dg-cell-out"/><text x="26"  y="19" text-anchor="middle">7</text>
    <rect x="180" y="0" width="52" height="28" rx="2" class="dg-cell-out"/><text x="206" y="19" text-anchor="middle">2</text>
    <rect x="90"  y="34" width="52" height="28" rx="2" class="dg-cell-out"/><text x="116" y="53" text-anchor="middle">9</text>
    <rect x="290" y="34" width="52" height="28" rx="2" class="dg-cell-out"/><text x="316" y="53" text-anchor="middle">4</text>
    <text x="26"  y="-6" text-anchor="middle" class="dg-index">1000</text>
    <text x="206" y="-6" text-anchor="middle" class="dg-index">7312</text>
    <text x="116" y="80" text-anchor="middle" class="dg-index">2048</text>
    <text x="316" y="80" text-anchor="middle" class="dg-index">9990</text>
    <text x="390" y="35" class="dg-bad">each jump is a possible cache miss</text>
  </g>

  <line x1="0" y1="212" x2="700" y2="212" class="dg-guide"/>
  <text x="0" y="236" class="dg-title">Doubling: why append is O(1) amortised</text>

  <g transform="translate(0,248)">
    <rect x="0"   y="0" width="34" height="22" rx="2" class="dg-cell"/>
    <text x="46"  y="16" class="dg-note">cap 1</text>
    <rect x="100" y="0" width="68" height="22" rx="2" class="dg-cell"/>
    <text x="180" y="16" class="dg-note">cap 2</text>
    <rect x="240" y="0" width="136" height="22" rx="2" class="dg-cell"/>
    <text x="388" y="16" class="dg-note">cap 4</text>
    <rect x="450" y="0" width="200" height="22" rx="2" class="dg-cell-live"/>
    <text x="660" y="16" class="dg-note">cap 8</text>
    <text x="0" y="48" class="dg-note">copies so far: 1 + 2 + 4 = 7, for 8 appends. Total work stays under 2n,</text>
    <text x="0" y="66" class="dg-note">so the average is constant &#8212; a guarantee, not a probabilistic average.</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "One block, and what follows from it",
        body: [
          "An array is a single contiguous block of memory holding elements of identical size. That one design decision produces everything else about it.",
          "Indexing is O(1) because the address is arithmetic: base plus index times element size. No search, no pointer following, just a computed address. This is why arrays are the only structure with genuinely constant random access.",
          "Insertion and deletion in the middle are O(n) for the same reason. There are no gaps in a contiguous block, so making room means shifting everything after the insertion point, and removing means shifting everything back.",
          "And the elements must be the same size, which is why arrays of objects in most languages actually store pointers rather than the objects themselves — the objects vary in size, the pointers do not. That indirection is why a Python list of integers behaves quite differently from a C++ vector of ints, even though both are 'arrays'.",
        ],
      },
      {
        heading: "Static versus dynamic",
        body: [
          "A static array has a fixed capacity decided when it is created. C arrays and Java's `int[]` are static: you cannot append, and running past the end is either a crash or silent memory corruption.",
          "A dynamic array grows. It keeps a backing static array plus a count of how many slots are used, and when the count reaches the capacity it allocates a larger block, copies everything across, and frees the old one. This is C++'s `vector`, Java's `ArrayList`, Python's `list`, and JavaScript's `Array`.",
          "The distinction matters because the resize is invisible but not free. An append that triggers a resize is O(n), and any pointers or iterators into the old block become invalid — which in C++ is a genuine source of undefined behaviour when you hold a pointer across a `push_back`.",
        ],
        aside:
          "In C++, `push_back` can invalidate every iterator and pointer into the vector. Holding a reference to an element across an insertion is undefined behaviour, and it usually works right up until the resize that breaks it.",
      },
      {
        heading: "Why doubling makes append O(1)",
        body: [
          "If a resize copied only one extra slot, every append would be O(n) and n appends would cost O(n²). Growing by a constant factor — typically 2, or 1.5 in some implementations — changes that completely.",
          "The accounting: to reach n elements you resize at capacities 1, 2, 4, 8 and so on. The total copying is 1 + 2 + 4 + ... + n/2, which sums to less than n. So n appends cost less than 2n operations in total, giving O(1) amortised per append.",
          "The word amortised is precise here and worth distinguishing from average. Average implies a probability distribution over inputs. Amortised is a worst-case guarantee over any sequence: no matter what you do, n appends cost O(n) in total. A single append can still be O(n), which matters in latency-sensitive code — and is why real-time systems pre-reserve capacity.",
          "Growing by 1.5 rather than 2 is a deliberate memory trade-off: doubling can leave the freed blocks unable to be reused for the next allocation, whereas 1.5 eventually allows reuse. Neither changes the asymptotic result.",
        ],
        trace: `Appending 8 elements, doubling capacity

  append 1  cap 0→1  copy 0
  append 2  cap 1→2  copy 1
  append 3  cap 2→4  copy 2
  append 4           copy 0
  append 5  cap 4→8  copy 4
  append 6..8        copy 0

  total copies: 0+1+2+0+4 = 7  for n = 8

  1 + 2 + 4 + ... + n/2  <  n
  so n appends cost under 2n — O(1) each.`,
      },
      {
        heading: "Cache locality, and the gap between theory and speed",
        body: [
          "Asymptotic analysis assumes every memory access costs the same. Real hardware does not work that way, and the gap is large enough to reverse conclusions.",
          "The CPU fetches memory in cache lines, typically 64 bytes — sixteen 4-byte integers at once. Walking an array sequentially means every sixteenth access actually touches memory and the rest are already loaded, and the prefetcher notices the pattern and loads ahead. Walking a linked list means every step jumps to an unrelated address, so almost every access is a cache miss, each costing on the order of a hundred cycles.",
          "In practice this makes array traversal several times faster than list traversal at the same O(n). It is also why inserting into the middle of a vector often beats a linked list in real benchmarks despite being O(n) versus O(1) — the shift is a fast contiguous memcpy, while the list's O(1) insertion required an O(n) pointer-chasing walk to find the position first.",
          "The practical rule: prefer contiguous storage unless you have a specific reason not to. Linked lists earn their place when you hold node references from elsewhere — as an LRU cache does — not when you would have to search for the position anyway.",
        ],
      },
      {
        heading: "Multidimensional arrays and row-major order",
        body: [
          "A 2D array is usually stored as one contiguous block in row-major order: the entire first row, then the entire second, and so on. The address of cell (r, c) is base plus (r × columns + c) × size.",
          "That layout means iterating rows-then-columns walks memory sequentially, while iterating columns-then-rows jumps a full row width every step. On a large matrix the difference can be several times, purely from cache behaviour, with identical asymptotic cost.",
          "Some languages differ. Fortran and MATLAB are column-major, so the advice inverts. And a `vector<vector<int>>` in C++ is not contiguous at all — it is an array of pointers to separately allocated rows, so it loses the locality benefit. For performance-critical grids, a single flat vector indexed as `r * cols + c` is meaningfully faster.",
          "The flat-array trick is also useful in competitive programming for another reason: one allocation instead of n, which removes a lot of overhead when the grid is created inside a loop.",
        ],
      },
      {
        heading: "Choosing between array and linked list",
        body: [
          "Use an array when you need random access by index, when you will iterate more than you modify, when memory overhead matters — a linked list node carries a pointer per element, which for small values can double the memory — or when cache performance matters, which is more often than people assume.",
          "Use a linked list when you insert and delete at known positions frequently, when you need stable references to elements across modifications (a vector's resize invalidates them), or when you are splicing whole sublists, which is O(1) for a list and O(n) for an array.",
          "The honest summary is that arrays win by default in modern practice. Linked lists remain important as a component — inside hash table buckets, inside an LRU cache, as the shape of a tree or graph — rather than as a general-purpose sequence. When an interview asks 'array or linked list', the expected answer is a discussion of access patterns, not a preference.",
        ],
      },
    ],
    useCases: [
      "Explaining why appending to a dynamic array is O(1) amortised, and what amortised means.",
      "Justifying a data structure choice on cache behaviour rather than asymptotics alone.",
      "Understanding why holding a pointer across a vector insertion is unsafe in C++.",
      "Choosing a flat array over nested vectors for a performance-sensitive grid.",
      "Answering 'array or linked list' as a trade-off discussion rather than a preference.",
    ],
    pitfalls: [
      "Saying dynamic array append is O(1) without the word amortised. A single append can be O(n) when it triggers a resize.",
      "Confusing amortised with average. Amortised is a worst-case guarantee over a sequence; average depends on an input distribution.",
      "Holding a pointer, reference or iterator into a vector across an insertion. The resize can move the whole block.",
      "Iterating a matrix column-major when it is stored row-major. Same complexity, several times slower.",
      "Assuming a `vector<vector<int>>` is contiguous. It is an array of pointers to separately allocated rows.",
      "Reaching for a linked list to get O(1) insertion when finding the position is already O(n) — the list wins nothing.",
    ],
    code: {
      python: `import sys

# Python lists ARE dynamic arrays - contiguous blocks of POINTERS to
# objects, which is why they hold mixed types and why they use more
# memory per element than a C array would.

def growth_pattern():
    """Watch the capacity jump. Python over-allocates on a pattern
    close to 1.125x, not 2x - gentler growth, same amortised result."""
    values = []
    previous = -1
    for i in range(20):
        values.append(i)
        size = sys.getsizeof(values)
        if size != previous:
            print(f"length {len(values):3}  bytes {size}")
            previous = size

# PRE-SIZING avoids the repeated reallocation entirely when the final
# length is known. Worth doing in hot loops.
def preallocate(n):
    return [0] * n                    # one allocation, no growth steps

# The operations, and their real costs.
def costs_demo(values):
    values[5]                         # O(1)  - address arithmetic
    values.append(1)                  # O(1)  AMORTISED - can be O(n)
    values.pop()                      # O(1)  - from the end
    values.insert(0, 1)               # O(n)  - shifts everything
    values.pop(0)                     # O(n)  - shifts everything
    1 in values                       # O(n)  - linear scan

# THE QUEUE TRAP. list.pop(0) is O(n), so a BFS built on a list is
# quadratic. deque is O(1) at both ends.
from collections import deque

def correct_queue():
    q = deque([1, 2, 3])
    q.popleft()                       # O(1) - NOT list.pop(0)
    q.appendleft(0)                   # O(1)

# ROW-MAJOR: iterate rows outer, columns inner, to walk memory in order.
def sum_grid_fast(grid):
    total = 0
    for row in grid:                  # sequential within each row
        for value in row:
            total += value
    return total

# A FLAT array indexed as r * cols + c: one allocation instead of rows,
# and genuinely contiguous.
class Grid:
    def __init__(self, rows, cols, fill=0):
        self.rows, self.cols = rows, cols
        self.data = [fill] * (rows * cols)

    def __getitem__(self, rc):
        r, c = rc
        return self.data[r * self.cols + c]

    def __setitem__(self, rc, value):
        r, c = rc
        self.data[r * self.cols + c] = value`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

// Watch a vector double. Capacity grows geometrically, which is what
// makes push_back O(1) AMORTISED rather than O(n) per call.
void growthPattern() {
    vector<int> v;
    size_t previous = 0;
    for (int i = 0; i < 20; ++i) {
        v.push_back(i);
        if (v.capacity() != previous) {
            cout << "size " << v.size() << "  capacity " << v.capacity() << '\\n';
            previous = v.capacity();
        }
    }
    // 1 2 4 8 16 32 ... total copying under 2n across n appends
}

// RESERVE when the final size is known: one allocation, no copying,
// and no iterator invalidation partway through.
void preallocate(int n) {
    vector<int> v;
    v.reserve(n);                     // capacity now n, size still 0
    for (int i = 0; i < n; ++i) v.push_back(i);   // no reallocation at all
}

// ITERATOR INVALIDATION - the trap that works until it does not.
void invalidation() {
    vector<int> v = {1, 2, 3};
    int* pointer = &v[0];
    v.push_back(4);                   // MAY reallocate and move the block
    // *pointer is now undefined behaviour - it may point at freed memory.
    // Re-acquire after any insertion, or reserve() up front.
}

// The operations and their real costs.
void costs(vector<int>& v) {
    v[5];                             // O(1)  - address arithmetic
    v.push_back(1);                   // O(1)  amortised
    v.pop_back();                     // O(1)
    v.insert(v.begin(), 1);           // O(n)  - shifts everything
    v.erase(v.begin());               // O(n)
    find(v.begin(), v.end(), 1);      // O(n)  - linear scan
}

// ROW-MAJOR ORDER. Both loops are O(rows * cols); the first walks
// memory sequentially and the second jumps a row width every step.
// On a large matrix that is several times slower for identical work.
long long sumFast(const vector<vector<int>>& grid) {
    long long total = 0;
    for (size_t r = 0; r < grid.size(); ++r)          // rows OUTER
        for (size_t c = 0; c < grid[r].size(); ++c)
            total += grid[r][c];
    return total;
}

long long sumSlow(const vector<vector<int>>& grid) {
    long long total = 0;
    for (size_t c = 0; c < grid[0].size(); ++c)       // columns outer -
        for (size_t r = 0; r < grid.size(); ++r)      // cache-hostile
            total += grid[r][c];
    return total;
}

// A vector<vector<int>> is NOT contiguous - it is an array of pointers
// to separately allocated rows. A FLAT vector genuinely is, and needs
// one allocation instead of one per row.
struct Grid {
    int rows, cols;
    vector<int> data;

    Grid(int r, int c, int fill = 0) : rows(r), cols(c), data(r * c, fill) {}

    int&       operator()(int r, int c)       { return data[r * cols + c]; }
    const int& operator()(int r, int c) const { return data[r * cols + c]; }
};

// std::array is the STATIC version: size fixed at compile time, stored
// inline with no heap allocation at all.
void staticArray() {
    array<int, 5> fixed{1, 2, 3, 4, 5};
    cout << fixed.size() << '\\n';     // 5, known at compile time
}`,
      typescript: `// JavaScript arrays are dynamic, but they are NOT simple contiguous
// blocks. Engines optimise them into packed element arrays when they
// hold uniform types and have no gaps - and deoptimise into a hash-like
// dictionary the moment you create a hole or mix types.

function stayPacked(): void {
  const packed = [1, 2, 3];      // fast: packed small-integer elements
  packed.push(4);                // still packed

  const holey = [1, 2, 3];
  holey[100] = 4;                // creates a hole - now dictionary mode,
                                 // and much slower to access
  delete holey[0];               // also creates a hole - use splice instead
}

// The operations and their real costs.
function costs(values: number[]): void {
  values[5];                     // O(1)
  values.push(1);                // O(1) amortised
  values.pop();                  // O(1)
  values.unshift(1);             // O(n) - shifts everything
  values.shift();                // O(n) - shifts everything
  values.includes(1);            // O(n)
}

// THE QUEUE TRAP. Array.shift() is O(n), so a BFS built on shift() is
// quadratic. Use an index pointer instead and let the array grow.
function bfsQueue(start: number, neighbours: (n: number) => number[]): number[] {
  const queue = [start];
  const seen = new Set([start]);
  const order: number[] = [];

  for (let head = 0; head < queue.length; head++) {   // index, not shift()
    const node = queue[head];
    order.push(node);
    for (const next of neighbours(node)) {
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return order;
}

// TYPED ARRAYS are genuinely contiguous and fixed-width - real arrays
// in the C sense. Worth using for large numeric data.
function typed(n: number): Int32Array {
  const buffer = new Int32Array(n);   // contiguous, zero-filled, no boxing
  buffer[0] = 42;
  return buffer;
}

// A flat array indexed r * cols + c, rather than nested arrays.
class Grid {
  private data: Int32Array;
  constructor(readonly rows: number, readonly cols: number) {
    this.data = new Int32Array(rows * cols);
  }
  get(r: number, c: number): number { return this.data[r * this.cols + c]; }
  set(r: number, c: number, v: number): void { this.data[r * this.cols + c] = v; }
}`,
    },
    problems: {
      easy: [
        { name: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
        { name: "Move Zeroes", url: "https://leetcode.com/problems/move-zeroes/" },
        { name: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array/" },
        { name: "Plus One", url: "https://leetcode.com/problems/plus-one/" },
      ],
      medium: [
        { name: "Rotate Array", url: "https://leetcode.com/problems/rotate-array/" },
        { name: "Rotate Image", url: "https://leetcode.com/problems/rotate-image/" },
        { name: "Spiral Matrix", url: "https://leetcode.com/problems/spiral-matrix/" },
        { name: "Set Matrix Zeroes", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
        { name: "Design Circular Queue", url: "https://leetcode.com/problems/design-circular-queue/" },
      ],
      hard: [
        { name: "First Missing Positive", url: "https://leetcode.com/problems/first-missing-positive/" },
        { name: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/" },
      ],
    },
  },

  {
    id: "structures-choosing",
    title: "Choosing a Data Structure",
    subtitle: "Structure Primer",
    summary: "The comparison table, and the questions that narrow a problem to one structure.",
    illustration: `
<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A decision path from what a problem needs to which data structure answers it">
  <text x="0" y="14" class="dg-title">What does the problem actually ask you to do repeatedly?</text>

  <g transform="translate(0,32)">
    <rect x="0" y="0" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="20" class="dg-note">look up by exact key</text>
    <rect x="280" y="0" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="20" class="dg-note">hash map&#160;&#160;&#8212;&#160;O(1) average</text>

    <rect x="0" y="40" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="60" class="dg-note">&#8230; and also need order or ranges</text>
    <rect x="280" y="40" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="60" class="dg-note">ordered map&#160;&#8212;&#160;O(log n)</text>

    <rect x="0" y="80" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="100" class="dg-note">repeatedly take the min or max</text>
    <rect x="280" y="80" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="100" class="dg-note">heap&#160;&#160;&#8212;&#160;O(log n) pop, O(1) peek</text>

    <rect x="0" y="120" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="140" class="dg-note">most recent thing first</text>
    <rect x="280" y="120" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="140" class="dg-note">stack</text>

    <rect x="0" y="160" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="180" class="dg-note">oldest thing first / by distance</text>
    <rect x="280" y="160" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="180" class="dg-note">queue</text>

    <rect x="0" y="200" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="220" class="dg-note">prefix queries over strings</text>
    <rect x="280" y="200" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="220" class="dg-note">trie&#160;&#160;&#8212;&#160;O(word length)</text>

    <rect x="0" y="240" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="260" class="dg-note">range aggregate, data changes</text>
    <rect x="280" y="240" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="260" class="dg-note">segment / Fenwick tree</text>

    <rect x="0" y="280" width="250" height="30" rx="4" class="dg-cell-mark"/>
    <text x="12" y="300" class="dg-note">range sum, data is static</text>
    <rect x="280" y="280" width="240" height="30" rx="4" class="dg-cell-hit"/>
    <text x="292" y="300" class="dg-note">prefix sums&#160;&#160;&#8212;&#160;O(1) queries</text>

    <text x="540" y="20"  class="dg-label">no order</text>
    <text x="540" y="60"  class="dg-label">sorted</text>
    <text x="540" y="100" class="dg-label">extremes only</text>
    <text x="540" y="180" class="dg-label">BFS lives here</text>
    <text x="540" y="260" class="dg-label">with updates</text>
    <text x="540" y="300" class="dg-label">no updates</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "Ask what the loop does, not what the data is",
        body: [
          "The instinct when choosing a structure is to think about what the data looks like. That is the wrong question. What decides the structure is which operation you perform repeatedly inside the hot loop.",
          "A million records is not a reason to use anything in particular. A million lookups by ID is a reason to use a hash map. A million 'what is the smallest remaining' is a reason to use a heap. A million 'how many between x and y' is a reason to use a Fenwick tree.",
          "So the productive question is: what am I about to do over and over, and what does each candidate structure charge for that operation? Everything else — the shape of the data, how much there is — is secondary.",
        ],
      },
      {
        heading: "The comparison, honestly stated",
        body: [
          "Array: O(1) index, O(n) search, O(n) insert or delete in the middle, O(1) amortised append. Best cache behaviour of anything.",
          "Dynamic array: as above, with growth. The default sequence container in every language for good reason.",
          "Linked list: O(n) index, O(1) insert or delete given a node. Poor cache behaviour. Its niche is holding stable references, not general sequencing.",
          "Hash map or set: O(1) average for insert, lookup and delete; O(n) worst case if keys collide. No ordering at all.",
          "Ordered map or set: O(log n) for everything, plus predecessor, successor, range and sorted iteration. A red-black tree underneath.",
          "Heap: O(1) peek at the extreme, O(log n) push and pop, O(n) to build from an existing array. No ordering beyond the root.",
          "Trie: O(L) insert and lookup in the key's length, independent of how many keys are stored, plus prefix queries. Memory-hungry.",
          "Segment or Fenwick tree: O(log n) range query and point update. Prefix sums beat both at O(1) queries when nothing changes.",
        ],
        trace: `Same task, four structures

  "find the 10 most frequent words"

  sort everything          O(n log n)
  heap of size 10          O(n log 10)  ← better
  bucket by frequency      O(n)         ← best
  quickselect              O(n) average

  All four are correct. The choice depends
  on whether the data streams, whether you
  need them sorted, and how much memory
  you can spend.`,
      },
      {
        heading: "The four questions",
        body: [
          "**Do I need ordering?** If no, hash. If yes, that eliminates hashing entirely — a hash map cannot produce its smallest key without scanning everything, at any price. Ordering means a tree, a heap, or a sorted array depending on which part of the order you need.",
          "**Do I need all of the order, or just the extreme?** If you only ever want the minimum or maximum, a heap is cheaper than a sorted structure and much cheaper than re-sorting. If you need to iterate in order, or query ranges, you need the full ordering.",
          "**Does the data change?** This is the question people skip, and it is often decisive. Static data with many queries wants precomputation — prefix sums, a sorted array with binary search, a sparse table. Mutable data wants a structure that supports updates, which usually costs a logarithmic factor.",
          "**What is the access pattern by key?** Exact key, hash map. Prefix of a string, trie. Range of positions, segment tree. Nearest value, ordered map. Each of these is a different question and only one structure answers each well.",
        ],
      },
      {
        heading: "The composites",
        body: [
          "Several problems need two operations that no single structure provides together, and the answer is to run two structures that reference each other. Recognising this pattern is worth as much as knowing any individual structure.",
          "LRU cache: a hash map for O(1) lookup plus a doubly linked list for O(1) reordering. Neither alone can do both.",
          "Insert-Delete-GetRandom in O(1): a hash map from value to index plus an array. Deletion swaps the target with the last element and pops, so the array stays gap-free and random access stays O(1).",
          "Min stack: a stack plus a second stack of running minima, so the minimum is precomputed at write time rather than searched for at read time.",
          "Top-k over a stream: a heap capped at size k, so you never hold more than k candidates.",
          "The general move is: identify which two operations the problem demands, note that they want different structures, and connect the two so each holds a reference into the other.",
        ],
        aside:
          "When a design question demands O(1) on operations that obviously need different structures, the answer is almost always two structures pointing at each other. Ask which two, and what each stores about the other.",
      },
      {
        heading: "What the constraints tell you",
        body: [
          "Input limits leak the intended solution, and reading them is faster than guessing. Working from about 10⁸ simple operations per second: n ≤ 10 permits O(n!) or O(2ⁿ); n ≤ 20 permits bitmask DP at O(2ⁿ·n); n ≤ 500 permits O(n³); n ≤ 5,000 permits O(n²); n ≤ 10⁵ wants O(n log n); n ≤ 10⁶ wants O(n); and anything beyond 10⁹ wants a formula or O(log n).",
          "Those bounds also point at structures. An n of 10⁵ with many queries usually means a log factor is available, which is a tree or a heap. An n of 10⁶ with one pass usually means hashing or a linear sweep, since a log factor would be tight.",
          "Memory limits matter too, and are more often the binding constraint than people expect. A boolean array to 10⁹ does not fit. An adjacency matrix at V = 10⁵ does not fit. Bitmask DP at n = 30 does not fit. Compute the memory before committing to an approach.",
        ],
      },
      {
        heading: "The mistakes worth avoiding",
        body: [
          "Reaching for a hash map when an array would do. If the keys are small bounded integers, an array is faster, simpler and smaller — hashing buys nothing over indexing.",
          "Reaching for a tree when a hash map would do. Ordering is the only thing a tree gives you that hashing does not; if you never use it, you are paying a log factor for nothing.",
          "Building a segment tree over static data. If nothing changes, prefix sums answer in O(1) with three lines of code.",
          "Sorting inside a loop. If you find yourself re-sorting after each change, you want an ordered container or a heap.",
          "Using a linked list to get O(1) insertion when finding the position is already O(n). The O(1) is real and irrelevant.",
          "Choosing by asymptotics alone on small inputs. At n of a few hundred, an O(n²) loop over a contiguous array frequently beats an O(n log n) structure with pointer chasing and allocation.",
        ],
      },
    ],
    useCases: [
      "Deciding on a structure before writing code, rather than discovering the wrong choice halfway through.",
      "Reading input constraints to infer the intended complexity and therefore the intended approach.",
      "Recognising design problems that require two structures composed together.",
      "Justifying a choice out loud in an interview, which is usually being assessed as much as the code.",
      "Knowing when the simplest option — an array, a sort, a linear scan — is genuinely the right one.",
    ],
    pitfalls: [
      "Choosing by what the data looks like rather than by which operation runs in the hot loop.",
      "Using a hash map for small bounded integer keys, where a plain array is faster and simpler.",
      "Paying for a tree's ordering and then never using it.",
      "Building an update-capable structure over data that never changes.",
      "Ignoring memory limits, which bind before time limits more often than expected.",
      "Trusting asymptotics on small inputs, where constant factors and cache behaviour dominate.",
    ],
    code: {
      python: `"""Same problem, several structures - the cost is in what you do
repeatedly, not in what the data looks like."""

from collections import Counter, deque
import heapq
from bisect import bisect_left, insort

def top_k_four_ways(words, k):
    counts = Counter(words)

    # 1. Sort everything: O(m log m). Simplest, and fine when m is small.
    by_sort = sorted(counts, key=counts.get, reverse=True)[:k]

    # 2. Heap of size k: O(m log k). Better when k << m, and the only
    #    option if the data arrives as a stream.
    by_heap = heapq.nlargest(k, counts, key=counts.get)

    # 3. Bucket by frequency: O(m). No count can exceed len(words), so
    #    index buckets by count and walk down from the top.
    buckets = [[] for _ in range(len(words) + 1)]
    for word, freq in counts.items():
        buckets[freq].append(word)
    by_bucket = []
    for freq in range(len(buckets) - 1, 0, -1):
        for word in buckets[freq]:
            by_bucket.append(word)
            if len(by_bucket) == k:
                break
        if len(by_bucket) == k:
            break

    return by_sort, by_heap, by_bucket


# THE ORDERING QUESTION decides everything.
def needs_ordering_demo(values):
    unordered = set(values)           # O(1) membership, NO min/max/range
    ordered = sorted(values)          # O(log n) queries, full ordering

    # A set cannot answer this at all without scanning everything:
    smallest_at_least = ordered[bisect_left(ordered, 42)]
    return smallest_at_least


# THE MUTABILITY QUESTION. Static data wants precomputation; changing
# data wants a structure that supports updates.
class StaticRangeSum:
    """Data never changes: O(n) build, O(1) queries. Three lines."""
    def __init__(self, values):
        self.prefix = [0]
        for v in values:
            self.prefix.append(self.prefix[-1] + v)

    def query(self, lo, hi):          # inclusive
        return self.prefix[hi + 1] - self.prefix[lo]


class MutableRangeSum:
    """Data changes: O(log n) for both. Pay the log factor only if
    you actually need updates."""
    def __init__(self, values):
        self.n = len(values)
        self.tree = [0] * (self.n + 1)
        for i, v in enumerate(values):
            self.update(i, v)

    def update(self, i, delta):
        k = i + 1
        while k <= self.n:
            self.tree[k] += delta
            k += k & -k

    def prefix_sum(self, i):
        total, k = 0, i
        while k > 0:
            total += self.tree[k]
            k -= k & -k
        return total

    def query(self, lo, hi):
        return self.prefix_sum(hi + 1) - self.prefix_sum(lo)


# A COMPOSITE: two structures referencing each other, because neither
# alone provides both operations.
import random

class RandomisedSet:
    """insert, remove and getRandom, all O(1).
    Map gives lookup; array gives random access. Removal swaps with
    the last element so the array never develops a gap."""
    def __init__(self):
        self.values = []
        self.index = {}

    def insert(self, value):
        if value in self.index:
            return False
        self.index[value] = len(self.values)
        self.values.append(value)
        return True

    def remove(self, value):
        if value not in self.index:
            return False
        position = self.index[value]
        last = self.values[-1]
        self.values[position] = last          # move the last into the hole
        self.index[last] = position
        self.values.pop()
        del self.index[value]
        return True

    def get_random(self):
        return random.choice(self.values)     # O(1) - needs the gap-free array`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

// WHAT THE OPERATION COSTS - the table, as code you can point at.
void theOptions() {
    vector<int> array;             // index O(1), search O(n), insert mid O(n)
    list<int> linked;              // index O(n), insert given an iterator O(1)
    unordered_map<int,int> hashed; // O(1) average, NO ordering at all
    map<int,int> ordered;          // O(log n), plus ranges and sorted walk
    priority_queue<int> heap;      // O(1) peek at the extreme, O(log n) pop
    stack<int> lifo;               // most recent first
    queue<int> fifo;               // oldest first - what BFS needs
    deque<int> both;               // O(1) at both ends
}

// THE ORDERING QUESTION. A hash set cannot answer "smallest at least x"
// at any price - it would have to inspect every element.
void orderingMatters(const vector<int>& values) {
    unordered_set<int> hashed(values.begin(), values.end());
    // hashed has no lower_bound. There is no faster way than a full scan.

    set<int> ordered(values.begin(), values.end());
    auto it = ordered.lower_bound(42);     // O(log n) - the reason to pay it
    if (it != ordered.end()) cout << *it << '\\n';
}

// THE MUTABILITY QUESTION. Static data wants precomputation.
struct StaticRangeSum {
    vector<long long> prefix;
    explicit StaticRangeSum(const vector<int>& v) : prefix(v.size() + 1, 0) {
        for (size_t i = 0; i < v.size(); ++i) prefix[i + 1] = prefix[i] + v[i];
    }
    long long query(int lo, int hi) const {     // O(1) - unbeatable
        return prefix[hi + 1] - prefix[lo];
    }
};

// Changing data pays a log factor - but only pay it if you need it.
struct MutableRangeSum {
    int n;
    vector<long long> tree;
    explicit MutableRangeSum(int size) : n(size), tree(size + 1, 0) {}

    void update(int i, long long delta) {
        for (int k = i + 1; k <= n; k += k & -k) tree[k] += delta;
    }
    long long prefixSum(int i) const {
        long long total = 0;
        for (int k = i; k > 0; k -= k & -k) total += tree[k];
        return total;
    }
    long long query(int lo, int hi) const {     // O(log n)
        return prefixSum(hi + 1) - prefixSum(lo);
    }
};

// A COMPOSITE - two structures referencing each other because neither
// alone provides both required operations.
class RandomisedSet {
    vector<int> values;                // gap-free, so random access is O(1)
    unordered_map<int,int> index;      // value -> its position

public:
    bool insert(int value) {
        if (index.count(value)) return false;
        index[value] = (int)values.size();
        values.push_back(value);
        return true;
    }

    bool remove(int value) {
        auto it = index.find(value);
        if (it == index.end()) return false;

        int position = it->second, last = values.back();
        values[position] = last;       // fill the hole with the last element
        index[last] = position;        // and tell the map where it went
        values.pop_back();
        index.erase(it);
        return true;
    }

    int getRandom() const {
        static mt19937 rng(random_device{}());
        return values[rng() % values.size()];   // needs the array to be dense
    }
};

// SMALL BOUNDED KEYS: an array beats a hash map. No hashing, no
// collisions, far better cache behaviour.
void boundedKeys(const string& s) {
    array<int, 26> counts{};           // not unordered_map<char,int>
    for (char c : s) ++counts[c - 'a'];
}`,
      typescript: `// THE OPTIONS, and what each charges for the operation you repeat.
function theOptions(): void {
  const array: number[] = [];              // index O(1), insert mid O(n)
  const hashed = new Map<number, number>(); // O(1) average, no ordering
  const set = new Set<number>();            // O(1) membership, no ordering
  // JavaScript has no built-in ordered map or heap - see the Ordered
  // Maps & Sets topic for what to use instead.
}

// THE ORDERING QUESTION. Map and Set preserve INSERTION order, which is
// not sorted order and gives no range or nearest-value queries.
function orderingMatters(values: number[]): number | null {
  const set = new Set(values);
  // set has no way to answer "smallest at least 42" without a full scan.

  const sorted = [...values].sort((a, b) => a - b);
  let lo = 0, hi = sorted.length;
  while (lo < hi) {                        // lower_bound by hand
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < 42) lo = mid + 1;
    else hi = mid;
  }
  return lo < sorted.length ? sorted[lo] : null;
}

// THE MUTABILITY QUESTION. Static data: precompute, O(1) queries.
class StaticRangeSum {
  private prefix: number[] = [0];
  constructor(values: number[]) {
    for (const v of values) this.prefix.push(this.prefix.at(-1)! + v);
  }
  query(lo: number, hi: number): number {   // inclusive
    return this.prefix[hi + 1] - this.prefix[lo];
  }
}

// A COMPOSITE - a Map for lookup plus an array for random access.
// Removal swaps with the last element so the array stays gap-free.
class RandomisedSet {
  private values: number[] = [];
  private index = new Map<number, number>();

  insert(value: number): boolean {
    if (this.index.has(value)) return false;
    this.index.set(value, this.values.length);
    this.values.push(value);
    return true;
  }

  remove(value: number): boolean {
    const position = this.index.get(value);
    if (position === undefined) return false;

    const last = this.values[this.values.length - 1];
    this.values[position] = last;           // fill the hole
    this.index.set(last, position);         // and record where it moved
    this.values.pop();
    this.index.delete(value);
    return true;
  }

  getRandom(): number {
    return this.values[Math.floor(Math.random() * this.values.length)];
  }
}`,
    },
    problems: {
      easy: [
        { name: "Design HashMap", url: "https://leetcode.com/problems/design-hashmap/" },
        { name: "Design HashSet", url: "https://leetcode.com/problems/design-hashset/" },
        { name: "Min Stack", url: "https://leetcode.com/problems/min-stack/" },
      ],
      medium: [
        { name: "Insert Delete GetRandom O(1)", url: "https://leetcode.com/problems/insert-delete-getrandom-o1/" },
        { name: "LRU Cache", url: "https://leetcode.com/problems/lru-cache/" },
        { name: "Design Underground System", url: "https://leetcode.com/problems/design-underground-system/" },
        { name: "Design Browser History", url: "https://leetcode.com/problems/design-browser-history/" },
        { name: "Time Based Key-Value Store", url: "https://leetcode.com/problems/time-based-key-value-store/" },
      ],
      hard: [
        { name: "LFU Cache", url: "https://leetcode.com/problems/lfu-cache/" },
        { name: "All O`one Data Structure", url: "https://leetcode.com/problems/all-oone-data-structure/" },
        { name: "Design In-Memory File System", url: "https://leetcode.com/problems/design-in-memory-file-system/" },
      ],
    },
  },
];
