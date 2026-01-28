var countNumbersWithUniqueDigits = function(n) {
    if (n === 0) return 1;
    let count = 10; // for n = 1
    let uniqueDigits = 9;
    let availableNumber = 9;

    for (let i = 2; i <= n && i <= 10; i++) {
        uniqueDigits *= availableNumber;
        count += uniqueDigits;
        availableNumber--;
    }

    return count;
};

/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function (n) {
  let count = 0;
  let dp = new Array(n + 1).fill(-1);
  dp[0] = 1
  dp[1] = 9
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] * (11 - i) // Intution: 9 * 9 * 8 * 7 ...
  }

  for (let i = 0; i <= n; i++) {
    count += dp[i]
  }

  console.log(count, dp)

  return count;
};