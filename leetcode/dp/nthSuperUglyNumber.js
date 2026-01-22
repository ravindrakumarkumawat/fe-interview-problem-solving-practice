/**
 * 313. Super Ugly Number
 * https://leetcode.com/problems/super-ugly-number/?envType=problem-list-v2&envId=dynamic-programming
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function(n, primes) {
    const dp = new Array(n).fill(0)
    dp[0] = 1
    const track = new Array(primes.length).fill(0)
    for(let i = 1; i < n; i++) {
        let next = Infinity

        for(let j = 0; j < primes.length; j++) {
            next = Math.min(next, dp[track[j]] * primes[j])
        }
        dp[i] = next

        for(let j = 0; j < primes.length; j++) {
            if(next === dp[track[j]] * primes[j]) {
                track[j]++
            }
        }
    } 

    return dp[n-1]
};

// TC: O(N * K) where K is the length of primes
// SC: O(N + K)