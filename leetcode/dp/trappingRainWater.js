/**
 * 42. Trapping Rain Water
 * https://leetcode.com/problems/trapping-rain-water/description/?envType=problem-list-v2&envId=dynamic-programming
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0
    let right = height.length - 1
    let leftMax = height[left]
    let rightMax = height[right]
    let water = 0

    while(left < right) {
        if(leftMax < rightMax) {
            left++
            leftMax = Math.max(leftMax, height[left])
            water += leftMax - height[left]
        } else {
            right--
            rightMax = Math.max(rightMax, height[right])
            water += rightMax - height[right]
        }
    }

    return water
};