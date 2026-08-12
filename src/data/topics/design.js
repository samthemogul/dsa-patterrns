// Design
export const name = "Design";

export const topics = [
  {
    id: "design-lru-cache",
    title: "LRU & LFU Cache",
    subtitle: "Data Structure Design",
    summary: "Hash map for lookup, doubly linked list for order — O(1) get and put.",
    complexity: {
      time: "O(1)",
      space: "O(capacity)",
      note: "Both operations are genuinely constant. The trick is that neither structure alone can do it: the map gives lookup, the list gives ordering.",
    },
    description:
      "An LRU cache holds a fixed number of entries and evicts the least recently used one when it overflows, with both get and put required to be O(1). Neither a hash map nor a list can manage that alone — a map has no notion of order, and a list has no fast lookup — so the answer is to run both and have them point at each other. The map goes from key to node, giving O(1) lookup. A doubly linked list keeps nodes in recency order, giving O(1) removal and reinsertion because you already hold the node and its neighbours. Every access unlinks the node and moves it to the front; every insertion beyond capacity drops the node at the back. Sentinel head and tail nodes are what make the pointer surgery clean, removing every null check from the splice logic. LFU is the harder follow-up: it evicts by access frequency rather than recency, which needs a second map from frequency to a list of nodes at that frequency, plus a running minimum frequency — with ties broken by recency, so each frequency bucket is itself an LRU list.",
    useCases: [
      "Application and database caches with a fixed memory budget.",
      "Browser and CDN caches deciding what to keep when space runs out.",
      "Operating system page replacement policies.",
      "Memoisation with a bounded table, where unbounded caching would leak memory.",
      "As a very common interview question in its own right, testing whether you can compose two structures.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">capacity 3, after get(A)</div>
        <div class="flex items-center space-x-2 mb-4">
          <div class="p-1 bg-gray-100 border rounded-sm text-gray-500">head</div>
          <div class="text-gray-500">&#8646;</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm">A</div>
          <div class="text-gray-500">&#8646;</div>
          <div class="p-2 bg-blue-100 border border-blue-300 rounded-sm">C</div>
          <div class="text-gray-500">&#8646;</div>
          <div class="p-2 bg-red-200 border border-red-500 rounded-sm">B</div>
          <div class="text-gray-500">&#8646;</div>
          <div class="p-1 bg-gray-100 border rounded-sm text-gray-500">tail</div>
        </div>
        <div class="flex space-x-4 text-sm">
          <div class="text-green-700">most recent</div>
          <div class="text-red-500">evicted next</div>
        </div>
        <div class="text-sm text-gray-600 mt-2">map: A&rarr;node, B&rarr;node, C&rarr;node</div>
      </div>
    `,
    code: {
      python: `# The interview answer: a hash map for lookup + a doubly linked list
# for recency order. Sentinel head/tail remove every null check.
class Node:
    __slots__ = ('key', 'val', 'prev', 'next')
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.map = {}
        self.head = Node()          # sentinel: most recent side
        self.tail = Node()          # sentinel: least recent side
        self.head.next = self.tail
        self.tail.prev = self.head

    def _unlink(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _push_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key not in self.map:
            return -1
        node = self.map[key]
        self._unlink(node)          # touch it - move to the front
        self._push_front(node)
        return node.val

    def put(self, key, value):
        if key in self.map:
            node = self.map[key]
            node.val = value
            self._unlink(node)
            self._push_front(node)
            return
        if len(self.map) == self.cap:
            lru = self.tail.prev    # the node just before the tail sentinel
            self._unlink(lru)
            del self.map[lru.key]   # delete by KEY, which is why nodes store it
        node = Node(key, value)
        self.map[key] = node
        self._push_front(node)


# Python shortcut - OrderedDict already is a map plus a linked list.
# Fine to mention, but expect to be asked for the manual version.
from collections import OrderedDict

class LRUCacheShort:
    def __init__(self, capacity):
        self.cap = capacity
        self.od = OrderedDict()

    def get(self, key):
        if key not in self.od:
            return -1
        self.od.move_to_end(key)
        return self.od[key]

    def put(self, key, value):
        if key in self.od:
            self.od.move_to_end(key)
        self.od[key] = value
        if len(self.od) > self.cap:
            self.od.popitem(last=False)`,
      typescript: `// Hash map for lookup + doubly linked list for recency order.
class LRUNode {
  prev: LRUNode | null = null;
  next: LRUNode | null = null;
  constructor(public key = 0, public val = 0) {}
}

class LRUCache {
  private map = new Map<number, LRUNode>();
  private head = new LRUNode();   // sentinel: most recent
  private tail = new LRUNode();   // sentinel: least recent

  constructor(private cap: number) {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private unlink(node: LRUNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private pushFront(node: LRUNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (!node) return -1;
    this.unlink(node);
    this.pushFront(node);
    return node.val;
  }

  put(key: number, value: number): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.val = value;
      this.unlink(existing);
      this.pushFront(existing);
      return;
    }
    if (this.map.size === this.cap) {
      const lru = this.tail.prev!;
      this.unlink(lru);
      this.map.delete(lru.key);    // nodes store their key for this line
    }
    const node = new LRUNode(key, value);
    this.map.set(key, node);
    this.pushFront(node);
  }
}

// JS shortcut: Map preserves insertion order, so the first key is the
// oldest. Worth mentioning, but write the manual version if asked.
class LRUCacheShort {
  private map = new Map<number, number>();
  constructor(private cap: number) {}

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val);        // re-insert to move to the end
    return val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}`,
    },
    pitfalls: [
      "Storing only the value in the linked list node. You need the key too, or you cannot delete the evicted entry from the map.",
      "Using a singly linked list. Removing an arbitrary node then needs its predecessor, which costs O(n) to find — the second pointer is what buys O(1).",
      "Forgetting to move a node on get. A read counts as a use; skipping that is the most common correctness bug.",
      "Omitting sentinel nodes and then hitting null pointer errors on the first and last elements.",
      "On updating an existing key, inserting a duplicate node instead of updating and re-linking the existing one.",
    ],
    problems: {
      easy: [
        { name: "Design HashMap", url: "https://leetcode.com/problems/design-hashmap/" },
        { name: "Design HashSet", url: "https://leetcode.com/problems/design-hashset/" },
      ],
      medium: [
        { name: "LRU Cache", url: "https://leetcode.com/problems/lru-cache/" },
        { name: "Design Underground System", url: "https://leetcode.com/problems/design-underground-system/" },
        { name: "Insert Delete GetRandom O(1)", url: "https://leetcode.com/problems/insert-delete-getrandom-o1/" },
        { name: "Design Browser History", url: "https://leetcode.com/problems/design-browser-history/" },
      ],
      hard: [
        { name: "LFU Cache", url: "https://leetcode.com/problems/lfu-cache/" },
        { name: "All O`one Data Structure", url: "https://leetcode.com/problems/all-oone-data-structure/" },
        { name: "Design In-Memory File System", url: "https://leetcode.com/problems/design-in-memory-file-system/" },
      ],
    },
  },

  {
    id: "design-iterators-streams",
    title: "Iterators & Streaming Data",
    subtitle: "Data Structure Design",
    summary: "Answering queries over data that arrives one item at a time.",
    complexity: {
      time: "O(log n)",
      space: "O(n)",
      note: "For the two-heap median. Streaming problems are judged on the space bound as much as the time bound — often the whole point is not storing everything.",
    },
    description:
      "Streaming design questions give you data arriving one element at a time and ask for a running answer, usually with a space constraint that rules out keeping everything. The techniques are worth recognising individually. Two heaps solve running median: a max-heap for the lower half and a min-heap for the upper half, kept balanced so the median is always at one or both roots. A monotonic deque solves sliding-window maximum in O(1) amortised per element by discarding elements that can never win again. Reservoir sampling picks k uniformly random items from a stream of unknown length using O(k) space, by replacing an existing sample with probability k/i at step i. Iterator design is the other half of this category — problems like flattening a nested list or peeking ahead in a stream test whether you can defer work until it is actually requested, rather than materialising everything up front. The instinct to build is laziness: compute the next element only when next() is called, and remember that hasNext() may need to look ahead without consuming.",
    useCases: [
      "Running statistics over an unbounded stream — median, moving average, or top-k.",
      "Sliding window aggregates over a live feed of events or measurements.",
      "Sampling uniformly from a stream whose length you do not know in advance.",
      "Wrapping a nested or irregular structure behind a flat iterator interface.",
      "Rate limiters and hit counters, where old entries must expire as time moves forward.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">running median with two heaps</div>
        <div class="flex space-x-4 items-start">
          <div class="flex flex-col items-center">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-md mb-1">max-heap</div>
            <div class="p-1 bg-gray-100 border rounded-sm">[3, 1, 2]</div>
            <div class="text-gray-500 mt-1">lower half</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="p-2 bg-green-200 border border-green-500 rounded-md mb-1">median</div>
            <div class="p-1 bg-gray-100 border rounded-sm">3.5</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-md mb-1">min-heap</div>
            <div class="p-1 bg-gray-100 border rounded-sm">[4, 6, 5]</div>
            <div class="text-gray-500 mt-1">upper half</div>
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-2">keep sizes within 1 &rarr; median is at the roots</div>
      </div>
    `,
    code: {
      python: `import heapq, random

# Running median. Python's heapq is a min-heap only, so the lower half
# is stored negated to fake a max-heap.
class MedianFinder:
    def __init__(self):
        self.low = []      # max-heap (negated), the smaller half
        self.high = []     # min-heap, the larger half

    def add(self, num):
        heapq.heappush(self.low, -num)
        # every element in low must be <= every element in high
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):          # rebalance
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def median(self):
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2


# Reservoir sampling: k uniform samples from a stream of unknown length,
# using only O(k) space. Element i survives with probability k/i.
def reservoir_sample(stream, k):
    reservoir = []
    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item
    return reservoir


# Peeking iterator: cache one element so peek() can look without consuming.
class PeekingIterator:
    def __init__(self, iterator):
        self._it = iterator
        self._cache = next(self._it, None)

    def peek(self):
        return self._cache

    def next(self):
        value = self._cache
        self._cache = next(self._it, None)     # refill after handing it over
        return value

    def has_next(self):
        return self._cache is not None`,
      typescript: `// Running median with two heaps. (Assumes a MinHeap/MaxHeap helper;
// the structure is what matters, not the heap implementation.)
class MedianFinder {
  private low = new MaxHeap();    // smaller half
  private high = new MinHeap();   // larger half

  add(num: number): void {
    this.low.push(num);
    this.high.push(this.low.pop()!);           // maintain the ordering
    if (this.high.size() > this.low.size()) {  // rebalance
      this.low.push(this.high.pop()!);
    }
  }

  median(): number {
    if (this.low.size() > this.high.size()) return this.low.peek()!;
    return (this.low.peek()! + this.high.peek()!) / 2;
  }
}

// Reservoir sampling - k uniform samples, O(k) space, unknown length.
function reservoirSample<T>(stream: Iterable<T>, k: number): T[] {
  const reservoir: T[] = [];
  let i = 0;
  for (const item of stream) {
    if (i < k) reservoir.push(item);
    else {
      const j = Math.floor(Math.random() * (i + 1));
      if (j < k) reservoir[j] = item;
    }
    i++;
  }
  return reservoir;
}

// Peeking iterator - cache one element so peek() doesn't consume.
class PeekingIterator<T> {
  private cache: IteratorResult<T>;
  constructor(private it: Iterator<T>) {
    this.cache = it.next();
  }
  peek(): T | undefined {
    return this.cache.done ? undefined : this.cache.value;
  }
  next(): T | undefined {
    const value = this.peek();
    this.cache = this.it.next();
    return value;
  }
  hasNext(): boolean {
    return !this.cache.done;
  }
}`,
    },
    pitfalls: [
      "Forgetting to rebalance the two heaps after every insert, so the median drifts off the roots.",
      "Pushing straight into whichever heap looks right by size. Push through the other heap first, or the ordering invariant breaks.",
      "In reservoir sampling, generating the random index over the wrong range. It must be 0..i inclusive, using the running count, not the reservoir size.",
      "Materialising the whole stream inside an iterator's constructor, which defeats the purpose of the interface.",
      "Letting hasNext() consume an element. It must look ahead without advancing, which is exactly what the cached element is for.",
    ],
    problems: {
      easy: [
        { name: "Moving Average from Data Stream", url: "https://leetcode.com/problems/moving-average-from-data-stream/" },
        { name: "Peeking Iterator", url: "https://leetcode.com/problems/peeking-iterator/" },
        { name: "Design Parking System", url: "https://leetcode.com/problems/design-parking-system/" },
      ],
      medium: [
        { name: "Kth Largest Element in a Stream", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
        { name: "Flatten Nested List Iterator", url: "https://leetcode.com/problems/flatten-nested-list-iterator/" },
        { name: "Design Hit Counter", url: "https://leetcode.com/problems/design-hit-counter/" },
        { name: "Design Twitter", url: "https://leetcode.com/problems/design-twitter/" },
      ],
      hard: [
        { name: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/" },
        { name: "Sliding Window Median", url: "https://leetcode.com/problems/sliding-window-median/" },
        { name: "Design Search Autocomplete System", url: "https://leetcode.com/problems/design-search-autocomplete-system/" },
      ],
    },
  },
];
