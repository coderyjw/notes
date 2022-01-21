/**
 * @param {string} solution
 * @param {string} guess
 * @return {countber[]}
 */
 var masterMind = function(solution, guess) {
  const answer = [0,0]
  const hash = {
    Y: 0,
    B: 0,
    G: 0,
    R: 0
  }
  const sArr = solution.split('')
  for(let i = 0; i < 4; i++) {
    const count = sArr.filter(v => v === guess[i]).length
    
    if(solution[i] === guess[i]) {
      answer[0]++
      hash[guess[i]]
    } 
    if(count && hash[guess[i]] < count) {
      answer[1]++
      hash[guess[i]]++
    }
  }
  return [answer[0], answer[1] - answer[0]]
};