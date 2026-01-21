
/**
 * 264. Ugly Number II
 * https://leetcode.com/problems/ugly-number-ii/description/?envType=problem-list-v2&envId=dynamic-programming
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    const dp = new Array(n).fill(0)
    dp[0] = 1

    let i2 = 0, i3 = 0, i5 = 0
    
    for(let i = 1; i < n; i++) {
        const next2 = dp[i2] * 2
        const next3 = dp[i3] * 3
        const next5 = dp[i5] * 5

        const next = Math.min(next2, next3, next5)

        dp[i] = next

        if(next === next2) i2++
        if(next === next3) i3++
        if(next === next5) i5++
    }

    return dp[n-1]
};
// DP TC: O(N)
// DP SC: O(N)

// Brute Force
var nthUglyNumber = function (n) {
  const result = [];
  let count = 1;

  while (result.length < n) {
    let val = count;

    while (val % 2 === 0) val /= 2;
    while (val % 3 === 0) val /= 3;
    while (val % 5 === 0) val /= 5;

    if (val === 1) result.push(count);

    count++;
  }

  return result[result.length - 1];
};
// TC: O(N log N)
// SC: O(1)

// Brute Force with Min-Heap

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
  const heap = new MinHeap();
  const seen = new Set();

  heap.push(1);
  seen.add(1);

  let curr = 1;
  const factors = [2, 3, 5];

  for (let i = 0; i < n; i++) {
    curr = heap.pop();

    for (const f of factors) {
      const next = curr * f;
      if (!seen.has(next)) {
        seen.add(next);
        heap.push(next);
      }
    }
  }

  return curr;
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);

    return top;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  _bubbleDown(idx) {
    const n = this.heap.length;

    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}
