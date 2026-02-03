/**
 * 743. Network Delay Time
 * @see https://leetcode.com/problems/network-delay-time/
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    const graph = {};
    for (let i = 1; i <= n; i++) graph[i] = [];

    for (let [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    // Dijkstra's algorithm with priority queue (inefficient implementation)
    // const pq = [[k, 0]]

    // while(pq.length) {
    //     pq.sort((a, b) => a[1] - b[1])
    //     const [node, currDist] = pq.shift();

    //     if (currDist > dist[node]) continue;

    //     for (let [neighbor, weight] of graph[node]) {
    //         const newDist = currDist + weight;

    //         if (newDist < dist[neighbor]) {
    //             dist[neighbor] = newDist;
    //             pq.push([neighbor, newDist]);
    //         }
    //     }
    // }

    // Brute force Bellman-Ford algorithm
    for (let i = 1; i <= n - 1; i++) {
        for (let [u, v, w] of times) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }

    return maxTime;
};

// Brute force Bellman-Ford algorithm
// Time complexity: O(E * V)
// Space complexity: O(V)

// Dijkstra's algorithm with priority queue (inefficient implementation)
// Time complexity: O(E log E)
// Space complexity: O(V)

// Example usage:
// Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
// Output: 2