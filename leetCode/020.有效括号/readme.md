# 1. 题目

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['，']'`  的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。



示例 1：

```
输入：s = "()"
输出：true
```

示例  2：

```
输入：s = "()[]{}"
输出：true
```

示例  3：

```
输入：s = "(]"
输出：false
```

示例  4：

```
输入：s = "([)]"
输出：false
```

示例  5：

```
输入：s = "{[]}"
输出：true
```



提示：

- 1 <= s.length <= 10<SUP>4<SUP>
- s 仅由括号 `'()[]{}'` 组成

# 2. 解法一： 栈

思路：新建一个栈，遇到左括号就入栈，遇到与之相同的就出栈直到最后判断栈是否为空

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const l = s.length;
  if (l % 2 === 1) return false;
  const stack = [];
  for (let i = 0; i < l; i++) {
    const c = s[i];
    if (["(", "[", "{"].includes(c)) {
      stack.push(s[i]);
    } else if (c === ")") {
      if (stack.pop() !== "(") return false;
    } else if (c === "]") {
      if (stack.pop() !== "[") return false;
    } else if (c === "}") {
      if (stack.pop() !== "{") return false;
    }
  }
  return stack.length === 0;
};
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b29ed2ca3064115bb59fb122739eaf6~tplv-k3u1fbpfcp-watermark.image?)
复杂度分析:

- 时间复杂度： O(n)
- 空间复杂度： O(n)

# 3. 解二： 使用 Map 更优雅

```javascript
var isValid = function (s) {
  const l = s.length;
  if (l % 2 === 1) return false;
  const stack = [];
  const map = new Map();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  for (let i = 0; i < l; i++) {
    if (map.has(s[i])) stack.push(s[i]);
    else if (!map.has(s[i]) && s[i] !== map.get(stack.pop())) return false;
  }
  return stack.length === 0;
};
```
