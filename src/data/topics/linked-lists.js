// Linked Lists
export const name = "Linked Lists";

export const topics = [
  {
    id: "ll-traversal",
    title: "Traversal",
    subtitle: "Linked Lists",
    summary: "Iterating through the list, understanding the node structure.",
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "No random access — reaching index k always costs k steps. This is the trade for O(1) insertion.",
    },
    description: "Linked list traversal is the fundamental process of visiting each node in the list exactly once, typically starting from the head node and following the `next` pointers until the end of the list (indicated by a `null` or `None` pointer). Unlike arrays, linked lists do not support direct access to elements by index, so traversal is the only way to access individual nodes. This operation is a prerequisite for almost all other linked list algorithms, including searching for an element, inserting or deleting a node at a specific position, or reversing the list. Understanding the node structure (data and next pointer) is key to correctly implementing traversal and subsequent operations.",
    useCases: [
      "Finding a specific element in the list. Printing all elements. Counting the number of nodes. Reversing the list. Copying a linked list. Converting a linked list to an array."
    ],
    illustration: `
                        <div class="flex items-center justify-center space-x-2">
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-200 p-2 rounded-lg">Head</div>
                            </div>
                            <div class="text-3xl text-gray-400">→</div>
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-100 p-2 rounded-lg border-2 border-blue-500">Node 1</div>
                                <div class="text-sm text-gray-500 mt-1">next</div>
                            </div>
                            <div class="text-3xl text-gray-400">→</div>
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-100 p-2 rounded-lg border-2 border-blue-500">Node 2</div>
                                <div class="text-sm text-gray-500 mt-1">next</div>
                            </div>
                            <div class="text-3xl text-gray-400">→</div>
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-100 p-2 rounded-lg border-2 border-blue-500">Node N</div>
                                <div class="text-sm text-gray-500 mt-1">null</div>
                            </div>
                        </div>
                    `,
    code: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def traverse(head):
    current = head
    while current:
        print(current.data, end=" -> ")
        current = current.next
    print("None")`,
      typescript: `class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function traverse(head: ListNode | null): void {
    let current = head;
    let result = '';
    while (current) {
        result += current.val + ' -> ';
        current = current.next;
    }
    console.log(result + 'null');
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Middle of the Linked List",
          "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
        },
        {
          "name": "Delete Node in a Linked List",
          "url": "https://leetcode.com/problems/delete-node-in-a-linked-list/"
        },
        {
          "name": "Linked List Cycle",
          "url": "https://leetcode.com/problems/linked-list-cycle/"
        },
        {
          "name": "Remove Linked List Elements",
          "url": "https://leetcode.com/problems/remove-linked-list-elements/"
        },
        {
          "name": "Merge Two Sorted Lists",
          "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
        }
      ],
      "medium": [
        {
          "name": "Odd Even Linked List",
          "url": "https://leetcode.com/problems/odd-even-linked-list/"
        },
        {
          "name": "Remove Nth Node From End of List",
          "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
        },
        {
          "name": "Remove Duplicates from Sorted List II",
          "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/"
        },
        {
          "name": "Partition List",
          "url": "https://leetcode.com/problems/partition-list/"
        },
        {
          "name": "Flatten a Multilevel Doubly Linked List",
          "url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"
        },
        {
          "name": "Copy List with Random Pointer",
          "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
        },
        {
          "name": "Reorder List",
          "url": "https://leetcode.com/problems/reorder-list/"
        },
        {
          "name": "Intersection of Two Linked Lists",
          "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/"
        },
        {
          "name": "Add Two Numbers",
          "url": "https://leetcode.com/problems/add-two-numbers/"
        },
        {
          "name": "Swap Nodes in Pairs",
          "url": "https://leetcode.com/problems/swap-nodes-in-pairs/"
        }
      ],
      "hard": [
        {
          "name": "Reverse Nodes in k-Group",
          "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
        },
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Sort List",
          "url": "https://leetcode.com/problems/sort-list/"
        },
        {
          "name": "Palindrome Linked List",
          "url": "https://leetcode.com/problems/palindrome-linked-list/"
        },
        {
          "name": "LRU Cache",
          "url": "https://leetcode.com/problems/lru-cache/"
        }
      ]
    },
  },
  {
    id: "ll-insertion-deletion",
    title: "Insertion/Deletion",
    subtitle: "Linked Lists",
    summary: "Adding/removing nodes at beginning, end, or specific positions.",
    complexity: {
      time: "O(1)",
      space: "O(1)",
      note: "Constant only when you already hold the node. Finding it first costs O(n).",
    },
    description: "Insertion and deletion are fundamental operations in linked lists, allowing dynamic modification of the list's structure. Unlike arrays, these operations can be performed efficiently (O(1) if the position is known, O(N) for searching) by simply updating pointers, without needing to shift elements. Insertion involves creating a new node and correctly adjusting the `next` pointers of the preceding and succeeding nodes. Deletion involves bypassing the node to be removed by linking its predecessor directly to its successor. Special care must be taken for edge cases like inserting/deleting at the head or tail, or in an empty list. These operations highlight the flexibility and dynamic nature of linked lists compared to static arrays.",
    useCases: [
      "Building linked lists dynamically. Implementing queues or stacks. Managing data where frequent insertions/deletions are required, especially in the middle of a sequence. Implementing custom data structures like hash tables with separate chaining."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="flex items-center justify-center space-x-2 mb-4">
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">A</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">B</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">C</div>
                            </div>
                            <div class="text-xl text-blue-500 font-bold">Insertion:</div>
                            <div class="flex items-center justify-center space-x-2 mt-2">
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">A</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-green-200 rounded-lg border-2 border-green-500">NEW</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">B</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">C</div>
                            </div>
                            <div class="text-xl text-red-500 font-bold mt-4">Deletion:</div>
                            <div class="flex items-center justify-center space-x-2 mt-2">
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">A</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-red-200 rounded-lg border-2 border-red-500 line-through">B</div>
                                <div class="text-3xl text-gray-400"></div>
                                <div class="p-2 bg-gray-200 rounded-lg border-2 border-gray-400">C</div>
                            </div>
                        </div>
                    `,
    code: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def insert_at_beginning(head, data):
    new_node = Node(data)
    new_node.next = head
    return new_node

def delete_node(head, key):
    current = head
    prev = None
    if current and current.data == key:
        return current.next # Head is the key
    while current and current.data != key:
        prev = current
        current = current.next
    if not current: return head # Key not found
    prev.next = current.next
    return head`,
      typescript: `class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function insertAtBeginning(head: ListNode | null, val: number): ListNode {
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

function deleteNode(head: ListNode | null, key: number): ListNode | null {
    let current = head;
    let prev: ListNode | null = null;
    if (current !== null && current.val === key) {
        return current.next; // Head is the key
    }
    while (current !== null && current.val !== key) {
        prev = current;
        current = current.next;
    }
    if (current === null) return head; // Key not found
    if (prev !== null) {
        prev.next = current.next;
    }
    return head;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Delete Node in a Linked List",
          "url": "https://leetcode.com/problems/delete-node-in-a-linked-list/"
        },
        {
          "name": "Remove Linked List Elements",
          "url": "https://leetcode.com/problems/remove-linked-list-elements/"
        },
        {
          "name": "Merge Two Sorted Lists",
          "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
        },
        {
          "name": "Remove Duplicates from Sorted List",
          "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/"
        },
        {
          "name": "Convert Binary Number in a Linked List to Integer",
          "url": "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/"
        }
      ],
      "medium": [
        {
          "name": "Remove Nth Node From End of List",
          "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
        },
        {
          "name": "Remove Duplicates from Sorted List II",
          "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/"
        },
        {
          "name": "Partition List",
          "url": "https://leetcode.com/problems/partition-list/"
        },
        {
          "name": "Swap Nodes in Pairs",
          "url": "https://leetcode.com/problems/swap-nodes-in-pairs/"
        },
        {
          "name": "Reverse Linked List II",
          "url": "https://leetcode.com/problems/reverse-linked-list-ii/"
        },
        {
          "name": "Add Two Numbers",
          "url": "https://leetcode.com/problems/add-two-numbers/"
        },
        {
          "name": "Flatten a Multilevel Doubly Linked List",
          "url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"
        },
        {
          "name": "Copy List with Random Pointer",
          "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
        },
        {
          "name": "Delete the Middle Node of a Linked List",
          "url": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/"
        },
        {
          "name": "Split Linked List in Parts",
          "url": "https://leetcode.com/problems/split-linked-list-in-parts/"
        }
      ],
      "hard": [
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Reverse Nodes in k-Group",
          "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
        },
        {
          "name": "LRU Cache",
          "url": "https://leetcode.com/problems/lru-cache/"
        },
        {
          "name": "Design In-Memory File System",
          "url": "https://leetcode.com/problems/design-in-memory-file-system/"
        },
        {
          "name": "Sort List",
          "url": "https://leetcode.com/problems/sort-list/"
        }
      ]
    },
  },
  {
    id: "ll-reversal",
    title: "Reversal",
    subtitle: "Linked Lists",
    summary: "In-place reversal, using recursive and iterative approaches.",
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "The iterative three-pointer version is in-place; the recursive version costs O(n) stack.",
    },
    description: "In-place reversal is a classic and essential pattern for manipulating linked data structures, aiming to reverse the order of nodes without allocating significant additional memory (achieving an optimal O(1) auxiliary space complexity). This is achieved by directly modifying the `next` pointers of the existing nodes. The iterative approach typically involves the careful orchestration of three pointers: `previous` (initially null), `current` (initially head), and `next_temp` (a temporary placeholder to store the `current` node's original `next` reference before it is modified). In each iteration, the `current` node's `next` pointer is redirected to point to `previous`, effectively reversing the link. Subsequently, `previous` is updated to the `current` node, and `current` is advanced to the `next_temp` node to continue the process. This step-by-step re-linking continues until `current` becomes `null`, at which point `previous` will be pointing to the new head of the reversed list. This pattern is foundational for linked list manipulation, enabling efficient reversal (O(N) time) while adhering to strict O(1) space constraints.",
    useCases: [
      "Reversing an entire linked list. Reversing a specific sub-list within a larger list. Reversing every K-element sub-list. Checking for palindrome linked lists (by comparing first half with reversed second half). As a subproblem in more complex list manipulations."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="flex items-center justify-center space-x-2">
                                <div class="p-2 bg-blue-100 rounded-lg border-2 border-blue-500">1</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-blue-100 rounded-lg border-2 border-blue-500">2</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="p-2 bg-blue-100 rounded-lg border-2 border-blue-500">3</div>
                            </div>
                            <div class="text-3xl text-gray-400 my-4">↓</div>
                            <div class="flex items-center justify-center space-x-2">
                                <div class="p-2 bg-green-100 rounded-lg border-2 border-green-500">1</div>
                                <div class="text-3xl text-gray-400">←</div>
                                <div class="p-2 bg-green-100 rounded-lg border-2 border-green-500">2</div>
                                <div class="text-3xl text-gray-400">←</div>
                                <div class="p-2 bg-green-100 rounded-lg border-2 border-green-500">3</div>
                            </div>
                        </div>
                    `,
    code: {
      python: `def reverse_list(head):
    prev = None
    current = head
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    return prev`,
      typescript: `function reverseList(head: ListNode | null): ListNode | null {
    let prev = null;
    let curr = head;
    while (curr) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Reverse Linked List",
          "url": "https://leetcode.com/problems/reverse-linked-list/"
        },
        {
          "name": "Middle of the Linked List",
          "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
        },
        {
          "name": "Palindrome Linked List",
          "url": "https://leetcode.com/problems/palindrome-linked-list/"
        },
        {
          "name": "Linked List Cycle",
          "url": "https://leetcode.com/problems/linked-list-cycle/"
        },
        {
          "name": "Merge Two Sorted Lists",
          "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
        }
      ],
      "medium": [
        {
          "name": "Reverse Linked List II",
          "url": "https://leetcode.com/problems/reverse-linked-list-ii/"
        },
        {
          "name": "Swap Nodes in Pairs",
          "url": "https://leetcode.com/problems/swap-nodes-in-pairs/"
        },
        {
          "name": "Remove Nth Node From End of List",
          "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
        },
        {
          "name": "Rotate List",
          "url": "https://leetcode.com/problems/rotate-list/"
        },
        {
          "name": "Reorder List",
          "url": "https://leetcode.com/problems/reorder-list/"
        },
        {
          "name": "Intersection of Two Linked Lists",
          "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/"
        },
        {
          "name": "Delete the Middle Node of a Linked List",
          "url": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/"
        },
        {
          "name": "Partition List",
          "url": "https://leetcode.com/problems/partition-list/"
        },
        {
          "name": "Flatten a Multilevel Doubly Linked List",
          "url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"
        },
        {
          "name": "Split Linked List in Parts",
          "url": "https://leetcode.com/problems/split-linked-list-in-parts/"
        }
      ],
      "hard": [
        {
          "name": "Reverse Nodes in k-Group",
          "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
        },
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Sort List",
          "url": "https://leetcode.com/problems/sort-list/"
        },
        {
          "name": "LRU Cache",
          "url": "https://leetcode.com/problems/lru-cache/"
        },
        {
          "name": "Design In-Memory File System",
          "url": "https://leetcode.com/problems/design-in-memory-file-system/"
        }
      ]
    },
  },
  {
    id: "ll-cycle-detection",
    title: "Cycle Detection",
    subtitle: "Linked Lists",
    summary: "Floyd's Tortoise and Hare algorithm.",
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "Floyd's tortoise and hare beats the hash-set approach on space, which is usually the point of the question.",
    },
    description: "Cycle Detection is a classic problem in linked lists, often solved using Floyd's Tortoise and Hare algorithm (also known as the Fast & Slow Pointers technique). This algorithm uses two pointers: a 'slow' pointer that moves one step at a time, and a 'fast' pointer that moves two steps at a time. If there is a cycle in the linked list, the fast pointer will eventually 'catch up' to and meet the slow pointer within the cycle. If the fast pointer reaches the end of the list (null) without meeting the slow pointer, then no cycle exists. This method is highly efficient, achieving O(N) time complexity and O(1) space complexity, as it avoids the need for additional data structures like hash sets to track visited nodes. It can also be extended to find the starting node of the cycle.",
    useCases: [
      "Detecting if a linked list contains a cycle. Finding the starting node of a cycle. Determining the length of a cycle. Solving problems that can be rephrased as cycle detection (e.g., Happy Number, finding duplicates in an array)."
    ],
    illustration: `
                        <div class="flex items-center justify-center">
                            <div class="relative">
                                <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">S</div>
                                <div class="absolute top-0 left-12 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">F</div>
                                <div class="w-24 h-24 rounded-full border-4 border-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                            </div>
                        </div>
                        <div class="text-sm text-gray-600 mt-2">Slow (S) and Fast (F) pointers traverse the list. If they meet, a cycle exists.</div>
                    `,
    code: {
      python: `def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      typescript: `function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Linked List Cycle",
          "url": "https://leetcode.com/problems/linked-list-cycle/"
        },
        {
          "name": "Middle of the Linked List",
          "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
        },
        {
          "name": "Palindrome Linked List",
          "url": "https://leetcode.com/problems/palindrome-linked-list/"
        },
        {
          "name": "Happy Number",
          "url": "https://leetcode.com/problems/happy-number/"
        },
        {
          "name": "Linked List Cycle II",
          "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
        }
      ],
      "medium": [
        {
          "name": "Find the Duplicate Number",
          "url": "https://leetcode.com/problems/find-the-duplicate-number/"
        },
        {
          "name": "Linked List Cycle II",
          "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
        },
        {
          "name": "Find the Celebrity",
          "url": "https://leetcode.com/problems/find-the-celebrity/"
        },
        {
          "name": "Reorder List",
          "url": "https://leetcode.com/problems/reorder-list/"
        },
        {
          "name": "Intersection of Two Linked Lists",
          "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/"
        },
        {
          "name": "Add Two Numbers",
          "url": "https://leetcode.com/problems/add-two-numbers/"
        },
        {
          "name": "LRU Cache",
          "url": "https://leetcode.com/problems/lru-cache/"
        },
        {
          "name": "Sort List",
          "url": "https://leetcode.com/problems/sort-list/"
        },
        {
          "name": "Copy List with Random Pointer",
          "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
        },
        {
          "name": "Reorder List",
          "url": "https://leetcode.com/problems/reorder-list/"
        }
      ],
      "hard": [
        {
          "name": "Reverse Nodes in k-Group",
          "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
        },
        {
          "name": "Merge k Sorted Lists",
          "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
        },
        {
          "name": "Data Stream as Disjoint Intervals",
          "url": "https://leetcode.com/problems/data-stream-as-disjoint-intervals/"
        },
        {
          "name": "Smallest Range II",
          "url": "https://leetcode.com/problems/smallest-range-ii/"
        },
        {
          "name": "Design In-Memory File System",
          "url": "https://leetcode.com/problems/design-in-memory-file-system/"
        }
      ]
    },
  },
];
