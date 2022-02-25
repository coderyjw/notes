## 1. 题目
给定一个整数数组 `nums `和一个整数目标值 `target`，请你在该数组中找出**和为目标**值`target`的那 **两个**整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

- 示例1：

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 
```

- 示例2：

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

- 示例3：

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

**提示：**

- 2 <= nums.length <= 10<sup>4</sup>
- -10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>
- -10<sup>9</sup> <= target <= 10<sup>9</sup>
- **只会存在一个有效答案**

**进阶：**你可以想出一个时间复杂度小于 `O(n2)` 的算法吗？

# 2. 暴力法一把梭哈
直接两个循环查
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    for(let l = i + 1; l < nums.length; l++) {
      if(nums[i] + nums[l] === target) {
        return [i, l]
      }
    }
  }
};
```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57a0dc06c7f544d6be8826fe2ac94cf4~tplv-k3u1fbpfcp-watermark.image?)

## 3. 暴力法优化
思路：每次在外层循环判断是否有判断过相同的数
```javascript
var twoSum = function(nums, target) {
  const record = []
  for(let i = 0; i < nums.length; i++) {
    if(record[nums[i]]) {
      continue
    }
    for(let l = i + 1; l < nums.length; l++) {
      if(nums[i] + nums[l] === target) {
        return [i, l]
      }
    }
    record[nums[i]] = true
  }
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/222b3033b8f643c8bea0c53bd78e4b90~tplv-k3u1fbpfcp-watermark.image?)
因为时间复杂度还是O(n<sup>2</sup>),所以可以看到优化不大
# 4. 哈希表解法
优化思路:**空间换时间**
暴力解法中，第二层循环的目的是找到和 i 匹配的元素，由于数组不是有序的，我们不得不一个个遍历。而借助哈希表，我们就可以把该过程缩减为** O(1) 复杂度**.
```javascript
const twoSum = function(nums, target) {
  const length = nums.length
  const map = new Map()

  for(let i = 0; i < length; i++) {
    const needNum = target - nums[i]
    if(map.has(needNum)) {
      return [map.get(needNum), i]
    }
    map.set(nums[i], i)
  }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6402b38f590447b6917e7444fbc995f2~tplv-k3u1fbpfcp-watermark.image?)