/**
 * Enrichment batch 11 — Stage 5, part two: number theory and counting.
 * Completes stage 5.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "math-gcd": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The Euclidean algorithm reducing a pair of numbers by repeated remainder until one reaches zero">
  <text x="0" y="14" class="dg-title">gcd(48, 18) &#8212; replace the pair with (b, a mod b) until b is 0</text>

  <g transform="translate(0,34)">
    <rect x="0" y="0" width="330" height="26" rx="3" class="dg-cell-live"/>
    <text x="12" y="18" class="dg-note">48 = 2 &#215; 18 + 12&#160;&#160;&#8594; (48, 18) becomes (18, 12)</text>

    <rect x="0" y="32" width="330" height="26" rx="3" class="dg-cell-live"/>
    <text x="12" y="50" class="dg-note">18 = 1 &#215; 12 + 6&#160;&#160;&#160;&#8594; (18, 12) becomes (12, 6)</text>

    <rect x="0" y="64" width="330" height="26" rx="3" class="dg-cell-live"/>
    <text x="12" y="82" class="dg-note">12 = 2 &#215; 6 + 0&#160;&#160;&#160;&#160;&#8594; (12, 6) becomes (6, 0)</text>

    <rect x="0" y="96" width="330" height="26" rx="3" class="dg-cell-hit"/>
    <text x="12" y="114" class="dg-good">b is 0 &#8594; gcd = 6</text>
  </g>

  <g transform="translate(370,34)">
    <rect x="0" y="0" width="320" height="122" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-note">Why it terminates fast</text>
    <text x="14" y="50" class="dg-label">a mod b is always &lt; b, and within two</text>
    <text x="14" y="68" class="dg-label">steps the larger value at least halves.</text>
    <text x="14" y="96" class="dg-ptr">O(log min(a, b)) &#8212; about 45 steps for</text>
    <text x="14" y="114" class="dg-ptr">any pair of 64-bit integers.</text>
  </g>

  <line x1="0" y1="192" x2="700" y2="192" class="dg-guide"/>
  <text x="0" y="216" class="dg-title">lcm without overflowing</text>
  <text x="0" y="242" class="dg-bad">a &#215; b / gcd&#160;&#160;&#8594; the product can overflow before the division happens</text>
  <text x="0" y="266" class="dg-good">a / gcd &#215; b&#160;&#160;&#8594; divide first; gcd divides a exactly, so nothing is lost</text>
  <text x="0" y="292" class="dg-note">lcm(48, 18) = 48 / 6 &#215; 18 = 144</text>
</svg>`,
    walkthrough: [
      {
        heading: "The identity the whole algorithm rests on",
        body: [
          "The greatest common divisor of a and b is the same as the gcd of b and a mod b. That single fact is the Euclidean algorithm, and everything else is bookkeeping.",
          "The reason it holds: any number dividing both a and b also divides a minus any multiple of b, and a mod b is exactly a minus some multiple of b. So the common divisors of the pair are unchanged by the substitution — including the greatest one. The reverse direction works the same way, so the two sets of common divisors are identical, not merely overlapping.",
          "The base case is gcd(a, 0) equals a, since every number divides zero. Each step strictly shrinks the second argument, so termination is guaranteed.",
        ],
      },
      {
        heading: "Why it is logarithmic",
        body: [
          "Each step replaces b with a mod b, which is strictly smaller than b. That alone would only guarantee termination, not speed. The stronger claim is that within two steps the larger value at least halves.",
          "The argument: if b is at most half of a, then the new pair's larger element is b, which is already half. If b is more than half of a, then a mod b is a minus b, which is less than half of a. Either way, two steps get you below half.",
          "So the number of steps is O(log min(a, b)) — roughly 45 for any pair of 64-bit integers, which is why gcd is effectively free even inside a tight loop. The worst case is consecutive Fibonacci numbers, which is a nice piece of trivia and also the reason the bound is tight rather than merely an upper estimate.",
        ],
      },
      {
        heading: "lcm, and the overflow that catches people",
        body: [
          "The product of two numbers equals the product of their gcd and lcm, so lcm is a times b divided by gcd. Written literally that is a bug waiting to happen: the intermediate product can overflow even when the final answer fits comfortably.",
          "Divide first instead. Since gcd divides a exactly, a divided by gcd is an exact integer with no rounding, and multiplying that by b gives the same answer with a much smaller intermediate. For two values near 10⁹, the naive form overflows a 64-bit integer if their gcd is small; the reordered form does not.",
          "The same reordering habit is worth applying anywhere a formula has a product and a division that cancel — binomial coefficients are the other common case, where multiplying and dividing alternately keeps every intermediate small.",
        ],
        aside:
          "Write lcm as a / gcd(a, b) * b, never a * b / gcd(a, b). The two produce identical results when nothing overflows, and only one of them is safe when something does.",
      },
      {
        heading: "The extended version, and modular inverses",
        body: [
          "The extended Euclidean algorithm returns not just the gcd but integers x and y satisfying a·x + b·y = gcd(a, b). Such a pair always exists — that is Bézout's identity — and the algorithm finds one by unwinding the recursion, carrying the coefficients back up.",
          "The main use is modular inverses. The inverse of a modulo m is a number whose product with a is 1 mod m, and it exists exactly when a and m are coprime. Setting b to m in Bézout gives a·x + m·y = 1, and reducing mod m kills the second term, leaving a·x congruent to 1 — so x is the inverse.",
          "When m is prime there is an easier route via Fermat's little theorem, covered in the modular arithmetic topic. The extended algorithm is what you need when m is not prime, and it is also how you solve linear Diophantine equations — ax + by = c has integer solutions exactly when gcd(a, b) divides c.",
        ],
        trace: `extended_gcd(30, 18)

  30 = 1×18 + 12
  18 = 1×12 +  6
  12 = 2× 6 +  0     → gcd = 6

  unwinding:
    6 = 18 − 1×12
      = 18 − 1×(30 − 1×18)
      = 2×18 − 1×30

  so x = −1, y = 2:   30(−1) + 18(2) = 6  ✓`,
      },
      {
        heading: "Where it shows up in disguise",
        body: [
          "Reducing fractions is the direct use: divide numerator and denominator by their gcd. This matters more than it sounds, because it lets you compare and store fractions exactly, avoiding floating point entirely.",
          "Slopes and collinearity. Three points are collinear if the slope between the first two equals the slope between the second and third. Comparing them as floating-point divisions is unreliable; reducing each difference pair by its gcd and comparing the normalised pairs is exact. Max Points on a Line is this, plus care with sign normalisation so that (1, 2) and (-1, -2) count as the same direction.",
          "Cycles realigning. Two events with periods p and q coincide every lcm(p, q) steps. Nth Magical Number is a binary search where the count of magical numbers below x uses inclusion-exclusion over the lcm.",
          "Water jug problems. You can measure a target volume with jugs of size a and b exactly when the target is a multiple of gcd(a, b) and does not exceed their sum — which is Bézout's identity applied physically.",
        ],
      },
      {
        heading: "Practical notes",
        body: [
          "Seed a running gcd with 0, not 1. Since gcd(0, x) equals x, zero is the identity for this fold, whereas starting at 1 forces the answer to 1 immediately. Folding a list also admits an early exit: once the running value reaches 1, nothing can lower it further.",
          "Handle negatives deliberately. Mathematically gcd is defined on absolute values, and most library implementations return a non-negative result — but if you write your own with the modulo operator, a negative input can produce a negative gcd, which then flips signs when you use it to reduce a fraction.",
          "Language support: C++17 has std::gcd and std::lcm in numeric, Python has math.gcd and math.lcm, and JavaScript has neither, so you write the three-line loop. The iterative form is preferable to the recursive one in any case — no stack frames, and the recursion depth would be logarithmic anyway.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Iterative Euclidean algorithm. O(log min(a, b)) - about 45 steps for
// any pair of 64-bit integers.
long long gcdOf(long long a, long long b) {
    while (b) { long long t = a % b; a = b; b = t; }
    return llabs(a);                         // abs: negatives would flip signs
}

// DIVIDE FIRST. a * b can overflow long long even when the lcm fits.
// gcd divides a exactly, so a / g is an exact integer.
long long lcmOf(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return llabs(a) / gcdOf(a, b) * llabs(b);
}

// C++17 has these built in - prefer them.
void stdlib() {
    cout << gcd(48, 18) << ' ' << lcm(48, 18) << '\\n';   // <numeric>
}

// Extended Euclidean: returns {g, x, y} with a*x + b*y = g = gcd(a, b).
// Bézout's identity guarantees such a pair exists.
struct Bezout { long long g, x, y; };

Bezout extendedGcd(long long a, long long b) {
    if (b == 0) return {a, 1, 0};
    auto [g, x1, y1] = extendedGcd(b, a % b);
    return {g, y1, x1 - (a / b) * y1};       // unwind the coefficients
}

// Modular inverse for a NON-PRIME modulus. Exists iff gcd(a, m) == 1.
// For prime m, Fermat's little theorem is simpler - see math-modular.
long long modInverse(long long a, long long m) {
    auto [g, x, _] = extendedGcd(((a % m) + m) % m, m);
    if (g != 1) return -1;                   // no inverse: not coprime
    return ((x % m) + m) % m;
}

// gcd of a whole list. Seed with 0, since gcd(0, x) == x. Seeding with
// 1 would pin the answer at 1 immediately.
long long gcdAll(const vector<long long>& nums) {
    long long result = 0;
    for (long long x : nums) {
        result = gcdOf(result, x);
        if (result == 1) return 1;           // cannot go lower
    }
    return result;
}

// Exact slope comparison, avoiding floating point entirely. Normalise
// the direction vector by its gcd and fix the sign so that (1,2) and
// (-1,-2) are recognised as the same direction.
pair<long long,long long> normalisedSlope(long long dx, long long dy) {
    long long g = gcdOf(dx, dy);
    if (g == 0) return {0, 0};               // the same point twice
    dx /= g; dy /= g;
    if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
    return {dx, dy};
}

int maxPointsOnALine(const vector<pair<int,int>>& points) {
    int n = (int)points.size(), best = min(n, 1);
    for (int i = 0; i < n; ++i) {
        map<pair<long long,long long>, int> slopes;
        for (int j = i + 1; j < n; ++j) {
            auto key = normalisedSlope(points[j].first  - points[i].first,
                                       points[j].second - points[i].second);
            best = max(best, ++slopes[key] + 1);   // +1 for the anchor point
        }
    }
    return best;
}

// Linear Diophantine: a*x + b*y = c has integer solutions exactly when
// gcd(a, b) divides c. Scale Bézout's coefficients to get one.
bool solveDiophantine(long long a, long long b, long long c,
                      long long& x, long long& y) {
    auto [g, x0, y0] = extendedGcd(a, b);
    if (c % g != 0) return false;
    long long factor = c / g;
    x = x0 * factor;
    y = y0 * factor;
    return true;
}`,
  },

  "math-sieve": {
    illustration: `
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The sieve crossing out multiples starting at p squared, with primes remaining">
  <text x="0" y="14" class="dg-title">Sieve to 30 &#8212; cross out multiples of each prime, starting at p&#178;</text>

  <g transform="translate(10,32)">
    <rect x="0"   y="0" width="40" height="26" rx="3" class="dg-cell-idle"/><text x="20"  y="18" text-anchor="middle" class="dg-index">1</text>
    <rect x="44"  y="0" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="64"  y="18" text-anchor="middle">2</text>
    <rect x="88"  y="0" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="108" y="18" text-anchor="middle">3</text>
    <rect x="132" y="0" width="40" height="26" rx="3" class="dg-cell-out"/><text x="152" y="18" text-anchor="middle" class="dg-index">4</text>
    <rect x="176" y="0" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="196" y="18" text-anchor="middle">5</text>
    <rect x="220" y="0" width="40" height="26" rx="3" class="dg-cell-out"/><text x="240" y="18" text-anchor="middle" class="dg-index">6</text>
    <rect x="264" y="0" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="284" y="18" text-anchor="middle">7</text>
    <rect x="308" y="0" width="40" height="26" rx="3" class="dg-cell-out"/><text x="328" y="18" text-anchor="middle" class="dg-index">8</text>
    <rect x="352" y="0" width="40" height="26" rx="3" class="dg-cell-out"/><text x="372" y="18" text-anchor="middle" class="dg-index">9</text>
    <rect x="396" y="0" width="40" height="26" rx="3" class="dg-cell-out"/><text x="416" y="18" text-anchor="middle" class="dg-index">10</text>

    <rect x="0"   y="32" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="20"  y="50" text-anchor="middle">11</text>
    <rect x="44"  y="32" width="40" height="26" rx="3" class="dg-cell-out"/><text x="64"  y="50" text-anchor="middle" class="dg-index">12</text>
    <rect x="88"  y="32" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="108" y="50" text-anchor="middle">13</text>
    <rect x="132" y="32" width="40" height="26" rx="3" class="dg-cell-out"/><text x="152" y="50" text-anchor="middle" class="dg-index">14</text>
    <rect x="176" y="32" width="40" height="26" rx="3" class="dg-cell-out"/><text x="196" y="50" text-anchor="middle" class="dg-index">15</text>
    <rect x="220" y="32" width="40" height="26" rx="3" class="dg-cell-out"/><text x="240" y="50" text-anchor="middle" class="dg-index">16</text>
    <rect x="264" y="32" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="284" y="50" text-anchor="middle">17</text>
    <rect x="308" y="32" width="40" height="26" rx="3" class="dg-cell-out"/><text x="328" y="50" text-anchor="middle" class="dg-index">18</text>
    <rect x="352" y="32" width="40" height="26" rx="3" class="dg-cell-hit"/><text x="372" y="50" text-anchor="middle">19</text>
    <rect x="396" y="32" width="40" height="26" rx="3" class="dg-cell-out"/><text x="416" y="50" text-anchor="middle" class="dg-index">20</text>
  </g>

  <g transform="translate(460,32)">
    <rect x="0" y="0" width="230" height="120" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-note">p = 2: cross 4, 6, 8, &#8230;</text>
    <text x="14" y="46" class="dg-note">p = 3: cross 9, 12, 15, &#8230;</text>
    <text x="14" y="68" class="dg-note">p = 5: cross 25, 30</text>
    <text x="14" y="96" class="dg-good">stop: 7&#178; = 49 &gt; 30</text>
  </g>

  <line x1="0" y1="176" x2="700" y2="176" class="dg-guide"/>
  <text x="0" y="200" class="dg-note">Start at p&#178;, not 2p: every smaller multiple of p has a smaller prime factor and is already gone.</text>
  <text x="0" y="224" class="dg-note">Stop the outer loop at &#8730;n: any composite below n must have a factor at or below &#8730;n.</text>
  <text x="0" y="256" class="dg-title">O(n log log n) &#8212; the sum of n/p over primes p below n converges to n log log n</text>
  <text x="0" y="280" class="dg-note">which is close enough to linear that the double log is usually ignored.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Marking rather than testing",
        body: [
          "To find every prime below n, the obvious method is to test each number for primality individually, at O(√n) apiece, giving O(n√n) overall. The sieve inverts the work: instead of asking whether each number is prime, it starts by assuming everything is and crosses out what cannot be.",
          "Walk upward. When you reach a number still unmarked, it has no smaller factor, so it is prime — and every multiple of it is not, so mark them all. By the time you finish, everything unmarked is prime.",
          "The reason this is so much faster is that marking is cheap and shared. Crossing out the multiples of 2 handles half the range in n/2 operations, and each subsequent prime handles a shrinking share. The total is the sum of n/p over all primes p below n, which converges to n log log n — close enough to linear that the double logarithm is usually ignored.",
        ],
      },
      {
        heading: "The two optimisations, and why they are correct",
        body: [
          "Start crossing out at p squared, not at 2p. Any multiple of p smaller than p² is p times something smaller than p, which means it has a prime factor smaller than p — and that factor was processed earlier, so the number is already marked. Starting lower is not wrong, just redundant.",
          "Stop the outer loop at the square root of n. If a number below n is composite, it factors as a times b, and the smaller of those is at most √n. So every composite is caught by a prime at or below √n, and looping further finds nothing new.",
          "Both are worth stating explicitly when asked, because they are the difference between someone who has seen the sieve and someone who understands it. The loop condition is usually written p·p ≤ n rather than p ≤ sqrt(n), to avoid floating point entirely.",
        ],
        aside:
          "Set index 0 and index 1 to not-prime explicitly. Neither is prime, and leaving them marked true is the single most common sieve bug — it silently inflates every count.",
      },
      {
        heading: "Smallest prime factor — the more useful variant",
        body: [
          "Instead of storing a boolean per number, store the smallest prime that divides it. The sieve loop is almost identical: when crossing out a multiple, record p as its smallest factor only if nothing smaller has claimed it yet.",
          "What that buys you is factorisation in O(log n) per number, with no trial division at all. To factor x, look up its smallest prime factor, divide it out, and repeat. Since each division at least halves the value, the loop runs at most log₂ x times.",
          "This turns 'factorise these hundred thousand numbers' from an O(n√n) problem into an O(n log log n) precomputation plus O(log n) per query. It is the version worth writing by default, since it subsumes the boolean sieve — a number is prime exactly when its smallest prime factor is itself.",
        ],
        trace: `spf table, then factorising 84

  spf[84] = 2   →  84 / 2 = 42
  spf[42] = 2   →  42 / 2 = 21
  spf[21] = 3   →  21 / 3 =  7
  spf[ 7] = 7   →   7 / 7 =  1

  84 = 2² × 3 × 7

  Four lookups. No trial division, no
  square roots, no primality tests.`,
      },
      {
        heading: "What the limits actually are",
        body: [
          "Time is rarely the constraint; memory is. A boolean sieve to 10⁷ is about 10 MB as a byte array, which is fine. To 10⁸ it is 100 MB, which is over most competitive memory limits, and an spf sieve storing 4-byte integers is four times worse.",
          "Two ways to push further. A bitset packs eight flags per byte, cutting a boolean sieve to n/8 bytes and reaching 10⁹ in about 125 MB — still large, but feasible. Skipping even numbers entirely halves it again, at the cost of index arithmetic that is easy to get wrong.",
          "A segmented sieve is the real answer for large ranges. Sieve up to √n normally, then process the range in blocks that fit in cache, marking each block using only those small primes. That finds primes in an arbitrary interval near 10¹² without ever allocating an array of that size, and it is the standard technique when a problem asks for primes in a range rather than below a bound.",
        ],
      },
      {
        heading: "When not to sieve",
        body: [
          "If you need one primality test on one number, trial division to √n is simpler and faster than building a table. The sieve pays off when you will ask many times, or when you need the primes themselves rather than a yes-or-no answer.",
          "If the number is very large — beyond 10¹² or so — neither approach works, and the answer is Miller-Rabin, a probabilistic test that runs in O(k log³ n). With a fixed set of witness bases it is deterministic for all 64-bit integers, which is the version competitive programmers carry around. Worth knowing it exists even if you never write it from memory.",
          "The decision rule: many queries over a bounded range, sieve. One query, or an unbounded value, test directly. Factorising many numbers in a bounded range, spf sieve.",
        ],
      },
      {
        heading: "What else the sieve structure computes",
        body: [
          "The same loop shape computes several multiplicative functions over a whole range, which is where it earns its place in competitive programming rather than just prime-counting.",
          "Divisor counts: for each i, walk its multiples and increment a counter. That is the harmonic sum n/1 + n/2 + n/3 + ... which is O(n log n), and it gives the number of divisors of every number up to n in one pass.",
          "Euler's totient, the count of numbers below i that are coprime to it, follows from the spf sieve or from a direct sieve variant. It is needed whenever you use Euler's theorem for modular inverses with a non-prime modulus.",
          "Möbius function, sum of divisors, and largest prime factor all fall out of the same skeleton. The transferable idea is that when you need a per-number property that depends on factorisation, computing it for the whole range at once is usually cheaper than computing it per query.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Classic sieve. Both standard optimisations: start crossing at p*p,
// and stop the outer loop once p*p exceeds n.
vector<int> sieve(int n) {
    vector<char> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;         // NEITHER is prime - the classic bug

    for (long long p = 2; p * p <= n; ++p)
        if (isPrime[p])
            for (long long m = p * p; m <= n; m += p)   // start at p*p:
                isPrime[m] = false;                     // smaller multiples
                                                        // already have a
    vector<int> primes;                                 // smaller factor
    for (int i = 2; i <= n; ++i) if (isPrime[i]) primes.push_back(i);
    return primes;
}

// SMALLEST PRIME FACTOR sieve - subsumes the boolean version and gives
// O(log n) factorisation for free. This is the one worth writing.
vector<int> spfSieve(int n) {
    vector<int> spf(n + 1);
    iota(spf.begin(), spf.end(), 0);         // spf[i] = i means "prime so far"

    for (long long p = 2; p * p <= n; ++p)
        if (spf[p] == p)                     // p is prime
            for (long long m = p * p; m <= n; m += p)
                if (spf[m] == m) spf[m] = (int)p;   // record only the SMALLEST
    return spf;
}

// Factorise in O(log x): divide out the smallest prime factor repeatedly.
// Each division at least halves x, so the loop runs at most log2(x) times.
vector<pair<int,int>> factorise(int x, const vector<int>& spf) {
    vector<pair<int,int>> factors;
    while (x > 1) {
        int p = spf[x], power = 0;
        while (x % p == 0) { x /= p; ++power; }
        factors.push_back({p, power});
    }
    return factors;
}

bool isPrimeBySpf(int x, const vector<int>& spf) {
    return x >= 2 && spf[x] == x;
}

// Single primality test - simpler and faster than building a table when
// you only ask once. O(sqrt(n)).
bool isPrime(long long n) {
    if (n < 2) return false;
    if (n % 2 == 0) return n == 2;
    for (long long i = 3; i * i <= n; i += 2)
        if (n % i == 0) return false;
    return true;
}

// Bitset sieve - 8 flags per byte, so 1e9 fits in ~125 MB instead of 1 GB.
template <size_t N>
bitset<N> bitsetSieve() {
    bitset<N> composite;
    for (size_t p = 2; p * p < N; ++p)
        if (!composite[p])
            for (size_t m = p * p; m < N; m += p) composite[m] = 1;
    return composite;                        // prime iff !composite[i]
}

// SEGMENTED SIEVE - primes in [lo, hi] without allocating hi entries.
// Sieve to sqrt(hi) normally, then mark the window with those primes.
vector<long long> segmentedSieve(long long lo, long long hi) {
    long long limit = (long long)sqrtl((long double)hi) + 1;
    vector<int> small = sieve((int)limit);

    vector<char> isPrime(hi - lo + 1, true);
    if (lo == 1) isPrime[0] = false;

    for (int p : small) {
        long long start = max((long long)p * p, (lo + p - 1) / p * p);
        for (long long m = start; m <= hi; m += p) isPrime[m - lo] = false;
    }

    vector<long long> out;
    for (long long i = lo; i <= hi; ++i) if (isPrime[i - lo]) out.push_back(i);
    return out;
}

// The same skeleton computes other per-number properties. Divisor counts
// via the harmonic sum: O(n log n) for the whole range.
vector<int> divisorCounts(int n) {
    vector<int> count(n + 1, 0);
    for (int i = 1; i <= n; ++i)
        for (int m = i; m <= n; m += i) ++count[m];
    return count;
}

// Euler's totient for every value up to n - needed for modular inverses
// when the modulus is not prime.
vector<int> totients(int n) {
    vector<int> phi(n + 1);
    iota(phi.begin(), phi.end(), 0);
    for (int p = 2; p <= n; ++p)
        if (phi[p] == p)                     // p is prime
            for (int m = p; m <= n; m += p) phi[m] -= phi[m] / p;
    return phi;
}`,
  },

  "math-modular": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Exponentiation by squaring reading the exponent in binary, and the rules of modular arithmetic">
  <text x="0" y="14" class="dg-title">3&#185;&#179; mod m &#8212; 13 = 1101&#8322;, so four steps, not thirteen</text>

  <g transform="translate(0,32)">
    <rect x="0" y="0" width="360" height="26" rx="3" class="dg-cell-hit"/>
    <text x="12" y="18" class="dg-note">bit 0 = 1&#160;&#160;&#8594; result &#215;= 3&#160;&#160;&#160;&#160;&#160;&#160;&#160;(base is 3&#185;)</text>

    <rect x="0" y="32" width="360" height="26" rx="3" class="dg-cell-idle"/>
    <text x="12" y="50" class="dg-note">bit 1 = 0&#160;&#160;&#8594; skip&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(base is 3&#178;)</text>

    <rect x="0" y="64" width="360" height="26" rx="3" class="dg-cell-hit"/>
    <text x="12" y="82" class="dg-note">bit 2 = 1&#160;&#160;&#8594; result &#215;= 81&#160;&#160;&#160;&#160;&#160;(base is 3&#8308;)</text>

    <rect x="0" y="96" width="360" height="26" rx="3" class="dg-cell-hit"/>
    <text x="12" y="114" class="dg-note">bit 3 = 1&#160;&#160;&#8594; result &#215;= 6561&#160;&#160;(base is 3&#8312;)</text>

    <rect x="0" y="130" width="360" height="26" rx="3" class="dg-cell-mark"/>
    <text x="12" y="148" class="dg-good">3&#185; &#215; 3&#8308; &#215; 3&#8312; = 3&#185;&#179;&#160;&#160;&#8212; O(log n) multiplications</text>
  </g>

  <g transform="translate(392,32)">
    <rect x="0" y="0" width="298" height="156" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-good">these distribute over the modulus</text>
    <text x="14" y="46" class="dg-note">(a + b) mod m&#160;&#160;(a &#8722; b) mod m</text>
    <text x="14" y="66" class="dg-note">(a &#215; b) mod m</text>
    <text x="14" y="98" class="dg-bad">this one does NOT</text>
    <text x="14" y="120" class="dg-note">a / b&#160;&#160;&#8594;&#160;&#160;a &#215; b&#8315;&#185; mod m</text>
    <text x="14" y="142" class="dg-label">multiply by the modular inverse instead</text>
  </g>

  <line x1="0" y1="212" x2="700" y2="212" class="dg-guide"/>
  <text x="0" y="236" class="dg-title">Two traps</text>
  <text x="0" y="262" class="dg-bad">(a &#8722; b) % m can be NEGATIVE in C, C++, Java and JavaScript &#8594; write ((a &#8722; b) % m + m) % m</text>
  <text x="0" y="288" class="dg-bad">a &#215; b overflows 64 bits when both approach 10&#8313; &#8594; cast to a wider type or reduce first</text>
  <text x="0" y="312" class="dg-note">Python is immune to both, which is why ported Python solutions break in C++.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Why counting problems come with a modulus",
        body: [
          "Combinatorial answers grow explosively — the number of ways to do something with n = 1000 can have hundreds of digits. Rather than require arbitrary-precision arithmetic, problems ask for the answer modulo a fixed number, almost always 10⁹+7.",
          "That constant is chosen deliberately. It is prime, which makes modular inverses easy via Fermat's little theorem. It fits comfortably in a 32-bit integer, and its square fits in a 64-bit one, so a single multiplication of two reduced values cannot overflow before you reduce again. 998244353 is the other common choice, picked for the same reasons plus properties useful to number-theoretic transforms.",
          "The practical consequence is that you reduce after every operation, not once at the end. Values stay below the modulus throughout, and nothing ever grows.",
        ],
      },
      {
        heading: "Three operations work, one does not",
        body: [
          "Addition, subtraction and multiplication all distribute over the modulus: you can reduce the operands, do the operation, and reduce again, and the result is the same as reducing at the end. That is what makes the whole approach viable.",
          "Division does not. There is no operation that undoes multiplication under a modulus in the way you would hope — 10 divided by 4 is not an integer, and modular arithmetic works on integers only. Instead you multiply by the modular inverse of the divisor: the number that, multiplied by it, gives 1.",
          "So a divided by b becomes a times b-inverse, mod m. This is the single most important thing to internalise about modular arithmetic, because dividing directly is a bug that produces plausible wrong answers rather than an error.",
        ],
        aside:
          "Two traps that only bite outside Python. Subtraction can yield a negative in C, C++, Java and JavaScript, so write ((a - b) % m + m) % m. And a * b overflows 64 bits when both approach 10⁹, so cast up or reduce first — this is why a Python solution ported directly to C++ can start failing.",
      },
      {
        heading: "Exponentiation by squaring",
        body: [
          "Computing a to the power n by multiplying n times is O(n), which is hopeless when n is large — and in cryptography n is routinely hundreds of digits.",
          "The trick is to read the exponent in binary. Since a^13 equals a^8 times a^4 times a^1, and 13 in binary is 1101, you only need the powers of a corresponding to set bits. So square the base at each step, producing a^1, a^2, a^4, a^8 in turn, and fold it into the result only where the exponent has a set bit.",
          "That is O(log n) multiplications — four for an exponent of 13, sixty for an exponent near 10¹⁸. The loop is six lines and worth being able to write without thinking, because it appears inside modular inverses, matrix exponentiation, and any problem with a huge exponent.",
        ],
      },
      {
        heading: "Fermat's little theorem, and when it does not apply",
        body: [
          "For a prime modulus p, Fermat's little theorem says that a^(p-1) is congruent to 1 for any a not divisible by p. Divide both sides by a and you get that a^(p-2) is the modular inverse of a.",
          "So with a prime modulus, computing an inverse is just one call to fast exponentiation — no extended Euclidean algorithm required. This is why 10⁹+7 being prime matters so much in practice.",
          "It fails in two situations. If the modulus is not prime, the theorem does not hold, and you need the extended Euclidean algorithm — or Euler's theorem with the totient in place of p-1, which requires the totient and coprimality anyway. And if a is a multiple of the modulus, no inverse exists at all, since a is congruent to 0 and nothing multiplies to 1.",
        ],
        trace: `Inverse of 3 mod 7  (7 is prime)

  Fermat:  3⁻¹ ≡ 3^(7−2) = 3⁵ mod 7

  3¹ = 3
  3² = 9  ≡ 2
  3⁴ ≡ 2² = 4
  3⁵ ≡ 3⁴ × 3¹ ≡ 4 × 3 = 12 ≡ 5

  check:  3 × 5 = 15 ≡ 1 mod 7  ✓`,
      },
      {
        heading: "nCr under a modulus",
        body: [
          "Binomial coefficients appear constantly in counting problems, and the formula n! / (r!(n-r)!) has two divisions — which under a modulus means two inverses.",
          "Computing an inverse per query is O(log m) each, which is fine for a few queries and wasteful for many. The standard preparation is to precompute all factorials up to n in one pass, then compute the inverse of the largest factorial once and derive all the smaller inverse factorials downward, using the identity that the inverse of k! equals the inverse of (k+1)! times (k+1).",
          "That gives O(n) preprocessing and O(1) per query, which is what you want when a problem asks for thousands of binomial coefficients. It is worth having as a reusable block rather than re-deriving.",
          "One caution: the identity only holds when the modulus is prime and larger than n. If n exceeds the modulus, some factorial is divisible by it and the inverse does not exist — that is when you need Lucas' theorem instead.",
        ],
      },
      {
        heading: "Matrix exponentiation",
        body: [
          "The same halving trick works for anything associative, and matrices are the useful case. Any linear recurrence can be written as a matrix acting on a state vector, so raising that matrix to the nth power jumps n steps forward at once.",
          "Fibonacci is the standard example: the 2×2 matrix [[1,1],[1,0]] raised to the nth power has the nth Fibonacci number in its corner. That takes O(log n) matrix multiplications, each O(k³) for a k×k matrix, giving the nth Fibonacci number in logarithmic time rather than linear.",
          "The technique generalises to any recurrence with a fixed number of previous terms, and to counting paths of exactly n steps in a graph — the nth power of an adjacency matrix counts paths of length n between every pair. When a problem has a linear recurrence and an enormous n, this is what it is asking for.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

constexpr long long MOD = 1'000'000'007;

// Reduce after EVERY operation. Subtraction needs the +MOD, because
// (a - b) % MOD is negative in C++ whenever b > a.
long long addMod(long long a, long long b) { return (a + b) % MOD; }
long long subMod(long long a, long long b) { return ((a - b) % MOD + MOD) % MOD; }
long long mulMod(long long a, long long b) { return a % MOD * (b % MOD) % MOD; }

// EXPONENTIATION BY SQUARING. Read the exponent in binary: square each
// step, fold the base in only where a bit is set. O(log n).
long long power(long long base, long long exp, long long mod = MOD) {
    long long result = 1;
    base %= mod;
    if (base < 0) base += mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;   // this bit is set
        base = base * base % mod;                    // square for the next
        exp >>= 1;
    }
    return result;
}

// Fermat's little theorem: for PRIME p, a^(p-2) is a's inverse.
// Fails if the modulus is composite - use extendedGcd there instead.
long long modInverse(long long a, long long mod = MOD) {
    return power(a, mod - 2, mod);
}

long long divMod(long long a, long long b) {
    return mulMod(a, modInverse(b));        // there is no direct division
}

// nCr with O(n) preprocessing and O(1) queries.
// invFact is derived downward: inv(k!) = inv((k+1)!) * (k+1).
struct Binomials {
    vector<long long> fact, invFact;

    explicit Binomials(int n) : fact(n + 1), invFact(n + 1) {
        fact[0] = 1;
        for (int i = 1; i <= n; ++i) fact[i] = fact[i - 1] * i % MOD;

        invFact[n] = modInverse(fact[n]);   // one inverse, then walk down
        for (int i = n; i > 0; --i) invFact[i - 1] = invFact[i] * i % MOD;
    }

    long long nCr(int n, int r) const {
        if (r < 0 || r > n) return 0;
        return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
    }
    long long nPr(int n, int r) const {
        if (r < 0 || r > n) return 0;
        return fact[n] * invFact[n - r] % MOD;
    }
};

// MATRIX EXPONENTIATION - the same halving trick, since matrix
// multiplication is associative. Jumps n steps of a linear recurrence
// in O(k^3 log n).
using Matrix = vector<vector<long long>>;

Matrix matMul(const Matrix& a, const Matrix& b) {
    int n = (int)a.size();
    Matrix c(n, vector<long long>(n, 0));
    for (int i = 0; i < n; ++i)
        for (int k = 0; k < n; ++k) {
            if (!a[i][k]) continue;
            for (int j = 0; j < n; ++j)
                c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        }
    return c;
}

Matrix matPow(Matrix base, long long exp) {
    int n = (int)base.size();
    Matrix result(n, vector<long long>(n, 0));
    for (int i = 0; i < n; ++i) result[i][i] = 1;    // identity

    while (exp > 0) {
        if (exp & 1) result = matMul(result, base);
        base = matMul(base, base);
        exp >>= 1;
    }
    return result;
}

// nth Fibonacci in O(log n): [[1,1],[1,0]]^n has F(n) in the corner.
long long fibonacci(long long n) {
    if (n <= 1) return n;
    Matrix m = {{1, 1}, {1, 0}};
    return matPow(m, n)[0][1];
}

// Overflow guard for a modulus above ~3e9, where a*b exceeds 64 bits
// even after reduction. __int128 is a GCC/Clang extension.
long long mulBig(long long a, long long b, long long mod) {
    return (long long)((__int128)a * b % mod);
}`,
  },

  "math-combinatorics": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Pascal's triangle with the identity that builds each cell, and the stars and bars construction">
  <text x="0" y="14" class="dg-title">C(n, r) = C(n&#8722;1, r&#8722;1) + C(n&#8722;1, r)</text>

  <g transform="translate(60,34)">
    <rect x="120" y="0"   width="40" height="24" rx="3" class="dg-cell"/><text x="140" y="17" text-anchor="middle">1</text>

    <rect x="94"  y="30"  width="40" height="24" rx="3" class="dg-cell"/><text x="114" y="47" text-anchor="middle">1</text>
    <rect x="146" y="30"  width="40" height="24" rx="3" class="dg-cell"/><text x="166" y="47" text-anchor="middle">1</text>

    <rect x="68"  y="60"  width="40" height="24" rx="3" class="dg-cell"/><text x="88"  y="77" text-anchor="middle">1</text>
    <rect x="120" y="60"  width="40" height="24" rx="3" class="dg-cell-mark"/><text x="140" y="77" text-anchor="middle">2</text>
    <rect x="172" y="60"  width="40" height="24" rx="3" class="dg-cell"/><text x="192" y="77" text-anchor="middle">1</text>

    <rect x="42"  y="90"  width="40" height="24" rx="3" class="dg-cell"/><text x="62"  y="107" text-anchor="middle">1</text>
    <rect x="94"  y="90"  width="40" height="24" rx="3" class="dg-cell-mark"/><text x="114" y="107" text-anchor="middle">3</text>
    <rect x="146" y="90"  width="40" height="24" rx="3" class="dg-cell-mark"/><text x="166" y="107" text-anchor="middle">3</text>
    <rect x="198" y="90"  width="40" height="24" rx="3" class="dg-cell"/><text x="218" y="107" text-anchor="middle">1</text>

    <rect x="16"  y="120" width="40" height="24" rx="3" class="dg-cell"/><text x="36"  y="137" text-anchor="middle">1</text>
    <rect x="68"  y="120" width="40" height="24" rx="3" class="dg-cell"/><text x="88"  y="137" text-anchor="middle">4</text>
    <rect x="120" y="120" width="40" height="24" rx="3" class="dg-cell-hit"/><text x="140" y="137" text-anchor="middle">6</text>
    <rect x="172" y="120" width="40" height="24" rx="3" class="dg-cell"/><text x="192" y="137" text-anchor="middle">4</text>
    <rect x="224" y="120" width="40" height="24" rx="3" class="dg-cell"/><text x="244" y="137" text-anchor="middle">1</text>

    <text x="290" y="137" class="dg-good">C(4,2) = 3 + 3 = 6</text>
    <text x="290" y="157" class="dg-label">no factorials, no overflow, no inverses</text>
  </g>

  <line x1="0" y1="212" x2="700" y2="212" class="dg-guide"/>
  <text x="0" y="236" class="dg-title">Stars and bars &#8212; 7 identical items into 3 distinct boxes</text>

  <g transform="translate(0,250)">
    <text x="0" y="18" class="dg-note">&#9733; &#9733; &#9733; &#9474; &#9733; &#9474; &#9733; &#9733; &#9733;</text>
    <text x="230" y="18" class="dg-label">= 3 in box A, 1 in box B, 3 in box C</text>
    <text x="0" y="46" class="dg-note">7 stars + 2 bars = 9 slots; choose which 2 are bars</text>
    <text x="380" y="46" class="dg-good">C(7 + 3 &#8722; 1, 3 &#8722; 1) = C(9, 2) = 36</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "The two rules everything is built from",
        body: [
          "The rule of product: if a choice can be made in a ways and an independent choice in b ways, the pair can be made in a times b ways. Five shirts and three pairs of trousers give fifteen outfits.",
          "The rule of sum: if two cases are mutually exclusive, the total is their sum. Choosing either a shirt or a jacket, from five and three respectively, gives eight options — provided nothing counts as both.",
          "Almost every counting problem is these two applied repeatedly, and most mistakes are applying the wrong one. The test for the sum rule is exclusivity: if an outcome could fall into two cases, adding double-counts it and you need inclusion-exclusion. The test for the product rule is independence: if the second choice depends on the first, the count for it must be conditional.",
        ],
      },
      {
        heading: "Permutations and combinations",
        body: [
          "Permutations count arrangements where order matters: nPr equals n! divided by (n-r)!. Think of it as filling r positions in sequence — n options for the first, n-1 for the second, and so on, which is the product rule applied r times.",
          "Combinations count selections where order does not: nCr equals n! divided by r!(n-r)!. The relationship is direct — every selection of r items can be arranged in r! orders, so combinations are permutations divided by that factor.",
          "The question to ask is always the same: does swapping two chosen items produce a different outcome? Picking a president and a vice-president from a committee, yes — order matters, so permutations. Picking three people for a subcommittee, no — combinations.",
          "The identity C(n, r) equals C(n, n-r) is worth using deliberately, not just noting: choosing which r to include is the same as choosing which n-r to exclude. Computing with the smaller of the two keeps intermediate values smaller.",
        ],
      },
      {
        heading: "Pascal's identity, and why it beats factorials",
        body: [
          "C(n, r) equals C(n-1, r-1) plus C(n-1, r). The reasoning is a case split on one particular element: either it is in your selection, leaving r-1 to choose from the remaining n-1; or it is not, leaving r to choose from n-1. Those cases are exclusive and exhaustive, so the sum rule applies.",
          "That recurrence builds the whole table with additions only — no factorials, no division, no modular inverses. Which matters more often than it sounds. Factorials overflow 64 bits at 21!, so the direct formula is unusable for even modest n without a modulus. And if the modulus is not prime, inverses may not exist at all, whereas the additive recurrence works regardless.",
          "The cost is O(n²) time and space for the full table, versus O(n) preprocessing and O(1) queries with factorials. Use factorials when n is large and the modulus is prime; use Pascal when n is small, the modulus is awkward, or you need exact values.",
        ],
        aside:
          "Never compute nCr as n! / (r! (n-r)!) in fixed-width integers. 21! already exceeds a 64-bit integer, so the numerator overflows long before the division rescues it. Multiply and divide alternately, or use Pascal.",
      },
      {
        heading: "Stars and bars",
        body: [
          "How many ways can n identical items be distributed into k distinct boxes? This shape appears constantly and is not obvious from first principles.",
          "Picture the items as stars in a row, and insert k-1 bars to divide them into k groups. Any arrangement of n stars and k-1 bars corresponds to exactly one distribution, and vice versa. So the count is the number of ways to choose which of the n+k-1 positions hold bars: C(n+k-1, k-1).",
          "If every box must be non-empty, place one item in each first and distribute the remaining n-k, giving C(n-1, k-1). The same construction read differently: choose k-1 of the n-1 gaps between items to cut at.",
          "It applies whenever items are interchangeable and containers are not — distributing identical sweets among named children, counting non-negative integer solutions to x₁ + x₂ + ... + xₖ = n, or counting monomials of a given degree.",
        ],
        trace: `Non-negative solutions to a + b + c = 7

  stars and bars, n = 7 items, k = 3 boxes
  C(7 + 3 − 1, 3 − 1) = C(9, 2) = 36

  If each must be at least 1:
  give one to each first, distribute 4
  C(4 + 3 − 1, 2) = C(6, 2) = 15
  which equals C(n − 1, k − 1) = C(6, 2)  ✓`,
      },
      {
        heading: "Arrangements with repeats, and complementary counting",
        body: [
          "Arranging a multiset — the letters of MISSISSIPPI, say — is not simply 11!, because swapping two identical letters produces the same word. Divide by the factorial of each repeat count: 11! divided by 4! for the I's, 4! for the S's and 2! for the P's.",
          "The general form is the multinomial coefficient, and the reasoning is the same division-by-symmetry as combinations: every distinct arrangement is counted once per way of permuting the identical items among themselves.",
          "Complementary counting is the other habit worth building. When a problem says 'at least one', counting directly usually means summing over cases with one, two, three and so on. Counting the complement — arrangements with none — and subtracting from the total is nearly always shorter. If the probability of at least one shared birthday is awkward, the probability of no shared birthday is a simple product.",
        ],
      },
      {
        heading: "Inclusion-exclusion",
        body: [
          "When cases overlap, adding them double-counts the overlap. Inclusion-exclusion corrects this: add the individual counts, subtract the pairwise intersections, add back the triples, and so on with alternating signs.",
          "The two-set version is familiar — the size of A union B is |A| plus |B| minus |A ∩ B|. The general version extends the same alternation to any number of sets, and the sign of a term is determined by how many sets it involves.",
          "Counting numbers below n divisible by any of several values is the standard application: sum n/d over each divisor, subtract n/lcm for each pair, add back for each triple. Derangements — permutations with no element in its original position — are also inclusion-exclusion, subtracting the arrangements that fix at least one point.",
          "The cost is exponential in the number of sets, since you enumerate every subset. That is fine for a handful of conditions and hopeless for many, which is why bitmask enumeration over subsets is the usual implementation and why it caps out around twenty conditions.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

constexpr long long MOD = 1'000'000'007;

// PASCAL'S IDENTITY - additions only. No factorials to overflow, no
// inverses needed, so it works with a composite modulus too.
vector<vector<long long>> pascal(int n, long long mod = 0) {
    vector<vector<long long>> C(n + 1, vector<long long>(n + 1, 0));
    for (int i = 0; i <= n; ++i) {
        C[i][0] = 1;
        for (int j = 1; j <= i; ++j) {
            C[i][j] = C[i-1][j-1] + C[i-1][j];   // in it, or not in it
            if (mod) C[i][j] %= mod;
        }
    }
    return C;
}

// Exact nCr in 64 bits, for small results. Multiply and divide
// ALTERNATELY - the running value stays integral at every step, and
// never grows the way a full factorial would.
long long nCrExact(int n, int r) {
    if (r < 0 || r > n) return 0;
    r = min(r, n - r);                      // C(n,r) == C(n,n-r); use the smaller
    long long result = 1;
    for (int i = 0; i < r; ++i) {
        result = result * (n - i) / (i + 1);   // divisible at each step
    }
    return result;
}

// Modular nCr: O(n) preprocessing, O(1) queries. Requires a PRIME
// modulus larger than n, so that every factorial has an inverse.
struct Combinatorics {
    vector<long long> fact, invFact;

    static long long power(long long b, long long e, long long m) {
        long long r = 1; b %= m;
        while (e) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; }
        return r;
    }

    explicit Combinatorics(int n) : fact(n + 1), invFact(n + 1) {
        fact[0] = 1;
        for (int i = 1; i <= n; ++i) fact[i] = fact[i - 1] * i % MOD;
        invFact[n] = power(fact[n], MOD - 2, MOD);       // one inverse
        for (int i = n; i > 0; --i) invFact[i-1] = invFact[i] * i % MOD;
    }

    long long nCr(int n, int r) const {
        if (r < 0 || r > n) return 0;
        return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
    }

    // STARS AND BARS: n identical items into k distinct boxes.
    long long distribute(int n, int k, bool allowEmpty = true) const {
        return allowEmpty ? nCr(n + k - 1, k - 1)        // choose the bars
                          : nCr(n - 1, k - 1);           // one each first
    }

    // MULTINOMIAL: arrangements of a multiset, e.g. "MISSISSIPPI".
    // Divide by the factorial of each repeat group.
    long long arrangements(const vector<int>& counts) const {
        int total = accumulate(counts.begin(), counts.end(), 0);
        long long result = fact[total];
        for (int c : counts) result = result * invFact[c] % MOD;
        return result;
    }
};

// INCLUSION-EXCLUSION over subsets: add singles, subtract pairs, add
// triples. Exponential in the number of conditions, so it caps out
// around 20 - which is exactly what a bitmask enumeration allows.
long long countDivisibleByAny(long long n, const vector<long long>& divisors) {
    int k = (int)divisors.size();
    long long total = 0;

    for (int mask = 1; mask < (1 << k); ++mask) {
        long long lcmValue = 1;
        bool overflow = false;
        for (int i = 0; i < k; ++i) {
            if (!(mask & (1 << i))) continue;
            long long g = __gcd(lcmValue, divisors[i]);
            if (lcmValue / g > n / divisors[i]) { overflow = true; break; }
            lcmValue = lcmValue / g * divisors[i];       // divide first
        }
        if (overflow) continue;
        int bits = __builtin_popcount(mask);
        total += (bits % 2 ? 1 : -1) * (n / lcmValue);   // alternating sign
    }
    return total;
}

// DERANGEMENTS - permutations fixing no element. The recurrence follows
// from inclusion-exclusion but is cheaper to apply directly.
vector<long long> derangements(int n) {
    vector<long long> d(n + 1);
    d[0] = 1;
    if (n >= 1) d[1] = 0;
    for (int i = 2; i <= n; ++i)
        d[i] = (i - 1) * (d[i-1] + d[i-2]) % MOD;
    return d;
}`,
  },
};
