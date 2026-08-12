// Trees
export const name = "Trees";

export const topics = [
  {
    id: "trees-traversal",
    title: "Traversal",
    subtitle: "Trees",
    summary: "Inorder, Preorder, Postorder (recursive and iterative).",
    complexity: {
      time: "O(n)",
      space: "O(h)",
      note: "Every node is visited once. Space is the recursion stack — O(log n) balanced, O(n) for a degenerate tree.",
    },
    description: "Tree traversal is the process of visiting each node in a tree data structure exactly once. The three common depth-first traversal methods are Inorder (Left, Root, Right), Preorder (Root, Left, Right), and Postorder (Left, Right, Root). Each method is useful for different applications and can be implemented recursively (using the call stack implicitly) or iteratively (using an explicit stack). Inorder traversal, when applied to a Binary Search Tree (BST), visits nodes in non-decreasing order, effectively 'sorting' the elements. Preorder traversal is useful for creating a prefix expression of a tree or for copying a tree. Postorder traversal is often used for deleting a tree or for evaluating postfix expressions. Understanding these distinct visiting orders is crucial for many tree-based algorithms.",
    useCases: [
      "Preorder for creating a prefix expression (e.g., `+ A B`) or copying a tree. Inorder for getting a sorted list of elements in a BST or for in-order processing. Postorder for evaluating a postfix expression (e.g., `A B +`) or deleting a tree. Serialization/deserialization of trees."
    ],
    illustration: `
                        <div class="text-center">
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
                                <div class="flex justify-center w-full space-x-4 mt-2">
                                    <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">2</div>
                                    <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">3</div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">
                                Preorder: 1 -> 2 -> 3
                                <br>Inorder: 2 -> 1 -> 3
                                <br>Postorder: 2 -> 3 -> 1
                            </div>
                        </div>
                    `,
    code: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder_traversal(root):
    res = []
    def traverse(node):
        if not node: return
        res.append(node.val)
        traverse(node.left)
        traverse(node.right)
    traverse(root)
    return res

def inorder_traversal(root):
    res = []
    def traverse(node):
        if not node: return
        traverse(node.left)
        res.append(node.val)
        traverse(node.right)
    traverse(root)
    return res

def postorder_traversal(root):
    res = []
    def traverse(node):
        if not node: return
        traverse(node.left)
        traverse(node.right)
        res.append(node.val)
    traverse(root)
    return res`,
      typescript: `class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function preorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    function traverse(node: TreeNode | null) {
        if (!node) return;
        res.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return res;
}

function inorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    function traverse(node: TreeNode | null) {
        if (!node) return;
        traverse(node.left);
        res.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return res;
}

function postorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    function traverse(node: TreeNode | null) {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        res.push(node.val);
    }
    traverse(root);
    return res;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Invert Binary Tree",
          "url": "https://leetcode.com/problems/invert-binary-tree/"
        },
        {
          "name": "Same Tree",
          "url": "https://leetcode.com/problems/same-tree/"
        },
        {
          "name": "Symmetric Tree",
          "url": "https://leetcode.com/problems/symmetric-tree/"
        },
        {
          "name": "Binary Tree Postorder Traversal",
          "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/"
        },
        {
          "name": "Minimum Depth of Binary Tree",
          "url": "https://leetcode.com/problems/minimum-depth-of-binary-tree/"
        }
      ],
      "medium": [
        {
          "name": "Binary Tree Level Order Traversal",
          "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
        },
        {
          "name": "Binary Tree Zigzag Level Order Traversal",
          "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
        },
        {
          "name": "Validate Binary Search Tree",
          "url": "https://leetcode.com/problems/validate-binary-search-tree/"
        },
        {
          "name": "Construct Binary Tree from Preorder and Inorder Traversal",
          "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
        },
        {
          "name": "Binary Tree Right Side View",
          "url": "https://leetcode.com/problems/binary-tree-right-side-view/"
        },
        {
          "name": "Count Complete Tree Nodes",
          "url": "https://leetcode.com/problems/count-complete-tree-nodes/"
        },
        {
          "name": "Populating Next Right Pointers in Each Node",
          "url": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/"
        },
        {
          "name": "Binary Tree Paths",
          "url": "https://leetcode.com/problems/binary-tree-paths/"
        },
        {
          "name": "Find Largest Value in Each Tree Row",
          "url": "https://leetcode.com/problems/find-largest-value-in-each-tree-row/"
        },
        {
          "name": "Lowest Common Ancestor of a Binary Tree",
          "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
        }
      ],
      "hard": [
        {
          "name": "Serialize and Deserialize Binary Tree",
          "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
        },
        {
          "name": "Binary Tree Maximum Path Sum",
          "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
        },
        {
          "name": "Vertical Order Traversal of a Binary Tree",
          "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/"
        },
        {
          "name": "Distinct Subsequences",
          "url": "https://leetcode.com/problems/distinct-subsequences/"
        },
        {
          "name": "Number of Islands",
          "url": "https://leetcode.com/problems/number-of-islands/"
        }
      ]
    },
  },
  {
    id: "trees-bst",
    title: "Binary Search Trees (BST)",
    subtitle: "Trees",
    summary: "Ordered trees for efficient searching, insertion, and deletion.",
    complexity: {
      time: "O(log n)",
      space: "O(h)",
      note: "Only while balanced. Insert sorted data into an unbalanced BST and it degenerates into a linked list at O(n).",
    },
    description: "A Binary Search Tree (BST) is a special type of binary tree where the nodes are arranged in a specific order to facilitate efficient searching, insertion, and deletion operations. For any given node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater than the node's value. This ordering property allows for logarithmic time complexity (O(log N) on average for a balanced tree) for these operations, similar to binary search on a sorted array. However, in the worst case (e.g., a skewed tree resembling a linked list), these operations can degrade to O(N). Maintaining balance (e.g., using AVL trees or Red-Black trees) is crucial for guaranteeing optimal performance.",
    useCases: [
      "Implementing sorted dynamic data. Dictionary and map implementations. Priority queues (though heaps are more common). Efficient searching and retrieval of data. Database indexing."
    ],
    illustration: `
                        <div class="text-center">
                            <div class="flex flex-col items-center">
                                <div class="bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center justify-center font-bold">8</div>
                                <div class="flex justify-center w-full space-x-4 mt-2">
                                    <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">3</div>
                                    <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">10</div>
                                </div>
                                <div class="flex justify-between w-full mt-2">
                                    <div class="flex justify-center w-1/2 space-x-2">
                                        <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">1</div>
                                        <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">6</div>
                                    </div>
                                    <div class="flex justify-center w-1/2 space-x-2">
                                        <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center"></div>
                                        <div class="bg-gray-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">14</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Left < Root < Right</div>
                        </div>
                    `,
    code: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        if not self.root:
            self.root = TreeNode(val)
            return
        curr = self.root
        while True:
            if val < curr.val:
                if not curr.left:
                    curr.left = TreeNode(val)
                    return
                curr = curr.left
            else:
                if not curr.right:
                    curr.right = TreeNode(val)
                    return
                curr = curr.right

    def search(self, val):
        curr = self.root
        while curr:
            if val == curr.val:
                return True
            elif val < curr.val:
                curr = curr.left
            else:
                curr = curr.right
        return False`,
      typescript: `class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

class BST {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(val: number): void {
        const newNode = new TreeNode(val);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let curr: TreeNode = this.root;
        while (true) {
            if (val < curr.val) {
                if (!curr.left) {
                    curr.left = newNode;
                    return;
                }
                curr = curr.left;
            } else { // Assuming no duplicates for simplicity, or handle as per problem
                if (!curr.right) {
                    curr.right = newNode;
                    return;
                }
                curr = curr.right;
            }
        }
    }

    search(val: number): boolean {
        let curr = this.root;
        while (curr) {
            if (val === curr.val) {
                return true;
            } else if (val < curr.val) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        return false;
    }
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Search in a Binary Search Tree",
          "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/"
        },
        {
          "name": "Minimum Absolute Difference in BST",
          "url": "https://leetcode.com/problems/minimum-absolute-difference-in-bst/"
        },
        {
          "name": "Convert Sorted Array to Binary Search Tree",
          "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"
        },
        {
          "name": "Two Sum IV - Input is a BST",
          "url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"
        },
        {
          "name": "Range Sum of BST",
          "url": "https://leetcode.com/problems/range-sum-of-bst/"
        }
      ],
      "medium": [
        {
          "name": "Validate Binary Search Tree",
          "url": "https://leetcode.com/problems/validate-binary-search-tree/"
        },
        {
          "name": "Delete Node in a BST",
          "url": "https://leetcode.com/problems/delete-node-in-a-bst/"
        },
        {
          "name": "Kth Smallest Element in a BST",
          "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
        },
        {
          "name": "Lowest Common Ancestor of a Binary Search Tree",
          "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
        },
        {
          "name": "Convert BST to Greater Tree",
          "url": "https://leetcode.com/problems/convert-bst-to-greater-tree/"
        },
        {
          "name": "Balance a Binary Search Tree",
          "url": "https://leetcode.com/problems/balance-a-binary-search-tree/"
        },
        {
          "name": "Find Mode in Binary Search Tree",
          "url": "https://leetcode.com/problems/find-mode-in-binary-search-tree/"
        },
        {
          "name": "Recover Binary Search Tree",
          "url": "https://leetcode.com/problems/recover-binary-search-tree/"
        },
        {
          "name": "Construct Binary Search Tree from Preorder Traversal",
          "url": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/"
        },
        {
          "name": "Unique Binary Search Trees II",
          "url": "https://leetcode.com/problems/unique-binary-search-trees-ii/"
        }
      ],
      "hard": [
        {
          "name": "Serialize and Deserialize BST",
          "url": "https://leetcode.com/problems/serialize-and-deserialize-bst/"
        },
        {
          "name": "Count of Smaller Numbers After Self",
          "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
        },
        {
          "name": "Maximum Sum BST in Binary Tree",
          "url": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/"
        },
        {
          "name": "Number of Ways to Reconstruct a Tree",
          "url": "https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree/"
        },
        {
          "name": "Count Good Nodes in Binary Tree",
          "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/"
        }
      ]
    },
  },
];
