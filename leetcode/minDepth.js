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
 * @return {number}
 */
var minDepth = function(root) {
    function dfs(node) {
        if(node === null) return 0

        const left = dfs(node.left)
        const right = dfs(node.right)

        if(left === 0 || right === 0) {
            return Math.max(left, right) + 1
        }

        return Math.min(left, right) + 1
    }

    function bfs(node) {
        if(node === null) return 0

        const queue = [node]
        let depth = 1

        while(queue.length !== 0) {
            let size = queue.length

            for(let i = 0; i < size; i++) {
                const item = queue.shift()

                if(item.left === null && item.right === null) {
                    return depth
                }

                if(item.left) queue.push(item.left)
                if(item.right) queue.push(item.right)
            }

            depth++
        }

        return depth
    }

    // return dfs(root);
    return bfs(root)
};

// DFS TC: O(N)
// DFS SC: O(H) H is the height of the tree

// BFS TC: O(N)
// BFS SC: O(W) W is the maximum width of the tree


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
 * @return {number}
 */
var minDepth = function(root) {
  if (root == null) return 0;
  const queue =[root];
  let height = 1;
  while (queue.length > 0){
    const size = queue.length;
    for (let i =0; i < size ; i++){
      const node = queue.shift();
          
      if (node.left == null && node.right == null) return height;

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);  
    }
    height++;
  }
  return height;
};