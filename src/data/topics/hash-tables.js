// Hash Tables
export const name = "Hash Tables";

export const topics = [
  {
    id: "hash-map-basics",
    title: "Hash Maps",
    subtitle: "Key-Value Storage",
    summary: "Constant-time lookup by key — the single most useful structure in interviews.",
    complexity: {
      time: "O(1)",
      space: "O(n)",
      note: "Average case for insert, lookup and delete. Worst case is O(n) when every key collides — worth saying out loud rather than waiting to be asked.",
    },
    description:
      "A hash map stores key-value pairs and retrieves a value by its key in constant average time. It runs the key through a hash function to produce an integer, reduces that to an index in a backing array, and stores the pair there. Collisions are resolved by chaining or open addressing, and the table resizes once the load factor passes a threshold.",
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A hash function mapping keys to bucket indices, with two keys colliding and chained together">
  <defs>
    <marker id="hm-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow"/>
    </marker>
  </defs>

  <text x="0" y="14" class="dg-title">key &#8594; hash(key) mod 8 &#8594; bucket</text>

  <g transform="translate(0,40)">
    <rect x="0" y="0"  width="86" height="24" rx="3" class="dg-cell"/><text x="43" y="17" text-anchor="middle">"apple"</text>
    <rect x="0" y="34" width="86" height="24" rx="3" class="dg-cell"/><text x="43" y="51" text-anchor="middle">"berry"</text>
    <rect x="0" y="68" width="86" height="24" rx="3" class="dg-cell"/><text x="43" y="85" text-anchor="middle">"cherry"</text>
  </g>

  <rect x="118" y="52" width="70" height="60" rx="4" class="dg-cell-mark"/>
  <text x="153" y="78" text-anchor="middle" class="dg-note">hash</text>
  <text x="153" y="96" text-anchor="middle" class="dg-note">mod 8</text>
  <line x1="88" y1="52"  x2="114" y2="72" class="dg-link" marker-end="url(#hm-a)"/>
  <line x1="88" y1="86"  x2="114" y2="84" class="dg-link" marker-end="url(#hm-a)"/>
  <line x1="88" y1="120" x2="114" y2="96" class="dg-link" marker-end="url(#hm-a)"/>

  <g transform="translate(250,26)">
    <text x="-10" y="-8" class="dg-label">buckets</text>
    <rect x="0" y="0"   width="40" height="22" rx="3" class="dg-cell-idle"/><text x="-14" y="16" class="dg-index">0</text>
    <rect x="0" y="26"  width="40" height="22" rx="3" class="dg-cell-idle"/><text x="-14" y="42" class="dg-index">1</text>
    <rect x="0" y="52"  width="40" height="22" rx="3" class="dg-cell-hit"/><text x="-14" y="68" class="dg-index">2</text>
    <rect x="0" y="78"  width="40" height="22" rx="3" class="dg-cell-idle"/><text x="-14" y="94" class="dg-index">3</text>
    <rect x="0" y="104" width="40" height="22" rx="3" class="dg-cell-idle"/><text x="-14" y="120" class="dg-index">4</text>
    <rect x="0" y="130" width="40" height="22" rx="3" class="dg-cell-out"/><text x="-14" y="146" class="dg-index">5</text>
    <rect x="0" y="156" width="40" height="22" rx="3" class="dg-cell-idle"/><text x="-14" y="172" class="dg-index">6</text>
    <rect x="0" y="182" width="40" height="22" rx="3" class="dg-cell-idle"/><text x="-14" y="198" class="dg-index">7</text>

    <line x1="42" y1="63" x2="72" y2="63" class="dg-link" marker-end="url(#hm-a)"/>
    <rect x="76" y="52" width="130" height="22" rx="3" class="dg-cell"/>
    <text x="141" y="68" text-anchor="middle" class="dg-note">"berry" : 7</text>

    <line x1="42" y1="141" x2="72" y2="141" class="dg-link" marker-end="url(#hm-a)"/>
    <rect x="76" y="130" width="130" height="22" rx="3" class="dg-cell-out"/>
    <text x="141" y="146" text-anchor="middle" class="dg-note">"apple" : 3</text>
    <line x1="208" y1="141" x2="238" y2="141" class="dg-link" marker-end="url(#hm-a)"/>
    <rect x="242" y="130" width="140" height="22" rx="3" class="dg-cell-out"/>
    <text x="312" y="146" text-anchor="middle" class="dg-note">"cherry" : 9</text>
  </g>

  <line x1="0" y1="252" x2="700" y2="252" class="dg-guide"/>
  <text x="0" y="274" class="dg-note">Two keys hashing to slot 5 collide. Chaining keeps both; lookup scans the short chain,</text>
  <text x="0" y="290" class="dg-note">comparing full keys. Resize once entries/buckets passes ~0.75 to keep chains short.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What problem it solves",
        body: [
          "Finding a value in an unsorted array costs O(n) — you scan until you find it. Sorting first buys O(log n) lookups but costs O(n log n) up front and makes insertion expensive. A hash map gives O(1) lookup, insertion and deletion on average, with no ordering requirement at all.",
          "The price is that you lose order entirely. A hash map cannot tell you the smallest key, cannot iterate in sorted order, and cannot answer range queries. If you need any of those, you want the ordered map covered later in this category.",
          "In practice this is the structure that turns quadratic solutions linear more often than any other. Two Sum is the archetype: instead of checking every pair, walk the array once storing what you have seen, and at each element ask whether target minus this value is already in the map.",
        ],
      },
      {
        heading: "How the lookup actually happens",
        body: [
          "Three steps. The key is passed to a hash function producing an integer — for a string this typically combines character codes, often as a polynomial like h = h·31 + c. That integer is reduced to an array index, usually modulo the bucket count. The pair is stored there.",
          "Retrieval repeats the first two steps and looks in the same bucket. Because the same key always hashes the same way, you go straight to the right slot without searching. That direct jump is where the constant time comes from — nothing is scanned.",
          "One detail matters: a bucket may hold entries for several different keys, so lookup must still compare the full key for equality once it arrives. Hashing narrows the search to one bucket; equality confirms the match.",
        ],
      },
      {
        heading: "Collisions, and the two ways to handle them",
        body: [
          "Two different keys can hash to the same index. This is not a rare pathology — with n keys in n buckets the birthday paradox says collisions appear almost immediately. Every real implementation handles them.",
          "Chaining stores a list at each bucket. Insert appends, lookup scans comparing keys. It is simple and degrades gracefully, and is what Java's HashMap uses — with the refinement that a chain past eight entries converts into a balanced tree, capping the worst case at O(log n) rather than O(n).",
          "Open addressing stores entries directly in the array and probes for another slot on collision — the next one along for linear probing, or a quadratic offset. It avoids per-entry allocation and is friendlier to the cache, which is why Python's dict uses it. The complication is deletion: emptying a slot would break a probe chain passing through it, so deleted slots get a tombstone marker instead.",
        ],
        trace: `8 buckets, keys hashing to: apple→5, berry→2, cherry→5

CHAINING
  [2] → ("berry", 7)
  [5] → ("apple", 3) → ("cherry", 9)
        lookup "cherry": go to 5, walk the
        chain comparing keys, second matches

OPEN ADDRESSING (linear probing)
  [2] ("berry", 7)
  [5] ("apple", 3)      cherry wanted 5, taken
  [6] ("cherry", 9)     ← probed to the next free slot
        lookup "cherry": check 5 (wrong key),
        check 6, match. Stop at the first EMPTY
        slot — that means absent.`,
      },
      {
        heading: "Load factor and why resizing is amortised O(1)",
        body: [
          "The load factor is entries divided by buckets. As it rises, chains lengthen and probe sequences stretch, and constant-time behaviour degrades. Implementations resize once it crosses a threshold, typically 0.75.",
          "Resizing allocates a larger array — usually double — and rehashes every entry into it, because the modulo has changed and keys belong in different buckets now. That single operation is O(n), which looks like it breaks the constant-time promise.",
          "It does not, because of the doubling. Growing from n to 2n buckets means the next resize is 2n insertions away, so the O(n) cost is spread across at least n cheap operations. Any sequence of n insertions costs O(n) total — O(1) amortised each. That is a guarantee, not an average, and it is the same argument that makes appending to a dynamic array constant time.",
        ],
        aside:
          "The amortised bound is per sequence, not per call. A single insertion can still take O(n) if it triggers a resize. That matters in latency-sensitive code, which is why real-time systems pre-size their maps or use structures with hard bounds.",
      },
      {
        heading: "Worst case, and what makes it happen",
        body: [
          "If every key hashes to the same bucket, a chained map becomes a linked list and every lookup is O(n). With a decent hash function on ordinary data this effectively never occurs — but it can be induced deliberately, which matters in two places.",
          "In web services, an attacker who knows your hash function can submit keys engineered to collide, turning an O(1) endpoint into an O(n) one. Language runtimes defend by seeding the hash with a per-process random value, which is why Python's string hashes differ between runs.",
          "In competitive programming, judges sometimes include anti-hash tests targeting C++'s unordered_map, which uses the identity function for integers with a prime bucket count. The defence is to mix keys with a random constant, or to use the ordered map, which is O(log n) but has no adversarial worst case.",
        ],
      },
      {
        heading: "Keys must be hashable, and immutable in practice",
        body: [
          "A type can be a key only if it can be hashed and compared for equality, and the two must agree: equal objects must produce equal hashes. Getting this wrong in a custom class means lookups fail silently, because the map searches the wrong bucket and reports the key absent.",
          "Mutating a key after insertion causes the same failure. The entry sits in the bucket chosen by its old hash, but lookups compute the new hash and go elsewhere. The entry is still in the map, consuming memory, and unreachable. This is why Python forbids lists as keys, and why you should treat keys as immutable everywhere regardless of whether the compiler enforces it.",
          "For composite keys the usual approaches are a tuple in Python, a struct with a custom hash in C++, or encoding into a single value — packing two 32-bit integers into one 64-bit integer is a common competitive trick.",
        ],
      },
      {
        heading: "The patterns worth recognising",
        body: [
          "Complement lookup. Walking a collection asking 'have I already seen the thing that pairs with this?' — Two Sum, and the counting half of subarray-sum-equals-k where the map holds prefix sums.",
          "Frequency counting. Map from value to occurrence count, underpinning anagram checking, top-k-frequent, majority element, and most sliding-window problems over characters.",
          "Grouping by canonical form. Compute a signature for each item and use it as a key. Group Anagrams is the classic: sorting each word gives a signature all its anagrams share.",
          "Index memory. Map from value to the position it last appeared, letting sliding-window problems jump the left pointer directly rather than shrinking one step at a time.",
        ],
      },
    ],
    useCases: [
      "Turning an O(n²) pair search into an O(n) single pass by remembering what you have already seen.",
      "Counting frequencies of values, characters, or words.",
      "Grouping items by a computed signature, such as anagrams by their sorted letters.",
      "Caching or memoising results keyed by the arguments that produced them.",
      "De-duplicating while retaining an associated value, where a set alone would not be enough.",
    ],
    pitfalls: [
      "Quoting O(1) as the worst case. It is the average; say 'O(1) average, O(n) worst case if all keys collide' and you answer the follow-up before it is asked.",
      "Mutating a key after inserting it. The entry becomes unreachable because its bucket was chosen by the old hash.",
      "Defining custom equality without a matching hash, so equal objects hash differently and lookups silently miss.",
      "Expecting a stable iteration order. Python 3.7+ guarantees insertion order, but C++ and Java make no such promise.",
      "Reaching for a map when an array would do. If the keys are small integers, an array is faster, simpler and smaller.",
      "Modifying a map while iterating it, which is undefined or an outright error in most languages.",
    ],
    code: {
      python: `# Two Sum - the archetypal use. One pass, O(n).
def two_sum(nums, target):
    seen = {}                          # value -> index
    for i, x in enumerate(nums):
        if target - x in seen:         # have I met my complement already?
            return [seen[target - x], i]
        seen[x] = i
    return []

# Frequency counting.
from collections import Counter, defaultdict

def most_common_char(s):
    return Counter(s).most_common(1)[0][0]

# Grouping by canonical form: all anagrams share a sorted signature.
def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups[''.join(sorted(w))].append(w)
    return list(groups.values())

# Composite keys must be immutable - tuples, not lists.
def count_coordinates(points):
    counts = defaultdict(int)
    for x, y in points:
        counts[(x, y)] += 1            # (x, y) hashable; [x, y] is not
    return counts

# Built by hand, to show the mechanics.
class HashMap:
    def __init__(self, capacity=8):
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0

    def _index(self, key):
        return hash(key) % len(self.buckets)

    def put(self, key, value):
        bucket = self.buckets[self._index(key)]
        for i, (k, _) in enumerate(bucket):
            if k == key:               # existing key - overwrite
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self.size += 1
        if self.size / len(self.buckets) > 0.75:
            self._resize()

    def get(self, key, default=None):
        for k, v in self.buckets[self._index(key)]:
            if k == key:               # hashing narrows it; equality confirms
                return v
        return default

    def _resize(self):
        old = self.buckets
        self.buckets = [[] for _ in range(len(old) * 2)]
        self.size = 0
        for bucket in old:
            for k, v in bucket:
                self.put(k, v)         # indices change - must rehash`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

// Two Sum - one pass, O(n).
vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<int,int> seen;                 // value -> index
    for (int i = 0; i < (int)nums.size(); ++i) {
        auto it = seen.find(target - nums[i]);
        if (it != seen.end()) return {it->second, i};
        seen[nums[i]] = i;
    }
    return {};
}

