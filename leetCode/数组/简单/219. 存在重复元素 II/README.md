# 1. 题目

给定一个整数数组和一个整数  k，判断数组中是否存在两个不同的索引  i  和  j，使得  nums [i] = nums [j]，并且 i 和 j  的差的 绝对值 至多为 k。

**示例  1:**

```
输入: nums = [1,2,3,1], k = 3
输出: true
```

**示例 2:**

```
输入: nums = [1,0,1,1], k = 1
输出: true
```

**示例 3:**

```
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
```

# 2. 解一

和[# 217. 存在重复元素](https://juejin.cn/post/7052877592365367310)差不多，维护一个哈希表,只不过这次存储的是下标，当遇到相同值是判断两个下标差是否小于 k

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const hashArr = [];
  for (let i in nums) {
    if (hashArr[nums[i]] === undefined) {
      hashArr[nums[i]] = i;
    } else {
      if (i - hashArr[nums[i]] <= k) {
        return true;
      } else {
        hashArr[nums[i]] = i;
      }
    }
  }
  return false;
};
```

**复杂度分析**

- 时间复杂度：O(n)
- 空间复杂度：O(n)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3dae8282c79422a926cbd3ff2146936~tplv-k3u1fbpfcp-watermark.image?)

# 3. 优化

数组改用 Set
每次往 Set 中 Push 一个新值，Set 的长度始终维持在小于 k，如果新的值有在 Set 中，则直接返回

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const set = new Set();
  for (let i in nums) {
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
    if (set.size > k) {
      set.delete(nums[i - k]);
    }
  }
  return false;
};
```

**复杂度分析**

- 时间复杂度：O(n)
- 空间复杂度：O(k)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9463db73f6149d191e18f11f192ffe1~tplv-k3u1fbpfcp-watermark.image?)
