// Arrays
export const name = "Arrays";

export const topics = [
  {
    id: "array-sorting-quicksort",
    title: "QuickSort",
    subtitle: "Sorting",
    summary: "Efficient average-case time complexity (O(nlog n)).",
    complexity: {
      time: "O(n log n)",
      space: "O(log n)",
      note: "Average case. A bad pivot on already-sorted input gives O(n²); randomised or median-of-three pivots make that vanishingly unlikely.",
    },
    description: "QuickSort is a highly efficient, in-place, comparison-based sorting algorithm that follows the divide-and-conquer paradigm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted. The key to its performance is the partitioning step, which places the pivot in its correct sorted position, allowing for independent sorting of sub-arrays. While its worst-case time complexity is O(N^2), its average-case performance is O(N log N), making it one of the fastest general-purpose sorting algorithms in practice. It is not a stable sort, meaning the relative order of equal elements might change.",
    useCases: [
      "General-purpose sorting for large datasets. In-memory sorting where stability is not a concern. Often used as a default sort in many programming languages' standard libraries."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="bg-blue-200 p-4 rounded-lg w-full text-center">
                                <span class="font-bold text-lg">Initial Array:</span> [5, 2, 8, 1, 9]
                            </div>
                            <div class="text-2xl text-gray-500 my-4">↓ Divide (Pivot: 5)</div>
                            <div class="flex justify-center w-full space-x-4">
                                <div class="bg-gray-100 p-4 rounded-lg text-center border-l-4 border-red-500">
                                    <span class="font-bold text-md">Left:</span> [2, 1]
                                </div>
                                <div class="bg-green-100 p-4 rounded-lg text-center border-l-4 border-green-500">
                                    <span class="font-bold text-md">Pivot:</span> [5]
                                </div>
                                <div class="bg-gray-100 p-4 rounded-lg text-center border-l-4 border-red-500">
                                    <span class="font-bold text-md">Right:</span> [8, 9]
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-4">The process repeats on the sub-partitions until sorted.</div>
                        </div>
                    `,
    code: {
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
      typescript: `function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left: number[] = [];
    const right: number[] = [];
    const equal: number[] = [];
    for (const item of arr) {
        if (item < pivot) {
            left.push(item);
        } else if (item > pivot) {
            right.push(item);
        } else {
            equal.push(item);
        }
    }
    return [...quickSort(left), ...equal, ...quickSort(right)];
}`,
    },
    problems: {
      "easy": [
        {
          "name": "First Bad Version (Binary Search)",
          "url": "https://leetcode.com/problems/first-bad-version/"
        },
        {
          "name": "Valid Anagram",
          "url": "https://leetcode.com/problems/valid-anagram/"
        },
        {
          "name": "Contains Duplicate",
          "url": "https://leetcode.com/problems/contains-duplicate/"
        },
        {
          "name": "Merge Sorted Array",
          "url": "https://leetcode.com/problems/merge-sorted-array/"
        },
        {
          "name": "Intersection of Two Arrays",
          "url": "https://leetcode.com/problems/intersection-of-two-arrays/"
        }
      ],
      "medium": [
        {
          "name": "Sort Colors",
          "url": "https://leetcode.com/problems/sort-colors/"
        },
        {
          "name": "Kth Largest Element in an Array",
          "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
        },
        {
          "name": "Largest Number",
          "url": "https://leetcode.com/problems/largest-number/"
        },
        {
          "name": "Wiggle Sort II",
          "url": "https://leetcode.com/problems/wiggle-sort-ii/"
        },
        {
          "name": "Count of Smaller Numbers After Self",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        {
          "name": "Group Anagrams",
          "url": "https://leetcode.com/problems/group-anagrams/"
        },
        {
          "name": "3Sum",
          "url": "https://leetcode.com/problems/3sum/"
        },
        {
          "name": "Minimum Absolute Difference in BST",
          "url": "https://leetcode.com/problems/minimum-absolute-difference-in-bst/"
        },
        {
          "name": "Find Peak Element",
          "url": "https://leetcode.com/problems/find-peak-element/"
        },
        {
          "name": "Search in Rotated Sorted Array",
          "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
        }
      ],
      "hard": [
        {
          "name": "Find Median from Data Stream",
          "url": "https://leetcode.com/problems/find-median-from-data-stream/"
        },
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Count of Range Sum",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        },
        {
          "name": "Maximum Gap",
          "url": "https://leetcode.com/problems/maximum-gap/"
        }
      ]
    },
  },
  {
    id: "array-sorting-mergesort",
    title: "MergeSort",
    subtitle: "Sorting",
    summary: "Stable sort, useful when order matters (O(nlog n)).",
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      note: "Guaranteed — unlike quicksort there is no bad input. The O(n) buffer is the price. Stable.",
    },
    description: "MergeSort is a stable, divide-and-conquer sorting algorithm. It recursively divides the array into two halves, sorts them, and then merges the sorted halves back together. The merging step is the key to its stability, meaning that elements with equal values maintain their relative order from the original array. This property is crucial in certain applications where the original order of duplicates is significant. MergeSort has a guaranteed time complexity of O(N log N) in all cases (best, average, worst) and a space complexity of O(N) due to the temporary arrays used during merging. Its predictable performance makes it a reliable choice for various sorting tasks, especially when data is too large to fit in memory (external sorting).",
    useCases: [
      "Sorting linked lists (it's efficient as pointers don't need to be moved, unlike arrays). External sorting where data is too large for memory. When a stable sort is required (e.g., sorting by primary key then secondary key). Parallel sorting algorithms."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="bg-blue-200 p-4 rounded-lg w-full text-center">
                                <span class="font-bold text-lg">Unsorted:</span> [4, 1, 3, 2]
                            </div>
                            <div class="text-2xl text-gray-500 my-4">↓ Divide</div>
                            <div class="flex justify-center w-full space-x-4">
                                <div class="bg-gray-100 p-4 rounded-lg text-center border-l-4 border-red-500">
                                    <span class="font-bold text-md">Left:</span> [4, 1]
                                </div>
                                <div class="bg-gray-100 p-4 rounded-lg text-center border-l-4 border-red-500">
                                    <span class="font-bold text-md">Right:</span> [3, 2]
                                </div>
                            </div>
                            <div class="text-2xl text-gray-500 my-4">↓ Sort & Merge</div>
                            <div class="bg-green-100 p-4 rounded-lg w-full text-center">
                                <span class="font-bold text-lg">Sorted:</span> [1, 2, 3, 4]
                            </div>
                        </div>
                    `,
    code: {
      python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]
        
        merge_sort(left)
        merge_sort(right)

        i = j = k = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1
        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1
        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1`,
      typescript: `function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Merge Sorted Array",
          "url": "https://leetcode.com/problems/merge-sorted-array/"
        },
        {
          "name": "Relative Sort Array",
          "url": "https://leetcode.com/problems/relative-sort-array/"
        },
        {
          "name": "Height Checker",
          "url": "https://leetcode.com/problems/height-checker/"
        },
        {
          "name": "Sort Array By Parity",
          "url": "https://leetcode.com/problems/sort-array-by-parity/"
        },
        {
          "name": "Kth Missing Positive Number",
          "url": "https://leetcode.com/problems/kth-missing-positive-number/"
        }
      ],
      "medium": [
        {
          "name": "Sort List",
          "url": "https://leetcode.com/problems/sort-list/"
        },
        {
          "name": "Count of Smaller Numbers After Self",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        {
          "name": "Inversion Count (GFG)",
          "url": "https://www.geeksforgeeks.org/counting-inversions/"
        },
        {
          "name": "Reverse Pairs",
          "url": "https://leetcode.com/problems/reverse-pairs/"
        },
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "The K-th Lexicographical String of All Happy Strings of Length n",
          "url": "https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/"
        },
        {
          "name": "Sort an Array",
          "url": "https://leetcode.com/problems/sort-an-array/"
        },
        {
          "name": "Split Array into Consecutive Subsequences",
          "url": "https://leetcode.com/problems/split-array-into-consecutive-subsequences/"
        },
        {
          "name": "Minimum Number of Arrows to Burst Balloons",
          "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
        },
        {
          "name": "Task Scheduler",
          "url": "https://leetcode.com/problems/task-scheduler/"
        }
      ],
      "hard": [
        {
          "name": "Count of Range Sum",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        {
          "name": "Maximum Gap",
          "url": "https://leetcode.com/problems/maximum-gap/"
        },
        {
          "name": "Data Stream as Disjoint Intervals",
          "url": "https://leetcode.com/problems/data-stream-as-disjoint-intervals/"
        },
        {
          "name": "Russian Doll Envelopes",
          "url": "https://leetcode.com/problems/russian-doll-envelopes/"
        },
        {
          "name": "Sort Items by Groups Respecting Dependencies",
          "url": "https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/"
        }
      ]
    },
  },
  {
    id: "array-searching-binary-search",
    title: "Binary Search",
    subtitle: "Searching",
    summary: "Fast search in sorted arrays (O(log n)).",
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      note: "Requires sorted input. If you must sort first, the sort dominates at O(n log n).",
    },
    description: "Binary search is a highly efficient algorithm for finding a specific item within a sorted collection of items. Its core principle is to repeatedly divide the search interval in half. It starts by examining the middle element of the array. If the target value matches the middle element, its position is returned. If the target is less than the middle element, the search continues in the lower half of the array; otherwise, it continues in the upper half. This process continues until the target value is found or the search interval becomes empty. This logarithmic time complexity (O(log N)) makes it significantly faster than linear search for large datasets, as it eliminates half of the remaining search space with each comparison.",
    useCases: [
      "Searching for an element in any sorted array or list. Finding an element in a rotated sorted array. Finding a specific boundary (e.g., first occurrence of an element, square root of a number, minimum value satisfying a condition). Implementing `lower_bound` or `upper_bound` functionalities."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="bg-gray-200 p-2 rounded-lg w-full text-center">
                                <span class="font-bold text-lg">Array:</span> [1, 3, 5, 7, 9] | Target: 7
                            </div>
                            <div class="flex justify-between w-full my-2 font-mono text-sm">
                                <div><span class="font-bold text-red-500">Low</span></div>
                                <div><span class="font-bold text-green-500">Mid</span></div>
                                <div><span class="font-bold text-blue-500">High</span></div>
                            </div>
                            <div class="bg-blue-100 p-2 rounded-lg w-full text-center">
                                <span class="text-xl">1 &lt; 7</span> (Search right half)
                            </div>
                            <div class="text-2xl text-gray-500 my-2">↓</div>
                            <div class="bg-gray-200 p-2 rounded-lg w-full text-center">
                                <span class="font-bold text-lg">New Array:</span> [7, 9]
                            </div>
                            <div class="text-sm text-gray-600 mt-2">The process continues until the target is found.</div>
                        </div>
                    `,
    code: {
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      typescript: `function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Binary Search",
          "url": "https://leetcode.com/problems/binary-search/"
        },
        {
          "name": "First Bad Version",
          "url": "https://leetcode.com/problems/first-bad-version/"
        },
        {
          "name": "Search Insert Position",
          "url": "https://leetcode.com/problems/search-insert-position/"
        },
        {
          "name": "Sqrt(x)",
          "url": "https://leetcode.com/problems/sqrtx/"
        },
        {
          "name": "Guess Number Higher or Lower",
          "url": "https://leetcode.com/problems/guess-number-higher-or-lower/"
        }
      ],
      "medium": [
        {
          "name": "Search in Rotated Sorted Array",
          "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
        },
        {
          "name": "Find First and Last Position of Element in Sorted Array",
          "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
        },
        {
          "name": "Find Peak Element",
          "url": "https://leetcode.com/problems/find-peak-element/"
        },
        {
          "name": "Find the Duplicate Number",
          "url": "https://leetcode.com/problems/find-the-duplicate-number/"
        },
        {
          "name": "Search a 2D Matrix",
          "url": "https://leetcode.com/problems/search-a-2d-matrix/"
        },
        {
          "name": "Koko Eating Bananas",
          "url": "https://leetcode.com/problems/koko-eating-bananas/"
        },
        {
          "name": "Find the Smallest Divisor Given a Threshold",
          "url": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/"
        },
        {
          "name": "Time Based Key-Value Store",
          "url": "https://leetcode.com/problems/time-based-key-value-store/"
        },
        {
          "name": "Capacity To Ship Packages Within D Days",
          "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
        },
        {
          "name": "Minimum Speed to Arrive on Time",
          "url": "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/"
        }
      ],
      "hard": [
        {
          "name": "Median of Two Sorted Arrays",
          "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
        },
        {
          "name": "Split Array Largest Sum",
          "url": "https://leetcode.com/problems/split-array-largest-sum/"
        },
        {
          "name": "Find the Closest Pair from Two Sorted Arrays (GFG)",
          "url": "https://www.geeksforgeeks.org/find-the-closest-pair-from-two-sorted-arrays/"
        },
        {
          "name": "Count of Range Sum",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        {
          "name": "Minimize Max Distance to Gas Station",
          "url": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/"
        }
      ]
    },
  },
  {
    id: "array-twopointers",
    title: "Two Pointers",
    subtitle: "Two Pointers",
    summary: "In-place manipulation, often for sorted arrays (e.g., removing duplicates).",
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "Collapses a brute-force O(n²) pair scan into one pass — but usually needs sorted input first.",
    },
    description: "The Two Pointers pattern is a fundamental technique in algorithmic problem-solving, characterized by the use of two distinct pointers that traverse a data structure. These pointers can move from opposite ends towards the center, or in the same direction, depending on the problem's requirements. This method is particularly effective for problems involving sorted arrays, strings, or linked lists where relationships between elements need to be evaluated or maintained. A common application is finding pairs or triplets that sum to a target value. This intelligent movement of pointers allows for a single pass through the data, transforming a brute-force O(N^2) approach (which would involve nested loops checking every pair) into a more efficient O(N) solution. This efficiency gain is a significant advantage, especially for large datasets. Beyond numerical sums, it's also adept at tasks like checking if a string is a palindrome or removing duplicates from a sorted array in-place.",
    useCases: [
      "Finding a pair with a target sum in a sorted array. Reversing an array or string in-place. Removing duplicates from a sorted array. Detecting cycles in a linked list (Fast & Slow Pointers is a specialized form). Comparing elements from opposite ends of a data structure."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="bg-gray-200 p-2 rounded-lg w-full text-center font-mono">
                                <span class="font-bold text-blue-500">L</span> [1, 2, 3, 4, 5] <span class="font-bold text-red-500">R</span>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Pointers from opposite ends.</div>
                            <div class="bg-gray-200 p-2 rounded-lg w-full text-center font-mono mt-4">
                                <span class="font-bold text-blue-500">L</span> <span class="font-bold text-red-500">R</span> [1, 2, 3, 4, 5]
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Pointers in the same direction.</div>
                        </div>
                    `,
    code: {
      python: `def two_sum_sorted(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        current_sum = arr[l] + arr[r]
        if current_sum == target:
            return [l, r]
        elif current_sum < target:
            l += 1
        else:
            r -= 1
    return [-1, -1]`,
      typescript: `function twoSumSorted(arr: number[], target: number): number[] {
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
        const currentSum = arr[l] + arr[r];
        if (currentSum === target) {
            return [l, r];
        } else if (currentSum < target) {
            l++;
        } else {
            r--;
        }
    }
    return [-1, -1];
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Two Sum II",
          "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
        },
        {
          "name": "Valid Palindrome",
          "url": "https://leetcode.com/problems/valid-palindrome/"
        },
        {
          "name": "Remove Duplicates from Sorted Array",
          "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
        },
        {
          "name": "Sort Array By Parity",
          "url": "https://leetcode.com/problems/sort-array-by-parity/"
        },
        {
          "name": "Squares of a Sorted Array",
          "url": "https://leetcode.com/problems/squares-of-a-sorted-array/"
        }
      ],
      "medium": [
        {
          "name": "3Sum",
          "url": "https://leetcode.com/problems/3sum/"
        },
        {
          "name": "Container With Most Water",
          "url": "https://leetcode.com/problems/container-with-most-water/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        },
        {
          "name": "Sort Colors",
          "url": "https://leetcode.com/problems/sort-colors/"
        },
        {
          "name": "Remove Nth Node From End of List",
          "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
        },
        {
          "name": "Two Sum IV - Input is a BST",
          "url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"
        },
        {
          "name": "Valid Triangle Number",
          "url": "https://leetcode.com/problems/valid-triangle-number/"
        },
        {
          "name": "Rotate Image",
          "url": "https://leetcode.com/problems/rotate-image/"
        },
        {
          "name": "Fruit Into Baskets",
          "url": "https://leetcode.com/problems/fruit-into-baskets/"
        },
        {
          "name": "Longest Substring Without Repeating Characters",
          "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
        }
      ],
      "hard": [
        {
          "name": "Minimum Window Substring",
          "url": "https://leetcode.com/problems/minimum-window-substring/"
        },
        {
          "name": "Trapping Rain Water",
          "url": "https://leetcode.com/problems/trapping-rain-water/"
        },
        {
          "name": "Count of Range Sum",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        {
          "name": "Largest Rectangle in Histogram",
          "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
        },
        {
          "name": "Maximal Rectangle",
          "url": "https://leetcode.com/problems/maximal-rectangle/"
        }
      ]
    },
  },
  {
    id: "array-sliding-window",
    title: "Sliding Window",
    subtitle: "Sliding Window",
    summary: "Subarray problems, finding maximum/minimum within a window.",
    complexity: {
      time: "O(n)",
      space: "O(k)",
      note: "Each element enters and leaves the window at most once, so the nested-looking loop is still linear.",
    },
    description: "The Sliding Window pattern is an optimization technique widely applied to problems that involve finding a contiguous subarray, substring, or sublist that satisfies certain conditions. Instead of re-evaluating each subsegment from scratch, which often leads to quadratic time complexity, this pattern maintains a 'window' of elements and efficiently updates calculations as the window slides across the data structure. The core mechanism involves two pointers, typically referred to as `start` (or `left`) and `end` (or `right`), which define the boundaries of the current window. The `end` pointer typically expands the window by including new elements, while the `start` pointer contracts it by removing old elements when a specific condition is met (e.g., the window size exceeds a limit, or a constraint is violated). The power of this approach lies in its incremental updates, resulting in an optimal O(N) time complexity for many problems.",
    useCases: [
      "Finding the longest substring with K distinct characters. Finding the maximum sum of a subarray of a fixed size. Minimum window substring problems. Finding permutations of a string within another string. Problems involving character frequency counts or sums within a dynamic range."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="relative w-full h-10 bg-gray-200 rounded-lg">
                                <div class="absolute top-0 left-1/4 h-full w-1/3 bg-blue-300 bg-opacity-70 border-x-2 border-blue-500 flex items-center justify-center">
                                    <span class="font-bold text-blue-800">Window</span>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">The window slides over the array.</div>
                        </div>
                    `,
    code: {
      python: `def max_sum_subarray(arr, k):
    if k > len(arr):
        return -1
    max_sum = window_sum = sum(arr[:k])
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
      typescript: `function maxSumSubarray(arr: number[], k: number): number {
    if (k > arr.length) return -1;
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    let maxSum = windowSum;
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i-k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Maximum Average Subarray I",
          "url": "https://leetcode.com/problems/maximum-average-subarray-i/"
        },
        {
          "name": "Max Consecutive Ones III",
          "url": "https://leetcode.com/problems/max-consecutive-ones-iii/"
        },
        {
          "name": "Contains Duplicate II",
          "url": "https://leetcode.com/problems/contains-duplicate-ii/"
        },
        {
          "name": "Longest Substring Without Repeating Characters",
          "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
        },
        {
          "name": "Find All Anagrams in a String",
          "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
        }
      ],
      "medium": [
        {
          "name": "Longest Substring Without Repeating Characters",
          "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
        },
        {
          "name": "Permutation in String",
          "url": "https://leetcode.com/problems/permutation-in-string/"
        },
        {
          "name": "Minimum Size Subarray Sum",
          "url": "https://leetcode.com/problems/minimum-size-subarray-sum/"
        },
        {
          "name": "Longest Repeating Character Replacement",
          "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
        },
        {
          "name": "Sliding Window Maximum",
          "url": "https://leetcode.com/problems/sliding-window-maximum/"
        },
        {
          "name": "Fruit Into Baskets",
          "url": "https://leetcode.com/problems/fruit-into-baskets/"
        },
        {
          "name": "Binary Subarrays With Sum",
          "url": "https://leetcode.com/problems/binary-subarrays-with-sum/"
        },
        {
          "name": "Count Number of Nice Subarrays",
          "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/"
        },
        {
          "name": "Subarrays with K Different Integers",
          "url": "https://leetcode.com/problems/subarrays-with-k-different-integers/"
        },
        {
          "name": "Longest Subarray of 1s After Deleting One Element",
          "url": "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/"
        }
      ],
      "hard": [
        {
          "name": "Minimum Window Substring",
          "url": "https://leetcode.com/problems/minimum-window-substring/"
        },
        {
          "name": "Substring with Concatenation of All Words",
          "url": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
        },
        {
          "name": "Minimum Number of K Consecutive Bit Flips",
          "url": "https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/"
        },
        {
          "name": "Shortest Subarray with Sum at Least K",
          "url": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/"
        },
        {
          "name": "Maximum of Absolute Value Expression",
          "url": "https://leetcode.com/problems/maximum-of-absolute-value-expression/"
        }
      ]
    },
  },
  {
    id: "array-prefix-sum",
    title: "Prefix Sum Array",
    subtitle: "Prefix Sum",
    summary: "Pre-computation to efficiently query sums of subarrays.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "O(n) once to build, then every range-sum query is O(1). Worth it from about two queries onwards.",
    },
    description: "A Prefix Sum Array (or Cumulative Sum Array) is a data structure used to efficiently answer queries about the sum of a range of elements in an array. The prefix sum at index `i` is the sum of all elements from index 0 to `i`. By pre-computing these sums in a single pass (O(N) time), the sum of any subarray `[i, j]` can then be found in constant time (O(1)) by simply subtracting `prefix_sum[i-1]` from `prefix_sum[j]`. This technique avoids repeated summation over ranges, which would otherwise take O(N) for each query, making it highly valuable for problems with many range sum queries on a static array. It's also foundational for more complex techniques like 2D prefix sums or using hash maps with prefix sums to find specific subarray sums.",
    useCases: [
      "Finding subarray sums quickly. Problems involving `sum(i, j) = k`. Range queries in static arrays. Finding equilibrium points. Calculating sums of rectangular regions in 2D arrays."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="bg-gray-200 p-2 rounded-lg w-full text-center font-mono">
                                <span class="font-bold text-blue-500">Array:</span> [1, 2, 3, 4]
                            </div>
                            <div class="text-2xl text-gray-500 my-2">↓ Prefix Sum</div>
                            <div class="bg-green-100 p-2 rounded-lg w-full text-center font-mono">
                                <span class="font-bold text-green-700">Prefix Sum:</span> [1, 3, 6, 10]
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Sum of subarray [1, 3] = P[3] - P[0] = 10 - 1 = 9</div>
                        </div>
                    `,
    code: {
      python: `def build_prefix_sum(arr):
    prefix_sum = [0] * len(arr)
    if not arr: return []
    prefix_sum[0] = arr[0]
    for i in range(1, len(arr)):
        prefix_sum[i] = prefix_sum[i-1] + arr[i]
    return prefix_sum

def get_subarray_sum(prefix_sum, i, j):
    if not prefix_sum or i > j or i < 0 or j >= len(prefix_sum):
        return 0 # Or raise error
    if i == 0:
        return prefix_sum[j]
    return prefix_sum[j] - prefix_sum[i-1]`,
      typescript: `function buildPrefixSum(arr: number[]): number[] {
    const prefixSum: number[] = new Array(arr.length).fill(0);
    if (arr.length === 0) return [];
    prefixSum[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i];
    }
    return prefixSum;
}

function getSubarraySum(prefixSum: number[], i: number, j: number): number {
    if (!prefixSum || i > j || i < 0 || j >= prefixSum.length) {
        return 0; // Or throw error
    }
    if (i === 0) {
        return prefixSum[j];
    }
    return prefixSum[j] - prefixSum[i - 1];
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Running Sum of 1d Array",
          "url": "https://leetcode.com/problems/running-sum-of-1d-array/"
        },
        {
          "name": "Range Sum Query - Immutable",
          "url": "https://leetcode.com/problems/range-sum-query-immutable/"
        },
        {
          "name": "Find Pivot Index",
          "url": "https://leetcode.com/problems/find-pivot-index/"
        },
        {
          "name": "Find the Highest Altitude",
          "url": "https://leetcode.com/problems/find-the-highest-altitude/"
        },
        {
          "name": "Subarray Sums Divisible by K",
          "url": "https://leetcode.com/problems/subarray-sums-divisible-by-k/"
        }
      ],
      "medium": [
        {
          "name": "Subarray Sum Equals K",
          "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
        },
        {
          "name": "Product of Array Except Self",
          "url": "https://leetcode.com/problems/product-of-array-except-self/"
        },
        {
          "name": "Binary Subarrays With Sum",
          "url": "https://leetcode.com/problems/binary-subarrays-with-sum/"
        },
        {
          "name": "Find Subarray With Given Sum (GFG)",
          "url": "https://www.geeksforgeeks.org/find-subarray-with-given-sum/"
        },
        {
          "name": "Continuous Subarray Sum",
          "url": "https://leetcode.com/problems/continuous-subarray-sum/"
        },
        {
          "name": "Shortest Unsorted Continuous Subarray",
          "url": "https://leetcode.com/problems/shortest-unsorted-continuous-subarray/"
        },
        {
          "name": "Maximum Product Subarray",
          "url": "https://leetcode.com/problems/maximum-product-subarray/"
        },
        {
          "name": "Maximal Square",
          "url": "https://leetcode.com/problems/maximal-square/"
        },
        {
          "name": "Maximum Size Subarray Sum Equals k",
          "url": "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/"
        },
        {
          "name": "Find K-th Smallest Pair Distance",
          "url": "https://leetcode.com/problems/find-k-th-smallest-pair-distance/"
        }
      ],
      "hard": [
        {
          "name": "Count of Range Sum",
          "url": "https://leetcode.com/problems/count-of-range-sum/"
        },
        {
          "name": "Maximum Subarray Min-Product",
          "url": "https://leetcode.com/problems/maximum-subarray-min-product/"
        },
        {
          "name": "Find Minimum in Rotated Sorted Array II",
          "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/"
        },
        {
          "name": "Trapping Rain Water II",
          "url": "https://leetcode.com/problems/trapping-rain-water-ii/"
        },
        {
          "name": "Maximum of Absolute Value Expression",
          "url": "https://leetcode.com/problems/maximum-of-absolute-value-expression/"
        }
      ]
    },
  },

  {
    id: "array-intervals",
    title: "Merge Intervals",
    subtitle: "Intervals",
    summary: "Sort by start, then sweep — the answer to almost every interval question.",
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      note: "Dominated by the sort. The sweep itself is a single linear pass, and space is O(1) if you may overwrite the input.",
    },
    description:
      "Interval problems look varied but nearly all collapse to the same recipe: sort by start time, then walk left to right maintaining the current interval. Two intervals overlap exactly when one starts before the other ends, so at each step you either extend the current interval's end to the maximum of the two ends, or close it out and begin a new one. That single loop solves merging overlapping intervals, inserting a new interval into a sorted list, and counting how many intervals must be removed to eliminate all overlaps. A different sort answers a different question. Sorting by end time and greedily keeping the earliest-finishing interval maximises how many non-overlapping intervals you can keep — that is the activity selection problem. And when the question is about how many intervals are active at once, as in the meeting-rooms problem, the tool is a sweep line: split every interval into a start event and an end event, sort all events by time, then scan while incrementing on starts and decrementing on ends, tracking the running maximum. Watch the tie-breaking rule — whether an interval ending at time t conflicts with one starting at t is a decision the problem statement must make for you.",
    useCases: [
      "Merging overlapping calendar bookings or reserved time slots.",
      "Finding how many meeting rooms are needed for a set of meetings.",
      "Inserting a new booking into an existing sorted schedule.",
      "Detecting conflicts in resource allocation or shift rosters.",
      "Range consolidation — merging adjacent IP ranges, memory blocks, or version ranges.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">sorted by start, then swept</div>
        <div class="w-full mb-2">
          <div class="relative h-6 mb-1"><div class="absolute bg-blue-200 border border-blue-400 rounded-sm h-6" style="left:0%;width:30%">1-3</div></div>
          <div class="relative h-6 mb-1"><div class="absolute bg-blue-200 border border-blue-400 rounded-sm h-6" style="left:20%;width:30%">2-6</div></div>
          <div class="relative h-6 mb-1"><div class="absolute bg-blue-200 border border-blue-400 rounded-sm h-6" style="left:80%;width:20%">8-10</div></div>
        </div>
        <div class="text-gray-500 my-1">&darr; merge overlaps &darr;</div>
        <div class="w-full">
          <div class="relative h-6 mb-1"><div class="absolute bg-green-200 border border-green-500 rounded-sm h-6" style="left:0%;width:50%">1-6</div></div>
          <div class="relative h-6"><div class="absolute bg-green-200 border border-green-500 rounded-sm h-6" style="left:80%;width:20%">8-10</div></div>
        </div>
      </div>
    `,
    code: {
      python: `# Merge overlapping intervals. Sort by start, extend or close.
def merge(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:              # overlaps the current one
            merged[-1][1] = max(merged[-1][1], end)   # max, not end!
        else:
            merged.append([start, end])
    return merged


# Insert a new interval into an already-sorted list, in one pass.
def insert(intervals, new):
    out, i, n = [], 0, len(intervals)
    while i < n and intervals[i][1] < new[0]:   # entirely before
        out.append(intervals[i]); i += 1
    while i < n and intervals[i][0] <= new[1]:  # overlapping - absorb
        new = [min(new[0], intervals[i][0]), max(new[1], intervals[i][1])]
        i += 1
    out.append(new)
    out.extend(intervals[i:])                   # entirely after
    return out


# Minimum meeting rooms - a sweep line over start and end events.
def min_meeting_rooms(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))               # a room is taken
        events.append((end, -1))                # a room is freed
    # An end at time t is processed before a start at t, so a room
    # freed at t can be reused at t. Flip this if the problem disagrees.
    events.sort(key=lambda e: (e[0], e[1]))

    rooms = best = 0
    for _, delta in events:
        rooms += delta
        best = max(best, rooms)
    return best


# Maximum non-overlapping intervals - sort by END and take greedily.
def max_non_overlapping(intervals):
    intervals.sort(key=lambda x: x[1])          # by end, not start
    count, last_end = 0, float('-inf')
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`,
      typescript: `// Merge overlapping intervals. Sort by start, extend or close.
function merge(intervals: number[][]): number[][] {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) last[1] = Math.max(last[1], end);  // max, not end
    else merged.push([start, end]);
  }
  return merged;
}

// Insert into an already-sorted list, in one pass.
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const out: number[][] = [];
  let i = 0;
  const n = intervals.length;
  let cur = [...newInterval];

  while (i < n && intervals[i][1] < cur[0]) out.push(intervals[i++]);
  while (i < n && intervals[i][0] <= cur[1]) {
    cur = [Math.min(cur[0], intervals[i][0]), Math.max(cur[1], intervals[i][1])];
    i++;
  }
  out.push(cur);
  while (i < n) out.push(intervals[i++]);
  return out;
}

// Minimum meeting rooms - sweep line over start/end events.
function minMeetingRooms(intervals: number[][]): number {
  const events: [number, number][] = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }
  // Ends sort before starts at equal time, so a room freed at t is reusable.
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let rooms = 0, best = 0;
  for (const [, delta] of events) {
    rooms += delta;
    best = Math.max(best, rooms);
  }
  return best;
}

// Maximum non-overlapping intervals - sort by END, take greedily.
function maxNonOverlapping(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) { count++; lastEnd = end; }
  }
  return count;
}`,
    },
    pitfalls: [
      "Setting the merged end to the new interval's end rather than the maximum of both. A fully-contained interval then truncates the one holding it.",
      "Sorting by start when the problem wants maximum non-overlapping intervals. That one needs sorting by end — sorting by start gives the wrong greedy answer.",
      "Getting the tie-break wrong at equal timestamps. Decide explicitly whether [1,2] and [2,3] overlap, and encode it in the comparison.",
      "Mutating the input array's sub-arrays in place and surprising the caller. Copy first if the input must survive.",
      "Forgetting the empty input case before indexing element zero.",
    ],
    problems: {
      easy: [
        { name: "Summary Ranges", url: "https://leetcode.com/problems/summary-ranges/" },
        { name: "Meeting Rooms", url: "https://leetcode.com/problems/meeting-rooms/" },
      ],
      medium: [
        { name: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/" },
        { name: "Insert Interval", url: "https://leetcode.com/problems/insert-interval/" },
        { name: "Non-overlapping Intervals", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
        { name: "Meeting Rooms II", url: "https://leetcode.com/problems/meeting-rooms-ii/" },
        { name: "Interval List Intersections", url: "https://leetcode.com/problems/interval-list-intersections/" },
        { name: "Minimum Number of Arrows to Burst Balloons", url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" },
      ],
      hard: [
        { name: "Employee Free Time", url: "https://leetcode.com/problems/employee-free-time/" },
        { name: "Data Stream as Disjoint Intervals", url: "https://leetcode.com/problems/data-stream-as-disjoint-intervals/" },
        { name: "The Skyline Problem", url: "https://leetcode.com/problems/the-skyline-problem/" },
      ],
    },
  },

  {
    id: "array-binary-search-answer",
    title: "Binary Search on the Answer",
    subtitle: "Searching",
    summary: "Search the space of possible answers, not the array — when the check is monotonic.",
    complexity: {
      time: "O(n log R)",
      space: "O(1)",
      note: "R is the range of candidate answers, not the array length. Each of the log R guesses costs one O(n) feasibility check.",
    },
    description:
      "This is the pattern that turns hard optimisation questions into easy ones, and it is worth recognising by its phrasing: 'minimise the maximum', 'maximise the minimum', or 'find the smallest capacity/speed/size such that something is possible'. Instead of searching the input, you binary search the range of possible answers, and at each guess you ask a yes/no question: is this candidate feasible? The whole approach hinges on monotonicity — if capacity 10 works, capacity 11 must also work, which means the feasible answers form a contiguous block and binary search can find its boundary. State that monotonicity out loud before writing code, because if it does not hold the method silently produces nonsense. The implementation splits into two independent pieces: the search skeleton, which is always the same, and a feasibility function, which is usually a simple greedy simulation. Writing the check first tends to make the rest obvious. Koko eating bananas asks for the smallest eating speed that finishes in time; splitting an array into k subarrays asks for the smallest possible largest subarray sum; both are the same code with a different check.",
    useCases: [
      "Minimise the maximum load when splitting work among k workers or machines.",
      "Find the smallest capacity, speed, or budget that makes a task feasible in the given limit.",
      "Maximise the minimum distance when placing items — cows in stalls, routers along a corridor.",
      "Find the k-th smallest value in a sorted matrix or a multiplication table by searching values rather than positions.",
      "Any problem where you can cheaply test a candidate answer but not directly compute the optimum.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">feasibility is monotonic - find the boundary</div>
        <div class="flex space-x-2 mb-2">
          <div class="p-2 bg-red-200 border border-red-500 rounded-sm w-10 text-center">1</div>
          <div class="p-2 bg-red-200 border border-red-500 rounded-sm w-10 text-center">2</div>
          <div class="p-2 bg-red-200 border border-red-500 rounded-sm w-10 text-center">3</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm w-10 text-center">4</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm w-10 text-center">5</div>
          <div class="p-2 bg-green-200 border border-green-500 rounded-sm w-10 text-center">6</div>
        </div>
        <div class="flex space-x-2 mb-2 text-sm">
          <div class="w-32 text-red-500">too slow</div>
          <div class="w-32 text-green-700">fast enough</div>
        </div>
        <div class="p-2 bg-blue-100 border border-blue-300 rounded-md">answer = 4, the first feasible value</div>
      </div>
    `,
    code: {
      python: `# The skeleton is always the same. Only the feasibility check changes.
def binary_search_answer(lo, hi, feasible):
    while lo < hi:
        mid = (lo + hi) // 2          # bias low - we want the FIRST true
        if feasible(mid):
            hi = mid                  # mid might be the answer; keep it
        else:
            lo = mid + 1              # mid is too small; discard it
    return lo


# Koko eating bananas: smallest speed that finishes within h hours.
import math

def min_eating_speed(piles, h):
    def feasible(speed):
        hours = sum(math.ceil(p / speed) for p in piles)
        return hours <= h
    return binary_search_answer(1, max(piles), feasible)


# Split an array into k subarrays, minimising the largest subarray sum.
def split_array(nums, k):
    def feasible(limit):
        parts, current = 1, 0
        for x in nums:
            if current + x > limit:
                parts += 1            # start a new subarray
                current = x
            else:
                current += x
        return parts <= k
    # lower bound: the largest single element must fit in some part
    # upper bound: one part holding everything
    return binary_search_answer(max(nums), sum(nums), feasible)


# Maximise the MINIMUM - note the flipped comparison in the skeleton.
def max_min_distance(positions, k):
    positions.sort()
    def feasible(gap):
        placed, last = 1, positions[0]
        for p in positions[1:]:
            if p - last >= gap:
                placed += 1
                last = p
        return placed >= k

    lo, hi = 0, positions[-1] - positions[0]
    while lo < hi:
        mid = (lo + hi + 1) // 2      # bias HIGH when maximising
        if feasible(mid):
            lo = mid
        else:
            hi = mid - 1
    return lo`,
      typescript: `// The skeleton never changes. Only \`feasible\` does.
function binarySearchAnswer(
  lo: number,
  hi: number,
  feasible: (x: number) => boolean
): number {
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);   // bias low - want the FIRST true
    if (feasible(mid)) hi = mid;             // might be the answer, keep it
    else lo = mid + 1;                       // too small, discard it
  }
  return lo;
}

// Koko eating bananas: smallest speed finishing within h hours.
function minEatingSpeed(piles: number[], h: number): number {
  const feasible = (speed: number) =>
    piles.reduce((sum, p) => sum + Math.ceil(p / speed), 0) <= h;
  return binarySearchAnswer(1, Math.max(...piles), feasible);
}

// Split into k subarrays, minimising the largest subarray sum.
function splitArray(nums: number[], k: number): number {
  const feasible = (limit: number) => {
    let parts = 1, current = 0;
    for (const x of nums) {
      if (current + x > limit) { parts++; current = x; }
      else current += x;
    }
    return parts <= k;
  };
  const lo = Math.max(...nums);              // largest element must fit
  const hi = nums.reduce((a, b) => a + b, 0); // one part holds everything
  return binarySearchAnswer(lo, hi, feasible);
}

// Maximise the MINIMUM - the midpoint must bias HIGH to avoid looping.
function maxMinDistance(positions: number[], k: number): number {
  positions.sort((a, b) => a - b);
  const feasible = (gap: number) => {
    let placed = 1, last = positions[0];
    for (const p of positions.slice(1)) {
      if (p - last >= gap) { placed++; last = p; }
    }
    return placed >= k;
  };

  let lo = 0, hi = positions[positions.length - 1] - positions[0];
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);    // bias HIGH when maximising
    if (feasible(mid)) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}`,
    },
    pitfalls: [
      "Applying it without checking monotonicity. If feasibility flips back and forth, binary search lands somewhere arbitrary and gives no error.",
      "Using the low-biased midpoint when maximising. With lo = mid the loop never terminates unless the midpoint rounds up.",
      "Choosing bounds that exclude the answer. For 'split array', the low bound is max(nums), not 0 — no partition can beat its largest element.",
      "Searching the array indices out of habit. Here the search space is the answer's value range, which is often far larger than n.",
      "Writing the feasibility check with an off-by-one that only shows at the boundary. Test it directly on the smallest and largest candidates.",
    ],
    problems: {
      easy: [
        { name: "Sqrt(x)", url: "https://leetcode.com/problems/sqrtx/" },
        { name: "Valid Perfect Square", url: "https://leetcode.com/problems/valid-perfect-square/" },
      ],
      medium: [
        { name: "Koko Eating Bananas", url: "https://leetcode.com/problems/koko-eating-bananas/" },
        { name: "Capacity To Ship Packages Within D Days", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
        { name: "Minimum Speed to Arrive on Time", url: "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/" },
        { name: "Magnetic Force Between Two Balls", url: "https://leetcode.com/problems/magnetic-force-between-two-balls/" },
        { name: "Find the Smallest Divisor Given a Threshold", url: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/" },
        { name: "Minimum Number of Days to Make m Bouquets", url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/" },
      ],
      hard: [
        { name: "Split Array Largest Sum", url: "https://leetcode.com/problems/split-array-largest-sum/" },
        { name: "Kth Smallest Element in a Sorted Matrix", url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
        { name: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
        { name: "Minimize Max Distance to Gas Station", url: "https://leetcode.com/problems/minimize-max-distance-to-gas-station/" },
      ],
    },
  },
];
