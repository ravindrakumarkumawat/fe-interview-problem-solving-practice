/**
 * @param {Record<string, Array<string>} graph The adjacency list representing the graph.
 * @param {string} source The source node to start traversal from. It has to exist as a node in the graph.
 * @return {Array<string>} A DFS-traversed order of nodes.
 */
export default function depthFirstSearch(graph, source) {
  if(Object.keys(graph).length === 0) return []

  const visited = new Set()

  function traverse(node) {
    if(visited.has(node)) return

    visited.add(node)

    graph[node].forEach(traverse)
  }

  traverse(source)
  return Array.from(visited)
}

const graph1 = {
  A: ['B', 'C', 'D'],
  B: ['E', 'F'],
  C: ['G', 'H'],
  D: ['I', 'J'],
  E: ['D'],
  F: [],
  G: [],
  H: [],
  I: [],
  J: [],
};
depthFirstSearch(graph1, 'A'); // ['A', 'B', 'E', 'D', 'I', 'J', 'F', 'C', 'G', 'H']
depthFirstSearch(graph1, 'B'); // ['B', 'E', 'D', 'I', 'J', 'F']

const graph2 = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F', 'G'],
  D: [],
  E: [],
  F: [],
  G: [],
};
depthFirstSearch(graph2, 'A'); // ['A', 'B', 'D', 'E', 'C', 'F', 'G']
depthFirstSearch(graph2, 'E'); // ['E']


/**
 * @param {Record<string, Array<string>} graph The adjacency list representing the graph.
 * @param {string} source The source node to start traversal from. Has to be a valid node if graph is non-empty.
 * @return {string[]} A DFS-traversed order of nodes.
 */
export default function depthFirstSearch1(graph, source) {
  // If there are no nodes in the graph, just return an empty array
  if (Object.keys(graph).length === 0) {
    return [];
  }

  // Create an stack to store the nodes to be visited. We can simulate
  // stacks using arrays in JavaScript.
  // Add the root node since we're doing a pre-order DFS.
  const toBeVisited = [];
  toBeVisited.push(source);

  // Initialize a set that tracks visited nodes.
  const visited = new Set();

  // Loop as long as array is empty (i.e. there are still nodes to be visited).
  while (toBeVisited.length !== 0) {
    // Pop top node from array (toBeVisited) and add it to the set (visited).
    const node = toBeVisited.pop();
    visited.add(node);

    // Retrieve neighbors (values of the adjacency list input Object)
    const neighbors = graph[node];
    // Push neighbors, in reverse order, onto array to be visited
    // to preserve original order of neighbors when visiting (popping off the array).
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      // First check if the neighbor has already been visited before adding it.
      if (!visited.has(neighbor)) {
        toBeVisited.push(neighbor);
      }
    }
  }

  // The visited nodes is the traversal order.
  return Array.from(visited);
}
