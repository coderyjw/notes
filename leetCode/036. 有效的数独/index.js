/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  for (let i = 0; i < 9; i++) {
    const arr1 = board[i];
    if (isOnly(arr1)) return false;

    const arr2 = [];
    for (let j = 0; j < 9; j++) {
      arr2.push(board[j][i]);
      if ((i + 1) % 3 === 0 && (j + 1) % 3 === 0) {
        const arr3 = [];
        for (let y = j - 2; y <= j; y++) {
          for (let x = i - 2; x <= i; x++) {
            arr3.push(board[x][y]);
          }
        }
        if (isOnly(arr3)) return false;
      }
    }
    if (isOnly(arr2)) return false;
  }
  return true;
};

const isOnly = function (nums) {
  const hash = new Array(10).fill(0);
  nums.forEach((n) => {
    if (n !== ".") {
      hash[n] += 1;
    }
  });
  const item = hash.find((v) => v > 1);
  return item;
};
