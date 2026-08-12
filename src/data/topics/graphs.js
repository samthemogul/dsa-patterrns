// Graphs
export const name = "Graphs";

export const topics = [
  {
    id: "graphs-traversal-bfs",
    title: "Breadth-First Search (BFS)",
    subtitle: "Traversal",
    summary: "Explores graph level-by-level using a queue.",
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      note: "Visits every vertex and edge once. Gives shortest paths on unweighted graphs for free.",
    },
    description: "Breadth-First Search (BFS) is a fundamental graph traversal algorithm distinguished by its systematic exploration of nodes layer by layer. It operates by visiting all immediate neighbors of a starting node before moving on to their neighbors, and so forth, effectively fanning out from the source. This level-by-level progression makes BFS particularly well-suited for problems where the 'shortest path' is defined by the fewest number of edges in an unweighted graph. The operational mechanism of BFS relies heavily on a queue data structure, which enforces a First-In, First-Out (FIFO) order of node processing. The algorithm begins by adding a starting node to the queue. In a loop, it repeatedly dequeues a node, processes it, and then enqueues all of its unvisited neighbors. This ensures that nodes at depth `d` are fully explored before any nodes at depth `d+1` are visited. While it can be memory-intensive for very wide graphs, its guarantee of finding the shortest path and its utility in problems like maze solvers or finding connected components make it an indispensable tool.",
    useCases: [
      "Finding the shortest path in an unweighted graph (by number of edges). Web crawlers. Social network connectivity problems (e.g., 'friends of friends'). Solving mazes or puzzles where minimum steps are required. Finding connected components in a graph or grid. Topological sorting (Kahn's algorithm)."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="p-2 bg-blue-200 rounded-full w-12 h-12 flex items-center justify-center font-bold">A</div>
                            <div class="flex justify-center w-full space-x-4 mt-2">
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">B</div>
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">C</div>
                            </div>
                            <div class="flex justify-center w-full space-x-4 mt-2">
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">D</div>
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">E</div>
                            </div>
                        </div>
                    `,
    code: {
      python: `from collections import deque
def bfs(graph, start_node):
    visited = set()
    queue = deque([start_node])
    visited.add(start_node)
    
    traversal_order = []
    while queue:
        vertex = queue.popleft()
        traversal_order.append(vertex)
        
        # Ensure graph[vertex] exists and is iterable
        if vertex in graph:
            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
    return traversal_order`,
      typescript: `function bfs(graph: Map<string, string[]>, startNode: string): string[] {
    const visited: Set<string> = new Set();
    const queue: string[] = [startNode];
    visited.add(startNode);
    
    const traversalOrder: string[] = [];
    while (queue.length > 0) {
        const vertex = queue.shift()!;
        traversalOrder.push(vertex);
        
        if (graph.has(vertex)) {
            for (const neighbor of graph.get(vertex)!) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
    return traversalOrder;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Binary Tree Level Order Traversal",
          "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
        },
        {
          "name": "Minimum Depth of Binary Tree",
          "url": "https://leetcode.com/problems/minimum-depth-of-binary-tree/"
        },
        {
          "name": "Number of Islands",
          "url": "https://leetcode.com/problems/number-of-islands/"
        },
        {
          "name": "Find if Path Exists in Graph",
          "url": "https://leetcode.com/problems/find-if-path-exists-in-graph/"
        },
        {
          "name": "Rotting Oranges",
          "url": "https://leetcode.com/problems/rotting-oranges/"
        }
      ],
      "medium": [
        {
          "name": "Number of Islands",
          "url": "https://leetcode.com/problems/number-of-islands/"
        },
        {
          "name": "Rotting Oranges",
          "url": "https://leetcode.com/problems/rotting-oranges/"
        },
        {
          "name": "Walls and Gates",
          "url": "https://leetcode.com/problems/walls-and-gates/"
        },
        {
          "name": "01 Matrix",
          "url": "https://leetcode.com/problems/01-matrix/"
        },
        {
          "name": "Course Schedule",
          "url": "https://leetcode.com/problems/course-schedule/"
        },
        {
          "name": "Clone Graph",
          "url": "https://leetcode.com/problems/clone-graph/"
        },
        {
          "name": "Snakes and Ladders",
          "url": "https://leetcode.com/problems/snakes-and-ladders/"
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
  {
    id: "graphs-traversal-dfs",
    title: "Depth-First Search (DFS)",
    subtitle: "Traversal",
    summary: "Explores graph as far as possible down each branch before backtracking.",
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      note: "Same cost as BFS but different shape — recursion depth can reach V, so watch the stack on large graphs.",
    },
    description: "Depth-First Search (DFS) is a graph traversal algorithm that prioritizes exploring as deeply as possible along each branch before retracing its steps. Unlike BFS, which explores level by level, DFS plunges down one path to its fullest extent before 'backtracking' to explore alternative routes. This behavior naturally lends itself to recursive implementations, where the call stack implicitly manages the traversal path, though an explicit stack can also be used. The operational flow of DFS begins by visiting a starting node and marking it as explored. It then selects one of its unvisited neighbors and recursively applies the same process, delving deeper into that branch. This continues until a 'dead end' is encountered. At this point, the algorithm backtracks to the most recent node that still has unexplored branches and proceeds to explore a different path. This systematic, exhaustive exploration makes DFS ideal for problems that require finding all possible paths from a source, enumerating all permutations or combinations, or identifying all connected components within a graph or grid.",
    useCases: [
      "Finding all possible paths between two nodes. Detecting cycles in directed graphs. Topological sorting (for DAGs). Finding connected components. Solving puzzles or games that involve trying out many possibilities (e.g., N-Queens, Sudoku). Maze solving."
    ],
    illustration: `
                        <div class="text-center">
                            <div class="flex flex-col items-center">
                                <div class="bg-red-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">A</div>
                                <div class="flex justify-center my-1">
                                    <div class="w-0.5 h-6 bg-gray-400 transform -rotate-45"></div>
                                </div>
                                <div class="p-2 bg-red-200 rounded-full w-12 h-12 mx-auto ml-16 flex items-center justify-center">B</div>
                                <div class="flex justify-center my-1 ml-20">
                                    <div class="w-0.5 h-6 bg-gray-400 transform -rotate-45"></div>
                                </div>
                                <div class="p-2 bg-red-200 rounded-full w-12 h-12 mx-auto ml-24 flex items-center justify-center">C</div>
                                <div class="text-sm text-gray-600 mt-2">Go deep down one branch, then backtrack to explore others.</div>
                            </div>
                        </div>
                    `,
    code: {
      python: `def dfs(graph, start_node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start_node)
    # print(start_node, end=" ") # Process node
    
    traversal_order = [start_node]
    if start_node in graph:
        for neighbor in graph[start_node]:
            if neighbor not in visited:
                traversal_order.extend(dfs(graph, neighbor, visited))
    return traversal_order`,
      typescript: `function dfs(graph: Map<string, string[]>, startNode: string, visited: Set<string> = new Set()): string[] {
    visited.add(startNode);
    // console.log(startNode); // Process node

    const traversalOrder: string[] = [startNode];
    if (graph.has(startNode)) {
        for (const neighbor of graph.get(startNode)!) {
            if (!visited.has(neighbor)) {
                traversalOrder.push(...dfs(graph, neighbor, visited));
            }
        }
    }
    return traversalOrder;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Path Sum",
          "url": "https://leetcode.com/problems/path-sum/"
        },
        {
          "name": "Number of Islands",
          "url": "https://leetcode.com/problems/number-of-islands/"
        },
        {
          "name": "Max Area of Island",
          "url": "https://leetcode.com/problems/max-area-of-island/"
        },
        {
          "name": "Flood Fill",
          "url": "https://leetcode.com/problems/flood-fill/"
        },
        {
          "name": "Same Tree",
          "url": "https://leetcode.com/problems/same-tree/"
        }
      ],
      "medium": [
        {
          "name": "Number of Islands",
          "url": "https://leetcode.com/problems/number-of-islands/"
        },
        {
          "name": "Clone Graph",
          "url": "https://leetcode.com/problems/clone-graph/"
        },
        {
          "name": "Course Schedule",
          "url": "https://leetcode.com/problems/course-schedule/"
        },
        {
          "name": "Pacific Atlantic Water Flow",
          "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
        },
        {
          "name": "Longest Increasing Path in a Matrix",
          "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/"
        },
        {
          "name": "Surrounded Regions",
          "url": "https://leetcode.com/problems/surrounded-regions/"
        },
        {
          "name": "Number of Connected Components in an Undirected Graph",
          "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
        },
        {
          "name": "Word Search",
          "url": "https://leetcode.com/problems/word-search/"
        },
        {
          "name": "All Paths From Source to Target",
          "url": "https://leetcode.com/problems/all-paths-from-source-to-target/"
        },
        {
          "name": "Find Eventual Safe States",
          "url": "https://leetcode.com/problems/find-eventual-safe-states/"
        }
      ],
      "hard": [
        {
          "name": "Word Ladder",
          "url": "https://leetcode.com/problems/word-ladder/"
        },
        {
          "name": "Critical Connections in a Network",
          "url": "https://leetcode.com/problems/critical-connections-in-a-network/"
        },
        {
          "name": "Number of Islands II",
          "url": "https://leetcode.com/problems/number-of-islands-ii/"
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
  {
    id: "graphs-shortest-path-dijkstra",
    title: "Dijkstra's Algorithm",
    subtitle: "Shortest Path",
    summary: "Finds the shortest paths from a single source to all other nodes in a non-negative weighted graph.",
    complexity: {
      time: "O((V + E) log V)",
      space: "O(V)",
      note: "With a binary heap. Fails on negative edge weights — reach for Bellman-Ford there.",
    },
    description: "Dijkstra's algorithm is a greedy algorithm that finds the shortest paths from a single source vertex to all other vertices in a graph with non-negative edge weights. It maintains a set of visited vertices and a distance array that stores the shortest distance found so far from the source to each vertex. At each step, it selects the unvisited vertex with the smallest known distance, marks it as visited, and then updates the distances of its neighbors. A min-priority queue is typically used to efficiently retrieve the unvisited vertex with the minimum distance. Its time complexity is O(E log V) or O(E + V log V) depending on the priority queue implementation, making it very efficient for many real-world shortest path problems.",
    useCases: [
      "Finding the shortest route between two locations on a map (e.g., GPS navigation). Network routing protocols. Finding the cheapest way to connect points. Resource allocation where costs are non-negative."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="flex items-center space-x-4">
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">A (0)</div>
                                <div class="text-3xl text-gray-400">--2--</div>
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">B (inf)</div>
                            </div>
                            <div class="flex items-center space-x-4 mt-2">
                                <div class="text-3xl text-gray-400 rotate-90">|</div>
                                <div class="text-sm text-gray-600">3</div>
                                <div class="text-3xl text-gray-400 rotate-90">|</div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">C (inf)</div>
                                <div class="text-3xl text-gray-400">--1--</div>
                                <div class="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">D (inf)</div>
                            </div>
                        </div>
                        <div class="text-sm text-gray-600 mt-2">Iteratively update distances from source.</div>
                    `,
    code: {
      python: `import heapq

def dijkstra(graph, start):
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    priority_queue = [(0, start)] # (distance, vertex)

    while priority_queue:
        current_distance, current_vertex = heapq.heappop(priority_queue)

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))
    return distances`,
      typescript: `function dijkstra(graph: Map<string, Map<string, number>>, start: string): Map<string, number> {
    const distances: Map<string, number> = new Map();
    const pq: [number, string][] = []; // [distance, vertex]

    // Initialize distances
    for (const vertex of graph.keys()) {
        distances.set(vertex, Infinity);
    }
    distances.set(start, 0);

    pq.push([0, start]);

    while (pq.length > 0) {
        // Sort to simulate min-priority queue (for simplicity, a real PQ class is better)
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDistance, currentVertex] = pq.shift()!;

        if (currentDistance > (distances.get(currentVertex) || Infinity)) {
            continue;
        }

        if (graph.has(currentVertex)) {
            for (const [neighbor, weight] of graph.get(currentVertex)!.entries()) {
                const distance = currentDistance + weight;
                if (distance < (distances.get(neighbor) || Infinity)) {
                    distances.set(neighbor, distance);
                    pq.push([distance, neighbor]);
                }
            }
        }
    }
    return distances;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Network Delay Time",
          "url": "https://leetcode.com/problems/network-delay-time/"
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
          "name": "Path With Minimum Effort",
          "url": "https://leetcode.com/problems/path-with-minimum-effort/"
        },
        {
          "name": "Swim in Rising Water",
          "url": "https://leetcode.com/problems/swim-in-rising-water/"
        }
      ],
      "medium": [
        {
          "name": "Network Delay Time",
          "url": "https://leetcode.com/problems/network-delay-time/"
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
          "name": "Path With Minimum Effort",
          "url": "https://leetcode.com/problems/path-with-minimum-effort/"
        },
        {
          "name": "Swim in Rising Water",
          "url": "https://leetcode.com/problems/swim-in-rising-water/"
        },
        {
          "name": "Minimum Cost to Connect Sticks",
          "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
        },
        {
          "name": "Dijkstra (GFG)",
          "url": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"
        },
        {
          "name": "Shortest Path in Binary Matrix",
          "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
        },
        {
          "name": "The Maze II",
          "url": "https://leetcode.com/problems/the-maze-ii/"
        },
        {
          "name": "Minimum Number of K Consecutive Bit Flips",
          "url": "https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/"
        }
      ],
      "hard": [
        {
          "name": "Word Ladder",
          "url": "https://leetcode.com/problems/word-ladder/"
        },
        {
          "name": "Shortest Path to Get All Keys",
          "url": "https://leetcode.com/problems/shortest-path-to-get-all-keys/"
        },
        {
          "name": "The Maze III",
          "url": "https://leetcode.com/problems/the-maze-iii/"
        },
        {
          "name": "Minimum Cost to Make at Least One Valid Path in a Grid",
          "url": "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/"
        },
        {
          "name": "Find the Shortest Superstring",
          "url": "https://leetcode.com/problems/find-the-shortest-superstring/"
        }
      ]
    },
  },
  {
    id: "graphs-cycle-detection",
    title: "Cycle Detection",
    subtitle: "Graphs",
    summary: "Algorithms to detect cycles in directed and undirected graphs.",
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      note: "One traversal. Directed graphs need a recursion-stack marker; undirected graphs only need a parent check.",
    },
    description: "Cycle detection is a crucial problem in graph theory with different approaches for directed and undirected graphs. In undirected graphs, a cycle can be detected using DFS by checking for a back edge to an already visited node that is not the immediate parent of the current node. In directed graphs, DFS can detect cycles by keeping track of nodes in the current recursion stack; if a DFS encounters a node that is already in the current recursion stack, a cycle is present. BFS can also detect cycles in undirected graphs by checking for visited nodes during traversal. The presence of cycles has significant implications for graph properties, such as topological sorting (only possible in Directed Acyclic Graphs - DAGs).",
    useCases: [
      "Detecting deadlocks in operating systems. Checking for valid topological sorting (only possible in DAGs). Detecting circular dependencies in software modules or build systems. Validating financial transactions. Finding the shortest cycle in a graph."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="flex items-center space-x-4">
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">A</div>
                                <div class="text-3xl text-gray-400">→</div>
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">B</div>
                            </div>
                            <div class="text-3xl text-gray-400 rotate-90">↓</div>
                            <div class="text-3xl text-gray-400 rotate-90">↑</div>
                            <div class="flex items-center space-x-4">
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">D</div>
                                <div class="text-3xl text-gray-400">←</div>
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">C</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Cycle: B → C → D → B</div>
                        </div>
                    `,
    code: {
      python: `def detect_cycle_undirected_dfs(graph, num_nodes):
    visited = [False] * num_nodes
    parent = [-1] * num_nodes

    def dfs_util(u, p):
        visited[u] = True
        for v in graph.get(u, []):
            if not visited[v]:
                parent[v] = u
                if dfs_util(v, u):
                    return True
            elif v != p: # If neighbor is visited and not parent, it's a back edge
                return True
        return False

    for i in range(num_nodes):
        if not visited[i]:
            if dfs_util(i, -1):
                return True
    return False

def detect_cycle_directed_dfs(graph, num_nodes):
    visited = [False] * num_nodes
    recursion_stack = [False] * num_nodes

    def dfs_util(u):
        visited[u] = True
        recursion_stack[u] = True

        for v in graph.get(u, []):
            if not visited[v]:
                if dfs_util(v):
                    return True
            elif recursion_stack[v]: # If neighbor is in current recursion stack
                return True
        recursion_stack[u] = False # Backtrack
        return False

    for i in range(num_nodes):
        if not visited[i]:
            if dfs_util(i):
                return True
    return False`,
      typescript: `function detectCycleUndirectedDFS(graph: Map<number, number[]>, numNodes: number): boolean {
    const visited: boolean[] = new Array(numNodes).fill(false);
    const parent: number[] = new Array(numNodes).fill(-1);

    function dfsUtil(u: number, p: number): boolean {
        visited[u] = true;
        const neighbors = graph.get(u) || [];
        for (const v of neighbors) {
            if (!visited[v]) {
                parent[v] = u;
                if (dfsUtil(v, u)) {
                    return true;
                }
            } else if (v !== p) { // If neighbor is visited and not parent, it's a back edge
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < numNodes; i++) {
        if (!visited[i]) {
            if (dfsUtil(i, -1)) {
                return true;
            }
        }
    }
    return false;
}

function detectCycleDirectedDFS(graph: Map<number, number[]>, numNodes: number): boolean {
    const visited: boolean[] = new Array(numNodes).fill(false);
    const recursionStack: boolean[] = new Array(numNodes).fill(false);

    function dfsUtil(u: number): boolean {
        visited[u] = true;
        recursionStack[u] = true;

        const neighbors = graph.get(u) || [];
        for (const v of neighbors) {
            if (!visited[v]) {
                if (dfsUtil(v)) {
                    return true;
                }
            } else if (recursionStack[v]) { // If neighbor is in current recursion stack
                return true;
            }
        }
        recursionStack[u] = false; // Backtrack
        return false;
    }

    for (let i = 0; i < numNodes; i++) {
        if (!visited[i]) {
            if (dfsUtil(i)) {
                return true;
            }
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
          "name": "Find if Path Exists in Graph",
          "url": "https://leetcode.com/problems/find-if-path-exists-in-graph/"
        },
        {
          "name": "Course Schedule",
          "url": "https://leetcode.com/problems/course-schedule/"
        },
        {
          "name": "Is Graph Bipartite?",
          "url": "https://leetcode.com/problems/is-graph-bipartite/"
        },
        {
          "name": "Detect Cycle in an Undirected Graph (GFG)",
          "url": "https://www.geeksforgeeks.org/detect-cycle-undirected-graph-dfs/"
        }
      ],
      "medium": [
        {
          "name": "Course Schedule",
          "url": "https://leetcode.com/problems/course-schedule/"
        },
        {
          "name": "Course Schedule II",
          "url": "https://leetcode.com/problems/course-schedule-ii/"
        },
        {
          "name": "Find Eventual Safe States",
          "url": "https://leetcode.com/problems/find-eventual-safe-states/"
        },
        {
          "name": "Redundant Connection",
          "url": "https://leetcode.com/problems/redundant-connection/"
        },
        {
          "name": "Graph Valid Tree",
          "url": "https://leetcode.com/problems/graph-valid-tree/"
        },
        {
          "name": "Minimum Height Trees",
          "url": "https://leetcode.com/problems/minimum-height-trees/"
        },
        {
          "name": "Longest Cycle in a Graph",
          "url": "https://leetcode.com/problems/longest-cycle-in-a-graph/"
        },
        {
          "name": "Clone Graph",
          "url": "https://leetcode.com/problems/clone-graph/"
        },
        {
          "name": "Satisfiability of Equality Equations",
          "url": "https://leetcode.com/problems/satisfiability-of-equality-equations/"
        },
        {
          "name": "Parallel Courses",
          "url": "https://leetcode.com/problems/parallel-courses/"
        }
      ],
      "hard": [
        {
          "name": "Critical Connections in a Network",
          "url": "https://leetcode.com/problems/critical-connections-in-a-network/"
        },
        {
          "name": "Alien Dictionary (GFG)",
          "url": "https://www.geeksforgeeks.org/alien-dictionary-2/"
        },
        {
          "name": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
          "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"
        },
        {
          "name": "The Maze III",
          "url": "https://leetcode.com/problems/the-maze-iii/"
        },
        {
          "name": "Reconstruct Itinerary",
          "url": "https://leetcode.com/problems/reconstruct-itinerary/"
        }
      ]
    },
  },
  {
    id: "graphs-mst",
    title: "Minimum Spanning Trees (MST)",
    subtitle: "Graphs",
    summary: "Finding a subset of edges that connects all vertices with minimum total edge weight.",
    complexity: {
      time: "O(E log V)",
      space: "O(V + E)",
      note: "Kruskal sorts edges and unions; Prim grows from a heap. Same bound, different data structure.",
    },
    description: "A Minimum Spanning Tree (MST) for a connected, undirected graph with weighted edges is a subgraph that is a tree, connects all the vertices together, and has the minimum possible total sum of edge weights. MSTs are crucial in network design and optimization problems. Two classic algorithms for finding an MST are Kruskal's Algorithm and Prim's Algorithm. Kruskal's is a greedy algorithm that sorts all edges by weight and adds them to the MST if they don't form a cycle. Prim's algorithm grows the MST from an arbitrary starting vertex by iteratively adding the cheapest edge that connects a vertex in the tree to a vertex outside the tree. Both algorithms ensure connectivity with minimal cost.",
    useCases: [
      "Designing efficient communication networks (e.g., telephone, internet). Laying out electrical wiring. Cluster analysis in data science. Road network planning. Any problem where you need to connect all points with the least total cost."
    ],
    illustration: `
                        <div class="flex flex-col items-center">
                            <div class="flex items-center space-x-4">
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">A</div>
                                <div class="text-3xl text-gray-400">--1--</div>
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">B</div>
                            </div>
                            <div class="text-3xl text-gray-400 rotate-90">|</div>
                            <div class="text-sm text-gray-600">3</div>
                            <div class="text-3xl text-gray-400 rotate-90">|</div>
                            <div class="flex items-center space-x-4">
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">C</div>
                                <div class="text-3xl text-gray-400">--2--</div>
                                <div class="bg-blue-200 p-2 rounded-full w-12 h-12 flex items-center justify-center font-bold">D</div>
                            </div>
                            <div class="text-sm text-gray-600 mt-2">MST connects all nodes with min total weight.</div>
                        </div>
                    `,
    code: {
      python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1
            return True
        return False

def kruskal_mst(edges, num_nodes):
    # edges: list of (weight, u, v)
    edges.sort()
    uf = UnionFind(num_nodes)
    mst_cost = 0
    mst_edges = []

    for weight, u, v in edges:
        if uf.union(u, v):
            mst_cost += weight
            mst_edges.append((u, v, weight))
    return mst_cost, mst_edges`,
      typescript: `class UnionFind {
    parent: number[];
    rank: number[];

    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = new Array(size).fill(0);
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
            return true;
        }
        return false;
    }
}

interface Edge {
    weight: number;
    u: number;
    v: number;
}

function kruskalMST(edges: Edge[], numNodes: number): { cost: number, edges: Edge[] } {
    edges.sort((a, b) => a.weight - b.weight);
    const uf = new UnionFind(numNodes);
    let mstCost = 0;
    const mstEdges: Edge[] = [];

    for (const edge of edges) {
        const { weight, u, v } = edge;
        if (uf.union(u, v)) {
            mstCost += weight;
            mstEdges.push(edge);
        }
    }
    return { cost: mstCost, edges: mstEdges };
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Min Cost to Connect All Points",
          "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
        },
        {
          "name": "Connecting Cities With Minimum Cost",
          "url": "https://leetcode.com/problems/connecting-cities-with-minimum-cost/"
        },
        {
          "name": "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
          "url": "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/"
        },
        {
          "name": "Graph Valid Tree",
          "url": "https://leetcode.com/problems/graph-valid-tree/"
        },
        {
          "name": "Number of Connected Components in an Undirected Graph",
          "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
        }
      ],
      "medium": [
        {
          "name": "Min Cost to Connect All Points",
          "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
        },
        {
          "name": "Connecting Cities With Minimum Cost",
          "url": "https://leetcode.com/problems/connecting-cities-with-minimum-cost/"
        },
        {
          "name": "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
          "url": "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/"
        },
        {
          "name": "Graph Valid Tree",
          "url": "https://leetcode.com/problems/graph-valid-tree/"
        },
        {
          "name": "Number of Connected Components in an Undirected Graph",
          "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
        },
        {
          "name": "Kruskal's Algorithm (GFG)",
          "url": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"
        },
        {
          "name": "Prim's Algorithm (GFG)",
          "url": "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/"
        },
        {
          "name": "Minimum Spanning Tree (LeetCode)",
          "url": "https://leetcode.com/tag/minimum-spanning-tree/"
        },
        {
          "name": "Smallest String With Swaps",
          "url": "https://leetcode.com/problems/smallest-string-with-swaps/"
        },
        {
          "name": "Swim in Rising Water",
          "url": "https://leetcode.com/problems/swim-in-rising-water/"
        }
      ],
      "hard": [
        {
          "name": "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
          "url": "https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/"
        },
        {
          "name": "Minimum Cost to Connect All Points",
          "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
        },
        {
          "name": "Maximum Score of a Node Sequence",
          "url": "https://leetcode.com/problems/maximum-score-of-a-node-sequence/"
        },
        {
          "name": "The Earliest Moment When Everyone Become Friends",
          "url": "https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends/"
        },
        {
          "name": "Minimum Cost to Connect Sticks",
          "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
        }
      ]
    },
  },

  {
    id: "graphs-topological-sort",
    title: "Topological Sort",
    subtitle: "Ordering",
    summary: "Linearise a dependency graph — and detect the cycle if one exists.",
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      note: "One pass. Kahn's algorithm doubles as cycle detection: if fewer than V nodes come out, the leftovers are in a cycle.",
    },
    description:
      "A topological sort orders the vertices of a directed acyclic graph so that every edge points forwards — if task A must happen before task B, A appears first. It exists if and only if the graph has no cycle, which is what makes it the standard answer to any 'can these dependencies be satisfied' question. Kahn's algorithm is the version worth defaulting to: compute each node's in-degree, seed a queue with every node whose in-degree is zero, and repeatedly pop a node, output it, and decrement its neighbours' in-degrees, enqueuing any that reach zero. If the output contains fewer than V nodes when the queue empties, the remaining nodes form a cycle and no valid ordering exists. The DFS alternative pushes each node onto a stack after its descendants are finished and reverses at the end, which is elegant but needs a separate three-colour marking to detect cycles. Kahn's is usually easier to explain under pressure and gives cycle detection for free. The ordering is rarely unique — any node with in-degree zero is a legal next choice — so use a priority queue instead of a plain queue when the problem asks for the lexicographically smallest ordering.",
    useCases: [
      "Course prerequisite scheduling — the canonical framing of this problem.",
      "Build systems and package managers resolving dependency order.",
      "Task scheduling where some jobs must complete before others start.",
      "Detecting circular dependencies in imports, modules, or spreadsheet formulas.",
      "As a preprocessing step for DAG shortest paths, which becomes O(V + E) once the vertices are in topological order.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">in-degrees drive the queue</div>
        <div class="flex space-x-4 mb-2">
          <div class="flex flex-col items-center">
            <div class="p-2 bg-green-200 border border-green-500 rounded-full w-10 text-center">A</div>
            <div class="text-gray-500 text-sm">0</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">B</div>
            <div class="text-gray-500 text-sm">1</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">C</div>
            <div class="text-gray-500 text-sm">1</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">D</div>
            <div class="text-gray-500 text-sm">2</div>
          </div>
        </div>
        <div class="p-1 bg-gray-100 border rounded-sm mb-2">A&rarr;B &nbsp; A&rarr;C &nbsp; B&rarr;D &nbsp; C&rarr;D</div>
        <div class="p-2 bg-green-200 border border-green-500 rounded-md">order: A, B, C, D</div>
        <div class="text-sm text-gray-600 mt-2">fewer than V outputs &rarr; there is a cycle</div>
      </div>
    `,
    code: {
      python: `from collections import deque

# Kahn's algorithm. Returns the ordering, or None if a cycle exists.
def topological_sort(n, edges):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for src, dst in edges:
        graph[src].append(dst)
        indegree[dst] += 1

    queue = deque(v for v in range(n) if indegree[v] == 0)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbour in graph[node]:
            indegree[neighbour] -= 1          # this dependency is satisfied
            if indegree[neighbour] == 0:
                queue.append(neighbour)

    # If we could not place every node, the rest are locked in a cycle.
    return order if len(order) == n else None


# Lexicographically smallest ordering: swap the queue for a heap.
import heapq

def topological_sort_smallest(n, edges):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for src, dst in edges:
        graph[src].append(dst)
        indegree[dst] += 1

    heap = [v for v in range(n) if indegree[v] == 0]
    heapq.heapify(heap)
    order = []
    while heap:
        node = heapq.heappop(heap)
        order.append(node)
        for neighbour in graph[node]:
            indegree[neighbour] -= 1
            if indegree[neighbour] == 0:
                heapq.heappush(heap, neighbour)
    return order if len(order) == n else None


# DFS variant: push each node AFTER its descendants, then reverse.
# Needs three colours to detect cycles - grey means "on the stack".
def topological_sort_dfs(n, edges):
    graph = [[] for _ in range(n)]
    for src, dst in edges:
        graph[src].append(dst)

    WHITE, GREY, BLACK = 0, 1, 2
    colour = [WHITE] * n
    order = []

    def visit(node):
        if colour[node] == GREY:
            return False              # back edge - cycle found
        if colour[node] == BLACK:
            return True               # already fully processed
        colour[node] = GREY
        for neighbour in graph[node]:
            if not visit(neighbour):
                return False
        colour[node] = BLACK
        order.append(node)            # post-order: after all descendants
        return True

    for v in range(n):
        if not visit(v):
            return None
    return order[::-1]`,
      typescript: `// Kahn's algorithm. Returns the ordering, or null if a cycle exists.
function topologicalSort(n: number, edges: number[][]): number[] | null {
  const graph: number[][] = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [src, dst] of edges) {
    graph[src].push(dst);
    indegree[dst]++;
  }

  const queue: number[] = [];
  for (let v = 0; v < n; v++) if (indegree[v] === 0) queue.push(v);

  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);
    for (const neighbour of graph[node]) {
      if (--indegree[neighbour] === 0) queue.push(neighbour);
    }
  }

  // Fewer than n outputs means the remainder is locked in a cycle.
  return order.length === n ? order : null;
}

// DFS variant: post-order push, then reverse. Three colours detect cycles.
function topologicalSortDfs(n: number, edges: number[][]): number[] | null {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [src, dst] of edges) graph[src].push(dst);

  const WHITE = 0, GREY = 1, BLACK = 2;
  const colour = new Array(n).fill(WHITE);
  const order: number[] = [];

  const visit = (node: number): boolean => {
    if (colour[node] === GREY) return false;   // back edge - cycle
    if (colour[node] === BLACK) return true;
    colour[node] = GREY;
    for (const neighbour of graph[node]) {
      if (!visit(neighbour)) return false;
    }
    colour[node] = BLACK;
    order.push(node);                          // after all descendants
    return true;
  };

  for (let v = 0; v < n; v++) if (!visit(v)) return null;
  return order.reverse();
}`,
    },
    pitfalls: [
      "Building the graph with the edge direction reversed. 'B depends on A' means the edge runs A to B, and getting this backwards produces a valid-looking but wrong ordering.",
      "Forgetting the final length check in Kahn's algorithm. Without it a cyclic graph silently returns a partial ordering.",
      "Applying topological sort to an undirected graph. The concept only exists for directed graphs.",
      "In the DFS version, using a plain visited boolean instead of three states. Two colours cannot distinguish a back edge from a cross edge, so cycles go undetected.",
      "Assuming the ordering is unique. Several are usually valid; use a heap if the problem wants a specific one.",
    ],
    problems: {
      easy: [
        { name: "Find Center of Star Graph", url: "https://leetcode.com/problems/find-center-of-star-graph/" },
      ],
      medium: [
        { name: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/" },
        { name: "Course Schedule II", url: "https://leetcode.com/problems/course-schedule-ii/" },
        { name: "Minimum Height Trees", url: "https://leetcode.com/problems/minimum-height-trees/" },
        { name: "All Ancestors of a Node in a DAG", url: "https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/" },
        { name: "Find Eventual Safe States", url: "https://leetcode.com/problems/find-eventual-safe-states/" },
        { name: "Sort Items by Groups Respecting Dependencies", url: "https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/" },
      ],
      hard: [
        { name: "Alien Dictionary", url: "https://leetcode.com/problems/alien-dictionary/" },
        { name: "Parallel Courses III", url: "https://leetcode.com/problems/parallel-courses-iii/" },
        { name: "Build a Matrix With Conditions", url: "https://leetcode.com/problems/build-a-matrix-with-conditions/" },
      ],
    },
  },

  {
    id: "graphs-bellman-ford-floyd",
    title: "Bellman-Ford & Floyd-Warshall",
    subtitle: "Shortest Path",
    summary: "Shortest paths when Dijkstra fails — negative weights and all-pairs queries.",
    complexity: {
      time: "O(V E)",
      space: "O(V)",
      note: "Bellman-Ford. Floyd-Warshall is O(V^3) time and O(V^2) space but answers every pair at once, which is the better deal on dense graphs.",
    },
    description:
      "Dijkstra's algorithm assumes that once a node is finalised its distance can never improve, which breaks the moment an edge has negative weight. Bellman-Ford drops that assumption and simply relaxes every edge V-1 times, since any shortest path uses at most V-1 edges. That gives O(V·E) — slower than Dijkstra, but it handles negative weights and, crucially, detects negative cycles: run one extra relaxation round, and if any distance still improves, a negative cycle is reachable and no shortest path is well defined. Floyd-Warshall answers a different question, computing shortest paths between every pair of vertices in O(V³) using a beautifully compact triple loop. The middle-out structure is what people get wrong: the outermost loop must be over the intermediate vertex k, because the algorithm builds up 'shortest path using only the first k vertices as waypoints' one k at a time. Put k innermost and the recurrence reads stale values. For sparse graphs, running Dijkstra from every source beats Floyd-Warshall; for dense graphs or small V, the triple loop wins on simplicity.",
    useCases: [
      "Currency arbitrage detection, where a negative cycle in log-space prices means free money.",
      "Any shortest-path problem where edge weights can be negative — refunds, rebates, elevation drops.",
      "All-pairs distance tables on small or dense graphs, such as city-to-city matrices.",
      "Transitive closure — replace min-plus with logical OR to compute reachability between all pairs.",
      "Network routing protocols; distance-vector routing is essentially distributed Bellman-Ford.",
    ],
    illustration: `
      <div class="flex flex-col items-center font-mono text-sm">
        <div class="text-gray-600 mb-2">a negative cycle: total -1 per lap</div>
        <div class="flex items-center space-x-2 mb-2">
          <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">A</div>
          <div class="text-gray-500">&minus;4&rarr;</div>
          <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">B</div>
          <div class="text-gray-500">+1&rarr;</div>
          <div class="p-2 bg-blue-100 border border-blue-300 rounded-full w-10 text-center">C</div>
        </div>
        <div class="p-1 bg-red-200 border border-red-500 rounded-sm mb-2">C &minus;&minus;+2&rarr; A &nbsp;(loop = &minus;1)</div>
        <div class="text-sm text-gray-600">Dijkstra returns a wrong answer here without warning.</div>
        <div class="text-sm text-gray-600">Bellman-Ford's extra round flags it.</div>
      </div>
    `,
    code: {
      python: `# Bellman-Ford: relax every edge V-1 times, then check once more.
# Returns None when a reachable negative cycle exists.
def bellman_ford(n, edges, source):
    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0

    for _ in range(n - 1):          # any shortest path has <= n-1 edges
        changed = False
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:             # early exit once nothing improves
            break

    # One more pass: any further improvement means a negative cycle.
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return None

    return dist


# Floyd-Warshall: all pairs, O(V^3).
# The k loop MUST be outermost - it is the induction variable.
def floyd_warshall(n, edges):
    INF = float('inf')
    dist = [[INF] * n for _ in range(n)]
    for v in range(n):
        dist[v][v] = 0
    for u, v, w in edges:
        dist[u][v] = min(dist[u][v], w)     # keep the cheapest parallel edge

    for k in range(n):                      # waypoint - OUTERMOST
        for i in range(n):
            if dist[i][k] == INF:
                continue                    # no route to the waypoint
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    # A negative value on the diagonal means a negative cycle.
    for v in range(n):
        if dist[v][v] < 0:
            return None
    return dist`,
      typescript: `// Bellman-Ford: relax every edge V-1 times, then check once more.
function bellmanFord(
  n: number,
  edges: [number, number, number][],
  source: number
): number[] | null {
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;

  for (let round = 0; round < n - 1; round++) {
    let changed = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        changed = true;
      }
    }
    if (!changed) break;               // early exit
  }

  // One more pass - any improvement means a negative cycle.
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) return null;
  }
  return dist;
}

// Floyd-Warshall: all pairs. The k loop MUST be outermost.
function floydWarshall(
  n: number,
  edges: [number, number, number][]
): number[][] | null {
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let v = 0; v < n; v++) dist[v][v] = 0;
  for (const [u, v, w] of edges) dist[u][v] = Math.min(dist[u][v], w);

  for (let k = 0; k < n; k++) {        // waypoint - OUTERMOST
    for (let i = 0; i < n; i++) {
      if (dist[i][k] === Infinity) continue;
      for (let j = 0; j < n; j++) {
        const via = dist[i][k] + dist[k][j];
        if (via < dist[i][j]) dist[i][j] = via;
      }
    }
  }

  for (let v = 0; v < n; v++) if (dist[v][v] < 0) return null;
  return dist;
}`,
    },
    pitfalls: [
      "Putting the k loop innermost in Floyd-Warshall. It is the induction variable and must be outermost, or the recurrence reads values that are not ready.",
      "Relaxing from a node still at infinity. Infinity plus a negative weight is less than infinity in some languages, which invents phantom paths — guard the check.",
      "Using Dijkstra on a graph with negative edges. It gives a plausible wrong answer with no error, which is worse than failing loudly.",
      "Skipping the extra Bellman-Ford round. Without it, a negative cycle produces meaningless distances rather than a detectable failure.",
      "Running Floyd-Warshall on a large sparse graph. At V = 1000 the triple loop is a billion operations; run Dijkstra per source instead.",
    ],
    problems: {
      easy: [
        { name: "Find the Town Judge", url: "https://leetcode.com/problems/find-the-town-judge/" },
      ],
      medium: [
        { name: "Cheapest Flights Within K Stops", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
        { name: "Find the City With the Smallest Number of Neighbors", url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/" },
        { name: "Network Delay Time", url: "https://leetcode.com/problems/network-delay-time/" },
        { name: "Evaluate Division", url: "https://leetcode.com/problems/evaluate-division/" },
        { name: "Course Schedule IV", url: "https://leetcode.com/problems/course-schedule-iv/" },
      ],
      hard: [
        { name: "Minimum Cost to Make at Least One Valid Path", url: "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/" },
        { name: "Number of Ways to Arrive at Destination", url: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/" },
      ],
    },
  },
];