// Frequency counting. operator[] value-initialises to 0 for ints,
// which is why ++counts[c] works on a key that is not there yet.
unordered_map<char,int> frequencies(const string& s) {
    unordered_map<char,int> counts;
    for (char c : s) ++counts[c];
    return counts;
}

// Grouping by canonical form.
vector<vector<string>> groupAnagrams(const vector<string>& words) {
    unordered_map<string, vector<string>> groups;
    for (const string& w : words) {
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }
    vector<vector<string>> out;
    for (auto& [_, group] : groups) out.push_back(move(group));
    return out;
}

// Composite keys: packing two 32-bit ints into one 64-bit key is the
// fast competitive trick.
unordered_map<long long,int> gridCounts(const vector<pair<int,int>>& pts) {
    unordered_map<long long,int> counts;
    for (auto [x, y] : pts)
        ++counts[((long long)x << 32) | (unsigned int)y];
    return counts;
}

// ANTI-HASH DEFENCE. unordered_map hashes integers with the identity
// function, so crafted input can force every key into one bucket and
// turn O(1) into O(n). Mixing with a random seed prevents it.
struct SafeHash {
    static uint64_t splitmix64(uint64_t x) {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return x ^ (x >> 31);
    }
    size_t operator()(uint64_t x) const {
        static const uint64_t SEED =
            chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + SEED);
    }
};

