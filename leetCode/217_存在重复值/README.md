# 1. 题目

给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回  `true` 。如果数组中每个元素都不相同，则返回  `false` 。

示例 1:

```
输入: [1,2,3,1]
输出: true
```

- 示例 2:

```
输入: [1,2,3,4]
输出: false
```

- 示例  3:

```
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```

# 3. 解

1. 思路一：可以先排序，然后判断有无两个相邻的数相等
2. 思路二：利用 Set 函数建立哈希表，用 has()判断是否重复，不重复就 add()
3. 思路三：利用 Set 判断去重后的数组与原数组长度是否相等
   `这里直接展示思路三`

```
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  return new Set(nums).size != nums.length
};
```

**复杂度分析**

- 时间复杂度：O(1)
- 空间复杂度: O(n)
  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9ceccc10ee7475f9c2aa8736f8e8a25~tplv-k3u1fbpfcp-watermark.image?)
