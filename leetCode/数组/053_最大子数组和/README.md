# 1. 题目
给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

**示例 1：**

```
输入： nums = [-2,1,-3,4,-1,2,1,-5,4]
输出： 6
解释： 连续子数组 [4,-1,2,1] 的和最大，为 6 。
```
**示例 2：**

```
输入： nums = [1]
输出： 1
```

**示例 3：**

```
输入： nums = [5,4,-1,7,8]
输出： 23
```

**提示：**

-   `1 <= nums.length <= 105`
-   `-104 <= nums[i] <= 104`

**进阶：** 如果你已经实现复杂度为 `O(n)` 的解法，尝试使用更为精妙的 **分治法** 求解。


# 2. 动态规划解

- 思路：定义一个变量`preSum`记录数组在**指针i之前的和**，`默认为0`。以及最大值maxSum默认等于`nums[0]`。

- 核心思想：若当前指针所指元素之前的和小于0（`preSum < 0`），则丢弃之前的和重新从i开始计算，因为后面的序列加上一个负数肯定不会比不加的时候大。
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
 // preSum记录i之前的和,maxSum记录最大值
  let preSum = 0, maxSum = nums[0];
  const length = nums.length
  for(let i = 0; i < length; i++) {
    // 当preSum小于0时，抛弃之前的和从新开始累加。
    //因为后面的序列加上一个负数肯定不会比不加的时候大，这里就是在寻求最优解
    if(preSum < 0) {
      preSum = nums[i] 
    } else {
      preSum += nums[i]
    }

    if( preSum >= maxSum) {
      maxSum = preSum
    }
  }
  return maxSum;
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89ac670b5931458a88259b6f66ff27b3~tplv-k3u1fbpfcp-watermark.image?)
- 复杂度分析：
    - 时间复杂度： O(n)
    - 空间复杂度： O(1)
    

`ps: 进阶的分治法不太会，之后懂了再来说吧~`