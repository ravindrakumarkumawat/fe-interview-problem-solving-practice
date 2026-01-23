
/**
 * 337. House Robber III
 * https://leetcode.com/problems/house-robber-iii/description/?envType=problem-list-v2&envId=dynamic-programming
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
    const dfs = (node) => {
        if (!node) return [0, 0]

        const [leftRob, leftNotRob] = dfs(node.left)
        const [rightRob, rightNotRob] = dfs(node.right)

        const robThis = node.val + leftNotRob + rightNotRob
        const notRobThis = Math.max(leftRob, leftNotRob) + Math.max(rightRob, rightNotRob);

        return [robThis, notRobThis]
    }

    const [robRoot, notRobRoot] = dfs(root)

    return Math.max(robRoot, notRobRoot)
};