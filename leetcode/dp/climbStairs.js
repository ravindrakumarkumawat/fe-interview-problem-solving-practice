/**
 * 70. Climbing Stairs
 * https://leetcode.com/problems/climbing-stairs/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {*} n 
 * @param {*} memo 
 * @returns 
 */

var climbStairs = function(n, memo = {}) {
    if (n <= 1) return 1
    if (memo[n]) return memo[n]

    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo)
    return memo[n]
};

// tc = O(n)
// sc = O(n) due to recursion stack and memoization object

var climbStairsIterative = function(n) {
  if (n <= 1) return 1

  const first = 1
  const second = 1

  for(let i = 2; i <= n; i++) {
    const current = first + second
    first = second
    second = current
  }

  return second
}

// TC = O(n)
// SC = O(1)