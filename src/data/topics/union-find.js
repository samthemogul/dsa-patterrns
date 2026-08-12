// Union Find
export const name = "Union Find";

export const topics = [
  {
    id: "union-find-basics",
    title: "Union Find (Disjoint Set Union)",
    subtitle: "Union Find",
    summary: "Manages a collection of disjoint sets, supporting efficient union and find operations.",
    complexity: {
      time: "O(α(n))",
      space: "O(n)",
      note: "With path compression and union by rank. The inverse Ackermann function is under 5 for any input you will ever see — effectively constant.",
    },
    description: "Union-Find, also known as Disjoint Set Union (DSU), is a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. It supports two primary operations: `find` and `union`. The `find` operation determines which subset a particular element is in, typically by returning a 'representative' element of that subset. The `union` operation merges two subsets into a single subset. This data structure is highly optimized for these two operations, often achieving nearly constant time complexity (amortized $O(\\alpha(n))$, where $\\alpha$ is the inverse Ackermann function, which grows extremely slowly, making it practically constant for all realistic inputs). It's particularly useful for problems involving grouping elements or checking connectivity. The efficiency comes from two key optimizations: path compression during `find` and union by rank/size during `union`. Path compression flattens the tree structure by making every node point directly to the root, while union by rank/size attaches the smaller tree under the root of the larger tree to keep the trees shallow.",
    useCases: [
      "Network Connectivity: Determining if two nodes in a network are connected, or finding connected components. Minimum Spanning Tree (MST) Algorithms: Kruskal's algorithm heavily relies on Union-Find to detect cycles and merge components. Image Processing: Grouping pixels of similar color to identify objects. Social Networks: Finding groups of friends or communities. Percolation Theory: Modeling the flow through a random network."
    ],
    illustration: `
                        <div class="flex flex-col items-center font-mono text-sm">
                            <div class="flex space-x-2 mb-2">
                                <div class="bg-blue-100 p-2 rounded-md border border-blue-300">0</div>
                                <div class="bg-blue-100 p-2 rounded-md border border-blue-300">1</div>
                                <div class="bg-blue-100 p-2 rounded-md border border-blue-300">2</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Initial: Each element in its own set.</div>
                            <div class="text-2xl text-gray-500 my-4">↓ Union(0, 1)</div>
                            <div class="flex space-x-2">
                                <div class="bg-green-100 p-2 rounded-md border border-green-300">0</div>
                                <div class="bg-green-100 p-2 rounded-md border border-green-300">1</div>
                                <div class="bg-blue-100 p-2 rounded-md border border-blue-300">2</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">After Union(0,1): 0 and 1 are in the same set.</div>
                        </div>
                    `,
    code: {
      python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
        self.count = size

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        rootI = self.find(i)
        rootJ = self.find(j)

        if rootI != rootJ:
            if self.rank[rootI] < self.rank[rootJ]:
                self.parent[rootI] = rootJ
            elif self.rank[rootI] > self.rank[rootJ]:
                self.parent[rootJ] = rootI
            else:
                self.parent[rootJ] = rootI
                self.rank[rootI] += 1
            self.count -= 1
            return True
        return False

    def get_count(self):
        return self.count`,
      typescript: `class UnionFind {
    parent: number[];
    rank: number[];
    count: number;

    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = new Array(size).fill(0);
        this.count = size;
    }

    find(i: number): number {
        if (this.parent[i] === i) {
            return i;
        }
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    union(i: number, j: number): boolean {
        const rootI = this.find(i);
        const rootJ = this.find(j);

        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            this.count--;
            return true;
        }
        return false;
    }

    getCount(): number {
        return this.count;
    }
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Number of Provinces",
          "url": "https://leetcode.com/problems/number-of-provinces/"
        },
        {
          "name": "Friend Circles",
          "url": "https://leetcode.com/problems/friend-circles/"
        },
        {
          "name": "Graph Valid Tree (GFG)",
          "url": "https://www.geeksforgeeks.org/graph-valid-tree/"
        }
      ],
      "medium": [
        {
          "name": "Surrounded Regions",
          "url": "https://leetcode.com/problems/surrounded-regions/"
        },
        {
          "name": "Satisfiability of Equality Equations",
          "url": "https://leetcode.com/problems/satisfiability-of-equality-equations/"
        },
        {
          "name": "Number of Connected Components in an Undirected Graph",
          "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
        },
        {
          "name": "Smallest String With Swaps",
          "url": "https://leetcode.com/problems/smallest-string-with-swaps/"
        },
        {
          "name": "Accounts Merge",
          "url": "https://leetcode.com/problems/accounts-merge/"
        }
      ],
      "hard": [
        {
          "name": "Number of Islands II",
          "url": "https://leetcode.com/problems/number-of-islands-ii/"
        },
        {
          "name": "Checking Existence of Edge Length Limited Paths",
          "url": "https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/"
        },
        {
          "name": "Couples Holding Hands",
          "url": "https://leetcode.com/problems/couples-holding-hands/"
        },
        {
          "name": "Longest Consecutive Sequence",
          "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
        },
        {
          "name": "Minimum Spanning Tree (Kruskal's Algorithm)",
          "url": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"
        }
      ]
    },
  },
];
