/**
 * 442. Find All Duplicates in an Array
 * https://leetcode.com/problems/find-all-duplicates-in-an-array/description/?envType=problem-list-v2&envId=hash-table
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    const obj = new Map()
    const result = new Set()
    for(let i = 0; i < nums.length; i++) {
        if(obj.has(nums[i])) {
            result.add(nums[i])
        } else {
            obj.set(nums[i])
        }
    }

    return Array.from(result)
};

// TC: O(n)
// SC: O(n)

// Approch: Optimize one

function findDuplicates(nums) {
    const result = new Set()
    for(let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1
        if(nums[index] < 0) {
            result.add(Math.abs(nums[i]))
        } else {
            nums[index] = -nums[index]
        }
    }

    return Array.from(result)
}

// TC: O(n)
// SC: O(1)
