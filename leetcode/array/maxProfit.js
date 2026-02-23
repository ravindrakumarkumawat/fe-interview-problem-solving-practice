/**
 * 121. Best Time to Buy and Sell Stock
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
	let left = 0
	let right = 1
	let maxP = 0

	while(right < prices.length) {
		if(prices[left] < prices[right]) {
			maxP = Math.max(prices[right] - prices[left], maxP)
        } else left = right
        right++
    }

    return maxP
}