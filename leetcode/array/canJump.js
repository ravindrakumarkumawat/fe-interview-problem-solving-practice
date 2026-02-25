/**
 * 55. Jump Game
 * https://leetcode.com/problems/jump-game/
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
   let jump = 0

   for(let i = 0; i < nums.length; i++) {
       if(i > jump) return false

       jump = Math.max(jump, i + nums[i])

       if(jump >= nums.length-1) return true
   }

   return true
};

// Intuition: we can keep track of the maximum jump we can make at each index. 
// If at any point, the current index is greater than the maximum jump, it means we cannot reach that index 
// and we return false. If we can reach or exceed the last index, we return true.

// TC: O(n)
// SC: O(1)