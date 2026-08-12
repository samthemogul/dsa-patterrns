/**
 * Enrichment batch 10 — Stage 5, part one: weighted graphs and bits.
 * See ./foundations.js for the shape of an entry.
 */

export const enrichment = {
  "graphs-shortest-path-dijkstra": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Dijkstra settling nodes in order of distance, with the heap contents shown at each step">
  <text x="0" y="14" class="dg-title">Settle the closest unsettled node, then relax its edges</text>

  <g transform="translate(30,40)">
    <line x1="30"  y1="60" x2="130" y2="20"  class="dg-link-hi"/>
    <line x1="30"  y1="70" x2="130" y2="120" class="dg-link-hi"/>
    <line x1="150" y1="30" x2="150" y2="110" class="dg-link"/>
    <line x1="170" y1="20" x2="260" y2="60"  class="dg-link"/>
    <line x1="170" y1="120" x2="260" y2="70" class="dg-link-hi"/>

    <circle cx="20"  cy="65"  r="20" class="dg-cell-hit"/><text x="20"  y="70" text-anchor="middle">S</text>
    <circle cx="150" cy="20"  r="20" class="dg-cell-mark"/><text x="150" y="25" text-anchor="middle">A</text>
    <circle cx="150" cy="120" r="20" class="dg-cell-hit"/><text x="150" y="125" text-anchor="middle">B</text>
    <circle cx="280" cy="65"  r="20" class="dg-cell-hit"/><text x="280" y="70" text-anchor="middle">C</text>

    <text x="70"  y="30"  class="dg-label">7</text>
    <text x="70"  y="112" class="dg-label">2</text>
    <text x="158" y="72"  class="dg-label">3</text>
    <text x="220" y="30"  class="dg-label">1</text>
    <text x="220" y="110" class="dg-label">4</text>

    <text x="20"  y="108" text-anchor="middle" class="dg-good">0</text>
    <text x="150" y="-8"  text-anchor="middle" class="dg-ptr">5</text>
    <text x="150" y="163" text-anchor="middle" class="dg-good">2</text>
    <text x="280" y="108" text-anchor="middle" class="dg-good">6</text>
  </g>

  <g transform="translate(380,44)">
    <text x="0" y="0" class="dg-label">heap, ordered by distance</text>

    <rect x="0" y="10" width="300" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="27" class="dg-note">pop S(0)&#160;&#160;&#8594; relax: A=7, B=2</text>

    <rect x="0" y="40" width="300" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="57" class="dg-note">pop B(2)&#160;&#160;&#8594; relax: A=5 via B, C=6</text>

    <rect x="0" y="70" width="300" height="24" rx="3" class="dg-cell-mark"/>
    <text x="10" y="87" class="dg-note">pop A(5)&#160;&#160;&#8594; C via A = 6, no better</text>

    <rect x="0" y="100" width="300" height="24" rx="3" class="dg-cell-idle"/>
    <text x="10" y="117" class="dg-note">pop A(7)&#160;&#160;&#8594; STALE, 7 &gt; 5, skip it</text>

    <rect x="0" y="130" width="300" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="147" class="dg-note">pop C(6)&#160;&#160;&#8594; done</text>

    <rect x="0" y="164" width="300" height="46" rx="4" class="dg-cell-idle"/>
    <text x="14" y="184" class="dg-note">The direct S&#8594;A edge of 7 loses to</text>
    <text x="14" y="202" class="dg-note">S&#8594;B&#8594;A at 2 + 3 = 5.</text>
  </g>

  <line x1="0" y1="290" x2="700" y2="290" class="dg-guide"/>
  <text x="0" y="312" class="dg-note">A node is FINAL once popped &#8212; which is only true because every edge weight is non-negative.</text>
</svg>`,
    walkthrough: [
      {
        heading: "Why BFS is not enough once edges have weights",
        body: [
          "BFS finds shortest paths by expanding in rings, and that works because every edge costs the same — the first time you reach a node, no shorter route can exist. Add weights and the ring argument collapses: a two-edge route can be cheaper than a one-edge route, so arrival order no longer implies distance order.",
          "Dijkstra restores the guarantee by changing what the frontier is ordered by. Instead of a queue ordered by discovery, use a priority queue ordered by tentative distance. Then the node you pop is always the closest unsettled node, and its distance is final.",
          "That word — final — is what makes the algorithm greedy rather than exhaustive. Once a node is popped, you never reconsider it. Which is exactly why it breaks on negative weights, and why the next topic exists.",
        ],
      },
      {
        heading: "Relaxation, and what the invariant is",
        body: [
          "Every node carries a tentative distance, starting at infinity for everything but the source. Relaxing an edge means asking whether going through the current node reaches its neighbour more cheaply than the neighbour's current best: if dist[u] plus weight is less than dist[v], improve dist[v].",
          "The invariant is that every settled node holds its true shortest distance, and every unsettled node holds the best distance achievable using only settled nodes as intermediates. Popping the smallest unsettled distance settles it, because any alternative route would have to leave the settled set through some other unsettled node — and that node is already at least as far away, so the detour cannot be shorter.",
          "This is the whole correctness argument, and it hinges entirely on 'at least as far away' being true. With a negative edge, leaving through a further node and then coming back down is possible, and the argument fails.",
        ],
        aside:
          "State the non-negativity requirement out loud when you propose Dijkstra. It is the assumption the whole algorithm rests on, and interviewers listen for whether you know it or just know the code.",
      },
      {
        heading: "The lazy heap and stale entries",
        body: [
          "The textbook version uses a heap with a decrease-key operation, updating a node's priority in place. Most standard libraries do not offer decrease-key, so the practical version is lazy: whenever you improve a node's distance, push a new entry rather than updating the old one.",
          "That means the heap can hold several entries for the same node, all but one of which are outdated. The fix is one line: when you pop, compare the popped distance against the node's current best, and skip the entry if it is larger. That entry represents a route you have already beaten.",
          "The heap can therefore grow to O(E) rather than O(V), so the complexity is O(E log E) rather than the textbook O(E log V). Since E is at most V², log E is at most 2 log V, so the two are the same to within a constant — the lazy version is not asymptotically worse, and it is far simpler to write.",
        ],
        trace: `Lazy deletion in practice

  push A with 7         heap: [(2,B), (7,A)]
  later, A improves to 5
  push A with 5         heap: [(2,B), (5,A), (7,A)]
                                          ↑ now stale

  pop (2,B)  → dist[B] is 2, matches → process
  pop (5,A)  → dist[A] is 5, matches → process
  pop (7,A)  → dist[A] is 5, and 7 > 5 → SKIP

  Without the skip, A gets processed twice and
  its stale distance can overwrite better ones.`,
      },
      {
        heading: "Recovering the path, not just the distance",
        body: [
          "Dijkstra as usually written returns distances. To return the route, record a parent pointer at the same moment you improve a distance: whenever dist[v] is updated via u, set parent[v] to u.",
          "Reconstruct by walking parents back from the destination to the source and reversing. Since parent[v] is only ever written when a strictly better route is found, the final chain corresponds to one shortest path.",
          "If several shortest paths tie, this returns one of them arbitrarily — whichever was found first. If the problem asks for the number of shortest paths, keep a count alongside: when you find a strictly better distance, reset the count to the predecessor's; when you find an equal one, add it. That is a common follow-up and the update rules are easy to get subtly wrong, so write them deliberately.",
        ],
      },
      {
        heading: "Grids, and the variants worth knowing",
        body: [
          "Most Dijkstra interview questions are on a grid where moving into a cell has a cost. Nothing changes: each cell is a node, its up-to-four neighbours are its edges, and the heap orders by accumulated cost. Path With Minimum Effort is the same with a different accumulation — the path's cost is the maximum single step rather than the sum, and the relaxation compares maxima instead of adding.",
          "Two specialisations are worth recognising because they are asymptotically better when they apply. If all weights are 0 or 1, a deque replaces the heap — push zero-weight edges to the front and one-weight edges to the back — giving O(V + E) with no logarithm. That is 0-1 BFS.",
          "If the graph is a DAG, no heap is needed at all: process vertices in topological order and relax each one's outgoing edges. Every node's distance is final by the time you reach it, so it is O(V + E), and unlike Dijkstra it handles negative weights fine, because a DAG cannot contain a negative cycle.",
        ],
      },
      {
        heading: "A* and where Dijkstra sits",
        body: [
          "Dijkstra explores outward in every direction equally, which is wasteful when you only want the distance to one specific target. A* adds a heuristic estimate of the remaining distance to the priority, so the search is pulled toward the goal.",
          "It is still correct provided the heuristic never overestimates — an admissible heuristic. Straight-line distance works for road networks, and Manhattan distance works on a grid with orthogonal movement. With the zero heuristic, A* is exactly Dijkstra, which is a useful way to see the relationship.",
          "Placing the family: BFS for unweighted, 0-1 BFS for weights in {0,1}, topological relaxation for DAGs, Dijkstra for non-negative weights, Bellman-Ford for negative weights, Floyd-Warshall for all pairs on a small graph, and A* when there is a single target and a good heuristic. Being able to name that ladder is worth more than any one implementation.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

using Edge = pair<int,int>;                 // {neighbour, weight}

// Dijkstra with a lazy heap: no decrease-key, so improved distances are
// pushed as new entries and outdated ones are skipped on pop.
vector<long long> dijkstra(const vector<vector<Edge>>& adj, int source) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(adj.size(), INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>,
                   greater<>> heap;         // greater<> makes it a MIN-heap

    dist[source] = 0;
    heap.push({0, source});

    while (!heap.empty()) {
        auto [d, node] = heap.top(); heap.pop();
        if (d > dist[node]) continue;        // STALE - already beaten this

        for (auto [next, weight] : adj[node]) {
            long long candidate = d + weight;
            if (candidate < dist[next]) {    // relax
                dist[next] = candidate;
                heap.push({candidate, next});
            }
        }
    }
    return dist;
}

// With the route. parent[v] is written only when v strictly improves,
// so the final chain is one shortest path.
vector<int> shortestPath(const vector<vector<Edge>>& adj, int from, int to) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(adj.size(), INF);
    vector<int> parent(adj.size(), -1);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>,
                   greater<>> heap;
    dist[from] = 0;
    heap.push({0, from});

    while (!heap.empty()) {
        auto [d, node] = heap.top(); heap.pop();
        if (d > dist[node]) continue;
        for (auto [next, weight] : adj[node])
            if (d + weight < dist[next]) {
                dist[next] = d + weight;
                parent[next] = node;         // remember who improved us
                heap.push({dist[next], next});
            }
    }

    if (dist[to] == INF) return {};          // unreachable
    vector<int> path;
    for (int at = to; at != -1; at = parent[at]) path.push_back(at);
    reverse(path.begin(), path.end());
    return path;
}

// Counting shortest paths. Strictly better resets the count; equal adds.
// Getting these two rules the wrong way round is the usual bug.
long long countShortestPaths(const vector<vector<Edge>>& adj, int source,
                             int target, long long mod = 1000000007) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(adj.size(), INF), ways(adj.size(), 0);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>,
                   greater<>> heap;
    dist[source] = 0;
    ways[source] = 1;
    heap.push({0, source});

    while (!heap.empty()) {
        auto [d, node] = heap.top(); heap.pop();
        if (d > dist[node]) continue;
        for (auto [next, weight] : adj[node]) {
            long long candidate = d + weight;
            if (candidate < dist[next]) {
                dist[next] = candidate;
                ways[next] = ways[node];             // strictly better: reset
                heap.push({candidate, next});
            } else if (candidate == dist[next]) {
                ways[next] = (ways[next] + ways[node]) % mod;   // tie: add
            }
        }
    }
    return ways[target];
}

// DAG shortest path - no heap at all. In topological order, every node's
// distance is already final, so one relaxation pass suffices: O(V + E).
// It also handles NEGATIVE weights, since a DAG has no cycles.
vector<long long> dagShortestPath(const vector<vector<Edge>>& adj,
                                  const vector<int>& topoOrder, int source) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(adj.size(), INF);
    dist[source] = 0;
    for (int node : topoOrder) {
        if (dist[node] == INF) continue;
        for (auto [next, weight] : adj[node])
            dist[next] = min(dist[next], dist[node] + weight);
    }
    return dist;
}

// 0-1 BFS: weights of only 0 and 1. A deque restores the ordering that
// plain BFS loses, giving O(V + E) with no logarithm.
vector<int> zeroOneBfs(const vector<vector<Edge>>& adj, int source) {
    vector<int> dist(adj.size(), INT_MAX);
    deque<int> dq;
    dist[source] = 0;
    dq.push_back(source);

    while (!dq.empty()) {
        int node = dq.front(); dq.pop_front();
        for (auto [next, weight] : adj[node]) {
            if (dist[node] + weight >= dist[next]) continue;
            dist[next] = dist[node] + weight;
            if (weight == 0) dq.push_front(next);    // free - same layer
            else             dq.push_back(next);     // costs 1 - next layer
        }
    }
    return dist;
}`,
  },

  "graphs-bellman-ford-floyd": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="A negative cycle that Dijkstra mishandles, and the Floyd-Warshall triple loop with the waypoint loop outermost">
  <text x="0" y="14" class="dg-title">A negative cycle &#8212; each lap costs &#8722;1, so no shortest path exists</text>

  <g transform="translate(40,40)">
    <line x1="42"  y1="55" x2="118" y2="30"  class="dg-link"/>
    <line x1="152" y1="42" x2="212" y2="70"  class="dg-link"/>
    <line x1="212" y1="95" x2="42"  y2="80"  class="dg-link-cut"/>

    <circle cx="22"  cy="68" r="20" class="dg-cell"/><text x="22"  y="73" text-anchor="middle">A</text>
    <circle cx="135" cy="22" r="20" class="dg-cell"/><text x="135" y="27" text-anchor="middle">B</text>
    <circle cx="232" cy="82" r="20" class="dg-cell"/><text x="232" y="87" text-anchor="middle">C</text>

    <text x="72"  y="30"  class="dg-bad">&#8722;4</text>
    <text x="184" y="46"  class="dg-label">+1</text>
    <text x="120" y="108" class="dg-label">+2</text>

    <text x="0" y="150" class="dg-note">loop total = &#8722;4 + 1 + 2 = &#8722;1</text>
    <text x="0" y="172" class="dg-bad">Dijkstra returns a wrong answer here, silently.</text>
    <text x="0" y="194" class="dg-good">Bellman-Ford's extra pass detects it.</text>
  </g>

  <g transform="translate(330,40)">
    <rect x="0" y="0" width="360" height="180" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-note">Floyd-Warshall &#8212; k MUST be outermost</text>
    <text x="14" y="52" class="dg-ptr">for k in vertices:&#160;&#160;&#160;&#8592; the WAYPOINT</text>
    <text x="14" y="74" class="dg-note">&#160;&#160;for i in vertices:</text>
    <text x="14" y="94" class="dg-note">&#160;&#160;&#160;&#160;for j in vertices:</text>
    <text x="14" y="114" class="dg-note">&#160;&#160;&#160;&#160;&#160;&#160;d[i][j] = min(d[i][j],</text>
    <text x="14" y="134" class="dg-note">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;d[i][k] + d[k][j])</text>
    <text x="14" y="164" class="dg-bad">k innermost reads values not yet ready</text>
  </g>

  <line x1="0" y1="264" x2="700" y2="264" class="dg-guide"/>
  <text x="0" y="286" class="dg-note">k is an induction variable: after round k, d[i][j] is the best route using only the first k</text>
  <text x="0" y="306" class="dg-note">vertices as intermediates. That only holds if every (i, j) pair is updated for one k at a time.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What negative weights break",
        body: [
          "Dijkstra settles a node the moment it is popped and never revisits it. That is safe only because every edge is non-negative: leaving the settled set costs at least as much as the node you just popped, so no detour can come back cheaper.",
          "A negative edge destroys that. A route through a more distant node can drop below the direct one, so a settled node's distance may still improve — and Dijkstra has already moved on. The failure is silent: it returns plausible numbers that are simply wrong.",
          "Bellman-Ford drops the settling idea entirely. Instead of choosing which node to process next, it relaxes every edge, repeatedly, until nothing can improve. That costs more but assumes nothing about the weights.",
        ],
      },
      {
        heading: "Why V minus 1 passes are enough",
        body: [
          "Any shortest path visits at most V vertices, and therefore uses at most V-1 edges — if it used more, some vertex would repeat, meaning the path contains a cycle, which can be removed without increasing the cost when no negative cycle exists.",
          "Each full pass over all edges extends correct distances by at least one edge. After one pass, every shortest path of one edge is correct. After two, every path of two edges. After V-1, every shortest path is correct, whatever order the edges happen to be listed in.",
          "In practice you can stop early: if a pass changes nothing, nothing will ever change again, so break. On many graphs this terminates far sooner than V-1 rounds. The worst case remains O(V·E), which is why Dijkstra is preferred wherever it applies.",
        ],
        trace: `Why the pass count matters

  path  S → A → B → C  costs 1 + 1 + 1

  If the edge list happens to be ordered
  C→? , B→C , A→B , S→A  then one pass
  fixes only dist[A]:

    pass 1:  S→A relaxes        dist[A] = 1
    pass 2:  A→B relaxes        dist[B] = 2
    pass 3:  B→C relaxes        dist[C] = 3

  One edge of progress per pass, worst case.
  With 4 vertices, 3 passes suffice.`,
      },
      {
        heading: "Detecting a negative cycle",
        body: [
          "After V-1 passes, every distance should be final. So run one more pass: if any edge still relaxes, some path is getting shorter by going round a loop, which means a negative cycle is reachable from the source.",
          "When one exists, 'shortest path' is undefined for anything the cycle can reach — you can lap it forever and drive the cost to negative infinity. Reporting that is the correct answer, not returning a number.",
          "One subtlety worth knowing: this detects cycles reachable from the source only. To find a negative cycle anywhere in the graph, add a virtual source with a zero-weight edge to every vertex, then run from that. And to identify which vertices are affected rather than just whether one exists, run V more passes and mark everything that keeps improving.",
        ],
        aside:
          "Guard the relaxation against unreachable nodes. Infinity plus a negative weight is less than infinity in most languages, which invents phantom improvements and can make a clean graph look like it has a negative cycle.",
      },
      {
        heading: "Floyd-Warshall, and the loop that must be outermost",
        body: [
          "Floyd-Warshall answers a different question: shortest paths between every pair of vertices, in O(V³) with a triple loop that fits on one line.",
          "The idea is induction over allowed intermediates. Let d_k[i][j] be the shortest path from i to j using only the first k vertices as waypoints. Then d_k[i][j] is either the old value — not using vertex k — or the route through k, which is d_{k-1}[i][k] plus d_{k-1}[k][j]. Take the smaller.",
          "This is why k must be the outermost loop. It is the induction variable, and every pair must be updated for waypoint k before any pair is updated for waypoint k+1. Put k innermost and the recurrence reads values that have not been established yet — and the code still runs, producing wrong distances on some graphs and correct ones on others, which is the worst kind of bug.",
        ],
      },
      {
        heading: "What Floyd-Warshall gives you cheaply",
        body: [
          "Negative cycle detection comes free: if any diagonal entry becomes negative, that vertex can reach itself at negative cost, which is exactly a negative cycle through it.",
          "Swapping the operations turns it into other algorithms on the same skeleton. Replace min-plus with logical OR-AND and you compute transitive closure — which pairs are connected at all. Replace it with max-min and you compute the widest path, the route whose narrowest edge is as wide as possible, which is the bottleneck problem.",
          "The path itself is recoverable with a next-hop matrix: alongside the distance, record which vertex to move to first. Reading it back is a loop following next-hop pointers rather than a recursive reconstruction.",
        ],
      },
      {
        heading: "Choosing between the three",
        body: [
          "Dijkstra when weights are non-negative and you want distances from one source: O(E log V), the fastest of the three when it applies.",
          "Bellman-Ford when weights can be negative or you need to detect a negative cycle: O(V·E). Also the natural fit when the problem bounds the number of edges — Cheapest Flights Within K Stops is Bellman-Ford run exactly k+1 times rather than V-1, since each pass extends paths by one edge, which is a bound Dijkstra cannot express directly.",
          "Floyd-Warshall when you need all pairs and V is small: O(V³) with a tiny constant factor and three lines of code. The crossover against running Dijkstra from every source is roughly whether the graph is dense. At V = 400 the triple loop is 64 million operations and trivially fast; at V = 2000 it is 8 billion and hopeless, so V·Dijkstra wins on any sparse graph of that size.",
        ],
        trace: `Which one?

  non-negative, one source     → Dijkstra      O(E log V)
  negative weights allowed     → Bellman-Ford  O(V·E)
  need to detect a neg. cycle  → Bellman-Ford
  bounded edge count (k stops) → Bellman-Ford, k+1 passes
  all pairs, small dense V     → Floyd-Warshall O(V³)
  all pairs, large sparse V    → Dijkstra × V
  DAG, any weights             → topological relaxation O(V+E)`,
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct WeightedEdge { int from, to, weight; };

// BELLMAN-FORD. Relax every edge V-1 times; a further improvement on an
// extra pass means a reachable negative cycle. Returns empty on one.
vector<long long> bellmanFord(int n, const vector<WeightedEdge>& edges,
                              int source) {
    const long long INF = LLONG_MAX / 4;
    vector<long long> dist(n, INF);
    dist[source] = 0;

    for (int round = 0; round < n - 1; ++round) {
        bool changed = false;
        for (const auto& e : edges) {
            if (dist[e.from] == INF) continue;    // guard: INF + negative
            if (dist[e.from] + e.weight < dist[e.to]) {
                dist[e.to] = dist[e.from] + e.weight;
                changed = true;
            }
        }
        if (!changed) break;                      // settled early
    }

    for (const auto& e : edges)                   // one more pass
        if (dist[e.from] != INF && dist[e.from] + e.weight < dist[e.to])
            return {};                            // negative cycle

    return dist;
}

// Cheapest Flights Within K Stops - Bellman-Ford run exactly k+1 times.
// Each pass extends paths by one edge, so the pass count IS the edge
// bound. Dijkstra cannot express that constraint directly.
int cheapestFlight(int n, const vector<WeightedEdge>& flights,
                   int from, int to, int maxStops) {
    const int INF = INT_MAX / 4;
    vector<int> dist(n, INF);
    dist[from] = 0;

    for (int round = 0; round <= maxStops; ++round) {
        vector<int> next = dist;                  // snapshot: relax from the
        for (const auto& e : flights) {           // PREVIOUS round only, or
            if (dist[e.from] == INF) continue;    // one pass could chain
            next[e.to] = min(next[e.to], dist[e.from] + e.weight);
        }
        dist = move(next);
    }
    return dist[to] == INF ? -1 : dist[to];
}

// FLOYD-WARSHALL. The k loop is the induction variable and MUST be
// outermost: after round k, d[i][j] is the best route using only the
// first k vertices as waypoints.
vector<vector<long long>> floydWarshall(int n,
                                        const vector<WeightedEdge>& edges) {
    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> d(n, vector<long long>(n, INF));
    for (int v = 0; v < n; ++v) d[v][v] = 0;
    for (const auto& e : edges) d[e.from][e.to] = min<long long>(d[e.from][e.to], e.weight);

    for (int k = 0; k < n; ++k)                   // WAYPOINT - outermost
        for (int i = 0; i < n; ++i) {
            if (d[i][k] == INF) continue;         // no route to the waypoint
            for (int j = 0; j < n; ++j)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
        }

    for (int v = 0; v < n; ++v)
        if (d[v][v] < 0) return {};               // negative cycle through v
    return d;
}

// With path reconstruction: record the first hop rather than the parent.
struct AllPairs {
    vector<vector<long long>> dist;
    vector<vector<int>> nextHop;

    AllPairs(int n, const vector<WeightedEdge>& edges)
        : dist(n, vector<long long>(n, LLONG_MAX / 4)),
          nextHop(n, vector<int>(n, -1)) {
        for (int v = 0; v < n; ++v) { dist[v][v] = 0; nextHop[v][v] = v; }
        for (const auto& e : edges)
            if (e.weight < dist[e.from][e.to]) {
                dist[e.from][e.to] = e.weight;
                nextHop[e.from][e.to] = e.to;
            }

        for (int k = 0; k < n; ++k)
            for (int i = 0; i < n; ++i)
                for (int j = 0; j < n; ++j)
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        nextHop[i][j] = nextHop[i][k];   // go toward k first
                    }
    }

    vector<int> path(int from, int to) const {
        if (nextHop[from][to] == -1) return {};
        vector<int> route{from};
        while (from != to) { from = nextHop[from][to]; route.push_back(from); }
        return route;
    }
};

