/**
 * Enrichment batch 14 — the remaining Stage 1 topics, plus intervals.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "stacks-basics": {
    walkthrough: [
      {
        heading: "Last in, first out",
        body: [
          "A stack restricts access to one end. You push onto the top, pop from the top, and peek at the top, and there is no way to reach anything underneath without removing what is above it. That restriction is the entire structure.",
          "It sounds limiting and is precisely what makes it useful. Whenever a problem has nesting — brackets inside brackets, function calls inside function calls, tags inside tags — the thing you need to close is always the most recent thing you opened. A stack encodes that rule structurally, so you cannot get it wrong.",
          "All three operations are O(1) on both an array-backed and a list-backed stack. Array-backed is faster in practice because the elements sit contiguously in memory, and the occasional resize is amortised away by doubling, exactly as with a dynamic array.",
        ],
      },
      {
        heading: "Matching brackets, and what the stack really holds",
        body: [
          "The canonical problem: given a string of brackets, decide whether they are balanced. Push every opening bracket; on a closing bracket, pop and check that it matches. At the end the stack must be empty.",
          "The useful way to read this is that the stack holds obligations — things opened and not yet closed. A closing bracket discharges the most recent obligation, which is why LIFO is the right discipline rather than an arbitrary choice.",
          "Three failure modes, and it is worth checking you handle all three. A closing bracket arriving when the stack is empty — nothing to close. A closing bracket that does not match the top — wrong kind of close. And a non-empty stack at the end — obligations never discharged. Missing that last check is the most common bug, because a string of only opening brackets otherwise passes.",
        ],
        trace: `"([)]"  — why matching the TOP matters

  (   push          stack: (
  [   push          stack: ( [
  )   pop → '['     mismatch  ✗

Without the type check, popping anything
would accept it. The stack must confirm
that the closer matches what it opened.`,
      },
      {
        heading: "Expression evaluation",
        body: [
          "Evaluating arithmetic is the other classic use, and it splits into two shapes worth distinguishing.",
          "Postfix, also called reverse Polish, is the easy one: push numbers, and on an operator pop two, apply, push the result. No precedence rules are needed because the notation has already encoded them. Watch the operand order — for subtraction and division the second value popped is the left operand.",
          "Infix, the notation people actually write, needs precedence. The shunting-yard algorithm keeps a stack of operators and pops any of equal or higher precedence before pushing a new one, which converts infix to postfix. Alternatively, keep two stacks — one for values, one for operators — and evaluate in place. Basic Calculator is this, and the recursive-descent alternative is often shorter for interview purposes.",
        ],
      },
      {
        heading: "Simulating recursion",
        body: [
          "Recursion is a stack you did not write. Each call pushes a frame holding parameters and a return position; each return pops one. So any recursion can be converted to an explicit stack, and that is the standard escape when input depth would overflow the call stack.",
          "The conversion is easy for preorder-shaped work: push the start, then loop popping and pushing children. It is harder when you need to act after the children finish, because you must know when a node's children are done — which is exactly the bookkeeping the call stack was doing for you.",
          "Two usual techniques. Push each node twice with a marker distinguishing the visit from the finish, or store an iterator position per frame so you know how far through the children you are. Both work; the marker version is shorter to write under pressure.",
        ],
        aside:
          "Always check the stack is non-empty before popping. In C++, calling top() or pop() on an empty stack is undefined behaviour, not an exception — it will not crash reliably, it will just return garbage.",
      },
      {
        heading: "Where the pattern shows up",
        body: [
          "Nesting of any kind: brackets, HTML tags, nested string decoding, directory path simplification where '..' pops the previous component.",
          "Undo history and backtracking, where the most recent action is the first to reverse. Browser back is a stack, and browser forward is a second one fed by the first.",
          "Monotonic stack, which is a stack with an ordering invariant maintained on push. It gets its own topic in stage 2 because the applications — next greater element, largest rectangle in a histogram — are a distinct family rather than a variation.",
          "Min stack, a common follow-up: support push, pop, and get-minimum all in O(1). The trick is a second stack holding the running minimum, pushed alongside every element. It is a good illustration of the general principle that O(1) queries usually mean precomputing the answer at write time rather than searching at read time.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// BALANCED BRACKETS. The stack holds obligations - things opened and
// not yet closed. Three failure modes, all of which must be checked.
bool isBalanced(const string& s) {
    unordered_map<char,char> closerFor{{')','('}, {']','['}, {'}','{'}};
    stack<char> st;

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else if (closerFor.count(c)) {
            if (st.empty()) return false;              // nothing to close
            if (st.top() != closerFor[c]) return false; // wrong kind of close
            st.pop();
        }
    }
    return st.empty();          // leftovers = obligations never discharged.
}                               // Omitting this accepts "(((".

// POSTFIX EVALUATION - no precedence rules needed, the notation already
// encodes them. Note the operand order: the SECOND pop is the left side.
long long evalPostfix(const vector<string>& tokens) {
    stack<long long> st;
    for (const string& tok : tokens) {
        if (tok.size() > 1 || isdigit(tok[0])) { st.push(stoll(tok)); continue; }

        long long right = st.top(); st.pop();
        long long left  = st.top(); st.pop();          // left is popped SECOND
        switch (tok[0]) {
            case '+': st.push(left + right); break;
            case '-': st.push(left - right); break;
            case '*': st.push(left * right); break;
            case '/': st.push(left / right); break;
        }
    }
    return st.top();
}

// MIN STACK - push, pop and getMin all O(1). A second stack carries the
// running minimum, which is the general trick for O(1) queries: compute
// the answer at write time rather than searching at read time.
class MinStack {
    stack<int> values, minimums;
public:
    void push(int x) {
        values.push(x);
        minimums.push(minimums.empty() ? x : min(x, minimums.top()));
    }
    void pop() { values.pop(); minimums.pop(); }
    int top() const { return values.top(); }
    int getMin() const { return minimums.top(); }
};

// SIMPLIFY A PATH - "/a/./b/../c" becomes "/a/c". ".." pops the previous
// component, which is exactly the nesting-discharge shape again.
string simplifyPath(const string& path) {
    vector<string> parts;
    stringstream ss(path);
    string part;

    while (getline(ss, part, '/')) {
        if (part.empty() || part == ".") continue;
        if (part == "..") { if (!parts.empty()) parts.pop_back(); }
        else parts.push_back(part);
    }

    string out;
    for (const auto& p : parts) out += "/" + p;
    return out.empty() ? "/" : out;
}

// RECURSION AS AN EXPLICIT STACK. Easy for preorder work; postorder
// needs a marker so you know when a node's children have finished.
struct TreeNode { int val; TreeNode *left = nullptr, *right = nullptr; };

vector<int> postorderIterative(TreeNode* root) {
    vector<int> out;
    stack<pair<TreeNode*, bool>> st;           // {node, childrenDone}
    if (root) st.push({root, false});

    while (!st.empty()) {
        auto [node, done] = st.top(); st.pop();
        if (done) { out.push_back(node->val); continue; }   // second visit

        st.push({node, true});                 // schedule the finish first
        if (node->right) st.push({node->right, false});
        if (node->left)  st.push({node->left,  false});
    }
    return out;
}`,
  },

  "queues-basics": {
    walkthrough: [
      {
        heading: "First in, first out",
        body: [
          "A queue restricts access to two ends: you add at the back and remove from the front. The element waiting longest is served first, which is the natural discipline for anything processed in arrival order.",
          "The structural consequence that matters for algorithms is level order. Because arrivals are served in order, everything discovered at distance d from a starting point is processed before anything at distance d+1. That is exactly what makes BFS find shortest paths, and it is why a queue is not interchangeable with a stack in graph traversal — swapping one for the other turns BFS into DFS and loses the shortest-path guarantee entirely.",
        ],
      },
      {
        heading: "Why a plain array is the wrong backing store",
        body: [
          "The obvious implementation is an array where you push to the back and remove from index 0. Removing from the front means shifting every remaining element down by one, which is O(n) per dequeue and O(n²) over a full pass.",
          "This is a real performance bug rather than a theoretical one. In Python, list.pop(0) is O(n) and collections.deque exists precisely to avoid it. In JavaScript, Array.shift() is likewise O(n), so a BFS written with shift() on a large graph will be dramatically slower than one using an index pointer.",
          "Two fixes. A ring buffer keeps a fixed array with head and tail indices that wrap around using modulo, giving O(1) at both ends with no shifting. Or, if the queue's total size is bounded and known, use a plain array with a head index that only moves forward and never reclaim the space — wasteful in memory, trivial to write, and perfectly fine for a single BFS.",
        ],
        aside:
          "In Python use collections.deque, never a list, for anything FIFO. In JavaScript, keep an index pointer into an array rather than calling shift(). Both mistakes turn a linear algorithm quadratic without any visible error.",
      },
      {
        heading: "The ring buffer",
        body: [
          "A ring buffer is a fixed-size array treated as circular. A head index marks the front, a tail index marks the next free slot, and both wrap to zero when they run past the end.",
          "The awkward part is distinguishing full from empty, because in both cases head and tail can coincide. Two standard fixes: keep an explicit count of elements, or deliberately leave one slot unused so that full means tail is one behind head. The count version is easier to reason about and is what most implementations use.",
          "It is worth being able to write because it is the standard answer to Design Circular Queue, and because it is what underlies real fixed-capacity buffers in networking and audio, where allocating on the fly is not acceptable.",
        ],
        trace: `capacity 5, after several operations

  index    0    1    2    3    4
         [ _ ][ D ][ E ][ B ][ C ]
                ↑tail      ↑head

  head = 3, tail = 1, count = 4
  order of removal:  B, C, D, E

  enqueue wraps:  tail = (tail + 1) % 5
  dequeue wraps:  head = (head + 1) % 5

  head == tail happens when full AND when
  empty — which is why count is tracked.`,
      },
      {
        heading: "The variants",
        body: [
          "A deque allows adding and removing at both ends in O(1). It subsumes both stack and queue, and it is the structure behind sliding window maximum, where elements are discarded from the front for expiry and from the back for irrelevance.",
          "A priority queue serves the highest-priority element rather than the earliest, and is a heap rather than a queue despite the name. Worth keeping the distinction clear: a queue's order is arrival; a priority queue's order is value.",
          "A monotonic deque adds an ordering invariant, maintained by popping from the back on insertion. It is to the deque what the monotonic stack is to the stack.",
          "A circular queue is the ring buffer above, exposed with a fixed capacity and an explicit full condition.",
        ],
      },
      {
        heading: "Implementing one with the other",
        body: [
          "A pair of classic interview questions asks you to build a queue from stacks and a stack from queues. They are worth doing once because the answers illuminate what each structure gives up.",
          "Queue from two stacks: push onto an input stack. To dequeue, if the output stack is empty, pour everything from input into output — which reverses the order — then pop from output. Each element is moved at most twice across its lifetime, so dequeue is O(1) amortised even though a single call can be O(n). That amortised argument is the point of the question.",
          "Stack from queues is the less elegant direction: after each push, rotate the queue so the new element sits at the front, making push O(n) and pop O(1). There is no way to make both O(1), which is a fair illustration that the two disciplines are not symmetric in cost.",
        ],
      },
      {
        heading: "Where queues appear",
        body: [
          "BFS, in every form — graphs, grids, trees by level, multi-source expansion. This is by far the most common use and the reason the structure sits in stage 1.",
          "Level-order processing, where you freeze the queue's size at the top of each pass so that the current level is processed as a unit. That one idea covers level averages, zigzag order, right side view and minimum depth.",
          "Scheduling and rate limiting, where a queue of timestamps with lazy expiry answers 'how many events in the last N seconds'.",
          "Producer-consumer buffering, which is where ring buffers earn their place in real systems: a fixed-capacity queue between a fast producer and a slower consumer, with no allocation in the hot path.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// std::queue defaults to a deque backing store, so both ends are O(1).
// NEVER build a queue on a vector and erase from the front - that is
// O(n) per dequeue and turns a linear algorithm quadratic.
void basics() {
    queue<int> q;
    q.push(1); q.push(2);
    int front = q.front();     // peek
    q.pop();                   // remove - note pop() returns void
    cout << front << ' ' << q.size() << '\\n';
}

// RING BUFFER. Fixed capacity, O(1) at both ends, no shifting.
// head == tail happens when full AND when empty, so track the count.
class CircularQueue {
    vector<int> buffer;
    int head = 0, tail = 0, count = 0;

public:
    explicit CircularQueue(int capacity) : buffer(capacity) {}

    bool enqueue(int value) {
        if (count == (int)buffer.size()) return false;    // full
        buffer[tail] = value;
        tail = (tail + 1) % (int)buffer.size();           // wrap
        ++count;
        return true;
    }

    bool dequeue() {
        if (count == 0) return false;
        head = (head + 1) % (int)buffer.size();
        --count;
        return true;
    }

    int front() const { return count ? buffer[head] : -1; }
    int back()  const {
        if (!count) return -1;
        return buffer[(tail - 1 + (int)buffer.size()) % (int)buffer.size()];
    }
    bool isEmpty() const { return count == 0; }
    bool isFull()  const { return count == (int)buffer.size(); }
};

// QUEUE FROM TWO STACKS. Pouring input into output reverses the order.
// Each element moves at most twice in its lifetime, so dequeue is O(1)
// AMORTISED even though one call can be O(n) - that is the point of
// the question.
class QueueFromStacks {
    stack<int> input, output;

    void shift() {
        if (!output.empty()) return;          // only pour when output is dry
        while (!input.empty()) { output.push(input.top()); input.pop(); }
    }

public:
    void push(int x) { input.push(x); }

    int pop() {
        shift();
        int value = output.top(); output.pop();
        return value;
    }

    int peek() { shift(); return output.top(); }
    bool empty() const { return input.empty() && output.empty(); }
};

// LEVEL-ORDER: freeze the queue size at the top of each pass. Reading
// q.size() inside the inner loop sweeps the next level in with this one.
struct TreeNode { int val; TreeNode *left = nullptr, *right = nullptr; };

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> out;
    if (!root) return out;
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = (int)q.size();        // frozen BEFORE the inner loop
        vector<int> level;
        for (int i = 0; i < levelSize; ++i) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        out.push_back(move(level));
    }
    return out;
}

// A DEQUE subsumes both stack and queue, and is what makes sliding
// window maximum linear.
void dequeBasics() {
    deque<int> dq;
    dq.push_back(1); dq.push_front(0);
    dq.pop_back();   dq.pop_front();          // all four are O(1)
}`,
  },

  "ll-traversal": {
    walkthrough: [
      {
        heading: "What you give up, and what you get",
        body: [
          "A linked list stores each element in its own node alongside a pointer to the next one. There is no index arithmetic, because the nodes are scattered across memory rather than laid out contiguously.",
          "That costs you random access. Reaching position k means following k pointers, so access is O(n) where an array is O(1). It also costs you cache performance: an array walk reads consecutive memory and the hardware prefetches ahead, while a list walk jumps to unpredictable addresses and stalls on every step. In practice this makes list traversal several times slower than array traversal even at the same asymptotic cost.",
          "What you get in exchange is O(1) insertion and deletion given a pointer to the position, with no shifting of anything else, and growth without reallocation. Whether that is a good trade depends entirely on the access pattern — which is the real content of 'array or linked list' as an interview question.",
        ],
      },
      {
        heading: "The traversal loop",
        body: [
          "Take a pointer to the head, and while it is not null, do the work and advance to next. Three lines, and every linked list algorithm starts from them.",
          "The habit worth building is never advancing the head pointer itself. Assign it to a working variable first, because once you have moved past the head you have no way back — there are no previous pointers in a singly linked list, and losing the head loses the entire structure.",
          "Reading the loop condition carefully also matters. `while (node)` visits every node. `while (node->next)` stops on the last node rather than past it, which is what you want when you need to modify a link rather than read a value. Choosing the wrong one gives either a null dereference or an off-by-one that skips the tail.",
        ],
        trace: `Two loop conditions, two stopping points

  1 → 2 → 3 → null

  while (node)          visits 1, 2, 3
                        ends with node == null

  while (node->next)    visits 1, 2
                        ends with node == 3

Use the first to read values.
Use the second when you need to touch
the last node's next pointer.`,
      },
      {
        heading: "The two-pointer techniques",
        body: [
          "A single traversal is limited, but two pointers moving at different speeds or offsets answer a surprising number of questions in one pass with O(1) space.",
          "Different speeds: advance one pointer by one and the other by two. When the fast one reaches the end, the slow one is at the midpoint. This is the first step of palindrome checking and reorder-list, and the same setup detects cycles.",
          "Fixed offset: advance one pointer k steps ahead, then move both together. When the leader reaches the end, the follower is exactly k from it. That finds the k-th node from the end without knowing the length, and it is the standard solution to removing the n-th node from the end.",
          "Both avoid the two-pass alternative of counting the length first and then walking again. The one-pass version is what interviewers are usually asking for.",
        ],
        aside:
          "With fast-and-slow, the fast pointer is the one that can run off the end, so it needs both checks: fast is non-null and fast's next is non-null. Checking only one dereferences null on even-length lists.",
      },
      {
        heading: "Null safety and the dummy head",
        body: [
          "Most linked list bugs are dereferencing null. Two habits prevent nearly all of them. Check for the empty list and the single-node list explicitly at the top, and be deliberate about which pointers a loop guarantees to be non-null when it exits.",
          "The dummy head is the other habit. Allocate a sentinel node whose next is the real head, do all the work relative to it, and return dummy.next at the end. Every operation that might change the head — deleting the first node, inserting at the front, merging two lists — then becomes the general case rather than a special one.",
          "It is worth adopting even when it is not strictly necessary, because it makes the code uniform. Merging two sorted lists with a dummy head is noticeably cleaner than the version that special-cases which list contributes the first node.",
        ],
      },
      {
        heading: "The variants and the problems",
        body: [
          "A doubly linked list adds a previous pointer, which makes deletion O(1) given only the node — no need to find its predecessor. That is what an LRU cache needs, and it is the reason that structure uses a doubly linked list rather than a singly linked one.",
          "A circular list has the tail pointing back at the head instead of null, which is useful for round-robin scheduling but means the traversal condition changes: you stop when you return to the start, not when you hit null.",
          "The problems that build on plain traversal are middle of the list, palindrome linked list, intersection of two lists, and the merges. Intersection has a neat one-pass solution worth knowing: walk both lists, and when one ends, restart that pointer on the other list. Both pointers then travel the same total distance and meet at the intersection, or both reach null together if there is none.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next = nullptr;
    explicit ListNode(int v) : val(v) {}
};

// The traversal loop. Never advance the head pointer itself - there is
// no way back, and losing it loses the whole list.
int length(ListNode* head) {
    int count = 0;
    for (ListNode* node = head; node; node = node->next) ++count;
    return count;
}

// while (node) visits every node.
// while (node->next) stops ON the last one - use it when you need to
// modify a link rather than read a value.
ListNode* lastNode(ListNode* head) {
    if (!head) return nullptr;
    ListNode* node = head;
    while (node->next) node = node->next;
    return node;
}

// FAST AND SLOW: when fast reaches the end, slow is halfway.
// fast is the pointer that can run off, so it needs BOTH checks.
ListNode* middleNode(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;                      // second middle when the length is even
}

// FIXED OFFSET: k ahead, then move together. Finds the k-th from the
// end in ONE pass, without knowing the length.
ListNode* kthFromEnd(ListNode* head, int k) {
    ListNode* leader = head;
    for (int i = 0; i < k; ++i) {
        if (!leader) return nullptr;  // list is shorter than k
        leader = leader->next;
    }
    ListNode* follower = head;
    while (leader) { leader = leader->next; follower = follower->next; }
    return follower;
}

// DUMMY HEAD removes every "what if it's the head" special case.
// Here: delete all nodes with a given value, including the first.
ListNode* removeElements(ListNode* head, int target) {
    ListNode dummy(0);
    dummy.next = head;

    for (ListNode* node = &dummy; node->next; ) {
        if (node->next->val == target) node->next = node->next->next;
        else                           node = node->next;   // only advance
    }                                                        // when kept
    return dummy.next;
}

// Merging two sorted lists - the dummy head is what keeps this clean.
ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
    ListNode dummy(0);
    ListNode* tail = &dummy;

    while (a && b) {
        if (a->val <= b->val) { tail->next = a; a = a->next; }
        else                  { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = a ? a : b;           // attach whatever remains
    return dummy.next;
}

// INTERSECTION in one pass, O(1) space. When a pointer ends, restart it
// on the other list: both then travel lenA + lenB total and meet at the
// intersection, or reach null together if there is none.
ListNode* intersection(ListNode* a, ListNode* b) {
    if (!a || !b) return nullptr;
    ListNode *p = a, *q = b;
    while (p != q) {
        p = p ? p->next : b;          // switch lists on reaching the end
        q = q ? q->next : a;
    }
    return p;                         // the meeting node, or nullptr
}`,
  },

  "ll-insertion-deletion": {
    walkthrough: [
      {
        heading: "Where the O(1) claim is true",
        body: [
          "Linked lists are described as having O(1) insertion and deletion, and that is true with an important qualification: only when you already hold a pointer to the relevant position. Finding that position costs O(n), and if the search is part of the operation then the whole thing is O(n).",
          "So the honest comparison against an array is narrower than it first appears. An array insertion is O(n) because of shifting, but finding the position was O(1). A list insertion is O(1) once you are there, but getting there was O(n). The list wins when you are already traversing — deleting while iterating, splicing a known node — and not otherwise.",
          "The place this genuinely pays off is when you hold the node from somewhere else. An LRU cache stores map values that are list nodes, so it reaches any node in O(1) and then splices in O(1). That composition is the whole reason a linked list is the right choice there.",
        ],
      },
      {
        heading: "Insertion, and the order of assignment",
        body: [
          "Inserting after a known node is two assignments, and the order is not optional. Point the new node at the current successor first, then point the predecessor at the new node.",
          "Doing it the other way round overwrites the predecessor's next before anything has recorded where it pointed, and the rest of the list becomes unreachable. This is the same discipline as saving the next pointer before flipping a link in reversal: never destroy the only reference to something you still need.",
          "Inserting at the head is the case that breaks naive code, because there is no predecessor. Either handle it explicitly, or use a dummy head so that the real head has a predecessor like everything else and the general code applies unchanged.",
        ],
        trace: `insert N between A and B

  CORRECT
    N.next = A.next     ← N now points at B
    A.next = N          ← A now points at N
    A → N → B  ✓

  WRONG
    A.next = N          ← the only pointer to B is gone
    N.next = A.next     ← reads N itself
    A → N → N → ...  ✗  self-loop`,
      },
      {
        heading: "Deletion needs the predecessor",
        body: [
          "Removing a node means making its predecessor point past it, so a singly linked list needs that predecessor. If you only have the node itself, you cannot find what precedes it without walking from the head — which is O(n).",
          "There is a well-known trick for the case where you are handed only the node to delete and it is not the tail: copy the next node's value into this one, then delete the next node instead. It produces the correct list contents, and it is the intended answer to Delete Node in a Linked List. It fails on the tail, because there is no next node to absorb.",
          "A doubly linked list has no such problem: the node knows its predecessor, so deletion is O(1) unconditionally. That is the concrete benefit of the extra pointer, and the reason to pay for it when arbitrary deletion is a common operation.",
        ],
        aside:
          "In C++, unlinking a node is not the same as freeing it. Delete the node after unlinking, or the memory leaks. In garbage-collected languages this is handled for you, which is why ported C++ code sometimes forgets it.",
      },
      {
        heading: "Deleting while traversing",
        body: [
          "A loop that removes nodes has a trap: after unlinking, you must not advance, because the pointer you would advance to has already moved into position.",
          "The clean structure is to look one ahead. Walk with a pointer to the node *before* the candidate, and inspect its next. If the candidate should go, splice it out and do not advance — the new next is a fresh candidate that has not been examined. If it should stay, advance.",
          "Combining that with a dummy head handles removal of the first node with no special case at all, which is why remove-all-occurrences is four lines with a dummy and considerably fussier without one.",
        ],
      },
      {
        heading: "The problems built on this",
        body: [
          "Remove Nth Node From End combines the fixed-offset two-pointer trick with deletion: advance a leader n+1 steps from a dummy head, then move both until the leader falls off, and the follower is sitting on the predecessor of the node to remove.",
          "Remove Duplicates from Sorted List is deletion while traversing, comparing each node with its successor. The variant that removes *all* copies of any duplicated value needs the dummy head, because the first value might itself be duplicated.",
          "Partition List splits into two lists with two dummy heads and joins them, which is much cleaner than trying to rearrange in place. Odd Even Linked List is the same idea. Whenever a problem asks you to reorder by some rule, building separate lists and concatenating usually beats splicing in place.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next = nullptr;
    explicit ListNode(int v) : val(v) {}
};

// INSERT AFTER. The order is forced: point the new node at the successor
// FIRST, or you destroy the only reference to the rest of the list.
void insertAfter(ListNode* node, int value) {
    ListNode* fresh = new ListNode(value);
    fresh->next = node->next;         // 1. capture the successor
    node->next = fresh;               // 2. then relink
}

// INSERT AT HEAD - no predecessor exists, so this is the case that
// breaks naive code. Return the new head.
ListNode* insertAtHead(ListNode* head, int value) {
    ListNode* fresh = new ListNode(value);
    fresh->next = head;
    return fresh;
}

// DELETE AFTER. Unlink, then free - unlinking alone leaks in C++.
void deleteAfter(ListNode* node) {
    if (!node || !node->next) return;
    ListNode* doomed = node->next;
    node->next = doomed->next;
    delete doomed;                    // not automatic here
}

// Given ONLY the node to delete, and it is not the tail: copy the
// successor's value in and delete the successor instead. Correct
// contents, and the only option without a predecessor. Fails on the tail.
void deleteGivenOnlyNode(ListNode* node) {
    node->val = node->next->val;
    ListNode* doomed = node->next;
    node->next = doomed->next;
    delete doomed;
}

// DELETING WHILE TRAVERSING. Look one ahead, and do NOT advance after
// removing - the new next is a fresh candidate not yet examined.
ListNode* removeAll(ListNode* head, int target) {
    ListNode dummy(0);
    dummy.next = head;

    ListNode* node = &dummy;
    while (node->next) {
        if (node->next->val == target) {
            ListNode* doomed = node->next;
            node->next = doomed->next;
            delete doomed;            // stay put - re-examine the new next
        } else {
            node = node->next;
        }
    }
    return dummy.next;
}

// REMOVE THE Nth FROM THE END - fixed-offset two pointers plus a dummy,
// so removing the head needs no special case. Advance the leader n+1
// steps so the follower lands on the PREDECESSOR.
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;

    ListNode* leader = &dummy;
    for (int i = 0; i <= n; ++i) leader = leader->next;

    ListNode* follower = &dummy;
    while (leader) { leader = leader->next; follower = follower->next; }

    ListNode* doomed = follower->next;
    follower->next = doomed->next;
    delete doomed;
    return dummy.next;
}

// PARTITION - build two separate lists and join them. Far cleaner than
// splicing in place, and the same idea solves Odd Even Linked List.
ListNode* partition(ListNode* head, int pivot) {
    ListNode lessHead(0), moreHead(0);
    ListNode *less = &lessHead, *more = &moreHead;

    for (ListNode* node = head; node; node = node->next) {
        if (node->val < pivot) { less->next = node; less = node; }
        else                   { more->next = node; more = node; }
    }
    more->next = nullptr;             // essential - or the tail still points
    less->next = moreHead.next;       // into the original list, making a cycle
    return lessHead.next;
}`,
  },

  "array-intervals": {
    walkthrough: [
      {
        heading: "Sorting is the algorithm",
        body: [
          "Interval problems look varied and mostly reduce to one decision: what do you sort by? Once the intervals are in the right order, a single linear sweep answers the question, and choosing the wrong key produces a plausible wrong answer rather than an error.",
          "Sort by start time when you are combining or scanning left to right — merging overlaps, inserting into a schedule, or anything that maintains a current interval as it advances.",
          "Sort by end time when you are choosing a maximum number of non-overlapping intervals. Taking the earliest-finishing interval leaves the most room for what follows, and that greedy choice is provably optimal by the exchange argument in the greedy topic. Sorting by start here gives the wrong answer, because one long interval can block several short ones.",
        ],
      },
      {
        heading: "The merge sweep",
        body: [
          "After sorting by start, walk through maintaining a current interval. Two intervals overlap exactly when the next one starts at or before the current one ends. If they do, extend the current interval's end; if not, close it out and begin a new one.",
          "The detail that catches people is what to extend to. The new end must be the maximum of the two ends, not simply the incoming one. If the incoming interval is entirely contained within the current one — starting later but ending earlier — assigning its end would truncate the interval you already had.",
          "That case is easy to miss in testing because it requires a specific input shape. Sorted by start, [1, 10] followed by [2, 3] triggers it; [1, 5] followed by [3, 8] does not.",
        ],
        trace: `merge, sorted by start

  [1,10]  current = [1,10]
  [2, 3]  2 <= 10, overlaps
          end = max(10, 3) = 10   ← NOT 3
          current = [1,10]
  [12,15] 12 > 10, no overlap
          close [1,10], start [12,15]

  Assigning end = 3 would have silently
  shrunk the interval to [1,3].`,
      },
      {
        heading: "Sweep line for counting overlaps",
        body: [
          "A different question — how many intervals are active at once — needs a different technique. Meeting Rooms II asks for the maximum concurrency, and merging does not answer it.",
          "Split every interval into two events: a start that increments a counter and an end that decrements it. Sort all events by time, then scan, tracking the running count and its maximum. The peak is the answer.",
          "The tie-breaking rule at equal timestamps is a decision the problem must make and you must encode. If a meeting ending at 10 frees the room for one starting at 10, ends must sort before starts at the same time. If they conflict, starts sort first. Getting this backwards produces answers that are off by one on exactly the inputs designed to test it.",
        ],
        aside:
          "Decide explicitly whether [1,2] and [2,3] overlap, and write the comparison to match. Half of interval bugs are this single boundary question left unresolved.",
      },
      {
        heading: "Inserting without re-sorting",
        body: [
          "When the existing intervals are already sorted and non-overlapping, inserting a new one does not need a re-sort. One pass in three phases handles it.",
          "First, copy across every interval that ends before the new one starts — these are entirely to the left and unaffected. Second, absorb every interval that starts at or before the new one ends, expanding the new interval to cover them by taking the minimum start and maximum end. Third, copy across the remainder.",
          "That is O(n) rather than the O(n log n) of appending and re-merging, and the three-phase structure makes it much easier to reason about than a single loop with branches. Insert Interval is the direct application.",
        ],
      },
      {
        heading: "The rest of the family",
        body: [
          "Minimum removals to eliminate all overlaps is n minus the maximum non-overlapping count, so it is the end-sorted greedy with a subtraction.",
          "Minimum arrows to burst balloons is the same greedy read differently: fire at the earliest end point, which pops everything overlapping it, then repeat from the first balloon that was missed.",
          "Interval List Intersections walks two sorted lists with two pointers, taking the overlap of the current pair — which is max of the starts to min of the ends, kept if that range is non-empty — then advancing whichever interval ends first.",
          "Employee Free Time merges everyone's intervals and reports the gaps. Data Stream as Disjoint Intervals needs an ordered map because intervals arrive one at a time and you must find the neighbours of each new point, which is the ordered-container topic rather than this one.",
        ],
      },
      {
        heading: "Practical notes",
        body: [
          "Sorting dominates the cost, so every one of these is O(n log n) time. Space is O(n) for the output, or O(1) extra if you may modify the input in place.",
          "Mutating the caller's array by sorting it in place is worth a moment's thought. In an interview it is usually fine, but say so; in real code, sort a copy unless the caller has agreed otherwise.",
          "Check the empty input before indexing element zero. Most of these algorithms seed a current interval from the first element and will crash on an empty list otherwise.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

using Interval = pair<int,int>;               // {start, end}

// MERGE - sort by START, then extend or close.
// The end must be the MAX of the two: a fully contained interval would
// otherwise truncate the one holding it.
vector<Interval> merge(vector<Interval> intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());  // by start

    vector<Interval> out{intervals[0]};
    for (size_t i = 1; i < intervals.size(); ++i) {
        auto [start, end] = intervals[i];
        if (start <= out.back().second)        // overlaps the current
            out.back().second = max(out.back().second, end);   // max, not end
        else
            out.push_back({start, end});
    }
    return out;
}

// INSERT into an already-sorted, non-overlapping list. Three phases,
// one pass, O(n) - no re-sort needed.
vector<Interval> insert(const vector<Interval>& intervals, Interval fresh) {
    vector<Interval> out;
    size_t i = 0, n = intervals.size();

    while (i < n && intervals[i].second < fresh.first)      // entirely left
        out.push_back(intervals[i++]);

    while (i < n && intervals[i].first <= fresh.second) {   // overlapping
        fresh.first  = min(fresh.first,  intervals[i].first);
        fresh.second = max(fresh.second, intervals[i].second);
        ++i;
    }
    out.push_back(fresh);

    while (i < n) out.push_back(intervals[i++]);            // entirely right
    return out;
}

// MAXIMUM NON-OVERLAPPING - sort by END. Sorting by start gives the
// wrong answer: one long interval can block several short ones.
int maxNonOverlapping(vector<Interval> intervals) {
    sort(intervals.begin(), intervals.end(),
         [](const Interval& a, const Interval& b) { return a.second < b.second; });

    int count = 0, lastEnd = INT_MIN;
    for (auto [start, end] : intervals)
        if (start >= lastEnd) { ++count; lastEnd = end; }
    return count;
}

int minRemovals(vector<Interval> intervals) {
    return (int)intervals.size() - maxNonOverlapping(intervals);
}

// SWEEP LINE - maximum concurrency, which merging cannot answer.
// The tie-break at equal times is a real decision: here ends sort
// before starts, so a room freed at t is reusable at t.
int minMeetingRooms(const vector<Interval>& intervals) {
    vector<pair<int,int>> events;              // {time, delta}
    for (auto [start, end] : intervals) {
        events.push_back({start, +1});
        events.push_back({end,   -1});
    }
    sort(events.begin(), events.end());        // -1 sorts before +1 at ties

    int active = 0, peak = 0;
    for (auto [time, delta] : events) {
        active += delta;
        peak = max(peak, active);
    }
    return peak;
}

// INTERSECTIONS of two sorted lists - two pointers, advancing whichever
// interval ends first.
vector<Interval> intervalIntersection(const vector<Interval>& a,
                                      const vector<Interval>& b) {
    vector<Interval> out;
    size_t i = 0, j = 0;

    while (i < a.size() && j < b.size()) {
        int lo = max(a[i].first,  b[j].first);
        int hi = min(a[i].second, b[j].second);
        if (lo <= hi) out.push_back({lo, hi});           // non-empty overlap

        if (a[i].second < b[j].second) ++i; else ++j;    // drop the earlier end
    }
    return out;
}

// MINIMUM ARROWS - the same earliest-finish greedy, read differently.
int minArrows(vector<Interval> balloons) {
    if (balloons.empty()) return 0;
    sort(balloons.begin(), balloons.end(),
         [](const Interval& a, const Interval& b) { return a.second < b.second; });

    int arrows = 1;
    long long shotAt = balloons[0].second;     // fire at the earliest end
    for (auto [start, end] : balloons)
        if (start > shotAt) { ++arrows; shotAt = end; }   // this one was missed
    return arrows;
}`,
  },
};
