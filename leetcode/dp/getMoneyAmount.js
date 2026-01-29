/**
 * 375. Guess Number Higher or Lower II
 * https://leetcode.com/problems/guess-number-higher-or-lower-ii/description/?envType=problem-list-v2&envId=dynamic-programming
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function(n) {
    const dp = Array.from({ length: n + 1}, () => new Array(n + 1).fill(0));

    const calculateCost = (start, end) => {
        if (start >= end) {
            return 0;
        }
        if (dp[start][end] !== 0) {
            return dp[start][end];
        }

        let minCost = Infinity;
        for (let pivot = Math.floor((start + end) / 2); pivot <= end; pivot++) {
            const cost = pivot + Math.max(calculateCost(start, pivot - 1), calculateCost(pivot + 1, end));
            minCost = Math.min(minCost, cost);
        }
        dp[start][end] = minCost;
        return minCost;
    }
    return calculateCost(0, n);
};