/**
 * 299. Bulls and Cows
 * https://leetcode.com/problems/bulls-and-cows/?envType=problem-list-v2&envId=hash-table
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    let bulls = 0
    let cows = 0
    let hash = Array(10).fill(0)

    for(let i = 0; i < secret.length; i++) {
        if(secret[i] === guess[i]) {
            bulls++
            continue;
        }

        if(hash[secret[i]] < 0) {
            cows++
        }

        if(hash[guess[i]] > 0) {
            cows++
        }

        hash[secret[i]]++
        hash[guess[i]]--
    }

    return `${bulls}A${cows}B`
};

var getHint = function(secret, guess) {
    let bulls = 0;
    let cows = 0;
    const secretCount = new Array(10).fill(0);
    const guessCount = new Array(10).fill(0);
    
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            bulls++;
        } else {
            secretCount[parseInt(secret[i])]++;
            guessCount[parseInt(guess[i])]++;
        }
    }
 
    for (let i = 0; i < 10; i++) {
        cows += Math.min(secretCount[i], guessCount[i]);
    }
    
    return `${bulls}A${cows}B`;
};