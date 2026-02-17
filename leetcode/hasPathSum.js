
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPaths = function (root, sum, tar) {
    if(root == null) {
        return false
    } 
    sum = sum + root.val
    if(root.left == null && root.right == null) {
        return sum === tar
    }
    return hasPaths(root.left, sum, tar) || hasPaths(root.right, sum, tar)
}

var hasPathSum = function(root, targetSum) {
    return hasPaths(root, 0, targetSum)
};