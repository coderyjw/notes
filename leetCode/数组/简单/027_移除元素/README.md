---
theme: channing-cyan
highlight: vs2015
---
# 1. 题目
给你一个数组 `nums` 和一个值 `val`，你需要 原地 移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用` O(1)` 额外空间并 原地 **修改输入数组**。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

- 说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**引用**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

- 示例1：
```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```
- 示例2：
```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```
- 提示：
-   `0 <= nums.length <= 100`
-   `0 <= nums[i] <= 50`
-   `0 <= val <= 100`

# 2. 解法
思路：这道题比较简单，**做个循环判断是相同的移除就好了**，要注意的是移除的时候不用`i++`,因为数组移去一位时，相当`i`已经自动++了。
```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let i = 0
  while(i < nums.length) {
    if(nums[i] === val) {
      nums.splice(i, 1)
    } else {
      i++
    }
  }
  return nums.length
};
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39c0b269b18c4f4aa1972afee9bfb404~tplv-k3u1fbpfcp-watermark.image?)
最后执行用时和内存消耗也是比较满意的(*^▽^*)
- 复杂度分析：
  - 时间复杂度： O(n),因为就一个循环,n代表数组的长度
  - 空间复杂度: O(1), 因为就创建了一个临时变量i