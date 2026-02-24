/**
 * 122. Best Time to Buy and Sell Stock II
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=study-plan-v2&envId=top-interview-150
 * greedy approach
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let profit = 0
    for(let i = 1; i < prices.length; i++) {
        if(prices[i] > prices[i-1]) {
            profit += prices[i] - prices[i-1]
        }
    }

    return profit
};

// tc: O(n)
// sc: O(1)