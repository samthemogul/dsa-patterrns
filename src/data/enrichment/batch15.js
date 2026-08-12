/**
 * Enrichment batch 15 — the final six topics. Completes all 57.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "array-sorting-mergesort": {
    walkthrough: [
      {
        heading: "Guaranteed, stable, and predictable",
        body: [
          "Merge sort splits the array in half, sorts each half recursively, and merges the two sorted halves into one. The split is trivial — pick the midpoint — and all the work happens in the merge.",
          "Its distinguishing property is that O(n log n) is a guarantee, not an average. There is no input that degrades it, because the split is always exactly in half regardless of what the values are. Quicksort's split depends on the pivot and can be terrible; merge sort's cannot.",
          "It is also stable: equal elements keep their original relative order. That matters more than it sounds. Sorting records by one key and then another gives a correct multi-key ordering only if the second sort is stable, which is why Java uses a merge sort variant for objects and why Python's sort is stable by specification.",
        ],
      },
      {
        heading: "The merge, and where stability lives",
        body: [
          "Merging two sorted arrays is a two-pointer walk: compare the fronts, take the smaller, advance that pointer. When one side is exhausted, copy the remainder of the other. Every element is examined once, so the merge is O(n) for the combined length.",
          "Stability is decided by a single character. When the two fronts are equal, take from the left half. Writing the comparison as less-than-or-equal does that; writing it as strictly-less takes from the right and silently breaks stability.",
          "It is worth knowing that this is where stability comes from, because interviewers ask, and because the fix is invisible unless you know to look for it. Nothing else about the algorithm changes.",
        ],
        trace: `merging [2, 4] and [2, 3]

  <=  takes the LEFT 2 first
      → 2ᴸ, 2ᴿ, 3, 4        stable ✓

  <   takes the RIGHT 2 first
      → 2ᴿ, 2ᴸ, 3, 4        order swapped ✗

One character. On plain integers you would
never notice; on records sorted by a second
key, it silently corrupts the first ordering.`,
      },
      {
        heading: "The O(n) cost that is not the time",
        body: [
          "Merge sort needs a buffer to merge into, because you cannot merge two halves of an array into that same array in place without overwriting values you still need. That buffer is O(n), which is the algorithm's real drawback against quicksort's O(log n) stack.",
          "The efficient pattern is to allocate one buffer once, outside the recursion, and pass it down. Allocating inside each recursive call adds an allocation per level per subarray, which is a large constant factor for no benefit.",
          "Slicing has the same problem in a subtler form. Writing the recursion over copied sub-arrays — the natural Python or JavaScript style — allocates at every level. Passing indices into the original array avoids it entirely, and is worth doing once you know the algorithm works.",
          "In-place merge sort exists but the merge becomes O(n log n) on its own, making the whole thing O(n log² n). It is almost never the right trade.",
        ],
        aside:
          "Allocate the buffer once, before the first recursive call. Allocating inside the recursion is the most common performance mistake in merge sort implementations, and it does not change the asymptotic bound so profiling is the only way to notice.",
      },
      {
        heading: "Counting inversions and its relatives",
        body: [
          "The merge step can compute things for free, and this is where merge sort earns its place beyond sorting.",
          "When you take an element from the right half, every element still unconsumed in the left half is larger than it and appeared earlier in the original array. Each of those is an inversion, and you can count them all at once by adding the number of remaining left-half elements. One extra line turns merge sort into an inversion counter.",
          "The same hook solves Count of Smaller Numbers After Self and Reverse Pairs, with a slightly different comparison during the merge. The transferable recognition is that any question about pairs where one element is on the left and the other on the right, satisfying some ordering condition, is a merge sort problem.",
        ],
      },
      {
        heading: "Where it is the right choice",
        body: [
          "Sorting linked lists. Merge sort is the natural fit because merging two sorted lists needs only pointer manipulation and no random access, and it can be done with O(1) extra space since you are relinking rather than copying. Quicksort on a linked list is awkward because partitioning wants indices.",
          "External sorting, where the data does not fit in memory. Merge sort reads sequentially, which is what disks and network streams are good at, so you sort chunks that fit and merge them in passes. This is what sorting a terabyte file actually looks like.",
          "Anywhere stability is required, or where a worst-case guarantee matters more than the average constant factor — real-time systems, or code where an adversary controls the input.",
          "For general in-memory sorting of primitives, quicksort usually wins on constant factor and cache behaviour, which is why most standard libraries use an introsort hybrid rather than plain merge sort.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Merge sort over INDICES with ONE buffer allocated outside the
// recursion. Allocating inside each call is the usual performance bug.
void mergeSortImpl(vector<int>& a, vector<int>& buffer, int lo, int hi) {
    if (hi - lo < 2) return;                   // one element is sorted
    int mid = lo + (hi - lo) / 2;

    mergeSortImpl(a, buffer, lo, mid);
    mergeSortImpl(a, buffer, mid, hi);

    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi)
        buffer[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];   // <= keeps it STABLE;
    while (i < mid) buffer[k++] = a[i++];                 // < would take from
    while (j < hi)  buffer[k++] = a[j++];                 // the right first
    copy(buffer.begin() + lo, buffer.begin() + hi, a.begin() + lo);
}

void mergeSort(vector<int>& a) {
    vector<int> buffer(a.size());              // allocated ONCE
    mergeSortImpl(a, buffer, 0, (int)a.size());
}

// COUNTING INVERSIONS - one extra line in the merge. Taking from the
// right means every unconsumed left element is an inversion with it.
long long countInversions(vector<int>& a, vector<int>& buffer, int lo, int hi) {
    if (hi - lo < 2) return 0;
    int mid = lo + (hi - lo) / 2;
    long long count = countInversions(a, buffer, lo, mid)
                    + countInversions(a, buffer, mid, hi);

    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        if (a[i] <= a[j]) buffer[k++] = a[i++];
        else {
            count += mid - i;                  // <-- all of them at once
            buffer[k++] = a[j++];
        }
    }
    while (i < mid) buffer[k++] = a[i++];
    while (j < hi)  buffer[k++] = a[j++];
    copy(buffer.begin() + lo, buffer.begin() + hi, a.begin() + lo);
    return count;
}

// SORTING A LINKED LIST - merge sort's natural home. No random access
// needed, and O(1) extra space because we relink rather than copy.
struct ListNode {
    int val;
    ListNode* next = nullptr;
    explicit ListNode(int v) : val(v) {}
};

ListNode* mergeLists(ListNode* a, ListNode* b) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (a && b) {
        if (a->val <= b->val) { tail->next = a; a = a->next; }
        else                  { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = a ? a : b;
    return dummy.next;
}

ListNode* sortList(ListNode* head) {
    if (!head || !head->next) return head;

    // Split at the midpoint with fast/slow, keeping the node BEFORE the
    // middle so the halves can be severed.
    ListNode *slow = head, *fast = head->next;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    ListNode* second = slow->next;
    slow->next = nullptr;                      // sever, or this never ends

    return mergeLists(sortList(head), sortList(second));
}

// BOTTOM-UP merge sort - no recursion, so no stack depth. Merge runs of
// width 1, then 2, then 4, and so on.
void mergeSortIterative(vector<int>& a) {
    int n = (int)a.size();
    vector<int> buffer(n);

    for (int width = 1; width < n; width *= 2) {
        for (int lo = 0; lo < n; lo += 2 * width) {
            int mid = min(lo + width, n), hi = min(lo + 2 * width, n);
            int i = lo, j = mid, k = lo;
            while (i < mid && j < hi) buffer[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
            while (i < mid) buffer[k++] = a[i++];
            while (j < hi)  buffer[k++] = a[j++];
        }
        a.swap(buffer);
    }
}`,
  },

  "array-sorting-quicksort": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Lomuto partition sweeping a store index forward, and the effect of a bad pivot on already sorted input">
  <text x="0" y="14" class="dg-title">Partition around pivot 4 &#8212; everything smaller moves left of the store index</text>

  <g transform="translate(30,34)">
    <text x="-24" y="18" class="dg-label">start</text>
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="26"  y="18" text-anchor="middle">7</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="82"  y="18" text-anchor="middle">2</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="138" y="18" text-anchor="middle">9</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="194" y="18" text-anchor="middle">1</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-mark"/><text x="250" y="18" text-anchor="middle">4</text>
    <text x="250" y="44" text-anchor="middle" class="dg-ptr">pivot</text>

    <text x="-24" y="88" class="dg-label">after</text>
    <rect x="0"   y="70" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="26"  y="88" text-anchor="middle">2</text>
    <rect x="56"  y="70" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="82"  y="88" text-anchor="middle">1</text>
    <rect x="112" y="70" width="52" height="26" rx="3" class="dg-cell-mark"/><text x="138" y="88" text-anchor="middle">4</text>
    <rect x="168" y="70" width="52" height="26" rx="3" class="dg-cell-live"/><text x="194" y="88" text-anchor="middle">9</text>
    <rect x="224" y="70" width="52" height="26" rx="3" class="dg-cell-live"/><text x="250" y="88" text-anchor="middle">7</text>
    <text x="138" y="114" text-anchor="middle" class="dg-good">final position</text>

    <text x="310" y="88" class="dg-note">the pivot never moves again &#8212; recurse</text>
    <text x="310" y="108" class="dg-note">on each side, no merge step needed</text>
  </g>

  <line x1="0" y1="176" x2="700" y2="176" class="dg-guide"/>
  <text x="0" y="200" class="dg-title">Why the pivot must be randomised</text>

  <g transform="translate(0,214)">
    <rect x="0" y="0" width="330" height="94" rx="4" class="dg-cell-out"/>
    <text x="14" y="24" class="dg-bad">last element as pivot, sorted input</text>
    <text x="14" y="48" class="dg-note">every partition splits n into n&#8722;1 and 0</text>
    <text x="14" y="70" class="dg-note">depth n, work n each &#8594; O(n&#178;)</text>
    <text x="14" y="88" class="dg-label">and O(n) stack, which overflows</text>

    <rect x="360" y="0" width="330" height="94" rx="4" class="dg-cell-hit"/>
    <text x="374" y="24" class="dg-good">random pivot</text>
    <text x="374" y="48" class="dg-note">a bad split becomes vanishingly unlikely</text>
    <text x="374" y="70" class="dg-note">no input can be crafted to trigger it</text>
    <text x="374" y="88" class="dg-label">one line, and it removes the whole problem</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "Partition first, no merge afterwards",
        body: [
          "Quicksort inverts merge sort's structure. Merge sort splits trivially and does its work combining; quicksort does its work splitting and combines trivially — once both sides are sorted, the array is sorted, because everything on the left is already smaller than everything on the right.",
          "Partitioning picks a pivot and rearranges the array so that smaller elements come before it and larger ones after. After that the pivot is in its final position and never moves again, which is a genuinely useful invariant: after k partitions, at least k elements are permanently placed.",
          "The recursion then handles each side independently. There is no buffer and no merge, which is why quicksort uses O(log n) space against merge sort's O(n) and is usually faster in practice on arrays despite the same asymptotic bound.",
        ],
      },
      {
        heading: "Lomuto and Hoare",
        body: [
          "Two partition schemes, and it is worth knowing both exist even if you only write one.",
          "Lomuto keeps a store index and sweeps forward: anything smaller than the pivot is swapped to the store index, which then advances. At the end the pivot swaps into the store position. It is easier to write and to reason about, and it is what most textbooks show.",
          "Hoare uses two pointers converging from both ends, swapping out-of-place pairs. It performs about three times fewer swaps on average, which matters in tight code, but the boundary conditions are fiddlier and the pivot does not end up in its final position — so the recursive calls have different bounds than the Lomuto version. Mixing up the two conventions is a classic source of infinite recursion.",
        ],
        trace: `Lomuto, pivot 4 at the end

  [7, 2, 9, 1 | 4]     store = 0

  7 >= 4  skip                store = 0
  2 <  4  swap into 0         [2, 7, 9, 1 | 4]  store = 1
  9 >= 4  skip                store = 1
  1 <  4  swap into 1         [2, 1, 9, 7 | 4]  store = 2

  swap pivot into store       [2, 1, 4, 7, 9]
                                      ↑ final position`,
      },
      {
        heading: "The pivot choice is the whole algorithm",
        body: [
          "Quicksort is O(n log n) on average and O(n²) in the worst case, and which one you get depends entirely on the pivot.",
          "Taking the last element as pivot is the simplest choice and the most dangerous. On already-sorted input every partition splits n into n-1 and 0, giving depth n and quadratic time — and O(n) recursion depth, which overflows the stack on large inputs. Sorted or reverse-sorted data is extremely common in practice, so this is not a theoretical concern.",
          "Randomising the pivot fixes it in one line. The probability of repeatedly hitting bad pivots becomes vanishingly small, and crucially no adversary can construct an input to trigger it, since the behaviour depends on your random source rather than the data. Median-of-three — the median of the first, middle and last elements — is a cheaper deterministic alternative that handles the common sorted case, though it can still be defeated by crafted input.",
        ],
        aside:
          "Recurse into the smaller side and loop on the larger. That caps the recursion depth at O(log n) even when the partitioning is unbalanced, which converts a stack overflow into merely slow behaviour.",
      },
      {
        heading: "Duplicates and three-way partitioning",
        body: [
          "An array with many equal elements is the other bad case for naive quicksort. If everything equals the pivot, a two-way partition still splits n into n-1 and 0, because every element goes to the same side. Sorting an array of a million identical values becomes quadratic.",
          "Three-way partitioning fixes this by producing three regions: less than, equal to, and greater than the pivot. The equal region is already in final position, so only the outer two are recursed into. An array of identical values is then sorted in a single partition pass.",
          "This is the Dutch National Flag algorithm, and it is worth recognising under both names — Sort Colors is exactly one three-way partition. It is also what makes quicksort viable as a general-purpose sort, which is why library implementations use it.",
        ],
      },
      {
        heading: "Quickselect, and what libraries actually do",
        body: [
          "Quickselect drops one of the two recursive calls. To find the k-th smallest element, partition once, see which side k falls in, and recurse only there. The recurrence becomes n + n/2 + n/4 + ... which sums to 2n, giving O(n) average — better than sorting and then indexing.",
          "Standard library sorts are hybrids rather than pure quicksort. C++'s std::sort is typically introsort: quicksort until the recursion depth exceeds a threshold, then switch to heap sort to guarantee O(n log n), with insertion sort for small subarrays where its low constant factor wins. Python and Java use Timsort for objects, a stable merge sort variant that exploits existing runs.",
          "Two consequences worth knowing. C++'s std::sort is not stable — use std::stable_sort when order among equals matters. And std::nth_element is quickselect, so reach for it rather than sorting when you only need the k-th element or a partition around it.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// LOMUTO partition. Sweep a store index forward; the pivot lands in its
// FINAL position and never moves again.
int partitionLomuto(vector<int>& a, int lo, int hi) {
    static mt19937 rng(random_device{}());
    int pivotIndex = lo + (int)(rng() % (hi - lo + 1));   // RANDOMISE:
    swap(a[pivotIndex], a[hi]);        // a fixed pivot degrades to O(n^2)
                                       // on sorted input, which is common
    int pivot = a[hi], store = lo;
    for (int i = lo; i < hi; ++i)
        if (a[i] < pivot) swap(a[i], a[store++]);
    swap(a[store], a[hi]);
    return store;
}

// Recurse into the SMALLER side, loop on the larger. That caps the
// stack at O(log n) even when partitioning is unbalanced.
void quicksort(vector<int>& a, int lo, int hi) {
    while (lo < hi) {
        int p = partitionLomuto(a, lo, hi);
        if (p - lo < hi - p) {
            quicksort(a, lo, p - 1);
            lo = p + 1;                // loop on the bigger half
        } else {
            quicksort(a, p + 1, hi);
            hi = p - 1;
        }
    }
}

// THREE-WAY (Dutch National Flag). With many duplicates, a two-way
// partition still splits n into n-1 and 0 - an array of identical
// values goes quadratic. Three regions fix that in one pass.
void quicksort3Way(vector<int>& a, int lo, int hi) {
    if (lo >= hi) return;
    static mt19937 rng(random_device{}());
    int pivot = a[lo + (int)(rng() % (hi - lo + 1))];

    int less = lo, i = lo, greater = hi;
    while (i <= greater) {
        if      (a[i] < pivot) swap(a[i++], a[less++]);
        else if (a[i] > pivot) swap(a[i], a[greater--]);   // don't advance i:
        else                   ++i;                         // the swapped-in
    }                                                       // value is unseen

    quicksort3Way(a, lo, less - 1);        // the EQUAL band is already final
    quicksort3Way(a, greater + 1, hi);
}

// Sort Colors is exactly one three-way partition.
void sortColors(vector<int>& nums) {
    int low = 0, i = 0, high = (int)nums.size() - 1;
    while (i <= high) {
        if      (nums[i] == 0) swap(nums[i++], nums[low++]);
        else if (nums[i] == 2) swap(nums[i], nums[high--]);
        else                   ++i;
    }
}

// QUICKSELECT - drop one recursive call. n + n/2 + n/4 ... = 2n, so
// O(n) average, beating sort-then-index.
int quickselect(vector<int>& a, int k) {       // k is 0-indexed
    int lo = 0, hi = (int)a.size() - 1;
    while (lo <= hi) {
        int p = partitionLomuto(a, lo, hi);
        if (p == k) return a[p];
        if (p < k) lo = p + 1;                 // answer is to the right
        else       hi = p - 1;
    }
    return -1;
}

// What the library gives you, and the two things to remember:
// std::sort is NOT stable, and nth_element IS quickselect.
void libraryNotes(vector<int>& a, int k) {
    sort(a.begin(), a.end());                  // introsort, not stable
    stable_sort(a.begin(), a.end());           // merge-based, stable

    nth_element(a.begin(), a.begin() + k, a.end());   // O(n) average
    // a[k] now holds the k-th smallest; everything before it is smaller
    // and everything after is larger, but neither side is sorted.
}`,
  },

  "trees-bst": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A balanced binary search tree next to a degenerate one, showing how sorted insertion destroys the logarithmic depth">
  <text x="0" y="14" class="dg-title">The BST property: everything left is smaller, everything right is larger</text>

  <g transform="translate(20,34)">
    <line x1="140" y1="40" x2="80"  y2="76"  class="dg-link"/>
    <line x1="140" y1="40" x2="200" y2="76"  class="dg-link"/>
    <line x1="80"  y1="116" x2="45"  y2="152" class="dg-link"/>
    <line x1="80"  y1="116" x2="115" y2="152" class="dg-link"/>
    <line x1="200" y1="116" x2="235" y2="152" class="dg-link"/>

    <circle cx="140" cy="20"  r="19" class="dg-cell-mark"/><text x="140" y="25" text-anchor="middle">8</text>
    <circle cx="80"  cy="96"  r="19" class="dg-cell"/><text x="80"  y="101" text-anchor="middle">3</text>
    <circle cx="200" cy="96"  r="19" class="dg-cell"/><text x="200" y="101" text-anchor="middle">12</text>
    <circle cx="45"  cy="172" r="19" class="dg-cell"/><text x="45"  y="177" text-anchor="middle">1</text>
    <circle cx="115" cy="172" r="19" class="dg-cell"/><text x="115" y="177" text-anchor="middle">6</text>
    <circle cx="235" cy="172" r="19" class="dg-cell"/><text x="235" y="177" text-anchor="middle">15</text>

    <text x="0" y="215" class="dg-good">balanced &#8212; depth 3, search is O(log n)</text>
    <text x="0" y="237" class="dg-label">inorder walk: 1, 3, 6, 8, 12, 15 &#8212; sorted</text>
  </g>

  <g transform="translate(400,34)">
    <line x1="40"  y1="38" x2="70"  y2="58"  class="dg-link-cut"/>
    <line x1="90"  y1="76" x2="120" y2="96"  class="dg-link-cut"/>
    <line x1="140" y1="114" x2="170" y2="134" class="dg-link-cut"/>
    <line x1="190" y1="152" x2="220" y2="172" class="dg-link-cut"/>

    <circle cx="30"  cy="20"  r="19" class="dg-cell-out"/><text x="30"  y="25" text-anchor="middle">1</text>
    <circle cx="80"  cy="68"  r="19" class="dg-cell-out"/><text x="80"  y="73" text-anchor="middle">3</text>
    <circle cx="130" cy="106" r="19" class="dg-cell-out"/><text x="130" y="111" text-anchor="middle">6</text>
    <circle cx="180" cy="144" r="19" class="dg-cell-out"/><text x="180" y="149" text-anchor="middle">8</text>
    <circle cx="230" cy="182" r="19" class="dg-cell-out"/><text x="230" y="187" text-anchor="middle">12</text>

    <text x="0" y="215" class="dg-bad">inserted in sorted order &#8212; depth n</text>
    <text x="0" y="237" class="dg-label">every search is O(n): a linked list with extra pointers</text>
  </g>

  <line x1="0" y1="286" x2="700" y2="286" class="dg-guide"/>
  <text x="0" y="310" class="dg-note">A plain BST has no mechanism to prevent the right-hand case. Self-balancing variants rotate to stop it.</text>
</svg>`,
    walkthrough: [
      {
        heading: "The invariant, stated precisely",
        body: [
          "For every node, all values in its left subtree are smaller and all values in its right subtree are larger. Note the word 'all' — this is a property of entire subtrees, not just of the immediate children.",
          "That distinction is the most common source of wrong answers to Validate BST. Checking only that each node is larger than its left child and smaller than its right child accepts trees that are not BSTs: a node deep in a left subtree can exceed an ancestor while still being correctly ordered relative to its own parent.",
          "The correct validation carries a range down the recursion. The root may be anything; its left child is bounded above by the root's value; that child's right child is bounded below by itself and above by the root. Each step narrows the interval, and a node outside its interval fails.",
        ],
        trace: `Why child-only checking fails

        10
       /  \\
      5    15
          /  \\
         6    20     ← 6 < 15, so the local
                       check passes

  But 6 is in 10's RIGHT subtree and 6 < 10,
  so the tree is not a BST.

  Range checking catches it:
    15 arrives with the interval (10, ∞)
    6 arrives with the interval (10, 15)
    6 <= 10  →  fail  ✓`,
      },
      {
        heading: "Search, insert, and the shape problem",
        body: [
          "Searching compares against the current node and moves left or right, discarding half the remaining tree at each step — binary search over a pointer structure. Insertion follows the same descent and attaches a new leaf where the search would have failed.",
          "Both are O(h), where h is the height. On a balanced tree that is O(log n), which is the whole selling point. But h is not guaranteed to be logarithmic, and a plain BST has no mechanism to keep it so.",
          "Insert sorted data and every new value goes to the same side, producing a chain of depth n. The structure degenerates into a linked list carrying an unused pointer per node, and every operation becomes O(n). Since sorted or nearly-sorted input is common in practice, this is a real failure mode rather than a curiosity.",
        ],
      },
      {
        heading: "Deletion, and the three cases",
        body: [
          "Deletion is the fiddly operation and splits into three cases that are worth being able to state.",
          "A leaf is simply removed. A node with one child is replaced by that child. A node with two children cannot be removed directly, because there is no single child to promote — so instead you find its in-order successor, the smallest value in its right subtree, copy that value into the node, and delete the successor from the right subtree.",
          "The successor is guaranteed to have at most one child, since being the smallest in its subtree means it has no left child. So the recursive deletion terminates in one of the two easy cases.",
          "The in-order predecessor — the largest in the left subtree — works equally well. Which one you choose does not affect correctness, though alternating between them keeps the tree marginally more balanced over many deletions.",
        ],
        aside:
          "The two-child case does not delete the node you were asked to delete — it overwrites its value and deletes a different node. That is correct, and worth saying out loud, because it looks wrong until you see that the tree's contents are what matters, not which physical node holds them.",
      },
      {
        heading: "In-order traversal is the connecting idea",
        body: [
          "An in-order walk of a BST yields the values in sorted order. That single fact answers a large fraction of BST questions, and recognising it saves deriving each one.",
          "Validate BST: check that the in-order sequence is strictly increasing. Kth Smallest Element: walk in order and stop at the kth. Convert to a sorted list, find the in-order successor of a node, recover a BST where two nodes were swapped — all in-order walks with a small amount of extra state.",
          "The version that scales is to keep only the previous value seen rather than materialising the whole sequence, which makes these O(1) extra space beyond the traversal stack. And using the iterative in-order walk lets you stop early, which matters for kth-smallest where you do not want to visit the remaining nodes.",
        ],
      },
      {
        heading: "Balancing, and what to use instead",
        body: [
          "Self-balancing variants add rotations that restore height after insertion and deletion. AVL trees keep the height difference between siblings at most one, giving tighter balance and faster lookups. Red-black trees allow more slack, giving faster modification, which is why they back C++'s std::map and Java's TreeMap.",
          "You will almost never implement one. What you should be able to say is that a plain BST is O(n) worst case, that self-balancing variants make it O(log n) guaranteed, and that the standard library containers are red-black trees — which is exactly the ordered map covered in the hash tables category.",
          "The practical decision: if you need ordering, range queries or nearest-value lookups, use the library's ordered map. If you only need membership or key lookup, use a hash map, which is O(1) average against the tree's O(log n). Building a BST by hand is an exercise, not a production choice.",
        ],
      },
      {
        heading: "Building from sorted input",
        body: [
          "One useful construction worth knowing: given a sorted array, build a height-balanced BST by taking the middle element as the root and recursing on each half. That is O(n) and produces the minimum possible height.",
          "It is the direct answer to Convert Sorted Array to Binary Search Tree, and the same idea applies to a sorted linked list — though there you either convert to an array first or use the in-order construction trick that builds the tree while walking the list once.",
          "This construction is also the reason the degenerate case is so instructive: inserting the same sorted data one element at a time gives depth n, while consuming it all at once and choosing midpoints gives depth log n. The difference is entirely in whether you can see the whole input before committing to a shape.",
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

// SEARCH - binary search over pointers. O(h), which is O(log n) only
// while the tree stays balanced.
TreeNode* search(TreeNode* node, int target) {
    while (node && node->val != target)
        node = target < node->val ? node->left : node->right;
    return node;
}

TreeNode* insert(TreeNode* node, int value) {
    if (!node) return new TreeNode(value);
    if (value < node->val)      node->left  = insert(node->left,  value);
    else if (value > node->val) node->right = insert(node->right, value);
    return node;                          // equal: ignore, or count duplicates
}

// VALIDATE. The property is about whole SUBTREES, not just children -
// checking node against its immediate children accepts non-BSTs.
// Carry a narrowing range down instead.
bool isValidBST(TreeNode* node, long long lo = LLONG_MIN,
                                long long hi = LLONG_MAX) {
    if (!node) return true;
    if (node->val <= lo || node->val >= hi) return false;
    return isValidBST(node->left,  lo, node->val)     // upper bound narrows
        && isValidBST(node->right, node->val, hi);    // lower bound narrows
}

// DELETE - three cases. The two-child case overwrites this node's value
// with its in-order successor and deletes THAT node instead, which is
// correct because the tree's contents are what matter.
TreeNode* deleteNode(TreeNode* node, int target) {
    if (!node) return nullptr;

    if (target < node->val)      node->left  = deleteNode(node->left,  target);
    else if (target > node->val) node->right = deleteNode(node->right, target);
    else {
        if (!node->left)  { TreeNode* r = node->right; delete node; return r; }
        if (!node->right) { TreeNode* l = node->left;  delete node; return l; }

        TreeNode* successor = node->right;        // smallest on the right
        while (successor->left) successor = successor->left;
        node->val = successor->val;               // copy the value up
        node->right = deleteNode(node->right, successor->val);
    }                                             // successor has no left
    return node;                                  // child, so this recursion
}                                                 // hits an easy case

// IN-ORDER is sorted order - the fact most BST problems reduce to.
// Keeping only the previous value avoids materialising the sequence.
bool isValidByInorder(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* node = root;
    long long previous = LLONG_MIN;

    while (node || !st.empty()) {
        while (node) { st.push(node); node = node->left; }
        node = st.top(); st.pop();
        if (node->val <= previous) return false;  // must strictly increase
        previous = node->val;
        node = node->right;
    }
    return true;
}

// Kth smallest - the same walk, stopping early. That early exit is why
// the iterative form is preferable here.
int kthSmallest(TreeNode* root, int k) {
    stack<TreeNode*> st;
    TreeNode* node = root;

    while (node || !st.empty()) {
        while (node) { st.push(node); node = node->left; }
        node = st.top(); st.pop();
        if (--k == 0) return node->val;           // stop, don't finish the walk
        node = node->right;
    }
    return -1;
}

// BUILD BALANCED from sorted input - midpoint as root, recurse on the
// halves. O(n), and gives the minimum possible height. Inserting the
// same data one at a time would give depth n instead.
TreeNode* buildBalanced(const vector<int>& sorted, int lo, int hi) {
    if (lo > hi) return nullptr;
    int mid = lo + (hi - lo) / 2;
    TreeNode* node = new TreeNode(sorted[mid]);
    node->left  = buildBalanced(sorted, lo, mid - 1);
    node->right = buildBalanced(sorted, mid + 1, hi);
    return node;
}

// LOWEST COMMON ANCESTOR is easier on a BST than in general: descend
// while both targets are on the same side; the first node that splits
// them is the LCA.
TreeNode* lca(TreeNode* node, int a, int b) {
    while (node) {
        if (a < node->val && b < node->val)      node = node->left;
        else if (a > node->val && b > node->val) node = node->right;
        else return node;                         // they diverge here
    }
    return nullptr;
}`,
  },

  "heaps-top-k": {
    walkthrough: [
      {
        heading: "Why not just sort",
        body: [
          "Finding the k largest elements can always be done by sorting and taking a slice, at O(n log n). The top-k pattern does it in O(n log k), which is a real improvement when k is much smaller than n — finding the 10 most frequent words in a million-word document, for instance.",
          "The idea is to never hold more than k candidates. Maintain a heap of size k; when it grows past k, evict the weakest. Each insertion costs O(log k) rather than O(log n), and you do n of them.",
          "The saving is genuine but bounded. When k approaches n, log k approaches log n and sorting is simpler. The rule of thumb: if k is a small constant or a small fraction, use a heap; if k is comparable to n, sort.",
        ],
      },
      {
        heading: "The inversion that catches everyone",
        body: [
          "To find the k largest elements, use a min-heap. To find the k smallest, use a max-heap. This feels backwards and is worth reasoning through rather than memorising.",
          "The heap holds your current best k candidates. When a new element arrives and the heap is full, you must discard the weakest candidate — and for 'k largest', the weakest is the smallest. A min-heap keeps the smallest at the root, where it can be evicted in O(log k).",
          "A max-heap would keep the largest at the root, which is the one you most want to keep and cannot cheaply reach past. So the heap's ordering is chosen by what you need to throw away, not by what you are looking for.",
          "The comparison before eviction is the other half: if the incoming element is worse than the root, it cannot belong in the top k at all, so skip it without touching the heap.",
        ],
        trace: `k = 3 largest from [5, 1, 9, 3, 7]

  min-heap, root is the WEAKEST kept

  5   → [5]
  1   → [1, 5]
  9   → [1, 5, 9]
  3   → [1, 3, 5, 9] → pop 1 → [3, 5, 9]
  7   → [3, 5, 7, 9] → pop 3 → [5, 7, 9]

  answer {5, 7, 9}, heap never held
  more than 4 elements.`,
      },
      {
        heading: "Top-k frequent, and the counting step",
        body: [
          "The most common variant asks for the k most frequent elements, which is two phases. Count occurrences with a hash map, then run top-k over the map's entries by count.",
          "That is O(n) for counting plus O(m log k) for the selection, where m is the number of distinct values. The heap holds pairs of count and value, ordered by count.",
          "There is a linear-time alternative worth knowing: bucket sort by frequency. Since no frequency can exceed n, create n+1 buckets and place each value in the bucket matching its count, then walk the buckets from the top collecting until you have k. That is O(n) overall and beats the heap, at the cost of O(n) extra space. It is the answer if the interviewer asks whether you can do better than O(n log k).",
        ],
      },
      {
        heading: "Quickselect, and when it wins",
        body: [
          "The third approach is quickselect: partition around a random pivot, and recurse only into the side containing the k-th position. That gives O(n) average time — better than both the heap and sorting.",
          "The catches are real though. It is O(n²) in the worst case without careful pivot randomisation. It requires all the data up front, since it reorders the array in place. And it does not return the top k in sorted order, only as an unordered block.",
          "The heap has the opposite profile: worse asymptotics, but it processes a stream one element at a time and never holds more than k. For an infinite stream or a dataset too large for memory, quickselect is not available at all.",
          "So the decision is about the access pattern, not just the complexity. Streaming or memory-constrained: heap. Everything in memory and you want the fastest: quickselect. Need it sorted: sort, or sort the heap's contents at the end.",
        ],
        aside:
          "Kth Largest Element in a Stream is the giveaway that a heap is required: the data arrives over time, so quickselect and sorting are both unavailable, and the k-sized heap is the only approach that fits.",
      },
      {
        heading: "Custom orderings",
        body: [
          "Many top-k problems rank by something other than the raw value — distance from the origin, frequency, a computed score. The heap needs a comparator that reflects that.",
          "In C++ the comparator's logic is inverted relative to intuition: a comparator returning true means the first argument has *lower* priority, so returning greater-than produces a min-heap. This trips people up constantly and is worth double-checking against a small example rather than reasoning about.",
          "Python's heapq is min-only with no comparator parameter, so the idiom is to push tuples whose first element is the negated sort key. It also compares tuples element by element, so if two entries tie on the key it will compare the next element — and if that is an object with no defined ordering, it raises. Inserting a unique counter as a tie-breaker is the standard fix.",
        ],
      },
      {
        heading: "The related patterns",
        body: [
          "Merge k sorted lists: put the head of each list in a heap and repeatedly take the smallest, pushing that list's next element. O(n log k) for n total elements — the heap holds one candidate per list.",
          "K closest points to the origin: top-k with a distance comparator. Compare squared distances rather than taking square roots, which avoids floating point entirely and is faster.",
          "Task scheduler and reorganise string: repeatedly take the most frequent remaining item, which is a max-heap driving a greedy choice rather than a top-k selection.",
          "Sliding window maximum looks like it should use a heap and does not — removing the element that just expired is O(n) in a heap without extra bookkeeping. That is a monotonic deque problem, and knowing why the heap fails there is as useful as knowing where it succeeds.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// K LARGEST with a MIN-heap. The heap's ordering is chosen by what you
// need to EVICT: for "k largest", the weakest candidate is the smallest,
// so it must sit at the root where popping is O(log k).
vector<int> kLargest(const vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> heap;   // min-heap
    for (int x : nums) {
        heap.push(x);
        if ((int)heap.size() > k) heap.pop();   // drop the weakest kept
    }
    vector<int> out;
    while (!heap.empty()) { out.push_back(heap.top()); heap.pop(); }
    return out;                                 // ascending; reverse if needed
}

// TOP K FREQUENT - count, then select. O(n) + O(m log k).
vector<int> topKFrequent(const vector<int>& nums, int k) {
    unordered_map<int,int> count;
    for (int x : nums) ++count[x];

    using Entry = pair<int,int>;                // {frequency, value}
    priority_queue<Entry, vector<Entry>, greater<Entry>> heap;
    for (auto [value, freq] : count) {
        heap.push({freq, value});
        if ((int)heap.size() > k) heap.pop();
    }

    vector<int> out;
    while (!heap.empty()) { out.push_back(heap.top().second); heap.pop(); }
    return out;
}

// BUCKET SORT alternative - O(n), beating the heap. No frequency can
// exceed n, so index buckets by count and walk down from the top.
vector<int> topKFrequentLinear(const vector<int>& nums, int k) {
    unordered_map<int,int> count;
    for (int x : nums) ++count[x];

    vector<vector<int>> buckets(nums.size() + 1);
    for (auto [value, freq] : count) buckets[freq].push_back(value);

    vector<int> out;
    for (int freq = (int)buckets.size() - 1; freq >= 1 && (int)out.size() < k; --freq)
        for (int value : buckets[freq]) {
            out.push_back(value);
            if ((int)out.size() == k) break;
        }
    return out;
}

// QUICKSELECT - O(n) average, but needs all the data in memory and
// returns the top k unordered. Unavailable for a stream.
int kthLargest(vector<int> nums, int k) {
    int target = (int)nums.size() - k;          // k-th largest = this index
    nth_element(nums.begin(), nums.begin() + target, nums.end());
    return nums[target];                        // library quickselect
}

// K CLOSEST POINTS - a custom comparator. In C++ the comparator returns
// true when the FIRST argument has LOWER priority, so ">" gives a
// min-heap. Worth checking against an example rather than reasoning.
vector<pair<int,int>> kClosest(vector<pair<int,int>> points, int k) {
    auto farther = [](const pair<int,int>& a, const pair<int,int>& b) {
        long long da = 1LL*a.first*a.first + 1LL*a.second*a.second;
        long long db = 1LL*b.first*b.first + 1LL*b.second*b.second;
        return da < db;              // "less far" = lower priority -> MAX-heap
    };                               // on distance, so we evict the farthest

    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(farther)>
        heap(farther);

    for (const auto& p : points) {
        heap.push(p);
        if ((int)heap.size() > k) heap.pop();   // drop the farthest
    }
    vector<pair<int,int>> out;
    while (!heap.empty()) { out.push_back(heap.top()); heap.pop(); }
    return out;
}                                    // squared distances: no sqrt, no floats

// MERGE K SORTED LISTS - the heap holds one candidate per list.
// O(n log k) for n total elements.
vector<int> mergeKSorted(const vector<vector<int>>& lists) {
    using Entry = tuple<int,int,int>;           // {value, list, position}
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
}

// STREAMING - the case where only the heap works, because the data
// arrives over time and quickselect needs it all at once.
class KthLargestStream {
    priority_queue<int, vector<int>, greater<int>> heap;
    int k;
public:
    KthLargestStream(int size, const vector<int>& initial) : k(size) {
        for (int x : initial) add(x);
    }
    int add(int value) {
        heap.push(value);
        if ((int)heap.size() > k) heap.pop();
        return heap.top();                      // the k-th largest so far
    }
};`,
  },

  "graphs-cycle-detection": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A back edge to a node still on the recursion stack signalling a cycle, contrasted with a cross edge to a finished node">
  <text x="0" y="14" class="dg-title">Directed: a cycle exists exactly when DFS finds a BACK edge</text>

  <g transform="translate(30,36)">
    <line x1="30"  y1="42" x2="30"  y2="76"  class="dg-link"/>
    <line x1="44"  y1="96" x2="86"  y2="96"  class="dg-link"/>
    <line x1="96"  y1="80" x2="46"  y2="42"  class="dg-link-cut"/>

    <circle cx="30"  cy="22"  r="19" class="dg-cell-mark"/><text x="30"  y="27" text-anchor="middle">A</text>
    <circle cx="30"  cy="96"  r="19" class="dg-cell-mark"/><text x="30"  y="101" text-anchor="middle">B</text>
    <circle cx="105" cy="96"  r="19" class="dg-cell-mark"/><text x="105" y="101" text-anchor="middle">C</text>

    <text x="118" y="52" class="dg-bad">back edge</text>
    <text x="0" y="150" class="dg-note">A, B, C are all GREY &#8212; still on the stack</text>
    <text x="0" y="172" class="dg-bad">C &#8594; A closes a cycle</text>
  </g>

  <g transform="translate(310,36)">
    <line x1="30"  y1="42" x2="30"  y2="76"  class="dg-link"/>
    <line x1="120" y1="42" x2="48"  y2="86"  class="dg-link"/>

    <circle cx="30"  cy="22"  r="19" class="dg-cell-idle"/><text x="30"  y="27" text-anchor="middle" class="dg-index">A</text>
    <circle cx="30"  cy="96"  r="19" class="dg-cell-idle"/><text x="30"  y="101" text-anchor="middle" class="dg-index">B</text>
    <circle cx="135" cy="22"  r="19" class="dg-cell-mark"/><text x="135" y="27" text-anchor="middle">D</text>

    <text x="60" y="52" class="dg-good">cross edge</text>
    <text x="0" y="150" class="dg-note">A and B are BLACK &#8212; already finished</text>
    <text x="0" y="172" class="dg-good">D &#8594; B is not a cycle</text>
  </g>

  <line x1="0" y1="222" x2="700" y2="222" class="dg-guide"/>
  <text x="0" y="246" class="dg-bad">A boolean visited flag cannot tell these apart &#8212; both targets are "visited".</text>
  <text x="0" y="270" class="dg-note">Three states are required: WHITE undiscovered, GREY on the stack now, BLACK finished.</text>
  <text x="0" y="292" class="dg-note">Undirected graphs are simpler: any edge to a visited node is a cycle, except the one you arrived on.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Two different problems",
        body: [
          "Cycle detection in directed and undirected graphs are genuinely different problems with different solutions, and conflating them is the main source of trouble here.",
          "In a directed graph, a cycle means following edge directions returns you to where you started. In an undirected graph, every edge can be walked both ways, so the naive reading would make every edge a two-node cycle — which is why the definition excludes immediately retracing the edge you arrived on.",
          "The consequence is that the directed case needs to distinguish 'currently being explored' from 'finished', while the undirected case only needs to remember where it came from. Getting the wrong algorithm for the graph type produces confident wrong answers.",
        ],
      },
      {
        heading: "Directed: three colours, not a boolean",
        body: [
          "A directed graph contains a cycle exactly when DFS encounters a back edge — an edge to a node that is still on the current recursion stack. That node is an ancestor of the current one, so reaching it closes a loop.",
          "A boolean visited array cannot express this. It records that a node has been seen, but not whether the exploration of that node is still in progress or finished long ago. An edge to a finished node in a different branch is a cross edge and is perfectly legal in an acyclic graph.",
          "So three states are needed. White means undiscovered. Grey means discovery started but not finished — the node is on the stack right now. Black means fully explored. Reaching a grey node is a cycle; reaching a black one is not; reaching a white one means recursing into it.",
          "Marking grey on entry and black on exit is the whole implementation. The exit marking is what people forget, and omitting it makes every revisit look like a cycle.",
        ],
        trace: `Why two states is not enough

  A → B,  A → C,  B → D,  C → D

  DFS from A:
    A grey, B grey, D grey, D black,
    B black, C grey, then C → D

  With a BOOLEAN: D is "visited" → reports
  a cycle. Wrong — this is a DAG.

  With COLOURS: D is BLACK, not GREY →
  cross edge, no cycle. Correct.`,
      },
      {
        heading: "Undirected: carry the parent",
        body: [
          "In an undirected graph, any edge leading to an already-visited node closes a cycle — with one exception, the edge you just came in on, which merely leads back to your immediate parent.",
          "So the fix is to pass the parent down the recursion and skip it. Everything else that is already visited indicates a genuine cycle. A boolean visited array is sufficient here, because there is no cross-edge distinction to make.",
          "One trap: if the graph can contain multiple edges between the same pair of vertices, skipping by parent identity is wrong — the second edge back to the parent is a real cycle, and comparing node identities would discard it. Skip by edge index instead when parallel edges are possible.",
          "A self-loop is also a cycle in both graph types, and is easy to miss if your neighbour loop never considers the node itself.",
        ],
        aside:
          "In an undirected graph, checking a visited set without carrying the parent reports a cycle on every single edge. It is an immediate and total failure rather than a subtle one, which at least makes it easy to spot.",
      },
      {
        heading: "The alternatives to DFS",
        body: [
          "For directed graphs, Kahn's algorithm detects cycles as a side effect of topological sorting. Repeatedly remove nodes with in-degree zero; if fewer than V nodes come out, the remainder are locked in a cycle because each is waiting on another within it. This is often the better answer in an interview, since it needs no colour bookkeeping and gives you the ordering too.",
          "For undirected graphs, Union Find is the cleanest approach when edges arrive one at a time. Process each edge and attempt to union its endpoints; if they already share a root, this edge closes a cycle. That is effectively O(1) per edge and requires no traversal at all.",
          "Union Find also gives you the first edge that creates a cycle for free, which is exactly what Redundant Connection asks for. DFS would need extra work to identify which edge was responsible.",
        ],
      },
      {
        heading: "Recovering the cycle itself",
        body: [
          "Detecting existence is usually enough, but some problems want the cycle's nodes. With DFS, keep a parent array recording how each node was reached; when a back edge to a grey node is found, walk parents back from the current node until you reach that grey node, and reverse.",
          "The path must stop at the grey node rather than continuing to the root, since only the portion from the grey ancestor down to the current node forms the loop.",
          "For counting rather than listing — how many cycles, or the length of the shortest one — the techniques diverge. Shortest cycle in an unweighted graph is BFS from every vertex, at O(V·E). Counting all simple cycles is exponential in general, which is worth knowing so you can say that a problem asking for it must have small constraints.",
        ],
      },
      {
        heading: "Where it appears",
        body: [
          "Course Schedule is directed cycle detection with a friendlier name: a valid schedule exists exactly when the prerequisite graph is acyclic.",
          "Redundant Connection is undirected, and Union Find answers it directly. Its directed variant is harder and needs case analysis on whether a node has two parents, a cycle, or both.",
          "Deadlock detection in operating systems is cycle detection over a resource allocation graph. Build systems and package managers use it to reject circular dependencies. Spreadsheet engines use it to reject formulas that reference themselves.",
          "And the linked list case, covered separately with Floyd's tortoise and hare, is the same problem on a graph where every node has exactly one outgoing edge — which is why it admits a much cheaper O(1) space solution than the general case.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// DIRECTED - three colours. A boolean cannot distinguish "on the stack
// now" from "finished earlier", and only the former means a cycle.
enum Colour { WHITE, GREY, BLACK };

bool hasCycleDirected(int node, const vector<vector<int>>& adj,
                      vector<Colour>& colour) {
    colour[node] = GREY;                          // exploration STARTS
    for (int next : adj[node]) {
        if (colour[next] == GREY) return true;    // back edge - a cycle
        if (colour[next] == WHITE &&
            hasCycleDirected(next, adj, colour)) return true;
        // BLACK: finished in another branch - a cross edge, not a cycle
    }
    colour[node] = BLACK;                         // exploration ENDS -
    return false;                                 // forgetting this makes
}                                                 // every revisit look
                                                  // like a cycle
bool graphHasCycleDirected(int n, const vector<vector<int>>& adj) {
    vector<Colour> colour(n, WHITE);
    for (int v = 0; v < n; ++v)
        if (colour[v] == WHITE && hasCycleDirected(v, adj, colour)) return true;
    return false;
}

// UNDIRECTED - carry the parent. Without it, every single edge reports
// a cycle, since the neighbour you came from is already visited.
bool hasCycleUndirected(int node, int parent, const vector<vector<int>>& adj,
                        vector<bool>& seen) {
    seen[node] = true;
    for (int next : adj[node]) {
        if (next == parent) continue;             // the edge we arrived on
        if (seen[next]) return true;              // a genuine cycle
        if (hasCycleUndirected(next, node, adj, seen)) return true;
    }
    return false;
}

// With PARALLEL EDGES, skipping by parent identity is wrong - a second
// edge back to the parent IS a cycle. Skip by edge index instead.
bool hasCycleMultigraph(int node, int viaEdge,
                        const vector<vector<pair<int,int>>>& adj,  // {to, id}
                        vector<bool>& seen) {
    seen[node] = true;
    for (auto [next, id] : adj[node]) {
        if (id == viaEdge) continue;              // the same EDGE, not just
        if (seen[next]) return true;              // the same node
        if (hasCycleMultigraph(next, id, adj, seen)) return true;
    }
    return false;
}

// KAHN'S ALGORITHM - cycle detection as a side effect of topological
// sorting. Often the better interview answer: no colour bookkeeping,
// and you get the ordering too.
bool hasCycleKahn(int n, const vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);
    for (int v = 0; v < n; ++v)
        for (int next : adj[v]) ++indegree[next];

    queue<int> q;
    for (int v = 0; v < n; ++v) if (indegree[v] == 0) q.push(v);

    int placed = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        ++placed;
        for (int next : adj[node])
            if (--indegree[next] == 0) q.push(next);
    }
    return placed != n;              // leftovers are locked in a cycle
}

// UNION FIND - the cleanest undirected answer when edges arrive one at
// a time, and it identifies WHICH edge closes the cycle.
struct DSU {
    vector<int> parent, size;
    explicit DSU(int n) : parent(n), size(n, 1) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;               // already connected - cycle
        if (size[ra] < size[rb]) swap(ra, rb);
        parent[rb] = ra; size[ra] += size[rb];
        return true;
    }
};

pair<int,int> firstRedundantEdge(int n, const vector<pair<int,int>>& edges) {
    DSU dsu(n);
    for (auto [a, b] : edges)
        if (!dsu.unite(a, b)) return {a, b};      // this edge closes it
    return {-1, -1};
}

// RECOVERING the cycle's nodes. Walk parents back from the current node
// and STOP at the grey ancestor - not at the root.
vector<int> findCycle(int n, const vector<vector<int>>& adj) {
    vector<Colour> colour(n, WHITE);
    vector<int> parent(n, -1), cycle;

    function<bool(int)> visit = [&](int node) {
        colour[node] = GREY;
        for (int next : adj[node]) {
            if (colour[next] == GREY) {           // found it
                for (int at = node; at != next; at = parent[at])
                    cycle.push_back(at);
                cycle.push_back(next);
                reverse(cycle.begin(), cycle.end());
                return true;
            }
            if (colour[next] == WHITE) {
                parent[next] = node;
                if (visit(next)) return true;
            }
        }
        colour[node] = BLACK;
        return false;
    };

    for (int v = 0; v < n; ++v)
        if (colour[v] == WHITE && visit(v)) break;
    return cycle;
}`,
  },

  "tries-implementation": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A trie storing four words, with shared prefixes collapsed into single paths and end-of-word markers">
  <text x="0" y="14" class="dg-title">Storing "car", "cat", "card", "dog" &#8212; shared prefixes stored once</text>

  <g transform="translate(60,36)">
    <line x1="60"  y1="30" x2="60"  y2="56"  class="dg-link"/>
    <line x1="60"  y1="86" x2="60"  y2="112" class="dg-link"/>
    <line x1="52"  y1="142" x2="20"  y2="168" class="dg-link"/>
    <line x1="68"  y1="142" x2="100" y2="168" class="dg-link"/>
    <line x1="20"  y1="198" x2="20"  y2="224" class="dg-link"/>

    <circle cx="60"  cy="14"  r="15" class="dg-cell-idle"/><text x="60"  y="19" text-anchor="middle" class="dg-index">&#8226;</text>
    <circle cx="60"  cy="70"  r="15" class="dg-cell"/><text x="60"  y="75" text-anchor="middle">c</text>
    <circle cx="60"  cy="126" r="15" class="dg-cell"/><text x="60"  y="131" text-anchor="middle">a</text>
    <circle cx="20"  cy="182" r="15" class="dg-cell-hit"/><text x="20"  y="187" text-anchor="middle">r</text>
    <circle cx="100" cy="182" r="15" class="dg-cell-hit"/><text x="100" y="187" text-anchor="middle">t</text>
    <circle cx="20"  cy="238" r="15" class="dg-cell-hit"/><text x="20"  y="243" text-anchor="middle">d</text>

    <text x="-30" y="187" class="dg-good">&#10003;</text>
    <text x="122" y="187" class="dg-good">&#10003;</text>
    <text x="-30" y="243" class="dg-good">&#10003;</text>
    <text x="-56" y="19" class="dg-label">root</text>
  </g>

  <g transform="translate(230,36)">
    <line x1="30" y1="30" x2="30" y2="56"  class="dg-link"/>
    <line x1="30" y1="86" x2="30" y2="112" class="dg-link"/>

    <circle cx="30" cy="14"  r="15" class="dg-cell"/><text x="30" y="19" text-anchor="middle">d</text>
    <circle cx="30" cy="70"  r="15" class="dg-cell"/><text x="30" y="75" text-anchor="middle">o</text>
    <circle cx="30" cy="126" r="15" class="dg-cell-hit"/><text x="30" y="131" text-anchor="middle">g</text>
    <text x="52" y="131" class="dg-good">&#10003;</text>
  </g>

  <g transform="translate(340,50)">
    <rect x="0" y="0" width="350" height="150" rx="4" class="dg-cell-idle"/>
    <text x="14" y="26" class="dg-note">&#10003; = isEndOfWord</text>
    <text x="14" y="48" class="dg-label">"car" is a word AND a prefix of "card",</text>
    <text x="14" y="66" class="dg-label">so the flag is what distinguishes them</text>
    <text x="14" y="98" class="dg-note">lookup cost = O(word length)</text>
    <text x="14" y="118" class="dg-label">independent of how many words are stored</text>
    <text x="14" y="140" class="dg-label">&#8212; that is the whole point of a trie</text>
  </g>

  <line x1="0" y1="286" x2="700" y2="286" class="dg-guide"/>
  <text x="0" y="310" class="dg-note">"ca" is a valid prefix but not a word: reachable, but with no end marker.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What it buys over a hash set",
        body: [
          "A trie stores strings as paths through a tree, one character per edge. Words sharing a prefix share the path for that prefix, so 'car', 'card' and 'cat' all traverse the same first two nodes.",
          "For exact membership a hash set is simpler and usually faster, so a trie is not the default for 'is this word in the dictionary'. What a trie provides that hashing cannot is prefix awareness: it can tell you whether any stored word begins with a given prefix, enumerate all such words, or walk character by character extending a search incrementally.",
          "Lookup costs O(L) where L is the word's length, independent of how many words are stored. That is the property to state — a trie with a million words answers a five-character lookup in five steps.",
        ],
      },
      {
        heading: "The end-of-word flag",
        body: [
          "Reaching a node by following a path does not mean the path spells a stored word. 'ca' is reachable in the example above but was never inserted; it is only a prefix. So each node carries a boolean marking whether a word ends there.",
          "This also handles the case where one word is a prefix of another. 'car' and 'card' both exist, so the node at 'r' is flagged and so is the node at 'd'. Without the flag you could not represent both, and searching for 'car' would either fail or 'ca' would wrongly succeed.",
          "Omitting the flag is the single most common trie bug, and it is easy to miss because prefix search still works — only exact-word search is wrong. Test with a word that is a proper prefix of another.",
        ],
        trace: `insert "car", then "card"

  root → c → a → r✓        "car" is a word
                  ↓
                  d✓       "card" is a word

  search("car")   → reach r, flag set     ✓
  search("ca")    → reach a, no flag      ✗ correct
  startsWith("ca")→ reach a, that's all   ✓ correct

  Without the flag, search("ca") would
  wrongly return true.`,
      },
      {
        heading: "Array of children versus a map",
        body: [
          "Each node needs to map a character to a child. Two representations, with a real trade-off.",
          "A fixed array of 26 pointers gives O(1) child access with no hashing, and is the fastest choice for lowercase-only input. The cost is memory: every node allocates 26 pointers regardless of how many are used, which on a sparse trie is mostly waste. For a million nodes at 8 bytes per pointer that is over 200 MB.",
          "A hash map per node allocates only what is used, handles arbitrary alphabets, and is far more memory-efficient on sparse data. It costs a hash lookup per character instead of an array index — usually not enough to matter, but measurable in tight loops.",
          "The rule of thumb: fixed array for a small known alphabet with a dense trie, map otherwise. Competitive submissions often use the array with a flat pool of nodes indexed by integer rather than pointers, which avoids allocation overhead entirely.",
        ],
        aside:
          "The array version's memory is the reason to think before choosing it. Alphabet size times node count is the figure to compute — if it is in the hundreds of megabytes, use a map.",
      },
      {
        heading: "Deletion, which is the awkward operation",
        body: [
          "Removing a word is not just clearing its end-of-word flag, because the nodes along its path may now be unreachable and leaking memory. But they may also still be needed by other words.",
          "The correct approach is recursive and bottom-up. Descend to the end of the word, clear the flag, then on the way back up delete any node that has no children and is not itself the end of another word. Stop as soon as you reach a node that fails either test — everything above it is still in use.",
          "Deleting 'card' from a trie also holding 'car' should remove only the 'd' node. Deleting 'car' from a trie also holding 'card' should remove nothing at all, only the flag. Testing both directions is how you know the logic is right.",
          "Many interview solutions skip deletion entirely, and that is usually fine — but be able to describe it, since the reasoning about shared prefixes is what is being probed.",
        ],
      },
      {
        heading: "Where a trie is the intended answer",
        body: [
          "Autocomplete and search suggestions: walk to the prefix node, then collect every word in its subtree. Design Search Autocomplete System is this plus ranking.",
          "Word Search II: given a grid and a list of words, find which appear. Running a separate search per word is hopeless; instead build a trie of the words and run one DFS over the grid, descending the trie alongside the grid path. The moment the current path is not a trie prefix, prune. That pruning is what makes the problem tractable and is the reason the trie is there.",
          "Word break and dictionary segmentation, where you extend a match character by character and need to know at each step whether to continue.",
          "Longest common prefix of a set of strings: walk down from the root while there is exactly one child and no word ends, and the path is the answer.",
        ],
      },
      {
        heading: "The variants worth knowing",
        body: [
          "A bitwise trie stores integers by their binary representation, 32 levels deep with two children per node. It answers 'which stored number maximises XOR with this one' in O(32) by greedily taking the opposite bit at each level. Maximum XOR of Two Numbers in an Array is exactly this, and it is worth recognising because the problem does not look like a string problem at all.",
          "A compressed trie, or radix tree, collapses chains of single-child nodes into one edge holding a substring. It saves a great deal of memory on sparse data and is what real routing tables and some databases use.",
          "A suffix trie stores every suffix of a string, enabling substring queries, though a suffix array is usually preferred in practice for its much smaller memory footprint.",
          "Aho-Corasick adds KMP-style fallback links to a trie, letting you search a text for thousands of patterns simultaneously in one pass. It is the natural endpoint of this topic and the string-matching one meeting.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Fixed-array children: O(1) access, but 26 pointers per node whether
// used or not. Compute alphabet x nodes before choosing this.
struct TrieNode {
    array<TrieNode*, 26> children{};      // value-initialised to nullptr
    bool isEndOfWord = false;             // WITHOUT this, "ca" would count
                                          // as a word in a trie holding "car"
    ~TrieNode() { for (auto* c : children) delete c; }
};

class Trie {
    TrieNode* root = new TrieNode();

public:
    ~Trie() { delete root; }

    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int i = c - 'a';
            if (!node->children[i]) node->children[i] = new TrieNode();
            node = node->children[i];
        }
        node->isEndOfWord = true;
    }

    // Walk to the node, or return null if the path breaks.
    TrieNode* walk(const string& prefix) const {
        TrieNode* node = root;
        for (char c : prefix) {
            node = node->children[c - 'a'];
            if (!node) return nullptr;
        }
        return node;
    }

    bool search(const string& word) const {
        TrieNode* node = walk(word);
        return node && node->isEndOfWord;      // reachable AND a word
    }

    bool startsWith(const string& prefix) const {
        return walk(prefix) != nullptr;        // reachable is enough
    }

    // Collect every word under a prefix - the autocomplete operation.
    vector<string> withPrefix(const string& prefix) const {
        vector<string> out;
        TrieNode* start = walk(prefix);
        if (!start) return out;

        string buffer = prefix;
        function<void(TrieNode*)> collect = [&](TrieNode* node) {
            if (node->isEndOfWord) out.push_back(buffer);
            for (int i = 0; i < 26; ++i) {
                if (!node->children[i]) continue;
                buffer.push_back('a' + i);
                collect(node->children[i]);
                buffer.pop_back();             // undo, as in backtracking
            }
        };
        collect(start);
        return out;
    }

    // DELETION is bottom-up: clear the flag, then on the way back up
    // remove any node with no children that ends no other word.
    // Deleting "card" when "car" exists removes only 'd'.
    // Deleting "car" when "card" exists removes nothing but the flag.
    bool erase(const string& word, TrieNode* node = nullptr, size_t depth = 0) {
        if (!node) node = root;
        if (depth == word.size()) {
            if (!node->isEndOfWord) return false;    // not stored
            node->isEndOfWord = false;
        } else {
            int i = word[depth] - 'a';
            TrieNode* child = node->children[i];
            if (!child || !erase(word, child, depth + 1)) return false;

            bool childIsSpare = !child->isEndOfWord &&
                none_of(child->children.begin(), child->children.end(),
                        [](TrieNode* c) { return c != nullptr; });
            if (childIsSpare) { delete child; node->children[i] = nullptr; }
        }
        return true;
    }
};

// MAP-BACKED - use this for large or unknown alphabets, and whenever
// the trie is sparse. Allocates only the children actually present.
struct MapTrieNode {
    unordered_map<char, MapTrieNode*> children;
    bool isEndOfWord = false;
};

// BITWISE TRIE - integers by their binary digits, 32 levels deep.
// Answers "which stored number maximises XOR with x" in O(32) by
// greedily taking the OPPOSITE bit at every level.
class XorTrie {
    struct Node { Node* child[2] = {nullptr, nullptr}; };
    Node* root = new Node();

public:
    void insert(int value) {
        Node* node = root;
        for (int bit = 31; bit >= 0; --bit) {
            int b = (value >> bit) & 1;
            if (!node->child[b]) node->child[b] = new Node();
            node = node->child[b];
        }
    }

    int maxXorWith(int value) const {
        Node* node = root;
        int result = 0;
        for (int bit = 31; bit >= 0; --bit) {
            int b = (value >> bit) & 1;
            int want = b ^ 1;                  // opposite bit maximises XOR
            if (node->child[want]) { result |= (1 << bit); node = node->child[want]; }
            else                     node = node->child[b];
        }
        return result;
    }
};`,
  },
};
