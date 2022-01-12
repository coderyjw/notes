# 1. 题目

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1:**

```
输入: [2,2,1]
输出: 1
```

**示例  2:**

```
输入: [4,1,2,1,2]
输出: 4
```

# 1. 解一：排序 再遍历一次

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  nums.sort((pre, next) => pre - next);
  const len = nums.length;
  if (nums[0] !== nums[1]) {
    return nums[0];
  }
  if (nums[len - 2] !== nums[len - 1]) {
    return nums[len - 1];
  }
  for (let i = 1; i < len - 2; i++) {
    if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) {
      return nums[i];
    }
  }
};
```

**复杂度分析**

- 时间复杂度：O(nlogn) 排序算法复杂度按照快排算
- 空间复杂度：O(1)。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8077288b0ff4f1c9a484a6f2d5f89c3~tplv-k3u1fbpfcp-watermark.image?)

# 2. 解二： 按位异或

解法二特别巧妙，我也是看了答案后才感叹的,直接用按位异或运算符，**因为两个相同的数按位异或是 0**，
那么在数组中每个数都按位异或一下，最后剩下的数字就是只出现一次的数字

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let result = 0;
  nums.forEach((num) => {
    result ^= num;
  });
  return result;
};
```

**复杂度分析**

- 时间复杂度：O(n)
- 空间复杂度：O(1)。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b1922c20ff8410f9d3f11ed17e07307~tplv-k3u1fbpfcp-watermark.image?)
