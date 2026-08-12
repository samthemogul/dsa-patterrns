/**
 * Enrichment batch 3 — Stage 2 core patterns (lists and stacks).
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "ll-reversal": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Three-pointer in-place linked list reversal, one link flipped per step">
  <defs>
    <marker id="rv-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow"/>
    </marker>
    <marker id="rv-h" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow-hi"/>
    </marker>
  </defs>

  <text x="0" y="14" class="dg-title">One link flipped per step. prev trails, curr leads, next is the safety rope.</text>

  <!-- initial -->
  <text x="0" y="52" class="dg-label">start</text>
  <g transform="translate(80,36)">
    <rect x="0"   y="0" width="44" height="28" rx="3" class="dg-cell"/><text x="22"  y="19" text-anchor="middle">1</text>
    <rect x="90"  y="0" width="44" height="28" rx="3" class="dg-cell"/><text x="112" y="19" text-anchor="middle">2</text>
    <rect x="180" y="0" width="44" height="28" rx="3" class="dg-cell"/><text x="202" y="19" text-anchor="middle">3</text>
    <line x1="46" y1="14" x2="86"  y2="14" class="dg-link" marker-end="url(#rv-a)"/>
    <line x1="136" y1="14" x2="176" y2="14" class="dg-link" marker-end="url(#rv-a)"/>
    <text x="240" y="19" class="dg-label">&#8594; null</text>
    <text x="-52" y="48" class="dg-ptr">prev = null</text>
    <text x="22"  y="48" text-anchor="middle" class="dg-ptr2">curr</text>
  </g>

  <!-- step 1 -->
  <text x="0" y="132" class="dg-label">step 1</text>
  <g transform="translate(80,116)">
    <rect x="0"   y="0" width="44" height="28" rx="3" class="dg-cell-mark"/><text x="22"  y="19" text-anchor="middle">1</text>
    <rect x="90"  y="0" width="44" height="28" rx="3" class="dg-cell-live"/><text x="112" y="19" text-anchor="middle">2</text>
    <rect x="180" y="0" width="44" height="28" rx="3" class="dg-cell"/><text x="202" y="19" text-anchor="middle">3</text>
    <text x="-40" y="19" class="dg-label">null &#8592;</text>
    <line x1="86" y1="14" x2="48"  y2="14" class="dg-link-hi" marker-end="url(#rv-h)"/>
    <line x1="136" y1="14" x2="176" y2="14" class="dg-link" marker-end="url(#rv-a)"/>
    <text x="240" y="19" class="dg-label">&#8594; null</text>
    <text x="22"  y="48" text-anchor="middle" class="dg-ptr">prev</text>
    <text x="112" y="48" text-anchor="middle" class="dg-ptr2">curr</text>
    <text x="202" y="48" text-anchor="middle" class="dg-label">next</text>
  </g>

  <!-- step 2 -->
  <text x="0" y="212" class="dg-label">step 2</text>
  <g transform="translate(80,196)">
    <rect x="0"   y="0" width="44" height="28" rx="3" class="dg-cell"/><text x="22"  y="19" text-anchor="middle">1</text>
    <rect x="90"  y="0" width="44" height="28" rx="3" class="dg-cell-mark"/><text x="112" y="19" text-anchor="middle">2</text>
    <rect x="180" y="0" width="44" height="28" rx="3" class="dg-cell-live"/><text x="202" y="19" text-anchor="middle">3</text>
    <text x="-40" y="19" class="dg-label">null &#8592;</text>
    <line x1="86"  y1="14" x2="48"  y2="14" class="dg-link" marker-end="url(#rv-a)"/>
    <line x1="176" y1="14" x2="138" y2="14" class="dg-link-hi" marker-end="url(#rv-h)"/>
    <text x="112" y="48" text-anchor="middle" class="dg-ptr">prev</text>
    <text x="202" y="48" text-anchor="middle" class="dg-ptr2">curr</text>
  </g>

  <line x1="0" y1="256" x2="700" y2="256" class="dg-guide"/>
  <text x="0" y="278" class="dg-note">When curr falls off the end, prev is the new head. Save next BEFORE flipping the link,</text>
  <text x="0" y="294" class="dg-note">or you overwrite the only reference to the rest of the list.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Why this is the canonical pointer question",
        body: [
          "Reversing a linked list in place is asked constantly, and not because reversal is useful. It is asked because it cannot be faked. There is no library call, no clever one-liner, and the code is short enough that a wrong pointer is immediately visible. It tests whether you can hold three references in your head and mutate a structure without losing it.",
          "The constraint that matters is 'in place' — O(1) extra space. Building a new list, or dumping the values into an array and rebuilding, both work and both miss the point. The intended answer rewires the existing nodes.",
        ],
      },
      {
        heading: "The three pointers and what each is for",
        body: [
          "prev holds the part of the list already reversed. It starts as null, because the original head will become the tail and must point at null.",
          "curr is the node whose link you are about to flip. It starts at the head.",
          "next is a temporary holding the rest of the list. It exists for exactly one reason: the moment you point curr at prev, you have destroyed curr's only reference to the node after it. If you have not saved that reference first, the remainder of the list is unreachable and gone.",
          "So the order inside the loop is forced: save next, flip the link, advance prev to curr, advance curr to next. Any other ordering loses something.",
        ],
        trace: `Loop body, in the only order that works:

  next = curr.next     ← save the rest FIRST
  curr.next = prev     ← flip this one link
  prev = curr          ← prev catches up
  curr = next          ← curr moves on

Swap lines 1 and 2 and the list is destroyed:
curr.next now points backwards, so 'next'
would read the node you just came from.`,
      },
      {
        heading: "Walking it on three nodes",
        body: [
          "Trace it once concretely and it stops being fiddly. List 1 → 2 → 3 → null.",
          "Initially prev is null and curr is node 1. First pass: next becomes node 2, node 1 now points at null, prev becomes node 1, curr becomes node 2. Second pass: next becomes node 3, node 2 points at node 1, prev becomes node 2, curr becomes node 3. Third pass: next becomes null, node 3 points at node 2, prev becomes node 3, curr becomes null. Loop ends.",
          "curr is null, and prev is node 3 — the new head. That is why the function returns prev rather than curr or head. Returning head is the most common bug in this problem, and it returns the old head, which is now the tail pointing at null: a one-element list.",
        ],
        aside:
          "Return prev, not head. After the loop, head is the last node of the reversed list and curr is null. The only pointer to the new front is prev.",
      },
      {
        heading: "The recursive version, and its cost",
        body: [
          "The recursive form is elegant and worth being able to write. Recurse to the end to get the new head, then on the way back up perform one local rewiring: make the node after me point at me, and make me point at null.",
          "The line that does the work is the one people find surprising: node.next.next = node. Read it slowly — node.next is the node ahead of me, and setting its next to me reverses that single link. Then node.next = null, which is either correct because I am the new tail, or harmless because the caller one level up is about to overwrite it.",
          "The catch is space. Recursion holds a stack frame per node, so this is O(n) space against the iterative version's O(1). On a list of a million nodes it will overflow. If the question says in-place or O(1) space, the iterative version is the required answer.",
        ],
      },
      {
        heading: "The variants built on this",
        body: [
          "Once the three-pointer loop is automatic, a family of harder questions becomes routine, because they are all the same loop applied to a section.",
          "Reverse a sublist between positions m and n: walk to the node before m, remember it, reverse exactly n minus m plus one nodes, then reconnect both ends. The reconnection is the fiddly part, which is what a dummy head node solves — insert a sentinel before the real head so position 1 has a predecessor and needs no special case.",
          "Reverse in groups of k: check that k nodes remain, reverse them, then recurse or loop on the rest and join. Palindrome checking: find the midpoint with fast-and-slow pointers, reverse the second half, compare the two halves. Reorder list: split, reverse the back half, interleave. Every one of these is this loop plus bookkeeping.",
        ],
        trace: `Reverse only positions 2..4 of 1→2→3→4→5

  dummy → 1 → 2 → 3 → 4 → 5
          ↑   └──── reverse ────┘
        before

  after reversing that section:
          1 → 4 → 3 → 2 → 5
          │   ↑           ↑
    before┘  new head   tail's next

  Two reconnections:
    before.next = new head of the section
    old head of the section .next = the rest`,
      },
      {
        heading: "Working with pointers without losing the list",
        body: [
          "One habit prevents most linked-list bugs: before writing any line that assigns to a .next field, ask what that field currently points at and whether anything else still references it. If the answer is no, save it first.",
          "The second habit is the dummy head. Whenever an operation might change the head — deleting the first node, inserting at the front, reversing from position 1 — allocate a sentinel node whose next is the real head, do the work, and return dummy.next. It converts every 'what if it is the head' special case into the general case, and it costs one allocation.",
          "The third is to check for the empty list and the single-node list explicitly at the top. Most linked-list loops are correct on those inputs by accident rather than design, and it is worth knowing which.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int v) : val(v), next(nullptr) {}
};

// Iterative, in place. O(n) time, O(1) space - the expected answer.
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;   // save the rest BEFORE flipping
        curr->next = prev;             // flip this one link
        prev = curr;                   // prev catches up
        curr = next;                   // curr moves on
    }
    return prev;                       // NOT head - head is now the tail
}

// Recursive. Elegant, but O(n) stack - it will overflow on a long list.
ListNode* reverseRecursive(ListNode* head) {
    if (!head || !head->next) return head;    // base: empty or single node
    ListNode* newHead = reverseRecursive(head->next);
    head->next->next = head;   // the node ahead of me now points back at me
    head->next = nullptr;      // and I let go of it
    return newHead;            // the deepest node, passed all the way up
}

// Reverse only positions [left, right], 1-indexed.
// The dummy head removes the "what if left == 1" special case entirely.
ListNode* reverseBetween(ListNode* head, int left, int right) {
    ListNode dummy(0);
    dummy.next = head;

    ListNode* before = &dummy;
    for (int i = 1; i < left; ++i) before = before->next;

    ListNode* prev = nullptr;
    ListNode* curr = before->next;
    ListNode* sectionTail = curr;              // becomes the section's end
    for (int i = left; i <= right; ++i) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }

    before->next = prev;          // reconnect the front
    sectionTail->next = curr;     // reconnect the back
    return dummy.next;
}

// Reverse in groups of k, leaving any remainder untouched.
ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* check = head;
    for (int i = 0; i < k; ++i) {              // enough nodes left?
        if (!check) return head;               // no - leave as is
        check = check->next;
    }

    ListNode* prev = nullptr;
    ListNode* curr = head;
    for (int i = 0; i < k; ++i) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    head->next = reverseKGroup(curr, k);       // head is now the group's tail
    return prev;
}`,
  },

  "ll-cycle-detection": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Floyd's tortoise and hare meeting inside a cycle, then locating the cycle entrance">
  <defs>
    <marker id="cy-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow"/>
    </marker>
  </defs>

  <text x="0" y="14" class="dg-title">Tortoise moves 1, hare moves 2. If there is a loop, the hare laps the tortoise.</text>

  <!-- tail -->
  <g transform="translate(20,60)">
    <circle cx="20"  cy="20" r="17" class="dg-cell"/><text x="20"  y="25" text-anchor="middle">1</text>
    <circle cx="90"  cy="20" r="17" class="dg-cell"/><text x="90"  y="25" text-anchor="middle">2</text>
    <line x1="39" y1="20" x2="71" y2="20" class="dg-link" marker-end="url(#cy-a)"/>
    <text x="55" y="-2" text-anchor="middle" class="dg-label">tail length a</text>

    <!-- cycle -->
    <circle cx="180" cy="20"  r="17" class="dg-cell-mark"/><text x="180" y="25" text-anchor="middle">3</text>
    <circle cx="270" cy="-30" r="17" class="dg-cell"/><text x="270" y="-25" text-anchor="middle">4</text>
    <circle cx="330" cy="40"  r="17" class="dg-cell-hit"/><text x="330" y="45" text-anchor="middle">5</text>
    <circle cx="230" cy="80"  r="17" class="dg-cell"/><text x="230" y="85" text-anchor="middle">6</text>

    <line x1="109" y1="20" x2="161" y2="20" class="dg-link" marker-end="url(#cy-a)"/>
    <line x1="193" y1="9"  x2="255" y2="-20" class="dg-link" marker-end="url(#cy-a)"/>
    <line x1="284" y1="-15" x2="320" y2="22" class="dg-link" marker-end="url(#cy-a)"/>
    <line x1="319" y1="53" x2="247" y2="74" class="dg-link" marker-end="url(#cy-a)"/>
    <line x1="215" y1="68" x2="184" y2="38" class="dg-link" marker-end="url(#cy-a)"/>

    <text x="180" y="-8" text-anchor="middle" class="dg-ptr">entrance</text>
    <text x="360" y="45" class="dg-good">meeting point</text>
  </g>

  <line x1="0" y1="192" x2="700" y2="192" class="dg-guide"/>

  <text x="0" y="216" class="dg-title">Why phase two lands on the entrance</text>
  <text x="0" y="240" class="dg-note">a = nodes before the cycle&#160;&#160;&#160;b = distance from entrance to the meeting point&#160;&#160;&#160;L = cycle length</text>
  <text x="0" y="262" class="dg-note">At the meeting: hare has walked exactly twice the tortoise, so&#160;&#160;a + b + kL = 2(a + b)</text>
  <text x="0" y="284" class="dg-note">Rearranged:&#160;&#160;a = kL &#8722; b&#160;&#160;&#8212; the distance from the head to the entrance equals the distance</text>
  <text x="0" y="306" class="dg-note">from the meeting point onward to the entrance. Two walkers at 1 step each must meet there.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The problem and the obvious solution",
        body: [
          "A linked list has a cycle if following next pointers eventually revisits a node — meaning traversal never terminates. Detecting that is the question, and the obvious answer is to put every node you visit into a hash set and stop when you see one twice.",
          "That works, runs in O(n) time, and is a perfectly good first answer to state. But it costs O(n) space, and the reason this question gets asked is the follow-up: can you do it in O(1) space? Floyd's cycle detection can, using nothing but two pointers.",
        ],
      },
      {
        heading: "Why two speeds guarantee a meeting",
        body: [
          "Move one pointer, the tortoise, one node per step. Move the other, the hare, two nodes per step. If the list ends, the hare reaches null and there is no cycle. If there is a cycle, both pointers eventually enter it and can never leave.",
          "Once both are inside the cycle, consider the gap between them measured forward around the loop. Every step, the hare gains exactly one on the tortoise, so the gap shrinks by exactly one per step. A quantity that decreases by one each step and is bounded below must reach zero — it cannot jump over it. When it reaches zero the pointers are on the same node.",
          "That is the entire proof, and it is worth being able to give because it explains why the speeds must differ by exactly one. With speeds 1 and 3 the gap changes by 2 each step and can straddle zero without landing on it, so a meeting is no longer guaranteed for every cycle length.",
        ],
        aside:
          "The hare is the pointer that can fall off the end, so it needs both checks: hare is non-null and hare's next is non-null. Checking only one dereferences null on lists of even length.",
      },
      {
        heading: "Finding the entrance — the part with the algebra",
        body: [
          "Detecting a cycle is usually not enough; the question asks which node it starts at. The answer is startlingly simple: reset one pointer to the head, then advance both one step at a time. They meet at the entrance.",
          "The reason is a short piece of algebra. Let a be the number of nodes before the cycle, b the distance from the entrance to the meeting point, and L the cycle length. When they meet, the tortoise has walked a + b, and the hare has walked a + b + kL for some number of complete laps k. The hare has also walked exactly twice as far, so a + b + kL = 2(a + b).",
          "Cancel and you get a = kL − b. Read that out loud: the distance from the head to the entrance equals the distance from the meeting point, going forward around the loop, back to the entrance, possibly after some whole laps. So a walker starting at the head and a walker starting at the meeting point, both at one step per move, arrive at the entrance simultaneously.",
        ],
        trace: `a = 2 (nodes 1,2)   entrance = node 3   L = 4

  step  tortoise  hare
    0      1        1
    1      2        3
    2      3        5
    3      4        3
    4      5        5     ← meet at node 5, so b = 2

  check:  a = kL − b  →  2 = 1·4 − 2  ✓

  phase two, both moving 1 step:
    head:    1 → 2 → 3
    meeting: 5 → 6 → 3     ← both reach node 3, the entrance`,
      },
      {
        heading: "The same trick outside linked lists",
        body: [
          "Fast-and-slow pointers are not really about lists — they are about any function you can iterate. Wherever you have a sequence where each value determines the next, you have an implicit linked list, and it must eventually cycle if the value range is finite.",
          "Find the Duplicate Number is the standard disguise. Given n+1 integers in the range 1..n, treat each value as a pointer to an index. Because there are more slots than values, some index is pointed at twice, which is a cycle entrance — and the entrance node is the duplicate. That gives an O(n) time, O(1) space solution to a problem that looks like it needs sorting or a counting array.",
          "Happy Number is the same idea over digit-square-sums, where a cycle means the number is not happy. Recognising 'this sequence must eventually repeat' as 'this is a linked list' is the transferable part of this topic.",
        ],
      },
      {
        heading: "Middle of the list, and the k-th from the end",
        body: [
          "The two-speed idea solves two other one-pass problems worth knowing, both of which come up as sub-steps in harder questions.",
          "Finding the midpoint: run the same two speeds, and when the hare reaches the end the tortoise is at the middle, since it has gone exactly half as far. Whether you land on the first or second middle for an even-length list depends on your loop condition, and problems care — check it deliberately rather than by trial. This is the first step of both palindrome-check and reorder-list.",
          "Finding the k-th node from the end: use two pointers at the same speed but offset by k. Advance the first k steps, then move both together; when the leader hits the end, the follower is exactly k from it. Same one-pass, O(1) space idea, no arithmetic on the length required.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int v) : val(v), next(nullptr) {}
};

// Detection. O(n) time, O(1) space.
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {      // BOTH checks - fast is the one
        slow = slow->next;            // that can run off the end
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Locate the entrance. Phase 2 works because a = kL - b.
ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {                  // phase 1: they meet
            ListNode* walker = head;         // phase 2: one step each
            while (walker != slow) {
                walker = walker->next;
                slow = slow->next;
            }
            return walker;                   // the cycle entrance
        }
    }
    return nullptr;
}

// Cycle length, once a meeting point is known: lap it once.
int cycleLength(ListNode* meeting) {
    int len = 1;
    for (ListNode* p = meeting->next; p != meeting; p = p->next) ++len;
    return len;
}

// Middle node. When fast reaches the end, slow has gone half as far.
// This condition lands on the SECOND middle for even lengths.
ListNode* middleNode(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    return slow;
}

// The same idea with no list at all: values 1..n in an array of size n+1,
// treated as pointers. The duplicate is the cycle entrance.
int findDuplicate(const vector<int>& nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
    return slow;
}`,
  },

  "stacks-monotonic": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A decreasing monotonic stack resolving the next greater element for each position">
  <text x="0" y="14" class="dg-title">Next greater element &#8212; [2, 1, 5, 3, 4]</text>

  <!-- input -->
  <g transform="translate(80,30)">
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="23"  y="18" text-anchor="middle">2</text>
    <rect x="52"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="75"  y="18" text-anchor="middle">1</text>
    <rect x="104" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="127" y="18" text-anchor="middle">5</text>
    <rect x="156" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="179" y="18" text-anchor="middle">3</text>
    <rect x="208" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="231" y="18" text-anchor="middle">4</text>
    <text x="23"  y="-6" text-anchor="middle" class="dg-index">0</text>
    <text x="75"  y="-6" text-anchor="middle" class="dg-index">1</text>
    <text x="127" y="-6" text-anchor="middle" class="dg-index">2</text>
    <text x="179" y="-6" text-anchor="middle" class="dg-index">3</text>
    <text x="231" y="-6" text-anchor="middle" class="dg-index">4</text>
  </g>

  <line x1="0" y1="80" x2="700" y2="80" class="dg-guide"/>

  <!-- stack states -->
  <g transform="translate(0,100)">
    <text x="0" y="12" class="dg-label">see 2</text>
    <rect x="80" y="0" width="40" height="22" rx="3" class="dg-cell-live"/><text x="100" y="16" text-anchor="middle">2</text>
    <text x="150" y="16" class="dg-note">stack empty &#8594; push</text>

    <text x="0" y="46" class="dg-label">see 1</text>
    <rect x="80"  y="34" width="40" height="22" rx="3" class="dg-cell-live"/><text x="100" y="50" text-anchor="middle">2</text>
    <rect x="126" y="34" width="40" height="22" rx="3" class="dg-cell-live"/><text x="146" y="50" text-anchor="middle">1</text>
    <text x="190" y="50" class="dg-note">1 &lt; 2, still decreasing &#8594; push</text>

    <text x="0" y="80" class="dg-label">see 5</text>
    <rect x="80"  y="68" width="40" height="22" rx="3" class="dg-cell-out"/><text x="100" y="84" text-anchor="middle">2</text>
    <rect x="126" y="68" width="40" height="22" rx="3" class="dg-cell-out"/><text x="146" y="84" text-anchor="middle">1</text>
    <text x="190" y="84" class="dg-bad">5 &gt; both &#8594; pop 1, pop 2</text>
    <text x="190" y="100" class="dg-good">answer[1] = 5&#160;&#160;&#160;answer[0] = 5</text>

    <text x="0" y="128" class="dg-label">&#160;</text>
    <rect x="80" y="116" width="40" height="22" rx="3" class="dg-cell-live"/><text x="100" y="132" text-anchor="middle">5</text>
    <text x="150" y="132" class="dg-note">then push 5</text>

    <text x="0" y="162" class="dg-label">see 3</text>
    <rect x="80"  y="150" width="40" height="22" rx="3" class="dg-cell-live"/><text x="100" y="166" text-anchor="middle">5</text>
    <rect x="126" y="150" width="40" height="22" rx="3" class="dg-cell-live"/><text x="146" y="166" text-anchor="middle">3</text>
    <text x="190" y="166" class="dg-note">3 &lt; 5 &#8594; push</text>

    <text x="0" y="196" class="dg-label">see 4</text>
    <rect x="80"  y="184" width="40" height="22" rx="3" class="dg-cell-live"/><text x="100" y="200" text-anchor="middle">5</text>
    <rect x="126" y="184" width="40" height="22" rx="3" class="dg-cell-out"/><text x="146" y="200" text-anchor="middle">3</text>
    <text x="190" y="200" class="dg-bad">4 &gt; 3 &#8594; pop 3&#160;&#160;</text>
    <text x="190" y="216" class="dg-good">answer[3] = 4, then push 4</text>
  </g>

  <line x1="0" y1="322" x2="700" y2="322" class="dg-guide"/>
</svg>`,
    walkthrough: [
      {
        heading: "The question it answers",
        body: [
          "A monotonic stack answers one shape of question: for each element, what is the nearest element to its left or right that is greater or smaller than it? Next greater element, previous smaller element, and every variation of that phrasing.",
          "The brute-force approach scans outward from each position, which is O(n²). A monotonic stack does the whole thing in O(n), and the way it gets there is worth understanding rather than memorising, because the same reasoning covers a surprisingly wide family of problems that do not obviously look like this one.",
        ],
      },
      {
        heading: "The invariant",
        body: [
          "A monotonic stack is an ordinary stack with one rule enforced: the values inside it are always sorted. To keep that true when a new element arrives, you pop everything that would break the order before pushing.",
          "A decreasing stack — values decrease from bottom to top — is the one for next greater element. When a new value arrives that is larger than the top, the top's answer has just been found, so pop it and record the new value as its answer. Keep popping while the condition holds, then push the new value.",
          "The insight is what the stack actually contains: elements still waiting for their answer. If something is on the stack, nothing seen so far has been big enough to resolve it. An element is popped exactly when its answer arrives, so anything still on the stack when the input runs out has no answer at all.",
        ],
        aside:
          "Store indices, not values. Almost every problem in this family eventually needs a distance — how far away the next greater element is, how wide a rectangle is — and you cannot recover the index from the value. You can always read the value back with arr[i].",
      },
      {
        heading: "Why the nested loop is still linear",
        body: [
          "There is a while loop inside a for loop, so the instinct is to call it O(n²). It is O(n), for the same amortised reason as sliding window.",
          "Count pushes and pops rather than loop iterations. Each element is pushed exactly once, over the whole run. Each element can be popped at most once, because once popped it never returns. So the total number of pops across the entire algorithm is at most n, no matter how they cluster. A single iteration might pop five elements, but only because five earlier iterations each pushed one and did no popping.",
          "Total work is n pushes plus at most n pops plus the n iterations of the outer loop — O(n). This is worth saying out loud in an interview; it is the same argument as sliding window and it is what shows you understand why the pattern is efficient rather than just that it is.",
        ],
      },
      {
        heading: "Choosing the direction and the comparison",
        body: [
          "Four combinations, and getting them straight saves a lot of guesswork. The direction you iterate decides whether you find the next or the previous match. The stack's order decides whether you find greater or smaller.",
          "Iterating left to right and popping when the new value is larger gives, for each popped element, its next greater element. Iterating right to left with the same rule gives previous greater. Flip the comparison to pop when the new value is smaller and you get the smaller variants.",
          "There is a second framing of the same code that is often easier: instead of asking what the popped element's answer is, ask what is left on the stack when the current element arrives. After popping everything not smaller than the current value, whatever sits on top is the previous smaller element of the current position. Both readings are correct — pick whichever matches the problem so you are not translating in your head.",
        ],
        trace: `Iterate →, pop when new value is LARGER
  each popped element learns its NEXT GREATER

Iterate →, pop when new value is SMALLER
  each popped element learns its NEXT SMALLER

Iterate ←, pop when new value is LARGER
  each popped element learns its PREVIOUS GREATER

Iterate ←, pop when new value is SMALLER
  each popped element learns its PREVIOUS SMALLER

Alternative reading of the same loop:
  after popping, stack top = the current
  element's previous smaller/greater neighbour.`,
      },
      {
        heading: "Largest rectangle in a histogram",
        body: [
          "This is the hardest common application and the one that shows what the pattern is really for. Given bar heights, find the largest rectangle that fits inside the histogram.",
          "The reframing that unlocks it: for each bar, consider the largest rectangle whose height is exactly that bar. It extends left until it hits a shorter bar and right until it hits a shorter bar. So the width is determined by the previous smaller element and the next smaller element — both of which a monotonic stack gives you.",
          "So maintain an increasing stack. When a bar arrives that is shorter than the top, the top's right boundary has been found: it is the current index. Its left boundary is whatever is beneath it on the stack after popping. Width is the difference minus one, area is width times the popped height. Push a sentinel of height zero at the end so every remaining bar gets flushed and resolved.",
          "Maximal Rectangle in a binary matrix is this run once per row: treat each row as a histogram of how many consecutive ones sit above each column, and take the best over all rows.",
        ],
        trace: `heights = [2, 1, 5, 6, 2, 3]

  i=0  push 0                   stack: [0]           (h=2)
  i=1  h=1 < 2 → pop 0
       width = 1 − (−1) − 1 = 1, area = 2·1 = 2
       push 1                   stack: [1]           (h=1)
  i=2  push 2                   stack: [1,2]         (1,5)
  i=3  push 3                   stack: [1,2,3]       (1,5,6)
  i=4  h=2 < 6 → pop 3
       width = 4 − 2 − 1 = 1, area = 6·1 = 6
       h=2 < 5 → pop 2
       width = 4 − 1 − 1 = 2, area = 5·2 = 10  ← best
       push 4                   stack: [1,4]

  answer 10 — the 5 and 6 bars, two wide.`,
      },
      {
        heading: "Recognising it in the wild",
        body: [
          "The direct signals are easy: 'next greater', 'previous smaller', 'nearest warmer day', 'how many days until'. Those are the pattern stated openly.",
          "The indirect ones are worth learning because they are where the marks are. Any problem about a rectangle, span, or range bounded by where something stops being true is usually asking for the nearest smaller or greater neighbour on each side. Trapping Rain Water can be solved this way, as can Sum of Subarray Minimums, where each element's contribution is weighted by how many subarrays it is the minimum of — which is exactly the product of its two boundary distances.",
          "The related structure to know about is the monotonic deque, which allows popping from both ends and is what makes sliding-window-maximum linear. Same invariant, extra operation, because the window also removes elements from the front as it slides.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Next greater element for every index, or -1 where none exists.
// Store INDICES - you will almost always need distances eventually.
vector<int> nextGreater(const vector<int>& arr) {
    int n = (int)arr.size();
    vector<int> answer(n, -1);
    stack<int> st;                                  // decreasing by value

    for (int i = 0; i < n; ++i) {
        // Everything smaller than arr[i] has just found its answer.
        while (!st.empty() && arr[st.top()] < arr[i]) {
            answer[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return answer;                                  // leftovers keep -1
}

// Previous smaller element - the other reading of the same loop:
// after popping, whatever is on top IS the answer for i.
vector<int> previousSmaller(const vector<int>& arr) {
    int n = (int)arr.size();
    vector<int> answer(n, -1);
    stack<int> st;                                  // increasing by value

    for (int i = 0; i < n; ++i) {
        while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();
        if (!st.empty()) answer[i] = arr[st.top()];
        st.push(i);
    }
    return answer;
}

// Circular version: walk the array twice, but only record on the first lap.
vector<int> nextGreaterCircular(const vector<int>& arr) {
    int n = (int)arr.size();
    vector<int> answer(n, -1);
    stack<int> st;
    for (int i = 0; i < 2 * n; ++i) {
        int j = i % n;
        while (!st.empty() && arr[st.top()] < arr[j]) {
            answer[st.top()] = arr[j];
            st.pop();
        }
        if (i < n) st.push(j);                      // don't push twice
    }
    return answer;
}

// Largest rectangle in a histogram.
// For each bar, the widest rectangle of exactly its height runs from
// its previous smaller bar to its next smaller bar.
long long largestRectangle(vector<int> heights) {
    heights.push_back(0);                  // sentinel flushes the stack
    stack<int> st;
    long long best = 0;

    for (int i = 0; i < (int)heights.size(); ++i) {
        while (!st.empty() && heights[st.top()] > heights[i]) {
            int h = heights[st.top()];
            st.pop();
            // Left boundary is whatever is now beneath it; -1 if empty.
            int left = st.empty() ? -1 : st.top();
            long long width = i - left - 1;
            best = max(best, (long long)h * width);
        }
        st.push(i);
    }
    return best;
}`,
  },
};
