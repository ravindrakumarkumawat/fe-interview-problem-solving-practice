/**
 * 909. Snakes and Ladders
 * https://leetcode.com/problems/snakes-and-ladders/description/?envType=study-plan-v2&envId=top-interview-150
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
    const n = board.length;
    
    const getCoord = (num) => {
        const r = Math.floor((num - 1) / n);
        const c = (r % 2 === 0) 
            ? (num - 1) % n 
            : n - 1 - (num - 1) % n;
        return [n - 1 - r, c];
    };

    let visited = Array(n * n + 1).fill(false);
    let queue = [[1, 0]];
    visited[1] = true;

    while (queue.length > 0) {
        const [curr, moves] = queue.shift();
        if (curr === n * n) return moves;

        for (let i = 1; i <= 6; i++) {
            let next = curr + i;
            if (next > n * n) break;
            const [r, c] = getCoord(next);
            if (board[r][c] !== -1) next = board[r][c];
            if (!visited[next]) {
                visited[next] = true;
                queue.push([next, moves + 1]);
            }
        }
    }

    return -1;
};

// Time complexity: O(n^2) - Each cell is processed at most once
// Space complexity: O(n^2) - The visited array and queue can grow up to n^2 in size