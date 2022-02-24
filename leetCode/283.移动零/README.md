---
theme: github
---

# 1. 题目

给定一个数组  `nums`，编写一个函数将所有  `0`  移动到数组的末尾，同时保持非零元素的相对顺序。

**示例:**

```
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**说明**:

1.  必须在原数组上操作，不能拷贝额外的数组。
2.  尽量减少操作次数。

# 2. 解一

思路：直接循环判断是否为 0，如果是直接删除，最后再数组最后面补足删除了几个 0

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let num = 0,
    i = 0;
  while (i < nums.length) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      num++;
    } else {
      i++;
    }
  }
  nums.splice(nums.length, 0, ...new Array(num).fill(0));
  return nums;
};
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/808039a5706d40ddae4ca00e80707194~tplv-k3u1fbpfcp-watermark.image?)

**复杂度分析**

- 时间复杂度： O(n)
- 空间复杂度： O(1)

# 3. 解二

思路： 与上面的不同就是新增了数组 arr 用来记录删除 0 后的状态，只进行一次删除操作

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let num = 0;
  const arr = nums.filter((v) => {
    if (v === 0) num++;
    return v !== 0;
  });
  nums.splice(0, nums.length, ...[...arr, ...new Array(num).fill(0)]);
  return nums;
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d31184c63cbf4e5bae61becdec0562d9~tplv-k3u1fbpfcp-watermark.image?)
**复杂度分析**

- 时间复杂度： O(n)
- 空间复杂度： O(n)

# 4. 解三：双指针

思路： 前面的方法都是想的怎么覆盖，与题目想要让你移动 0 的意思不太一样。
使用双指针，定义左右两个指针。右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移。

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const len = nums.length;
  let left = 0,
    right = 0;
  while (right < len) {
    if (nums[right]) {
      const temp = nums[right];
      nums[right] = nums[left];
      nums[left] = temp;
      left++;
    }
    right++;
  }
  return nums;
};
```

**复杂度分析**

- 时间复杂度： O(n)
- 空间复杂度： O(1)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/517994fe469e4e638413e0e50c67102f~tplv-k3u1fbpfcp-watermark.image?)
