# 1. 题目

珠玑妙算游戏（the game of master mind）的玩法如下。

珠玑妙算游戏（the game of master mind）的玩法如下。

计算机有 4 个槽，每个槽放一个球，颜色可能是红色（R）、黄色（Y）、绿色（G）或蓝色（B）。例如，计算机可能有 RGGB 4 种（槽 1 为红色，槽 2、3 为绿色，槽 4 为蓝色）。作为用户，你试图猜出颜色组合。打个比方，你可能会猜 YRGB。要是猜对某个槽的颜色，则算一次“猜中”；要是只猜对颜色但槽位猜错了，则算一次“伪猜中”。注意，“猜中”不能算入“伪猜中”。

给定一种颜色组合 `solution` 和一个猜测 `guess` ，编写一个方法，返回猜中和伪猜中的次数`answer`，其中 `answer[0]` 为猜中的次数，`answer[1]` 为伪猜中的次数。

**示例：**

```
输入： solution="RGBY",guess="GGRR"
输出： [1,1]
解释： 猜中1次，伪猜中1次。
```

**提示：**

```
len(solution) = len(guess) = 4
solution和guess仅包含"R","G","B","Y"这4种字符
```

# 解：哈希法

明明那么简单，却又这么麻烦= =

因为题目就说只有四个槽，就不用考虑什么复杂度了，反正肯定会过的 👀
思路：用哈希表

1. 遍历一遍 solution 先求“猜中”了几次
2. 再求“伪猜中”了几次，用一个哈希数组存储伪猜中的字母对应的次数，与 solution 这个字母出现的次数相比，如果小了就+1
3. 因为题目要求伪猜中不包含猜中，所以减一下

```javascript
var masterMind = function (solution, guess) {
  const answer = [0, 0];
  const hash = {
    Y: 0,
    B: 0,
    G: 0,
    R: 0,
  };
  for (let i = 0; i < 4; i++) {
    const num = solution.split(guess[i]).length - 1;

    if (solution[i] === guess[i]) {
      answer[0]++;
    }
    if (num && hash[guess[i]] < num) {
      answer[1]++;
      hash[guess[i]]++;
    }
  }
  return [answer[0], answer[1] - answer[0]];
};
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e10e49fadadb4f3e8095699562cb3a4a~tplv-k3u1fbpfcp-watermark.image?)
复杂度分析：

- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`
