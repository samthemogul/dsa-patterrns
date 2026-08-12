// Backtracking
export const name = "Backtracking";

export const topics = [
  {
    id: "backtracking-permutations",
    title: "Permutations",
    subtitle: "Backtracking",
    summary: "Generates all possible orderings of elements by exploring choices and backtracking.",
    complexity: {
      time: "O(n · n!)",
      space: "O(n)",
      note: "There are n! permutations and each costs O(n) to copy out. Space is the recursion depth, excluding output.",
    },
    description: "Backtracking is a general algorithmic technique for finding all (or some) solutions to computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions. It abandons a candidate ('backtracks') as soon as it determines that the candidate cannot possibly be completed to a valid solution. This pruning of the search space is what makes backtracking more efficient than brute-force enumeration. It's essentially a depth-first search (DFS) on a state-space tree. At each node in the tree, the algorithm checks if the current partial solution can lead to a complete, valid solution. If it can, it proceeds to extend the solution. If not, it 'backtracks' to the previous decision point and tries a different option. The core idea involves making a choice, exploring the consequences of that choice, and if it leads to a dead end, undoing the choice and trying another. This recursive exploration of possibilities makes it suitable for problems where solutions are built step-by-step.",
    useCases: [
      "Combinatorial Problems: Generating permutations, combinations, or subsets. Constraint Satisfaction Problems: N-Queens Problem (placing N chess queens on an N×N chessboard such that no two queens attack each other), Sudoku Solver (filling a 9×9 grid with digits). Maze Solving: Finding a path from a start to an end point in a maze. Game AI: Exploring possible moves in games like chess or tic-tac-toe to find optimal strategies. Subset Sum Problem: Finding a subset of a given set of numbers that sums up to a specific target."
    ],
    illustration: `
                        <div class="flex flex-col items-center font-mono text-sm">
                            <div class="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2">
                                Input: [1, 2, 3]
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Decision Tree for Permutations:</div>
                            <div class="mt-4 flex flex-col items-center">
                                <div class="w-20 h-8 bg-gray-200 rounded-md flex items-center justify-center">[]</div>
                                <div class="flex mt-2 space-x-4">
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-8 bg-gray-100 rounded-md flex items-center justify-center">1</div>
                                        <div class="flex mt-1 space-x-2">
                                            <div class="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">1,2</div>
                                            <div class="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">1,3</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-8 bg-gray-100 rounded-md flex items-center justify-center">2</div>
                                        <div class="flex mt-1 space-x-2">
                                            <div class="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">2,1</div>
                                            <div class="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">2,3</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-8 bg-gray-100 rounded-md flex items-center justify-center">3</div>
                                        <div class="flex mt-1 space-x-2">
                                            <div class="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">3,1</div>
                                            <div class="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">3,2</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Each path to a leaf is a permutation.</div>
                        </div>
                    `,
    code: {
      python: `def permute(nums):
    result = []
    current_permutation = []
    used = [False] * len(nums)

    def backtrack():
        if len(current_permutation) == len(nums):
            result.append(list(current_permutation))
            return

        for i in range(len(nums)):
            if used[i]:
                continue

            current_permutation.append(nums[i])
            used[i] = True
            backtrack()
            used[i] = False
            current_permutation.pop()

    backtrack()
    return result`,
      typescript: `function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const currentPermutation: number[] = [];
    const used: boolean[] = new Array(nums.length).fill(false);

    function backtrack(): void {
        if (currentPermutation.length === nums.length) {
            result.push([...currentPermutation]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }

            currentPermutation.push(nums[i]);
            used[i] = true;
            backtrack();
            used[i] = false;
            currentPermutation.pop();
        }
    }

    backtrack();
    return result;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Subsets",
          "url": "https://leetcode.com/problems/subsets/"
        },
        {
          "name": "Combinations",
          "url": "https://leetcode.com/problems/combinations/"
        },
        {
          "name": "Letter Combinations of a Phone Number",
          "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
        }
      ],
      "medium": [
        {
          "name": "Permutations",
          "url": "https://leetcode.com/problems/permutations/"
        },
        {
          "name": "Permutations II",
          "url": "https://leetcode.com/problems/permutations-ii/"
        },
        {
          "name": "Combination Sum",
          "url": "https://leetcode.com/problems/combination-sum/"
        },
        {
          "name": "Combination Sum II",
          "url": "https://leetcode.com/problems/combination-sum-ii/"
        },
        {
          "name": "Subsets II",
          "url": "https://leetcode.com/problems/subsets-ii/"
        },
        {
          "name": "N-Queens",
          "url": "https://leetcode.com/problems/n-queens/"
        },
        {
          "name": "Sudoku Solver",
          "url": "https://leetcode.com/problems/sudoku-solver/"
        },
        {
          "name": "Word Search",
          "url": "https://leetcode.com/problems/word-search/"
        },
        {
          "name": "Palindrome Partitioning",
          "url": "https://leetcode.com/problems/palindrome-partitioning/"
        },
        {
          "name": "Generate Parentheses",
          "url": "https://leetcode.com/problems/generate-parentheses/"
        }
      ],
      "hard": [
        {
          "name": "N-Queens II",
          "url": "https://leetcode.com/problems/n-queens-ii/"
        },
        {
          "name": "Word Search II",
          "url": "https://leetcode.com/problems/word-search-ii/"
        },
        {
          "name": "Expression Add Operators",
          "url": "https://leetcode.com/problems/expression-add-operators/"
        },
        {
          "name": "The Number of Good Subsets",
          "url": "https://leetcode.com/problems/the-number-of-good-subsets/"
        },
        {
          "name": "Longest Increasing Path in a Matrix",
          "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"
        }
      ]
    },
  },
];
