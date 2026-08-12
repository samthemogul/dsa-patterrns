// Math & Number Theory
export const name = "Math & Number Theory";

export const topics = [
  {
    id: "math-gcd",
    title: "GCD, LCM & the Euclidean Algorithm",
    subtitle: "Number Theory",
    summary: "Repeated remainders reduce a pair of numbers to their common factor in log time.",
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      note: "Logarithmic in the smaller value. Each step at least halves one operand, which is why it is so fast even on huge integers.",
    },
    description:
      "The Euclidean algorithm computes the greatest common divisor of two numbers using one observation: gcd(a, b) equals gcd(b, a mod b), and gcd(a, 0) is a. Each step replaces the pair with a strictly smaller one, and because the remainder is always less than half the divisor within two steps, the whole thing terminates in O(log n). From gcd you get lcm for free, since a times b equals gcd times lcm — but compute it as a / gcd * b rather than a * b / gcd, so the intermediate product does not overflow. The extended version additionally finds integers x and y satisfying ax + by = gcd(a, b), which is how you compute modular inverses when the modulus is not prime. In interviews gcd usually appears indirectly: reducing a fraction to lowest terms, deciding whether points are collinear or share a slope, finding how many lattice points sit on a line segment, or working out when two repeating cycles realign.",
    useCases: [
      "Reducing fractions to lowest terms, and comparing slopes exactly without floating point.",
      "Deciding whether three or more points are collinear by comparing normalised slope vectors.",
      "Finding when two periodic events coincide again — the lcm of their periods.",
      "Computing modular inverses via the extended algorithm, needed for division under a modulus.",
      "Water-jug and measuring problems, which are solvable exactly when the target is a multiple of the gcd.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">gcd(48, 18)</div>
        <div class="w-full">
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">48 = 2 &times; 18 + <span class="font-bold">12</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">18 = 1 &times; 12 + <span class="font-bold">6</span></div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">12 = 2 &times; 6 &nbsp;+ <span class="font-bold">0</span></div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm text-center">gcd = 6</div>
        </div>
        <div class="text-sm text-gray-600 mt-2">lcm(48, 18) = 48 / 6 &times; 18 = 144</div>
      </div>
    `,
    code: {
      python: `# Iterative Euclidean algorithm - no recursion depth to worry about.
def gcd(a, b):
    while b:
        a, b = b, a % b
    return abs(a)

# Divide BEFORE multiplying so the intermediate value stays small.
def lcm(a, b):
    return abs(a) // gcd(a, b) * b

# Extended Euclidean: returns (g, x, y) with a*x + b*y = g = gcd(a, b).
# Used for modular inverses when the modulus is not prime.
def extended_gcd(a, b):
    if b == 0:
        return (a, 1, 0)
    g, x1, y1 = extended_gcd(b, a % b)
    return (g, y1, x1 - (a // b) * y1)

def mod_inverse(a, m):
    g, x, _ = extended_gcd(a % m, m)
    if g != 1:
        return None                  # inverse exists only when gcd(a, m) = 1
    return x % m

# gcd of a whole list - fold, with an early exit once it reaches 1.
from functools import reduce

def gcd_all(nums):
    result = 0
    for x in nums:
        result = gcd(result, x)      # gcd(0, x) = x, so 0 is the right seed
        if result == 1:
            return 1
    return result`,
      typescript: `// Iterative Euclidean algorithm.
function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
}

// Divide BEFORE multiplying to avoid overflow on large inputs.
function lcm(a: number, b: number): number {
  return Math.abs(a) / gcd(a, b) * b;
}

// Extended Euclidean: a*x + b*y = g = gcd(a, b).
function extendedGcd(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGcd(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}

function modInverse(a: number, m: number): number | null {
  const [g, x] = extendedGcd(((a % m) + m) % m, m);
  if (g !== 1) return null;          // inverse needs gcd(a, m) = 1
  return ((x % m) + m) % m;
}

// gcd of a list, with an early exit once it hits 1.
function gcdAll(nums: number[]): number {
  let result = 0;                    // gcd(0, x) = x, so 0 seeds correctly
  for (const x of nums) {
    result = gcd(result, x);
    if (result === 1) return 1;
  }
  return result;
}`,
    },
    pitfalls: [
      "Computing lcm as a * b / gcd. The product can overflow before the division happens — divide first.",
      "Seeding a running gcd with 1 instead of 0. gcd(0, x) is x, which is what you want; gcd(1, x) is always 1.",
      "Forgetting that gcd is defined for negatives too. Take absolute values, or your fraction reduction flips signs unpredictably.",
      "In JavaScript, using % on values beyond Number.MAX_SAFE_INTEGER. Reach for BigInt when the inputs are large.",
      "Assuming a modular inverse always exists. It only does when the number and the modulus are coprime.",
    ],
    problems: {
      easy: [
        { name: "Greatest Common Divisor of Strings", url: "https://leetcode.com/problems/greatest-common-divisor-of-strings/" },
        { name: "Find Greatest Common Divisor of Array", url: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/" },
        { name: "Fraction Addition and Subtraction", url: "https://leetcode.com/problems/fraction-addition-and-subtraction/" },
      ],
      medium: [
        { name: "Simplified Fractions", url: "https://leetcode.com/problems/simplified-fractions/" },
        { name: "Number of Boomerangs", url: "https://leetcode.com/problems/number-of-boomerangs/" },
        { name: "Nth Magical Number", url: "https://leetcode.com/problems/nth-magical-number/" },
        { name: "Water and Jug Problem", url: "https://leetcode.com/problems/water-and-jug-problem/" },
      ],
      hard: [
        { name: "Max Points on a Line", url: "https://leetcode.com/problems/max-points-on-a-line/" },
        { name: "Count Array Pairs Divisible by K", url: "https://leetcode.com/problems/count-array-pairs-divisible-by-k/" },
      ],
    },
  },

  {
    id: "math-sieve",
    title: "Sieve of Eratosthenes",
    subtitle: "Primes & Factorisation",
    summary: "All primes below n by crossing out multiples, plus fast factorisation.",
    complexity: {
      time: "O(n log log n)",
      space: "O(n)",
      note: "Effectively linear in practice. Testing each number individually for primality would be O(n·sqrt(n)) — far worse.",
    },
    description:
      "The sieve finds every prime below n by starting with all numbers marked prime and repeatedly crossing out the multiples of each prime it finds. Two optimisations matter and are frequently asked about. First, you only need to sieve up to the square root of n, because any composite number below n must have a factor at or below that square root. Second, when crossing out multiples of p, start at p squared rather than 2p — every smaller multiple already has a smaller prime factor and was crossed out earlier. The running time works out to O(n log log n), which is close enough to linear that the loglog is usually ignored. A small variation makes it far more useful: instead of storing a boolean, store each number's smallest prime factor. That table lets you factorise any number below n in O(log n) by repeatedly dividing by its smallest prime factor, which turns 'factorise these hundred thousand numbers' from hopeless into instant.",
    useCases: [
      "Precomputing all primes in a range before answering many primality queries.",
      "Factorising many numbers quickly by storing smallest-prime-factor rather than a boolean.",
      "Counting divisors or summing divisors for every number up to n.",
      "Euler's totient function over a range, needed in modular arithmetic problems.",
      "Any problem that asks about primes, factors, or coprimality across a whole range rather than one value.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">sieve up to 20</div>
        <div class="flex space-x-2 mb-1">
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">1</div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">2</div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">3</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">4</div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">5</div>
        </div>
        <div class="flex space-x-2 mb-1">
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">6</div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">7</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">8</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">9</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">10</div>
        </div>
        <div class="flex space-x-2">
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">11</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">12</div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">13</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">14</div>
          <div class="p-1 bg-gray-100 border rounded-sm w-10 text-center text-gray-400 line-through">15</div>
        </div>
        <div class="text-sm text-gray-600 mt-2">start crossing at p&sup2;, stop the outer loop at &radic;n</div>
      </div>
    `,
    code: {
      python: `# Classic sieve. Two optimisations: loop only to sqrt(n), and start
# crossing out at p*p because smaller multiples are already gone.
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1
    return [i for i, prime in enumerate(is_prime) if prime]

# Smallest-prime-factor sieve - far more useful than a boolean array,
# because it also gives O(log n) factorisation for free.
def spf_sieve(n):
    spf = list(range(n + 1))
    p = 2
    while p * p <= n:
        if spf[p] == p:                  # p is prime
            for multiple in range(p * p, n + 1, p):
                if spf[multiple] == multiple:
                    spf[multiple] = p    # record the SMALLEST factor only
        p += 1
    return spf

def factorise(x, spf):
    factors = {}
    while x > 1:
        p = spf[x]
        while x % p == 0:
            factors[p] = factors.get(p, 0) + 1
            x //= p
    return factors

# Single-number primality when you only need one answer - O(sqrt(n)).
def is_prime(n):
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0:
        return False
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2
    return True`,
      typescript: `// Classic sieve, with both standard optimisations.
function sieve(n: number): number[] {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let m = p * p; m <= n; m += p) isPrime[m] = false;
    }
  }
  const out: number[] = [];
  for (let i = 2; i <= n; i++) if (isPrime[i]) out.push(i);
  return out;
}

// Smallest-prime-factor sieve - enables O(log n) factorisation.
function spfSieve(n: number): number[] {
  const spf = Array.from({ length: n + 1 }, (_, i) => i);
  for (let p = 2; p * p <= n; p++) {
    if (spf[p] === p) {
      for (let m = p * p; m <= n; m += p) {
        if (spf[m] === m) spf[m] = p;
      }
    }
  }
  return spf;
}

function factorise(x: number, spf: number[]): Map<number, number> {
  const factors = new Map<number, number>();
  while (x > 1) {
    const p = spf[x];
    while (x % p === 0) {
      factors.set(p, (factors.get(p) ?? 0) + 1);
      x /= p;
    }
  }
  return factors;
}

// Single-number primality - O(sqrt(n)).
function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}`,
    },
    pitfalls: [
      "Forgetting that 0 and 1 are not prime. Leaving them marked true is the single most common sieve bug.",
      "Starting the inner crossing loop at 2p instead of p squared. It still works but does redundant passes.",
      "Looping the outer variable all the way to n instead of stopping at the square root.",
      "Allocating a sieve of size 10^9. Memory, not time, is the limiting factor — a boolean array that size will not fit.",
      "Using a sieve when only one primality test is needed. A single O(sqrt(n)) trial division is cheaper than building a whole table.",
    ],
    problems: {
      easy: [
        { name: "Count Primes", url: "https://leetcode.com/problems/count-primes/" },
        { name: "Prime Number of Set Bits", url: "https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/" },
      ],
      medium: [
        { name: "Closest Prime Numbers in Range", url: "https://leetcode.com/problems/closest-prime-numbers-in-range/" },
        { name: "Prime Arrangements", url: "https://leetcode.com/problems/prime-arrangements/" },
        { name: "Four Divisors", url: "https://leetcode.com/problems/four-divisors/" },
        { name: "Distinct Prime Factors of Product of Array", url: "https://leetcode.com/problems/distinct-prime-factors-of-product-of-array/" },
      ],
      hard: [
        { name: "Largest Component Size by Common Factor", url: "https://leetcode.com/problems/largest-component-size-by-common-factor/" },
        { name: "Count Different Palindromic Subsequences", url: "https://leetcode.com/problems/count-different-palindromic-subsequences/" },
      ],
    },
  },

  {
    id: "math-modular",
    title: "Modular Arithmetic & Fast Exponentiation",
    subtitle: "Number Theory",
    summary: "Keeping numbers small under a modulus, and computing huge powers in log time.",
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      note: "For exponentiation by squaring. Naive repeated multiplication is O(n) and overflows long before it finishes.",
    },
    description:
      "Counting problems routinely produce answers too large to store, which is why so many of them ask for the result modulo 10⁹+7 — a prime chosen because it fits in 32 bits, and its square fits in 64. Addition, subtraction and multiplication all distribute over the modulus, so you can reduce at every step and never let the number grow. Division does not distribute, and that is the trap: to divide by k under a modulus you multiply by k's modular inverse, which for a prime modulus is k^(p-2) by Fermat's little theorem. Fast exponentiation, also called exponentiation by squaring, computes a^n in O(log n) by reading n in binary — square the base at each step, and multiply it into the result only where the exponent has a set bit. The same halving trick works for anything associative, which is why the identical structure computes matrix powers, and matrix exponentiation is how you get the n-th Fibonacci number in O(log n).",
    useCases: [
      "Counting problems that ask for the answer modulo 10^9+7 to keep it in range.",
      "Computing a^b mod m for cryptographically large exponents, as in RSA.",
      "Modular inverse for division under a prime modulus, needed by combinatorics formulas.",
      "Matrix exponentiation for linear recurrences — Fibonacci in O(log n) rather than O(n).",
      "Hash computations that must stay inside a fixed word size, such as rolling string hashes.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">3<sup>13</sup> &nbsp;&middot;&nbsp; 13 = 1101<sub>2</sub></div>
        <div class="w-full">
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">bit 0 = 1 &rarr; result &times;= 3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3<sup>1</sup>)</div>
          <div class="p-1 bg-gray-100 border rounded-sm mb-1">bit 1 = 0 &rarr; skip&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3<sup>2</sup>)</div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">bit 2 = 1 &rarr; result &times;= 81&nbsp;&nbsp;&nbsp;&nbsp;(3<sup>4</sup>)</div>
          <div class="p-1 bg-blue-100 border border-blue-300 rounded-sm mb-1">bit 3 = 1 &rarr; result &times;= 6561 (3<sup>8</sup>)</div>
          <div class="p-1 bg-green-200 border border-green-500 rounded-sm text-center">4 steps, not 13</div>
        </div>
      </div>
    `,
    code: {
      python: `MOD = 10**9 + 7

# Exponentiation by squaring. Read the exponent in binary: square each
# step, and fold the base in only where a bit is set.
def power(base, exp, mod=MOD):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:              # this bit is set - fold the base in
            result = result * base % mod
        base = base * base % mod  # square for the next bit
        exp >>= 1
    return result

# Division under a prime modulus = multiply by the modular inverse.
# Fermat's little theorem: a^(p-1) = 1, so a^(p-2) is a's inverse.
def mod_inverse(a, mod=MOD):
    return power(a, mod - 2, mod)

def mod_divide(a, b, mod=MOD):
    return a * mod_inverse(b, mod) % mod

# nCr mod p, with factorials precomputed once.
def build_factorials(n, mod=MOD):
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = fact[i - 1] * i % mod
    inv_fact = [1] * (n + 1)
    inv_fact[n] = mod_inverse(fact[n], mod)
    for i in range(n, 0, -1):
        inv_fact[i - 1] = inv_fact[i] * i % mod
    return fact, inv_fact

def n_choose_r(n, r, fact, inv_fact, mod=MOD):
    if r < 0 or r > n:
        return 0
    return fact[n] * inv_fact[r] % mod * inv_fact[n - r] % mod

# Subtraction needs care - Python's % is already non-negative, but in
# most other languages you must add the modulus back first.
def mod_sub(a, b, mod=MOD):
    return (a - b) % mod`,
      typescript: `const MOD = 1_000_000_007n;

// Exponentiation by squaring. BigInt because 10^9 squared exceeds
// JavaScript's safe integer range.
function power(base: bigint, exp: bigint, mod = MOD): bigint {
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}

// Fermat's little theorem: a^(p-2) is the modular inverse of a mod p.
const modInverse = (a: bigint, mod = MOD) => power(a, mod - 2n, mod);
const modDivide = (a: bigint, b: bigint, mod = MOD) =>
  (a * modInverse(b, mod)) % mod;

// nCr mod p with precomputed factorials.
function buildFactorials(n: number, mod = MOD): [bigint[], bigint[]] {
  const fact = new Array<bigint>(n + 1).fill(1n);
  for (let i = 1; i <= n; i++) fact[i] = (fact[i - 1] * BigInt(i)) % mod;
  const invFact = new Array<bigint>(n + 1).fill(1n);
  invFact[n] = modInverse(fact[n], mod);
  for (let i = n; i > 0; i--) invFact[i - 1] = (invFact[i] * BigInt(i)) % mod;
  return [fact, invFact];
}

// Subtraction: add the modulus back before reducing, or you get a
// negative result in every C-like language including JavaScript.
const modSub = (a: bigint, b: bigint, mod = MOD) => ((a - b) % mod + mod) % mod;`,
    },
    pitfalls: [
      "Negative results from subtraction. In JavaScript, Java, C and C++, (a - b) % m can be negative — add m back before reducing.",
      "Trying to divide directly under a modulus. There is no such operation; multiply by the modular inverse instead.",
      "Overflow before the reduction. In 64-bit languages, a * b can overflow even when both are below 10^9 — cast up or reduce first.",
      "Using Fermat's little theorem when the modulus is not prime. Use the extended Euclidean algorithm there instead.",
      "Reducing only at the end. Reduce after every operation, not once the number has already grown out of range.",
    ],
    problems: {
      easy: [
        { name: "Pow(x, n)", url: "https://leetcode.com/problems/powx-n/" },
        { name: "Add Digits", url: "https://leetcode.com/problems/add-digits/" },
      ],
      medium: [
        { name: "Super Pow", url: "https://leetcode.com/problems/super-pow/" },
        { name: "Count Good Numbers", url: "https://leetcode.com/problems/count-good-numbers/" },
        { name: "Number of Ways to Divide a Long Corridor", url: "https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor/" },
        { name: "Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
      ],
      hard: [
        { name: "Count Anagrams", url: "https://leetcode.com/problems/count-anagrams/" },
        { name: "Number of Music Playlists", url: "https://leetcode.com/problems/number-of-music-playlists/" },
      ],
    },
  },

  {
    id: "math-combinatorics",
    title: "Combinatorics",
    subtitle: "Counting",
    summary: "Permutations, combinations, and the counting arguments behind them.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "With precomputed factorials, each nCr query is O(1). Building the tables is the one-off linear cost.",
    },
    description:
      "Most counting problems reduce to a handful of formulas, and the difficulty is choosing the right one rather than evaluating it. Permutations count arrangements where order matters: nPr = n! / (n-r)!. Combinations count selections where it does not: nCr = n! / (r!(n-r)!). Two rules do most of the work. The rule of product says that independent choices multiply, so if you pick a shirt from five and trousers from three you have fifteen outfits. The rule of sum says that mutually exclusive cases add. Beyond those, three patterns come up often enough to memorise. Stars and bars counts ways to distribute n identical items into k distinct boxes as C(n+k-1, k-1). Inclusion-exclusion corrects double counting when cases overlap — add the singles, subtract the pairs, add the triples back. And Pascal's identity, C(n, r) = C(n-1, r-1) + C(n-1, r), gives you a DP formulation when factorials would overflow or when a modulus is not prime.",
    useCases: [
      "Counting paths through a grid, which is C(rows+cols-2, rows-1) when movement is limited to right and down.",
      "Counting arrangements with repeated elements, dividing by the factorial of each repeat count.",
      "Probability questions phrased as favourable outcomes over total outcomes.",
      "Distributing identical items into distinct groups via stars and bars.",
      "Counting arrangements that avoid a forbidden pattern, usually via inclusion-exclusion or complementary counting.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">Pascal's triangle: C(n,r) = C(n-1,r-1) + C(n-1,r)</div>
        <div class="flex flex-col items-center">
          <div class="flex space-x-2 mb-1"><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div></div>
          <div class="flex space-x-2 mb-1"><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div></div>
          <div class="flex space-x-2 mb-1"><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div><div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">2</div><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div></div>
          <div class="flex space-x-2 mb-1"><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div><div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">3</div><div class="p-1 bg-blue-100 border border-blue-300 rounded-sm w-10 text-center">3</div><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div></div>
          <div class="flex space-x-2"><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">4</div><div class="p-1 bg-green-200 border border-green-500 rounded-sm w-10 text-center">6</div><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">4</div><div class="p-1 bg-gray-100 border rounded-sm w-10 text-center">1</div></div>
        </div>
        <div class="text-sm text-gray-600 mt-2">C(4,2) = 6 &middot; each cell is the sum of the two above</div>
      </div>
    `,
    code: {
      python: `from math import comb, perm, factorial

# Python has these built in - know them, but be able to derive them too.
#   comb(n, r)  = nCr, order does not matter
#   perm(n, r)  = nPr, order matters

# Pascal's identity - avoids factorials entirely, so it works even when
# the modulus is not prime and inverses are unavailable.
def binomial_table(n, mod=None):
    C = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        C[i][0] = 1
        for j in range(1, i + 1):
            C[i][j] = C[i-1][j-1] + C[i-1][j]
            if mod:
                C[i][j] %= mod
    return C

# Multinomial: arrangements of a multiset, e.g. "MISSISSIPPI".
def arrangements(counts):
    total = sum(counts)
    result = factorial(total)
    for c in counts:
        result //= factorial(c)      # divide out each repeated group
    return result

# Stars and bars: n identical items into k distinct boxes.
def distribute(n, k, allow_empty=True):
    if allow_empty:
        return comb(n + k - 1, k - 1)
    return comb(n - 1, k - 1)        # each box gets at least one

# Inclusion-exclusion: how many numbers below n are divisible by
# any of the given (pairwise coprime) divisors?
from itertools import combinations

def count_divisible(n, divisors):
    total = 0
    for size in range(1, len(divisors) + 1):
        for group in combinations(divisors, size):
            product = 1
            for d in group:
                product *= d
            sign = 1 if size % 2 else -1
            total += sign * (n // product)
    return total`,
      typescript: `// Pascal's identity - no factorials, so no overflow and no need for
// modular inverses.
function binomialTable(n: number, mod?: number): number[][] {
  const C = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= n; i++) {
    C[i][0] = 1;
    for (let j = 1; j <= i; j++) {
      C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
      if (mod) C[i][j] %= mod;
    }
  }
  return C;
}

// nCr directly, multiplying and dividing alternately to stay small.
function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  r = Math.min(r, n - r);
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = result * (n - i) / (i + 1);   // stays integral at each step
  }
  return Math.round(result);
}

// Multinomial: arrangements of a multiset, e.g. "MISSISSIPPI".
function arrangements(counts: number[]): number {
  const fact = (k: number): number => (k <= 1 ? 1 : k * fact(k - 1));
  const total = counts.reduce((a, b) => a + b, 0);
  return counts.reduce((acc, c) => acc / fact(c), fact(total));
}

// Stars and bars: n identical items into k distinct boxes.
const distribute = (n: number, k: number, allowEmpty = true) =>
  allowEmpty ? nCr(n + k - 1, k - 1) : nCr(n - 1, k - 1);`,
    },
    pitfalls: [
      "Using permutations where combinations are meant. Ask whether swapping two chosen items produces a different outcome; if not, order does not matter.",
      "Computing n! directly for n above about 20. It overflows 64 bits — cancel terms as you go, or work under a modulus.",
      "Double counting overlapping cases. If two conditions can both hold, inclusion-exclusion is required.",
      "Forgetting to divide by the factorial of each repeated group when arranging a multiset.",
      "Counting the hard way when complementary counting is easier — 'at least one' is usually total minus 'none'.",
    ],
    problems: {
      easy: [
        { name: "Pascal's Triangle", url: "https://leetcode.com/problems/pascals-triangle/" },
        { name: "Pascal's Triangle II", url: "https://leetcode.com/problems/pascals-triangle-ii/" },
      ],
      medium: [
        { name: "Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
        { name: "Permutation Sequence", url: "https://leetcode.com/problems/permutation-sequence/" },
        { name: "Count Sorted Vowel Strings", url: "https://leetcode.com/problems/count-sorted-vowel-strings/" },
        { name: "Number of Sets of K Non-Overlapping Line Segments", url: "https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/" },
      ],
      hard: [
        { name: "Count Anagrams", url: "https://leetcode.com/problems/count-anagrams/" },
        { name: "Number of Ways to Reorder Array to Get Same BST", url: "https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/" },
        { name: "Count All Valid Pickup and Delivery Options", url: "https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/" },
      ],
    },
  },
];
