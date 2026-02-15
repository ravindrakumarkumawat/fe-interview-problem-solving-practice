/**
 * 395. Longest Substring with At Least K Repeating Characters
 * https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/description/?envType=problem-list-v2&envId=hash-table
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    const helper = (str) => {
        if (str.length === 0) return 0;
        const freq = {};
        for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;

        for (let i = 0; i < str.length; i++) {
            if (freq[str[i]] < k) {
                let left = helper(str.slice(0, i));
                let right = helper(str.slice(i + 1));
                return Math.max(left, right);
            }
        }
        
        return str.length;
    };

    return helper(s);
};