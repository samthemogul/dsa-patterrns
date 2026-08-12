// Stacks
export const name = "Stacks";

export const topics = [
  {
    id: "stacks-basics",
    title: "Push/Pop/Peek Operations",
    subtitle: "Stacks",
    summary: "LIFO data structure for managing function calls, parsing, and more.",
    complexity: {
      time: "O(1)",
      space: "O(n)",
      note: "Push, pop and peek are all constant time on both array- and list-backed stacks.",
    },
    description: "A Stack is a linear data structure that follows the Last-In, First-Out (LIFO) principle. This means the element most recently added is the first one to be removed. The primary operations are `push` (add an element to the top), `pop` (remove the top element), and `peek` (view the top element without removing it). Stacks are conceptually simple but incredibly powerful, widely used in various computing contexts due to their natural fit for problems requiring a specific order of processing, such as managing function call sequences, parsing expressions, or backtracking in algorithms. They can be implemented using arrays or linked lists, with O(1) time complexity for basic operations.",
    useCases: [
      "Function call stack management in programming languages. Undo/Redo functionality in applications. Expression evaluation (infix to postfix/prefix conversion). Backtracking algorithms (e.g., DFS). Browser history management."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="border-2 border-gray-400 rounded-md w-24 h-32 flex flex-col justify-end items-center p-1">
                                <div class="bg-blue-200 w-20 h-8 flex items-center justify-center border border-blue-400 rounded-sm mb-1">C</div>
                                <div class="bg-blue-200 w-20 h-8 flex items-center justify-center border border-blue-400 rounded-sm mb-1">B</div>
                                <div class="bg-blue-200 w-20 h-8 flex items-center justify-center border border-blue-400 rounded-sm">A</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">LIFO: C is top, A is bottom.</div>
                        </div>
                    `,
    code: {
      python: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)`,
      typescript: `class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Valid Parentheses",
          "url": "https://leetcode.com/problems/valid-parentheses/"
        },
        {
          "name": "Min Stack",
          "url": "https://leetcode.com/problems/min-stack/"
        },
        {
          "name": "Implement Stack using Queues",
          "url": "https://leetcode.com/problems/implement-stack-using-queues/"
        },
        {
          "name": "Backspace String Compare",
          "url": "https://leetcode.com/problems/backspace-string-compare/"
        },
        {
          "name": "Baseball Game",
          "url": "https://leetcode.com/problems/baseball-game/"
        }
      ],
      "medium": [
        {
          "name": "Daily Temperatures",
          "url": "https://leetcode.com/problems/daily-temperatures/"
        },
        {
          "name": "Next Greater Element II",
          "url": "https://leetcode.com/problems/next-greater-element-ii/"
        },
        {
          "name": "Decode String",
          "url": "https://leetcode.com/problems/decode-string/"
        },
        {
          "name": "Evaluate Reverse Polish Notation",
          "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
        },
        {
          "name": "Basic Calculator II",
          "url": "https://leetcode.com/problems/basic-calculator-ii/"
        },
        {
          "name": "Longest Valid Parentheses",
          "url": "https://leetcode.com/problems/longest-valid-parentheses/"
        },
        {
          "name": "Remove K Digits",
          "url": "https://leetcode.com/problems/remove-k-digits/"
        },
        {
          "name": "Sum of Subarray Minimums",
          "url": "https://leetcode.com/problems/sum-of-subarray-minimums/"
        },
        {
          "name": "Largest Rectangle in Histogram",
          "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        }
      ],
      "hard": [
        {
          "name": "Largest Rectangle in Histogram",
          "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        },
        {
          "name": "Maximal Rectangle",
          "url": "https://leetcode.com/problems/maximal-rectangle/"
        },
        {
          "name": "Basic Calculator",
          "url": "https://leetcode.com/problems/basic-calculator/"
        },
        {
          "name": "Remove Invalid Parentheses",
          "url": "https://leetcode.com/problems/remove-invalid-parentheses/"
        }
      ]
    },
  },
  {
    id: "stacks-monotonic",
    title: "Monotonic Stack",
    subtitle: "Stacks",
    summary: "A stack where elements are always in increasing or decreasing order.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "Amortised: each element is pushed once and popped at most once, so the inner while loop is not a second factor.",
    },
    description: "A Monotonic Stack is a variant of the stack data structure where the elements are always maintained in a strictly increasing or strictly decreasing order. This property is enforced by popping elements from the stack that violate the monotonicity when a new element is pushed. This pattern is incredibly useful for efficiently finding the 'next greater element', 'next smaller element', 'previous greater element', or 'previous smaller element' for all elements in an array in a single pass (O(N) time complexity). It helps in transforming problems that might otherwise require nested loops (O(N^2)) into linear time solutions by effectively keeping track of relevant elements encountered so far.",
    useCases: [
      "Finding the next greater/smaller element for all elements in an array. Calculating largest rectangle in a histogram. Sum of subarray minimums/maximums. Stock span problem. Any problem where you need to find the nearest element to the left/right that satisfies a certain order condition."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="border-2 border-gray-400 rounded-md w-32 h-32 flex flex-col justify-end items-center p-1">
                                <div class="bg-blue-200 w-28 h-8 flex items-center justify-center border border-blue-400 rounded-sm mb-1">5</div>
                                <div class="bg-blue-200 w-28 h-8 flex items-center justify-center border border-blue-400 rounded-sm mb-1">3</div>
                                <div class="bg-blue-200 w-28 h-8 flex items-center justify-center border border-blue-400 rounded-sm">1</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Monotonically increasing stack (bottom to top).</div>
                        </div>
                    `,
    code: {
      python: `def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = [] # Stores indices
    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            result[stack.pop()] = nums[i]
        stack.append(i)
    return result`,
      typescript: `function nextGreaterElement(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = new Array(n).fill(-1);
    const stack: number[] = []; // Stores indices

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            result[stack.pop()!] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Next Greater Element I",
          "url": "https://leetcode.com/problems/next-greater-element-i/"
        },
        {
          "name": "Daily Temperatures",
          "url": "https://leetcode.com/problems/daily-temperatures/"
        },
        {
          "name": "Final Prices With a Special Discount In a Shop",
          "url": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/"
        },
        {
          "name": "Largest Perimeter Triangle",
          "url": "https://leetcode.com/problems/largest-perimeter-triangle/"
        },
        {
          "name": "Remove Outermost Parentheses",
          "url": "https://leetcode.com/problems/remove-outermost-parentheses/"
        }
      ],
      "medium": [
        {
          "name": "Daily Temperatures",
          "url": "https://leetcode.com/problems/daily-temperatures/"
        },
        {
          "name": "Next Greater Element II",
          "url": "https://leetcode.com/problems/next-greater-element-ii/"
        },
        {
          "name": "Largest Rectangle in Histogram",
          "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        },
        {
          "name": "Sum of Subarray Minimums",
          "url": "https://leetcode.com/problems/sum-of-subarray-minimums/"
        },
        {
          "name": "Remove K Digits",
          "url": "https://leetcode.com/problems/remove-k-digits/"
        },
        {
          "name": "Remove Duplicate Letters",
          "url": "https://leetcode.com/problems/remove-duplicate-letters/"
        },
        {
          "name": "Decode String",
          "url": "https://leetcode.com/problems/decode-string/"
        },
        {
          "name": "Asteroid Collision",
          "url": "https://leetcode.com/problems/asteroid-collision/"
        },
        {
          "name": "Online Stock Span",
          "url": "https://leetcode.com/problems/online-stock-span/"
        }
      ],
      "hard": [
        {
          "name": "Largest Rectangle in Histogram",
          "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        },
        {
          "name": "Maximal Rectangle",
          "url": "https://leetcode.com/problems/maximal-rectangle/"
        },
        {
          "name": "Sum of Subarray Ranges",
          "url": "https://leetcode.com/problems/sum-of-subarray-ranges/"
        },
        {
          "name": "Constrained Subsequence Sum",
          "url": "https://leetcode.com/problems/constrained-subsequence-sum/"
        }
      ]
    },
  },
];
