/**
 * Enrichment batch 13 — Stage 6, part two: hashing, bitmask DP, design.
 * Completes stage 6.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "string-algorithms-rabinkarp": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A rolling hash sliding across text, removing the leading character and appending the trailing one in constant time">
  <text x="0" y="14" class="dg-title">Rolling hash &#8212; each window costs O(1), not O(m)</text>

  <g transform="translate(30,34)">
    <rect x="-4" y="-4" width="170" height="34" rx="4" class="dg-cell-live"/>
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="26"  y="18" text-anchor="middle">A</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="82"  y="18" text-anchor="middle">B</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="138" y="18" text-anchor="middle">C</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell-idle"/><text x="194" y="18" text-anchor="middle" class="dg-index">D</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-idle"/><text x="250" y="18" text-anchor="middle" class="dg-index">E</text>
    <text x="300" y="18" class="dg-note">hash("ABC")</text>
  </g>

  <g transform="translate(30,84)">
    <rect x="52" y="-4" width="170" height="34" rx="4" class="dg-cell-mark"/>
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell-out"/><text x="26"  y="18" text-anchor="middle">A</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="82"  y="18" text-anchor="middle">B</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell"/><text x="138" y="18" text-anchor="middle">C</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="194" y="18" text-anchor="middle">D</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-idle"/><text x="250" y="18" text-anchor="middle" class="dg-index">E</text>
    <text x="300" y="18" class="dg-note">hash("BCD")</text>
    <text x="300" y="-8" class="dg-bad">&#8722; A&#183;base&#178;</text>
    <text x="380" y="-8" class="dg-good">&#215; base, + D</text>
  </g>

  <line x1="0" y1="150" x2="700" y2="150" class="dg-guide"/>

  <g transform="translate(0,166)">
    <rect x="0" y="0" width="330" height="120" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-note">hash(s) = s&#8320;&#183;base^(m&#8722;1) + s&#8321;&#183;base^(m&#8722;2)</text>
    <text x="14" y="44" class="dg-note">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;+ &#8230; + s&#8331;&#8331;&#8321;&#160;&#160;&#160;(mod m)</text>
    <text x="14" y="76" class="dg-note">roll: (h &#8722; out&#183;base^(m&#8722;1))&#183;base + in</text>
    <text x="14" y="104" class="dg-label">a polynomial in base, evaluated mod m</text>

    <rect x="360" y="0" width="330" height="120" rx="4" class="dg-cell-out"/>
    <text x="374" y="24" class="dg-bad">Equal hashes are not equal strings</text>
    <text x="374" y="52" class="dg-note">Always confirm a hit with a direct</text>
    <text x="374" y="72" class="dg-note">character comparison.</text>
    <text x="374" y="100" class="dg-label">Skipping it is fast and wrong.</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "Hashing a window instead of comparing it",
        body: [
          "Naive substring search compares the pattern against every window of the text, at O(m) per window and O(n·m) overall. Rabin-Karp replaces most of those comparisons with a single integer comparison: hash the pattern once, hash each window, and only compare characters when the hashes agree.",
          "That would be no cheaper if hashing each window cost O(m). The insight is that consecutive windows overlap almost entirely, so the hash can be updated rather than recomputed — remove the contribution of the departing character, shift, and add the arriving one. That is O(1) per window.",
          "The result is O(n + m) expected time. Not guaranteed: if hashes collide often, you fall back to character comparison and drift toward O(n·m). With a well-chosen base and modulus that is vanishingly unlikely, but it is a genuine difference from KMP, which has no bad case at all.",
        ],
      },
      {
        heading: "The polynomial hash",
        body: [
          "Treat the string as a number written in some base. The character at position 0 contributes its value times base to the power m-1, the next times base to the m-2, and so on, all reduced modulo a large prime.",
          "Choosing the parameters matters. The base should exceed the alphabet size — 31 or 131 for lowercase letters, 256 for arbitrary bytes — and is conventionally prime. The modulus should be a large prime, typically around 10⁹ so that the intermediate products fit in 64 bits.",
          "The rolling step follows directly from the formula. Subtract the leading character times base to the m-1, multiply the remainder by base to shift everything up a position, then add the new character. Precompute that base power once rather than recomputing it every step.",
        ],
        trace: `base 10, no modulus, pattern length 3

  "123"  →  1·100 + 2·10 + 3      = 123
  roll to "234":
    remove leading:  123 − 1·100  =  23
    shift:            23 · 10     = 230
    add trailing:    230 + 4      = 234   ✓

  Real hashes use a large prime base and
  modulus so that unrelated strings do not
  collide, but the mechanics are identical.`,
      },
      {
        heading: "Collisions, and the check you must not skip",
        body: [
          "Two different strings can share a hash. The whole approach relies on that being rare, not impossible, so a hash match is a candidate rather than a confirmation.",
          "Always verify a hit by comparing the actual characters. It costs O(m) but happens rarely, so the expected total stays linear. Skipping it produces a program that is fast and occasionally wrong — the worst possible combination, because it passes casual testing.",
          "The probability of a collision between two specific strings is roughly one over the modulus. With around n windows, the chance of any collision is about n over the modulus, so a modulus near 10⁹ and a text of 10⁶ gives roughly a one-in-a-thousand chance of even one false candidate — which the verification then rejects anyway.",
        ],
        aside:
          "Anti-hash tests exist. Competitive judges sometimes include inputs crafted to collide against the common base-31, mod-10⁹+7 choice. Randomising the base at runtime, or using two independent moduli, defeats them.",
      },
      {
        heading: "Double hashing and the birthday problem",
        body: [
          "When you compare many strings against each other rather than against one pattern, the collision maths gets worse. Comparing k strings pairwise means k² chances to collide, so by the birthday paradox a single 10⁹ modulus becomes risky around k of 10⁵.",
          "The standard defence is two independent hashes with different bases and moduli, treated as a pair. The effective modulus becomes their product, around 10¹⁸, which puts collisions back beyond reach. It costs a second set of arithmetic and is cheap insurance whenever you are storing hashes in a set rather than checking against one target.",
          "This is where Rabin-Karp turns into a general technique rather than a search algorithm: precompute prefix hashes for a string, and you can compare any two substrings in O(1) by combining them. That is what makes it the tool for problems like longest duplicate substring, where the search is a binary search over length with a hash set at each step.",
        ],
      },
      {
        heading: "Where it beats KMP",
        body: [
          "Multiple patterns. Hash every pattern into a set, then roll a single window across the text and check membership. One pass finds all of them, whereas KMP would need a separate run per pattern or the more elaborate Aho-Corasick.",
          "Substring comparison. With prefix hashes precomputed, asking whether two arbitrary substrings are equal is O(1). No other simple technique gives that, and it turns a family of otherwise-quadratic problems linear.",
          "Two-dimensional search. Hashing rows and then hashing the row hashes finds a rectangular pattern in a grid, which extends naturally in a way KMP does not.",
          "KMP remains preferable for the plain single-pattern search: deterministic, no parameters to tune, no collision risk. Choose Rabin-Karp when the problem's shape rewards being able to hash and compare arbitrary substrings cheaply.",
        ],
      },
      {
        heading: "The practical traps",
        body: [
          "Overflow. In C++, multiplying two values near 10⁹ overflows a 64-bit integer only after the multiplication, so reduce modulo immediately after each multiply. In JavaScript, ordinary numbers lose precision past 2⁵³, so a modulus near 10⁹ combined with a base multiply already exceeds safe range — use BigInt or a smaller modulus.",
          "Negative values after subtraction. Removing the leading character can drive the intermediate below zero, and the modulo of a negative is negative in most languages. Add the modulus back before reducing.",
          "Recomputing the base power inside the loop. It is a constant; compute it once with fast exponentiation before the scan begins.",
          "Using the language's built-in string hash. It is not rolling, so it cannot be updated incrementally, and in some runtimes it is randomised per process — which makes results irreproducible between runs.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Single rolling hash. Randomise the base so that crafted anti-hash
// tests cannot target a fixed choice.
struct RollingHash {
    static constexpr long long MOD = 1'000'000'007;
    long long base;

    RollingHash() {
        mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
        base = 131 + (long long)(rng() % 100) * 2;   // random odd-ish base
    }

    long long hashOf(const string& s) const {
        long long h = 0;
        for (char c : s) h = (h * base + c) % MOD;
        return h;
    }

    long long power(long long exp) const {
        long long result = 1, b = base;
        while (exp) { if (exp & 1) result = result * b % MOD; b = b * b % MOD; exp >>= 1; }
        return result;
    }
};

// Search. A hash match is a CANDIDATE - always confirm with a real
// comparison, or the program is fast and occasionally wrong.
vector<int> rabinKarp(const string& text, const string& pattern) {
    int n = (int)text.size(), m = (int)pattern.size();
    if (m > n || m == 0) return {};

    RollingHash rh;
    const long long MOD = RollingHash::MOD;
    long long highPower = rh.power(m - 1);       // computed ONCE, not per step

    long long target = rh.hashOf(pattern);
    long long window = rh.hashOf(text.substr(0, m));

    vector<int> matches;
    for (int i = 0; ; ++i) {
        if (window == target && text.compare(i, m, pattern) == 0)
            matches.push_back(i);                // verified, not assumed

        if (i + m >= n) break;

        // Roll: drop the leading char, shift up, add the trailing one.
        window = (window - text[i] * highPower % MOD + MOD) % MOD;  // +MOD:
        window = (window * rh.base + text[i + m]) % MOD;   // subtraction can
    }                                                       // go negative
    return matches;
}

// DOUBLE HASHING. Comparing k strings pairwise gives k^2 collision
// chances, so one 1e9 modulus becomes risky around k = 1e5. Two
// independent hashes push the effective modulus to ~1e18.
struct DoubleHash {
    static constexpr long long M1 = 1'000'000'007, M2 = 998'244'353;
    static constexpr long long B1 = 131, B2 = 137;

    vector<long long> prefix1, prefix2, pow1, pow2;

    explicit DoubleHash(const string& s) {
        int n = (int)s.size();
        prefix1.assign(n + 1, 0); prefix2.assign(n + 1, 0);
        pow1.assign(n + 1, 1);    pow2.assign(n + 1, 1);

        for (int i = 0; i < n; ++i) {
            prefix1[i + 1] = (prefix1[i] * B1 + s[i]) % M1;
            prefix2[i + 1] = (prefix2[i] * B2 + s[i]) % M2;
            pow1[i + 1] = pow1[i] * B1 % M1;
            pow2[i + 1] = pow2[i] * B2 % M2;
        }
    }

    // Any substring's hash in O(1) - this is what makes prefix hashes
    // more than a search technique.
    pair<long long,long long> substring(int lo, int len) const {
        long long h1 = (prefix1[lo + len] - prefix1[lo] * pow1[len] % M1 + M1) % M1;
        long long h2 = (prefix2[lo + len] - prefix2[lo] * pow2[len] % M2 + M2) % M2;
        return {h1, h2};
    }

    bool substringsEqual(int a, int b, int len) const {
        return substring(a, len) == substring(b, len);
    }
};

// MULTIPLE PATTERNS in one pass - hash them all into a set, then roll a
// single window. KMP would need a run per pattern.
vector<pair<int,string>> findAny(const string& text,
                                 const vector<string>& patterns) {
    if (patterns.empty()) return {};
    int m = (int)patterns[0].size();             // assume equal lengths
    RollingHash rh;
    const long long MOD = RollingHash::MOD;

    unordered_map<long long, vector<const string*>> byHash;
    for (const auto& p : patterns) byHash[rh.hashOf(p)].push_back(&p);

    long long highPower = rh.power(m - 1);
    long long window = rh.hashOf(text.substr(0, m));

    vector<pair<int,string>> found;
    for (int i = 0; i + m <= (int)text.size(); ++i) {
        auto it = byHash.find(window);
        if (it != byHash.end())
            for (const string* p : it->second)
                if (text.compare(i, m, *p) == 0) found.push_back({i, *p});

        if (i + m < (int)text.size()) {
            window = (window - text[i] * highPower % MOD + MOD) % MOD;
            window = (window * rh.base + text[i + m]) % MOD;
        }
    }
    return found;
}

// LONGEST DUPLICATE SUBSTRING - binary search the length, hash every
// window of that length, look for a repeat. O(n log n) expected.
string longestDuplicateSubstring(const string& s) {
    DoubleHash dh(s);
    int n = (int)s.size(), lo = 1, hi = n - 1, bestStart = 0, bestLen = 0;

    while (lo <= hi) {
        int len = lo + (hi - lo) / 2;
        set<pair<long long,long long>> seen;
        int foundAt = -1;
        for (int i = 0; i + len <= n; ++i)
            if (!seen.insert(dh.substring(i, len)).second) { foundAt = i; break; }

        if (foundAt != -1) {                     // a duplicate of this length
            bestStart = foundAt; bestLen = len;  // exists - try longer
            lo = len + 1;
        } else {
            hi = len - 1;
        }
    }
    return s.substr(bestStart, bestLen);
}`,
  },

  "dp-bitmask": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A subset encoded as the bits of an integer, with the state space growth that caps the technique around twenty elements">
  <text x="0" y="14" class="dg-title">mask 1101&#8322; = 13 &#8212; items 0, 2 and 3 are used</text>

  <g transform="translate(40,34)">
    <rect x="0"   y="0" width="56" height="30" rx="3" class="dg-cell-hit"/><text x="28"  y="20" text-anchor="middle">1</text>
    <rect x="60"  y="0" width="56" height="30" rx="3" class="dg-cell-hit"/><text x="88"  y="20" text-anchor="middle">1</text>
    <rect x="120" y="0" width="56" height="30" rx="3" class="dg-cell-idle"/><text x="148" y="20" text-anchor="middle" class="dg-index">0</text>
    <rect x="180" y="0" width="56" height="30" rx="3" class="dg-cell-hit"/><text x="208" y="20" text-anchor="middle">1</text>

    <text x="28"  y="50" text-anchor="middle" class="dg-index">bit 3</text>
    <text x="88"  y="50" text-anchor="middle" class="dg-index">bit 2</text>
    <text x="148" y="50" text-anchor="middle" class="dg-index">bit 1</text>
    <text x="208" y="50" text-anchor="middle" class="dg-index">bit 0</text>

    <text x="280" y="20" class="dg-note">one integer IS the subset, so it can</text>
    <text x="280" y="40" class="dg-note">index an array directly</text>
  </g>

  <line x1="0" y1="104" x2="700" y2="104" class="dg-guide"/>

  <g transform="translate(0,120)">
    <rect x="0" y="0" width="330" height="126" rx="4" class="dg-cell-live"/>
    <text x="14" y="24" class="dg-note">test i&#160;&#160;&#160;&#160;&#160;mask &amp; (1 &lt;&lt; i)</text>
    <text x="14" y="48" class="dg-note">add i&#160;&#160;&#160;&#160;&#160;&#160;mask | (1 &lt;&lt; i)</text>
    <text x="14" y="72" class="dg-note">remove i&#160;&#160;&#160;mask &amp; ~(1 &lt;&lt; i)</text>
    <text x="14" y="96" class="dg-note">count used&#160;popcount(mask)</text>
    <text x="14" y="118" class="dg-label">set operations become single instructions</text>

    <rect x="360" y="0" width="330" height="126" rx="4" class="dg-cell-out"/>
    <text x="374" y="24" class="dg-bad">the hard ceiling</text>
    <text x="374" y="50" class="dg-note">n = 15&#160;&#160;&#8594;&#160;&#160;&#160;&#160;&#160;32 768 states</text>
    <text x="374" y="70" class="dg-note">n = 20&#160;&#160;&#8594;&#160;&#160;1 048 576 states</text>
    <text x="374" y="90" class="dg-note">n = 25&#160;&#160;&#8594;&#160;&#160;33 million states</text>
    <text x="374" y="114" class="dg-label">n above ~20 is where this stops working</text>
  </g>

  <text x="0" y="280" class="dg-note">A constraint of n &#8804; 20 in a problem statement is very often the hint that the state is a subset.</text>
  <text x="0" y="304" class="dg-note">TSP: O(2&#8319; &#183; n&#178;) beats O(n!) enormously &#8212; 12 million operations at n = 15, against 1.3 trillion.</text>
</svg>`,
    walkthrough: [
      {
        heading: "When the state is a set",
        body: [
          "Some problems have a subset as their natural state: which cities have I visited, which workers have been assigned, which items are already used. Storing that as an actual set object makes it unusable as a DP key — you cannot index an array with a hash set, and hashing one per lookup is slow.",
          "Encoding it as the bits of an integer solves both problems at once. Subset number 13 is 1101 in binary, meaning elements 0, 2 and 3 are present. That integer indexes an array directly, and every set operation becomes a single machine instruction.",
          "The signal in a problem statement is a small n with an exponential-looking question. When constraints say n is at most 15 or 20 and the problem asks about orderings or assignments, a subset state is very often what is intended — those bounds are chosen precisely because 2ⁿ is tractable there and nowhere higher.",
        ],
      },
      {
        heading: "The operations you need",
        body: [
          "Testing membership is mask AND (1 shifted left by i), which is non-zero exactly when element i is in the set. Adding an element is OR with that same bit. Removing it is AND with the complement. Counting how many elements are used is the population count, which every language exposes as a built-in.",
          "Iterating every subset of n elements is a plain loop from 0 to 2ⁿ minus 1. The bits of the loop counter are the subset, so no separate generation step is needed at all.",
          "One less obvious idiom is iterating every subset of a particular mask, rather than of the whole universe. The trick is sub = (sub - 1) AND mask, starting from the mask itself. Summed over all masks that visits 3ⁿ pairs rather than 4ⁿ, which is the difference between feasible and not for subset-partition problems.",
        ],
        trace: `Enumerating submasks of 1011₂

  sub = 1011                    {0,1,3}
  sub = (1011−1) & 1011 = 1010  {1,3}
  sub = (1010−1) & 1011 = 1001  {0,3}
  sub = (1001−1) & 1011 = 1000  {3}
  sub = (1000−1) & 1011 = 0011  {0,1}
  sub = (0011−1) & 1011 = 0010  {1}
  sub = (0010−1) & 1011 = 0001  {0}
  sub = (0001−1) & 1011 = 0000  stop

Every subset, exactly once, no duplicates.`,
      },
      {
        heading: "Travelling salesman, the canonical case",
        body: [
          "Visit every city exactly once and return to the start, minimising total distance. Trying every ordering is O(n!) — at n = 15 that is 1.3 trillion permutations.",
          "The bitmask formulation defines dp[mask][i] as the cheapest route that has visited exactly the cities in mask and currently sits at city i. The transition extends to any unvisited city j, giving dp[mask | bit(j)][j] as a candidate.",
          "That is O(2ⁿ · n²) — around 12 million operations at n = 15. Still exponential, but five orders of magnitude better, and the reason is that the DP does not care in which order the visited set was accumulated, only which cities are in it and where you are now. Every permutation reaching the same (set, position) pair collapses into one state.",
          "Do not forget the return leg. The answer is the minimum over all final cities of dp[full][i] plus the distance from i back to the start.",
        ],
      },
      {
        heading: "Assignment problems, and dropping a dimension",
        body: [
          "Matching n workers to n tasks optimally is the other big family. The naive state would be dp[mask][worker], but the second dimension is redundant: if mask records which tasks are taken, then the number of tasks taken is the number of workers already placed.",
          "So popcount(mask) tells you which worker you are assigning next, and the state collapses to a single dimension of size 2ⁿ. That halves the memory and simplifies the loop, and recognising the redundancy is what separates a working solution from an elegant one.",
          "The same reduction applies broadly: whenever one component of your state is determined by another, drop it. Fair Distribution of Cookies, Maximum Compatibility Score, and Number of Ways to Wear Different Hats all use this shape, sometimes iterating over people and sometimes over hats depending on which universe is smaller — since the exponential dimension should always be the smaller one.",
        ],
        aside:
          "Choose which side gets the bitmask. With 40 people and 10 hats, iterating over hats with a mask over people would be 2⁴⁰ states. Flip it: mask over hats, iterate people — 2¹⁰ states. The exponential dimension must be the small one.",
      },
      {
        heading: "Iteration order and the language traps",
        body: [
          "Masks must be processed in increasing order, and this works for free because adding a bit always increases the integer value. So a plain ascending loop guarantees that every state a transition reads has already been computed.",
          "Operator precedence bites here. In C-like languages, AND binds more loosely than the comparison operators, so `mask & 1 << i == 0` does not do what it looks like. Parenthesise every bitwise expression.",
          "JavaScript coerces bitwise operands to 32-bit signed integers, so 1 shifted left by 31 is negative and anything wider silently truncates. For n up to about 30 it works; beyond that use BigInt or restructure.",
          "In C++, use 1LL when the shift index can reach 31 or more, since shifting a plain int by its own width is undefined behaviour rather than zero.",
        ],
      },
      {
        heading: "The ceiling, and what to do past it",
        body: [
          "Two to the twentieth is about a million states, which is comfortable. Two to the twenty-fifth is 33 million, which is borderline on memory. Two to the thirtieth is a billion, which is out of reach. The technique has a hard ceiling around n of 20, and no amount of optimisation moves it much.",
          "If n is larger, the state is not really a subset — look for a formulation where it is a count, a position, or a small tuple. Many problems that look like they need to track which items are used actually only need how many, which collapses the state enormously.",
          "Meet in the middle is the other escape: split the elements into two halves of n/2, enumerate all 2^(n/2) subsets of each, and combine. That takes 2ⁿ down to roughly 2^(n/2) times a log factor, pushing the practical limit to around n = 40. It applies when the two halves can be combined by sorting or hashing rather than needing full interaction.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// TRAVELLING SALESMAN. dp[mask][i] = cheapest route covering exactly
// the cities in mask, currently at city i. O(2^n * n^2) beats O(n!)
// because every ordering reaching the same (set, position) collapses.
long long tsp(const vector<vector<int>>& dist) {
    int n = (int)dist.size(), FULL = (1 << n) - 1;
    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> dp(1 << n, vector<long long>(n, INF));
    dp[1][0] = 0;                                // start at city 0

    for (int mask = 1; mask <= FULL; ++mask) {   // ascending: adding a bit
        for (int i = 0; i < n; ++i) {            // always increases the value,
            if (dp[mask][i] == INF) continue;    // so dependencies are ready
            if (!(mask & (1 << i))) continue;

            for (int j = 0; j < n; ++j) {
                if (mask & (1 << j)) continue;   // already visited
                int next = mask | (1 << j);
                dp[next][j] = min(dp[next][j], dp[mask][i] + dist[i][j]);
            }
        }
    }

    long long best = INF;
    for (int i = 0; i < n; ++i)
        best = min(best, dp[FULL][i] + dist[i][0]);   // the RETURN leg
    return best;
}

// ASSIGNMENT. popcount(mask) tells us which worker is next, so the
// second dimension is redundant - one array of size 2^n suffices.
long long minAssignmentCost(const vector<vector<int>>& cost) {
    int n = (int)cost.size();
    const long long INF = LLONG_MAX / 4;
    vector<long long> dp(1 << n, INF);
    dp[0] = 0;

    for (int mask = 0; mask < (1 << n); ++mask) {
        if (dp[mask] == INF) continue;
        int worker = __builtin_popcount(mask);   // implied, not stored
        if (worker == n) continue;

        for (int task = 0; task < n; ++task) {
            if (mask & (1 << task)) continue;
            int next = mask | (1 << task);
            dp[next] = min(dp[next], dp[mask] + cost[worker][task]);
        }
    }
    return dp[(1 << n) - 1];
}

// SUBSET PARTITION - iterate every submask of every mask. Summed over
// all masks this is O(3^n), not O(4^n), because each (mask, submask)
// pair is visited once rather than every pair of masks.
int minGroups(int n, const vector<int>& valid) {   // valid[mask] = usable?
    const int INF = 1e9;
    vector<int> dp(1 << n, INF);
    dp[0] = 0;

    for (int mask = 1; mask < (1 << n); ++mask) {
        for (int sub = mask; sub; sub = (sub - 1) & mask) {   // the idiom
            if (!valid[sub]) continue;
            if (dp[mask ^ sub] != INF)
                dp[mask] = min(dp[mask], dp[mask ^ sub] + 1);
        }
    }
    return dp[(1 << n) - 1];
}

// Precomputed popcount for every mask, in one linear pass.
vector<int> popcountTable(int n) {
    vector<int> pc(1 << n, 0);
    for (int i = 1; i < (1 << n); ++i) pc[i] = pc[i >> 1] + (i & 1);
    return pc;
}

// CHOOSING THE SIDE. With 40 people and 10 hats, masking people would
// be 2^40 states. Mask the HATS instead and iterate people: 2^10.
// The exponential dimension must always be the smaller universe.
long long waysToWearHats(const vector<vector<int>>& hatsPerPerson) {
    constexpr long long MOD = 1'000'000'007;
    int people = (int)hatsPerPerson.size(), HATS = 40;

    vector<vector<int>> peopleWhoWant(HATS + 1);
    for (int p = 0; p < people; ++p)
        for (int hat : hatsPerPerson[p]) peopleWhoWant[hat].push_back(p);

    vector<long long> dp(1 << people, 0);
    dp[0] = 1;                                   // mask over PEOPLE (small)

    for (int hat = 1; hat <= HATS; ++hat) {      // iterate hats (large)
        vector<long long> next = dp;             // this hat goes unused
        for (int mask = 0; mask < (1 << people); ++mask) {
            if (dp[mask] == 0) continue;
            for (int p : peopleWhoWant[hat]) {
                if (mask & (1 << p)) continue;
                int taken = mask | (1 << p);
                next[taken] = (next[taken] + dp[mask]) % MOD;
            }
        }
        dp = move(next);
    }
    return dp[(1 << people) - 1];
}`,
  },

  "design-lru-cache": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A hash map pointing into a doubly linked list, with the least recently used node at the tail about to be evicted">
  <defs>
    <marker id="lru-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" class="dg-arrow"/>
    </marker>
  </defs>

  <text x="0" y="14" class="dg-title">Map gives O(1) lookup &#183; list gives O(1) reordering &#183; neither alone can do both</text>

  <g transform="translate(0,36)">
    <text x="0" y="12" class="dg-label">map</text>
    <rect x="0" y="20"  width="96" height="24" rx="3" class="dg-cell"/><text x="48" y="37" text-anchor="middle" class="dg-note">A &#8594;</text>
    <rect x="0" y="50"  width="96" height="24" rx="3" class="dg-cell"/><text x="48" y="67" text-anchor="middle" class="dg-note">B &#8594;</text>
    <rect x="0" y="80"  width="96" height="24" rx="3" class="dg-cell"/><text x="48" y="97" text-anchor="middle" class="dg-note">C &#8594;</text>
  </g>

  <g transform="translate(150,60)">
    <rect x="0"   y="0" width="56" height="30" rx="3" class="dg-cell-idle"/><text x="28"  y="20" text-anchor="middle" class="dg-index">head</text>
    <rect x="80"  y="0" width="56" height="30" rx="3" class="dg-cell-hit"/><text x="108" y="20" text-anchor="middle">A</text>
    <rect x="160" y="0" width="56" height="30" rx="3" class="dg-cell"/><text x="188" y="20" text-anchor="middle">C</text>
    <rect x="240" y="0" width="56" height="30" rx="3" class="dg-cell-out"/><text x="268" y="20" text-anchor="middle">B</text>
    <rect x="320" y="0" width="56" height="30" rx="3" class="dg-cell-idle"/><text x="348" y="20" text-anchor="middle" class="dg-index">tail</text>

    <line x1="58"  y1="15" x2="76"  y2="15" class="dg-link" marker-end="url(#lru-a)"/>
    <line x1="138" y1="15" x2="156" y2="15" class="dg-link" marker-end="url(#lru-a)"/>
    <line x1="218" y1="15" x2="236" y2="15" class="dg-link" marker-end="url(#lru-a)"/>
    <line x1="298" y1="15" x2="316" y2="15" class="dg-link" marker-end="url(#lru-a)"/>

    <text x="108" y="52" text-anchor="middle" class="dg-good">most recent</text>
    <text x="268" y="52" text-anchor="middle" class="dg-bad">evicted next</text>
    <text x="28"  y="52" text-anchor="middle" class="dg-label">sentinel</text>
    <text x="348" y="52" text-anchor="middle" class="dg-label">sentinel</text>
  </g>

  <line x1="0" y1="182" x2="700" y2="182" class="dg-guide"/>
  <text x="0" y="206" class="dg-note">get(A) unlinks A and pushes it to the front. A read counts as a use &#8212; skipping that is the usual bug.</text>
  <text x="0" y="232" class="dg-note">On overflow, the node before the tail sentinel is dropped. Nodes store their KEY so the map entry</text>
  <text x="0" y="252" class="dg-note">can be erased too &#8212; storing only the value leaves the map holding a dangling entry.</text>
  <text x="0" y="284" class="dg-note">Sentinels mean the splice code never checks for null, which is where most pointer bugs would live.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Two structures because one is not enough",
        body: [
          "An LRU cache holds a fixed number of entries and evicts the least recently used one on overflow, with both get and put required to be O(1). That requirement is what makes the question interesting, because no single standard structure provides it.",
          "A hash map gives O(1) lookup by key but has no notion of order — it cannot tell you which entry was touched longest ago. A list maintains order but finding an arbitrary entry in it is O(n). Each solves exactly the half the other cannot.",
          "So run both and have them point at each other. The map goes from key to list node, giving O(1) lookup. The list holds the nodes in recency order, giving O(1) removal and reinsertion because you already hold the node. Recognising that composition is the whole answer to the question.",
        ],
      },
      {
        heading: "Why the list must be doubly linked",
        body: [
          "Removing a node from the middle of a list requires updating the node before it. In a singly linked list you would have to walk from the head to find that predecessor, which is O(n) and destroys the guarantee.",
          "A doubly linked node knows both neighbours, so unlinking is four pointer assignments regardless of where it sits. That second pointer is precisely what buys the O(1), and it is worth saying so explicitly when explaining the design.",
          "The other structural choice is sentinels: allocate a permanent head and tail node that never hold data. Every real node then always has both a previous and a next, so the splice code has no null checks at all. Without them, inserting at the front and removing at the back each need special cases, and those cases are where the bugs live.",
        ],
        trace: `unlink(node) with sentinels — no null checks

  node.prev.next = node.next
  node.next.prev = node.prev

pushFront(node)

  node.next      = head.next
  node.prev      = head
  head.next.prev = node
  head.next      = node

Four assignments each, always valid, because
head and tail are guaranteed to exist.`,
      },
      {
        heading: "The two details that break it",
        body: [
          "Nodes must store their key, not just their value. When capacity is exceeded you take the node before the tail sentinel and delete it — but you also have to erase it from the map, and the map is keyed by key. Without the key on the node you cannot find that entry, and the map grows forever while holding a dangling reference.",
          "A read is a use. get must move the accessed node to the front, exactly as put does. Skipping that is the most common correctness bug, and it is invisible on small tests: the cache still returns correct values, it just evicts the wrong entries under pressure.",
          "One more: on put with an existing key, update the node in place and promote it. Inserting a second node for the same key leaves two entries in the list and a map pointing at only one, so the stale node is never reclaimed.",
        ],
        aside:
          "The library shortcuts are worth mentioning but not substituting. Python's OrderedDict and Java's LinkedHashMap are exactly this structure, and C++'s std::list keeps iterators valid across splice so the map can store them directly. Name them, then write the manual version — the manual version is what is being assessed.",
      },
      {
        heading: "LFU, the harder follow-up",
        body: [
          "LFU evicts by access frequency rather than recency, with ties broken by recency. It is a genuine step up because you now need the minimum frequency in O(1) while frequencies keep changing.",
          "The structure is a map from key to value and frequency, plus a map from frequency to a list of the keys at that frequency, plus a running minimum frequency. Each frequency bucket is itself kept in recency order, so it is an LRU list — which is why LFU is properly built on top of LRU rather than beside it.",
          "The minimum frequency updates in exactly two places, and getting them right is the whole difficulty. When a key is accessed and its old bucket becomes empty, the minimum increments if that was the minimum bucket. When a new key is inserted, the minimum resets to 1, because the new entry is now the rarest. No search is ever needed, which is what keeps it O(1).",
        ],
      },
      {
        heading: "What the pattern generalises to",
        body: [
          "The composition idea — a map for lookup welded to a structure for ordering — solves a family of design questions, and recognising it saves deriving each from scratch.",
          "Insert Delete GetRandom in O(1) pairs a map from value to index with a plain array. Removal swaps the target with the last element and pops, which is O(1), and random access is an array index.",
          "All O'one Data Structure pairs a map with a doubly linked list of count buckets, which is structurally the same as LFU. Design Twitter pairs maps with heaps for the timeline merge.",
          "The question to ask when a design problem demands O(1) on operations that seem to need different structures is: which two structures each provide half of it, and what do they store about each other?",
        ],
      },
      {
        heading: "Where it comes from",
        body: [
          "LRU is a real eviction policy, not just an interview exercise. Databases, CPU caches, browser caches and CDNs all need to decide what to discard when memory runs out, and recency is a cheap proxy for future usefulness.",
          "It has known weaknesses worth being able to name. A single scan over a large dataset evicts everything useful in favour of data that will never be touched again — cache pollution. Production systems therefore often use variants: LRU-K considers the last K accesses rather than just the most recent, ARC balances recency against frequency adaptively, and many databases use a clock or second-chance approximation because true LRU's bookkeeping costs more than the accuracy is worth.",
          "Mentioning one of these turns a correct answer into a good one, because it shows you know why the textbook policy is a starting point rather than the end of the discussion.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// LRU: a hash map for O(1) lookup + a doubly linked list for O(1)
// reordering. Neither structure alone can do both.
class LRUCache {
    struct Node {
        int key, value;
        Node *prev = nullptr, *next = nullptr;
        Node(int k, int v) : key(k), value(v) {}
    };

    int capacity;
    unordered_map<int, Node*> map;
    Node *head, *tail;                     // sentinels - no null checks

    void unlink(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void pushFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    explicit LRUCache(int cap) : capacity(cap) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    ~LRUCache() {
        for (Node* p = head; p; ) { Node* n = p->next; delete p; p = n; }
    }

    int get(int key) {
        auto it = map.find(key);
        if (it == map.end()) return -1;
        unlink(it->second);                // a READ counts as a use -
        pushFront(it->second);             // forgetting this is the usual bug
        return it->second->value;
    }

    void put(int key, int value) {
        auto it = map.find(key);
        if (it != map.end()) {             // update in place, then promote
            it->second->value = value;
            unlink(it->second);
            pushFront(it->second);
            return;
        }

        if ((int)map.size() == capacity) {
            Node* lru = tail->prev;        // the node before the tail sentinel
            unlink(lru);
            map.erase(lru->key);           // nodes store their key for THIS
            delete lru;
        }

        Node* node = new Node(key, value);
        map[key] = node;
        pushFront(node);
    }
};

// The idiomatic C++ version: std::list gives O(1) splice, and iterators
// stay valid across splices, so the map can store them directly.
class LRUCacheIdiomatic {
    int capacity;
    list<pair<int,int>> order;                          // front = most recent
    unordered_map<int, list<pair<int,int>>::iterator> map;

public:
    explicit LRUCacheIdiomatic(int cap) : capacity(cap) {}

    int get(int key) {
        auto it = map.find(key);
        if (it == map.end()) return -1;
        order.splice(order.begin(), order, it->second); // O(1), iterator survives
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = map.find(key);
        if (it != map.end()) {
            it->second->second = value;
            order.splice(order.begin(), order, it->second);
            return;
        }
        if ((int)map.size() == capacity) {
            map.erase(order.back().first);
            order.pop_back();
        }
        order.push_front({key, value});
        map[key] = order.begin();
    }
};

// LFU - evict by frequency, ties broken by recency. Each frequency
// bucket is itself an LRU list, and minFreq tracks which bucket to
// evict from so the eviction stays O(1).
class LFUCache {
    int capacity, minFreq = 0;
    unordered_map<int, pair<int,int>> values;           // key -> {value, freq}
    unordered_map<int, list<int>> buckets;              // freq -> keys, LRU order
    unordered_map<int, list<int>::iterator> position;   // key -> its slot

    void touch(int key) {
        auto& [value, freq] = values[key];
        buckets[freq].erase(position[key]);
        if (buckets[freq].empty()) {
            buckets.erase(freq);
            if (minFreq == freq) ++minFreq;             // that bucket is gone
        }
        ++freq;
        buckets[freq].push_front(key);
        position[key] = buckets[freq].begin();
    }

public:
    explicit LFUCache(int cap) : capacity(cap) {}

    int get(int key) {
        if (!values.count(key)) return -1;
        touch(key);
        return values[key].first;
    }

    void put(int key, int value) {
        if (capacity == 0) return;
        if (values.count(key)) { values[key].first = value; touch(key); return; }

        if ((int)values.size() == capacity) {
            int evict = buckets[minFreq].back();        // least frequent,
            buckets[minFreq].pop_back();                // then least recent
            if (buckets[minFreq].empty()) buckets.erase(minFreq);
            values.erase(evict);
            position.erase(evict);
        }

        values[key] = {value, 1};
        buckets[1].push_front(key);
        position[key] = buckets[1].begin();
        minFreq = 1;                                    // the new entry is
    }                                                   // now the rarest
};`,
  },

  "design-iterators-streams": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Two heaps splitting a stream at the median, and a monotonic deque discarding elements that can never win">
  <text x="0" y="14" class="dg-title">Running median &#8212; split the data so the answer sits at the roots</text>

  <g transform="translate(20,34)">
    <rect x="0" y="0" width="160" height="26" rx="3" class="dg-cell-live"/>
    <text x="80" y="18" text-anchor="middle" class="dg-note">max-heap: 1, 2, 3</text>
    <text x="80" y="46" text-anchor="middle" class="dg-label">lower half &#8212; root is its largest</text>

    <rect x="200" y="0" width="80" height="26" rx="3" class="dg-cell-hit"/>
    <text x="240" y="18" text-anchor="middle" class="dg-note">3.5</text>
    <text x="240" y="46" text-anchor="middle" class="dg-label">median</text>

    <rect x="300" y="0" width="160" height="26" rx="3" class="dg-cell-live"/>
    <text x="380" y="18" text-anchor="middle" class="dg-note">min-heap: 4, 5, 6</text>
    <text x="380" y="46" text-anchor="middle" class="dg-label">upper half &#8212; root is its smallest</text>

    <text x="490" y="18" class="dg-note">sizes within 1</text>
  </g>

  <line x1="0" y1="106" x2="700" y2="106" class="dg-guide"/>
  <text x="0" y="130" class="dg-title">Sliding window maximum &#8212; a deque, not a heap</text>

  <g transform="translate(20,146)">
    <rect x="0"   y="0" width="52" height="26" rx="3" class="dg-cell-out"/><text x="26"  y="18" text-anchor="middle">1</text>
    <rect x="56"  y="0" width="52" height="26" rx="3" class="dg-cell-out"/><text x="82"  y="18" text-anchor="middle">3</text>
    <rect x="112" y="0" width="52" height="26" rx="3" class="dg-cell-hit"/><text x="138" y="18" text-anchor="middle">7</text>
    <rect x="168" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="194" y="18" text-anchor="middle">2</text>
    <rect x="224" y="0" width="52" height="26" rx="3" class="dg-cell-live"/><text x="250" y="18" text-anchor="middle">1</text>

    <text x="300" y="18" class="dg-note">7 arrives &#8594; 1 and 3 can never win again</text>
    <text x="300" y="40" class="dg-label">any later window holding them holds 7 too</text>
    <text x="0" y="58" class="dg-note">deque keeps [7, 2, 1] &#8212; decreasing, front is the answer</text>
  </g>

  <line x1="0" y1="228" x2="700" y2="228" class="dg-guide"/>
  <text x="0" y="252" class="dg-note">A heap cannot do this: removing the element that just expired is O(n) unless you track positions.</text>
  <text x="0" y="276" class="dg-note">The deque discards by relevance instead, which makes each element enter and leave exactly once.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What makes a problem a streaming problem",
        body: [
          "Data arrives one element at a time and you must answer questions continuously, usually under a space constraint that rules out keeping everything. The constraint is the point — if you could store the whole stream, most of these questions would be trivial re-computations.",
          "So the design task is choosing what to keep. A good streaming structure holds just enough to answer the query and discards the rest, and the interesting part is always the argument for why the discarded data can never matter.",
          "Three techniques cover most of the ground: two heaps for order statistics, a monotonic deque for windowed extremes, and reservoir sampling for uniform selection from an unknown length. Each keeps something different, and each has a specific reason the rest is safe to drop.",
        ],
      },
      {
        heading: "Two heaps for a running median",
        body: [
          "Keep the smaller half of the values in a max-heap and the larger half in a min-heap, with sizes differing by at most one. The median is then the root of the larger heap, or the average of both roots when they are equal in size — either way, O(1) to read.",
          "Insertion is where people get it wrong. The instinct is to compare the new value against the roots and push it into whichever heap looks right by size. That can break the invariant that everything in the lower heap is at most everything in the upper.",
          "The reliable method is to push through the other heap first: add to the lower heap, immediately move its largest to the upper heap, then rebalance sizes by moving back if the upper has grown too big. Two pushes and two pops, always the same sequence, no case analysis. That is O(log n) per element and impossible to get subtly wrong.",
        ],
        trace: `add 5 to  low = [3, 1]  high = [7, 9]

  push 5 to low        low = [5, 3, 1]
  move low's root up   low = [3, 1]
                       high = [5, 7, 9]
  high is larger now, so rebalance:
  move high's root down
                       low  = [5, 3, 1]
                       high = [7, 9]

  Same four steps every time. No branching
  on which heap the value "belongs" in.`,
      },
      {
        heading: "Monotonic deque for window extremes",
        body: [
          "Sliding window maximum is the standard problem, and it is worth understanding why a heap is the wrong tool. A heap gives you the maximum in O(1), but when the window slides you must remove the element that just expired — and that element is somewhere in the middle of the heap, which is O(n) to find without extra index bookkeeping.",
          "The deque approach discards by relevance instead of by position. Maintain indices in decreasing order of value. When a new element arrives, pop everything smaller from the back first: those elements can never be the maximum again, because any future window containing them also contains the larger newcomer.",
          "Then drop from the front anything that has fallen outside the window. The front is now the maximum, in O(1). Each index is pushed once and popped at most once, so the whole scan is O(n) — the same amortised argument as the monotonic stack.",
        ],
        aside:
          "Store indices, not values. Expiry is decided by position, so you need the index to know when an element has left the window. Storing values forces you to track positions separately.",
      },
      {
        heading: "Reservoir sampling",
        body: [
          "Select k items uniformly at random from a stream whose length you do not know in advance, using O(k) space. This sounds impossible — uniform selection seems to require knowing the total — and the trick is that the probabilities are adjusted as you go.",
          "Fill the reservoir with the first k items. For each subsequent item at position i, keep it with probability k over i, replacing a uniformly chosen existing sample. That is it.",
          "The induction argument is short. Suppose after i-1 items every one has probability k/(i-1) of being in the reservoir. Item i enters with probability k/i. An existing item survives if either the new item is rejected, or it is accepted but replaces someone else — and those combine to leave it at k/i as well. So the invariant holds at every step, and at the end every item has probability k/n.",
          "The single most common bug is drawing the random index over the reservoir size rather than the running count. It must be over 0 through i inclusive, using the number of items seen.",
        ],
      },
      {
        heading: "Iterator design and laziness",
        body: [
          "The other half of this category is interface design rather than algorithms: build an iterator over an awkward structure. The instinct is to flatten everything in the constructor and then iterate a plain list, which works and misses the point.",
          "Laziness is what is being tested. Compute the next element when next() is called, not before. That matters when the underlying structure is huge, expensive to produce, or infinite, and it is the difference between an iterator and a precomputed array with an iterator-shaped interface.",
          "For nested structures, the technique is a stack of positions — one frame per level of nesting — advanced only as needed. Flatten Nested List Iterator is exactly this.",
          "The recurring subtlety is that hasNext() must not consume. It often has to look ahead to know whether anything remains, and that lookahead must be cached rather than discarded. A peeking iterator makes this explicit by holding exactly one element in hand; the same cached-lookahead trick is what makes a lazy nested iterator's hasNext() correct.",
        ],
      },
      {
        heading: "Expiring data, and the wider family",
        body: [
          "Time-windowed counters — how many hits in the last five minutes — are the other common shape. A queue of timestamps works, with expired entries dropped lazily at the start of each call rather than on a timer. Lazy expiry keeps the amortised cost O(1) and avoids needing a background process.",
          "If the granularity is coarse, a circular buffer of per-second buckets is better: fixed memory regardless of traffic, and O(1) worst case rather than amortised. The choice depends on whether you can bound the window and the resolution.",
          "Beyond interviews, this is the entry point to streaming algorithms proper — count-min sketch for approximate frequencies, HyperLogLog for approximate distinct counts, Bloom filters for approximate membership. All trade a small error rate for a dramatic space reduction, which is the same bargain the techniques above make, just made explicit.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// RUNNING MEDIAN with two heaps. The lower half is a max-heap and the
// upper half a min-heap, so the median sits at one or both roots.
class MedianFinder {
    priority_queue<int> low;                                    // max-heap
    priority_queue<int, vector<int>, greater<int>> high;         // min-heap

public:
    void add(int num) {
        // Push through the OTHER heap first, or the ordering invariant
        // (everything in low <= everything in high) can break.
        low.push(num);
        high.push(low.top());
        low.pop();

        if (high.size() > low.size()) {      // rebalance every time
            low.push(high.top());
            high.pop();
        }
    }

    double median() const {
        if (low.size() > high.size()) return low.top();
        return (low.top() + high.top()) / 2.0;
    }
};

// RESERVOIR SAMPLING - k uniform samples from a stream of unknown
// length, in O(k) space. Element i survives with probability k/i.
template <typename T>
vector<T> reservoirSample(const vector<T>& stream, int k) {
    mt19937 rng(random_device{}());
    vector<T> reservoir;

    for (int i = 0; i < (int)stream.size(); ++i) {
        if (i < k) {
            reservoir.push_back(stream[i]);
        } else {
            int j = (int)(rng() % (i + 1));   // range is 0..i, using the
            if (j < k) reservoir[j] = stream[i];   // RUNNING count, not k
        }
    }
    return reservoir;
}

// SLIDING WINDOW MAXIMUM - a monotonic deque, not a heap. A heap cannot
// remove an arbitrary expiring element in O(1); the deque discards
// elements that can never win again.
vector<int> slidingWindowMax(const vector<int>& nums, int k) {
    deque<int> dq;                            // indices, values decreasing
    vector<int> out;

    for (int i = 0; i < (int)nums.size(); ++i) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();   // expired
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);                      // anything smaller is now
        if (i >= k - 1) out.push_back(nums[dq.front()]);   // unreachable
    }
    return out;
}

// PEEKING ITERATOR - cache one element so peek() can look ahead without
// consuming. hasNext() must NOT advance.
template <typename T>
class PeekingIterator {
    vector<T> data;
    size_t pos = 0;

public:
    explicit PeekingIterator(vector<T> source) : data(move(source)) {}

    bool hasNext() const { return pos < data.size(); }
    T peek() const { return data[pos]; }      // look, don't consume
    T next() { return data[pos++]; }
};

// FLATTEN A NESTED STRUCTURE lazily - a stack of iterators, advancing
// only when next() is called rather than materialising everything in
// the constructor.
struct NestedInteger {
    bool isInt = true;
    int value = 0;
    vector<NestedInteger> list;
};

class NestedIterator {
    stack<pair<vector<NestedInteger>::const_iterator,
               vector<NestedInteger>::const_iterator>> frames;

    void settle() {                           // descend to the next integer
        while (!frames.empty()) {
            auto& [it, end] = frames.top();
            if (it == end) { frames.pop(); continue; }
            if (it->isInt) return;
            const auto& nested = it->list;
            ++it;                             // step past before descending
            frames.push({nested.begin(), nested.end()});
        }
    }

public:
    explicit NestedIterator(const vector<NestedInteger>& list) {
        frames.push({list.begin(), list.end()});
        settle();
    }

    bool hasNext() { settle(); return !frames.empty(); }

    int next() {
        settle();
        auto& [it, end] = frames.top();
        return (it++)->value;
    }
};

// HIT COUNTER over a rolling window - a queue of timestamps, with
// expired entries dropped lazily on each call rather than on a timer.
class HitCounter {
    queue<int> hits;
    int windowSeconds;

public:
    explicit HitCounter(int window = 300) : windowSeconds(window) {}

    void hit(int timestamp) { hits.push(timestamp); }

    int getHits(int timestamp) {
        while (!hits.empty() && hits.front() <= timestamp - windowSeconds)
            hits.pop();                       // expire on read, not on a timer
        return (int)hits.size();
    }
};`,
  },
};
