# 1. 题目

给定一个无重复元素的有序整数数组 `nums` 。

返回 **恰好覆盖数组中所有数字** 的 **最小有序** 区间范围列表。也就是说，`nums` 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 `nums` 的数字 `x` 。

列表中的每个区间范围 `[a,b] `应该按如下格式输出：

- `"a->b"` ，如果` a != b`
- `"a"` ，如果 `a == b`

**示例 1：**

```
输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]
解释：区间范围是：
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

**示例 2：**

```
输入：nums = [0,2,3,4,6,8,9]
输出：["0","2->4","6","8->9"]
解释：区间范围是：
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

**示例 3：**

```
输入：nums = []
输出：[]
```

**示例 4：**

```
输入：nums = [-1]
输出：["-1"]
```

**示例 5：**

```
输入：nums = [0]
输出：["0"]
```

# 2. 解

很简单就用双指针判断什么时候插入一个数什么时候插入两个数。

```javascript
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const len = nums.length;
  const arr = [];
  if (len === 1) {
    return [`${nums[0]}`];
  }
  for (let j = 1, i = 0; j < len; j++) {
    const diff = nums[j] - nums[j - 1];
    if (diff === 1 && j === len - 1) {
      arr.push(`${nums[i]}->${nums[j]}`);
    }
    if (diff > 1) {
      const value = j - i > 1 ? `${nums[i]}->${nums[j - 1]}` : `${nums[i]}`;
      arr.push(value);
      i = j;
      if (j === len - 1) {
        arr.push(`${nums[j]}`);
      }
    }
  }
  return arr;
};
```

**复杂度分析**

- 时间复杂度：O(n)
- 空间复杂度：O(1)
  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02ca0b3db62f45f78717b6d87bbcc731~tplv-k3u1fbpfcp-watermark.image?)
