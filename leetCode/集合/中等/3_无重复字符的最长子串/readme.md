# 1.题目

给定一个字符串 `s` ，请你找出其中不含有重复字符的  `最长子串`  的长度。

示例  1:

```
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

示例 3:

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

**提示：**

- 0 <= s.length <= 5 \* 104
- s  由英文字母、数字、符号和空格组成

# 2.解法一: 滑动窗口

思路：

- 用双指针维护一个滑动窗口，用来剪切子串
- 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位
- 过程中，记录所有窗口的长度，并返回最大值

```JAVASCRIPT
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let number = 0;
  let maxNumber = 0;
  const map = new Map();
  let l1 = 0,
    l2 = 0;
  while (l2 < s.length) {
    if (!map.has(s[l2])) {
      number++;
      map.set(s[l2], l2);
    } else {
      const index = map.get(s[l2]) - l1;
      if (index >= 0) {
        number = number - index;
        l1 += index + 1;
      } else if (index < 0) {
        number++;
      }
      map.set(s[l2], l2);
    }
    l2++
    maxNumber = Math.max(maxNumber, number);
  }
  return maxNumber;
};

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdad3f12e81c49d3b822953c7baf046c~tplv-k3u1fbpfcp-watermark.image?)

# 3.解法二：滑动窗口优化

```JAVASCRIPT
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let l = 0,
    res = 0;
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      l = Math.max(l, map.get(s[i]) + 1);
    }
    map.set(s[i], i);
    res = Math.max(res, i - l + 1);
  }
  return res;
};
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8b6a6ee206e4d09ad6a9a372e4e87b7~tplv-k3u1fbpfcp-watermark.image?)

复杂度分析：

- 时间复杂度：O(n)
- 空间复杂度：O(m) m 是字符串中不重复字符的个数
