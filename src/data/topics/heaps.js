// Heaps
export const name = "Heaps";

export const topics = [
  {
    id: "heaps-basics",
    title: "Heap Operations",
    subtitle: "Heaps (Priority Queues)",
    summary: "Binary tree-based data structure for efficient min/max element retrieval.",
    complexity: {
      time: "O(log n)",
      space: "O(n)",
      note: "Push and pop are logarithmic; peeking at the root is O(1). Heapifying an existing array is O(n), not O(n log n).",
    },
    description: "A Heap is a specialized tree-based data structure that satisfies the heap property: for a Max-Heap, the value of each node is greater than or equal to the value of its children, and for a Min-Heap, the value of each node is less than or equal to the value of its children. Heaps are typically implemented as binary trees stored in an array, allowing for efficient (O(log N)) insertion and deletion of the root (min/max element) and O(1) access to the root. The 'heapify' operation, used to build a heap from an unsorted array, takes O(N) time. Heaps are the underlying data structure for Priority Queues, where elements are retrieved based on their priority rather than their insertion order.",
    useCases: [
      "Implementing Priority Queues. HeapSort algorithm. Finding the Kth smallest/largest element. Scheduling tasks based on priority. Dijkstra's algorithm (for efficient edge selection). Prim's algorithm for MST."
    ],
    illustration: `
                        <div class="text-center">
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">10</div>
                                <div class="flex justify-center w-full space-x-4 mt-2">
                                    <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">7</div>
                                    <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">9</div>
                                </div>
                                <div class="flex justify-between w-full mt-2">
                                    <div class="flex justify-center w-1/2 space-x-2">
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">2</div>
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">5</div>
                                    </div>
                                    <div class="flex justify-center w-1/2 space-x-2">
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center"></div>
                                        <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Max-Heap Example: Parent >= Children</div>
                        </div>
                    `,
    code: {
      python: `import heapq

class MinHeap:
    def __init__(self):
        self.heap = []

    def push(self, item):
        heapq.heappush(self.heap, item)

    def pop(self):
        if self.heap:
            return heapq.heappop(self.heap)
        return None

    def peek(self):
        if self.heap:
            return self.heap[0]
        return None

    def is_empty(self):
        return len(self.heap) == 0

    def size(self):
        return len(self.heap)

# Example of building a heap (heapify)
# heapq.heapify(list_data) converts list_data into a heap in-place`,
      typescript: `class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    private getParentIndex(i: number): number { return Math.floor((i - 1) / 2); }
    private getLeftChildIndex(i: number): number { return 2 * i + 1; }
    private getRightChildIndex(i: number): number { return 2 * i + 2; }

    private hasParent(i: number): boolean { return this.getParentIndex(i) >= 0; }
    private hasLeftChild(i: number): boolean { return this.getLeftChildIndex(i) < this.heap.length; }
    private hasRightChild(i: number): boolean { return this.getRightChildIndex(i) < this.heap.length; }

    private parent(i: number): number { return this.heap[this.getParentIndex(i)]; }
    private leftChild(i: number): number { return this.heap[this.getLeftChildIndex(i)]; }
    private rightChild(i: number): number { return this.heap[this.getRightChildIndex(i)]; }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(item: number): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    pop(): number | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const item = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return item;
    }

    peek(): number | undefined {
        if (this.heap.length === 0) return undefined;
        return this.heap[0];
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    size(): number {
        return this.heap.length;
    }

    private heapifyUp(): void {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown(): void {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Last Stone Weight",
          "url": "https://leetcode.com/problems/last-stone-weight/"
        },
        {
          "name": "Kth Largest Element in a Stream",
          "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
        },
        {
          "name": "Find K Closest Elements",
          "url": "https://leetcode.com/problems/find-k-closest-elements/"
        },
        {
          "name": "Minimum Cost to Connect Sticks",
          "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
        },
        {
          "name": "Merge K Sorted Lists (easy version)",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        }
      ],
      "medium": [
        {
          "name": "Top K Frequent Elements",
          "url": "https://leetcode.com/problems/top-k-frequent-elements/"
        },
        {
          "name": "Kth Largest Element in an Array",
          "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
        },
        {
          "name": "Find K Pairs with Smallest Sums",
          "url": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/"
        },
        {
          "name": "Ugly Number II",
          "url": "https://leetcode.com/problems/ugly-number-ii/"
        },
        {
          "name": "Smallest Range Covering Elements from K Lists",
          "url": "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/"
        },
        {
          "name": "Reorganize String",
          "url": "https://leetcode.com/problems/reorganize-string/"
        },
        {
          "name": "Task Scheduler",
          "url": "https://leetcode.com/problems/task-scheduler/"
        },
        {
          "name": "K Closest Points to Origin",
          "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
        },
        {
          "name": "Hand of Straights",
          "url": "https://leetcode.com/problems/hand-of-straights/"
        },
        {
          "name": "Longest Happy String",
          "url": "https://leetcode.com/problems/longest-happy-string/"
        }
      ],
      "hard": [
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Find Median from Data Stream",
          "url": "https://leetcode.com/problems/find-median-from-data-stream/"
        },
        {
          "name": "Sliding Window Maximum",
          "url": "https://leetcode.com/problems/sliding-window-maximum/"
        },
        {
          "name": "Trapping Rain Water II",
          "url": "https://leetcode.com/problems/trapping-rain-water-ii/"
        },
        {
          "name": "Employee Free Time",
          "url": "https://leetcode.com/problems/employee-free-time/"
        }
      ]
    },
  },
  {
    id: "heaps-top-k",
    title: "Top K Elements",
    subtitle: "Heaps (Priority Queues)",
    summary: "Using a heap to efficiently find the K largest/smallest elements.",
    complexity: {
      time: "O(n log k)",
      space: "O(k)",
      note: "Beats sorting when k is much smaller than n — the heap never holds more than k items.",
    },
    description: "The 'Top K Elements' pattern leverages heaps (specifically, min-heaps or max-heaps) to efficiently find the K largest or K smallest elements from a collection of data. For finding the K largest elements, a min-heap of size K is maintained. As elements are processed, if an element is larger than the heap's minimum (root), the minimum is popped, and the new element is pushed. This ensures the heap always contains the K largest elements seen so far. Conversely, for K smallest elements, a max-heap of size K is used. This pattern offers an optimal time complexity of O(N log K) (where N is total elements and K is the desired count) because each insertion/deletion operation on the heap takes O(log K) time. It's significantly more efficient than sorting the entire collection (O(N log N)) when K is much smaller than N.",
    useCases: [
      "Finding the K most frequent elements. Finding the Kth largest/smallest element. Data streaming where you need to maintain top K values. Recommender systems (top K items)."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="bg-blue-100 p-4 rounded-lg w-full text-center">
                                <span class="font-bold text-lg">Input:</span> [3, 2, 1, 5, 6, 4], K=2
                            </div>
                            <div class="text-2xl text-gray-500 my-4">↓ Min-Heap of size K</div>
                            <div class="border-2 border-gray-400 rounded-md w-24 h-24 flex flex-col justify-center items-center p-1">
                                <div class="bg-green-200 w-20 h-8 flex items-center justify-center border border-green-400 rounded-sm mb-1">5</div>
                                <div class="bg-green-200 w-20 h-8 flex items-center justify-center border border-green-400 rounded-sm">6</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Heap contains the 2 largest elements seen so far.</div>
                        </div>
                    `,
    code: {
      python: `import heapq

def find_k_largest(nums, k):
    # Use a min-heap to store the k largest elements
    # The smallest element in the heap is the k-th largest
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap) # Remove smallest if heap size exceeds k
    return min_heap # Contains the k largest elements

def find_kth_largest(nums, k):
    # Same logic, just return the root
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0] if min_heap else None`,
      typescript: `class MinHeap { /* ... (MinHeap class definition from heaps-basics) ... */ }
class MaxHeap { /* ... (Similar to MinHeap, but compare for max-heap property) ... */ }

function findKLargest(nums: number[], k: number): number[] {
    const minHeap = new MinHeap(); // Use a min-heap for K largest
    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove the smallest element if size exceeds k
        }
    }
    return minHeap.heap; // The internal array of the heap
}

function findKthLargest(nums: number[], k: number): number | undefined {
    const minHeap = new MinHeap();
    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.peek(); // The root is the Kth largest
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Kth Largest Element in a Stream",
          "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
        },
        {
          "name": "Last Stone Weight",
          "url": "https://leetcode.com/problems/last-stone-weight/"
        },
        {
          "name": "Find K Closest Elements",
          "url": "https://leetcode.com/problems/find-k-closest-elements/"
        },
        {
          "name": "Minimum Cost to Connect Sticks",
          "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
        },
        {
          "name": "Merge Two Sorted Lists (Kth element)",
          "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
        }
      ],
      "medium": [
        {
          "name": "Top K Frequent Elements",
          "url": "https://leetcode.com/problems/top-k-frequent-elements/"
        },
        {
          "name": "Kth Largest Element in an Array",
          "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
        },
        {
          "name": "Find K Pairs with Smallest Sums",
          "url": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/"
        },
        {
          "name": "Ugly Number II",
          "url": "https://leetcode.com/problems/ugly-number-ii/"
        },
        {
          "name": "Smallest Range Covering Elements from K Lists",
          "url": "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/"
        },
        {
          "name": "Reorganize String",
          "url": "https://leetcode.com/problems/reorganize-string/"
        },
        {
          "name": "Task Scheduler",
          "url": "https://leetcode.com/problems/task-scheduler/"
        },
        {
          "name": "K Closest Points to Origin",
          "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
        },
        {
          "name": "Hand of Straights",
          "url": "https://leetcode.com/problems/hand-of-straights/"
        },
        {
          "name": "Longest Happy String",
          "url": "https://leetcode.com/problems/longest-happy-string/"
        }
      ],
      "hard": [
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Find Median from Data Stream",
          "url": "https://leetcode.com/problems/find-median-from-data-stream/"
        },
        {
          "name": "Sliding Window Maximum",
          "url": "https://leetcode.com/problems/sliding-window-maximum/"
        },
        {
          "name": "Trapping Rain Water II",
          "url": "https://leetcode.com/problems/trapping-rain-water-ii/"
        },
        {
          "name": "Employee Free Time",
          "url": "https://leetcode.com/problems/employee-free-time/"
        }
      ]
    },
  },
];
