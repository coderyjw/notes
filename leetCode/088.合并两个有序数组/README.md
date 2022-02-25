# 1. 题目

给你两个按 非递减顺序 排列的整数数组  nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

- 示例 1：

```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
```

- 示例 2：

```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
```

- 示例 3：

```
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

# 2.解法一：直接合并后排序

```javascript
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
};
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/441265e57d704c729896aa123dc4129f~tplv-k3u1fbpfcp-watermark.image?)

- 复杂度分析：
  - 时间复杂度：**不同浏览器对 sort 的实现不同，这里按快速排序算，平均情况为`O((m+n)log(m+n))`**
  - 空间复杂度：**`log(m + n)`**

# 3.解法二：双指针法

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let result = [];
  let nums1Index = (nums2Index = 0);

  while (nums1Index < m && nums2Index < n) {
    if (nums1[nums1Index] <= nums2[nums2Index]) {
      result[nums1Index + nums2Index] = nums1[nums1Index++];
    } else {
      result[nums1Index + nums2Index] = nums2[nums2Index++];
    }
  }

  while (nums1Index < m) {
    result[nums1Index + nums2Index] = nums1[nums1Index++];
  }

  while (nums2Index < n) {
    result[nums1Index + nums2Index] = nums2[nums2Index++];
  }

  const length = result.length;
  for (let i = 0; i < length; i++) {
    nums1[i] = result[i];
  }
};
```

- 复杂度分析：

  - 时间复杂度：** `O(m+n)`** **因为最多只用遍历一边 num1 和 num2 两个数组**

  - 空间复杂度：**`O(m+n)`** **需要建立长度为  m+n 的中间数组**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3f294232dd34d13a166c35b001b7021~tplv-k3u1fbpfcp-watermark.image?)

# 4.解法三：双指针优化（逆向双指针）

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let nums1Index = m - 1;
  let nums2Index = n - 1;
  while (nums1Index >= 0 && nums2Index >= 0) {
    if (nums1[nums1Index] >= nums2[nums2Index]) {
      nums1[nums1Index + nums2Index + 1] = nums1[nums1Index--];
    } else {
      nums1[nums1Index + nums2Index + 1] = nums2[nums2Index--];
    }
  }

  while (nums2Index >= 0) {
    nums1[nums2Index] = nums2[nums2Index--];
  }
};
```

- 复杂度分析： - 时间复杂度： **`O(m+n)`** **因为最多只用遍历一边 num1 和 num2 两个数组**
      - 空间复杂度：**`O(1)`** **直接对数组 `nums1` 原地修改，不需要额外空间。**
  ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af97b510e0b440f99ad69f3a39ebbd9f~tplv-k3u1fbpfcp-watermark.image?)

# 5.总结

`从结果看上去好像解法一更快，但还是要从复杂度分析上来看`

- 解法一： **时间复杂度`O((m+n)log(m+n))` 空间复杂度`log(m + n)`**
- 解法二： **时间复杂度`O(m+n)` 空间复杂度`O(m+n)`**
- 解法三： **时间复杂度`O(m+n)` 空间复杂度`O(1)`**
  **因此解法三更优**

`ps：但是平时在开发中数据量不太会影响效率的时候，我会用第一种，因为实在太简洁了😁`
