// Bit Manipulation
export const name = "Bit Manipulation";

export const topics = [
  {
    id: "bit-manipulation-basics",
    title: "Basic Operations",
    subtitle: "Bit Manipulation",
    summary: "Leveraging bitwise operators (AND, OR, XOR, NOT, shifts) for efficient computations.",
    complexity: {
      time: "O(1)",
      space: "O(1)",
      note: "Each operation is a single machine instruction on word-sized integers.",
    },
    description: "Bit manipulation involves directly working with the individual bits of a number. This technique is crucial for optimizing solutions in terms of both time and space, especially in competitive programming. Understanding bitwise operators like AND (&), OR (|), XOR (^), NOT (~), left shift (<<), and right shift (>>) allows for highly efficient arithmetic, checking, setting, or clearing specific bits, and solving problems that might otherwise require complex mathematical operations.",
    useCases: [
      "Checking if a number is even/odd. Swapping numbers without a temporary variable. Counting set bits. Power of 2 checks. Optimizing space for boolean arrays. Representing sets (bitmasks)."
    ],
    illustration: `
                        <div class="flex flex-col items-center font-mono text-sm">
                            <div class="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2">
                                5 (0101) & 3 (0011) = 1 (0001)
                            </div>
                            <div class="bg-green-100 p-2 rounded-md border border-green-300">
                                5 (0101) | 3 (0011) = 7 (0111)
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Direct manipulation of binary representations.</div>
                        </div>
                    `,
    code: {
      python: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1) == 0)

def count_set_bits(n):
    count = 0
    while n > 0:
        n &= (n - 1) # Brian Kernighan's algorithm
        count += 1
    return count

def get_kth_bit(n, k):
    return (n >> k) & 1`,
      typescript: `function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}

function countSetBits(n: number): number {
    let count = 0;
    while (n > 0) {
        n &= (n - 1); // Brian Kernighan's algorithm
        count++;
    }
    return count;
}

function getKthBit(n: number, k: number): number {
    return (n >> k) & 1;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Number of 1 Bits",
          "url": "https://leetcode.com/problems/number-of-1-bits/"
        },
        {
          "name": "Power of Two",
          "url": "https://leetcode.com/problems/power-of-two/"
        },
        {
          "name": "Single Number",
          "url": "https://leetcode.com/problems/single-number/"
        },
        {
          "name": "Missing Number",
          "url": "https://leetcode.com/problems/missing-number/"
        },
        {
          "name": "Hamming Distance",
          "url": "https://leetcode.com/problems/hamming-distance/"
        }
      ],
      "medium": [
        {
          "name": "Bitwise AND of Numbers Range",
          "url": "https://leetcode.com/problems/bitwise-and-of-numbers-range/"
        },
        {
          "name": "Sum of Two Integers",
          "url": "https://leetcode.com/problems/sum-of-two-integers/"
        },
        {
          "name": "Divide Two Integers",
          "url": "https://leetcode.com/problems/divide-two-integers/"
        },
        {
          "name": "Maximum XOR Subarray",
          "url": "https://www.geeksforgeeks.org/maximum-xor-subarray/"
        },
        {
          "name": "Single Number II",
          "url": "https://leetcode.com/problems/single-number-ii/"
        },
        {
          "name": "Counting Bits",
          "url": "https://leetcode.com/problems/counting-bits/"
        },
        {
          "name": "Subsets",
          "url": "https://leetcode.com/problems/subsets/"
        },
        {
          "name": "Maximum Product of Word Lengths",
          "url": "https://leetcode.com/problems/maximum-product-of-word-lengths/"
        },
        {
          "name": "Find the Duplicate Number",
          "url": "https://leetcode.com/problems/find-the-duplicate-number/"
        },
        {
          "name": "Decode XORed Array",
          "url": "https://leetcode.com/problems/decode-xored-array/"
        }
      ],
      "hard": [
        {
          "name": "Maximum XOR of Two Numbers in an Array",
          "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
        },
        {
          "name": "Smallest Subarray With All Occurrences of Most Frequent Element",
          "url": "https://leetcode.com/problems/shortest-subarray-with-all-occurrences-of-most-frequent-element/"
        },
        {
          "name": "Count Triplets That Can Form Two Arrays of XOR Sum Equals Zero",
          "url": "https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-xor-sum-equals-zero/"
        },
        {
          "name": "Concatenated Words",
          "url": "https://leetcode.com/problems/concatenated-words/"
        },
        {
          "name": "Sudoku Solver",
          "url": "https://leetcode.com/problems/sudoku-solver/"
        }
      ]
    },
  },
];