// Same skeleton, different operations: transitive closure replaces
// min-plus with OR-AND, answering "is j reachable from i at all".
vector<vector<char>> transitiveClosure(int n, const vector<WeightedEdge>& edges) {
    vector<vector<char>> reach(n, vector<char>(n, false));
    for (int v = 0; v < n; ++v) reach[v][v] = true;
    for (const auto& e : edges) reach[e.from][e.to] = true;

    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i)
            if (reach[i][k])
                for (int j = 0; j < n; ++j)
                    if (reach[k][j]) reach[i][j] = true;
    return reach;
}`,
  },

  "graphs-mst": {
    illustration: `
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Kruskal taking edges in weight order and rejecting the one that would close a cycle">
  <text x="0" y="14" class="dg-title">Kruskal &#8212; sort edges, take any that joins two separate components</text>

  <g transform="translate(30,40)">
    <line x1="30"  y1="30" x2="140" y2="30"  class="dg-link-hi"/>
    <line x1="30"  y1="45" x2="140" y2="115" class="dg-link-hi"/>
    <line x1="150" y1="45" x2="150" y2="105" class="dg-link-cut"/>
    <line x1="165" y1="30" x2="245" y2="105" class="dg-link-hi"/>

    <circle cx="20"  cy="38"  r="19" class="dg-cell-hit"/><text x="20"  y="43" text-anchor="middle">A</text>
    <circle cx="150" cy="22"  r="19" class="dg-cell-hit"/><text x="150" y="27" text-anchor="middle">B</text>
    <circle cx="150" cy="125" r="19" class="dg-cell-hit"/><text x="150" y="130" text-anchor="middle">C</text>
    <circle cx="258" cy="118" r="19" class="dg-cell-hit"/><text x="258" y="123" text-anchor="middle">D</text>

    <text x="80"  y="18"  class="dg-good">1</text>
    <text x="70"  y="98"  class="dg-good">2</text>
    <text x="160" y="80"  class="dg-bad">5</text>
    <text x="215" y="60"  class="dg-good">3</text>
  </g>

  <g transform="translate(330,40)">
    <text x="0" y="0" class="dg-label">edges in weight order</text>

    <rect x="0" y="10" width="340" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="27" class="dg-note">A&#8211;B (1)&#160;&#160;different components &#8594; TAKE</text>

    <rect x="0" y="40" width="340" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="57" class="dg-note">A&#8211;C (2)&#160;&#160;different components &#8594; TAKE</text>

    <rect x="0" y="70" width="340" height="24" rx="3" class="dg-cell-hit"/>
    <text x="10" y="87" class="dg-note">B&#8211;D (3)&#160;&#160;different components &#8594; TAKE</text>

    <rect x="0" y="100" width="340" height="24" rx="3" class="dg-cell-out"/>
    <text x="10" y="117" class="dg-note">B&#8211;C (5)&#160;&#160;already joined &#8594; REJECT</text>

    <rect x="0" y="134" width="340" height="44" rx="4" class="dg-cell-idle"/>
    <text x="14" y="154" class="dg-note">3 edges for 4 vertices, total weight 6.</text>
    <text x="14" y="172" class="dg-note">An MST always has exactly V &#8722; 1 edges.</text>
  </g>

  <line x1="0" y1="264" x2="700" y2="264" class="dg-guide"/>
  <text x="0" y="286" class="dg-note">Union Find answers "already joined?" in effectively constant time &#8212; that is what makes Kruskal fast.</text>
  <text x="0" y="306" class="dg-note">Fewer than V &#8722; 1 edges taken means the graph was disconnected: no spanning tree exists.</text>
