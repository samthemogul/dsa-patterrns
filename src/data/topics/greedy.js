// Greedy Algorithms
export const name = "Greedy Algorithms";

export const topics = [
  {
    id: "greedy-activity-selection",
    title: "Activity Selection Problem",
    subtitle: "Greedy Algorithms",
    summary: "Selects maximum non-overlapping activities by prioritizing earliest finish times.",
    complexity: {
      time: "O(n log n)",
      space: "O(1)",
      note: "Dominated by the sort. The greedy choice — always take the earliest finishing time — is what needs proving.",
    },
    description: "Greedy algorithms are a class of algorithms that follow the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does not produce an optimal solution, but for some problems, it does. The key characteristic of a greedy algorithm is that it makes a series of choices, and once a choice is made, it is never reconsidered. This 'take what you can get now' approach makes them simple to implement and often very efficient. For a greedy algorithm to work correctly, the problem must exhibit two properties: optimal substructure (an optimal solution to the problem contains optimal solutions to subproblems) and the greedy choice property (a globally optimal solution can be arrived at by making a locally optimal choice). Proving these properties is crucial for establishing the correctness of a greedy approach.",
    useCases: [
      "Activity Selection Problem: Given a set of activities, each with a start and finish time, select the maximum number of non-overlapping activities. Coin Change Problem (when denominations are 'canonical'): Finding the minimum number of coins to make a given amount, assuming standard coin denominations (e.g., 1, 5, 10, 25 cents). Huffman Coding: Building an optimal prefix code to compress data. Dijkstra's Algorithm: Finding the shortest path from a single source to all other nodes in a graph with non-negative edge weights. Kruskal's Algorithm for MST: Selecting edges with minimum weight that do not form a cycle."
    ],
    illustration: `
                        <div class="flex flex-col items-center font-mono text-sm">
                            <div class="bg-blue-100 p-2 rounded-md border border-blue-300 mb-2">
                                Activities: [ (1,4), (3,5), (0,6), (5,7) ]
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Sort by finish time: (1,4), (3,5), (5,7), (0,6)</div>
                            <div class="text-2xl text-gray-500 my-4">↓ Select (1,4)</div>
                            <div class="bg-green-100 p-2 rounded-md border border-green-300">
                                Selected: [ (1,4) ]
                            </div>
                            <div class="text-sm text-gray-600 mt-2">Next non-overlapping: (5,7)</div>
                        </div>
                    `,
    code: {
      python: `def activity_selection(activities):
    # activities = [(start, end), ...]
    activities.sort(key=lambda x: x[1]) # Sort by finish time
    
    if not activities:
        return []

    selected = [activities[0]]
    last_finish_time = activities[0][1]

    for i in range(1, len(activities)):
        if activities[i][0] >= last_finish_time:
            selected.append(activities[i])
            last_finish_time = activities[i][1]
            
    return selected`,
      typescript: `interface Activity {
    start: number;
    end: number;
}

function selectActivities(activities: Activity[]): Activity[] {
    // Sort activities by their finish times in ascending order.
    activities.sort((a, b) => a.end - b.end);

    if (activities.length === 0) {
        return [];
    }

    const selected: Activity[] = [activities[0]];
    let lastActivityFinishTime = activities[0].end;

    for (let i = 1; i < activities.length; i++) {
        const currentActivity = activities[i];
        if (currentActivity.start >= lastActivityFinishTime) {
            selected.push(currentActivity);
            lastActivityFinishTime = currentActivity.end;
        }
    }
    return selected;
}`,
    },
    problems: {
      "easy": [
        {
          "name": "Assign Cookies",
          "url": "https://leetcode.com/problems/assign-cookies/"
        },
        {
          "name": "Best Time to Buy and Sell Stock",
          "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
        },
        {
          "name": "Lemonade Change",
          "url": "https://leetcode.com/problems/lemonade-change/"
        }
      ],
      "medium": [
        {
          "name": "Best Time to Buy and Sell Stock II",
          "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
        },
        {
          "name": "Jump Game",
          "url": "https://leetcode.com/problems/jump-game/"
        },
        {
          "name": "Gas Station",
          "url": "https://leetcode.com/problems/gas-station/"
        },
        {
          "name": "Minimum Number of Arrows to Burst Balloons",
          "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
        },
        {
          "name": "Non-overlapping Intervals",
          "url": "https://leetcode.com/problems/non-overlapping-intervals/"
        }
      ],
      "hard": [
        {
          "name": "Candy",
          "url": "https://leetcode.com/problems/candy/"
        },
        {
          "name": "Queue Reconstruction by Height",
          "url": "https://leetcode.com/problems/queue-reconstruction-by-height/"
        },
        {
          "name": "Minimum Cost to Connect Sticks",
          "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
        },
        {
          "name": "Task Scheduler",
          "url": "https://leetcode.com/problems/task-scheduler/"
        },
        {
          "name": "Trapping Rain Water II",
          "url": "https://leetcode.com/problems/trapping-rain-water-ii/"
        }
      ]
    },
  },
];
