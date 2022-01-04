---
theme: vuepress
highlight: vs2015
---
今天同学在群里分享了一到求逆序对数的题目，LeetCode上搜了一下有道差不多的，那我们来做一下吧。
# 1. 题目
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

- **示例 1:**
```
输入: [7,5,6,4]
输出: 5
```

**限制：**
`0 <= 数组长度 <= 50000`

# 2. 暴力梭哈法
一开始我看到这道题的反应是很简单，直接套上两个循环查喽（题目还是刷的少了2333）。
```JAVASCRIPT
var reversePairs = function(nums) {
  const length = nums.length
  let count = 0
  for(let i = 0; i < nums.length; i++) {
    for(let l = i + 1; l < nums.length; l++) {
      if(nums[l] < nums[i]) {
        count++
      }
    }
  }
  return count
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd5f899c6f0342ec8dfba22e6523a906~tplv-k3u1fbpfcp-watermark.image?)

直接就崩了，emmm遇事不决暴力法在这里行不通呀。仔细想想数组长度最大50000，n的二次都快2.5亿次计算了,确实得蹦。

- 分析：
    - 时间复杂度: O(n<sup>2</sup>)，两个循环，n为数组的长度。
    - 空间复杂度：O(1)，只用到一个临时变量。

# 3. 归并排序优化
使用归并排序，在合并的过程中处理逆序对数，因为在两个有序的序列里，逆序对得个数是很好算的，
可以看下面两张图

## 3.1 图一解释归并算法：分而治之的思想 
分解 -> 排序 -> 合并
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb1483f751ff4369bc7bf7a64fee6ef4~tplv-k3u1fbpfcp-watermark.image?)


## 3.2 图二解释取逆序对数
从下图可以看出，每一步的排序中逆序对的个数其实就是

**当左边的left[leftIndex] < right[rightIndex]时**
$$
逆序对的个数 = left数组的长度-leftIndex 
$$
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c29f48b4188e478a9710862035a13881~tplv-k3u1fbpfcp-watermark.image?)



```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  let count = 0 // 记录逆序对数
  const mergeSort = function(nums) {
    const length = nums.length
    if (length < 2) {
      return nums
    }
    const mid = Math.floor((length / 2))   // 获取二分位置
    const leftArr = nums.slice(0, mid)  
    const rightArr = nums.slice(mid)
    return merge(mergeSort(leftArr), mergeSort(rightArr))
  }
  
  const merge = function(leftArr, rightArr) {
    const result = []
    let leftIndex=0,rightIndex=0
    const leftLength = leftArr.length
    const rightLength = rightArr.length
    while(leftIndex < leftLength && rightIndex < rightLength) {
      if(leftArr[leftIndex] <= rightArr[rightIndex]) {
        result.push(leftArr[leftIndex++])
      } else {
        count += (leftLength - leftIndex ) // 关键： 取逆序对的个数
        result.push(rightArr[rightIndex++])
      }
    } 
  
    while(leftIndex < leftLength) {
      result.push(leftArr[leftIndex++])
    }
  
    while(rightIndex < rightLength) {
      result.push(rightArr[rightIndex++])
    }
    return result
  }
  mergeSort(nums)
  return count
};
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dbebe587a2449ba9a50e48c09afab0c~tplv-k3u1fbpfcp-watermark.image?)
- 分析：
  - 时间复杂度：同归并排序 O(nlogn)。
  - 空间复杂度：同归并排序 O(n)O(n)，因为归并排序需要用到一个临时数组。
  

`我最后换了很多种写法,想把时空再优化一下，发现都差不多，然后感觉这种是最好理解了。算了就这样吧~~~`