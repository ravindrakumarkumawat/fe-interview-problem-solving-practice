/**
 * 88. Merge Sorted Array
 * https://leetcode.com/problems/merge-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n 
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function(nums1, m, nums2, n) {
    let index1 = m - 1
    let index2 = n - 1

    let mergeIndex = m + n -1

    while(index2 >= 0) {
        if(nums1[index1] > nums2[index2]) {
            nums1[mergeIndex] = nums1[index1]
            index1--
        } else {
            nums1[mergeIndex] = nums2[index2]
            index2--
        }
        mergeIndex--
    }
};

// Time complexity: O(m + n) - We traverse both arrays once
// Space complexity: O(1) - We are merging in place without using extra space