</svg>`,
    walkthrough: [
      {
        heading: "What is being asked for",
        body: [
          "Given a connected weighted undirected graph, a spanning tree is a subset of edges connecting every vertex with no cycles. A minimum spanning tree is the one with the smallest total weight. It always has exactly V-1 edges — fewer would leave a vertex disconnected, more would create a cycle.",
          "The practical framing is the cheapest way to connect everything: laying cable between towns, wiring a circuit, building a road network. Note that an MST minimises the total, not the distance between any particular pair — the path between two vertices in an MST is often longer than their shortest path in the original graph. That confusion comes up regularly and is worth being explicit about.",
          "Two standard algorithms, both greedy, both provably optimal, with the same complexity. They differ in what they grow.",
        ],
      },
      {
        heading: "The cut property, which is why greedy works",
        body: [
          "Both algorithms rest on one fact. Take any partition of the vertices into two non-empty groups — a cut. The cheapest edge crossing that cut belongs to some minimum spanning tree.",
          "The argument is an exchange, as with all greedy proofs. Suppose an MST omits the cheapest crossing edge e. Since the tree spans everything, it must cross the cut somewhere, by some edge f. Adding e creates a cycle that crosses the cut twice, so removing f from that cycle leaves a spanning tree again — and since e is no heavier than f, the result is no worse. So an MST containing e exists.",
          "That single property justifies both algorithms. Kruskal picks the globally cheapest edge that crosses some cut, namely the one separating the two components it joins. Prim picks the cheapest edge crossing the cut between the tree built so far and everything else. Different cuts, same guarantee.",
        ],
      },
      {
        heading: "Kruskal: sort, then union",
        body: [
          "Sort every edge by weight and walk through them in order. For each, ask whether its endpoints are already connected. If they are, taking it would close a cycle, so skip it. If not, take it and merge the two components.",
          "The connectivity question is what Union Find is for, and it answers in effectively constant time with path compression and union by size. Without it, you would need a graph traversal per edge, which would dominate everything.",
          "The complexity is O(E log E) for the sort plus O(E·α(V)) for the unions — the sort dominates. Since E is at most V², log E is within a constant factor of log V, so this is usually quoted as O(E log V).",
          "One detail that also gives you disconnection detection for free: count the edges taken. If the loop finishes with fewer than V-1, no spanning tree exists because the graph was not connected.",
        ],
        aside:
          "Kruskal is the natural choice when the input is already an edge list, which is how most problems present it. Building an adjacency list just to run Prim is wasted work if you were going to sort the edges anyway.",
      },
      {
        heading: "Prim: grow one tree from a seed",
        body: [
          "Prim starts from any vertex and repeatedly adds the cheapest edge connecting the tree to a vertex outside it. The tree stays connected throughout, which is the structural difference from Kruskal — Kruskal's partial result is a forest of disconnected fragments that merge at the end.",
          "The implementation mirrors Dijkstra almost exactly: a min-heap of candidate edges, pop the cheapest, skip it if its target is already in the tree, otherwise add it and push that vertex's outgoing edges. The one difference from Dijkstra is what the heap key measures — Prim orders by the single edge weight, Dijkstra by accumulated distance from the source. Confusing the two is a common slip and produces a shortest-path tree rather than an MST.",
          "The complexity with a binary heap is O(E log V), the same as Kruskal. With an adjacency matrix and no heap it is O(V²), which is actually better on a dense graph where E approaches V².",
        ],
        trace: `Prim vs Dijkstra — one line apart

  PRIM      key = weight(u, v)
            "how cheap is this edge?"

  DIJKSTRA  key = dist[u] + weight(u, v)
            "how far from the source?"

  Same heap, same loop, same skip-if-seen.
  Using Dijkstra's key builds a shortest-path
  tree, which is usually NOT minimum weight.`,
      },
      {
        heading: "Ties, uniqueness, and variants",
        body: [
          "If every edge weight is distinct, the MST is unique. With ties there can be several MSTs, all of the same total weight — so a problem asking for 'the' MST edges needs to say how to break ties, and one asking for the total weight is unambiguous either way.",
          "A maximum spanning tree is the same algorithm with the sort reversed, or with weights negated. Nothing else changes, because the cut property works just as well upside down.",
          "The minimum bottleneck spanning tree — minimising the largest single edge rather than the total — is solved by any MST, which is a pleasant surprise worth knowing. Minimum spanning forest on a disconnected graph is Kruskal without the connectivity check at the end; you simply get one tree per component.",
          "Critical and pseudo-critical edges is a common hard follow-up: an edge is critical if removing it increases the MST weight, and pseudo-critical if it appears in some MST but not all. Both are answered by rerunning Kruskal with that edge forcibly excluded or included and comparing totals.",
        ],
      },
      {
        heading: "Recognising it",
        body: [
          "The signals are consistent: connect all points, minimise total cost, build a network, and the graph is undirected with weights. Min Cost to Connect All Points is the direct version, where the edges are implied by pairwise distances rather than given.",
          "That implied-edge case is worth noting. With n points you have n² pairs, so building the full edge list costs O(n²) memory. For n up to a couple of thousand that is fine and Kruskal works. Beyond that, Prim with an adjacency matrix at O(V²) avoids materialising the edge list at all, which is exactly the dense-graph case where Prim wins.",
          "The most common wrong turn is reaching for shortest paths. If the question is about connecting everything cheaply, it is MST; if it is about travelling between two specific places cheaply, it is Dijkstra. Optimize Water Distribution is a nice example that looks like neither until you add a virtual node representing a well, which turns 'dig or pipe' into a plain MST.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Union Find - what makes Kruskal's cycle check effectively O(1).
struct DSU {
    vector<int> parent, size;
    int components;

    explicit DSU(int n) : parent(n), size(n, 1), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);   // path compression
        return parent[x];
    }
    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;                        // would close a cycle
        if (size[ra] < size[rb]) swap(ra, rb);             // union by size
        parent[rb] = ra;
        size[ra] += size[rb];
        --components;
        return true;
    }
};

struct Edge { int weight, from, to; };

// KRUSKAL. Sort by weight, take any edge joining two separate components.
// Returns -1 if the graph is disconnected.
long long kruskal(int n, vector<Edge> edges) {
    sort(edges.begin(), edges.end(),
         [](const Edge& a, const Edge& b) { return a.weight < b.weight; });

    DSU dsu(n);
    long long total = 0;
    int taken = 0;

    for (const auto& e : edges) {
        if (!dsu.unite(e.from, e.to)) continue;   // endpoints already joined
        total += e.weight;
        if (++taken == n - 1) break;              // an MST has exactly V-1
    }
    return taken == n - 1 ? total : -1;           // fewer means disconnected
}

// Which edges were used, not just the total.
vector<Edge> kruskalEdges(int n, vector<Edge> edges) {
    sort(edges.begin(), edges.end(),
         [](const Edge& a, const Edge& b) { return a.weight < b.weight; });
    DSU dsu(n);
    vector<Edge> tree;
    for (const auto& e : edges)
        if (dsu.unite(e.from, e.to)) tree.push_back(e);
    return (int)tree.size() == n - 1 ? tree : vector<Edge>{};
}

// PRIM. Same heap shape as Dijkstra, but the key is the EDGE WEIGHT,
// not the accumulated distance. Using Dijkstra's key here builds a
// shortest-path tree instead, which is usually not minimum weight.
long long prim(int n, const vector<vector<pair<int,int>>>& adj) {
    vector<bool> inTree(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> heap;
    heap.push({0, 0});                            // {weight, vertex}

    long long total = 0;
    int taken = 0;

    while (!heap.empty() && taken < n) {
        auto [weight, node] = heap.top(); heap.pop();
        if (inTree[node]) continue;               // stale entry

        inTree[node] = true;
        total += weight;
        ++taken;

        for (auto [next, w] : adj[node])
            if (!inTree[next]) heap.push({w, next});   // key = w, not total+w
    }
    return taken == n ? total : -1;
}

// Dense graphs: O(V^2) Prim with no heap and no edge list. Better than
// Kruskal when E approaches V^2, e.g. points with implied pairwise edges.
long long primDense(const vector<vector<int>>& weight) {
    int n = (int)weight.size();
    vector<int> best(n, INT_MAX);
    vector<bool> inTree(n, false);
    best[0] = 0;
    long long total = 0;

    for (int step = 0; step < n; ++step) {
        int node = -1;
        for (int v = 0; v < n; ++v)               // scan instead of a heap
            if (!inTree[v] && (node == -1 || best[v] < best[node])) node = v;

        if (best[node] == INT_MAX) return -1;     // disconnected
        inTree[node] = true;
        total += best[node];

        for (int v = 0; v < n; ++v)
            if (!inTree[v]) best[v] = min(best[v], weight[node][v]);
    }
    return total;
}

// Min Cost to Connect All Points - edges are implied by Manhattan
// distance, so there are O(n^2) of them.
long long minCostConnectPoints(const vector<pair<int,int>>& points) {
    int n = (int)points.size();
    vector<vector<int>> weight(n, vector<int>(n, 0));
    for (int i = 0; i < n; ++i)
        for (int j = i + 1; j < n; ++j) {
            int d = abs(points[i].first  - points[j].first)
                  + abs(points[i].second - points[j].second);
            weight[i][j] = weight[j][i] = d;
        }
    return primDense(weight);                     // dense: skip the edge list
}`,
  },

  "bit-manipulation-basics": {
    illustration: `
<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="The core bit operations shown on an 8-bit value, including isolating the lowest set bit">
  <text x="0" y="14" class="dg-title">x = 44 = 00101100&#8322;</text>

  <g transform="translate(40,32)">
    <rect x="0"   y="0" width="34" height="28" rx="3" class="dg-cell-idle"/><text x="17"  y="19" text-anchor="middle" class="dg-index">0</text>
    <rect x="38"  y="0" width="34" height="28" rx="3" class="dg-cell-idle"/><text x="55"  y="19" text-anchor="middle" class="dg-index">0</text>
    <rect x="76"  y="0" width="34" height="28" rx="3" class="dg-cell-live"/><text x="93"  y="19" text-anchor="middle">1</text>
    <rect x="114" y="0" width="34" height="28" rx="3" class="dg-cell-idle"/><text x="131" y="19" text-anchor="middle" class="dg-index">0</text>
    <rect x="152" y="0" width="34" height="28" rx="3" class="dg-cell-live"/><text x="169" y="19" text-anchor="middle">1</text>
    <rect x="190" y="0" width="34" height="28" rx="3" class="dg-cell-mark"/><text x="207" y="19" text-anchor="middle">1</text>
    <rect x="228" y="0" width="34" height="28" rx="3" class="dg-cell-idle"/><text x="245" y="19" text-anchor="middle" class="dg-index">0</text>
    <rect x="266" y="0" width="34" height="28" rx="3" class="dg-cell-idle"/><text x="283" y="19" text-anchor="middle" class="dg-index">0</text>

    <text x="17"  y="46" text-anchor="middle" class="dg-index">7</text>
    <text x="55"  y="46" text-anchor="middle" class="dg-index">6</text>
    <text x="93"  y="46" text-anchor="middle" class="dg-index">5</text>
    <text x="131" y="46" text-anchor="middle" class="dg-index">4</text>
    <text x="169" y="46" text-anchor="middle" class="dg-index">3</text>
    <text x="207" y="46" text-anchor="middle" class="dg-index">2</text>
    <text x="245" y="46" text-anchor="middle" class="dg-index">1</text>
    <text x="283" y="46" text-anchor="middle" class="dg-index">0</text>
    <text x="330" y="19" class="dg-ptr">bit 2 is the lowest set bit</text>
  </g>

  <line x1="0" y1="98" x2="700" y2="98" class="dg-guide"/>

  <g transform="translate(0,116)">
    <rect x="0" y="0" width="340" height="176" rx="4" class="dg-cell-idle"/>
    <text x="14" y="24" class="dg-note">test bit i&#160;&#160;&#160;&#160;x &amp; (1 &lt;&lt; i)</text>
    <text x="14" y="48" class="dg-note">set bit i&#160;&#160;&#160;&#160;&#160;x | (1 &lt;&lt; i)</text>
    <text x="14" y="72" class="dg-note">clear bit i&#160;&#160;&#160;x &amp; ~(1 &lt;&lt; i)</text>
    <text x="14" y="96" class="dg-note">flip bit i&#160;&#160;&#160;&#160;x ^ (1 &lt;&lt; i)</text>
    <text x="14" y="126" class="dg-note">lowest set bit&#160;&#160;&#160;&#160;&#160;&#160;x &amp; &#8722;x</text>
    <text x="14" y="150" class="dg-note">clear lowest set&#160;&#160;&#160;&#160;x &amp; (x &#8722; 1)</text>
    <text x="14" y="170" class="dg-label">that second one counts bits in O(popcount)</text>
  </g>

  <g transform="translate(360,116)">
    <rect x="0" y="0" width="330" height="176" rx="4" class="dg-cell-live"/>
    <text x="14" y="24" class="dg-note">why x &amp; &#8722;x isolates the lowest bit</text>
    <text x="14" y="52" class="dg-note">&#160;&#160;x&#160;&#160;= 00101100</text>
    <text x="14" y="72" class="dg-note">&#160;&#160;~x = 11010011</text>
    <text x="14" y="92" class="dg-note">&#160;&#8722;x&#160;&#160;= ~x + 1 = 11010100</text>
    <text x="14" y="120" class="dg-good">x &amp; &#8722;x = 00000100&#160;&#160;&#8212; just bit 2</text>
    <text x="14" y="150" class="dg-label">Two's complement flips everything above</text>
    <text x="14" y="168" class="dg-label">the lowest set bit and leaves it standing.</text>
  </g>
</svg>`,
    walkthrough: [
      {
        heading: "The six operations worth knowing cold",
        body: [
          "Almost all bit manipulation reduces to a handful of idioms, and knowing them by sight is the difference between reading a solution and deriving it.",
          "Testing, setting, clearing and flipping bit i are all built from the mask 1 shifted left by i. Test with AND, set with OR, clear with AND against the complement, flip with XOR. These four cover most usage.",
          "The two that look cryptic are worth internalising separately. x AND minus-x isolates the lowest set bit, leaving a value with exactly that one bit. And x AND (x minus 1) clears the lowest set bit. That second one gives a bit-counting loop that runs once per set bit rather than once per bit position, which matters when values are sparse.",
        ],
        trace: `Why x & (x − 1) clears the lowest set bit

  x      = 0010 1100
  x − 1  = 0010 1011      ← borrow flips the
                            lowest 1 to 0 and
                            everything below to 1
  x & (x−1) = 0010 1000   ← that bit is gone

  Counting set bits:
    while (x) { x &= x - 1; count++; }
  runs 3 times for 44, not 8 or 32.`,
      },
      {
        heading: "XOR, and why it solves the odd-one-out problems",
        body: [
          "XOR has three properties that together make it unreasonably useful. It is its own inverse — x XOR x is 0. Zero is the identity — x XOR 0 is x. And it is commutative and associative, so the order of operations does not matter.",
          "Put those together and XOR-ing a whole collection cancels every value that appears an even number of times, regardless of how they are interleaved. That is Single Number in one line: XOR everything, and what survives is the value that appeared once.",
          "The two-singles variant is a nice extension. XOR everything and you get the XOR of the two distinct values, which is non-zero, so some bit differs between them. Isolate any such bit — the lowest, via x AND minus-x — and partition the input by whether that bit is set. Each group now contains exactly one of the singles, so XOR each separately.",
          "The same cancellation logic solves Missing Number: XOR the array with the full range 0 through n, and everything present twice cancels, leaving the absent value.",
        ],
        aside:
          "The XOR-swap trick — a ^= b; b ^= a; a ^= b — is a classic that you should recognise and not use. It fails when both operands are the same variable, and it is slower than a temporary on any modern compiler.",
      },
      {
        heading: "Bitmasks as sets",
        body: [
          "When you need a set over a small universe — the 26 lowercase letters, or up to about 30 items — an integer is a faster set than any hash structure. Bit i means element i is present, and the set operations become single instructions: union is OR, intersection is AND, difference is AND-NOT, and symmetric difference is XOR.",
          "Checking whether a string has all unique characters becomes a single integer and a loop. Checking whether two words share no letters is one AND against zero, which is the core of Maximum Product of Word Lengths — precompute a mask per word, then test pairs in O(1) each instead of comparing character sets.",
          "Enumerating every subset of n elements is a loop from 0 to 2^n minus 1, where each number's bits say which elements are in. Enumerating every subset of a particular mask has its own idiom: start at the mask and repeatedly apply sub = (sub - 1) AND mask. That visits every submask exactly once, and summed over all masks it is O(3^n) rather than O(4^n).",
        ],
      },
      {
        heading: "The traps",
        body: [
          "Operator precedence. In C, C++ and Java, the bitwise operators bind more loosely than the comparison operators, so `x & 1 == 0` parses as `x & (1 == 0)`, which is almost never what you meant. Parenthesise every bitwise expression that sits next to a comparison.",
          "Shift width. Shifting by the width of the type or more is undefined behaviour in C++. `1 << 32` on a 32-bit int is not zero and not one — it is whatever the hardware does. Use `1LL << i` whenever i can reach 31 or beyond.",
          "JavaScript coerces both operands of a bitwise operator to 32-bit signed integers, so `1 << 31` is negative and anything above 32 bits silently truncates. Use BigInt when you need wider values, and be aware that `>>>` exists precisely because `>>` sign-extends.",
          "Right-shifting a negative number is implementation-defined in older C++ standards and arithmetic in practice — the sign bit is copied, so -8 >> 1 is -4, not a huge positive. Prefer unsigned types when you are treating a value as a bag of bits rather than a number.",
        ],
      },
      {
        heading: "Counting, and the built-ins",
        body: [
          "Counting set bits — the population count — comes up constantly, particularly in bitmask DP where the popcount of a mask often encodes progress. Three approaches, in increasing order of how much you should prefer them.",
          "Loop over all bits: simple, always O(word size). Loop with x AND (x minus 1): O(number of set bits), better on sparse values. Use the built-in: `__builtin_popcount` in GCC and Clang, `std::popcount` in C++20, `Integer.bitCount` in Java, `int.bit_count()` in Python 3.10+. These compile to a single instruction on modern hardware and should be your default.",
          "For a DP over all masks you often want the popcount of every mask up to 2^n. Computing each independently is wasteful; instead, popcount[i] equals popcount[i >> 1] plus (i AND 1), filling the whole table in one linear pass.",
        ],
      },
      {
        heading: "Where it actually appears",
        body: [
          "As a component rather than a topic, mostly. Bitmask DP over subsets — travelling salesman, assignment problems — depends entirely on treating an integer as a set, which is why that topic sits in stage 6 and this one is a prerequisite.",
          "Powers of two: x is a power of two exactly when x is positive and x AND (x minus 1) is zero, since a power of two has exactly one set bit. That is the standard one-line check.",
          "Sum of two integers without the plus operator: XOR gives the sum without carries, AND shifted left gives the carries, and you repeat until there is no carry left. It is a good exercise in seeing addition as bit operations.",
          "Gray code, subsets, and the various single-number variants round out the common interview set. The generalisation of Single Number to 'every value appears three times except one' is worth seeing once: count set bits per position modulo 3, which no longer works by simple XOR because XOR cancels in pairs, not triples.",
        ],
      },
    ],
    cpp: `#include <bits/stdc++.h>
using namespace std;

// THE CORE SIX. Parenthesise everything: in C++, & binds LOOSER than ==,
// so "x & 1 == 0" parses as "x & (1 == 0)".
bool testBit (unsigned x, int i) { return (x & (1u << i)) != 0; }
unsigned setBit  (unsigned x, int i) { return x |  (1u << i); }
unsigned clearBit(unsigned x, int i) { return x & ~(1u << i); }
unsigned flipBit (unsigned x, int i) { return x ^  (1u << i); }

unsigned lowestSetBit  (unsigned x) { return x & (~x + 1); }   // isolate it
unsigned clearLowestBit(unsigned x) { return x & (x - 1);  }   // remove it

// Use 1LL when the index can reach 31 or beyond: 1 << 32 on a 32-bit
// int is undefined behaviour, not zero.
long long bigMask(int i) { return 1LL << i; }

// Popcount. Prefer the built-in - it is one instruction on modern CPUs.
int popcountFast(unsigned x) { return __builtin_popcount(x); }

// The manual version runs once per SET bit, not once per bit position.
int popcountSparse(unsigned x) {
    int count = 0;
    while (x) { x &= x - 1; ++count; }
    return count;
}

// Popcount for every mask up to 2^n, in one linear pass.
vector<int> popcountTable(int n) {
    vector<int> pc(1 << n, 0);
    for (int i = 1; i < (1 << n); ++i) pc[i] = pc[i >> 1] + (i & 1);
    return pc;
}

// XOR: self-inverse, so every value appearing twice cancels itself out.
int singleNumber(const vector<int>& nums) {
    int result = 0;
    for (int x : nums) result ^= x;
    return result;
}

// Two singles. XOR everything gives a ^ b, which is non-zero, so some
// bit differs. Split on it and each half contains exactly one single.
pair<int,int> twoSingleNumbers(const vector<int>& nums) {
    long long both = 0;
    for (int x : nums) both ^= x;

    long long bit = both & -both;             // any differing bit
    int a = 0, b = 0;
    for (int x : nums) {
        if (x & bit) a ^= x;
        else         b ^= x;
    }
    return {a, b};
}

// Every value appears THREE times except one. XOR cancels in pairs, not
// triples, so count set bits per position modulo 3 instead.
int singleNumberTriples(const vector<int>& nums) {
    int result = 0;
    for (int bit = 0; bit < 32; ++bit) {
        int count = 0;
        for (int x : nums) count += (x >> bit) & 1;
        if (count % 3) result |= (1 << bit);
    }
    return result;
}

// Power of two: exactly one set bit, so clearing the lowest leaves zero.
bool isPowerOfTwo(long long x) { return x > 0 && (x & (x - 1)) == 0; }

// MASKS AS SETS. 26 letters fit in one 32-bit integer.
int wordMask(const string& s) {
    int mask = 0;
    for (char c : s) mask |= 1 << (c - 'a');
    return mask;
}

// Two words share no letters iff their masks AND to zero - O(1) per pair
// instead of comparing character sets.
int maxProductNoSharedLetters(const vector<string>& words) {
    vector<int> masks;
    for (const auto& w : words) masks.push_back(wordMask(w));

    int best = 0;
    for (size_t i = 0; i < words.size(); ++i)
        for (size_t j = i + 1; j < words.size(); ++j)
            if ((masks[i] & masks[j]) == 0)
                best = max(best, (int)(words[i].size() * words[j].size()));
    return best;
}

// Every subset of a mask, each visited exactly once.
// Summed over all masks this is O(3^n), not O(4^n).
void forEachSubmask(int mask, const function<void(int)>& visit) {
    for (int sub = mask; sub; sub = (sub - 1) & mask) visit(sub);
    visit(0);                                 // the loop stops before zero
}

// Addition without '+': XOR is the sum without carries, AND<<1 is the
// carries. Repeat until nothing carries.
int add(int a, int b) {
    while (b) {
        unsigned carry = (unsigned)(a & b) << 1;
        a = a ^ b;
        b = (int)carry;
    }
    return a;
}`,
  },
};
