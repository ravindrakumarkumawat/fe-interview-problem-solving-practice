export default function depthFirstSearch(
  graph: Record<string, Array<string>>,
  source: string,
): Array<string> {
  if (Object.keys(graph).length === 0) {
    return [];
  }

  const toBeVisited: Array<string> = [];
  toBeVisited.push(source);

  const visited = new Set<string>();

  while (toBeVisited.length !== 0) {
    const node = toBeVisited.pop()!;
    visited.add(node);

    const neighbors = graph[node];

    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];

      if (!visited.has(neighbor)) {
        toBeVisited.push(neighbor);
      }
    }
  }

  return Array.from(visited);
}
