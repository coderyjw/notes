# 1. 题目

给定一个整数数组 `nums`，求出数组从索引 `i` 到 `j（i ≤ j）` 范围内元素的总和，包含 `i、j` 两点。

实现 `NumArray` 类：

- `NumArray(int[] nums)` 使用数组 nums 初始化对象
- `int sumRange(int i, int j)` 返回数组 nums 从索引 `i` 到 `j（i ≤ j）` 范围内元素的总和，包含 `i`、`j` 两点（也就是 `sum(nums[i], nums[i + 1], ... , nums[j])`）
 

**示例：**

```
输入：
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
[null, 1, -1, -3]

解释：
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
```
 

**提示：**

- 0 <= nums.length <= 10<sup>4</sup>
- -10<sup>5</sup> <= nums[i] <= 10<sup>5</sup>
- 0 <= i <= j < nums.length
- 最多调用 10<sup>4</sup> 次 sumRange 方法

# 2. 解
这道题看上去有点唬人，但其实很简单，就是想求一个数组中第i个位置到第j个位置的和。
当然最朴素的方法就是循环一遍数组求出前i个数的和再循环一遍求出前j个数的和，在相减一下。

当然我们其实可以瞬间想到更好的办法，如果我们在数组初始化的时候，存入数组的不是当前数字，而是前面的和，那么在计算差的时候就可以直接相减了
```javascript
/**
 * @param {number[]} nums
 */
 var NumArray = function(nums) {
  const len = nums.length
  this.nums = new Array(len).fill(0)
  for(let i = 0; i< len; i++) {
      this.nums[i + 1] = this.nums[i] + nums[i]
  }
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.nums[right + 1] - this.nums[left]
};
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79ce4459c16949a6a8ab66b1d2012262~tplv-k3u1fbpfcp-watermark.image?)

**复杂度分析**
- 时间复杂度：初始化 O(n)，每次检索 O(1)
- 空间复杂度： O(n)