void safeUsage() {
    unordered_map<long long, int, SafeHash> safe;
    safe.reserve(1 << 20);          // pre-size to avoid repeated rehashing
    safe.max_load_factor(0.25);     // fewer collisions, more memory
}

// A custom struct as a key needs hash AND equality, and they must
// agree: equal objects MUST hash equal.
struct Point {
    int x, y;
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
};

struct PointHash {
    size_t operator()(const Point& p) const {
        return hash<int>()(p.x) ^ (hash<int>()(p.y) << 1);
    }
};`,
      typescript: `// Two Sum - one pass, O(n).
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();      // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}

// Frequency counting.
function frequencies(s: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
  return counts;
}

// Grouping by canonical form.
function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const w of words) {
    const key = [...w].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(w);
  }
  return [...groups.values()];
}

// Map vs plain object - prefer Map. A plain object coerces every key to
// a string, inherits from Object.prototype, and has no size property.
function whyMap(): void {
  const obj: Record<string, number> = {};
  obj[1 as unknown as string] = 10;
  console.log(Object.keys(obj));        // ["1"] - the number became a string

  const map = new Map<number, number>();
  map.set(1, 10);
  console.log([...map.keys()]);         // [1] - stays a number
  console.log(map.size);                // 1  - objects have no equivalent
}

