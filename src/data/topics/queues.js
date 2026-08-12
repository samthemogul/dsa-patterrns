// Queues
export const name = "Queues";

export const topics = [
  {
    id: "queues-basics",
    title: "Enqueue/Dequeue Operations",
    subtitle: "Queues",
    summary: "FIFO data structure for managing tasks, BFS, and more.",
    complexity: {
      time: "O(1)",
      space: "O(n)",
      note: "Use a deque or ring buffer — dequeuing from the front of a plain array is O(n) per operation.",
    },
    description: "A Queue is a linear data structure that follows the First-In, First-Out (FIFO) principle, meaning the element added first is the first one to be removed. The primary operations are `enqueue` (add an element to the rear/back) and `dequeue` (remove an element from the front). Unlike stacks, queues are used when the order of processing matters, such as in task scheduling, managing shared resources, or implementing breadth-first search (BFS) algorithms. They can be implemented using arrays or linked lists, offering O(1) average time complexity for both enqueue and dequeue operations. Queues are essential for scenarios where items need to be processed in the order they arrive.",
    useCases: [
      "Breadth-First Search (BFS) graph traversal. Task scheduling in operating systems. Printer job queues. Call center systems. Buffering data for streaming."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="flex items-center space-x-2">
                                <div class="text-sm text-gray-600">Front</div>
                                <div class="border-2 border-gray-400 rounded-md w-48 h-12 flex items-center justify-between p-1">
                                    <div class="bg-blue-200 w-12 h-10 flex items-center justify-center border border-blue-400 rounded-sm">A</div>
                                    <div class="bg-blue-200 w-12 h-10 flex items-center justify-center border border-blue-400 rounded-sm">B</div>
                                    <div class="bg-blue-200 w-12 h-10 flex items-center justify-center border border-blue-400 rounded-sm">C</div>
                                </div>
                                <div class="text-sm text-gray-600">Rear</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">FIFO: A is first out, C is last in.</div>
                        </div>
                    `,
    code: {
      python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)`,
      typescript: `class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift(); // O(N) for array.shift(), consider LinkedList for O(1)
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
          "name": "Implement Queue using Stacks",
          "url": "https://leetcode.com/problems/implement-queue-using-stacks/"
        },
        {
          "name": "Number of Recent Calls",
          "url": "https://leetcode.com/problems/number-of-recent-calls/"
        },
        {
          "name": "Moving Average from Data Stream",
          "url": "https://leetcode.com/problems/moving-average-from-data-stream/"
        },
        {
          "name": "Last Stone Weight",
          "url": "https://leetcode.com/problems/last-stone-weight/"
        },
        {
          "name": "Recent Counter",
          "url": "https://leetcode.com/problems/number-of-recent-calls/"
        }
      ],
      "medium": [
        {
          "name": "Walls and Gates",
          "url": "https://leetcode.com/problems/walls-and-gates/"
        },
        {
          "name": "01 Matrix",
          "url": "https://leetcode.com/problems/01-matrix/"
        },
        {
          "name": "Rotting Oranges",
          "url": "https://leetcode.com/problems/rotting-oranges/"
        },
        {
          "name": "Course Schedule",
          "url": "https://leetcode.com/problems/course-schedule/"
        },
        {
          "name": "Open the Lock",
          "url": "https://leetcode.com/problems/open-the-lock/"
        },
        {
          "name": "Perfect Squares",
          "url": "https://leetcode.com/problems/perfect-squares/"
        },
        {
          "name": "Shortest Path in Binary Matrix",
          "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
        },
        {
          "name": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
          "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"
        },
        {
          "name": "Cheapest Flights Within K Stops",
          "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
        },
        {
          "name": "Network Delay Time",
          "url": "https://leetcode.com/problems/network-delay-time/"
        }
      ],
      "hard": [
        {
          "name": "Word Ladder",
          "url": "https://leetcode.com/problems/word-ladder/"
        },
        {
          "name": "Cut Off Trees for Golf Event",
          "url": "https://leetcode.com/problems/cut-off-trees-for-golf-event/"
        },
        {
          "name": "Bus Routes",
          "url": "https://leetcode.com/problems/bus-routes/"
        },
        {
          "name": "Shortest Path to Get All Keys",
          "url": "https://leetcode.com/problems/shortest-path-to-get-all-keys/"
        },
        {
          "name": "The Maze III",
          "url": "https://leetcode.com/problems/the-maze-iii/"
        }
      ]
    },
  },
];
