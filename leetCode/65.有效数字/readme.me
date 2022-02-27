# 1.题目
**有效数字**（按顺序）可以分成以下几个部分：

一个 **小数** 或者 **整数**
（可选）一个 'e' 或 'E' ，后面跟着一个 整数

**小数**（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（'+' 或 '-'）
2. 下述格式之一：
    1. 至少一位数字，后面跟着一个点 '.'
    2. 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
    3. 一个点 '.' ，后面跟着至少一位数字

**整数**（按顺序）可以分成以下几个部分：
1. （可选）一个符号字符（'+' 或 '-'）
2. 至少一位数字
部分有效数字列举如下：`["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]`

部分无效数字列举如下：`["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]`

给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。

**示例 1：**
```
输入：s = "0"
输出：true
```

示例 2：
```
输入：s = "e"
输出：false
```

**示例 3：**
```
输入：s = "."
输出：false
```

**提示：**
- <= s.length <= 20
- 仅含英文字母（大写和小写），数字（0-9），加号 '+' ，减号 '-' ，或者点 '.' 。

# 解
思路： 可以用一张图来表示

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bdf10cc8a18449cba106849dabb54d7~tplv-k3u1fbpfcp-watermark.image?)
八个节点分别代表了字符串中的八种状态，而种状态中只有3,5,6是符合有效数字的。
有了这个图就可以非常方便的判断一个字符串是否是有效数字了。
```JAVASCRIPT
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
  const graph = {
    0: { blank: 0, sign: 1, ".": 2, dight: 6 },
    1: { dight: 6, ".": 2 },
    2: { dight: 3 },
    3: { dight: 3, e: 4 },
    4: { dight: 5, sign: 7 },
    5: { dight: 5 },
    6: { dight: 6, ".": 3, e: 4 },
    7: { dight: 5 },
  };

  let state = 0;
  for (let c of s.trim()) {
    if (c >= "0" && c <= "9") {
      c = "dight";
    } else if (c == "+" || c == "-") {
      c = "sign";
    } else if (c == " ") {
      c = "blank";
    } else if (c == "e" || c == "E") {
      c = "e";
    }
    state = graph[state][c];
    if (state === undefined) return false;
  }
  if ([3, 5, 6].includes(state)) return true;
  else return false;
};

```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12d181cf45544cfe8b68479b4f9ccbe9~tplv-k3u1fbpfcp-watermark.image?)

复杂度分析：
- 时间复杂度：O(n), n是字符串的长度
- 空间复杂度：O(1)
