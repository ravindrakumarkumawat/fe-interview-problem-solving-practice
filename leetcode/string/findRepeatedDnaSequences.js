/**
 * 187. Repeated DNA Sequences
 * https://leetcode.com/problems/repeated-dna-sequences/
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function(s) {
    const seen = new Set();
    const repeated = new Set();
    const subLen = 10;

    for (let i = 0; i <= s.length - subLen; i++) {
        const sub = s.substring(i, i + subLen);

        if (seen.has(sub)) {
            repeated.add(sub);
        } else {
            seen.add(sub);
        }
    }

    return Array.from(repeated);
};