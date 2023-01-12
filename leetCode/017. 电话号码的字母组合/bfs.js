const letterCombinations = (digits) => {
  if (digits.length == 0) return [];
  const map = { 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz" };

  const queue = [];
  queue.push("");
  for (let i = 0; i < digits.length; i++) {
    // bfs的层数，即digits的长度
    const levelSize = queue.length; // 当前层的节点个数
    for (let j = 0; j < levelSize; j++) {
      // 逐个让当前层的节点出列
      const curStr = queue.shift(); // 出列

      const letters = map[digits[i]];

      for (const l of letters) {
        queue.push(curStr + l); // 生成新的字母串入列
      }
    }
  }
  return queue; // 队列中全是最后一层生成的字母串
};
