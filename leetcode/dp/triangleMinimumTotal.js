/**
 * 120. Triangle
 * https://leetcode.com/problems/triangle/description/?envType=problem-list-v2&envId=dynamic-programming
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    const dp = triangle[triangle.length - 1].slice()

    for (let i = triangle.length - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1])
        }
    }

    return dp[0]
};

/**
 * Example usage:
 * const triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
 * console.log(minimumTotal(triangle)); // Output: 11
 */ 

// Example 1:

// Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// Output: 11
// Explanation: The triangle looks like:
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
// Example 2:

// Input: triangle = [[-10]]
// Output: -10