// Composite keys: Map uses reference identity for objects, so two
// equal-looking arrays are different keys. Encode to a primitive.
function countCoordinates(points: [number, number][]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const [x, y] of points) {
    const key = \`\${x},\${y}\`;            // a string key compares by value
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}`,
    },
    problems: {
      easy: [
        { name: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
        { name: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
        { name: "First Unique Character in a String", url: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
        { name: "Ransom Note", url: "https://leetcode.com/problems/ransom-note/" },
        { name: "Majority Element", url: "https://leetcode.com/problems/majority-element/" },
      ],
      medium: [
        { name: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/" },
        { name: "Subarray Sum Equals K", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
        { name: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
        { name: "Valid Sudoku", url: "https://leetcode.com/problems/valid-sudoku/" },
        { name: "Time Based Key-Value Store", url: "https://leetcode.com/problems/time-based-key-value-store/" },
        { name: "Design HashMap", url: "https://leetcode.com/problems/design-hashmap/" },
        { name: "Find All Anagrams in a String", url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
        { name: "4Sum", url: "https://leetcode.com/problems/4sum/" },
      ],
      hard: [
        { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/" },
        { name: "Substring with Concatenation of All Words", url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/" },
        { name: "First Missing Positive", url: "https://leetcode.com/problems/first-missing-positive/" },
      ],
    },
  },

  {
    id: "hash-set-basics",
    title: "Hash Sets",
    subtitle: "Membership & Uniqueness",
    summary: "Have I seen this before? Constant-time membership, with no value attached.",
    complexity: {
      time: "O(1)",
      space: "O(n)",
      note: "Same engine as a hash map — a set is a map whose values are ignored. Insert, lookup and delete are all O(1) average.",
    },
    description:
      "A hash set stores distinct elements and answers one question in constant time: is this element present? It is implemented exactly like a hash map, minus the value. Sets discard duplicates automatically, which makes them the natural tool for de-duplication as well as membership testing, and they support the mathematical set operations — union, intersection, difference — that several problems reduce to directly.",
    illustration: `
<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Duplicate insertions being absorbed by a set, and the three set operations shown as overlapping regions">
  <text x="0" y="14" class="dg-title">A set absorbs duplicates &#8212; insert twice, hold once</text>

  <g transform="translate(0,30)">
    <rect x="0"   y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="23"  y="18" text-anchor="middle">3</text>
    <rect x="52"  y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="75"  y="18" text-anchor="middle">1</text>
    <rect x="104" y="0" width="46" height="26" rx="3" class="dg-cell-out"/><text x="127" y="18" text-anchor="middle">3</text>
    <rect x="156" y="0" width="46" height="26" rx="3" class="dg-cell"/><text x="179" y="18" text-anchor="middle">7</text>
    <rect x="208" y="0" width="46" height="26" rx="3" class="dg-cell-out"/><text x="231" y="18" text-anchor="middle">1</text>
    <text x="272" y="18" class="dg-label">insert each &#8594;</text>
    <rect x="378" y="-6" width="150" height="38" rx="19" class="dg-cell-hit"/>
    <text x="453" y="18" text-anchor="middle" class="dg-note">{ 3, 1, 7 }</text>
    <text x="546" y="18" class="dg-good">size 3, not 5</text>
  </g>

  <line x1="0" y1="92" x2="700" y2="92" class="dg-guide"/>
  <text x="0" y="116" class="dg-title">Set operations &#8212; A = {1,2,3}&#160;&#160;B = {3,4,5}</text>

  <g transform="translate(20,140)">
    <circle cx="55" cy="50" r="42" class="dg-cell-hit" opacity="0.85"/>
    <circle cx="105" cy="50" r="42" class="dg-cell-hit" opacity="0.85"/>
    <text x="80" y="112" text-anchor="middle" class="dg-label">union &#8212; either</text>
    <text x="34" y="54" text-anchor="middle" class="dg-note">1,2</text>
    <text x="80" y="54" text-anchor="middle" class="dg-note">3</text>
    <text x="126" y="54" text-anchor="middle" class="dg-note">4,5</text>
  </g>

  <g transform="translate(250,140)">
    <circle cx="55" cy="50" r="42" class="dg-cell-idle"/>
    <circle cx="105" cy="50" r="42" class="dg-cell-idle"/>
    <path d="M80 13 A42 42 0 0 1 80 87 A42 42 0 0 1 80 13 z" class="dg-cell-hit"/>
    <text x="80" y="112" text-anchor="middle" class="dg-label">intersection &#8212; both</text>
    <text x="34" y="54" text-anchor="middle" class="dg-index">1,2</text>
    <text x="80" y="54" text-anchor="middle" class="dg-note">3</text>
    <text x="126" y="54" text-anchor="middle" class="dg-index">4,5</text>
  </g>

  <g transform="translate(480,140)">
    <circle cx="55" cy="50" r="42" class="dg-cell-hit"/>
    <circle cx="105" cy="50" r="42" class="dg-cell-idle"/>
    <path d="M80 13 A42 42 0 0 1 80 87 A42 42 0 0 1 80 13 z" class="dg-cell-idle"/>
    <text x="80" y="112" text-anchor="middle" class="dg-label">difference &#8212; A not B</text>
    <text x="34" y="54" text-anchor="middle" class="dg-note">1,2</text>
    <text x="80" y="54" text-anchor="middle" class="dg-index">3</text>
    <text x="126" y="54" text-anchor="middle" class="dg-index">4,5</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "A map with the values thrown away",
        body: [
          "There is no separate machinery here. A hash set is a hash map that stores only keys — same hash function, same bucket array, same collision handling, same load factor and resizing. Everything from the hash map topic applies unchanged, including the O(n) worst case and the requirement that elements be hashable and immutable.",
          "What differs is intent, and that difference is worth respecting in code. Reach for a set when the answer to your question is yes or no. Reach for a map when you need to carry something alongside — an index, a count, a last-seen position. Using a map with dummy values where a set would do makes the code lie about what it is tracking.",
        ],
      },
      {
        heading: "The two things it is for",
        body: [
          "Membership testing. Asking 'have I seen this?' inside a loop is the pattern that collapses an O(n²) scan into O(n). Contains Duplicate is the minimal version: walk the array, and if the element is already in the set you have your answer.",
          "De-duplication. Because inserting an existing element is a no-op, pushing a collection through a set leaves exactly the distinct values. The size of the resulting set is the count of distinct elements, which is what sliding-window problems over 'at most k distinct' are really tracking.",
          "Both appear as sub-steps inside larger algorithms far more often than as whole problems. A visited set in graph traversal is membership testing; the distinct-character check in a sliding window is de-duplication.",
        ],
      },
      {
        heading: "Set operations, and when they beat a loop",
        body: [
          "Union gives every element in either set. Intersection gives elements in both. Difference gives what is in the first and not the second. Symmetric difference gives what is in exactly one.",
          "Written by hand each is a loop with a membership check, which is fine. But library versions are usually clearer and often faster, because implementations iterate the smaller set and probe the larger — an optimisation easy to forget when writing it yourself. If you do write intersection manually, iterate the smaller collection deliberately.",
          "Cost is O(n + m) for union and difference, and O(min(n, m)) for intersection done properly. Python and C++ expose these directly; JavaScript's Set gained them recently enough that a manual filter is still the portable approach.",
        ],
        trace: `A = {1, 2, 3}   B = {3, 4, 5}

  union         A | B  →  {1, 2, 3, 4, 5}
  intersection  A & B  →  {3}
  difference    A - B  →  {1, 2}
  symmetric     A ^ B  →  {1, 2, 4, 5}

Intersection cost: iterate the SMALLER set and
probe the larger — O(min(n, m)), not O(n + m).`,
      },
      {
        heading: "Longest Consecutive Sequence — the clever use",
        body: [
          "This is the problem worth studying, because the naive reading suggests sorting and the intended solution does not sort at all. Given an unsorted array, find the length of the longest run of consecutive integers. Sorting gives O(n log n); the target is O(n).",
          "Put every value in a set. Walk the values, and for each ask whether value minus one is also present. If it is, this value is in the middle of a run and some earlier value will handle it — skip it. If it is not, this value starts a run, so count upward while each successor is in the set.",
          "The reason this is linear rather than quadratic is that the inner counting loop only ever runs from a genuine run start, and each element is visited by exactly one such loop. Total inner work across the whole algorithm is bounded by n. That is the same amortised argument as sliding window, and the 'is value minus one present' check is what enforces it.",
        ],
        aside:
          "The start-of-run check is not an optimisation you can skip. Without it, every element of a long run starts its own count and the algorithm becomes O(n²). It is the entire reason the approach is linear.",
      },
      {
        heading: "When an array beats a set",
        body: [
          "If elements are small non-negative integers — character codes, or values bounded by a few million — a boolean array is faster and simpler. Indexing is a single memory access with no hashing, no collisions, and much better cache behaviour.",
          "For the 26 lowercase letters, a 26-element array or even a single 32-bit integer used as a bitmask beats any hash set comfortably. Anagram checking with two 26-element count arrays is the standard fast solution, and 'does this string have all unique characters' is one integer and some bit operations.",
          "The rule of thumb: small known value range, use an array. Large, sparse, or non-integer, use a set. A set over the values 0 to 25 is a hash table doing a job an array does for free.",
        ],
      },
      {
        heading: "The visited set in traversal",
        body: [
          "The most frequent appearance of a set in this whole library is as the visited marker in graph and grid search. Every BFS and DFS needs one, and the two mistakes around it are worth naming here rather than discovering later.",
          "Mark nodes visited when you enqueue them, not when you dequeue them. If you wait until dequeuing, the same node can be enqueued several times by different neighbours before it is processed, and the queue can blow up on dense graphs.",
          "Second, on a grid the visited set can often be dispensed with by mutating the grid itself — overwriting a visited cell with a sentinel. That is O(1) space instead of O(n), and it is the expected answer to Number of Islands if asked to reduce space. Say out loud that it destroys the input, and ask whether that is acceptable.",
        ],
      },
    ],
    useCases: [
      "Detecting duplicates in a single pass over a collection.",
      "Removing duplicates from a list where order does not matter.",
      "Marking visited nodes during graph or grid traversal.",
      "Membership filtering — keeping only items that appear in some reference collection.",
      "Union, intersection and difference between two collections.",
      "Cycle detection in sequences where the values themselves identify the state.",
    ],
    pitfalls: [
      "Using a set when you will later need something associated with each element. Decide up front what you are tracking, or you will rewrite the loop.",
      "Relying on iteration order. A hash set has none — sort afterwards, or use an ordered set.",
      "Adding mutable objects. Changing an element after insertion leaves it in the wrong bucket and unreachable.",
      "Marking graph nodes visited on dequeue rather than enqueue, which lets duplicates pile up in the queue.",
      "Using a hash set for small bounded integers where a boolean array or bitmask would be faster and simpler.",
      "Forgetting the start-of-run guard in Longest Consecutive Sequence, which quietly turns O(n) into O(n²).",
    ],
    code: {
      python: `# Membership: has this been seen before?
def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:                  # O(1) average
            return True
        seen.add(x)
    return False

# De-duplication, order not preserved.
def distinct(nums):
    return list(set(nums))

# De-duplication that DOES preserve order - a dict keeps insertion
# order in Python 3.7+, a set does not.
def distinct_ordered(nums):
    return list(dict.fromkeys(nums))

# Set operations.
def set_ops(a, b):
    A, B = set(a), set(b)
    return {
        'union':        A | B,
        'intersection': A & B,
        'difference':   A - B,
        'symmetric':    A ^ B,
        'is_subset':    A <= B,
    }

# Longest Consecutive Sequence in O(n) - no sorting.
# The "start of a run" guard is what keeps it linear.
def longest_consecutive(nums):
    values = set(nums)
    best = 0
    for x in values:
        if x - 1 in values:
            continue                   # not a run start - someone else has it
        length = 1
        while x + length in values:    # count up from a genuine start
            length += 1
        best = max(best, length)
    return best

# frozenset is hashable, so it can be a dict key or a set element -
# useful for grouping by an unordered signature.
def group_by_letter_set(words):
    groups = {}
    for w in words:
        groups.setdefault(frozenset(w), []).append(w)
    return list(groups.values())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

// Membership. insert() reports whether the element was new.
bool hasDuplicate(const vector<int>& nums) {
    unordered_set<int> seen;
    for (int x : nums)
        if (!seen.insert(x).second) return true;
    return false;
}

// De-duplication. sort + unique is often faster than a hash set for
// large inputs, and gives sorted output for free.
vector<int> distinctSorted(vector<int> nums) {
    sort(nums.begin(), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());
    return nums;
}

// Set operations. Iterate the SMALLER set and probe the larger one.
unordered_set<int> intersect(const unordered_set<int>& a,
                             const unordered_set<int>& b) {
    const auto& small = a.size() < b.size() ? a : b;
    const auto& large = a.size() < b.size() ? b : a;
    unordered_set<int> out;
    for (int x : small)
        if (large.count(x)) out.insert(x);
    return out;
}

// Longest Consecutive Sequence, O(n). The x-1 guard keeps it linear.
int longestConsecutive(const vector<int>& nums) {
    unordered_set<int> values(nums.begin(), nums.end());
    int best = 0;
    for (int x : values) {
        if (values.count(x - 1)) continue;         // not a run start
        int length = 1;
        while (values.count(x + length)) ++length;
        best = max(best, length);
    }
    return best;
}

// For small bounded ranges, skip the hash set entirely.
// 26 lowercase letters fit in a single 32-bit integer.
bool allUniqueLetters(const string& s) {
    uint32_t mask = 0;
    for (char c : s) {
        uint32_t bit = 1u << (c - 'a');
        if (mask & bit) return false;              // already present
        mask |= bit;
    }
    return true;
}

// bitset when the range is larger but still bounded and known.
bool hasDuplicateBounded(const vector<int>& nums) {   // values 0..1e6
    bitset<1000001> seen;
    for (int x : nums) {
        if (seen[x]) return true;
        seen[x] = 1;
    }
    return false;
}`,
      typescript: `// Membership.
function hasDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}

// A Set preserves insertion order in JavaScript, so de-duplication
// keeps the original ordering for free.
const distinct = (nums: number[]): number[] => [...new Set(nums)];

// Set operations. Newer runtimes have union/intersection/difference
// methods; these manual versions work everywhere.
function setOps(a: number[], b: number[]) {
  const A = new Set(a), B = new Set(b);
  return {
    union: new Set([...A, ...B]),
    intersection: new Set([...A].filter((x) => B.has(x))),
    difference: new Set([...A].filter((x) => !B.has(x))),
    symmetric: new Set([
      ...[...A].filter((x) => !B.has(x)),
      ...[...B].filter((x) => !A.has(x)),
    ]),
  };
}

// Longest Consecutive Sequence, O(n).
function longestConsecutive(nums: number[]): number {
  const values = new Set(nums);
  let best = 0;
  for (const x of values) {
    if (values.has(x - 1)) continue;        // not a run start
    let length = 1;
    while (values.has(x + length)) length++;
    best = Math.max(best, length);
  }
  return best;
}

// Objects are compared by reference, so two equal-looking arrays are
// distinct entries. Encode to a primitive when you need value equality.
function objectsAreByReference(): void {
  const bad = new Set<number[]>();
  bad.add([1, 2]);
  bad.add([1, 2]);
  console.log(bad.size);                    // 2 - different references

  const good = new Set<string>();
  good.add([1, 2].join(','));
  good.add([1, 2].join(','));
  console.log(good.size);                   // 1 - compared by value
}`,
    },
    problems: {
      easy: [
        { name: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
        { name: "Intersection of Two Arrays", url: "https://leetcode.com/problems/intersection-of-two-arrays/" },
        { name: "Happy Number", url: "https://leetcode.com/problems/happy-number/" },
        { name: "Jewels and Stones", url: "https://leetcode.com/problems/jewels-and-stones/" },
        { name: "Single Number", url: "https://leetcode.com/problems/single-number/" },
        { name: "Missing Number", url: "https://leetcode.com/problems/missing-number/" },
      ],
      medium: [
        { name: "Longest Consecutive Sequence", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
        { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { name: "Insert Delete GetRandom O(1)", url: "https://leetcode.com/problems/insert-delete-getrandom-o1/" },
        { name: "Contains Duplicate II", url: "https://leetcode.com/problems/contains-duplicate-ii/" },
        { name: "Word Break", url: "https://leetcode.com/problems/word-break/" },
        { name: "Design HashSet", url: "https://leetcode.com/problems/design-hashset/" },
      ],
      hard: [
        { name: "Word Ladder", url: "https://leetcode.com/problems/word-ladder/" },
        { name: "Longest Duplicate Substring", url: "https://leetcode.com/problems/longest-duplicate-substring/" },
      ],
    },
  },

  {
    id: "ordered-map-set",
    title: "Ordered Maps & Sets",
    subtitle: "Sorted Containers",
    summary: "Tree-backed containers that keep keys sorted — O(log n), but they answer questions hashing cannot.",
    complexity: {
      time: "O(log n)",
      space: "O(n)",
      note: "Slower per operation than hashing, but the bound is worst case rather than average, and predecessor, successor and range queries come for free.",
    },
    description:
      "An ordered map or set keeps its keys sorted, backed by a balanced binary search tree — usually a red-black tree. Every operation costs O(log n) rather than O(1), which buys you the smallest and largest key, the nearest key at or above a value, range queries, and sorted iteration. This is C++'s std::map and std::set, Java's TreeMap and TreeSet, and in Python the sortedcontainers library, since the standard library has no built-in equivalent.",
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A balanced search tree backing an ordered set, with lower_bound descending to the first key at or above the query">
  <text x="0" y="14" class="dg-title">lower_bound(13) &#8212; find the first key &#8805; 13</text>

  <g transform="translate(60,40)">
    <line x1="240" y1="40" x2="120" y2="80"  class="dg-link-hi"/>
    <line x1="240" y1="40" x2="360" y2="80"  class="dg-link"/>
    <line x1="120" y1="120" x2="60"  y2="160" class="dg-link"/>
    <line x1="120" y1="120" x2="180" y2="160" class="dg-link-hi"/>
    <line x1="360" y1="120" x2="300" y2="160" class="dg-link"/>
    <line x1="360" y1="120" x2="420" y2="160" class="dg-link"/>

    <circle cx="240" cy="20"  r="20" class="dg-cell-live"/><text x="240" y="25" text-anchor="middle">20</text>
    <circle cx="120" cy="100" r="20" class="dg-cell-live"/><text x="120" y="105" text-anchor="middle">10</text>
    <circle cx="360" cy="100" r="20" class="dg-cell-idle"/><text x="360" y="105" text-anchor="middle" class="dg-index">30</text>
    <circle cx="60"  cy="180" r="20" class="dg-cell-idle"/><text x="60"  y="185" text-anchor="middle" class="dg-index">5</text>
    <circle cx="180" cy="180" r="20" class="dg-cell-hit"/><text x="180" y="185" text-anchor="middle">15</text>
    <circle cx="300" cy="180" r="20" class="dg-cell-idle"/><text x="300" y="185" text-anchor="middle" class="dg-index">25</text>
    <circle cx="420" cy="180" r="20" class="dg-cell-idle"/><text x="420" y="185" text-anchor="middle" class="dg-index">35</text>

    <text x="268" y="18"  class="dg-note">13 &lt; 20 &#8594; go left</text>
    <text x="148" y="98"  class="dg-note">13 &gt; 10 &#8594; go right</text>
    <text x="210" y="184" class="dg-good">13 &lt; 15 &#8594; answer 15</text>
  </g>

  <line x1="0" y1="252" x2="700" y2="252" class="dg-guide"/>
  <text x="0" y="274" class="dg-note">The descent keeps the best candidate seen so far, in O(log n). A hash set cannot do this</text>
  <text x="0" y="290" class="dg-note">at all &#8212; it would have to inspect every element, because hashing destroys order.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What ordering buys you",
        body: [
          "Hashing scatters keys deliberately: a good hash function sends similar keys to unrelated buckets. That is exactly what makes lookup fast and exactly what makes order impossible to recover. Ask a hash set for its smallest element and it has no answer short of scanning everything.",
          "An ordered container stores keys in a balanced search tree, so ordering is structural. The leftmost node is the minimum, the rightmost is the maximum, an in-order walk yields sorted output, and a downward search locates the nearest key to any value. Every operation is O(log n) because it descends the tree, and the tree stays balanced so the depth stays logarithmic.",
          "The trade is real but usually small. If you only ask 'is this present', use a hash set. The moment you need nearest, smallest, range, or sorted iteration, the ordered container is not slower — it is the only option that works.",
        ],
      },
      {
        heading: "lower_bound and upper_bound",
        body: [
          "These two operations are the reason to reach for an ordered container, and they are worth learning precisely because the names are unhelpful.",
          "lower_bound(x) returns the first element at or above x. upper_bound(x) returns the first element strictly above x. If x is present, lower_bound points at it and upper_bound points past it; if x is absent, both point at the same place — the insertion position.",
          "From those two you get everything else. The predecessor of x — the largest element strictly below it — is the element just before lower_bound(x). The count of elements equal to x is the distance between the two bounds. Everything in a range [a, b] runs from lower_bound(a) up to upper_bound(b). Getting the predecessor right requires checking that lower_bound is not already at the beginning, which is the most common bug in this topic.",
        ],
        trace: `set = {5, 10, 15, 20, 30}

  lower_bound(15)  → 15   (first ≥ 15, exact hit)
  upper_bound(15)  → 20   (first > 15)
  lower_bound(13)  → 15   (first ≥ 13, x absent)
  upper_bound(13)  → 15   (same, since x absent)
  lower_bound(99)  → end  (nothing is ≥ 99)

  predecessor of 13:
    it = lower_bound(13)   → 15
    if (it == begin()) none
    else --it              → 10   ✓

  range [10, 20]:
    from lower_bound(10) → 10
    to   upper_bound(20) → 30 (exclusive)
    gives 10, 15, 20`,
        aside:
          "Always check that lower_bound is not begin() before decrementing it. Stepping back from the first element is undefined behaviour in C++ and will crash or corrupt silently rather than returning something sensible.",
      },
      {
        heading: "Where it is the right answer",
        body: [
          "Interval booking. My Calendar accepts a booking only if it overlaps nothing existing. With an ordered map keyed by start time, you find the booking just before the new one and the one just after, and check only those two — O(log n) instead of scanning them all.",
          "Nearest-value queries over a changing set. Contains Duplicate III asks whether any two nearby indices hold values within a threshold. Maintain an ordered set of the window's values and, for each new value, ask for the first element at or above value minus threshold. A hash set cannot express that question.",
          "Sliding window median. An ordered container gives you the middle element of a moving window, which is only meaningful if the container is sorted.",
          "Frequency tables where you need the extremes. An ordered map from count to values lets you read the most and least frequent in O(log n) while updates continue, which a hash map cannot do without a full scan.",
        ],
      },
      {
        heading: "The Python situation",
        body: [
          "Python has no built-in ordered map or set, and this catches people out. dict preserves insertion order from 3.7 onwards, but insertion order is not sorted order and gives you no lower_bound.",
          "Three practical routes. If the data is static, keep a sorted list and use the bisect module — bisect_left and bisect_right are exactly lower_bound and upper_bound, in O(log n). Insertion into the list is O(n) because of the shifting, so this suits many queries and few changes.",
          "If the data changes constantly, install sortedcontainers and use SortedList, SortedDict or SortedSet. It is a well-regarded pure-Python library implemented over lists of lists, with effectively O(log n) operations and excellent constants, and it is available on most competitive judges.",
          "If you cannot install anything and need mutation, a heap covers you when you only want the extreme, and a Fenwick tree over compressed values covers rank and range-count queries. Reach for those before writing a balanced tree by hand.",
        ],
      },
      {
        heading: "Multiset and duplicate keys",
        body: [
          "A plain ordered set holds distinct keys. When you need duplicates — a sliding window that can contain the same value twice — you need a multiset, and how you get one varies by language.",
          "C++ has std::multiset directly. The trap is erase: calling erase with a value removes every copy, which is almost never what you want. Erase by iterator instead, using find to get one, and you remove a single occurrence.",
          "Java has no multiset in the standard library. The idiom is a TreeMap from value to count: increment on insert, decrement on removal, and remove the key when the count hits zero. Python's SortedList permits duplicates directly, which makes it simpler than either.",
        ],
      },
      {
        heading: "Choosing between the three containers",
        body: [
          "Hash set or map: you only ask about exact membership or exact key lookup and never need order. This is the default and the fastest option when it fits.",
          "Ordered set or map: you need nearest, predecessor, successor, range, minimum, maximum, or sorted iteration, and the data changes. Accept O(log n) for capabilities hashing does not have.",
          "Sorted array with binary search: you need those same ordered queries but the data is static, or built once and then only read. It beats the tree on both memory and cache behaviour, and lower_bound on a vector is O(log n) just the same. Only give it up when you must insert into the middle repeatedly.",
        ],
      },
    ],
    useCases: [
      "Finding the nearest key at or above a value, or the largest key below it, in a changing collection.",
      "Range queries — every key between two bounds — without scanning the whole container.",
      "Interval scheduling and calendar booking, where you check only the neighbouring intervals.",
      "Maintaining a running median or any order statistic over a sliding window.",
      "Iterating a changing collection in sorted order without re-sorting each time.",
      "Any problem where you would otherwise re-sort inside a loop.",
    ],
    pitfalls: [
      "Decrementing lower_bound without checking it is not already at the beginning — undefined behaviour, and the most common crash in this topic.",
      "In C++, erasing from a multiset by value rather than by iterator, which removes every copy instead of one.",
      "Reaching for it when a hash container would do. O(log n) with a tree's pointer chasing is meaningfully slower when you never use the ordering.",
      "Expecting Python's dict or set to be ordered in the sorted sense. Insertion order is not sorted order, and there is no bisect on either.",
      "Inserting into the middle of a sorted list repeatedly in Python. Each insertion is O(n) from the shifting; use SortedList if the data changes often.",
      "Mutating a key already in the container, which breaks the ordering invariant and corrupts every subsequent search.",
    ],
    code: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

// std::set is a balanced BST - sorted, O(log n), no adversarial worst case.
void orderedSetBasics() {
    set<int> s = {5, 10, 15, 20, 30};

    auto lo = s.lower_bound(13);        // first >= 13  -> 15
    auto hi = s.upper_bound(15);        // first >  15  -> 20

    // Predecessor: step back from lower_bound, but CHECK begin() first.
    auto it = s.lower_bound(13);
    if (it != s.begin()) {
        --it;
        cout << "predecessor of 13: " << *it << '\\n';   // 10
    }

    cout << "min " << *s.begin() << " max " << *s.rbegin() << '\\n';

    for (auto p = s.lower_bound(10); p != s.upper_bound(20); ++p)
        cout << *p << ' ';              // 10 15 20  - the range [10, 20]
}

// My Calendar: accept a booking only if it overlaps nothing.
// Check the neighbour on each side - O(log n) instead of a full scan.
struct MyCalendar {
    map<int,int> bookings;              // start -> end

    bool book(int start, int end) {
        auto next = bookings.lower_bound(start);   // first booking at/after
        if (next != bookings.end() && next->first < end) return false;
        if (next != bookings.begin()) {
            auto prev = std::prev(next);
            if (prev->second > start) return false;  // previous overruns
        }
        bookings[start] = end;
        return true;
    }
};

// Contains Duplicate III: any two indices within k whose values differ
// by at most t? The ordered set makes the query expressible at all.
bool nearbyAlmostDuplicate(const vector<int>& nums, int k, long long t) {
    set<long long> window;
    for (int i = 0; i < (int)nums.size(); ++i) {
        auto it = window.lower_bound((long long)nums[i] - t);
        if (it != window.end() && *it <= (long long)nums[i] + t) return true;
        window.insert(nums[i]);
        if ((int)window.size() > k) window.erase(nums[i - k]);
    }
    return false;
}

// multiset: erase by ITERATOR to remove one copy.
// erase(value) removes them all, which is almost never intended.
void multisetCare() {
    multiset<int> ms = {5, 5, 5, 9};
    ms.erase(ms.find(5));               // one copy    -> {5, 5, 9}
    ms.erase(5);                        // ALL of them -> {9}
}`,
      python: `# Python has no built-in ordered map or set. Three practical routes.

# 1. STATIC data: a sorted list + bisect. bisect_left is lower_bound,
#    bisect_right is upper_bound. Query O(log n), insert O(n).
from bisect import bisect_left, bisect_right, insort

def bisect_basics():
    arr = [5, 10, 15, 20, 30]

    lo = bisect_left(arr, 13)          # first index with value >= 13 -> 2
    hi = bisect_right(arr, 15)         # first index with value >  15 -> 3

    # Predecessor: step back, but check the index first.
    i = bisect_left(arr, 13)
    predecessor = arr[i - 1] if i > 0 else None      # 10

    section = arr[bisect_left(arr, 10):bisect_right(arr, 20)]  # [10, 20]

    insort(arr, 12)                    # keeps it sorted, but O(n) to shift
    return lo, hi, predecessor, section

# 2. CHANGING data: sortedcontainers. Pure Python, on most judges,
#    effectively O(log n) for add and remove.
try:
    from sortedcontainers import SortedList

    def sliding_window_median(nums, k):
        window = SortedList(nums[:k])
        out = []
        for i in range(k, len(nums) + 1):
            mid = k // 2
            out.append(window[mid] if k % 2
                       else (window[mid - 1] + window[mid]) / 2)
            if i < len(nums):
                window.remove(nums[i - k])   # duplicates allowed, so no
                window.add(nums[i])          # count map is needed
        return out
except ImportError:
    pass

# 3. NOTHING INSTALLABLE: a heap covers "only the extreme matters";
#    a Fenwick tree over compressed values covers rank and range counts.

# My Calendar with bisect over parallel lists.
class MyCalendar:
    def __init__(self):
        self.starts = []
        self.ends = []

    def book(self, start, end):
        i = bisect_right(self.starts, start)
        if i > 0 and self.ends[i - 1] > start:
            return False               # previous booking overruns
        if i < len(self.starts) and self.starts[i] < end:
            return False               # next booking starts too early
        self.starts.insert(i, start)
        self.ends.insert(i, end)
        return True`,
      typescript: `// JavaScript has no ordered map or set either. Map and Set preserve
// INSERTION order, which is not sorted order and gives no lower_bound.

// For static data, binary search over a sorted array is the direct
// equivalent of lower_bound / upper_bound.
function lowerBound(arr: number[], target: number): number {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < target) lo = mid + 1;      // strictly less -> discard
    else hi = mid;
  }
  return lo;                                   // first index with arr[i] >= x
}

function upperBound(arr: number[], target: number): number {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= target) lo = mid + 1;     // <= -> discard
    else hi = mid;
  }
  return lo;                                   // first index with arr[i] > x
}

function orderedQueries(sorted: number[], x: number) {
  const lo = lowerBound(sorted, x);
  return {
    firstAtOrAbove: lo < sorted.length ? sorted[lo] : null,
    predecessor: lo > 0 ? sorted[lo - 1] : null,     // check lo > 0 first
    countEqual: upperBound(sorted, x) - lo,
    rangeAToB: (a: number, b: number) =>
      sorted.slice(lowerBound(sorted, a), upperBound(sorted, b)),
  };
}

// My Calendar. splice is O(n), which is fine at moderate sizes; a
// balanced-tree library is the answer beyond that.
class MyCalendar {
  private starts: number[] = [];
  private ends: number[] = [];

  book(start: number, end: number): boolean {
    const i = upperBound(this.starts, start);
    if (i > 0 && this.ends[i - 1] > start) return false;
    if (i < this.starts.length && this.starts[i] < end) return false;
    this.starts.splice(i, 0, start);
    this.ends.splice(i, 0, end);
    return true;
  }
}`,
    },
    problems: {
      easy: [
        { name: "Two Sum II - Input Array Is Sorted", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { name: "Search Insert Position", url: "https://leetcode.com/problems/search-insert-position/" },
      ],
      medium: [
        { name: "My Calendar I", url: "https://leetcode.com/problems/my-calendar-i/" },
        { name: "My Calendar II", url: "https://leetcode.com/problems/my-calendar-ii/" },
        { name: "Contains Duplicate III", url: "https://leetcode.com/problems/contains-duplicate-iii/" },
        { name: "Data Stream as Disjoint Intervals", url: "https://leetcode.com/problems/data-stream-as-disjoint-intervals/" },
        { name: "Exam Room", url: "https://leetcode.com/problems/exam-room/" },
        { name: "Advantage Shuffle", url: "https://leetcode.com/problems/advantage-shuffle/" },
      ],
      hard: [
        { name: "Sliding Window Median", url: "https://leetcode.com/problems/sliding-window-median/" },
        { name: "Count of Smaller Numbers After Self", url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" },
        { name: "Range Module", url: "https://leetcode.com/problems/range-module/" },
        { name: "Falling Squares", url: "https://leetcode.com/problems/falling-squares/" },
        { name: "My Calendar III", url: "https://leetcode.com/problems/my-calendar-iii/" },
      ],
    },
  },
];
