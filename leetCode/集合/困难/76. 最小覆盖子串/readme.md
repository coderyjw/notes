# 1. 题目

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

**注意：**

```
对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。
```



**示例 1：**

```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```

**示例 2：**

```
输入：s = "a", t = "a"
输出："a"
```

**示例 3:**

```
输入: s = "a", t = "aa"
输出: ""

解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
```



**提示：**

- 1 <= s.length, t.length <= 10<sup>5</sup>
- s 和 t 由英文字母组成

# 2. 解: 滑动窗口

思路：

- 用双指针维护一个滑动窗口
- 移动右指针，找到包含 T 的子串，移动左指针，尽量减少包含 T 的子串长度
  思路，判断 l->r 是否覆盖子串，不覆盖右指针不断友移(r++)，当覆盖子串时，右指针保持不动，左指针右移(l++)寻找最小子串

```JAVASCRIPT
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    // 定义两个左右指针l和r
  let l = 0, r = 0;
  // res 为最终返回的最小子串
  let res = "";
  // 定义一个map字典t来表示需要的字符以及个数
  const need = new Map();
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }

  // 判断需要的字符类型数
  let needType = need.size;
  // while外层循环遍历右指针寻找覆盖子串，内层循环遍历左指针寻找最小的子串
  while (r < s.length) {
    const c = s[r];
    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) needType -= 1;
    }

    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      console.log(newRes);
      if (!res) res = newRes;
      if (newRes.length < res.length) res = newRes;
      const c2 = s[l];
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) needType += 1;
      }
      l++;
    }
    r++;
  }

  return res;
};

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d65f18e18f244460af4cd80c4fb098b9~tplv-k3u1fbpfcp-watermark.image?)

**复杂度分析：**

- 时间复杂度: O(m + n) m 为 s 的长度,n 为 t 的长度
- 空间复杂度: O(n)

`
