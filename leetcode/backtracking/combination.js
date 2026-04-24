// Example 1:
const candidates = [10,1,2,7,6,1,5]
const target = 8
// Output: [[1,1,6],[1,2,5],[1,7],[2,6]]


// Example 2:
// Input: candidates = [2,5,2,1,2], target = 5
// Output: [[1,2,2],[5]]


function Solve(candidates, target) {
  let result = []
  
  function combination(currentIndex, currentResult, currentSum) {
    if(currentSum === target) {
      result.push([...currentResult])
      return
    }
    if (currentSum > target) return;
    
    // const element = candidates[currentIndex]
    // if(currentSum + element > target) {
    //   combination(currentIndex++, currentResult, currentSum)
    // } else {
    //   const newCurrentResult = [...currentResult, element]
    //   const newCurrentSum = currentSum + element
    //   combination(currentIndex++, newCurrentResult, newCurrentSum)
    // }
    
    for (let i = currentIndex; i < candidates.length; i++) {
      if (i > currentIndex && candidates[i] === candidates[i - 1]) continue;

      // choose
      currentResult.push(candidates[i]);

      // move to next index (each element used once)
      combination(i + 1, currentResult, currentSum + candidates[i]);

      // backtrack
      currentResult.pop();
    }
  }
  combination(0, [], 0)
  
  return result
}

const output = Solve(candidates, target)
console.log('output', output)
